import type {
    ClassSkillName,
    NoblePhantasmType,
    ServantClass,
    ServantParameterName,
    ServantUpkeep,
    StandardPersonalSkillName
} from './servant'

export interface IDescriptionBase {
    label: string
    description: string
}

export const ServantUpkeepDescription: Record<ServantUpkeep, IDescriptionBase> = {
    free: {
        label: '无',
        description:
        `维持该从者的成本可以忽略不计，近乎于零。然而，真的达到这种程度可能需要一些非同寻常的条件。如果这些条件不满足，则功能上与“低”等级的维持成本没有区别。`
    },
    low: {
        label: '低',
        description:
        `维持该从者的成本远低于通常水平。\n` +
        `对于没有办法维持其从者的普通人御主来说，这是一个更好的选择，但这只是缓解了他们的魔力危机，不足以完全解决这一点。`
    },
    medium: {
        label: '中等',
        description:
        `维系成本中规中矩的从者。\n` +
        `普通的魔术师能够轻松地维持从者的显现，不过他们在召唤从者时可能会昏倒。\n` +
        `而那些不适合成为御主的人，比如完全没有魔术回路的普通人，在维系从者存在时可能会遇到问题。以及，毫无疑问地，这些人将无法负担任何高于此等级的维系成本。`
    },
    high: {
        label: '高',
        description:
        `御主必须花费大量魔力来维系从者的存在。\n` +
        `在极端情况下，普通的魔术师将无法使用任何魔术，甚至无法移动。然而，那些魔力输出比大多数人更高的御主受到的影响会小一些。一个强大的从者需要一个强大的御主，才能使两者保持正常运作。`
    },
    lethal: {
        label: '致命',
        description:
        `该从者的魔力消耗对御主极其危险，激烈的行动甚至可能导致御主死亡。\n` +
        `御主必须具有非凡的魔力，才能承受这种程度的开销。`
    }
}

export const RankDescription: [string, string, string, string, string, string] = ['EX', 'A', 'B', 'C', 'D', 'E']

export const ModifierDescription: [string, string, string, string, string] = ['-', '', '+', '++', '+++']

export const ServantClassDescription: Record<ServantClass, IDescriptionBase> = {
    // 三骑士
    saber: {
        label: '剑之骑士 (Saber)',
        description:
        `Saber 被认为是各方面最均衡的职阶，各项属性都遥遥领先，这也是该职阶的主要要求之一，另一个要求则是因剑而闻名\n` +
        `通常来说，Saber 被认为是整体实力最强的职阶。几乎可以肯定的是，Saber 能一直战斗到圣杯战争的最后阶段。然而，他们的弱点在于过于直接，除了正面攻击对手之外，几乎无法运用任何其他战术。`
    },
    lancer: {
        label: '枪之骑士 (Lancer)',
        description:
        `Lancer 不如其他三骑士职阶那么华丽，甚至可能不如其他职阶，但他们非常可靠，擅长本职工作。\n` +
        `成为 Lancer 意味着拥有令人难以置信的敏捷和速度，且善于利用速度优势和打了就跑的战术。\n` +
        `与所有其他职阶不同，他们唯一的职阶技能是对魔力，而这甚至不是他们独有的。`
    },
    archer: {
        label: '弓之骑士 (Archer)',
        description:
        `精通远程武器是 Archer 的标志，当然，远程武器也不一定非要是弓。\n` +
        `Archer 们注定要远离御主独立战斗。他们桀骜不驯的天性使得他们不可避免地会反抗自己的御主，只有在令咒的作用下才会真正听从命令。\n` +
        `Archer 拥有出色的视力和侦察能力。`
    },

    // 四骑兵
    rider: {
        label: '骑兵 (Rider)',
        description:
        `Rider 是擅长骑乘的英灵，他们是四骑兵职阶的代表。\n` +
        `Rider 职阶的主要要求是精通使用各种坐骑，因此 Rider 们具有极高的机动性也就不足为奇了。\n` +
        `Rider 的参数低于三骑士职阶，但作为补偿，Rider 们往往拥有非常强大的宝具。`
    },
    caster: {
        label: '魔术师 (Caster)',
        description:
        `被召唤为 Caster 意味着能够使用某种形式的魔术。\n` +
        `通常被认为是所有七个标准职阶中最弱的，甚至连 Assassin 都能对他们构成威胁，但这仅限于物理层面。Caster 真正的力量在于其他地方。\n` +
        `该职阶的能力使其倾向于在战争中采取极端的防御性策略。`
    },
    assassin: {
        label: '暗杀者 (Assassin)',
        description:
        `Assassin 是最弱的职阶之一，但这是因为他们从来就不是为了公平战斗或与其他从者正面交锋而存在的。\n` +
        `Assassin 通常会秘密行动、使用诡计和遁术，首要目标是敌方御主。\n` +
        `Assassin 职阶的技能组合将使避免直接战斗变得轻而易举。`
    },
    berserker: {
        label: '狂战士 (Berserker)',
        description:
        `只有那些在生前曾陷入狂暴的人才能加入 Berserker 的行列。\n` +
        `Berserker 主要由较弱的从者组成，狂化技能可以极大地增强他们，使得他们能与真正的英灵平起平坐。但如果你将一个本已强大的从者再加以狂化，那就是另一回事了。\n` +
        `Berserker 是最强的职阶之一，尽管大多难以控制。`
    },

    // 非常规
    shielder: {
        label: '盾兵 (Shielder)',
        description:
        `Shielder 是专注于保护他人的职阶，要求是具有盾牌和其他类型的防御性武装。\n` +
        `Shielder 的不寻常之处在于他们专注于与其他从者团队合作。除非被召唤的英灵拥有适合单打独斗的特质，否则建议寻找盟友来发挥 Shielder 的优势。`
    },
    ruler: {
        label: '裁定者 (Ruler)',
        description:
        `Ruler 通常是为了应对有人公然违反圣杯战争规则、危及仪式而召唤的。\n` +
        `他们也旨在维护英灵的法则，防止死者统治生者。\n` +
        `Ruler 职阶的主要要求是公正无私，对圣杯没有欲望，因此他们的行列中以圣徒为主。`
    },
    avenger: {
        label: '复仇者 (Avenger)',
        description:
        `Avenger 是一个以强烈的仇恨和对复仇的执着而闻名的职阶。由于大众的看法，他们真实的自我通常会被严重扭曲。\n` +
        `每个 Avenger 都是独一无二的，因此没有一个放之四海而皆准的策略。所有 Avenger 唯一的共同点就是他们对复仇的追求。`,
    },

    // 兽
    beast: {
        label: '兽 (Beast)',
        description:
        `从人理之树的树干中生长出来并试图吞噬它的灾厄之兽。一种罪恶的存在，以一种奇怪、扭曲的方式爱着人类，即使在给人类带来确定的毁灭时也是如此。\n` +
        `这是一种凌驾于从者之上的恶，就像从者凌驾于普通人之上一样。`
    }
}

export interface IParameterDescription extends IDescriptionBase {
    ranks: [string, string, string, string, string]
}

export const ParameterDescription: Record<ServantParameterName, IParameterDescription> = {
    strength: {
        label: '筋力',
        description: ``,
        ranks: [
            // A 级
            `足以匹敌最强神话怪物的强大力量。即使是普通攻击，其威力也足以媲美某些低阶宝具。`,
            // B 级
            `普通攻击产生的冲击波可以让周围的物体和旁观者飞起来！`,
            // C 级
            `力量强大到足以毫不费力地一击劈开一米厚的石头。`,
            // D 级
            `能够举重若轻地轻松挥舞巨剑或其他重型武器。`,
            // E 级
            `超越普通人类极限的力量，但跟神话传说级别的力量相比就差远了。`
        ]
    },
    endurance: {
        label: '耐久',
        description: ``,
        ranks: [
            // A 级
            `只有最强宝具的直击才有可能撼动。`,
            // B 级
            `即使是宝具，如果不够强大的话，直接的命中依然有可能挺过去。`,
            // C 级
            `足以毫不费力地抵挡其他从者的一般攻击。`,
            // D 级
            `即使受到魔法攻击或其他带有神秘性的攻击，只要不是其他从者发动的，受到的伤害也会减少。`,
            // E 级
            `普通漫画人物的坚韧程度，任何从者的认真一击都足以致命。`
        ]
    },
    agility: {
        label: '敏捷',
        description: ``,
        ranks: [
            // A 级
            `能够以音速移动，动作对所有非从者来说看上去都像是瞬移。`,
            // B 级
            `即使是战斗内外随意的动作，对普通人来说也可能看起来像是一道模糊的影子。`,
            // C 级
            `使得在垂直的表面上奔跑等动作称为可能。`,
            // D 级
            `几乎瞬间的反应速度，可以跑得过汽车。`,
            // E 级
            `足够灵活和快速，战斗动作在普通人眼中看起来像是一道模糊的影子，但总之并不比奥运选手快多少。`
        ]
    },
    magicalEnergy: {
        label: '魔力',
        description: ``,
        ranks: [
            // A 级
            `能够使用源自神代的魔术；即使是现代最高级的大魔术也无法与之相比。`,
            // B 级
            `拥有大量可用于魔术的魔法能量储备。宝具或者其他能力可能需要使用这些储备。`,
            // C 级
            `即使不是 Caster 职阶的从者，魔力达到 C 级之后也能使用一些魔术。提升所有与魔术相关的能力。`,
            // D 级
            `魔力储备超过任何现代魔术师的积累。`,
            // E 级
            `魔力储备较低，大致就是现代魔术师的一般水平。`
        ]
    },
    luck: {
        label: '幸运',
        description: ``,
        ranks: [
            // A 级
            `拥有抵抗命运的力量，能躲避即死攻击之类的能力。`,
            // B 级
            `在战斗和日常生活中都是超自然的祝福，无法控制的小事也会向着有利的方向发展。`,
            // C 级
            `那些无法控制、结果至关重要的事情更有可能发生，尽管不保证成功。`,
            // D 级
            `行动结果受运气的影响，在准确率、闪避能力和其他方面获得小幅提升。`,
            // E 级
            `就是普通人的运气水平，虽然理论上略高于他们。`
        ]
    }
}

export interface ISkillDescription extends IDescriptionBase {
    ranks: [string, string, string, string, string]
}

export const ClassSkillDescription: Record<ClassSkillName, ISkillDescription> = {
    'magic-resistance': {
        label: '对魔力',
        description: `得到对魔术抗性的能力。`,
        ranks: [
            // A 级
            `A 级和 A 级以下的魔术全部无效化，即使是大魔术也不例外。能短暂地抵抗一划令咒。`,
            // B 级
            `咏唱在三节以下的魔术全部无效化，即使是大魔术和仪礼咒法也难以造成伤害。`,
            // C 级
            `咏唱在二节以下的魔术全部无效化。无法抵抗大魔术和仪礼咒法。`,
            // D 级
            `一工程魔术全部无效化，相当于护身符级别的对魔力。`,
            // E 级
            `无法无效化魔术，只能减少所受的魔术伤害。`
       ]
    },
    'independent-action': {
        label: '单独行动',
        description: `允许从者独立行动并减少对御主魔力供应的消耗，甚至允许从者在没有御主的情况下生存的能力。`,
        ranks: [
            // A 级
            `没有御主也能维持存在一周左右；使用消耗更大的能力时仍然需要御主的支持。`,
            // B 级
            `没有御主也能维持存在两天；可以在不使用御主魔力的情况下行动。`,
            // C 级
            `没有御主也能维持存在一天。`,
            // D 级
            `没有御主也能维持存在至多 12 小时。`,
            // E 级
            `没有御主时无法延长维持存在的时间，但可以在远离御主的地方单独行动。`
       ]
    },
    'riding': {
        label: '骑乘',
        description: `代表从者驾驭各种交通工具和坐骑能力的技能。`,
        ranks: [
            // A 级
            `任何载具和生物都可以骑乘，但幻想种和神性生物除外；精通所有坐骑的驾驭。`,
            // B 级
            `精通某一种坐骑，并能用魔法增强坐骑，使得在骑乘时坐骑与从者共享所有参数。`,
            // C 级
            `允许选择一种能够骑乘的坐骑类型作为免费坐骑。能骑着坐骑飞行并执行不可能的动作。`,
            // D 级
            `精通驾驭生前所熟悉的坐骑，大多数其他载具和动物也能以高于平均水平的技能驾驭。`,
            // E 级
            `没有特别的骑乘技能，但骑乘载具或坐骑时，速度会与从者的速度成比例增加，且不会对坐骑造成伤害。`
       ]
    },
    'item-construction': {
        label: '道具作成',
        description: `创建用于战斗或日常活动的魔术道具的能力。通常来说需要时间来收集所需材料。`,
        ranks: [
            // A 级
            `能制造出可以与某些低阶宝具相媲美的物品，不过这需要更长的时间。`,
            // B 级
            `能制造出大部分常见的魔术道具，甚至是一些现代无法获得的稀有物品，但后者需要更多的时间和精力。`,
            // C 级
            `专精于制造某一种类型的魔术道具。制造速度快，且只需利用手头的资源。`,
            // D 级
            `能制造出与现代魔术相当的少量魔术道具。制造时间和所需资源可能因物品而异。`,
            // E 级
            `能用魔力召唤出常见的普通物品。`
       ]
    },
    'territory-creation': {
        label: '阵地作成',
        // description: `Prerogative to establish a territory - special terrain that is advantageous to oneself as a magus, for the purposes of collecting magical energy and preparing Magecraft.`,
        description: `建造阵地的能力。阵地即有利于魔术师自身收集魔力、准备魔术的特殊地域。`,
        ranks: [
            // A 级
            `能建造“神殿”，比“工房”更高级 —— 魔法防御工事能够大幅度妨碍其他从者的行动。`,
            // B 级
            `能建造“工房”，在工房中施展的魔术至少提升一个等级。`,
            // C 级
            `能将一大片区域指定为自己的阵地，并能察觉阵地内发生的任何事情。`,
            // D 级
            `能建造中等大小的阵地并从中收集魔力。`,
            // E 级
            `能控制一小片区域以供休息和恢复，在区域内体力能更快地恢复。`
       ]
    },
    'presence-concealment': {
        label: '气息遮断',
        description: `隐藏自己作为从者存在的能力，非常适用于间谍活动、侦查及暗杀任务。`,
        ranks: [
            // A 级
            `能够完全消失，几乎不可能被发觉。准备发动攻击时会受到影响，但直到攻击前的最后一刻都无法被察觉。`,
            // B 级
            `能够消失并变得难以察觉，即使在准备发动攻击时也是如此。`,
            // C 级
            `隐藏自身作为从者的存在。需要时间来生效，且在准备攻击时会被察觉。`,
            // D 级
            `等级低到不像暗杀者。能在静止或缓慢移动时避免被察觉。`,
            // E 级
            `能够躲避大多数魔法侦测手段，但会被从者立刻察觉。`
       ]
    },
    'mad-enchantment': {
        label: '狂化',
        description: `以牺牲理智为代价提升各项参数的能力。正向补正所需的点数将被反转并变为返还点数，负向补正则会减半所需点数。EX 级的狂化技能仍然需要正常消耗点数。`,
        ranks: [
            // A 级
            `所有参数大幅提升，但理智完全丧失。`,
            // B 级
            `所有参数提升，但进入战斗时会失去大部分理智和判断力。`,
            // C 级
            `除幸运和魔力外，所有参数提升，但无法正常思考和说话。`,
            // D 级
            `力量和耐力参数提升。语言能力简单，难以进行长时间的复杂思考。`,
            // E 级
            `没有明显的参数提升，但保留正常思考的能力。战斗中会增加嗜血倾向。`
       ]
    },
    'gods-resolution': {
        label: '神明裁决',
        description: `Ruler 的特权 —— 拥有若干令咒，并有权将其用于战争中的任何其他从者。`,
        ranks: [
            // A 级
            `每有一个除自身以外的从者便获得两划令咒。不能对同一个从者使用超过两划令咒。`,
            // B 级
            `每有一个除自身以外的从者便获得一划令咒。不能对同一个从者使用超过一划令咒。`,
            // C 级
            `三划令咒，可以用于战争中的任何其他从者，但不能对同一个从者使用超过一划令咒。`,
            // D 级
            `两划令咒，可以用于战争中的任何其他从者，但不能对同一个从者使用超过一划令咒。`,
            // E 级
            `一划令咒，可以用于战争中的任何其他从者，但不能对自己使用。`
       ]
    },
    'true-name-discernment': {
        label: '真名看破',
        description: `揭示其他从者的相关信息的能力，例如他们的参数、技能、真名、背景故事和宝具。`,
        ranks: [
            // A 级
            `从被召唤的那一刻起，所有参战从者的信息会被全部揭示。无论对方使用了何种隐匿能力，此技能均有效。`,
            // B 级
            `只要亲眼见到对方，从者的全部信息就会自动被揭示。隐匿能力的干扰可以通过幸运检定来规避。`,
            // C 级
            `只要触碰到对方，从者的全部信息就会被揭示。任何隐匿能力都足以干扰此能力。`,
            // D 级
            `只要见过对方一次，从者的真名和职阶就会被揭示。其他所有细节仍然按照通常的方式揭示。`,
            // E 级
            `能够访问与普通御主相当的信息页面，除此之外只能得知从者自行揭示的信息。`
       ]
    },
    'avenger': {
        label: '复仇者',
        description: `Avenger 职阶的标志性技能。Avenger 能将人们的怨恨和愤怒汇聚于自身，以此获得力量并加以利用。`,
        ranks: [
            // A 级
            `负面情绪会立即转化为力量；所有参数永远获得一个 + 补正。`,
            // B 级
            `受到伤害时再生能力增强。`,
            // C 级
            `当对手在战斗中真心地仇恨你时，每有一个敌人，就使一个技能获得 + 补正。`,
            // D 级
            `如果被认定为另一个从者的死敌，在与其战斗时，所有参数获得一个 + 补正。`,
            // E 级
            `能够从仇恨和愤怒中汲取一些魔力。`
       ]
    },
    'oblivion-correction': {
        label: '忘却补正',
        description: `无法或不愿忘记自己遭遇的不公。强化记忆力并增加暴击伤害。`,
        ranks: [
            // A 级
            `能使出记忆以外的致命一击，其伤害值翻三倍。`,
            // B 级
            `当记忆被魔法手段修改时，此能力将自动纠正记忆。`,
            // C 级
            `达到完全过目不忘的程度。`,
            // D 级
            `在别人忘记或者不敢想象的情况下发起攻击，伤害值大幅提升。`,
            // E 级
            `清晰地记得过去的所有不公，不过没有其他有用的加成。`
       ]
    },
    'self-replenishment': {
        label: '自我回复',
        description: `被动地随着时间积累魔力，直到复仇成功的能力。它只能提供能量，不能使从者脱离御主。`,
        ranks: [
            // A 级
            `Slowly accumulate magical energy while the war is going on, but it won't be enough to stay manifested without a Master.`,
            // B 级
            `Magical energy endless gushes forth in small amounts until revenge is taken instead.`,
            // C 级
            `After taking damage, gain an equal amount of magical energy in a singular package.`,
            // D 级
            `Recovers a miniscule amount of energy during direct combat.`,
            // E 级
            `When using offensive magical abilities, recover a small portion of energy spent on it if its use was successful.`
       ]
    },
    'self-field-defense': {
        label: '己阵防御',
        description: `盾兵的标志性技能，能够让使用者保护队友甚至整个友军阵营，达到超越人类极限的程度。`,
        ranks: [
            // A 级
            `Increases the range, tripling it. Whenever allies are about to take damage, it is redirected to the user automatically. All damage done to either the user or their allies is now reduced by half.`,
            // B 级
            `Increases the range, doubling it. Whenever the user takes damage, it is also reflected back to the attacker.`,
            // C 级
            `Reduces damage taken by every ally in the range of the user's reach by a third. The user himself is not included.`,
            // D 级
            `Allows the user to completely block average attacks. Grant poise that makes the user immovable in combat if they so desire.`,
            // E 级
            `Awareness of the position of every ally who is close behind the Servant. Allows to quickly dash to any one of them to intercept most attacks on them.`
       ]
    },
    'authority-of-beasts': {
        label: '兽之权能',
        description: `The right of Beasts to bring ruin. Anti-Humanity Skill that focuses on countering and destroying anything human in origin.`,
        ranks: [
            // A 级
            `Affinity for fighting against all Heroic Spirits and Divine Spirits, tripling damage output against these targets.`,
            // B 级
            `Insight into everyting human in origin that fits one particular theme appropriate to the Beast in question. Anything nearby that fits its description can be unmade or enforced at will.`,
            // C 级
            `Can cause any and all normal humans nearby to instantly die whenever the Beast wishes.`,
            // D 级
            `Negation of the will of the Master and the human world equivalent to Independent Action of rank B. Taking action or using abilities will not spend any magical energy during it.`,
            // E 级
            `High resistance to anything humanity has created. Harm done y magical efforts is negated by half, as long as it is being done by a human.`
       ]
    },
    'independent-manifestation': {
        label: '独立显现',
        description: `Skill that permits unsupported manifestation into reality, separate from any Master or rules of the world. This doesn't refer to reliance on magical energy (you still need that), but an anchor to the world in the form of a Master.`,
        ranks: [
            // A 级
            `Designing, choosing or rolling a Master is now optional. One can stay manifested indefinitely, nor is the use of other abilities or Noble Phantasms hampered by not having a Master.`,
            // B 级
            `Awareness of potential summonings occuring at all points in time. Allows thuser to respond to any such call and summon themselves, as long as they were not already summoned.`,
            // C 级
            `The user is no longer bound to the Throne of Heroes, instead being normally (when not summoned) located within a custom tailored pocket dimension.`,
            // D 级
            `The user's presence is affirmed throughout the entirely of time and space, granting resistance to time paradoxes and instant death attacks. Prevents the existance of any duplicates.`,
            // E 级
            `Guarantees originality of existence. The user is always summoned as their true self instead of a copy from the Throne of Heroes. Alows one to retain memories across all sumonings.`
       ]
    }
}

export const StandardPersonalSkillDescription: Record<StandardPersonalSkillName, ISkillDescription> = {
    'battle-continuation': {
        label: '战斗续行',
        description: `A Skill which allows you to continue fighting even after receiving mortal wounds. Reduces the mortality rate from any received injuries.`,
        ranks: [
            // A 级
            `Makes it possible to fight even with deadly injuries and can remain alive so long as one does not receive a decisive fatal wound.`,
            // B 级
            `You are no longer hindered by any injuries and are able to continue fighting as if in perfect condition.`,
            // C 级
            `You just don't know when to give up; allows you to keep fighting without any stamina or magical energy, using pure willpower alone.`,
            // D 级
            `You no longer feel pain at all, but wounds can still weight you down when fighting.`,
            // E 级
            `Feelings of pain are numbed for the duration of combat and you are given greater self-control in reactions to it.`
       ]
    },
    'charisma': {
        label: '领袖气质',
        description: `Power of one's personal charm as well as their talent for leading other people. Can be used to increase performance of allies by boosting their morale.`,
        ranks: [
            // A 级
            `Level of charisma that charms most enemies, it is possible to convince some opponents to lay down their weapons or team up in certain situations.`,
            // B 级
            `Sufficient enough to lead a nation; morale of military forces and any other allies following you is extremely high.`,
            // C 级
            `Allures people to listen to you and follow you as long as you weren't involved with them in a negative way before.`,
            // D 级
            `Forges bonds of true friendship between you and your already existing allies.`,
            // E 级
            `Allows you to lead a group of people, but gives no improvement to their morale.`
       ]
    },
    'mana-burst': {
        label: '魔力放出',
        description: `Ability to infuse your weapons and armor with magical energy and instantly expel it. Increases their performance in combat at the cost of greater costs in magical energy.`,
        ranks: [
            // A 级
            `Even a stick can become a weapon of great power. A normal weapon that is not on the level of a divine Mystery can be destroyed in one blow. Can also raise one's defense several times over.`,
            // B 级
            `Allows one to create a jet burst of magical energy from their weapon, which can be used as a midrange attack.`,
            // C 级
            `Infuses the entire body of the Servant with magical energy to temporarily improve their performance in combat.`,
            // D 级
            `You can use small concentrated bursts of energy at close range for both defensive and offensive purposes.`,
            // E 级
            `Weapons and armor can be infused with magical energy to improve their effectiveness.`
       ]
    },
    'instinct': {
        label: '直感',
        description: `The ability to instantly identify the best possible course of action in combat situations.`,
        ranks: [
            // A 级
            `Such a high level of instinctual precognition, it is essentially in the realm of subconsciously predicting the course of the entire battle.`,
            // B 级
            `It is possible to halve the penalties inflicted by visual and auditory interference by simply guessing where objects are located and will be moved to.`,
            // C 级
            `Allows you to predict the trajectory of ranged attacks and general directions of melee strikes.`,
            // D 级
            `Gives you instinctive general knowledge on whether or not your attacks will be successful without having to make any of them in the first place.`,
            // E 级
            `Gives you a vague but reliable danger sense, though how you act upon it is up to you.`
       ]
    },
    'eye-of-the-mind-true': {
        label: '心眼·真',
        description: `A simple ability learned through effort and hard work. Heightens discipline and capacity for observation. Increases the potential of making a comeback when fighting a superior enemy.`,
        ranks: [
            // A 级
            `Capable of considering of all possibilities in a miniscule amount of time close to being instant to escape from a predicament.`,
            // B 级
            `You are capable of calm analysis of the abilities of the opponent as well as the battle conditions even when in danger.`,
            // C 级
            `Gives you the ability to discern all potential risks present at the current point in time.`,
            // D 级
            `A firm grasp on the battle conditions that lets you take variables like terrain and bystanders into account when planning your next move.`,
            // E 级
            `Allows one to vaguely guess the true strength of an opponent, even if they are trying to conceal it.`
       ]
    },
    'eye-of-the-mind-fake': {
        label: '心眼·伪',
        description: `Unerned counterpart to the true version of this Skill, it likely comes from a blessing given by a superior existence or attributed by the legend.`,
        ranks: [
            // A 级
            `Allows you to obtain complete measure of your opponent's combat style after only a few exchanges and counter it, rendering all of their normal attacks ineffective if they're not derived from other skills.`,
            // B 级
            `The user can prompt a Luck check while in combat, upon passing which all paths that lead to one's guaranteed loss or demise will be instantly removed from consideration.`,
            // C 级
            `When faced with a visual obstruction or opponent's attempt to conceal themselves,you have achance to disregard this impairment and proceed as if you were still clearsighted.`,
            // D 级
            `Grants pre-emptive knowledge of the results of all potential parameter checks to be prompted by you when considering your next move. Allows you to knowwhether you are being watched.`,
            // E 级
            `This sense can differentiate between multiple different parties doing so, and to vaguely discern their intent.`
       ]
    },
    'disengage': {
        label: '重整旗鼓',
        description: `The ability to withdraw from the midst of combat and reset the battlefield and battle conditions. Used when you need to escape with your life or to not be held off by someone when pursuing a different target.`,
        ranks: [
            // A 级
            `After escaping, forcibly releases some of the bad status ailments which could've been inflicted on the user of this Skill previously in that battle.`,
            // B 级
            `Restores the condition of this Skill to the initial value and instantly heals all light wounds upon a successful escape.`,
            // C 级
            `Returns battle conditions such as terrain to what they were at the beginning of the battle after escaping.`,
            // D 级
            `Allows you to quickly withdraw from the battlefield in the midst of combat if your Agility is ranked higher than the enemy's; can be attempted once per day.`,
            // E 级
            `Gives knowledge on how to notice possible escaping routes and find an exit from an unknown location.`
       ]
    },
    'bravery': {
        label: '勇猛',
        description: `The ability to ignore mental interference. Is not compatible with Mad Enhancement, which will either lower Bravery's rank or outright remove it.`,
        ranks: [
            // A 级
            `Can ignore any magical interference affecting mental capabilities, such as illusions and enchantments both in and outside of combat.`,
            // B 级
            `Allows one to disregard any mental inference including magical when locked in combat.`,
            // C 级
            `Interference of effects of some Skills like Charisma or Mystic Eyes will be likely ineffective.`,
            // D 级
            `Loss of weapons or limbs causes no panic or confusion, damage is increased when fighting unarmed.`,
            // E 级
            `Cannot be coerced or confused by enemy actions or words when in combat.`
       ]
    },
    'clairvoyance': {
        label: '千里眼',
        description: 'Visual ability that impacts perception and affects your accuracy when using ranged weaponry. It vastly increases how suitable you are for scouting.',
        ranks: [
            // A 级
            `Short range prediction of the future or even mind reading becomes possible in certain situations.`,
            // B 级
            `Allows one to see targets which are concealed through a Luck check.`,
            // C 级
            `Capable of keeping track of fast-moving objects within a range of four kilometers on the fly.`,
            // D 级
            `Can sense movements of targets outside of one's line of sight at relatively close range.`,
            // E 级
            `Range of sight is greatly increased, allows you to see for several kilometers when standing still and concentrating.`
       ]
    },
    'divinity': {
        label: '神性',
        description: `One's relation to gods as a Skill. Increases damage and reduces defensive Skills in proportion to Divinity's rank against all enemies whose own Divinity is lower or non-existent by considerable anounts.`,
        ranks: [
            // A 级
            `An entity closest to an actual god by the virtue of being a descendant of one or a deity in their own right.`,
            // B 级
            `A demigod or someone upon whom titles of divinity were projected during their lifetime.`,
            // C 级
            `Level of divinity equivalent to that of a Saint or someone close to a god.`,
            // D 级
            `Rank of divinity granted by the virtue of being related to someone descended from gods.`,
            // E 级
            `One who is familiar with gods and interacted with them in the past in some way or a remnant of a deity on their own.`
       ]
    },
    'golden-rule': {
        label: '黄金律',
        description: `A Skill that refers to the measurement of one's fortune and the ability to acquire wealth.`,
        ranks: [
            // A 级
            `Money flows into your hands seemingly by itself, without you spending any actual effort.`,
            // B 级
            `Possessions which allows for prestigious and frivolous lifestyle for one's entire life.`,
            // C 级
            `Possesses a treasure of some sort; can be considered rich at this point.`,
            // D 级
            `You can manage your own finances efficiently to always gain some profit.`,
            // E 级
            `Has enough funds to live a moderate life without needing or spending much.`
       ]
    },
    'magecraft': {
        label: '魔术',
        description: `Ability to use modern Thaumaturgy, covering all spells from the current era. Is not a requirement for Casters, as they will be able to use at least some kind of magic regardless of their Skills.`,
        ranks: [
            // A 级
            `Considered a master magus in using modern mysteries on par with greatest mages of this era.`,
            // B 级
            `Capable of using modern magecraft, and applying a wide variety of spells using a deep understanding of Thaumaturgy.`,
            // C 级
            `Capable of using orthodox Thaumaturgy, is specialized in a single technique or type of Magecraft.`,
            // D 级
            `Has a deep knowledge behind the theory of modern Thaumaturgy, but only a few of the known spells can be used offensively.`,
            // E 级
            `Has little understanding behind the magical theory, but knows a couple random useful spells.`
       ]
    },
    'high-speed-incantation': {
        label: '高速神言',
        description: `The Skill used to shorten periods of time spent casting spells and accelerate their rituals.`,
        ranks: [
            // A 级
            `能以一工程（Single Action）的时间启动大魔术。`,
            // B 级
            `Spells and rituals which take a lot of time to prepare can be cast on the spot in seconds.`,
            // C 级
            `Greater concentration when casting spells; allows one to use magic on the run or while doing something else in parallel.`,
            // D 级
            `Weak and spells which can already be used quickly can be cast instantly.`,
            // E 级
            `Increases the overall performance when casting spells, making the chance to make a mistake when using magic near-nonexistant.`
       ]
    },
    'rune-magic': {
        label: '卢恩魔术',
        description: `Allows one to manipulate and use Norse runes for the purposes of Magecraft and simple combat.`,
        ranks: [
            // A 级
            `Capacity to use 18 Norse runes for a variety of purposes, which gives access to many other skills by proxy and allows one to temporarily raise parameters.`,
            // B 级
            `Can use 18 Norse runes which correspond to effects of some other skills, albeit in a weaker state.`,
            // C 级
            `Use of a dozen Norse runes with a wide variety of magical effects, unattainable by modern Magecraft.`,
            // D 级
            `Knowledge of 5 to 6 runes and an ability to use and combine their effects.`,
            // E 级
            `Can use one Norse rune or two at best, which can grant minor magical effects.`
       ]
    },
    'throwing': {
        label: '投掷',
        description: `Expertise in using throwsing weapons of all kinds. Automatically gives you additional appropriate weaponary of your choice to be used for this purpose`,
        ranks: [
            // A 级
            `Ability to pick up literally anything that can be thrown and use it as an explosive projectile which can harm Servants despite being mundane.`,
            // B 级
            `Thrown projectiles have the same destructive power as firearms, typically spelling certain death for human targets.`,
            // C 级
            `Thrown projectiles can cover great distances while keeping the same level of preciseness.`,
            // D 级
            `Superhuman level of accuracy with all existing throwing weapons.`,
            // E 级
            `Expertise in throwing projectiles of one type, such as daggers, throwing axes and so on.`
       ]
    },
    'marksmanship': {
        label: '射击',
        description: `Skill which represents all of the possible shooting techniques. Only useful if you are using firearms in the first place.`,
        ranks: [
            // A 级
            `No longer need to see the target to hit it; can operate using only sound and educated guesses alone.`,
            // B 级
            `Capable of perfectly hitting a target with a firearm, even while on the move.`,
            // C 级
            `Level of a master sniper who can hit their target from many kilometers away.`,
            // D 级
            `Includes all possible firearms throughout human history.`,
            // E 级
            `Can handle any firearm of the age one was born in with an above average skill.`
       ]
    },
    'monstrous-strength': {
        label: '怪力',
        description: `Skill which represents one's monstrous heritage. It allows Servants to tap into their monstrous side, temporarily increasing their Strength parameter, depending on the ranking of this Skill.`,
        ranks: [
            // A 级
            `Can temporarily turn into a true mythical monster, incorporating their powers and strength.`,
            // B 级
            `It is possible to tap into a full strength of a monster while staying in a normal human form.`,
            // C 级
            `Some bodyparts are permanently replaced with monstrous alternatives.`,
            // D 级
            `Can temporarily augment some bodyparts with properties of a monster, changing their appearance and increasing their physical capabilities.`,
            // E 级
            `While one still appears as a normal human, their endurance and vitality more resembles that of a monster.`
       ]
    },
    'protection-from-arrows': {
        label: '避矢的加护',
        description: `Skill which represents your defense against projectiles and any other ranged attacks. Only takes the projectiles into account, so it doesn't help against special abilities.`,
        ranks: [
            // A 级
            `Any ranged attack is nullified effortlessly regardless of whether it is anticipated or not.`,
            // B 级
            `只要用眼睛确认了攻击对象，无论怎样的远距离攻击都可以闪避或者拦截。`,
            // C 级
            `Can deal with any projectiles that do not depend on Magecraft, as long as youcan track themwith your eyes.`,
            // D 级
            `By using weaponry or improvised means you can block singular ranged attacks, including bullets.`,
            // E 级
            `Can notice most arrows and similar projectiles before they reach you, giving you a chance to dodge them.`
       ]
    },
    'self-modification': {
        label: '自我改造',
        description: `The aptitude to remold one's own body or merge one's own flesh with body parts of others. Can also improve intelligence of the user by consuming organs of other Servants.`,
        ranks: [
            // A 级
            `All processes of modification can be accomplished within mere minutes.`,
            // B 级
            `You can replace lost bodyparts by taking similar parts of others or constructing artificial replacements and merging your flesh with them.`,
            // C 级
            `You can enhance your body's physical performance and make up for its deficits by consuming the flesh of others or sewing it on yourself.`,
            // D 级
            `Modifications can be made for an alternative second form to which the Servant can quickly switch.`,
            // E 级
            `Slowly modifies the body towards a particular purpose within what is possible with available energy pool; the process may take hours.`
       ]
    },
    'shapeshift': {
        label: '变形',
        description: `A Skill that refers to borrowing bodies and appearances of other people, or making a fake transformation into a mythological creature.`,
        ranks: [
            // A 级
            `Can take on any form known to man, though limited in size somewhat; as you can't exactly turn into an actual mythological beast and can only imitate them, you won'tget their abilities.`,
            // B 级
            `Can change form to that of any other human; doesn't have to be a copy,so you can shift your appearance to any that is humanly possible.`,
            // C 级
            `Available forms now include more esoteric ones, such as mist or wind to evade at close range.`,
            // D 级
            `Can shift form into an animal no larger than a horse and no smaller than a snake.`,
            // E 级
            `Can change a limb or bodypart into that of an animal, gaining their strength.`
       ]
    },
    'military-tactics': {
        label: '军略',
        description: `Tactical knowledge used not for small one-on-one conflicts, but for those where many people are involved, preferably entire armies. Gives bonus modifiers in dealing with Anti-Army Noble Phantasms.`,
        ranks: [
            // A 级
            `Genius of strategy and planning, capable of making plans that take into account even random events, bordering on precognition.`,
            // B 级
            `Masterful insight in strategy and tactics; provides bonuses when using an Anti-Army Noble Phantasm or when fighting against it.`,
            // C 级
            `Capacity to wage wars of attrition and lead armies on either defensive and offensive.`,
            // D 级
            `Can mobilize armies and lead them in battle with an above average skill.`,
            // E 级
            `Theoretical knowledge of strategy, but no experience of using it in practical application; level of an armchair general.`
       ]
    },
    'knight-tactics': {
        label: '骑士的武略',
        description: `Battle methodology which lets you grasp the flow of battle and induce your enemy to make a mistake, which you will exploit later on, even if they are superior to you in strength.`,
        ranks: [
            // A 级
            `Opponents subconsciously make mistakes in their plans just by being in your presence.`,
            // B 级
            `Can cause an opponent to make a check failure in their next move through a simple conversation.`,
            // C 级
            `Imposes penalties on opponents more powerful than yourself during their parameter checkswhen in direct contact.`,
            // D 级
            `Weaker opponents can be coerced to fight according to the code of honor and rules as long as you adhere to it yourself.`,
            // E 级
            `Allows one to observe when their opponent has made a mistake to wager on a momentary chance of victory.`
       ]
    },
    'mystic-eyes': {
        label: '魔眼',
        description: `Skill which represents the fact that the Servant possesses Mystic Eyes of some kind. Unlike all of the other options, you won't get the abilities of lower ranks when purchasing the higher ones.`,
        ranks: [
            // A 级
            `Mystic Eyes of the highest order which can unconditionally petrify anyone who fails a Magic ranking check. Those who succeed will suffer a downgrade in all parameters.`,
            // B 级
            `Mystic Eyes which force their user to fully commit to achieving a single combat task and make the desired result almost inevitable, providing great support in battle.`,
            // C 级
            `Mystic Eyes that charm anyone of the opposing sex, should they gaze into them. Induces love and affection after long exposure,but the effect can wear off over time.`,
            // D 级
            `Mystic Eyes which allow the user to process and adapt information perceived through them at an increased rate.`,
            // E 级
            `Mystic Eyes which will bind the target, crippling them in one place.The effect will be ignored with a sufficient ranking in either Endurance, Magic or Luck.`
       ]
    },
    'revelation': {
        label: '启示',
        description: `The skill to hear the voice of the Heavens and receive information on how to best proceed in any given task`,
        ranks: [
            // A 级
            `Can converse with the "voice in your head" about the details of previous advices and ask for new lesser revelations on how to succeed at any instant task whenever you wish, not limited in number.`,
            // B 级
            `Can also give you extensive knowledge on how to take optimum action to achieve victory from the present point in time onwards, but the execution is up to you; this particular ability can only be used once.`,
            // C 级
            `At a crucial point in time or if you are going to die by going on a chosen path, you will receive a vision which will warn you about the threat.`,
            // D 级
            `Receive a whisper which will give you a random highly beneficial advice once per day.`,
            // E 级
            `You believe to be in touch with the divine and feel as if you are being watched over; you can always feel how to choose the most suitable path when moving from one place to another.`
       ]
    },
    'voyage': {
        label: '航海',
        description: `Denotes one's steering techniques for a ship. Is incompatible with Riding, which will be lowered or even outright removed depending on Voyage's rank.`,
        ranks: [
            // A 级
            `Your ghostly ship possesses its own abilities, making it powerful to be on par with some of the Noble Phantasms.`,
            // B 级
            `Provides a weak phantom crew to assist you in manning the ship and fighting your enemies.`,
            // C 级
            `Combines the effects of "Charisma" and "Military Tactics" Skills of higher ranks when being on board of a ship.`,
            // D 级
            `Allows you to create a ghostly vessel recognized as a ship at will, which will be able to sail on sea, land and air.`,
            // E 级
            `Extensive knowledge on how to sail any existing ship of the past and modern era.`
       ]
    },
    'eternal-arms-mastership': {
        label: '无穷的武练',
        description: `Mastery of combat that cannot be dulled. Each rank taken increases overall damage and finesse of technique when fighting, no matter what kind of weapon is being used.`,
        ranks: [
            // A 级
            `Dexterity of combat arts performed to the extremes. Prevents degradation of fighting skills no matter the circumstances.`,
            // B 级
            `Every attack you make is always of its maximum damage value, and even if it is affected by negative status ailments, it still can't drop below its original minimum damage value.`,
            // C 级
            `Reduces the overall effect of any inflicted penalties if they also happen to affect your fighting techniques.`,
            // D 级
            `Finesse and technique are no longer dulled by the effects of Mad Enhancement, allows to retain peak fighting ability even in the depths of rage.`,
            // E 级
            `Allows you to use any weapon in peak condition, no matter what type of weapon it is,ignoring the battlefield conditions and terrain, or even if it is absurdly impractical.`
       ]
    },
    'protection-of-the-faith': {
        label: '信仰的加护',
        description: `Skill of martyrs and warriors who gave their lives for their faith. It is not granted by a higher divine power, but is born out of their own trained body and abnormal mind.`,
        ranks: [
            // A 级
            `Increases resistance to negative status ailments. Health regenerates much quicker. Causes speech quirks or odd use of language.`,
            // B 级
            `When one is about to have their parameters drop ranks by an enemy ability, it doesn't happen and the user only takes some additional damage instead. Makes the user very fatalistic and god fearing.`,
            // C 级
            `One is able to sacrifice small amounts of health during parameter checks to significantly improve their chances.Additionally makes the user religious if they weren't before.`,
            // D 级
            `Allows one to sacrifice some of their own health to forcefully remove negative status ailments in the middle of combat.`,
            // E 级
            `Lowers damage dealt to the user overall. This protection is ignored if the opponent has
Divinity of any rank.`
       ]
    },
    'martial-arts': {
        label: '武术',
        description: `Conglomerate of Skills which represent your ability to fight with your bare hands and use moves and techniques from the eastern martial arts.`,
        ranks: [
            // A 级
            `Makes one a master among masters. At this point your martial poweress give great explosive destructive power to even basic attacks.`,
            // B 级
            `Allows yhou to cut the distance to your opponent nearly instantly. Can be used in short bursts, but is very taxing.`,
            // C 级
            `Incorporates use of your main weapon into the martial art techniques, allowing you to combine effects of this Skill in all of your attacks.`,
            // D 级
            `Fighting unarmed no longer gives you penalties to damage, speed and dexerity.`,
            // E 级
            `Gives you knowledge of various techniques from eastern martial arts, as well as experience and finesse required to properly execute them.`
       ]
    },
    'alluring-nightingale': {
        label: '魅惑的美声',
        description: `Call of a siren, this is a magically enhanced voice that affects the world
through sound. Its victims can resist it not only through Magic Resistance, but also through their own will.`,
        ranks: [
            // A 级
            `The singing can now additionally mesmerize enemy Servants, having a high chance to temporarily confuse or charm them to do the user's bidding.`,
            // B 级
            `Singing to allies can give temporarily give positive modifiers to their random parameters, with the ones affected being decided by the nature of the song.`,
            // C 级
            `Allows one to cause damage to the enemy Servants by their magical voice.`,
            // D 级
            `Singing has all of the benefits of the higher ranks, but only when affecting normal humans instead of Servants.`,
            // E 级
            `Gives the user a beautiful singing voice. Has no noticable positive effects otherwise.`
       ]
    },
    'eye-for-art': {
        label: '艺术审美',
        description: `对艺术作品、美术品的执着心，无论是何种形式的作品，总是能看穿其真正的加值。`,
        ranks: [
            // A 级
            `The chance to figure out the name of a Noble Phantasm by seeing it is increased to very high values.`,
            // B 级
            `Allows one to recognize any kind of hidden art at a glance. Purpose of a spell or any magical related matter is understood before they're used.`,
            // C 级
            `The chance of recognizing a Noble Phantasm is now moderate. Its function will be revealed alongside its true name if the check is successful.`,
            // D 级
            `Improves combat performance when using music or any other kind of art. Affects all allied parties not just the user.`,
            // E 级
            `目睹在艺术界有着相关传说的宝具时，即使宝具没有发动，也有极低机率可以看破其真名。`
       ]
    },
    'torture-techniques': {
        label: '拷问技术',
        description: `Expertise at inflicting pain and using specifically devised tools for that end.`,
        ranks: [
            // A 级
            `When targeting enemies with a specific trait (gender, Class or anything similar of your choice), the user obtains two plus modifiers to strength.`,
            // B 级
            `Increased sadism allows the user to recover their own health upon a critical hit.`,
            // C 级
            `The enemy passively continues taking damage from every wound they've got by a torture tool. Gives a plus modifier to strength when fighting wounded opponents.`,
            // D 级
            `Every landed attack causes shock to the victim, which adds mental interference and affects their decision making.`,
            // E 级
            `Allows to use torture tools with the same effectiveness as a normal weapon.`
       ]
    },
    'subversive-activities': {
        label: '破坏工作',
        description: `Skill which deals with subterfuge and fighting dirty. This is unbecoming of a hero, and so the user suffers penalties. Statements about foe number refer to familiars and similar low ranking enemies.`,
        ranks: [
            // A 级
            `Temporarily reduces enemy parameters or number of foes by two thirds at the battle's start if the one who initiates the engagement is the user, or one third if it isn't. User's Luck drops by a rank until combat ends.`,
            // B 级
            `Temporarily reduces enemy parameters or number of foes by a third at the battle's start if the one who initates the engagement is the user. Gives a negative modifier to the user's Luck until combat ends.`,
            // C 级
            `Creation of anti-Servant traps is now possible right in the middle of combat without the opponent noticing.`,
            // D 级
            `Allows one to prepare traps capable of hindering Servants before the start of a battle.`,
            // E 级
            `Gives the user knowledge about mundane trap making, where to place them,how to notice ones belonging to the enemy and how to disarm them.`
       ]
    },
    'galvanism': {
        label: '流电学',
        description: `能与电流交互，将其转化为其他形式，或者向敌人释放电流。`,
        ranks: [
            // A 级
            `不再是简单地将没有实体的攻击释放掉，而是将其转化为魔力蓄积起来。`,
            // B 级
            `可在转瞬间将魔光、魔风和魔弹等没有实体的攻击变换成电力，往四周放电从而无效化。`,
            // C 级
            `身体能因应蓄积电量而强化，伤害的修复也会变得迅速。`,
            // D 级
            `可以连接任何能源并积蓄电力，然后将其释放用于攻击。`,
            // E 级
            `完全地免疫电击和闪电。`
       ]
    },
    'natural-body': {
        label: '天性的肉体',
        description: `Inborn ability that signifies a perfect body that cannot be changed no matter what. Remodeling of the body via Shapeshifting or Self Modification will lower this Rank.`,
        ranks: [
            // A 级
            `The body is completely immutable. This grants total immunity to any negative status ailment that specifically affects the body.`,
            // B 级
            `Grants a temporary plus modifier to strength whenever the user needs to pass a check that involves it.`,
            // C 级
            `Perfection of the body that grants additional resistance to poisons, curses and petrification.`,
            // D 级
            `Strength is one rank higher whenever the body is unwounded. Increases overall health regeneration by small amounts.`,
            // E 级
            `无论摄入多少热量，体型也不会改变。然而对于从者来说，这一技能是多余的。`
       ]
    },
    'innocent-monster': {
        label: '无辜的怪物',
        description: `Skill of those whose legend was distorted by an unfair reputation and were regarded as monsters by the public after their death. Point gain works the same way as Mad Enchantment.`,
        ranks: [
            // A 级
            `Forces the instincts and will of the monster of the legend into your body. You have to constantly struggle to keep control and remain your old self.`,
            // B 级
            `Personality traits of the monster from the associated legend bleed over into you. This disparity leads to mental trauma at worst and self-loathing at best.`,
            // C 级
            `The features granted by the legend are permanently exaggerated and monsterified. Using your other Personal Skills becomes more difficult.`,
            // D 级
            `Affects your looks to make you appear to be the subject of that evil legend.`,
            // E 级
            // `Associates you with an evil legend of your choice. Has no definitive negative effects other than causing people to react like "Oh, are you that guy from ...?".`
            `将从者与邪恶的传说联系起来。没有什么决定性的副作用，但会让人产生“哦，你是那个传说中的……？”之类的反应。`
       ]
    },
    'knowledge-of-respect-and-harmony': {
        label: '宗和的心得',
        description: `Serene state of combat that obscures the attacks of the user, making the enemy unable to get a read on them.`,
        ranks: [
            // A 级
            `Usage of Noble Phantasm no longer reveals its true name. No witness will be able to realize its function and effects.`,
            // B 级
            `即使对同一个对手重复同样的招式多少次，命中精准度也不会下降的特殊技能。也就是说是拥有“变得不会被敌人看穿攻击”效果的能力。`,
            // C 级
            `Obfuscates the logic of the user's movement. The mind of the opponent will not realize the tactical purpose of the user's position on the field and what they're planning to do next.`,
            // D 级
            `Grants the user high evasion ability, allowing them the chance to dodge half of the normal attacks coming their way.`,
            // E 级
            `When the user is going to use any ability or Skill, the enemy will not be able to notice them doing so or what they're aiming at until it is already done.`
       ]
    },
    'mental-pollution': {
        label: '精神污染',
        description: `Twisted mentality that purges the mind of the user of any foreign interference at a horrible cost. Cannot be taken together with Mad Enhancement, as this Skill will counteract any bonuses gained that way and derank it. Point gain works the same.`,
        ranks: [
            // A 级
            `由于精神错乱，能够以高机率屏蔽精神干涉系的魔术。但是，不具备同等级精神污染的人物无法与其沟通。`,
            // B 级
            `Any mental interference that wasn't negated instantly will be slowly cancelled over time. It is now impossible to come to a mutual understanding with anyone unless they have Mental Pollution too.`,
            // C 级
            `Chance to resist mental interference is medium. If the Master has Evil alignment or acts cruelly towards you, this Skill temporarily ranks up without you gaining any points (can't go higher than from C to B).`,
            // D 级
            `Twists your view of reality, causing random hallucinations. Any mental interference that wasn't negated instantly will be reduced.`,
            // E 级
            `Understanding ordinary people becomes difficult unless they are unusual or quirky. Gives a small but solid chance to resist any mental interference.`
       ]
    },
    'combination': {
        label: '结合',
        description: `A Skill that displays how much one's combat power increases when working together with a specific person. Splits your Servant container to create a partner for you.`,
        ranks: [
            // A 级
            `All your limits on distance from each other are lifted, you are allowed to act independently from your twin.`,
            // B 级
            `At this point, even if one of you were to die, the other will be able to continue fighting in the Grail War without any repercussions.`,
            // C 级
            `You and your twin are able to perfectly work in tandem, balancing each other's weaknesses and acting as one.`,
            // D 级
            `Instead of dying when your twin falls, you will be able to continue existing, but unable to do any fighting. Offers no further bonuses.`,
            // E 级
            `Separates your Servant container into two, creating a twin who will share your stats. You can't move too far away from each other, and if one of you dies, the other will die too.`
       ]
    },
    'imperial-privilege': {
        label: '皇帝的特权',
        description: `Skill of monarchs of the highest order. If one insists to be able to perform an act that is supposed to be impossible for them, this Skill will temporarily grant them the ability to succeed at it.`,
        ranks: [
            // A 级
            `The pool is expanded to 7 Skills. Even inherent abilities like Magic Resistance or Divinity can be emulated, with Double Summon and Combination being only exceptions.`,
            // B 级
            `Expands the pool to 5 Skills and allows ranks B and below. The pool can now include Class Skills of the seven standard Classes.`,
            // C 级
            `Gives you a pool of 3 Personal Skills of rank C or below of your choice which can be accessed one at a time. Cannot include inherent abilities such as Divinity or Mystic Eyes or other in a similar vein.`,
            // D 级
            `When in combat, allows you to obtain a random Skill of any rank below C. The Skill will disappear upon the end of engagement.`,
            // E 级
            `Allows you to freely and masterfully use mundane skills you have no expertise in, as long as they have no relation to combat.`
       ]
    },
    'double-summon': {
        label: '双重召唤',
        description: `Rare Skill that signifies a Servant's allegiance to two Classes at once. Only works for Cavalry Classes, both for the original one and the additional one.`,
        ranks: [
            // A 级
            `Full attunement to the second Cavalry Class of your choice. Allows you to freely switch between your normal costs for any Parameter and those of the other Class at will.`,
            // B 级
            `Allows you to acquire Class Skills of your second chosen Cavalry Class with their discounts.`,
            // C 级
            `Allows you to use Rider's Noble Phantasm discount if it was chosen by you as a second Cavalry Class.`,
            // D 级
            `Gives you the moveset and basic abilities of your second chosen Cavalry Class, such as Caster's ability to use magecraft and magical attacks, for example.`,
            // E 级
            `You technically count as a second Cavalry Class of your choice when interacting with abilities that may target a specific Class in their effects.`
       ]
    },
    'bloodsucking': {
        label: '吸血',
        description: `Vampiric ability to drain blood from the target or steal life energy from the environment. It's not an inherent property of Dead Apostles and True Ancestors, but can come from a similar nature.`,
        ranks: [
            // A 级
            `Those whose blood had been sucked can have their minds be muddled with to turn them to the user's side and obey their orders.`,
            // B 级
            `At this level, every attack passively steals lifeforce from the enemy in proportion from the dealt damage and adds it to user.`,
            // C 级
            `Allows one to also recover lost magical energy and strength by sucking blood. A single ordinary person drained dry is sufficient to restore the user to perfect condition.`,
            // D 级
            `Sucking blood allows the user to restore some of their health, undoing the damage received in combat.`,
            // E 级
            `The user is able to inflict damage by the means of sucking blood as an effective form of attack in combat.The sucked blood does nothing for the user by itself, however.`
       ]
    },
    'counter-hero': {
        label: '反英雄',
        description: `Ability to overcome heroes of legend and any fictional existences. Can come from the fact that the user is involved with storytelling, or from them being literally specialized in fighting heroic figures.`,
        ranks: [
            // A 级
            `The user automatically grasps the essense of the opponent's legend even without knowing it, granting them awareness of their weak spots and how to play around their strong points.`,
            // B 级
            `Reduces all parameters of the opponent by two full ranks. Has a weaker effect on Anti-Heroes and other targets who cannot be called proper Heroic Spirits.`,
            // C 级
            `The more fictional is the legend of the opponent, the greater the affinity the user willhave against them. Wholly fictional Servants are especially vulnerable.`,
            // D 级
            `Permanently strips any fame bonus to parameters and any other effect it may have from the opponent.`,
            // E 级
            `The user can conduct themselves in a way which causes any proper Heroic Spirit to initially not view them as a threat.`
       ]
    },
    'information-erasure': {
        label: '情报消除',
        description: `Skill affiliated with those whose existence is uncertain due to low amount of traces they've left. Pertains towards affirming this fact by forcefully eliminating these traces from the present reality.`,
        ranks: [
            // A 级
            `All opponents now must make a Luck check at the start of every round to not forget the information presently displayed by the user in their fight.`,
            // B 级
            `Effect can now work even in broad daylight and can erase digital and other recordings of the user. Other physical evidence still remains in place after the fact.`,
            // C 级
            `Erases memories pertaining to the user from all witnesses, including the opponent, after the end of engagement.`,
            // D 级
            `Forgetting the user by chance witnesses is no longer decided by chance. Anyone who actually fought the user and saw them clearly will still remember them.`,
            // E 级
            `The user's true name, appearance and any other abilities they possess have a chance to be forgotten by anyone who did not get a clear view of them.`
       ]
    },
    'inherent-wisdom': {
        label: '神授的智慧',
        description: `Merged version of separate Skills which belong to those who had mastered many subjects and are primarily known as teaching figures to other heroes. Utilized to acquire more Skills and empower allies.`,
        ranks: [
            // A 级
            `Allows the user to teach others even Skills the user themselves does not possess, up to ranks B or A, as long as they are still coming from a broad category.`,
            // B 级
            `When teaching others, the user is no longer constrained to doing so to one student at a time. No longer limits targets to Servants, but results become significantly less effective.`,
            // C 级
            `Allows the user to permanently obtain a new Personal Skill from a broad category once per day, as long as it is not too specific or unique, and is not an inherent physical feature. Can't gain more than 9.`,
            // D 级
            `Can increase any other Skill by one rank (not higher than A) for themselves or any other target. Can be done once per day, and can't get reapplied to the Skill it already affected once.`,
            // E 级
            `Allows the user to teach any of their Skills to any other Servant, one at a time. Rank progressively increases from E to the one the user has per day of teaching. May depend on student quality.`
       ]
    }
}

export const NoblePhantasmTypeDescription: Record<NoblePhantasmType, IDescriptionBase> = {
    'anti-unit': {
        label: '对人',
        description:
        `This Noble Phantasm is geared towards focusing a single target or a few of them at best. Can be used on yourself instead.\n` +
        `Because its power is concentrated, it will be stronger overall despite what its rank suggests. For example, at A rank an Attack Noble Phantasm might have an instant kill ability, though with a chance of failing.`
    },
    'anti-army': {
        label: '对军',
        description:
        `An ability that is designated to deal with organized groups of enemies, even entire armies.\n` +
        `Has greater area if effect than Anti-Unit Noble Phantasms if it's an ability that targets a location, but depending on your other choices, it can also be instead an ability to summon your own army.`
    },
    'anti-fortress': {
        label: '对城',
        description:
        `Noble Phantasms created not to be used against single targets or even large groups of people, but rather fortified structures and gigantic creatures.\n` +
        `It generally covers a very wide area and has a long range. It is still possible to use it against sole normal enemies, of course, it's just that it will be wasteful.`
    },
    'anti-world': {
        label: '对界',
        description:
        `Your Noble Phantasm is designed to target the entire world, or, more likely, to focus on the esoteric layer of reality we live on.\n` +
        `Its power will be very widespread, so it will be massively weaker if you want it to actually affect the whole world rather than wrap reality in a relatively small range.`
    }
}
