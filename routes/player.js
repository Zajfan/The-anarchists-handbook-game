const express = require('express');
const { getDb } = require('../db/database');
const router = express.Router();

// Regen / decay constants
const STAMINA_REGEN_RATE     = 5;
const STAMINA_REGEN_INTERVAL = 1800; // 30 min
const NERVE_REGEN_RATE       = 1;
const NERVE_REGEN_INTERVAL   = 300;  // 5 min
const HEALTH_REGEN_RATE      = 5;
const HEALTH_REGEN_INTERVAL  = 1800;
const HEAT_DECAY_RATE        = 2;    // Heat lost per interval
const HEAT_DECAY_INTERVAL    = 1800; // 30 min

function applyRegen(player) {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  let { stamina, stamina_max, nerve, nerve_max, health, health_max, heat,
        last_stamina_regen, last_nerve_regen, last_health_regen, last_heat_decay } = player;

  // Stamina
  const staminaTicks = Math.floor((now - last_stamina_regen) / STAMINA_REGEN_INTERVAL);
  if (staminaTicks > 0 && stamina < stamina_max) {
    stamina = Math.min(stamina_max, stamina + staminaTicks * STAMINA_REGEN_RATE);
    last_stamina_regen += staminaTicks * STAMINA_REGEN_INTERVAL;
  }

  // Nerve
  const nerveTicks = Math.floor((now - last_nerve_regen) / NERVE_REGEN_INTERVAL);
  if (nerveTicks > 0 && nerve < nerve_max) {
    nerve = Math.min(nerve_max, nerve + nerveTicks * NERVE_REGEN_RATE);
    last_nerve_regen += nerveTicks * NERVE_REGEN_INTERVAL;
  }

  // Health (not while hospitalized)
  if (now >= player.hospital_until) {
    const healthTicks = Math.floor((now - last_health_regen) / HEALTH_REGEN_INTERVAL);
    if (healthTicks > 0 && health < health_max) {
      health = Math.min(health_max, health + healthTicks * HEALTH_REGEN_RATE);
      last_health_regen += healthTicks * HEALTH_REGEN_INTERVAL;
    }
  }

  // Heat decay (always decaying, faster with safehouse)
  const heatTicks = Math.floor((now - last_heat_decay) / HEAT_DECAY_INTERVAL);
  if (heatTicks > 0 && heat > 0) {
    heat = Math.max(0, heat - heatTicks * HEAT_DECAY_RATE);
    last_heat_decay += heatTicks * HEAT_DECAY_INTERVAL;
  }

  db.prepare(`
    UPDATE players SET
      stamina=?, nerve=?, health=?, heat=?,
      last_stamina_regen=?, last_nerve_regen=?, last_health_regen=?, last_heat_decay=?
    WHERE id=?
  `).run(stamina, nerve, health, heat,
         last_stamina_regen, last_nerve_regen, last_health_regen, last_heat_decay,
         player.id);

  return { ...player, stamina, nerve, health, heat,
           last_stamina_regen, last_nerve_regen, last_health_regen, last_heat_decay };
}

function getPlayer(id) {
  const db = getDb();
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(id);
  if (!player) return null;
  return applyRegen(player);
}

function regenInfo(player) {
  const now = Math.floor(Date.now() / 1000);
  return {
    staminaNextIn: player.stamina < player.stamina_max
      ? Math.max(0, STAMINA_REGEN_INTERVAL - (now - player.last_stamina_regen)) : null,
    nerveNextIn: player.nerve < player.nerve_max
      ? Math.max(0, NERVE_REGEN_INTERVAL - (now - player.last_nerve_regen)) : null,
    healthNextIn: player.health < player.health_max
      ? Math.max(0, HEALTH_REGEN_INTERVAL - (now - player.last_health_regen)) : null,
    heatDecayNextIn: player.heat > 0
      ? Math.max(0, HEAT_DECAY_INTERVAL - (now - player.last_heat_decay)) : null,
    jailTimeLeft: Math.max(0, player.jail_until - now),
    hospitalTimeLeft: Math.max(0, player.hospital_until - now),
  };
}

function heatLevel(heat) {
  if (heat <= 20) return { label: 'LOW PROFILE', color: 'green' };
  if (heat <= 40) return { label: 'PERSONS OF INTEREST', color: 'amber' };
  if (heat <= 60) return { label: 'ACTIVE SURVEILLANCE', color: 'orange' };
  if (heat <= 80) return { label: 'PRIORITY TARGET', color: 'red' };
  return { label: 'FULL MANHUNT', color: 'critical' };
}

router.get('/me', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const player = getPlayer(req.session.playerId);
  if (!player) return res.json({ error: 'Player not found.' });
  const { password_hash, ...safe } = player;
  res.json({ player: safe, regen: regenInfo(player), heatLevel: heatLevel(player.heat) });
});

router.get('/log', (req, res) => {
  if (!req.session.playerId) return res.json({ error: 'Not logged in.' });
  const db = getDb();
  const logs = db.prepare(
    'SELECT * FROM activity_log WHERE player_id = ? ORDER BY timestamp DESC LIMIT 40'
  ).all(req.session.playerId);
  res.json({ logs });
});

module.exports = { router, getPlayer, applyRegen, regenInfo };
