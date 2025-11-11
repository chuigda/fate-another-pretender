import {
    ClassSkillDescription,
    ModifierDescription,
    ParameterDescription,
    RankDescription,
    ServantClassDescription,
    ServantUpkeepDescription,
    StandardPersonalSkillDescription
} from './servant_description'
import {
    ClassSkillName,
    StandardPersonalSkillName,
    ServantParameterName,
    ServantClassData,
    Rank_A,
    Rank,
    Modifier_Minus,
    Rank_EX,
    Rank_B,
    Modifier,
    Rank_C,
    Modifier_None,
    ServantUpkeep,
    ServantClass
} from './servant'
import { ServantInstance } from './servant_instance'
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

export function servantPointBuy(servant: ServantInstance): [number, string[]] {
    let totalCost = 0
    const details: string[] = []

    const classData = ServantClassData[servant.class]
    const classDescription = ServantClassDescription[servant.class]
    const secondClassData = servant.secondClass ? ServantClassData[servant.secondClass] : undefined

    const doubleSummonRank: Rank | 99999 = servant.standardPersonalSkills['double-summon']?.rank ?? 99999

    const classSignatureSkills = new Set([...classData.classSkills])
    if (secondClassData && doubleSummonRank <= Rank_B) {
        for (const skill of secondClassData.classSkills) {
            classSignatureSkills.add(skill)
        }
    }

    let exRankCount = 0

    details.push('属性面板')
    for (const parameterName of Object.keys(servant.parameters) as ServantParameterName[]) {
        const parameter = servant.parameters[parameterName]
        const parameterDescription = ParameterDescription[parameterName]

        let cost
        if (parameter.rank === Rank_EX) {
            [cost, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else if (classData.parameterBase) {
            let baseRank = classData.parameterBase[parameterName]
            if (secondClassData && doubleSummonRank <= Rank_A) {
                const secondClassBaseRank = secondClassData.parameterBase![parameterName]
                baseRank = Math.min(baseRank, secondClassBaseRank) as Rank
            }
            cost = ParameterCost[baseRank][parameter.rank]
        } else if (classData.kind === 'aberrant') {
            cost = AberrantParameterCost[parameter.rank]
        } else if (classData.kind === 'beast') {
            cost = BeastParameterCost[parameter.rank]
        } else {
            throw new Error(`${classDescription.label}职阶 (${servant.class}) 未定义基础参数，也没有可用的参数购点表`)
        }

        if (parameter.modifier === Modifier_Minus) {
            cost /= 2
        } else if (parameter.modifier !== null && parameter.modifier !== undefined) {
            cost += ModifierCost[parameter.modifier][parameter.rank]
        }

        totalCost += cost
        details.push(`- ${parameterDescription.label} ${describeRankModifier(parameter)}: ${cost}`)

        totalCost += calculateUpkeepRebate(servant.upkeep, parameter.rank, details)
    }

    details.push('职阶技能')
    for (const classSkillName of Object.keys(servant.classSkills) as ClassSkillName[]) {
        const classSkill = servant.classSkills[classSkillName]!!
        const classSkillCostData = ClassSkillCost[classSkillName]
        const classSkillDescription = ClassSkillDescription[classSkillName]

        let cost
        if (classSkill.rank === Rank_EX) {
            [cost, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else if (classSignatureSkills.has(classSkillName)) {
            cost = classSkillCostData.specialOffer[classSkill.rank]
        } else {
            cost = classSkillCostData.conventional[classSkill.rank]
        }

        if (classSkill.modifier === Modifier_Minus) {
            cost /= 2
        } else if (classSkill.modifier !== Modifier_None) {
            const coefficient = classSkillCostData.isCurse ? -1 : 1
            cost += coefficient * ModifierCost[classSkill.modifier][classSkill.rank]
        }

        totalCost += cost
        details.push(`- ${classSkillDescription.label} ${describeRankModifier(classSkill)}: ${cost}`)

        totalCost += calculateUpkeepRebate(servant.upkeep, classSkill.rank, details)
    }

    for (const uniqueClassSkill of servant.uniqueClassSkills) {
        totalCost += uniqueClassSkill.customCost
        details.push(`- ${uniqueClassSkill.label} ${describeRankModifier(uniqueClassSkill)}: ${uniqueClassSkill.customCost}`)

        if (uniqueClassSkill.rank === Rank_EX) {
            exRankCount += 1
        }
    }

    for (const classSkillName of classSignatureSkills) {
        const classSkillCostData = ClassSkillCost[classSkillName]
        if (classSkillCostData.rebateIfGaveupBy[servant.class]) {
            const rebate = classSkillCostData.rebateIfGaveupBy[servant.class]!!
            totalCost += rebate
            const classSkillDescription = ClassSkillDescription[classSkillName]
            details.push(`- 放弃职阶技能 ${classSkillDescription.label}: ${rebate}`)
        }
    }

    details.push('保有技能')
    for (const standardPersonalSkillName of Object.keys(servant.standardPersonalSkills) as StandardPersonalSkillName[]) {
        const personalSkill = servant.standardPersonalSkills[standardPersonalSkillName]!!
        const personalSkillCostData = StandardPersonalSkillCost[standardPersonalSkillName]
        const personalSkillDescription = StandardPersonalSkillDescription[standardPersonalSkillName]

        let cost
        if (personalSkill.rank === Rank_EX) {
            [cost, exRankCount] = calculateExRankCost(exRankCount, servant.class)
        } else {
            cost = personalSkillCostData[personalSkill.rank]
        }

        if (personalSkill.modifier === Modifier_Minus) {
            cost /= 2
        } else if (personalSkill.modifier !== Modifier_None) {
            const isCurse = personalSkillCostData.length === 6 && personalSkillCostData[5] === true
            const coefficient = isCurse ? -1 : 1
            cost += coefficient * ModifierCost[personalSkill.modifier][personalSkill.rank]
        }

        totalCost += cost
        details.push(`- ${personalSkillDescription.label} ${describeRankModifier(personalSkill)}: ${cost}`)

        totalCost += calculateUpkeepRebate(servant.upkeep, personalSkill.rank, details)
    }

    for (const uniquePersonalSkill of servant.uniquePersonalSkills) {
        totalCost += uniquePersonalSkill.customCost
        details.push(`- ${uniquePersonalSkill.label} ${describeRankModifier(uniquePersonalSkill)}: ${uniquePersonalSkill.customCost}`)

        if (uniquePersonalSkill.rank === Rank_EX) {
            exRankCount += 1
        }
    }

    details.push('宝具')
    if (servant.noblePhantasms.length === 0) {
        totalCost += NoblePhantasmAbandonmentRebate
        details.push(`- 放弃宝具: ${NoblePhantasmAbandonmentRebate}`)
    } else {
        let npCostClass = servant.class
        if (servant.class !== 'rider' && doubleSummonRank <= Rank_C && servant.secondClass === 'rider') {
            npCostClass = 'rider'
        }
        const npCostTable = npCostClass === 'rider' ? NoblePhantasmCostRider : NoblePhantasmCost

        for (const np of servant.noblePhantasms) {
            let cost

            if (np.rank === Rank_EX) {
                [cost, exRankCount] = calculateExRankCost(exRankCount, servant.class)
            } else {
                cost = npCostTable[np.rank]
            }

            if (np.modifier === Modifier_Minus) {
                cost /= 2
            } else if (np.modifier !== Modifier_None) {
                cost += ModifierCost[np.modifier][np.rank]
            }

            totalCost += cost
            details.push(`- ${np.name} ${describeRankModifier(np)}: ${cost}`)
        }
    }

    if (servant.noblePhantasms.length > 1) {
        const additionalCost = (servant.noblePhantasms.length - 1) * AdditionalNoblePhantasmExtraCost
        totalCost += additionalCost
        details.push(`- 多于 1 个宝具的额外开销: ${additionalCost}`)
    }

    return [totalCost, details]
}

interface RankModifier {
    rank: Rank,
    modifier: Modifier
}

function describeRankModifier(rm: RankModifier) {
    return `${rankDescription(rm.rank)}${modifierDescription(rm.modifier)}`
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

    const upkeepCostOrRebate = ServantUpkeepPenaltyOrRebate[upkeep][Math.max(rank, 0)]
    if (upkeepCostOrRebate !== 0) {
        details.push(`  - 由于维系费用等级为“${ServantUpkeepDescription[upkeep].label}”: ${upkeepCostOrRebate}`)
    }
    return upkeepCostOrRebate
}
