const Database = require('better-sqlite3');
const path = require('path');

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
      scrip INTEGER DEFAULT 500,
      bank INTEGER DEFAULT 0,

      -- Resources
      stamina INTEGER DEFAULT 150,
      stamina_max INTEGER DEFAULT 150,
      nerve INTEGER DEFAULT 50,
      nerve_max INTEGER DEFAULT 50,
      health INTEGER DEFAULT 100,
      health_max INTEGER DEFAULT 100,

      -- New core resources
      influence INTEGER DEFAULT 0,
      heat INTEGER DEFAULT 0,

      -- Stats (renamed from v0.1)
      body INTEGER DEFAULT 1,
      reflexes INTEGER DEFAULT 1,
      ghost INTEGER DEFAULT 1,
      tech INTEGER DEFAULT 1,
      voice INTEGER DEFAULT 1,

      -- Progression
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      chapter_unlocked INTEGER DEFAULT 1,

      -- Path choice (null = undecided, 'operative' or 'organiser')
      path TEXT DEFAULT NULL,

      -- Status
      jail_until INTEGER DEFAULT 0,
      hospital_until INTEGER DEFAULT 0,

      -- Regen timestamps
      last_stamina_regen INTEGER DEFAULT (strftime('%s','now')),
      last_nerve_regen INTEGER DEFAULT (strftime('%s','now')),
      last_health_regen INTEGER DEFAULT (strftime('%s','now')),
      last_heat_decay INTEGER DEFAULT (strftime('%s','now')),

      -- Social
      cell_id INTEGER,
      first_login INTEGER DEFAULT 0,

      -- Meta
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
      influence INTEGER DEFAULT 0,
      zone TEXT DEFAULT 'estate',
      member_count INTEGER DEFAULT 1,
      path TEXT DEFAULT NULL,
      created_at INTEGER DEFAULT (strftime('%s','now'))
    );

    CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      op_key TEXT NOT NULL,
      outcome TEXT NOT NULL,
      scrip_change INTEGER DEFAULT 0,
      influence_gain INTEGER DEFAULT 0,
      heat_change INTEGER DEFAULT 0,
      xp_gained INTEGER DEFAULT 0,
      jail_time INTEGER DEFAULT 0,
      timestamp INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (player_id) REFERENCES players(id)
    );

    CREATE TABLE IF NOT EXISTS inventory (
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
