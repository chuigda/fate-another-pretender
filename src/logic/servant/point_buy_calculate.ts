import type { Rank } from '../common'
import type {
    ClassSkillName,
    StandardPersonalSkillName,
    ServantParameterName,
    ServantUpkeep,
    ServantClass
} from './servant'
import type { ServantInstance } from './servant_instance'
import { describeRankModifier } from '../common_description'
import {
    ClassSkillDescription,
    ParameterDescription,
    ServantClassDescription,
    ServantUpkeepDescription,
    StandardPersonalSkillDescription
} from './servant_description'
import { ServantClassData } from './servant'
import { Modifier_Minus, Modifier_None, Rank_EX, Rank_A, Rank_B, Rank_C } from '../common'
import {
    AberrantParameterCost,
    AdditionalNoblePhantasmExtraCost,
    BeastParameterCost,
    ClassSkillCost,
    EXLevelCost,
    EXLevelCostBeastSpecialOffer,
    ModifierCost,
    NoblePhantasmAbandonmentRebate,
    NoblePhantasmCost,
    NoblePhantasmCostRider,
    ParameterCost,
    ServantUpkeepPenaltyOrRebate,
    StandardPersonalSkillCost
} from './servant_point_buy'

export interface ServantPointBuyResult {
    sp: number
    details: string[]
}

export function servantPointBuy(servant: ServantInstance): ServantPointBuyResult {
    let totalSP = 0
    const details: string[] = []

    const classData = ServantClassData[servant.class]
    const classDescription = ServantClassDescription[servant.class]
    const secondClassData = servant.secondClass ? ServantClassData[servant.secondClass] : undefined

    const doubleSummonRank: Rank | 99999 = servant.standardPersonalSkills['double-summon']?.rank ?? 99999
    const doubleSummonRankTakesEffect =
        secondClassData !== undefined &&
        classData.kind === 'cavalry' &&
        secondClassData.kind === 'cavalry'

    const classSignatureSkills = new Set([...classData.classSkills])
    if (doubleSummonRankTakesEffect && secondClassData && doubleSummonRank <= Rank_B) {
        for (const skill of secondClassData.classSkills) {
            classSignatureSkills.add(skill)
        }
    }

    let exRankCount = 0

    details.push('属性面板')
    for (const parameterName of Object.keys(servant.parameters) as ServantParameterName[]) {
        const parameter = servant.parameters[parameterName]
        const parameterDescription = ParameterDescription[parameterName]

        let sp = 0
        if (parameter.rank === Rank_EX) {
            [sp, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else if (classData.parameterBase) {
            let baseRank = classData.parameterBase[parameterName]
            if (doubleSummonRankTakesEffect && doubleSummonRank <= Rank_A) {
                const secondClassBaseRank = secondClassData.parameterBase![parameterName]
                baseRank = Math.min(baseRank, secondClassBaseRank) as Rank
            }
            sp = ParameterCost[baseRank]!![parameter.rank]!!
        } else if (classData.kind === 'aberrant') {
            sp = AberrantParameterCost[parameter.rank]!!
        } else if (classData.kind === 'beast') {
            sp = BeastParameterCost[parameter.rank]!!
        } else {
            throw new Error(`${classDescription.label}职阶 (${servant.class}) 未定义基础参数，也没有可用的参数购点表`)
        }

        if (parameter.modifier === Modifier_Minus) {
            sp /= 2
        } else if (parameter.modifier !== Modifier_None) {
            sp += ModifierCost[parameter.modifier]!![parameter.rank]!!
        }

        totalSP += sp
        details.push(`- ${parameterDescription.label} ${describeRankModifier(parameter)}: ${sp}`)

        totalSP += calculateUpkeepRebate(servant.upkeep, parameter.rank, details)
    }

    details.push('职阶技能')
    for (const classSkillName of Object.keys(servant.classSkills) as ClassSkillName[]) {
        const classSkill = servant.classSkills[classSkillName]!!
        const classSkillCostData = ClassSkillCost[classSkillName]
        const classSkillDescription = ClassSkillDescription[classSkillName]

        let sp
        if (classSkill.rank === Rank_EX) {
            [sp, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else if (classSignatureSkills.has(classSkillName)) {
            sp = classSkillCostData.specialOffer[classSkill.rank]
        } else {
            sp = classSkillCostData.conventional[classSkill.rank]
        }

        if (classSkill.modifier === Modifier_Minus) {
            sp /= 2
        } else if (classSkill.modifier !== Modifier_None) {
            const coefficient = classSkillCostData.isCurse ? -1 : 1
            sp += coefficient * ModifierCost[classSkill.modifier]!![classSkill.rank]!!
        }

        totalSP += sp
        details.push(`- ${classSkillDescription.label} ${describeRankModifier(classSkill)}: ${sp}`)

        totalSP += calculateUpkeepRebate(servant.upkeep, classSkill.rank, details)
    }

    for (const uniqueClassSkill of servant.uniqueClassSkills) {
        totalSP += uniqueClassSkill.customCost
        details.push(`- ${uniqueClassSkill.label} ${describeRankModifier(uniqueClassSkill)}: ${uniqueClassSkill.customCost}`)

        if (uniqueClassSkill.rank === Rank_EX) {
            exRankCount += 1
        }
    }

    for (const classSkillName of classSignatureSkills) {
        const classSkillCostData = ClassSkillCost[classSkillName]
        if ((classSkillCostData.rebateIfGaveupBy[servant.class] ||
            (servant.secondClass && classSkillCostData.rebateIfGaveupBy[servant.secondClass])) &&
            servant.classSkills[classSkillName] === undefined) {
            const rebate = classSkillCostData.rebateIfGaveupBy[servant.class] ?? classSkillCostData.rebateIfGaveupBy[servant.secondClass!!]!!
            totalSP += rebate
            const classSkillDescription = ClassSkillDescription[classSkillName]
            details.push(`- 放弃职阶技能 ${classSkillDescription.label}: ${rebate}`)
        }
    }

    details.push('保有技能')
    for (const standardPersonalSkillName of Object.keys(servant.standardPersonalSkills) as StandardPersonalSkillName[]) {
        const personalSkill = servant.standardPersonalSkills[standardPersonalSkillName]!!
        const personalSkillCostData = StandardPersonalSkillCost[standardPersonalSkillName]
        const personalSkillDescription = StandardPersonalSkillDescription[standardPersonalSkillName]

        let sp
        if (personalSkill.rank === Rank_EX) {
            [sp, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else {
            sp = personalSkillCostData[personalSkill.rank]
        }

        if (personalSkill.modifier === Modifier_Minus) {
            sp /= 2
        } else if (personalSkill.modifier !== Modifier_None) {
            const isCurse = personalSkillCostData.length === 6 && personalSkillCostData[5] === true
            const coefficient = isCurse ? -1 : 1
            sp += coefficient * ModifierCost[personalSkill.modifier]!![personalSkill.rank]!!
        }

        totalSP += sp
        details.push(`- ${personalSkillDescription.label} ${describeRankModifier(personalSkill)}: ${sp}`)

        totalSP += calculateUpkeepRebate(servant.upkeep, personalSkill.rank, details)
    }

    for (const uniquePersonalSkill of servant.uniquePersonalSkills) {
        totalSP += uniquePersonalSkill.customCost
        details.push(`- ${uniquePersonalSkill.label} ${describeRankModifier(uniquePersonalSkill)}: ${uniquePersonalSkill.customCost}`)

        if (uniquePersonalSkill.rank === Rank_EX) {
            exRankCount += 1
        }
    }

    details.push('宝具')
    if (servant.noblePhantasms.length === 0) {
        totalSP += NoblePhantasmAbandonmentRebate
        details.push(`- 放弃宝具: ${NoblePhantasmAbandonmentRebate}`)
    } else {
        let npCostClass = servant.class
        if (doubleSummonRankTakesEffect &&
            servant.class !== 'rider' &&
            doubleSummonRank <= Rank_C &&
            servant.secondClass === 'rider') {
            npCostClass = 'rider'
        }
        const npCostTable = npCostClass === 'rider' ? NoblePhantasmCostRider : NoblePhantasmCost

        for (const np of servant.noblePhantasms) {
            let sp = 0

            if (np.rank === Rank_EX) {
                [sp, exRankCount] = calculateExRankCost(exRankCount, servant.class)
            } else {
                sp = npCostTable[np.rank]!!
            }

            if (np.modifier === Modifier_Minus) {
                sp /= 2
            } else if (np.modifier !== Modifier_None) {
                sp += ModifierCost[np.modifier]!![np.rank]!!
            }

            totalSP += sp
            details.push(`- ${np.label} ${describeRankModifier(np)}: ${sp}`)
        }
    }

    if (servant.noblePhantasms.length > 1) {
        const additionalCost = (servant.noblePhantasms.length - 1) * AdditionalNoblePhantasmExtraCost
        totalSP += additionalCost
        details.push(`- 多于 1 个宝具的额外开销: ${additionalCost}`)
    }

    return { sp: totalSP, details }
}

function calculateExRankCost(exRankCount: number, servantClass: ServantClass): [number, number] {
    if (exRankCount < 3 && ServantClassData[servantClass].kind === 'beast') {
        return [EXLevelCostBeastSpecialOffer, exRankCount + 1]
    } else {
        return [EXLevelCost, exRankCount + 1]
    }
}

function calculateUpkeepRebate(upkeep: ServantUpkeep, rank: Rank, /*out*/ details: string[]): number {
    if (rank > Rank_B) {
        return 0
    }

    const upkeepCostOrRebate = ServantUpkeepPenaltyOrRebate[upkeep][Math.max(rank, 0)]!!
    if (upkeepCostOrRebate !== 0) {
        details.push(`  - 维系费用等级为“${ServantUpkeepDescription[upkeep].label}”: ${upkeepCostOrRebate}`)
    }
    return upkeepCostOrRebate
}
