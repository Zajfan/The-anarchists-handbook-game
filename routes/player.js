const express = require('express');
const { getDb } = require('../db/database');
const router = express.Router();

const ENERGY_REGEN_RATE = 5; const ENERGY_REGEN_INTERVAL = 1800;
const NERVE_REGEN_RATE = 1;  const NERVE_REGEN_INTERVAL = 300;
const HP_REGEN_RATE = 5;     const HP_REGEN_INTERVAL = 1800;
const HEAT_DECAY_RATE = 1;   const HEAT_DECAY_INTERVAL = 3600; // -1 heat per hour

function applyRegen(player) {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  let { energy, energy_max, nerve, nerve_max, hp, hp_max, heat,
        last_energy_regen, last_nerve_regen, last_hp_regen, last_heat_decay } = player;

  const energyTicks = Math.floor((now - last_energy_regen) / ENERGY_REGEN_INTERVAL);
  if (energyTicks > 0 && energy < energy_max) {
    energy = Math.min(energy_max, energy + energyTicks * ENERGY_REGEN_RATE);
    last_energy_regen += energyTicks * ENERGY_REGEN_INTERVAL;
  }

  const nerveTicks = Math.floor((now - last_nerve_regen) / NERVE_REGEN_INTERVAL);
  if (nerveTicks > 0 && nerve < nerve_max) {
    nerve = Math.min(nerve_max, nerve + nerveTicks * NERVE_REGEN_RATE);
    last_nerve_regen += nerveTicks * NERVE_REGEN_INTERVAL;
  }

  const inHospital = now < player.hospital_until;
  const hpTicks = Math.floor((now - last_hp_regen) / HP_REGEN_INTERVAL);
  if (hpTicks > 0 && hp < hp_max && !inHospital) {
    hp = Math.min(hp_max, hp + hpTicks * HP_REGEN_RATE);
    last_hp_regen += hpTicks * HP_REGEN_INTERVAL;
  }

  // Heat decay
  const heatTicks = Math.floor((now - last_heat_decay) / HEAT_DECAY_INTERVAL);
  if (heatTicks > 0 && heat > 0) {
    heat = Math.max(0, heat - heatTicks * HEAT_DECAY_RATE);
    last_heat_decay += heatTicks * HEAT_DECAY_INTERVAL;
  }

  if (energy !== player.energy || nerve !== player.nerve || hp !== player.hp || heat !== player.heat) {
    db.prepare(`UPDATE players SET energy=?,nerve=?,hp=?,heat=?,last_energy_regen=?,last_nerve_regen=?,last_hp_regen=?,last_heat_decay=? WHERE id=?`)
      .run(energy, nerve, hp, heat, last_energy_regen, last_nerve_regen, last_hp_regen, last_heat_decay, player.id);
  }
  return { ...player, energy, nerve, hp, heat, last_energy_regen, last_nerve_regen, last_hp_regen, last_heat_decay };
}

function getPlayer(id) {
  const db = getDb();
  let player = db.prepare('SELECT * FROM players WHERE id = ?').get(id);
  if (!player) return null;
  return applyRegen(player);
}

router.get('/me', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });
  const { password_hash, ...safe } = player;
  const now = Math.floor(Date.now() / 1000);
  res.json({
    player: safe,
    regen: {
      jailTimeLeft: Math.max(0, player.jail_until - now),
      hospitalTimeLeft: Math.max(0, player.hospital_until - now),
    }
  });
});

router.get('/log', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const db = getDb();
  const logs = db.prepare('SELECT * FROM activity_log WHERE player_id = ? ORDER BY timestamp DESC LIMIT 40').all(req.session.playerId);
  res.json({ logs });
});

module.exports = { router, getPlayer, applyRegen };
