export const MasterTypes = [
    'mundane',
    'magus',
    'magecraft-user',
    'homunculus',
    'psychic',
    'priest',
    'dead-apostle'
] as const
export type MasterType = typeof MasterTypes[number]

export const MasterResideces = [
    'street',
    'apartment',
    'house',
    'mansion',
    'wilderness',
    'abadoned-building',
    'government-facility',
    'hospital',
    'sewers',
    'hotel',
    'temple',
    'castle'
] as const
export type MasterResidece = typeof MasterResideces[number]

export const StandardMasterSkills = [
    'common-sense',
    'operating-electronics',
    'mythology-expetrise',
    'first-aid',
    'stealth',
    'intel-gathering',
    'martial-arts',
    'cooking',
    'athletics',
    'driving',
    'multitasking',
    'speech',
    'survival',
    'vigilance'
] as const
export type StandardMasterSkills = typeof StandardMasterSkills[number]

export const AdvancedMasterSkills = [
    'tactics',
    'strategy',
    'investigation',
    'trapmaking',
    'firearm-proficiency',
    'handling-explosives',
    'breaking-and-entering',
    'magi-diplomacy',
    'servant-negotiation',
    'tracking'
] as const
export type AdvancedMasterSkills = typeof AdvancedMasterSkills[number]