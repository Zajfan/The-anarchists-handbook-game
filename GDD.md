# The Anarchist's Handbook — Game Design Document v2.0
**Genre:** Text-based PBBG (Persistent Browser-Based Game)  
**Tone:** Gritty, ideological, underground — think zine culture meets 90s hacker BBS  
**Layout:** Torn City-style (text-heavy, dense UI, resource bars, no game graphics)

---

## 🎭 The Premise

> *"You are [PLAYER]. Broke, angry, and all out of luck.*
> *A true anarchist — not just in name, but in blood.*
> *The system didn't just fail you. It was designed to.*
> *One day, tucked inside a dumpster behind a used bookshop,*
> *you find it: a battered, photocopied copy of The Anarchist's Handbook.*
> *Dog-eared. Annotated. Real.*
> *You read it cover to cover in one night.*
> *By morning, you know what you need to do.*
> *The materials are out there. The knowledge is in your hands.*
> *The world is at your mercy.*
> *What kind of mark will you leave?"*

---

## ⚙️ Core Tone Pillars
1. **The Handbook is sacred** — Every activity, every unlock is tied to a chapter of the book
2. **The System is the enemy** — Government, corporations, and authority are your targets
3. **You are not a criminal for profit** — You are an agent of chaos with a worldview
4. **Ideology shapes your path** — Different ideological stances unlock different content
5. **Consequences are real** — Heat, surveillance, infiltration — the state fights back

---

## 🌡️ Core Resources

| Resource | Flavor Name | Max | Regen | Purpose |
|----------|-------------|-----|-------|---------|
| **Energy** | Resolve | 150 | +5 / 30 min | Training, Prep Work |
| **Nerve** | Nerve | 50 | +1 / 5 min | Direct Actions |
| **HP** | Condition | 100 | +5 / 30 min | Street confrontations |
| **Heat** | Heat Level | 0-100 | Decays -1 / hr | Risk multiplier |

> Heat is a **fourth resource** — it accumulates with every action and decays slowly.
> High heat = police crackdowns, informants in your cell, failed operations.
> It never fully resets without deliberate counter-measures.

---

## 📊 Stats

| Stat | Abbr | Role |
|------|------|------|
| **Resolve** | RES | Resist interrogation, stay committed under pressure |
| **Agility** | AGI | Escape, movement, physical confrontations |
| **Stealth** | STH | Surveillance evasion, covert operations |
| **Intellect** | INT | Hacking, chemistry, planning complex operations |
| **Charisma** | CHA | Recruitment, propaganda effectiveness, negotiation |
| **Notoriety** | — | Your reputation in the underground. Unlocks contacts and content |

---

## 📖 The Handbook — Chapter System

The game is structured around **Handbook Chapters**. Each chapter unlocks a category of activities.
You start with Chapter 1 visible. New chapters unlock as Notoriety grows.

### Chapter 1 — The Basics (Starter, always available)
> "Before you can change the world, you have to understand it."

- **Leafleting** — Spread propaganda. Nerve 1. Low heat. Builds Notoriety + Charisma XP.
- **Dumpster Diving** — Scavenge materials and components. Free action, no nerve.
- **Graffiti** — Tag walls with slogans. Nerve 1. Notoriety + Stealth XP.
- **Street Meeting** — Recruit a sympathizer. Nerve 2, Charisma check. Adds to your Cell.
- **Surveillance Run** — Scout a target location. Nerve 2. Prereq for bigger ops.

### Chapter 2 — Infiltration (Unlocks at Notoriety 25)
> "The enemy's systems are open books if you know how to read them."

- **Lock Bypass** — Break into a location. Nerve 6. Stealth check. Requires lockpick tool.
- **Document Forgery** — Fake IDs, permits, press passes. INT check. Reduces heat.
- **Tail & Surveil** — Shadow a target. AGI + STH check. Generates intel.
- **Dumpster Intelligence** — Raid office trash for documents/keys. Low nerve, moderate reward.
- **Burner Network** — Set up anonymous comms. INT check. Passive: reduces heat decay timer.

### Chapter 3 — Sabotage (Unlocks at Notoriety 75)
> "Infrastructure is the skeleton of control. Break a bone."

- **Billboard Liberation** — Culturejam a corporate billboard. High Notoriety, low risk.
- **Vehicle Disabling** — Disable cop cars or corporate fleet. Nerve 10. AGI check.
- **Power Disruption** — Cut power to a facility. Nerve 12. INT + STH check.
- **Supply Interference** — Disrupt a delivery chain. Nerve 10. CHA + INT.
- **Communications Jamming** — Block radio/comms in an area. Nerve 14. Major heat.

### Chapter 4 — Chemical Knowledge (Unlocks at Notoriety 150 + INT 15)
> "Chemistry is just physics you can smell."

- **Smoke Device** — Craft a smoke canister. Requires components. Used in other ops.
- **Irritant Mixture** — Crowd dispersal compound. Crafted item. Used in Street Battle ops.
- **Tracer Compound** — Mark vehicles/packages to track targets. INT check.
- **Incendiary (Small)** — Targeted fire-starting device. Nerve 20. High heat.
- **Lab Setup** — Build an underground chem lab. Passive: unlocks crafting recipes.

### Chapter 5 — Electronic Warfare (Unlocks at Notoriety 150 + INT 20)
> "Every system has a backdoor. Find it."

- **Phone Phreaking** — Exploit telecom systems. INT check. Cash + info.
- **System Intrusion** — Hack a corporate/government server. Nerve 18. Big payout.
- **Database Dump** — Extract sensitive records. Nerve 20. Blackmail/expose targets.
- **Signal Hijack** — Override a broadcast. Nerve 22. Maximum notoriety.
- **Ghost Protocol** — Fully erase your digital footprint. Reduces heat significantly.

### Chapter 6 — Direct Action (Unlocks at Notoriety 300)
> "There is a time for words. That time has passed."

- **Protest Organization** — Lead a protest. Requires Cell members. High notoriety.
- **Riot Instigation** — Escalate a protest to confrontation. Nerve 30. Mass heat + notoriety.
- **Facility Occupation** — Seize and hold a building. Cell operation. Territory gain.
- **Infrastructure Strike** — Major sabotage of key infrastructure. Nerve 40.
- **The Manifesto** — Publish your ideology. Unlocks unique ending path.

---

## 🌡️ The Heat System

Heat is a hidden war between you and the state.

| Heat Level | Status | Effects |
|-----------|--------|---------|
| 0-20 | Ghost | Full success rates. Clean slate. |
| 21-40 | Noticed | -5% success rate. Occasional tail. |
| 41-60 | Watched | -15% success. Informant risk in Cell. |
| 61-80 | Hunted | -25% success. Some ops locked. Undercover encounters. |
| 81-100 | Priority Target | -40% success. Raid risk. Cell exposed. |

**Heat Reduction Methods:**
- Lay Low (costs 24hr of no actions, -10 heat)
- Burner Network (passive decay boost)
- Ghost Protocol (Chapter 5, -30 heat)
- Move safe house (costs Scrip + Nerve)
- Use a Clean Identity (consumable item)

---

## 💰 Economy

**Currency: Scrip** — Underground, untraceable. Not dollars.

Sources: Document forgery, hacking, blackmail, cell fundraising, market trades.
Expenses: Components, safe house rent, bail, bribes, equipment.

No legitimate economy. No banks. You are outside the system.

---

## 🔧 Crafting (Components System)

Many high-tier actions require Components — scavenged or purchased materials.

| Component | Source | Used In |
|-----------|--------|---------|
| Wire | Dumpster / market | Electronics, devices |
| Chemicals | Underground market | Lab recipes |
| Paper stock | Dumpster / market | Leaflets, forgeries |
| Electronics | Scavenge / market | Hacking tools |
| Containers | Dumpster | Lab items |
| Fuel | Scavenge | Incendiary recipes |

---

## 🏠 The Safe House

Your base of operations. Upgradable.

| Level | Cost | Unlocks |
|-------|------|---------|
| 1 — Squat | Free | Basic storage, rest |
| 2 — Rented Room | 500 Scrip | Crafting bench, hidden stash |
| 3 — Underground Flat | 2000 Scrip | Lab setup possible, cell meetings |
| 4 — Network Node | 8000 Scrip | Digital infrastructure, reduced heat decay |

---

## ⚖️ Ideology System

At start, player chooses their ideological stance.

| Ideology | Flavor | Unique Unlock |
|----------|--------|---------------|
| **Black Bloc** | Pure direct action, confrontational | Street Battle + Riot bonuses |
| **Hacktivist** | Digital warfare, information liberation | Electronic Warfare bonuses |
| **Eco-Anarchist** | Anti-corporate, environmental | Infrastructure sabotage bonuses |
| **Insurrectionist** | Radical, destabilize everything | Chapter 6 unlocks faster |
| **Syndicalist** | Labor organizing, collective action | Cell bonuses, recruitment |

---

## 🏘️ Cells (Factions)

Underground cells. Same Torn-style faction structure but ideologically framed.

- Max 30 members
- Cell operations: coordinated direct actions for big rewards
- Cell territory: safe houses, printing presses, stash spots
- Cell war: rival groups (fascists, corporate security, rival factions)
- Ranks: Sympathizer > Comrade > Operative > Organizer > Cell Lead

---

## ⚔️ Antagonists

- **Local Police** — Low-level heat response. Surveillance, arrests.
- **Federal Agencies** — Triggered at high Heat. Undercovers, stings.
- **Corporate Security** — Triggered by targeting corp assets. Private contractors.
- **Fascist Groups** — Rival street factions. PvP encounters.
- **Informants** — Can appear inside your Cell at high heat. Must be identified.

---

## 📅 Roadmap

### v0.1 — Foundation (current)
- [x] Auth system
- [x] Resource system (Energy/Nerve/HP)
- [x] Chapter 1 actions (Handbook-themed)
- [x] Training/gym system
- [x] Jail system
- [x] Torn-style UI

### v0.2 — Heat & Ideology
- [ ] Heat system (4th resource, decay, effects on success rate)
- [ ] Ideology selection at character creation
- [ ] Chapter 2 unlock (Infiltration)
- [ ] Components + basic crafting
- [ ] Safe house system

### v0.3 — Cells & Social
- [ ] Cell creation/joining
- [ ] Chapter 3 unlock (Sabotage)
- [ ] Informant mechanic
- [ ] Cell operations (group actions)

### v0.4 — Deep Systems
- [ ] Chapter 4 & 5 (Chemical/Electronic)
- [ ] Full crafting system
- [ ] Blackmail/leverage system
- [ ] Antagonist encounters

### v0.5 — Endgame
- [ ] Chapter 6 (Direct Action)
- [ ] The Manifesto ending paths
- [ ] Cell wars / territory control
- [ ] Ideology endgame divergence
