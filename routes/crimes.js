const express = require('express');
const { getDb } = require('../db/database');
const { ACTIONS, getHeatLevel, getNotorietyRank, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

// GET /api/actions — list available actions by chapter
router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);
  const inJail = now < player.jail_until;
  const inHospital = now < player.hospital_until;

  const actions = Object.entries(ACTIONS).map(([key, action]) => {
    const canAffordNerve = player.nerve >= action.nerve;
    const meetsNotoriety = !action.minNotoriety || player.notoriety >= action.minNotoriety;
    const meetsMinStat = !action.minStat || Object.entries(action.minStat).every(([s, v]) => player[s] >= v);
    const locked = !canAffordNerve || !meetsNotoriety || !meetsMinStat || inJail || inHospital;

    let lockReason = null;
    if (!meetsNotoriety) lockReason = `Requires ${action.minNotoriety} Notoriety`;
    else if (!meetsMinStat && action.minStat) {
      const [s, v] = Object.entries(action.minStat)[0];
      lockReason = `Requires ${v} ${s.toUpperCase()}`;
    }
    else if (!canAffordNerve) lockReason = `Need ${action.nerve} Nerve`;
    else if (inJail) lockReason = 'In jail';
    else if (inHospital) lockReason = 'In hospital';

    return {
      key,
      name: action.name,
      chapter: action.chapter,
      chapterName: action.chapterName,
      nerve: action.nerve,
      description: action.description,
      stat: action.stat,
      heatGain: action.heatGain,
      rewardDesc: action.rewards.cashMax > 0
        ? `${action.rewards.cashMin}–${action.rewards.cashMax} Scrip`
        : action.rewards.notoriety > 0
          ? `+${action.rewards.notoriety} Notoriety`
          : 'Non-monetary',
      locked,
      lockReason,
      isEndgame: action.isEndgame || false,
    };
  });

  res.json({
    actions,
    player: {
      nerve: player.nerve, nerve_max: player.nerve_max,
      notoriety: player.notoriety, heat: player.heat
    },
    inJail, inHospital
  });
});

// POST /api/actions/commit
router.post('/commit', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const { actionKey } = req.body;
  const action = ACTIONS[actionKey];
  if (!action) return res.json({ error: 'Unknown action.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const now = Math.floor(Date.now() / 1000);
  if (now < player.jail_until) return res.json({ error: 'You\'re detained. Wait it out or pay bail.' });
  if (now < player.hospital_until) return res.json({ error: 'You\'re in no condition to act. Recover first.' });
  if (player.nerve < action.nerve) return res.json({ error: `Not enough nerve. Need ${action.nerve}, have ${player.nerve}.` });
  if (action.minNotoriety && player.notoriety < action.minNotoriety)
    return res.json({ error: `Requires ${action.minNotoriety} Notoriety. You have ${player.notoriety}.` });
  if (action.minStat) {
    for (const [stat, val] of Object.entries(action.minStat)) {
      if (player[stat] < val) return res.json({ error: `Requires ${val} ${stat}. You have ${player[stat]}.` });
    }
  }

  // Base success rate modified by stat and heat
  let successRate = action.baseSuccessRate;
  if (action.stat && player[action.stat]) {
    successRate = Math.max(0.1, Math.min(0.97, successRate + (player[action.stat] - 5) * 0.015));
  }

  // Heat penalty on success rate
  const heatPenalty = player.heat > 20 ? (player.heat - 20) * 0.005 : 0;
  successRate = Math.max(0.10, successRate - heatPenalty);

  // Scanner bonus
  const items = db.prepare('SELECT item_key FROM items WHERE player_id = ?').all(player.id);
  if (items.some(i => i.item_key === 'scanner')) successRate = Math.min(0.97, successRate + 0.10);

  // Deduct nerve
  db.prepare('UPDATE players SET nerve = nerve - ? WHERE id = ?').run(action.nerve, player.id);

  const success = Math.random() < successRate;
  let cashGain = 0, jailTime = 0, xpGain = 0, heatChange = 0;
  let notorietyGain = 0;

  // Heat always increases on action (less on success)
  heatChange = success ? Math.floor(action.heatGain * 0.6) : action.heatGain;

  // ghost_protocol special case
  if (actionKey === 'ghost_protocol' && success) {
    heatChange = -30;
  }

  const msgs = success ? action.outcomes.success : action.outcomes.fail;
  let message = msgs[Math.floor(Math.random() * msgs.length)];

  if (success) {
    cashGain = action.rewards.cashMin + Math.floor(Math.random() * (action.rewards.cashMax - action.rewards.cashMin + 1));
    xpGain = action.rewards.xp + Math.floor(Math.random() * action.rewards.xp * 0.3);
    notorietyGain = action.rewards.notoriety || 0;

    const newXp = player.xp + xpGain;
    const newLevel = calcLevel(newXp);
    const newHeat = Math.max(0, Math.min(100, player.heat + heatChange));

    db.prepare(`
      UPDATE players SET
        cash = cash + ?, xp = ?, level = ?,
        notoriety = notoriety + ?,
        heat = ?,
        last_action = strftime('%s','now')
      WHERE id = ?
    `).run(cashGain, newXp, newLevel, notorietyGain, newHeat, player.id);
  } else {
    jailTime = action.jailTime;
    const newHeat = Math.min(100, player.heat + heatChange);
    if (jailTime > 0) {
      db.prepare(`
        UPDATE players SET jail_until = strftime('%s','now') + ?, heat = ?, last_action = strftime('%s','now') WHERE id = ?
      `).run(jailTime, newHeat, player.id);
    } else {
      db.prepare('UPDATE players SET heat = ?, last_action = strftime('%s','now') WHERE id = ?').run(newHeat, player.id);
    }
  }

  db.prepare(`INSERT INTO actions_log (player_id, action_key, outcome, cash_change, xp_gained, heat_change, jail_time)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(player.id, actionKey, success ? 'success' : 'fail', cashGain, xpGain, heatChange, jailTime);

  db.prepare(`INSERT INTO activity_log (player_id, action, detail) VALUES (?, ?, ?)`)
    .run(player.id, success ? `${action.name} [SUCCESS]` : `${action.name} [BLOWN]`, message);

  res.json({ success, message, cashGain, xpGain, jailTime, notorietyGain, heatChange, actionKey, actionName: action.name });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
