const express = require('express');
const bcrypt = require('bcrypt');
const { getDb } = require('../db/database');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.json({ error: 'Username and password required.' });
  if (username.length < 3 || username.length > 20) return res.json({ error: 'Username must be 3-20 characters.' });
  if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters.' });
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return res.json({ error: 'Username can only contain letters, numbers, _ and -' });

  try {
    const db = getDb();
    const existing = db.prepare('SELECT id FROM players WHERE username = ?').get(username);
    if (existing) return res.json({ error: 'Username taken.' });

    const hash = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO players (username, password_hash, email) VALUES (?, ?, ?)
    `).run(username, hash, email || null);

    const player = db.prepare('SELECT * FROM players WHERE id = ?').get(result.lastInsertRowid);
    req.session.playerId = player.id;
    req.session.username = player.username;

    res.json({ success: true, redirect: '/game' });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ error: 'Fill in both fields.' });

  try {
    const db = getDb();
    const player = db.prepare('SELECT * FROM players WHERE username = ?').get(username);
    if (!player) return res.json({ error: 'Invalid credentials.' });

    const match = await bcrypt.compare(password, player.password_hash);
    if (!match) return res.json({ error: 'Invalid credentials.' });

    db.prepare('UPDATE players SET last_login = strftime(\'%s\',\'now\') WHERE id = ?').run(player.id);

    req.session.playerId = player.id;
    req.session.username = player.username;
    res.json({ success: true, redirect: '/game' });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Login failed.' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, redirect: '/' });
});

module.exports = router;
