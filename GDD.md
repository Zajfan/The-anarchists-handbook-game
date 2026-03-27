# The Anarchist's Handbook — Game Design Document
**Genre:** Text-based PBBG (Persistent Browser-Based Game)  
**Tone:** Gritty urban crime, underground culture, anti-establishment survival  
**Inspiration:** Torn City, Prison Struggle, CyberCode Online

---

## 🎮 Core Fantasy
You are a nobody on the streets. Through cunning, crime, and building your underground network,
you rise from petty vandal to a feared figure in the city's criminal underworld.
The system is the enemy. Everyone else is either an ally, a tool, or a mark.

---

## ⚙️ Core Systems

### 1. Action Resources
| Resource | Max | Regen | Used For |
|----------|-----|-------|----------|
| **Energy** | 150 | +5 per 30 min | Training, Activities |
| **Nerve** | 50 | +1 per 5 min | Crimes |
| **HP** | 100 | +5 per 30 min | Combat (PvP, Muggings) |
| **Happy** | 100 | variable | Stat training multiplier |

### 2. Stats
- **Strength** (STR) — Combat damage dealt
- **Agility** (AGI) — Escape chance, defense, travel
- **Stealth** (STH) — Crime success rate, avoid detection
- **Intellect** (INT) — Hacking, planning, better crime payouts
- **Charisma** (CHA) — Cell recruiting, black market prices
- **Notoriety** — Reputation score (visible to all, unlocks content)

All stats trained via gym/activities, cost Energy.

### 3. Crimes (Nerve Cost → Reward Scaling)
**Tier 1 — Street Level (1-5 nerve)**
- Graffiti tagging (Stealth/Notoriety)
- Pickpocketing (Cash, trains Agility)
- Shoplifting (Items, trains Stealth)
- Leafleting (Charisma XP, Cell recruitment)
- Dumpster diving (Items, free)

**Tier 2 — Getting Serious (6-15 nerve)**
- Car theft (Vehicles, cash)
- Breaking & Entering (Items, cash)
- Mugging (Cash, PvP-lite)
- Drug dealing (High cash, risk)
- Vandalism/sabotage (Notoriety)

**Tier 3 — Major Operations (16-30 nerve)**
- Armed robbery (Big cash)
- System hacking (Requires INT, big payouts)
- Arson (Notoriety, high risk)
- Fencing stolen goods (Economy play)
- Smuggling run (Requires Travel)

**Tier 4 — Endgame (31-50 nerve)**
- Bank job (Requires Cell + planning phase)
- Political assassination (Notoriety, PvP)
- Underground arms dealing
- Organized sabotage campaigns

### 4. Consequences
- **Jail** — Failed crime → jail timer (bypass with items/bribes)
- **Hospital** — Failed PvP/high-risk crime → hospital timer
- **Wanted Level** — Cumulative heat from crimes; affects success rates
- **Heat Decay** — Laying low or bribing cops reduces heat over time

### 5. Economy
- **Scrip** — Underground cash currency (primary)
- **Black Market** — Player-to-player item trading
- **Underground Shops** — Buy tools, weapons, meds, escape items
- **Fencing** — Sell stolen goods (variable rates)
- **Banking** — Store cash safely (prevents mugging loss)

### 6. Items
**Tools:** Lockpick, Bolt cutters, Crowbar, Burner phone, Fake ID  
**Weapons:** Knife, Pipe, Handgun (illegal = raises heat)  
**Medical:** Bandages, Painkillers, Street doc services  
**Consumables:** Energy drink (+30 Energy), Adrenaline (+nerve), Bribe money  
**Special:** Police scanner, Getaway car, Encrypted laptop

### 7. Cells (Factions)
Groups of players organized as underground cells.
- Max 50 members per Cell
- Cell bank, shared territory
- Territory control = passive income + bonuses
- Cell vs Cell wars (territory disputes)
- Cell ranks: Recruit → Operative → Lieutenant → Strategist → Cell Leader

**Starter Cells (NPC):**
- The Collective (anarchist/political)
- Street Syndicates (pure crime)
- Digital Underground (hacker-focused)
- The Cartel (drug/economy focused)

### 8. Territories (Districts)
| District | Flavor | Income Type | Control Bonus |
|----------|--------|-------------|---------------|
| The Slums | Starting zone, low risk | Petty crime | None |
| Industrial | Warehouses, factories | Smuggling, theft | +15% heist payout |
| Financial | Banks, suits | White collar, hacking | +20% cash crimes |
| Gov Quarter | Cops everywhere | High risk/reward | +notoriety |
| The Docks | Import/export | Smuggling | +drug income |
| Underground Market | NPC hub | Trading, fencing | -10% shop prices |

### 9. Travel
- Travel between cities (different servers/instances eventually)
- Each city has unique crime sets + prices
- Travel time (real-time minutes) = during which you're "in transit"
- Can be mugged in transit

### 10. Events & Daily Content
- **Daily Streak** — Log in daily for rewards
- **Random Events** — Tip-off for a big score, police crackdown, black market surplus
- **Weekly Leaderboards** — Top earner, top crimes, most notoriety
- **Global Events** — Cell wars, city-wide crackdowns, economic crashes

---

## 🖥️ UI Design — Torn-Style
- Dark theme, dense information layout
- Persistent top bar: HP/Energy/Nerve bars + Cash
- Left sidebar: Navigation (Crimes, Gym, Market, Cell, etc.)
- Main content area: Tables, action panels, log feeds
- Right panel (optional): Recent activity feed
- NO fancy graphics — occasional thematic icons only
- Monospace data, bold headers, amber/green accent on black

---

## 🗺️ Progression Arc
```
New player → Petty crimes + stat grinding →
Join/form a Cell → Territory control + economy →
Tier 3-4 crimes + PvP → City-wide notoriety →
Endgame: Cell dominance / Top Leaderboard
```

---

## 🏗️ Tech Stack
- **Backend:** Node.js + Express
- **Database:** SQLite (via better-sqlite3) → PostgreSQL for scale
- **Auth:** Session-based (express-session + bcrypt)
- **Frontend:** Vanilla HTML/CSS/JS (server-rendered pages)
- **Realtime:** Polling (v1) → Socket.io (v2)
- **Deploy:** Replit / Railway / Render

---

## 📅 Roadmap
### v0.1 — Foundation
- [x] Auth (register/login)
- [x] Player stats + resources (Energy/Nerve/HP)
- [x] Tier 1-2 Crimes
- [x] Basic gym (stat training)
- [x] Jail/Hospital system

### v0.2 — Economy
- [ ] Inventory system
- [ ] Underground Market (NPC shops)
- [ ] Black Market (player trading)
- [ ] Banking

### v0.3 — Social
- [ ] Player search + profiles
- [ ] Cell system
- [ ] PvP (mugging)
- [ ] Territory basics

### v0.4 — Depth
- [ ] Tier 3-4 crimes
- [ ] Travel system
- [ ] Events system
- [ ] Leaderboards

### v0.5 — Endgame
- [ ] Cell wars
- [ ] Territory control
- [ ] Political assassination chains
- [ ] Full economy tuning
