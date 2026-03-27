# The Anarchist's Handbook — Game Design Document v0.2
**Genre:** Text-based PBBG (Persistent Browser-Based Game)
**Tone:** Starts gritty 90s street punk → evolves into encrypted digital underground
**Inspiration:** Torn City (UI/mechanics), the actual Anarchist's Handbook (content/theme)

---

## 🔴 The Premise

> *You are [name]. No job, no future, no illusions. You found the Handbook in a dumpster behind a copy shop — water-damaged, half the pages stuck together, but it was all there. You read it cover to cover in one night on a park bench.*
>
> *You can't un-read it.*
>
> *The city stretches out ahead of you. The corporations own the buildings. The State owns the cops. The surveillance grid owns the streets. And you — you've got the Handbook and enough anger to do something about it.*
>
> *Where do you start?*

This is not a game about robbing civilians. The targets are **The Machine** — corporations, government infrastructure, police surveillance networks. The Handbook is your guide. The city is your classroom. The question is how far you're willing to go.

---

## ⚙️ Core Resources

| Resource | Max | Regen | Purpose |
|----------|-----|-------|---------|
| **Stamina** | 150 | +5 / 30 min | Operations, training |
| **Nerve** | 50 | +1 / 5 min | High-risk operations |
| **Health** | 100 | +5 / 30 min | Confrontations, injuries |
| **Influence** | unlimited | Earned | Primary progression — your reach in the underground |
| **Heat** | 0-100 | Accumulates | Surveillance level — affects op difficulty, triggers raids |
| **Scrip** | unlimited | Earned | Underground cash — gear, safe houses, bribes |

### Heat System
Heat accumulates with every operation. At thresholds:
- **0-20:** Low profile. Operations run normally.
- **21-40:** Persons of interest. Success rates slightly reduced.
- **41-60:** Active surveillance. Harder operations, occasional Raid events.
- **61-80:** Priority target. Frequent raids, reduced recruitment.
- **81-100:** Full manhunt. Only safe houses protect you.

Heat decays naturally over time. Faster via: laying low, counter-surveillance ops, changing safe houses.

---

## 📊 Player Stats

| Stat | Governs |
|------|---------|
| **Body** | Physical operations, confrontations, endurance |
| **Reflexes** | Escape chance, evading pursuit, travel ops |
| **Ghost** | Surveillance evasion, counter-heat, stealth ops |
| **Tech** | Hacking, device construction, digital operations |
| **Voice** | Recruiting, propaganda reach, cell leadership |

---

## 📖 The Handbook — Chapter System

The Handbook is a literal in-game item. Each chapter unlocks an operation tier, gated by Influence thresholds — not just level grind.

### Chapter 1: The Street (always available)
*"Before anything else, you learn to see the city differently."*
- Wheatpaste a wall | Nerve 1 | Ghost
- Print & distribute leaflets | Nerve 2 | Voice
- Map a surveillance route | Nerve 1 | Ghost
- Dumpster dive (corp bins) | Nerve 1 | free
- Pick a lock (practice run) | Nerve 2 | Reflexes
- Tag a police vehicle | Nerve 3 | Ghost

### Chapter 2: Direct Action (500 Influence)
*"Property enforces power. Disrupting it disrupts power."*
- Sabotage a corp vehicle | Nerve 8 | Body
- Destroy a surveillance camera | Nerve 7 | Ghost
- Banner drop (corp HQ) | Nerve 10 | Voice
- Break into corp records room | Nerve 12 | Ghost
- Disrupt a corporate event | Nerve 14 | Voice
- Arson (infrastructure target) | Nerve 18 | Body

### Chapter 3: Information Warfare (2,000 Influence)
*"The most powerful weapon is the one they can't confiscate."*
- Pirate radio broadcast | Nerve 10 | Tech
- Underground newsletter print run | Nerve 8 | Voice
- Leak stolen documents | Nerve 12 | Tech
- Intercept police comms | Nerve 14 | Tech
- Counter-disinfo campaign | Nerve 10 | Voice
- Hack & deface corp website | Nerve 16 | Tech

### Chapter 4: The Network (5,000 Influence)
*"Alone you're a nuisance. A network is something they have to take seriously."*
- Establish a safe house | Nerve 15 | Ghost
- Recruit a sympathiser | Nerve 12 | Voice
- Set up encrypted comms | Nerve 14 | Tech
- Courier a sensitive package | Nerve 16 | Reflexes
- Infiltrate a target organisation | Nerve 20 | Ghost
- Build a support network | Nerve 18 | Voice

### Chapter 5: Technical Operations (15,000 Influence)
*"The Handbook's later chapters. You understand now what they're for."*
- Breach a corporate network | Nerve 20 | Tech
- Hack police database | Nerve 22 | Tech
- Disrupt surveillance grid (zone) | Nerve 24 | Tech
- Improvised device (abstracted) | Nerve 30 | Tech+Body
- Infrastructure disruption | Nerve 35 | Tech
- Ghost mode (full counter-surveillance) | Nerve 18 | Ghost

### Chapter 6: The Uprising (50,000 Influence — Endgame)
- Mass Mobilization — spend Influence to trigger city-wide event
- The General Strike — Cell op, requires 20+ members
- System Collapse — Multi-cell op, raid on The Machine
- Legacy — Retire, leave permanent mark on game world

---

## 🧑‍🤝‍🧑 Dual Progression Paths (fork at Ch.3)

### Path A: The Operative (Solo)
Focus: Ghost, Tech, Reflexes
- Higher solo op success rates
- Ghost Mode: invisible to other players
- Unique ops: infiltration, deep cover, solo infrastructure hits
- Endgame: the ghost the system can never catch

### Path B: The Organiser (Movement Builder)
Focus: Voice, Influence, Cell mechanics
- Cell size cap doubled (100 vs 50)
- Unique ops: mass recruitment, propaganda campaigns, general strikes
- Passive Influence income from network
- Endgame: lead a movement, trigger Uprising events

---

## 🏘️ The City — Zones

| Zone | Vibe | Bonus | Heat Modifier |
|------|------|-------|---------------|
| **The Estate** | Council blocks, broken lifts. Where you started. | Starter ops | None |
| **Corporate Park** | Glass towers, private security, CCTV. | Info war, heists | +20% Heat |
| **The Old Town** | Indie shops, artists, sympathisers. | Recruiting, network | -10% Heat |
| **The Docks** | Containers full of things. No questions. | Smuggling, materials | None |
| **Government Quarter** | Camera on every corner. Massive stakes. | Ch.5+ ops | +40% Heat |
| **The Underground** | Black market, safe houses, fences. | Trading, bribes | Passive Heat decay |

---

## 💰 Economy

- **Scrip** — Underground cash. Earned from ops, selling documents/materials.
- **Influence** — Your reach. Cannot be bought. Cannot be traded. Only built.
- **Materials** — Looted resources (batteries, cables, paint, paper) for crafting/funding ops.
- **Documents** — Intel stolen from corps/state. Sell or leak.
- **Black Market** — Player-to-player trading.

---

## 📅 Roadmap

### v0.1 ✅ Foundation
- Auth, basic stats, tier 1-2 crimes, gym, jail

### v0.2 — The Reframe (current)
- [x] New GDD
- [ ] Stats → Body/Reflexes/Ghost/Tech/Voice
- [ ] Ops → Handbook chapter system (Ch.1-2 live)
- [ ] Influence + Heat as core resources
- [ ] Intro narrative on first login
- [ ] Full UI copy rewrite (no more generic crime language)

### v0.3 — Economy
- [ ] Materials + Documents inventory
- [ ] Black Market player trading
- [ ] Underground gear shops

### v0.4 — Cells & Paths
- [ ] Cell system
- [ ] Operative vs Organiser path fork
- [ ] Recruiting ops
- [ ] Zone control

### v0.5 — Digital Arc
- [ ] Full Ch.4-5 tech ops
- [ ] Heat system raids
- [ ] Encrypted comms

### v0.6 — The Uprising
- [ ] Ch.6 mass events
- [ ] Legacy mechanic
