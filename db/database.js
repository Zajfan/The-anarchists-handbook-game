const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'game.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT UNIQUE,
      
      -- Currency
      cash INTEGER DEFAULT 500,
      bank INTEGER DEFAULT 0,
      
      -- Resources
      energy INTEGER DEFAULT 150,
      energy_max INTEGER DEFAULT 150,
      nerve INTEGER DEFAULT 50,
      nerve_max INTEGER DEFAULT 50,
      hp INTEGER DEFAULT 100,
      hp_max INTEGER DEFAULT 100,
      happy INTEGER DEFAULT 100,
      
      -- Core stats
      strength INTEGER DEFAULT 1,
      agility INTEGER DEFAULT 1,
      stealth INTEGER DEFAULT 1,
      intellect INTEGER DEFAULT 1,
      charisma INTEGER DEFAULT 1,
      notoriety INTEGER DEFAULT 0,
      
      -- Status
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      jail_until INTEGER DEFAULT 0,
      hospital_until INTEGER DEFAULT 0,
      wanted_level INTEGER DEFAULT 0,
      
      -- Timestamps for regen
      last_energy_regen INTEGER DEFAULT (strftime('%s','now')),
      last_nerve_regen INTEGER DEFAULT (strftime('%s','now')),
      last_hp_regen INTEGER DEFAULT (strftime('%s','now')),
      
      -- Meta
      cell_id INTEGER,
      created_at INTEGER DEFAULT (strftime('%s','now')),
      last_action INTEGER DEFAULT (strftime('%s','now')),
      last_login INTEGER DEFAULT (strftime('%s','now')),
      
      FOREIGN KEY (cell_id) REFERENCES cells(id)
    );

    CREATE TABLE IF NOT EXISTS cells (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      tag TEXT UNIQUE NOT NULL,
      description TEXT,
      leader_id INTEGER NOT NULL,
      bank INTEGER DEFAULT 0,
      territory TEXT DEFAULT 'slums',
      members INTEGER DEFAULT 1,
      created_at INTEGER DEFAULT (strftime('%s','now'))
    );

    CREATE TABLE IF NOT EXISTS crimes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      crime_key TEXT NOT NULL,
      outcome TEXT NOT NULL,
      cash_change INTEGER DEFAULT 0,
      xp_gained INTEGER DEFAULT 0,
      jail_time INTEGER DEFAULT 0,
      timestamp INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (player_id) REFERENCES players(id)
    );

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      item_key TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      acquired_at INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (player_id) REFERENCES players(id)
    );

    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      detail TEXT,
      timestamp INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (player_id) REFERENCES players(id)
    );

    CREATE TABLE IF NOT EXISTS market_listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seller_id INTEGER NOT NULL,
      item_key TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      price INTEGER NOT NULL,
      listed_at INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (seller_id) REFERENCES players(id)
    );
  `);
}

module.exports = { getDb };
