const express = require('express');
const { getDb } = require('../db/database');
const { TRAINING, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);

  const exercises = Object.entries(TRAINING).map(([key, ex]) => ({
    key,
    name: ex.name,
    stat: ex.stat,
    staminaCost: ex.staminaCost,
    desc: ex.desc,
    canAfford: player.stamina >= ex.staminaCost,
    currentStat: player[ex.stat],
  }));

  res.json({ exercises, stamina: player.stamina, stamina_max: player.stamina_max });
});

router.post('/train', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const { exerciseKey } = req.body;
  const exercise = TRAINING[exerciseKey];
  if (!exercise) return res.json({ error: 'Unknown exercise.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);

  if (player.stamina < exercise.staminaCost)
    return res.json({ error: `Need ${exercise.staminaCost} stamina. You have ${player.stamina}.` });

  const currentStat = player[exercise.stat];
  // Diminishing returns: higher stat = lower chance of gain per session
  const statGainChance = Math.max(0.10, 1 - currentStat * 0.02);
  const statGain = Math.random() < statGainChance ? 1 : 0;
  const xpGain = exercise.xpBase + Math.floor(Math.random() * exercise.xpBase * 0.5);

  const newXp = player.xp + xpGain;
  const newLevel = calcLevel(newXp);

  db.prepare(`
    UPDATE players SET
      stamina = stamina - ?,
      ${exercise.stat} = ${exercise.stat} + ?,
      xp = ?,
      level = ?,
      last_action = strftime('%s','now')
    WHERE id = ?
  `).run(exercise.staminaCost, statGain, newXp, newLevel, player.id);

  db.prepare(`INSERT INTO activity_log (player_id, action, detail) VALUES (?, ?, ?)`)
    .run(player.id,
      `Training: ${exercise.name}`,
      statGain > 0
        ? `${exercise.stat.toUpperCase()} → ${currentStat + 1}`
        : `No stat gain this session. XP +${xpGain}.`
    );

  res.json({
    statGain,
    stat: exercise.stat,
    newStatValue: currentStat + statGain,
    xpGain,
    staminaUsed: exercise.staminaCost,
    message: statGain > 0
      ? `Progress. ${exercise.stat.toUpperCase()} is now ${currentStat + 1}.`
      : `No improvement this session. The gains aren't always visible. (+${xpGain} XP)`,
  });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
