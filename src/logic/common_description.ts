import type { Rank, Modifier } from './common'

export interface IDescriptionBase {
    label: string
    description: string
}

export const RankDescription: [string, string, string, string, string, string] = ['EX', 'A', 'B', 'C', 'D', 'E']

export const ModifierDescription: [string, string, string, string, string] = ['-', '', '+', '++', '+++']

export function describeRank(rank: Rank): string {
    return RankDescription[rank + 1]!!
}

export function describeModifier(modifier: Modifier): string {
    return ModifierDescription[modifier + 1]!!
}

export interface IRankModifier {
    rank: Rank,
    modifier: Modifier
}

export function describeRankModifier(rm: IRankModifier): string {
    return `${describeRank(rm.rank)}${describeModifier(rm.modifier)}`
}

export interface IParameterDescription extends IDescriptionBase {
    ranks: [string, string, string, string, string]
}
