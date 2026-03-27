# The Anarchist's Handbook 🔴
### A Torn-style text PBBG set in the criminal underground

> *No fancy graphics. No hand-holding. Pure grind.*

A persistent browser-based game inspired by Torn City, Prison Struggle, and the aesthetics of the underground zine culture of the 90s. Build your stats, commit crimes, form a cell, and dominate the city.

---

## Quick Start

```bash
npm install
npm start
# or for dev:
npm run dev
```

Open `http://localhost:3000`

---

## v0.1 Features (Current)
- ✅ Account registration & login (sessions)
- ✅ Player stats: STR / AGI / STH / INT / CHA / Notoriety
- ✅ Energy / Nerve / HP with real-time regeneration
- ✅ **10 crimes** across 4 tiers (nerve cost / risk / reward scaling)
- ✅ **8 gym exercises** (stat training with diminishing returns)
- ✅ Jail system (failed crimes → timed jail sentence)
- ✅ Activity log feed
- ✅ Torn-style dark UI with resource bars + sidebar nav

## Roadmap
See [GDD.md](./GDD.md) for full game design document and roadmap.

---

## Tech Stack
- **Backend:** Node.js + Express
- **DB:** SQLite (better-sqlite3) — swap to Postgres for scale
- **Auth:** express-session + bcrypt
- **Frontend:** Vanilla HTML/CSS/JS (server-rendered)
- **Deploy:** Replit / Railway / Render

---

## Deployment (Replit)
1. Import repo to Replit
2. Set `SESSION_SECRET` in Secrets
3. Run is configured via `package.json` `start` script
4. Done. SQLite file persists in Replit's filesystem.

---

*This is a fictional game. No real crimes. Just vibes.*
