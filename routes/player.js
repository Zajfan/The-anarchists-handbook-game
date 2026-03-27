const express = require('express');
const { getDb } = require('../db/database');
const router = express.Router();

// Regen rates
const ENERGY_REGEN_RATE = 5;       // per interval
const ENERGY_REGEN_INTERVAL = 1800; // 30 min in seconds
const NERVE_REGEN_RATE = 1;
const NERVE_REGEN_INTERVAL = 300;   // 5 min
const HP_REGEN_RATE = 5;
const HP_REGEN_INTERVAL = 1800;

function applyRegen(player) {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);

  let { energy, energy_max, nerve, nerve_max, hp, hp_max,
        last_energy_regen, last_nerve_regen, last_hp_regen } = player;

  // Energy regen
  const energyTicks = Math.floor((now - last_energy_regen) / ENERGY_REGEN_INTERVAL);
  if (energyTicks > 0 && energy < energy_max) {
    energy = Math.min(energy_max, energy + energyTicks * ENERGY_REGEN_RATE);
    last_energy_regen = last_energy_regen + energyTicks * ENERGY_REGEN_INTERVAL;
  }

  // Nerve regen
  const nerveTicks = Math.floor((now - last_nerve_regen) / NERVE_REGEN_INTERVAL);
  if (nerveTicks > 0 && nerve < nerve_max) {
    nerve = Math.min(nerve_max, nerve + nerveTicks * NERVE_REGEN_RATE);
    last_nerve_regen = last_nerve_regen + nerveTicks * NERVE_REGEN_INTERVAL;
  }

  // HP regen (only if not in hospital)
  const inHospital = now < player.hospital_until;
  const hpTicks = Math.floor((now - last_hp_regen) / HP_REGEN_INTERVAL);
  if (hpTicks > 0 && hp < hp_max && !inHospital) {
    hp = Math.min(hp_max, hp + hpTicks * HP_REGEN_RATE);
    last_hp_regen = last_hp_regen + hpTicks * HP_REGEN_INTERVAL;
  }

  // Update if anything changed
  if (energy !== player.energy || nerve !== player.nerve || hp !== player.hp) {
    db.prepare(`
      UPDATE players SET energy=?, nerve=?, hp=?,
        last_energy_regen=?, last_nerve_regen=?, last_hp_regen=?
      WHERE id=?
    `).run(energy, nerve, hp, last_energy_regen, last_nerve_regen, last_hp_regen, player.id);
  }

  return { ...player, energy, nerve, hp, last_energy_regen, last_nerve_regen, last_hp_regen };
}

function getPlayer(id) {
  const db = getDb();
  let player = db.prepare('SELECT * FROM players WHERE id = ?').get(id);
  if (!player) return null;
  return applyRegen(player);
}

function regenInfo(player) {
  const now = Math.floor(Date.now() / 1000);
  return {
    energyNextIn: player.energy < player.energy_max
      ? Math.max(0, ENERGY_REGEN_INTERVAL - (now - player.last_energy_regen))
      : null,
    nerveNextIn: player.nerve < player.nerve_max
      ? Math.max(0, NERVE_REGEN_INTERVAL - (now - player.last_nerve_regen))
      : null,
    hpNextIn: player.hp < player.hp_max
      ? Math.max(0, HP_REGEN_INTERVAL - (now - player.last_hp_regen))
      : null,
    jailTimeLeft: Math.max(0, player.jail_until - now),
    hospitalTimeLeft: Math.max(0, player.hospital_until - now),
  };
}

// GET /api/player/me — full player state
router.get('/me', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });

  const { password_hash, ...safe } = player;
  res.json({ player: safe, regen: regenInfo(player) });
});

// GET /api/player/log — recent activity
router.get('/log', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const db = getDb();
  const logs = db.prepare(
    'SELECT * FROM activity_log WHERE player_id = ? ORDER BY timestamp DESC LIMIT 30'
  ).all(req.session.playerId);
  res.json({ logs });
});

module.exports = { router, getPlayer, applyRegen, regenInfo };
