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
