// ─── THE ANARCHIST'S HANDBOOK — GAME DATA ────────────────────────────────────
// Targets are The Machine: corporations, state, surveillance.
// This is not about robbing people. It's about dismantling systems.

// ─── OPERATIONS (replaces CRIMES) ────────────────────────────────────────────
// Organized by Handbook chapter. Chapters unlock via Influence thresholds.

const OPERATIONS = {

  // ── CHAPTER 1: THE STREET ─────────────────────────────────────────────────
  // "Before anything else, you learn to see the city differently."
  // Always available. This is where everyone starts.

  wheatpaste: {
    name: 'Wheatpaste a Wall',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 1,
    description: 'Paste up political posters across a target neighbourhood. Low risk, visible impact.',
    baseSuccessRate: 0.93,
    stat: 'ghost',
    rewards: { scrip: 0, scripMax: 20, influence: 15, xp: 5 },
    heatGain: 3,
    jailTime: 120,
    outcomes: {
      success: [
        'Clean run. Three walls covered before sunrise.',
        'The message is up. The neighbourhood will see it.',
        'Paste dries fast in this weather. Good work.'
      ],
      fail: [
        'Security camera caught you mid-paste. Move.',
        'A cop noticed the bucket. You ran but they got a look.',
        'Landlord called it in. Too much light on that street.'
      ]
    }
  },

  leafleting: {
    name: 'Distribute Leaflets',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 2,
    description: 'Print and hand out materials at transit hubs and markets. Builds your reach.',
    baseSuccessRate: 0.88,
    stat: 'voice',
    rewards: { scrip: 0, scripMax: 0, influence: 25, xp: 8 },
    heatGain: 4,
    jailTime: 150,
    outcomes: {
      success: [
        'Two hundred leaflets gone in an hour. People took them, read them.',
        'A few people stopped to talk. Seeds planted.',
        'Transit hub was perfect. High foot traffic, minimal security.'
      ],
      fail: [
        'Plain-clothes officer took your name.',
        'Station security moved you on — and got a photo.',
        'Someone called you in. Move to a different area.'
      ]
    }
  },

  surveillance_map: {
    name: 'Map a Surveillance Route',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 1,
    description: 'Document camera positions, patrol patterns, guard rotations in a target zone. Reduces Heat in that area for future ops.',
    baseSuccessRate: 0.91,
    stat: 'ghost',
    rewards: { scrip: 50, scripMax: 150, influence: 10, xp: 6 },
    heatGain: 2,
    heatReduction: 5,
    jailTime: 90,
    outcomes: {
      success: [
        'Full patrol rotation mapped. You know exactly when the blind spots are.',
        'Notebook full. The grid has gaps — and you know where they are.',
        'Three hours of observation. Worth every minute.'
      ],
      fail: [
        'A guard clocked you watching. Time to leave.',
        'Too many variables today — construction crew changed the routes.',
        'Your phone died halfway through. Incomplete intel.'
      ]
    }
  },

  dumpster_dive: {
    name: 'Dumpster Dive (Corp Bins)',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 1,
    description: 'Corporate waste is a goldmine — internal documents, useful materials, half-decent gear. Free information.',
    baseSuccessRate: 0.94,
    stat: null,
    rewards: { scrip: 40, scripMax: 180, influence: 5, xp: 4, materialChance: 0.4, documentChance: 0.2 },
    heatGain: 1,
    jailTime: 60,
    outcomes: {
      success: [
        'Internal memos, half a ream of paper, and a working printer cartridge.',
        'Someone shredded these but badly. Readable.',
        'Nothing incriminating but plenty useful. Materials secured.'
      ],
      fail: [
        'Security light tripped. Needed to move fast — left empty handed.',
        'Bin was already picked clean.',
        'Private security patrol. Didn\'t find anything in time.'
      ]
    }
  },

  lockpick_practice: {
    name: 'Pick a Lock (Practice Run)',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 2,
    description: 'The Handbook has a full section on this. An empty building, a padlock, your kit. Practice until it\'s instinct.',
    baseSuccessRate: 0.85,
    stat: 'reflexes',
    rewards: { scrip: 30, scripMax: 100, influence: 8, xp: 10 },
    heatGain: 3,
    jailTime: 200,
    outcomes: {
      success: [
        'Click. Thirty seconds. You\'re getting better.',
        'The Handbook was right about the tension wrench technique.',
        'Inside and out before anyone noticed. Clean.'
      ],
      fail: [
        'Took too long. Someone called the police.',
        'The pick snapped in the cylinder. Abort.',
        'Alarm sensor you didn\'t account for.'
      ]
    }
  },

  tag_police_vehicle: {
    name: 'Tag a Police Vehicle',
    chapter: 1,
    chapterName: 'Chapter 1: The Street',
    nerve: 3,
    description: 'Bold. Visible. A direct message. High Influence, high Heat. Don\'t linger.',
    baseSuccessRate: 0.78,
    stat: 'ghost',
    rewards: { scrip: 0, scripMax: 0, influence: 40, xp: 12 },
    heatGain: 12,
    jailTime: 400,
    outcomes: {
      success: [
        'Two cans. Four minutes. It\'ll be on the news by morning.',
        'Done before the officer came back out of the building.',
        'The message is painted on their door. Let them explain that.'
      ],
      fail: [
        'Radio crackled and the officer was back early.',
        'CCTV angle you didn\'t catch. They have you.',
        'Witness on the street flagged you immediately.'
      ]
    }
  },

  // ── CHAPTER 2: DIRECT ACTION ──────────────────────────────────────────────
  // "Property enforces power. Disrupting it disrupts power."
  // Unlocks at 500 Influence.

  sabotage_vehicle: {
    name: 'Sabotage a Corporate Vehicle',
    chapter: 2,
    chapterName: 'Chapter 2: Direct Action',
    nerve: 8,
    description: 'Target a company vehicle fleet. Sugar in the tank, brake lines, tracker planting. Economic disruption.',
    baseSuccessRate: 0.78,
    stat: 'body',
    rewards: { scrip: 300, scripMax: 900, influence: 60, xp: 30 },
    heatGain: 15,
    jailTime: 600,
    outcomes: {
      success: [
        'Three vehicles out of service. That\'s their delivery schedule gone.',
        'Surgical. They\'ll know it was intentional but can\'t prove who.',
        'The Handbook\'s section on this was very thorough.'
      ],
      fail: [
        'Private security patrol came around early.',
        'Alarm on the vehicle you didn\'t expect.',
        'A worker was still inside the building, spotted you.'
      ]
    }
  },

  destroy_camera: {
    name: 'Destroy a Surveillance Camera',
    chapter: 2,
    chapterName: 'Chapter 2: Direct Action',
    nerve: 7,
    description: 'Take out a camera in a target zone. Creates a blind spot for future operations. Reduces Heat in area.',
    baseSuccessRate: 0.82,
    stat: 'ghost',
    rewards: { scrip: 0, scripMax: 50, influence: 50, xp: 25 },
    heatGain: 10,
    heatReduction: 8,
    jailTime: 500,
    outcomes: {
      success: [
        'One less eye on the street. The grid has a hole now.',
        'Quick and clean. They\'ll replace it in 48 hours but that\'s 48 hours.',
        'Pole, camera, spray paint, gone. Job done.'
      ],
      fail: [
        'Backup camera you hadn\'t mapped. They have footage.',
        'The spray didn\'t work — wrong type of lens cover.',
        'Council worker nearby. Couldn\'t finish the job.'
      ]
    }
  },

  banner_drop: {
    name: 'Banner Drop (Corp HQ)',
    chapter: 2,
    chapterName: 'Chapter 2: Direct Action',
    nerve: 10,
    description: 'Get a message on the side of a corporate building. High visibility. Media attention possible.',
    baseSuccessRate: 0.74,
    stat: 'voice',
    rewards: { scrip: 0, scripMax: 100, influence: 90, xp: 35 },
    heatGain: 18,
    jailTime: 700,
    outcomes: {
      success: [
        'Fifteen metres of fabric. On camera by 8am. They can\'t ignore that.',
        'Building security didn\'t check the roof access. Their mistake.',
        'It\'s already being shared. The message is out there.'
      ],
      fail: [
        'Roof door was alarmed. Got out fast but the banner\'s gone.',
        'Security guard on patrol found you mid-setup.',
        'Wind. The banner tangled. No choice but to leave.'
      ]
    }
  },

  corp_records: {
    name: 'Break into Corporate Records',
    chapter: 2,
    chapterName: 'Chapter 2: Direct Action',
    nerve: 12,
    description: 'Physical break-in to a corporate office. After-hours. Looking for documents, evidence, anything useful.',
    baseSuccessRate: 0.68,
    stat: 'ghost',
    rewards: { scrip: 500, scripMax: 1500, influence: 80, xp: 40, documentChance: 0.8 },
    heatGain: 22,
    jailTime: 900,
    outcomes: {
      success: [
        'Filing cabinets are never as secure as they think. Folders secured.',
        'Two hours inside. Left no trace. Documents photographed.',
        'IT left a terminal unlocked. Better than expected.'
      ],
      fail: [
        'Silent alarm on the filing room.',
        'Security guard round was earlier than the pattern suggested.',
        'CCTV in the stairwell you didn\'t account for.'
      ]
    }
  },

  disrupt_corp_event: {
    name: 'Disrupt a Corporate Event',
    chapter: 2,
    chapterName: 'Chapter 2: Direct Action',
    nerve: 14,
    description: 'Investors, press, executives in a room. Make them uncomfortable. Make it visible.',
    baseSuccessRate: 0.70,
    stat: 'voice',
    rewards: { scrip: 0, scripMax: 200, influence: 120, xp: 45 },
    heatGain: 20,
    jailTime: 800,
    outcomes: {
      success: [
        'Thirty seconds on the mic before security reached you. It\'ll be everywhere.',
        'Banner unfurled right as the CEO stepped on stage. Perfect timing.',
        'They dragged you out but not before the journalists got the photos.'
      ],
      fail: [
        'Security recognised you at the door. Turned away.',
        'They cut the livestream before you got close enough.',
        'Private security tackled you fast. Minimal impact.'
      ]
    }
  },

  // ── CHAPTER 3: INFORMATION WARFARE ───────────────────────────────────────
  // "The most powerful weapon is the one they can't confiscate."
  // Unlocks at 2,000 Influence.

  pirate_radio: {
    name: 'Pirate Radio Broadcast',
    chapter: 3,
    chapterName: 'Chapter 3: Information Warfare',
    nerve: 10,
    description: 'Hijack a frequency. Broadcast for as long as you can. Every minute on air is reach.',
    baseSuccessRate: 0.72,
    stat: 'tech',
    rewards: { scrip: 0, scripMax: 100, influence: 200, xp: 60 },
    heatGain: 25,
    jailTime: 1200,
    outcomes: {
      success: [
        'Eleven minutes on air before they triangulated the signal. Enough.',
        'The whole district heard it. Some of them will remember.',
        'FM is old tech but it\'s everywhere. You used that.'
      ],
      fail: [
        'Signal traced faster than expected. Transmitter abandoned.',
        'Technical problem — broadcast lasted ninety seconds before the feed died.',
        'They were already monitoring that frequency. Knew what to listen for.'
      ]
    }
  },

  newsletter: {
    name: 'Underground Newsletter',
    chapter: 3,
    chapterName: 'Chapter 3: Information Warfare',
    nerve: 8,
    description: 'Print and distribute an underground publication. Slower reach than digital, but harder to take down.',
    baseSuccessRate: 0.80,
    stat: 'voice',
    rewards: { scrip: 0, scripMax: 50, influence: 150, xp: 50 },
    heatGain: 15,
    jailTime: 700,
    outcomes: {
      success: [
        'Five hundred copies. Most of them will be read by more than one person.',
        'The copy shop didn\'t ask questions. Print run complete.',
        'Already being passed hand to hand in the estate.'
      ],
      fail: [
        'The printer failed halfway through. Wasted materials.',
        'Someone talked about the print run. Too much exposure.',
        'Distribution point was being watched.'
      ]
    }
  },

  leak_documents: {
    name: 'Leak Stolen Documents',
    chapter: 3,
    chapterName: 'Chapter 3: Information Warfare',
    nerve: 12,
    description: 'Get the documents you\'ve acquired to the right people — journalists, activists, the public. Costs documents. High Influence.',
    baseSuccessRate: 0.75,
    stat: 'tech',
    rewards: { scrip: 200, scripMax: 800, influence: 250, xp: 70 },
    heatGain: 30,
    jailTime: 1500,
    requiresItem: 'documents',
    outcomes: {
      success: [
        'The journalist ran it. Front page. The corp is dealing with a PR disaster.',
        'Uploaded through the right channels. Mirrors already up.',
        'They\'ll try to suppress it but it\'s too late — it\'s out.'
      ],
      fail: [
        'The contact went cold. Documents not delivered.',
        'Encrypted upload intercepted. Documents burned.',
        'The journalist got cold feet. Wasted opportunity.'
      ]
    }
  },

  hack_website: {
    name: 'Hack & Deface Corp Website',
    chapter: 3,
    chapterName: 'Chapter 3: Information Warfare',
    nerve: 16,
    description: 'Get into a corporate web presence and leave a message. Requires Tech stat. High visibility.',
    baseSuccessRate: 0.62,
    stat: 'tech',
    rewards: { scrip: 400, scripMax: 1200, influence: 300, xp: 90 },
    heatGain: 35,
    minStat: { tech: 8 },
    jailTime: 2000,
    outcomes: {
      success: [
        'Their homepage was your canvas for six hours before they noticed.',
        'Clean intrusion. Message posted, logs scrubbed.',
        'They\'ll restore it but the screenshots are already everywhere.'
      ],
      fail: [
        'Honeypot in the login system. They\'re tracing the connection.',
        'Two-factor blocked you cold. Need a different approach.',
        'Their security team was on it fast. Bounced out before getting in.'
      ]
    }
  },

  intercept_comms: {
    name: 'Intercept Police Communications',
    chapter: 3,
    chapterName: 'Chapter 3: Information Warfare',
    nerve: 14,
    description: 'Tap into local police comms. Reduces your Heat — you know where they\'re looking. Requires Tech.',
    baseSuccessRate: 0.65,
    stat: 'tech',
    rewards: { scrip: 600, scripMax: 1800, influence: 180, xp: 80 },
    heatGain: 5,
    heatReduction: 20,
    minStat: { tech: 6 },
    jailTime: 2500,
    outcomes: {
      success: [
        'Feed is live. You know their patrol grid for the next 48 hours.',
        'Encrypted channel but the Handbook had notes on their frequency rotation.',
        'Intel streaming. This changes how you operate for a while.'
      ],
      fail: [
        'Frequency was encrypted beyond your current kit.',
        'Counter-surveillance sweep detected the intercept.',
        'Signal was a decoy. They knew someone was listening.'
      ]
    }
  },

};

// ─── INFLUENCE UNLOCK THRESHOLDS ─────────────────────────────────────────────
const CHAPTER_UNLOCKS = {
  1: 0,
  2: 500,
  3: 2000,
  4: 5000,
  5: 15000,
  6: 50000,
};

// ─── GEAR ─────────────────────────────────────────────────────────────────────
const ITEMS = {
  spray_cans:      { name: 'Spray Cans',           desc: 'Required for graffiti ops. +5% tag success.',          price: 80,   category: 'tool' },
  bolt_cutters:    { name: 'Bolt Cutters',          desc: '+15% break-in success.',                               price: 200,  category: 'tool' },
  burner_phone:    { name: 'Burner Phone',          desc: '-20% Heat gain per operation.',                        price: 350,  category: 'tool' },
  signal_jammer:   { name: 'Signal Jammer',         desc: 'Disables nearby surveillance for 1 op.',               price: 800,  category: 'tool' },
  encrypted_laptop:{ name: 'Encrypted Laptop',      desc: '+20% Tech op success. Required for Ch.4+ digital ops.',price: 2500, category: 'tech' },
  lockpick_set:    { name: 'Lockpick Set',           desc: '+15% lock-based op success.',                         price: 300,  category: 'tool' },
  police_scanner:  { name: 'Police Scanner',         desc: '+10% all op success. Early warning on raids.',         price: 900,  category: 'tech' },
  fake_id:         { name: 'Fake ID',               desc: 'Reduces jail sentence by 30%.',                        price: 600,  category: 'document' },
  safehouse_key:   { name: 'Safe House Key',         desc: 'Doubles Heat decay rate.',                            price: 1500, category: 'safe' },
  printing_press:  { name: 'Printing Press (Cell)',  desc: 'Passive Influence income +20/hr.',                    price: 4000, category: 'cell' },
  bandages:        { name: 'Bandages',              desc: 'Restore 20 Health.',                                   price: 80,   category: 'medical', consumable: true, effect: { hp: 20 } },
  painkillers:     { name: 'Painkillers',           desc: 'Restore 50 Health.',                                   price: 220,  category: 'medical', consumable: true, effect: { hp: 50 } },
  energy_drink:    { name: 'Energy Drink',          desc: 'Restore 30 Stamina.',                                  price: 150,  category: 'consumable', consumable: true, effect: { stamina: 30 } },
  adrenaline:      { name: 'Adrenaline Shot',       desc: 'Restore 10 Nerve.',                                    price: 400,  category: 'consumable', consumable: true, effect: { nerve: 10 } },
  bribe_cash:      { name: 'Bribe Money (Envelope)',desc: 'Instantly leave jail.',                                price: 1200, category: 'consumable', consumable: true },
  materials:       { name: 'Materials Bundle',      desc: 'Batteries, cables, tape. Required for device ops.',    price: 300,  category: 'material' },
  documents:       { name: 'Stolen Documents',      desc: 'Corporate/state intel. Leak or sell.',                 price: 0,    category: 'document', found: true },
};

// ─── TRAINING ─────────────────────────────────────────────────────────────────
const TRAINING = {
  // Body
  calisthenics:    { name: 'Calisthenics',            stat: 'body',     staminaCost: 10, xpBase: 5,  desc: 'Bodyweight training. Build physical capacity.' },
  heavy_labour:    { name: 'Hard Labour (manual)',     stat: 'body',     staminaCost: 25, xpBase: 15, desc: 'Intensive physical work. Fast gains.' },
  // Reflexes
  parkour:         { name: 'Parkour Routes',           stat: 'reflexes', staminaCost: 15, xpBase: 8,  desc: 'Urban movement. Escape is a skill.' },
  evasion_drill:   { name: 'Evasion Drills',           stat: 'reflexes', staminaCost: 25, xpBase: 15, desc: 'Practice losing a tail. Serious conditioning.' },
  // Ghost
  counter_surv:    { name: 'Counter-Surveillance Study',stat: 'ghost',   staminaCost: 10, xpBase: 6,  desc: 'Read the Handbook\'s surveillance chapter. Know what they\'re looking for.' },
  night_moves:     { name: 'Night Movement Practice',  stat: 'ghost',    staminaCost: 20, xpBase: 12, desc: 'Move through the city unseen. Low-light conditions.' },
  // Tech
  study_tech:      { name: 'Technical Study',          stat: 'tech',     staminaCost: 10, xpBase: 6,  desc: 'Systems, networks, devices. The Handbook\'s technical chapters.' },
  hands_on_hack:   { name: 'Practical Hacking',        stat: 'tech',     staminaCost: 25, xpBase: 18, desc: 'Practice on old hardware. The only way to really learn.' },
  // Voice
  public_speaking: { name: 'Study Rhetoric',           stat: 'voice',    staminaCost: 10, xpBase: 5,  desc: 'How do you move people? Study the craft.' },
  organising:      { name: 'Community Organising',     stat: 'voice',    staminaCost: 20, xpBase: 14, desc: 'Talk to people. Build trust. Learn what they need.' },
};

// ─── ZONES ────────────────────────────────────────────────────────────────────
const ZONES = {
  estate:     { name: 'The Estate',         desc: 'Council blocks, broken lifts. Where you started.',     heatMod: 0,    opBonus: 0 },
  corp_park:  { name: 'Corporate Park',     desc: 'Glass towers, private security, CCTV everywhere.',     heatMod: 0.20, opBonus: 0.10 },
  old_town:   { name: 'The Old Town',       desc: 'Indie shops, artists, sympathisers.',                  heatMod: -0.10,opBonus: 0 },
  docks:      { name: 'The Docks',          desc: 'Import/export. Containers full of things.',            heatMod: 0,    opBonus: 0.05 },
  gov_quarter:{ name: 'Government Quarter', desc: 'Camera on every corner. Massive stakes.',              heatMod: 0.40, opBonus: 0.20 },
  underground:{ name: 'The Underground',    desc: 'Black market, safe houses, fences. Heat decays here.', heatMod: -0.25,opBonus: 0 },
};

// ─── XP TABLE ─────────────────────────────────────────────────────────────────
function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

module.exports = { OPERATIONS, CHAPTER_UNLOCKS, ITEMS, TRAINING, ZONES, xpForLevel };
