export type ServantUpkeep = 'free' | 'low' | 'medium' | 'high' | 'lethal'

export type ServantClassKind =
      'knight'   // 三骑士 (Saber, Lancer, Archer)
    | 'cavalry'  // 四骑兵 (Rider, Caster, Assassin, Berserker)
    | 'aberrant' // 非常规 (Shielder, Ruler, Avenger)
    | 'beast'    // 兽 (Beast)

export const ServantClasses = [
    'saber', 'lancer', 'archer',
    'rider', 'caster', 'assassin', 'berserker',
    'shielder', 'ruler', 'avenger',
    'beast'
] as const

export type ServantClass = typeof ServantClasses[number]

export type ServantParameterName =
      'strength'
    | 'endurance'
    | 'agility'
    | 'magicalEnergy'
    | 'luck'

export const ClassSkills = [
    'magic-resistance',
    'independent-action',
    'riding',
    'item-construction',
    'territory-creation',
    'presence-concealment',
    'mad-enchantment',
    'gods-resolution',
    'true-name-discernment',
    'avenger',
    'oblivion-correction',
    'self-replenishment',
    'self-field-defense',
    'authority-of-beasts',
    'independent-manifestation'
] as const

export type ClassSkillName = typeof ClassSkills[number]

export type Rank = typeof Rank_EX | typeof Rank_A | typeof Rank_B | typeof Rank_C | typeof Rank_D | typeof Rank_E
export const Rank_EX = -1 as const
export const Rank_A = 0 as const
export const Rank_B = 1 as const
export const Rank_C = 2 as const
export const Rank_D = 3 as const
export const Rank_E = 4 as const

export type Modifier = typeof Modifier_Minus | typeof Modifier_None | typeof Modifier_Plus | typeof Modifier_Plus2 | typeof Modifier_Plus3
export const Modifier_Minus = -1 as const
export const Modifier_None = 0 as const
export const Modifier_Plus = 1 as const
export const Modifier_Plus2 = 2 as const
export const Modifier_Plus3 = 3 as const

export interface IServantClassData {
    kind: ServantClassKind,
    classSkills: ClassSkillName[],
    parameterBase?: Record<ServantParameterName, Rank>
}

const A: Rank = Rank_A
const B: Rank = Rank_B
const C: Rank = Rank_C
const D: Rank = Rank_D
const E: Rank = Rank_E

export const ServantClassData: Record<ServantClass, IServantClassData> = {
    saber: {
        kind: 'knight',
        classSkills: ['magic-resistance', 'riding'],
        parameterBase: {
            strength: A,
            endurance: B,
            agility: B,
            magicalEnergy: C,
            luck: D
        }
    },
    lancer: {
        kind: 'knight',
        classSkills: ['magic-resistance'],
        parameterBase: {
            strength: B,
            endurance: C,
            agility: A,
            magicalEnergy: D,
            luck: E
        }
    },
    archer: {
        kind: 'knight',
        classSkills: ['magic-resistance', 'independent-action'],
        parameterBase: {
            strength: C,
            endurance: C,
            agility: C,
            magicalEnergy: E,
            luck: E
        }
    },
    rider: {
        kind: 'cavalry',
        classSkills: ['magic-resistance', 'riding'],
        parameterBase: {
            strength: D,
            endurance: D,
            agility: B,
            magicalEnergy: C,
            luck: E
        }
    },
    caster: {
        kind: 'cavalry',
        classSkills: ['item-construction', 'territory-creation'],
        parameterBase: {
            strength: E,
            endurance: E,
            agility: C,
            magicalEnergy: A,
            luck: C
        }
    },
    assassin: {
        kind: 'cavalry',
        classSkills: ['presence-concealment'],
        parameterBase: {
            strength: D,
            endurance: D,
            agility: B,
            magicalEnergy: E,
            luck: B
        }
    },
    berserker: {
        kind: 'cavalry',
        classSkills: ['mad-enchantment'],
        parameterBase: {
            strength: C,
            endurance: D,
            agility: D,
            magicalEnergy: E,
            luck: E
        }
    },
    shielder: {
        kind: 'aberrant',
        classSkills: ['magic-resistance', 'self-field-defense']
    },
    ruler: {
        kind: 'aberrant',
        classSkills: ['magic-resistance', 'gods-resolution', 'true-name-discernment']
    },
    avenger: {
        kind: 'aberrant',
        classSkills: ['avenger', 'oblivion-correction', 'self-replenishment']
    },
    beast: {
        kind: 'beast',
        classSkills: ['authority-of-beasts', 'independent-manifestation']
    }
}

export type StandardPersonalSkillName =
      'battle-continuation'
    | 'charisma'
    | 'mana-burst'
    | 'instinct'
    | 'eye-of-the-mind-true'
    | 'eye-of-the-mind-fake'
    | 'disengage'
    | 'bravery'
    | 'clairvoyance'
    | 'divinity'
    | 'golden-rule'
    | 'magecraft'
    | 'high-speed-incantation'
    | 'rune-magic'
    | 'throwing'
    | 'marksmanship'
    | 'monstrous-strength'
    | 'protection-from-arrows'
    | 'self-modification'
    | 'shapeshift'
    | 'military-tactics'
    | 'knight-tactics'
    | 'mystic-eyes'
    | 'revelation'
    | 'voyage'
    | 'eternal-arms-mastership'
    | 'protection-of-the-faith'
    | 'martial-arts'
    | 'alluring-nightingale'
    | 'eye-for-art'
    | 'torture-techniques'
    | 'subversive-activities'
    | 'galvanism'
    | 'natural-body'
    | 'innocent-monster'
    | 'knowledge-of-respect-and-harmony'
    | 'mental-pollution'
    | 'combination'
    | 'imperial-privilege'
    | 'double-summon'
    | 'bloodsucking'
    | 'counter-hero'
    | 'information-erasure'
    | 'inherent-wisdom'

export type NoblePhantasmType = 'anti-unit' | 'anti-army' | 'anti-fortress' | 'anti-world'

export type AlignmentAxis1 = 'lawful' | 'neutral' | 'chaotic'
export type AlignmentAxis2 = 'good' | 'neutral' | 'evil'

export type Alignment = [AlignmentAxis1, AlignmentAxis2]
