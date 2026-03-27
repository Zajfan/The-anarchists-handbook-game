// ─── CRIMES ─────────────────────────────────────────────────────────────────
const CRIMES = {
  // Tier 1 — Street Level
  graffiti: {
    name: 'Graffiti Tagging',
    tier: 1,
    nerve: 1,
    description: 'Tag a wall in your neighbourhood. Low risk, builds rep.',
    baseSuccessRate: 0.92,
    stat: 'stealth',
    rewards: { cashMin: 0, cashMax: 50, xp: 5, notoriety: 2 },
    jailTime: 120, // seconds
    outcomes: {
      success: ['Clean tag on the overpass. Respect.', 'Another wall claimed. The city is your canvas.', 'Nice work. The Collective will see this.'],
      fail: ['Cop spotted you mid-tag. Run!', 'Security camera caught your face.', 'Homeowner called the pigs.']
    }
  },
  pickpocket: {
    name: 'Pickpocketing',
    tier: 1,
    nerve: 2,
    description: 'Lift wallets in a crowded area. Quick cash, low profile.',
    baseSuccessRate: 0.85,
    stat: 'agility',
    rewards: { cashMin: 50, cashMax: 200, xp: 8, notoriety: 1 },
    jailTime: 180,
    outcomes: {
      success: ['Smooth lift. ${{cash}} richer.', 'Fat wallet from some suit. Easy money.', 'Tourist didn\'t feel a thing.'],
      fail: ['They felt it. Started screaming.', 'Undercover cop. Bad timing.', 'Grabbed an empty wallet. Not your day.']
    }
  },
  shoplift: {
    name: 'Shoplifting',
    tier: 1,
    nerve: 2,
    description: 'Five-finger discount at a local store.',
    baseSuccessRate: 0.88,
    stat: 'stealth',
    rewards: { cashMin: 80, cashMax: 250, xp: 8, notoriety: 1 },
    jailTime: 180,
    outcomes: {
      success: ['In and out clean. Good score.', 'Security guard was half asleep.', 'Walked out like you owned the place.'],
      fail: ['Alarm tag. Classic mistake.', 'Loss prevention was watching.', 'Camera angle you didn\'t account for.']
    }
  },
  dumpster_dive: {
    name: 'Dumpster Diving',
    tier: 1,
    nerve: 1,
    description: 'Scavenge useful items from commercial dumpsters. Free action.',
    baseSuccessRate: 0.95,
    stat: null,
    rewards: { cashMin: 0, cashMax: 30, xp: 3, notoriety: 0, itemChance: 0.3 },
    jailTime: 0,
    outcomes: {
      success: ['Found some decent gear in the trash.', 'Corp wastage is your gain.', 'Useful stuff if you know where to look.'],
      fail: ['Nothing but rotten food tonight.', 'Someone beat you to it.', 'Completely picked clean.']
    }
  },
  mugging: {
    name: 'Street Mugging',
    tier: 1,
    nerve: 4,
    description: 'Threaten a civilian for their valuables. Higher reward, higher risk.',
    baseSuccessRate: 0.78,
    stat: 'strength',
    rewards: { cashMin: 100, cashMax: 400, xp: 15, notoriety: 3 },
    jailTime: 300,
    outcomes: {
      success: ['They handed it all over. Smart of them.', 'No resistance. In and out.', 'Easy mark.'],
      fail: ['They fought back. Took some hits.', 'Someone called the cops.', 'Target had nothing. Wasted nerve.']
    }
  },

  // Tier 2 — Getting Serious
  car_theft: {
    name: 'Car Theft',
    tier: 2,
    nerve: 8,
    description: 'Boost a vehicle and sell it to a chop shop.',
    baseSuccessRate: 0.72,
    stat: 'agility',
    rewards: { cashMin: 500, cashMax: 1500, xp: 30, notoriety: 5 },
    jailTime: 600,
    outcomes: {
      success: ['Hot-wired in under 90 seconds. Chop shop pays well tonight.', 'Clean boost. No witnesses.', 'Nice ride. ${{cash}} at the chop shop.'],
      fail: ['LoJack system triggered.', 'Owner came back early.', 'Patrol car rolled past at the wrong moment.']
    }
  },
  break_and_enter: {
    name: 'Breaking & Entering',
    tier: 2,
    nerve: 10,
    description: 'Hit a residential or commercial property while nobody\'s home.',
    baseSuccessRate: 0.68,
    stat: 'stealth',
    rewards: { cashMin: 400, cashMax: 1200, xp: 35, notoriety: 6 },
    jailTime: 900,
    outcomes: {
      success: ['Cleaned the place out before the alarm triggered.', 'Perfect score. Nobody home, nothing missing for hours.', 'Quick and quiet.'],
      fail: ['Silent alarm. They were waiting.', 'Neighbour heard something.', 'Dog inside. Didn\'t expect that.']
    }
  },
  drug_deal: {
    name: 'Drug Deal',
    tier: 2,
    nerve: 12,
    description: 'Move product on the corner. High cash, high risk.',
    baseSuccessRate: 0.65,
    stat: 'charisma',
    rewards: { cashMin: 800, cashMax: 2500, xp: 40, notoriety: 8 },
    jailTime: 1800,
    outcomes: {
      success: ['Product moved clean. Cash in hand.', 'Regular buyers. Easy transaction.', 'The corner is yours tonight.'],
      fail: ['Undercover buy. You\'re burned.', 'Rival crew tried to rob you.', 'Buyer didn\'t show. Wasted nerve.']
    }
  },
  vandalism: {
    name: 'Organized Vandalism',
    tier: 2,
    nerve: 7,
    description: 'Coordinate a wave of property destruction. Notoriety boost.',
    baseSuccessRate: 0.80,
    stat: 'stealth',
    rewards: { cashMin: 0, cashMax: 200, xp: 25, notoriety: 15 },
    jailTime: 450,
    outcomes: {
      success: ['Windows smashed, message painted. The city heard you.', 'Corporate property. No sympathy from the street.', 'Well coordinated hit.'],
      fail: ['Security response faster than expected.', 'Someone talked.', 'Got separated from the crew.']
    }
  },

  // Tier 3 — Major Operations
  armed_robbery: {
    name: 'Armed Robbery',
    tier: 3,
    nerve: 20,
    description: 'Hit a business with a weapon. Serious time if caught.',
    baseSuccessRate: 0.60,
    stat: 'strength',
    rewards: { cashMin: 2000, cashMax: 6000, xp: 80, notoriety: 20 },
    jailTime: 3600,
    outcomes: {
      success: ['Walked out with everything in the register. Clean exit.', 'Quick and decisive. No heroes today.', 'Big score. Worth the nerve.'],
      fail: ['Someone hit the panic button.', 'Armed security on site.', 'Dye pack in the cash. Wasted.']
    }
  },
  hack_system: {
    name: 'System Hack',
    tier: 3,
    nerve: 18,
    description: 'Breach a corporate or government network. Requires Intellect.',
    baseSuccessRate: 0.55,
    stat: 'intellect',
    rewards: { cashMin: 3000, cashMax: 8000, xp: 100, notoriety: 25 },
    jailTime: 2700,
    minStat: { intellect: 10 },
    outcomes: {
      success: ['In and out of their systems. No trace.', 'Account drained before they noticed.', 'Clean exfiltration. Ghost protocol.'],
      fail: ['Honeypot triggered. They\'re tracing back.', 'Two-factor auth blocked you.', 'Their security team is better than expected.']
    }
  },

  // Tier 4 — Endgame
  bank_job: {
    name: 'Bank Job',
    tier: 4,
    nerve: 45,
    description: 'Full bank heist. Maximum payout. Maximum risk. Cell bonus applies.',
    baseSuccessRate: 0.45,
    stat: 'intellect',
    rewards: { cashMin: 15000, cashMax: 50000, xp: 300, notoriety: 100 },
    jailTime: 86400, // 24 hours
    outcomes: {
      success: ['The vault cracked open. Legendary haul.', 'Every second counted. Made it out.', 'City talking about this one for weeks.'],
      fail: ['SWAT response. This is bad.', 'Vault timer didn\'t cooperate.', 'Inside man was an informant.']
    }
  }
};

// ─── ITEMS ───────────────────────────────────────────────────────────────────
const ITEMS = {
  lockpick: { name: 'Lockpick Set', description: '+10% B&E success', price: 200, category: 'tool' },
  bolt_cutters: { name: 'Bolt Cutters', description: '+8% B&E success', price: 150, category: 'tool' },
  burner_phone: { name: 'Burner Phone', description: 'Reduces heat gain', price: 300, category: 'tool' },
  fake_id: { name: 'Fake ID', description: 'Reduces jail time by 20%', price: 500, category: 'tool' },
  police_scanner: { name: 'Police Scanner', description: '+12% success on all crimes', price: 800, category: 'tool' },
  getaway_car: { name: 'Getaway Car', description: 'Required for Tier 3+ crimes', price: 2000, category: 'vehicle' },
  knife: { name: 'Combat Knife', description: '+5 combat damage', price: 300, category: 'weapon' },
  pipe: { name: 'Lead Pipe', description: '+8 combat damage', price: 150, category: 'weapon' },
  handgun: { name: 'Handgun (Illegal)', description: '+20 combat damage, +15% robbery success', price: 1500, category: 'weapon' },
  bandages: { name: 'Bandages', description: 'Restore 20 HP', price: 80, category: 'medical', consumable: true, effect: { hp: 20 } },
  painkillers: { name: 'Painkillers', description: 'Restore 50 HP', price: 200, category: 'medical', consumable: true, effect: { hp: 50 } },
  energy_drink: { name: 'Energy Drink', description: 'Restore 30 Energy', price: 150, category: 'consumable', consumable: true, effect: { energy: 30 } },
  adrenaline: { name: 'Adrenaline Shot', description: 'Restore 10 Nerve', price: 400, category: 'consumable', consumable: true, effect: { nerve: 10 } },
  bribe_cash: { name: 'Bribe Money', description: 'Instantly leave jail', price: 1000, category: 'consumable', consumable: true },
  encrypted_laptop: { name: 'Encrypted Laptop', description: '+20% hack success', price: 3000, category: 'tool' },
};

// ─── GYM TRAINING ────────────────────────────────────────────────────────────
const GYM_EXERCISES = {
  pushups: { name: 'Push-ups', stat: 'strength', energyCost: 10, xpBase: 5 },
  sprints: { name: 'Sprints', stat: 'agility', energyCost: 10, xpBase: 5 },
  meditation: { name: 'Meditation', stat: 'intellect', energyCost: 10, xpBase: 5 },
  shadow_work: { name: 'Shadow Work', stat: 'stealth', energyCost: 10, xpBase: 5 },
  negotiation: { name: 'Street Negotiations', stat: 'charisma', energyCost: 10, xpBase: 5 },
  heavy_lift: { name: 'Heavy Lifting', stat: 'strength', energyCost: 25, xpBase: 15 },
  parkour: { name: 'Parkour', stat: 'agility', energyCost: 25, xpBase: 15 },
  study: { name: 'Study Session', stat: 'intellect', energyCost: 25, xpBase: 15 },
};

// ─── DISTRICTS ───────────────────────────────────────────────────────────────
const DISTRICTS = {
  slums: { name: 'The Slums', flavor: 'Where you started. Everyone knows your face here.', crimeBonus: 0 },
  industrial: { name: 'Industrial District', flavor: 'Warehouses, loading docks, chop shops.', crimeBonus: 0.15 },
  financial: { name: 'Financial Quarter', flavor: 'Glass towers and fat wallets.', crimeBonus: 0.20 },
  gov_quarter: { name: 'Government Quarter', flavor: 'Crawling with cops. High risk, high notoriety.', crimeBonus: -0.10, notorietyBonus: 2 },
  docks: { name: 'The Docks', flavor: 'Import/export and no questions asked.', crimeBonus: 0.10 },
  underground: { name: 'Underground Market', flavor: 'If you need it, it\'s here.', shopDiscount: 0.10 },
};

// ─── XP TABLE ────────────────────────────────────────────────────────────────
function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

module.exports = { CRIMES, ITEMS, GYM_EXERCISES, DISTRICTS, xpForLevel };
