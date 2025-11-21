import type { Rank, Modifier } from '../common'
import type {
    Alignment,
    ClassSkillName,
    NoblePhantasmType,
    ServantClass,
    ServantParameterName,
    ServantUpkeep,
    StandardPersonalSkillName
} from './servant'
import type { IDescriptionBase } from '../common_description'

export interface ServantInstance {
    name: string,
    alignment: Alignment,
    description: string,

    class: ServantClass,
    customClassLabel?: string,
    secondClass?: ServantClass,
    customSecondClassLabel?: string,
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
    label: string,
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
