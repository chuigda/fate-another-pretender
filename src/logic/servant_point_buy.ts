import type { ClassSkillName, ServantClass, ServantUpkeep, StandardPersonalSkillName } from './servant'

/// 维系开销带来的属性、技能和宝具的购点开销修正，正值为返点，负值为额外扣点
///
/// 例如，一个维系开销为“免费”的从者，购买 A 级属性时需要额外支付 20 点，购买 B 级属性时需要额外支付 10 点
/// 而一个维系开销为“高”的从者，购买 A 级属性时会返还 20 点，购买 B 级属性时会返还 10 点
export const ServantUpkeepPenaltyOrRebate: Record<ServantUpkeep, [number, number]> = {
    free: [-20, -10],
    low: [-10, -5],
    medium: [0, 0],
    high: [20, 10],
    lethal: [40, 20]
}

/// 如果某一职阶的基础参数为某一等级时，创建具有指定等级参数的从者所支付/返还的点数
///
/// 例如：Saber 职阶的基础力量值为 A，那么创建一个具有 A 级力量的 Saber 需支付 25 点，创建具有 D 级力量的 Saber 则会返还 75 点
export const ParameterCost = [
    // Base = A
    [-25, +10, +35, +75, +100],
    // Base = B
    [-35, 0, +10, +25, +50],
    // Base = C
    [-75, -35, 0, +10, +25],
    // Base = D
    [-100, -75, -35, 0, +10],
    // Base = E
    [-110, -85, -55, -25, +10]
]

/// 非常规职阶的参数购点开销
export const AberrantParameterCost = [-55, -25, +10, +35, +75]

/// 兽职阶的参数购点开销
export const BeastParameterCost = [-25, +10, +35, +75, +100]

/// 职阶技能的购点开销
export interface IClassSkillCost {
    /// 通常的购点开销
    conventional: [number, number, number, number, number],
    /// 如果某一技能是某个职阶特有的，则享受一定优惠
    ///
    /// 例如，“单独行动”这一技能是 Archer 独有的，因此 Archer 在选择该技能时只需要更少的点数
    /// 又如，Saber, Lancer, Rider, Archer, Ruler, Shielder 在选择“对魔力”时也只需要更少的点数
    specialOffer: [number, number, number, number, number],
    /// 如果某一职阶专有的职阶技能被放弃，则返还一定的点数
    ///
    /// 例如，如果 Archer 放弃“单独行动”这一技能，则返还 50 点
    rebateIfGaveupBy: Partial<Record<ServantClass, number>>,
    /// 该技能为诅咒类技能：如果为 true，则该技能的等级总是返还点数，为技能添加补正同样返还点数
    ///
    /// 例如，“狂化”这一技能为诅咒类技能，B 级狂化会返还 35 点。如果给它添加补正，使其达到 B+ 级，则还会返还额外的 40 点
    isCurse?: true | undefined
}

export const ClassSkillCost: Record<ClassSkillName, IClassSkillCost> = {
    'magic-resistance': {
        conventional: [-100, -80, -55, -40, -25],
        specialOffer: [-50, -35, -25, -15, -5],
        rebateIfGaveupBy: {}
    },
    'independent-action': {
        conventional: [-100, -80, -60, -40, -20],
        specialOffer: [-35, -10, 0, +10, +20],
        rebateIfGaveupBy: { archer: 50 }
    },
    'riding': {
        conventional: [-90, -75, -55, -35, -15],
        specialOffer: [-40, -30, -20, -10, -5],
        rebateIfGaveupBy: { rider: 35 }
    },
    'item-construction': {
        conventional: [-120, -90, -60, -30, -10],
        specialOffer: [-50, -10, 0, +10, +50],
        rebateIfGaveupBy: { caster: 85 }
    },
    'territory-creation': {
        conventional: [-120, -90, -70, -50, -30],
        specialOffer: [-35, -10, 0, +10, +35],
        rebateIfGaveupBy: { caster: 70 }
    },
    'presence-concealment': {
        conventional: [-120, -95, -60, -30, -15],
        specialOffer: [-35, -10, 0, +10, +30],
        rebateIfGaveupBy: { assassin: 75 }
    },
    'mad-enchantment': {
        conventional: [+50, +35, +25, +15, 0],
        specialOffer: [+150, +100, +75, +50, +25],
        rebateIfGaveupBy: { berserker: 0 },
        isCurse: true
    },
    'gods-resolution': {
        conventional: [-300, -250, -200, -150, -100],
        specialOffer: [-100, -50, 0, +25, +50],
        rebateIfGaveupBy: { ruler: 80 }
    },
    'true-name-discernment': {
        conventional: [-150, -125, -100, -75, -50],
        specialOffer: [-35, -10, 0, +10, +25],
        rebateIfGaveupBy: { ruler: 60 }
    },
    'avenger': {
        conventional: [-80, -65, -40, -25, -10],
        specialOffer: [-35, -10, 0, +10, +25],
        rebateIfGaveupBy: { avenger: 45 }
    },
    'oblivion-correction': {
        conventional: [-90, -75, -60, -45, -20],
        specialOffer: [-40, -10, 0, +10, +25],
        rebateIfGaveupBy: { avenger: 40 }
    },
    'self-replenishment': {
        conventional: [-75, -55, -35, -25, -15],
        specialOffer: [-45, -25, 0, +10, +25],
        rebateIfGaveupBy: { avenger: 45 }
    },
    'self-field-defense': {
        conventional: [-110, -85, -60, -35, -10],
        specialOffer: [-45, -15, 0, +15, +30],
        rebateIfGaveupBy: { shielder: 85 }
    },
    'authority-of-beasts': {
        conventional: [-500, -400, -300, -200, -100],
        specialOffer: [-100, -75, -50, -25, 0],
        rebateIfGaveupBy: { beast: 35 }
    },
    'independent-manifestation': {
        conventional: [-225, -150, -100, -65, -35],
        specialOffer: [-10, +15, +25, +35, +50],
        rebateIfGaveupBy: { beast: 80 }
    }
}

/// 保有技能的购点开销
export type IPersonalSkillCost =
      [number, number, number, number, number]
    | [number, number, number, number, number, true /* isCurse */]

export const StandardPersonalSkillCost: Record<StandardPersonalSkillName, IPersonalSkillCost> = {
    'battle-continuation': [-90, -80, -70, -60, -50],
    'charisma': [-65, -55, -45, -35, -25],
    'mana-burst': [-75, -65, -55, -45, -35],
    'instinct': [-100, -90, -80, -70, -60],
    'eye-of-the-mind-true': [-85, -75, -65, -55, -45],
    'eye-of-the-mind-fake': [-85, -75, -65, -55, -45],
    'disengage': [-50, -45, -40, -35, -30],
    'bravery': [-70, -60, -50, -40, -30],
    'clairvoyance': [-100, -85, -70, -55, -40],
    'divinity': [-100, -70, -40, -20, -10],
    'golden-rule': [-50, -40, -30, -20, -10],
    'magecraft': [-65, -55, -45, -35, -25],
    'high-speed-incantation': [-90, -80, -70, -60, -50],
    'rune-magic': [-80, -65, -55, -45, -30],
    'throwing': [-60, -50, -40, -30, -20],
    'marksmanship': [-80, -70, -60, -50, -40],
    'monstrous-strength': [-90, -75, -60, -45, -30],
    'protection-from-arrows': [-100, -80, -60, -40, -20],
    'self-modification': [-35, -30, -25, -20, -15],
    'shapeshift': [-55, -45, -35, -25, -15],
    'military-tactics': [-70, -55, -40, -25, -10],
    'knight-tactics': [-100, -85, -70, -55, -40],
    'mystic-eyes': [-85, -70, -55, -40, -25],
    'revelation': [-100, -90, -80, -70, -60],
    'voyage': [-95, -80, -65, -50, -35],
    'eternal-arms-mastership': [-100, -85, -70, -55, -40],
    'protection-of-the-faith': [-65, -55, -45, -35, -25],
    'martial-arts': [-90, -75, -60, -45, -30],
    'alluring-nightingale': [-60, -45, -35, -25, -10],
    'eye-for-art': [-45, -35, -35, -15, -5],
    'torture-techniques': [-65, -50, -40, -30, -15],
    'subversive-activities': [-85, -70, -55, -40, -25],
    'galvanism': [-75, -60, -45, -30, -15],
    'natural-body': [-85, -65, -45, -25, -5],
    'innocent-monster': [+105, +85, +60, +40, +15, true],
    'knowledge-of-respect-and-harmony': [-100, -90, -80, -70, -60],
    'mental-pollution': [+75, +60, +45, +30, +15, true],
    'combination': [-55, -45, -35, -25, -15],
    'imperial-privilege': [-150, -125, -100, -75, -50],
    'double-summon': [-100, -80, -60, -40, -20],
    'bloodsucking': [-65, -55, -45, -35, -25],
    'counter-hero': [-105, -90, -75, -60, -45],
    'information-erasure': [-80, -65, -50, -35, -20],
    'inherent-wisdom': [-150, -125, -100, -75, -50]
}

/// 补正的购点开销
///
/// 例如，将一个 A 级属性提升为 A+ 需要支付额外 50 点；又如，将一个 C 级技能提升为 C+++ 需要支付额外 100 点
export const ModifierCost = [
    // A, B, C, D, E
    [0, 0, 0, 0, 0],
    // A+, B+, C+, D+, E+
    [-50, -40, -30, -20, -10],
    // A++, B++, C++, D++, E++
    [-100, -75, -50, -30, -15],
    // A+++, B+++, C+++, D+++, E+++
    [-200, -150, -100, -65, -35]
]

/// 给一个属性或者技能加上 - 号，则其开销相应减半
export const MinusModifierCoefficient = 0.5

/// EX 等级的购点开销
export const EXLevelCost = -250

/// 兽职阶前三个 EX 等级的属性和技能的购点开销降低至 100
export const EXLevelCostBeastSpecialOffer = -100

/// 宝具等级的购点开销
export const NoblePhantasmCost = [-130, -90, -55, -25, 0]
export const NoblePhantasmCostRider = [-105, -65, -30, 0, +20]

/// 放弃宝具时的额外返点
export const NoblePhantasmAbandonmentRebate = +200

/// 拥有两个以上宝具时，每多一个宝具，需要支付的额外点数
export const AdditionalNoblePhantasmExtraCost = -35