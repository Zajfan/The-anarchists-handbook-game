const express = require('express');
const { getDb } = require('../db/database');
const { CRIMES, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

// GET /api/crimes — list available crimes
router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);
  const inJail = now < player.jail_until;
  const inHospital = now < player.hospital_until;

  const crimes = Object.entries(CRIMES).map(([key, crime]) => {
    const canAfford = player.nerve >= crime.nerve;
    const statVal = crime.stat ? player[crime.stat] : 999;
    const minStatReq = crime.minStat ? Object.entries(crime.minStat) : [];
    const meetsMinStat = minStatReq.every(([s, v]) => player[s] >= v);

    return {
      key,
      name: crime.name,
      tier: crime.tier,
      nerve: crime.nerve,
      description: crime.description,
      stat: crime.stat,
      canAfford,
      meetsMinStat,
      locked: !canAfford || !meetsMinStat || inJail || inHospital,
      rewardRange: `$${crime.rewards.cashMin.toLocaleString()} - $${crime.rewards.cashMax.toLocaleString()}`,
    };
  });

  res.json({ crimes, player: { nerve: player.nerve, nerve_max: player.nerve_max }, inJail, inHospital });
});

// POST /api/crimes/commit
router.post('/commit', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });

  const { crimeKey } = req.body;
  const crime = CRIMES[crimeKey];
  if (!crime) return res.json({ error: 'Unknown crime.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);

  // Status checks
  if (now < player.jail_until)
    return res.json({ error: 'You\'re in jail. Post bail or wait it out.' });
  if (now < player.hospital_until)
    return res.json({ error: 'You\'re in the hospital. Recover first.' });
  if (player.nerve < crime.nerve)
    return res.json({ error: `Need ${crime.nerve} nerve. You have ${player.nerve}.` });

  // Stat requirement check
  if (crime.minStat) {
    for (const [stat, val] of Object.entries(crime.minStat)) {
      if (player[stat] < val) {
        return res.json({ error: `Requires ${val} ${stat}. You have ${player[stat]}.` });
      }
    }
  }

  // Calculate success rate
  let successRate = crime.baseSuccessRate;
  if (crime.stat && player[crime.stat]) {
    // Stat above 10 gives slight bonus, below 5 gives penalty
    const statMod = (player[crime.stat] - 5) * 0.015;
    successRate = Math.max(0.10, Math.min(0.97, successRate + statMod));
  }

  // Check for items that boost success
  const items = db.prepare('SELECT item_key FROM items WHERE player_id = ?').all(player.id);
  const hasScanner = items.some(i => i.item_key === 'police_scanner');
  if (hasScanner) successRate = Math.min(0.97, successRate + 0.12);

  // Deduct nerve
  db.prepare('UPDATE players SET nerve = nerve - ? WHERE id = ?').run(crime.nerve, player.id);

  const success = Math.random() < successRate;

  let cashGain = 0, jailTime = 0, notoriety = 0, xpGain = 0;
  let message = '';

  if (success) {
    cashGain = Math.floor(
      crime.rewards.cashMin + Math.random() * (crime.rewards.cashMax - crime.rewards.cashMin)
    );
    xpGain = crime.rewards.xp + Math.floor(Math.random() * crime.rewards.xp * 0.3);
    notoriety = crime.rewards.notoriety || 0;
    const msgs = crime.outcomes.success;
    message = msgs[Math.floor(Math.random() * msgs.length)].replace('{{cash}}', cashGain.toLocaleString());

    // Apply rewards
    const newXp = player.xp + xpGain;
    const newLevel = calcLevel(newXp);
    db.prepare(`
      UPDATE players SET
        cash = cash + ?,
        xp = ?,
        level = ?,
        notoriety = notoriety + ?,
        last_action = strftime('%s','now')
      WHERE id = ?
    `).run(cashGain, newXp, newLevel, notoriety, player.id);

  } else {
    jailTime = crime.jailTime;
    const msgs = crime.outcomes.fail;
    message = msgs[Math.floor(Math.random() * msgs.length)];

    if (jailTime > 0) {
      db.prepare(`
        UPDATE players SET
          jail_until = strftime('%s','now') + ?,
          last_action = strftime('%s','now')
        WHERE id = ?
      `).run(jailTime, player.id);
    }
  }

  // Log crime
  db.prepare(`
    INSERT INTO crimes (player_id, crime_key, outcome, cash_change, xp_gained, jail_time)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(player.id, crimeKey, success ? 'success' : 'fail', cashGain, xpGain, jailTime);

  db.prepare(`
    INSERT INTO activity_log (player_id, action, detail)
    VALUES (?, ?, ?)
  `).run(player.id, success ? `Crime: ${crime.name} [SUCCESS]` : `Crime: ${crime.name} [BUSTED]`, message);

  res.json({
    success,
    message,
    cashGain,
    xpGain,
    jailTime,
    notoriety,
    crimeKey,
    crimeName: crime.name,
  });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
