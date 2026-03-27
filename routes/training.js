const express = require('express');
const { getDb } = require('../db/database');
const { TRAINING, xpForLevel } = require('../db/gamedata');
const { getPlayer } = require('./player');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  const exercises = Object.entries(TRAINING).map(([key, ex]) => ({
    key, name: ex.name, description: ex.description, flavor: ex.flavor,
    stat: ex.stat, energyCost: ex.energyCost,
    canAfford: player.energy >= ex.energyCost,
    currentStat: player[ex.stat] || 1,
  }));
  res.json({ exercises, energy: player.energy, energy_max: player.energy_max });
});

router.post('/train', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const { exerciseKey } = req.body;
  const exercise = TRAINING[exerciseKey];
  if (!exercise) return res.json({ error: 'Unknown exercise.' });

  const db = getDb();
  const player = getPlayer(req.session.playerId);

  if (player.energy < exercise.energyCost)
    return res.json({ error: `Need ${exercise.energyCost} Resolve. You have ${player.energy}.` });

  const currentStat = player[exercise.stat] || 1;
  const statGainChance = Math.max(0.15, 1 - currentStat * 0.02);
  const statGain = Math.random() < statGainChance ? 1 : 0;
  const xpGain = exercise.xpBase + Math.floor(Math.random() * exercise.xpBase * 0.5);
  const newXp = player.xp + xpGain;
  const newLevel = calcLevel(newXp);

  db.prepare(`
    UPDATE players SET energy = energy - ?, ${exercise.stat} = ${exercise.stat} + ?, xp = ?, level = ?, last_action = strftime('%s','now') WHERE id = ?
  `).run(exercise.energyCost, statGain, newXp, newLevel, player.id);

  db.prepare(`INSERT INTO activity_log (player_id, action, detail) VALUES (?, ?, ?)`)
    .run(player.id, `Training: ${exercise.name}`,
      statGain > 0
        ? `${exercise.stat.toUpperCase()} → ${currentStat + 1}`
        : `No stat gain. XP +${xpGain}.`);

  res.json({
    statGain, stat: exercise.stat,
    newStatValue: currentStat + statGain, xpGain,
    message: statGain > 0
      ? `${exercise.flavor} — ${exercise.stat.toUpperCase()} is now ${currentStat + 1}.`
      : `${exercise.flavor} — No improvement yet. (+${xpGain} XP)`,
  });
});

function calcLevel(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

module.exports = router;
