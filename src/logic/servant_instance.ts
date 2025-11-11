import type {
    Alignment,
    ClassSkillName,
    Modifier,
    NoblePhantasmType,
    Rank,
    ServantClass,
    ServantParameterName,
    ServantUpkeep,
    StandardPersonalSkillName
} from './servant'
import {
    Modifier_None,
    Rank_A,
    Rank_B,
    Rank_C,
    Rank_D
} from './servant'
import type { IDescriptionBase } from './servant_description'

export interface ServantInstance {
    name: string,
    alignment: Alignment,
    description: string,

    class: ServantClass,
    secondClass?: ServantClass,
    upkeep: ServantUpkeep,

    parameters: Record<ServantParameterName, ServantParameter>,
    classSkills: Partial<Record<ClassSkillName, ServantClassSkill>>,
    uniqueClassSkills: UniqueSkill[],
    standardPersonalSkills: Partial<Record<StandardPersonalSkillName, ServantStandardPersonalSkill>>,
    uniquePersonalSkills: UniqueSkill[],
    noblePhantasms: NoblePhantasm[]
}

export interface ServantParameter {
    rank: Rank,
    modifier: Modifier
}

export interface ServantClassSkill {
    rank: Rank,
    modifier: Modifier,
    description?: string,

    customDisplay?: CustomDisplay
}

export interface ServantStandardPersonalSkill {
    rank: Rank,
    modifier: Modifier,
    description?: string,

    customDisplay?: CustomDisplay
}

export interface UniqueSkill extends IDescriptionBase {
    rank: Rank,
    modifier: Modifier,
    customCost: number
}

export interface NoblePhantasm {
    name: string,
    description: string,

    rank: Rank,
    modifier: Modifier,
    type: NoblePhantasmType,
    customType?: string
}

export interface CustomDisplay {
    label: string
    rank: Rank,
    modifier: Modifier
}

export const DefaultServantInstance: ServantInstance = {
    name: '无名英灵',
    alignment: ['neutral', 'neutral'],
    description: '',
    class: 'saber',
    secondClass: undefined,
    upkeep: 'medium',
    parameters: {
        strength: { rank: Rank_A, modifier: Modifier_None },
        endurance: { rank: Rank_B, modifier: Modifier_None },
        agility: { rank: Rank_B, modifier: Modifier_None },
        magicalEnergy: { rank: Rank_C, modifier: Modifier_None },
        luck: { rank: Rank_D, modifier: Modifier_None }
    },
    classSkills: {
        'magic-resistance': { rank: Rank_A, modifier: Modifier_None },
        'riding': { rank: Rank_B, modifier: Modifier_None }
    },
    uniqueClassSkills: [],
    standardPersonalSkills: {},
    uniquePersonalSkills: [],
    noblePhantasms: [
        {
            name: '终极对城大光炮',
            description: 'Saber 没有光炮那还叫 Saber 吗 —— Chuigda·Whitegive',
            rank: Rank_A,
            modifier: Modifier_None,
            type: 'anti-fortress'
        }
    ]
}
