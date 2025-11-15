import type { ServantInstance } from './servant_instance'
import { Rank_A, Rank_B, Rank_C, Rank_D, Modifier_None, type Rank } from '../common'
import { ServantClassData, type ServantClass, type ServantParameterName } from './servant'
import type { IRankModifier } from '../common_description'

function populateParameters(
    base: Record<ServantParameterName, Rank>
): Record<ServantParameterName, IRankModifier> {
    return {
        strength: { rank: base.strength, modifier: Modifier_None },
        endurance: { rank: base.endurance, modifier: Modifier_None },
        agility: { rank: base.agility, modifier: Modifier_None },
        magicalEnergy: { rank: base.magicalEnergy, modifier: Modifier_None },
        luck: { rank: base.luck, modifier: Modifier_None }
    }
}

const commonData = {
    description: '',
    secondClass: undefined,
    upkeep: 'medium' as const,
    uniqueClassSkills: [],
    standardPersonalSkills: {},
    uniquePersonalSkills: [],
    noblePhantasms: [
        {
            label: '示例宝具',
            description: '这是一个无效果的示例宝具。',
            rank: Rank_B,
            modifier: Modifier_None,
            type: 'anti-unit' as const
        }
    ]
}

const aberrantParameters = {
    strength: { rank: Rank_B, modifier: Modifier_None },
    endurance: { rank: Rank_B, modifier: Modifier_None },
    agility: { rank: Rank_B, modifier: Modifier_None },
    magicalEnergy: { rank: Rank_B, modifier: Modifier_None },
    luck: { rank: Rank_B, modifier: Modifier_None }
}

export const SaberTemplate: ServantInstance = {
    name: '无名剑士',
    alignment: ['neutral', 'neutral'],
    class: 'saber',
    parameters: populateParameters(ServantClassData.saber.parameterBase!!),
    classSkills: {
        'magic-resistance': { rank: Rank_A, modifier: Modifier_None },
        'riding': { rank: Rank_B, modifier: Modifier_None }
    },
    ...commonData
}

export const LancerTemplate: ServantInstance = {
    name: '无名枪兵',
    alignment: ['neutral', 'neutral'],
    class: 'lancer',
    parameters: populateParameters(ServantClassData.lancer.parameterBase!!),
    classSkills: {
        'magic-resistance': { rank: Rank_B, modifier: Modifier_None }
    },
    ...commonData
}

export const ArcherTemplate: ServantInstance = {
    name: '无名弓兵',
    alignment: ['neutral', 'neutral'],
    class: 'archer',
    parameters: populateParameters(ServantClassData.archer.parameterBase!!),
    classSkills: {
        'magic-resistance': { rank: Rank_C, modifier: Modifier_None },
        'independent-action': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const RiderTemplate: ServantInstance = {
    name: '无名骑兵',
    alignment: ['neutral', 'neutral'],
    class: 'rider',
    parameters: populateParameters(ServantClassData.rider.parameterBase!!),
    classSkills: {
        'magic-resistance': { rank: Rank_D, modifier: Modifier_None },
        'riding': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const CasterTemplate: ServantInstance = {
    name: '无名术士',
    alignment: ['neutral', 'neutral'],
    class: 'caster',
    parameters: populateParameters(ServantClassData.caster.parameterBase!!),
    classSkills: {
        'item-construction': { rank: Rank_A, modifier: Modifier_None },
        'territory-creation': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const AssassinTemplate: ServantInstance = {
    name: '无名刺客',
    alignment: ['neutral', 'neutral'],
    class: 'assassin',
    parameters: populateParameters(ServantClassData.assassin.parameterBase!!),
    classSkills: {
        'presence-concealment': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const BerserkerTemplate: ServantInstance = {
    name: '无名狂战士',
    alignment: ['neutral', 'insane'],
    class: 'berserker',
    parameters: populateParameters(ServantClassData.berserker.parameterBase!!),
    classSkills: {
        'mad-enchantment': { rank: Rank_C, modifier: Modifier_None }
    },
    ...commonData
}

export const ShielderTemplate: ServantInstance = {
    name: '无名盾兵',
    alignment: ['neutral', 'neutral'],
    class: 'shielder',
    parameters: aberrantParameters,
    classSkills: {
        'self-field-defense': { rank: Rank_A, modifier: Modifier_None },
        'magic-resistance': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const RulerTemplate: ServantInstance = {
    name: '无名裁定者',
    alignment: ['neutral', 'neutral'],
    class: 'ruler',
    parameters: aberrantParameters,
    classSkills: {
        'gods-resolution': { rank: Rank_A, modifier: Modifier_None },
        'true-name-discernment': { rank: Rank_A, modifier: Modifier_None },
        'magic-resistance': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const AvengerTemplate: ServantInstance = {
    name: '无名复仇者',
    alignment: ['neutral', 'neutral'],
    class: 'avenger',
    parameters: aberrantParameters,
    classSkills: {
        'avenger': { rank: Rank_A, modifier: Modifier_None },
        'oblivion-correction': { rank: Rank_A, modifier: Modifier_None },
        'self-replenishment': { rank: Rank_B, modifier: Modifier_None }
    },
    ...commonData
}

export const BeastTemplate: ServantInstance = {
    name: '无名之兽',
    alignment: ['neutral', 'neutral'],
    class: 'beast',
    parameters: aberrantParameters,
    classSkills: {
        'authority-of-beasts': { rank: Rank_A, modifier: Modifier_None },
        'independent-manifestation': { rank: Rank_A, modifier: Modifier_None }
    },
    ...commonData
}

export const ServantTemplates: Record<ServantClass, ServantInstance> = {
    saber: SaberTemplate,
    lancer: LancerTemplate,
    archer: ArcherTemplate,
    rider: RiderTemplate,
    caster: CasterTemplate,
    assassin: AssassinTemplate,
    berserker: BerserkerTemplate,
    shielder: ShielderTemplate,
    ruler: RulerTemplate,
    avenger: AvengerTemplate,
    beast: BeastTemplate
} as const
