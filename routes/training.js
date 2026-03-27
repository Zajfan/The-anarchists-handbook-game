const express = require('express');
const { getDb } = require('../db/database');
const { GYM_EXERCISES, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);

  const exercises = Object.entries(GYM_EXERCISES).map(([key, ex]) => ({
    key,
    name: ex.name,
    stat: ex.stat,
    energyCost: ex.energyCost,
    canAfford: player.energy >= ex.energyCost,
    currentStat: player[ex.stat],
  }));

  res.json({ exercises, energy: player.energy, energy_max: player.energy_max });
});

router.post('/train', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const { exerciseKey } = req.body;
  const exercise = GYM_EXERCISES[exerciseKey];
  if (!exercise) return res.json({ error: 'Unknown exercise.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);

  if (player.energy < exercise.energyCost)
    return res.json({ error: `Need ${exercise.energyCost} energy. You have ${player.energy}.` });

  // Stat gain: diminishing returns based on current stat level
  const currentStat = player[exercise.stat];
  const statGainChance = Math.max(0.15, 1 - currentStat * 0.02);
  const statGain = Math.random() < statGainChance ? 1 : 0;
  const xpGain = exercise.xpBase + Math.floor(Math.random() * exercise.xpBase * 0.5);

  const newXp = player.xp + xpGain;
  const newLevel = calcLevel(newXp);

  db.prepare(`
    UPDATE players SET
      energy = energy - ?,
      ${exercise.stat} = ${exercise.stat} + ?,
      xp = ?,
      level = ?,
      last_action = strftime('%s','now')
    WHERE id = ?
  `).run(exercise.energyCost, statGain, newXp, newLevel, player.id);

  db.prepare(`
    INSERT INTO activity_log (player_id, action, detail)
    VALUES (?, ?, ?)
  `).run(player.id, `Training: ${exercise.name}`,
    statGain > 0
      ? `${exercise.stat.toUpperCase()} increased to ${currentStat + 1}.`
      : `No stat gain this time. XP +${xpGain}.`
  );

  res.json({
    statGain,
    stat: exercise.stat,
    newStatValue: currentStat + statGain,
    xpGain,
    energyUsed: exercise.energyCost,
    message: statGain > 0
      ? `Grinding paid off. ${exercise.stat.toUpperCase()} is now ${currentStat + 1}.`
      : `No improvement this session. Keep at it. (+${xpGain} XP)`,
  });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
