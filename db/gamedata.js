// ─── THE ANARCHIST'S HANDBOOK — GAME DATA ────────────────────────────────────
//
// Every action in the game is tied to a Chapter of the Handbook.
// You didn't choose to be here. You chose to act.
//

// ─── HANDBOOK ACTIONS (replacing "crimes") ───────────────────────────────────
const ACTIONS = {

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 1 — THE BASICS
  // "Before you can change the world, you have to understand it."
  // ═══════════════════════════════════════════════════════════════════════════

  leafleting: {
    name: 'Leafleting',
    chapter: 1,
    chapterName: 'Chapter 1 — The Basics',
    nerve: 1,
    description: 'Print and distribute propaganda. Radicalize the neighbourhood, one flyer at a time.',
    baseSuccessRate: 0.95,
    stat: 'charisma',
    heatGain: 2,
    rewards: { cashMin: 0, cashMax: 30, xp: 5, notoriety: 3 },
    jailTime: 60,
    outcomes: {
      success: [
        'Stacks gone by noon. People are reading.',
        'Slid them under doors, pinned them to poles. The message is out.',
        'An old man stopped to read one and nodded. That\'s enough.',
      ],
      fail: [
        'A cop spotted you and grabbed the stack. Move on.',
        'Property owner called it in. You scattered.',
        'Rain soaked the whole print run before you distributed half.',
      ]
    }
  },

  dumpster_intel: {
    name: 'Dumpster Diving',
    chapter: 1,
    chapterName: 'Chapter 1 — The Basics',
    nerve: 1,
    description: 'Corporate wastage is your resource library. Scavenge components, documents, materials.',
    baseSuccessRate: 0.94,
    stat: null,
    heatGain: 0,
    rewards: { cashMin: 0, cashMax: 20, xp: 3, notoriety: 0, componentChance: 0.4 },
    jailTime: 0,
    outcomes: {
      success: [
        'Half-used wire spool, some containers. Good score.',
        'Shredded documents — but not shredded well enough. Intel.',
        'Chemical supply company threw out a full case of something useful.',
      ],
      fail: [
        'Picked clean. Someone got here first.',
        'Nothing but food waste tonight.',
        'Security light came on. You left empty-handed.',
      ]
    }
  },

  graffiti: {
    name: 'Graffiti',
    chapter: 1,
    chapterName: 'Chapter 1 — The Basics',
    nerve: 2,
    description: 'Mark territory. Leave a message. Make them look at what they\'d rather ignore.',
    baseSuccessRate: 0.90,
    stat: 'stealth',
    heatGain: 3,
    rewards: { cashMin: 0, cashMax: 0, xp: 6, notoriety: 4 },
    jailTime: 120,
    outcomes: {
      success: [
        '"ACAB" in three-foot letters on the precinct wall. Beautiful.',
        'Painted the corporate logo over with something true.',
        'The whole underpass, wall to wall. They\'ll power-wash it by morning. Doesn\'t matter.',
      ],
      fail: [
        'Cop on patrol spotted the spray can.',
        'Security camera angle you didn\'t account for.',
        'A resident called it in while you were still on the wall.',
      ]
    }
  },

  street_meeting: {
    name: 'Street Organising',
    chapter: 1,
    chapterName: 'Chapter 1 — The Basics',
    nerve: 3,
    description: 'Talk to people. Find the ones who are angry enough to act. Build the network.',
    baseSuccessRate: 0.82,
    stat: 'charisma',
    heatGain: 2,
    rewards: { cashMin: 0, cashMax: 0, xp: 10, notoriety: 5, recruitChance: 0.3 },
    jailTime: 0,
    outcomes: {
      success: [
        'One contact. One more person who knows the plan.',
        'A young one — furious at everything, but unfocused. You gave them direction.',
        'She\'d been waiting for someone to ask. Now she\'s with us.',
      ],
      fail: [
        'Wrong crowd. Someone looked at you like they might report it.',
        'Undercover cop was working the same corner. You clocked them in time.',
        'Nobody wanted to hear it tonight.',
      ]
    }
  },

  surveillance_run: {
    name: 'Surveillance Run',
    chapter: 1,
    chapterName: 'Chapter 1 — The Basics',
    nerve: 2,
    description: 'Scout a location before acting. Know your exits. Know their patrols. No surprises.',
    baseSuccessRate: 0.88,
    stat: 'stealth',
    heatGain: 1,
    rewards: { cashMin: 0, cashMax: 0, xp: 8, notoriety: 1, intelGained: true },
    jailTime: 0,
    outcomes: {
      success: [
        'Camera placement mapped. Guard rotation noted. You\'re ready.',
        'Three exits. One with a blind spot. Filed.',
        'Patrol runs every 22 minutes. That\'s the window.',
      ],
      fail: [
        'Guard spotted you loitering. You moved on.',
        'Spent two hours and learned nothing useful.',
        'They changed the security layout. Your intel is outdated.',
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 2 — INFILTRATION
  // "The enemy's systems are open books if you know how to read them."
  // ═══════════════════════════════════════════════════════════════════════════

  lock_bypass: {
    name: 'Lock Bypass',
    chapter: 2,
    chapterName: 'Chapter 2 — Infiltration',
    nerve: 6,
    description: 'Get through a locked door without a key. The Handbook has three methods. Pick one.',
    baseSuccessRate: 0.78,
    stat: 'stealth',
    heatGain: 8,
    rewards: { cashMin: 100, cashMax: 400, xp: 20, notoriety: 6 },
    jailTime: 300,
    minNotoriety: 25,
    outcomes: {
      success: [
        'Inside in under 90 seconds. Clean.',
        'Tension wrench, light pick. Door swung open like it wanted to.',
        'They didn\'t change the lock after the last time someone did this. Their mistake.',
      ],
      fail: [
        'Pick snapped off in the cylinder. You walked.',
        'Alarm sensor you didn\'t clock on the door frame.',
        'Someone was home. Not expected.',
      ]
    }
  },

  document_forgery: {
    name: 'Document Forgery',
    chapter: 2,
    chapterName: 'Chapter 2 — Infiltration',
    nerve: 5,
    description: 'Forge press passes, permits, official IDs. Move freely. Be invisible.',
    baseSuccessRate: 0.80,
    stat: 'intellect',
    heatGain: 5,
    rewards: { cashMin: 200, cashMax: 800, xp: 25, notoriety: 4 },
    jailTime: 600,
    minNotoriety: 25,
    outcomes: {
      success: [
        'Laminated, embossed, signed. Indistinguishable.',
        'Sold three passes to comrades who needed them. Useful.',
        'Press credential gets you past checkpoints they\'d stop anyone else at.',
      ],
      fail: [
        'Wrong paper stock. They could tell under the light.',
        'Serial number format was off. Too bad.',
        'The person checking IDs actually knew what to look for.',
      ]
    }
  },

  tail_surveil: {
    name: 'Tail & Surveil',
    chapter: 2,
    chapterName: 'Chapter 2 — Infiltration',
    nerve: 7,
    description: 'Follow a target. Corporate exec, informant, cop. Know their routine. Build leverage.',
    baseSuccessRate: 0.75,
    stat: 'agility',
    heatGain: 6,
    rewards: { cashMin: 0, cashMax: 0, xp: 30, notoriety: 8, intelGained: true },
    jailTime: 240,
    minNotoriety: 25,
    outcomes: {
      success: [
        'Three days of routine. Mapped. Now you know everything.',
        'Followed them to a meeting they don\'t want documented.',
        'Home address. Vehicle. Regular routes. Filed.',
      ],
      fail: [
        'They made you on the third block. You split.',
        'Lost them in a crowd and burned the whole operation.',
        'They took a cab. You\'re on foot. Operation blown.',
      ]
    }
  },

  burner_network: {
    name: 'Burner Network',
    chapter: 2,
    chapterName: 'Chapter 2 — Infiltration',
    nerve: 8,
    description: 'Set up dead drops, burner phones, anonymous signal chains. Build the infrastructure that keeps you invisible.',
    baseSuccessRate: 0.83,
    stat: 'intellect',
    heatGain: 4,
    rewards: { cashMin: 0, cashMax: 0, xp: 35, notoriety: 5, heatDecayBoost: true },
    jailTime: 0,
    minNotoriety: 25,
    outcomes: {
      success: [
        'Five drop points. Rotating keys. Nobody talks directly anymore.',
        'Signal chain is clean. Three hops before anything traces back.',
        'The network is live. Heat decay just got faster.',
      ],
      fail: [
        'A link in the chain was already compromised. Start over.',
        'Burner phone was registered. Rookie error somewhere.',
        'A contact used it wrong. The whole thing is burned.',
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 3 — SABOTAGE
  // "Infrastructure is the skeleton of control. Break a bone."
  // ═══════════════════════════════════════════════════════════════════════════

  billboard_liberation: {
    name: 'Billboard Liberation',
    chapter: 3,
    chapterName: 'Chapter 3 — Sabotage',
    nerve: 8,
    description: 'Culturejam a corporate billboard. Replace their message with yours. They paid for airspace in your community.',
    baseSuccessRate: 0.82,
    stat: 'stealth',
    heatGain: 10,
    rewards: { cashMin: 0, cashMax: 0, xp: 30, notoriety: 18 },
    jailTime: 300,
    minNotoriety: 75,
    outcomes: {
      success: [
        'Their ad gone. Your message up. Photos already circulating online.',
        'Forty feet high, visible from the highway. They can\'t look away.',
        'The replacement was better than anything they spent money on.',
      ],
      fail: [
        'Security guard was watching the lot. Called it in immediately.',
        'Harness gave way. You made it down but barely got started.',
        'Someone filmed you from a window. Time to move.',
      ]
    }
  },

  vehicle_disabling: {
    name: 'Vehicle Disabling',
    chapter: 3,
    chapterName: 'Chapter 3 — Sabotage',
    nerve: 10,
    description: 'Disable cop cars or corporate fleet vehicles. A vehicle out of service is an operation that doesn\'t happen.',
    baseSuccessRate: 0.74,
    stat: 'agility',
    heatGain: 14,
    rewards: { cashMin: 0, cashMax: 100, xp: 40, notoriety: 12 },
    jailTime: 600,
    minNotoriety: 75,
    outcomes: {
      success: [
        'Brake line. Four vehicles out of rotation for the week.',
        'Simple and clean. They won\'t know until the ignition.',
        'Fleet marked. None of them are going anywhere tonight.',
      ],
      fail: [
        'Lot security was tighter than you expected.',
        'Finished the job but left a clear trail. Camera.',
        'Patrol came back early. You got two done out of five.',
      ]
    }
  },

  power_disruption: {
    name: 'Power Disruption',
    chapter: 3,
    chapterName: 'Chapter 3 — Sabotage',
    nerve: 12,
    description: 'Cut power to a facility — corporate HQ, surveillance hub, police comms relay. Darkness is operational cover.',
    baseSuccessRate: 0.68,
    stat: 'intellect',
    heatGain: 18,
    rewards: { cashMin: 0, cashMax: 200, xp: 55, notoriety: 20 },
    jailTime: 900,
    minNotoriety: 75,
    outcomes: {
      success: [
        'Grid section down. Six hours minimum before restoration.',
        'Their cameras went dark. Their comms went quiet. The window is open.',
        'The whole block. Collateral inconvenience — but the target is blind.',
      ],
      fail: [
        'They had a backup generator. Barely a hiccup.',
        'Electrical hazard — you pulled back before finishing.',
        'Maintenance crew happened to be on-site. Bad timing.',
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 5 — ELECTRONIC WARFARE
  // "Every system has a backdoor. Find it."
  // ═══════════════════════════════════════════════════════════════════════════

  phone_phreaking: {
    name: 'Phone Phreaking',
    chapter: 5,
    chapterName: 'Chapter 5 — Electronic Warfare',
    nerve: 12,
    description: 'Exploit the telephone network. Free calls, intercepts, signal rerouting. The infrastructure was never built to keep you out.',
    baseSuccessRate: 0.72,
    stat: 'intellect',
    heatGain: 10,
    rewards: { cashMin: 300, cashMax: 900, xp: 45, notoriety: 10 },
    jailTime: 600,
    minNotoriety: 150,
    minStat: { intellect: 20 },
    outcomes: {
      success: [
        'Rerouted three executive lines. Everything they say is yours.',
        'Free long distance for the entire cell network. Small win.',
        'Found a billing exploit. Running it quietly.',
      ],
      fail: [
        'Telecom security flagged the anomaly faster than expected.',
        'The exchange was updated. Old methods don\'t work here.',
        'Traced back to the origin node. Time to disappear.',
      ]
    }
  },

  system_intrusion: {
    name: 'System Intrusion',
    chapter: 5,
    chapterName: 'Chapter 5 — Electronic Warfare',
    nerve: 18,
    description: 'Breach a corporate or government server. Extract funds, documents, access. They said their systems were secure.',
    baseSuccessRate: 0.62,
    stat: 'intellect',
    heatGain: 22,
    rewards: { cashMin: 1500, cashMax: 5000, xp: 90, notoriety: 25 },
    jailTime: 1800,
    minNotoriety: 150,
    minStat: { intellect: 20 },
    outcomes: {
      success: [
        'In and out. No trace. Funds transferred.',
        'Their internal comms are now an open book.',
        'Root access. They have no idea.',
      ],
      fail: [
        'Honeypot — they were waiting for exactly this.',
        'Two-factor blocked the final step.',
        'Their security team is better than the last client.',
      ]
    }
  },

  ghost_protocol: {
    name: 'Ghost Protocol',
    chapter: 5,
    chapterName: 'Chapter 5 — Electronic Warfare',
    nerve: 14,
    description: 'Systematically erase your digital footprint. CCTV, databases, warrants, records. Become a ghost.',
    baseSuccessRate: 0.78,
    stat: 'intellect',
    heatGain: -30, // negative = heat reduction
    rewards: { cashMin: 0, cashMax: 0, xp: 60, notoriety: 5, heatReduction: 30 },
    jailTime: 0,
    minNotoriety: 150,
    minStat: { intellect: 20 },
    outcomes: {
      success: [
        'Clean. Records wiped, flags cleared. You don\'t exist right now.',
        'Three weeks of digital presence — gone. Start fresh.',
        'Heat is gone. They\'re looking at a blank page.',
      ],
      fail: [
        'Couldn\'t reach one of the databases in time.',
        'A backup they didn\'t advertise. Some traces remain.',
        'The wipe was partial. Reduced heat, not zeroed.',
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 6 — DIRECT ACTION
  // "There is a time for words. That time has passed."
  // ═══════════════════════════════════════════════════════════════════════════

  protest_organisation: {
    name: 'Protest Organisation',
    chapter: 6,
    chapterName: 'Chapter 6 — Direct Action',
    nerve: 20,
    description: 'Organise a mass protest. Logistics, security, messaging. The streets belong to those willing to stand in them.',
    baseSuccessRate: 0.70,
    stat: 'charisma',
    heatGain: 25,
    rewards: { cashMin: 0, cashMax: 0, xp: 120, notoriety: 50 },
    jailTime: 900,
    minNotoriety: 300,
    outcomes: {
      success: [
        'Two hundred people. More than anyone expected. The news had to cover it.',
        'Disciplined, focused, loud. No arrests. Perfect.',
        'The target felt it. Their stock dropped two points by end of day.',
      ],
      fail: [
        'Infiltrated before it started. Three people arrested.',
        'Counter-protesters showed up heavy. Things fell apart.',
        'Low turnout. The message got lost.',
      ]
    }
  },

  the_manifesto: {
    name: 'Publish the Manifesto',
    chapter: 6,
    chapterName: 'Chapter 6 — Direct Action',
    nerve: 40,
    description: 'You\'ve done enough. You\'ve learned enough. Write your manifesto — and release it. Let the world know who you are and what you stand for. There\'s no coming back from this.',
    baseSuccessRate: 0.80,
    stat: 'charisma',
    heatGain: 50,
    rewards: { cashMin: 0, cashMax: 0, xp: 1000, notoriety: 200 },
    jailTime: 3600,
    minNotoriety: 300,
    isEndgame: true,
    outcomes: {
      success: [
        'It\'s out. It\'s everywhere. You can\'t take it back and you wouldn\'t want to.',
        'The underground is talking. Then the surface. Then everyone.',
        'They printed it in newspapers to condemn it. Doubled the readership.',
      ],
      fail: [
        'Intercepted before wide distribution. But copies are out there.',
        'The platform was seized. Copies survived in a dozen mirrors.',
        'Arrested during publication. The draft was already distributed.',
      ]
    }
  },
};

// ─── TRAINING ─────────────────────────────────────────────────────────────────
// Not "gym exercises" — these are how an anarchist prepares their body and mind.

const TRAINING = {
  // Physical
  running: {
    name: 'Distance Running',
    description: 'Stamina. Escape routes need legs that don\'t give out.',
    stat: 'agility',
    energyCost: 10,
    xpBase: 5,
    flavor: 'The city at 5am is yours alone.'
  },
  calisthenics: {
    name: 'Calisthenics',
    description: 'Functional strength. Walls, fences, locked spaces.',
    stat: 'strength',
    energyCost: 10,
    xpBase: 5,
    flavor: 'No gym membership. No witnesses.'
  },
  parkour: {
    name: 'Urban Movement',
    description: 'Get over, under, and through anything the city puts in your way.',
    stat: 'agility',
    energyCost: 20,
    xpBase: 12,
    flavor: 'Every building is an obstacle until it isn\'t.'
  },
  shadow_work: {
    name: 'Shadow Training',
    description: 'Move without being seen. Breathe without being heard.',
    stat: 'stealth',
    energyCost: 10,
    xpBase: 5,
    flavor: 'Darkness isn\'t cover. Stillness is.'
  },
  // Mental
  study: {
    name: 'Study the Handbook',
    description: 'Re-read. Annotate. Understand. The book rewards patience.',
    stat: 'intellect',
    energyCost: 10,
    xpBase: 5,
    flavor: 'Page 47 makes more sense every time.'
  },
  electronics_study: {
    name: 'Electronics Study',
    description: 'Circuits, signals, vulnerabilities. Learn what powers the system.',
    stat: 'intellect',
    energyCost: 20,
    xpBase: 12,
    flavor: 'Every network has a node. Every node has a weakness.'
  },
  // Social
  rhetoric: {
    name: 'Rhetoric Practice',
    description: 'Sharpen your words. Persuasion is a weapon.',
    stat: 'charisma',
    energyCost: 10,
    xpBase: 5,
    flavor: 'Arguments aren\'t won by volume.'
  },
  debate: {
    name: 'Ideological Debate',
    description: 'Argue with people who disagree. Get harder. Get clearer.',
    stat: 'charisma',
    energyCost: 20,
    xpBase: 12,
    flavor: 'If you can\'t defend it, you don\'t believe it yet.'
  },
  // Resolve
  meditation: {
    name: 'Meditation',
    description: 'Stay calm under pressure. Don\'t break in the interrogation room.',
    stat: 'resolve',
    energyCost: 10,
    xpBase: 5,
    flavor: 'The mind is the first thing they try to take.'
  },
};

// ─── ITEMS / COMPONENTS ───────────────────────────────────────────────────────

const ITEMS = {
  // Tools
  lockpick_set:     { name: 'Lockpick Set',       description: '+10% Lock Bypass success',         price: 200,  category: 'tool' },
  bolt_cutters:     { name: 'Bolt Cutters',        description: '+8% Lock Bypass, access chains',   price: 150,  category: 'tool' },
  scanner:          { name: 'Police Scanner',      description: '+10% all action success, hear patrols', price: 800, category: 'tool' },
  night_vision:     { name: 'Night Vision Goggles', description: '+15% stealth op success at night', price: 1200, category: 'tool' },
  encrypted_laptop: { name: 'Encrypted Laptop',   description: '+20% electronic warfare success',  price: 2500, category: 'tool' },
  signal_jammer:    { name: 'Signal Jammer',       description: 'Blocks local cameras/comms for one op', price: 600, category: 'tool' },

  // Consumables
  bandages:         { name: 'Bandages',            description: 'Restore 20 HP',       price: 60,  category: 'medical',     consumable: true, effect: { hp: 20 } },
  medkit:           { name: 'Field Medkit',        description: 'Restore 60 HP',       price: 250, category: 'medical',     consumable: true, effect: { hp: 60 } },
  energy_drink:     { name: 'Energy Drink',        description: '+30 Resolve',         price: 100, category: 'consumable',  consumable: true, effect: { energy: 30 } },
  stimulants:       { name: 'Stimulants',          description: '+15 Nerve',           price: 500, category: 'consumable',  consumable: true, effect: { nerve: 15 } },
  clean_identity:   { name: 'Clean Identity',      description: '-25 Heat instantly',  price: 1500, category: 'consumable', consumable: true, effect: { heat: -25 } },
  bail_fund:        { name: 'Bail Fund',           description: 'Immediately exit jail', price: 800, category: 'consumable', consumable: true },

  // Components (used in crafting)
  wire:             { name: 'Wire Spool',          description: 'Component — electronics ops', price: 40,  category: 'component' },
  chemicals:        { name: 'Chemical Stock',      description: 'Component — Chapter 4 recipes', price: 120, category: 'component' },
  paper_stock:      { name: 'Paper Stock',         description: 'Component — leaflets, forgeries', price: 30, category: 'component' },
  electronics:      { name: 'Electronics Parts',  description: 'Component — hacking tools',    price: 80,  category: 'component' },
  fuel_can:         { name: 'Fuel Canister',       description: 'Component — Chapter 4 recipes', price: 60, category: 'component' },
};

// ─── IDEOLOGIES ───────────────────────────────────────────────────────────────

const IDEOLOGIES = {
  black_bloc: {
    name: 'Black Bloc',
    description: 'Direct action. Confront the system physically. No half-measures.',
    bonuses: { stealth: 2, strength: 2 },
    flavor: '"Property destruction is not violence. Violence is what they do."',
    actionBonus: ['vehicle_disabling', 'protest_organisation', 'power_disruption'],
  },
  hacktivist: {
    name: 'Hacktivist',
    description: 'Information is power. The network is the battlefield.',
    bonuses: { intellect: 3, stealth: 1 },
    flavor: '"We are anonymous. We do not forgive. We do not forget."',
    actionBonus: ['phone_phreaking', 'system_intrusion', 'ghost_protocol', 'burner_network'],
  },
  eco_anarchist: {
    name: 'Eco-Anarchist',
    description: 'Corporations are destroying the planet. Destroy them first.',
    bonuses: { agility: 2, charisma: 2 },
    flavor: '"The earth doesn\'t need us. We need it."',
    actionBonus: ['vehicle_disabling', 'billboard_liberation', 'power_disruption'],
  },
  insurrectionist: {
    name: 'Insurrectionist',
    description: 'Waiting accomplishes nothing. Escalate everything.',
    bonuses: { resolve: 3, nerve_max: 5 },
    flavor: '"We tried petitions. We tried marches. Now we try something else."',
    actionBonus: ['protest_organisation', 'the_manifesto'],
    chapterUnlockBonus: true,
  },
  syndicalist: {
    name: 'Syndicalist',
    description: 'Workers organised are the only force that can stop capital.',
    bonuses: { charisma: 3, resolve: 1 },
    flavor: '"An injury to one is an injury to all."',
    actionBonus: ['leafleting', 'street_meeting', 'protest_organisation'],
    cellBonus: true,
  },
};

// ─── HEAT LEVELS ──────────────────────────────────────────────────────────────

const HEAT_LEVELS = [
  { min: 0,  max: 20, label: 'Ghost',           color: '#27ae60', desc: 'You don\'t exist to them. Keep it that way.' },
  { min: 21, max: 40, label: 'Noticed',          color: '#f39c12', desc: 'Someone\'s paying attention. Be careful.' },
  { min: 41, max: 60, label: 'Watched',          color: '#e67e22', desc: 'Surveillance active. Cell security at risk.' },
  { min: 61, max: 80, label: 'Hunted',           color: '#e84545', desc: 'Active investigation. Some ops are blown.' },
  { min: 81, max: 100, label: 'Priority Target', color: '#c0392b', desc: 'They know your name. Raid imminent.' },
];

function getHeatLevel(heat) {
  return HEAT_LEVELS.find(h => heat >= h.min && heat <= h.max) || HEAT_LEVELS[0];
}

// ─── NOTORIETY UNLOCKS ────────────────────────────────────────────────────────

const NOTORIETY_UNLOCKS = [
  { at: 0,   label: 'Unknown',       desc: 'Nobody knows you yet.' },
  { at: 10,  label: 'Rumoured',      desc: 'Your name gets mentioned.' },
  { at: 25,  label: 'Recognised',    desc: 'Chapter 2 unlocked — Infiltration' },
  { at: 50,  label: 'Respected',     desc: 'Underground contacts begin approaching you.' },
  { at: 75,  label: 'Feared',        desc: 'Chapter 3 unlocked — Sabotage' },
  { at: 100, label: 'Infamous',      desc: 'The state has a file on you.' },
  { at: 150, label: 'Legendary',     desc: 'Chapters 4 & 5 unlocked — Chemical/Electronic' },
  { at: 300, label: 'The Architect', desc: 'Chapter 6 unlocked — Direct Action. The Manifesto is possible.' },
];

function getNotorietyRank(notoriety) {
  let rank = NOTORIETY_UNLOCKS[0];
  for (const r of NOTORIETY_UNLOCKS) {
    if (notoriety >= r.at) rank = r;
    else break;
  }
  return rank;
}

// ─── XP TABLE ─────────────────────────────────────────────────────────────────

function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

module.exports = {
  ACTIONS,
  TRAINING,
  ITEMS,
  IDEOLOGIES,
  HEAT_LEVELS,
  NOTORIETY_UNLOCKS,
  getHeatLevel,
  getNotorietyRank,
  xpForLevel,
};
