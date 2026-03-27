const express = require('express');
const { getDb } = require('../db/database');
const { OPERATIONS, CHAPTER_UNLOCKS, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);
  const inJail = now < player.jail_until;
  const inHospital = now < player.hospital_until;

  // Heat penalty to success rates
  const heatPenalty = player.heat > 40 ? (player.heat - 40) * 0.003 : 0;

  const ops = Object.entries(OPERATIONS).map(([key, op]) => {
    const chapterUnlock = CHAPTER_UNLOCKS[op.chapter] || 0;
    const chapterLocked = player.influence < chapterUnlock;
    const canAffordNerve = player.nerve >= op.nerve;
    const meetsStatReq = !op.minStat || Object.entries(op.minStat).every(([s, v]) => player[s] >= v);

    return {
      key,
      name: op.name,
      chapter: op.chapter,
      chapterName: op.chapterName,
      nerve: op.nerve,
      description: op.description,
      stat: op.stat,
      rewards: {
        influence: op.rewards.influence,
        scripRange: op.rewards.scripMax > 0 ? `${op.rewards.scrip}-${op.rewards.scripMax}` : null,
      },
      heatGain: op.heatGain,
      chapterLocked,
      chapterUnlockAt: chapterUnlock,
      canAffordNerve,
      meetsStatReq,
      minStat: op.minStat || null,
      locked: chapterLocked || !canAffordNerve || !meetsStatReq || inJail || inHospital,
    };
  });

  res.json({
    ops,
    player: {
      nerve: player.nerve,
      nerve_max: player.nerve_max,
      influence: player.influence,
      heat: player.heat,
    },
    inJail,
    inHospital,
  });
});

router.post('/execute', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const { opKey } = req.body;
  const op = OPERATIONS[opKey];
  if (!op) return res.json({ error: 'Unknown operation.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);

  if (now < player.jail_until)
    return res.json({ error: 'You\'re in custody. Wait it out or find another way out.' });
  if (now < player.hospital_until)
    return res.json({ error: 'You\'re injured. Recover first.' });
  if (player.nerve < op.nerve)
    return res.json({ error: `Need ${op.nerve} nerve. You have ${player.nerve}.` });

  const chapterUnlock = CHAPTER_UNLOCKS[op.chapter] || 0;
  if (player.influence < chapterUnlock)
    return res.json({ error: `Requires ${chapterUnlock.toLocaleString()} Influence to unlock Chapter ${op.chapter}.` });

  if (op.minStat) {
    for (const [stat, val] of Object.entries(op.minStat)) {
      if (player[stat] < val)
        return res.json({ error: `Requires ${val} ${stat.toUpperCase()}. You have ${player[stat]}.` });
    }
  }

  // Calculate success rate
  let successRate = op.baseSuccessRate;

  // Stat modifier
  if (op.stat && player[op.stat]) {
    const statMod = (player[op.stat] - 5) * 0.015;
    successRate = Math.max(0.10, Math.min(0.96, successRate + statMod));
  }

  // Heat penalty (high heat makes ops harder)
  if (player.heat > 40) {
    successRate -= (player.heat - 40) * 0.003;
  }

  // Item bonuses
  const inventory = db.prepare('SELECT item_key FROM inventory WHERE player_id = ?').all(player.id);
  const hasScanner = inventory.some(i => i.item_key === 'police_scanner');
  const hasJammer  = inventory.some(i => i.item_key === 'signal_jammer');
  const hasBurner  = inventory.some(i => i.item_key === 'burner_phone');
  if (hasScanner) successRate = Math.min(0.96, successRate + 0.10);
  if (hasJammer)  successRate = Math.min(0.96, successRate + 0.08);

  successRate = Math.max(0.05, successRate);

  // Deduct nerve
  db.prepare('UPDATE players SET nerve = nerve - ? WHERE id = ?').run(op.nerve, player.id);

  const success = Math.random() < successRate;
  let scripGain = 0, influenceGain = 0, heatChange = 0, xpGain = 0, jailTime = 0;

  if (success) {
    scripGain    = op.rewards.scrip + Math.floor(Math.random() * (op.rewards.scripMax - op.rewards.scrip + 1));
    influenceGain = op.rewards.influence;
    xpGain       = op.rewards.xp + Math.floor(Math.random() * op.rewards.xp * 0.3);
    heatChange   = hasBurner ? Math.floor(op.heatGain * 0.8) : op.heatGain;

    const newXp    = player.xp + xpGain;
    const newLevel = calcLevel(newXp);
    const newHeat  = Math.min(100, player.heat + heatChange);

    // Check chapter unlock
    const newInfluence = player.influence + influenceGain;
    let newChapter = player.chapter_unlocked;
    for (const [ch, threshold] of Object.entries(CHAPTER_UNLOCKS)) {
      if (newInfluence >= threshold && parseInt(ch) > newChapter) {
        newChapter = parseInt(ch);
      }
    }

    db.prepare(`
      UPDATE players SET
        scrip = scrip + ?,
        influence = influence + ?,
        heat = ?,
        xp = ?,
        level = ?,
        chapter_unlocked = ?,
        last_action = strftime('%s','now')
      WHERE id = ?
    `).run(scripGain, influenceGain, newHeat, newXp, newLevel, newChapter, player.id);

    // Heat reduction ops (surveillance map, destroy camera, etc.)
    if (op.heatReduction) {
      db.prepare('UPDATE players SET heat = MAX(0, heat - ?) WHERE id = ?')
        .run(op.heatReduction, player.id);
    }

  } else {
    jailTime   = op.jailTime;
    heatChange = Math.floor(op.heatGain * 0.5); // partial heat even on fail

    const newHeat = Math.min(100, player.heat + heatChange);
    const updates = { heat: newHeat };

    if (jailTime > 0) {
      db.prepare(`
        UPDATE players SET
          jail_until = strftime('%s','now') + ?,
          heat = ?,
          last_action = strftime('%s','now')
        WHERE id = ?
      `).run(jailTime, newHeat, player.id);
    } else {
      db.prepare('UPDATE players SET heat = ?, last_action = strftime(\'%s\',\'now\') WHERE id = ?')
        .run(newHeat, player.id);
    }
  }

  const msgs = success ? op.outcomes.success : op.outcomes.fail;
  const message = msgs[Math.floor(Math.random() * msgs.length)];

  // Log
  db.prepare(`INSERT INTO operations (player_id, op_key, outcome, scrip_change, influence_gain, heat_change, xp_gained, jail_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(player.id, opKey, success ? 'success' : 'fail', scripGain, influenceGain, heatChange, xpGain, jailTime);

  db.prepare(`INSERT INTO activity_log (player_id, action, detail) VALUES (?, ?, ?)`)
    .run(player.id,
      success ? `[SUCCESS] ${op.name}` : `[BUSTED] ${op.name}`,
      message
    );

  res.json({
    success,
    message,
    opKey,
    opName: op.name,
    scripGain,
    influenceGain,
    heatChange,
    xpGain,
    jailTime,
  });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
