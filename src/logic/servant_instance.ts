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
    description: string,

    customDisplay?: CustomDisplay
}

export interface ServantStandardPersonalSkill {
    rank: Rank,
    modifier: Modifier,
    description: string,

    customDisplay?: CustomDisplay
}

export interface UniqueSkill {
    name: string,
    description: string,

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
    customType: string,

    customDisplay?: CustomDisplay
}

export interface CustomDisplay {
    displayLabel: string
    displayRank: string
}