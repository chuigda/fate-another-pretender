import type { IDescriptionBase, IParameterDescription } from '../common_description'
import type {
    ClassSkillName,
    NoblePhantasmType,
    ServantClass,
    ServantParameterName,
    ServantUpkeep,
    StandardPersonalSkillName
} from './servant'

export const ServantUpkeepDescription: Record<ServantUpkeep, IDescriptionBase> = {
    free: {
        label: '无',
        description:
        `维系该从者的成本可以忽略不计，近乎于零。然而，真的达到这种程度可能需要一些非同寻常的条件。如果这些条件不满足，则功能上与“低”等级的维持成本没有区别。`
    },
    low: {
        label: '低',
        description:
        `维系该从者的成本远低于通常水平。\n` +
        `对于没有办法维持其从者的普通人御主来说，这是一个更好的选择，但这只是缓解了他们的魔力危机，不足以完全解决这一点。`
    },
    medium: {
        label: '中',
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

export interface IServantClassDescription extends IDescriptionBase {
    labelShort: string,
}

export const ServantClassDescription: Record<ServantClass, IServantClassDescription> = {
    // 三骑士
    saber: {
        label: '剑之骑士 (Saber)',
        labelShort: 'Saber',
        description:
        `Saber 被认为是各方面最均衡的职阶，各项属性都遥遥领先，这也是该职阶的主要要求之一，另一个要求则是因剑而闻名。\n` +
        `通常来说，Saber 被认为是整体实力最强的职阶。几乎可以肯定的是，Saber 能一直战斗到圣杯战争的最后阶段。然而，他们的弱点在于过于直接，除了正面攻击对手之外，几乎无法运用任何其他战术。`
    },
    lancer: {
        label: '枪之骑士 (Lancer)',
        labelShort: 'Lancer',
        description:
        `Lancer 的面板没有其他骑士职阶那么华丽，甚至还不如其他非骑士职阶，但他们在本职工作上非常可靠。\n` +
        `成为 Lancer 意味着拥有令人难以置信的敏捷和速度，且善于利用速度优势和打了就跑的战术。\n` +
        `与所有其他职阶不同，他们唯一的职阶技能是对魔力，而这甚至不是他们独有的。`
    },
    archer: {
        label: '弓之骑士 (Archer)',
        labelShort: 'Archer',
        description:
        `精通远程武器是 Archer 的标志，当然，远程武器也不一定非要是弓。\n` +
        `Archer 们注定要远离御主独立战斗。他们桀骜不驯的天性使得他们不可避免地会反抗自己的御主，只有在令咒的作用下才会真正听从命令。\n` +
        `Archer 拥有出色的视力和侦察能力。`
    },

    // 四骑兵
    rider: {
        label: '骑兵 (Rider)',
        labelShort: 'Rider',
        description:
        `Rider 是擅长骑乘的英灵，他们是四骑兵职阶的代表。\n` +
        `Rider 职阶的主要要求是精通使用各种坐骑，因此 Rider 们具有极高的机动性也就不足为奇了。\n` +
        `Rider 的参数低于三骑士职阶，但作为补偿，Rider 们往往拥有非常强大的宝具。`
    },
    caster: {
        label: '魔术师 (Caster)',
        labelShort: 'Caster',
        description:
        `被召唤为 Caster 意味着能够使用某种形式的魔术。\n` +
        `通常被认为是所有七个标准职阶中最弱的，甚至连 Assassin 都能对他们构成威胁，但这仅限于物理层面。Caster 真正的力量在于其他地方。\n` +
        `该职阶的能力使其倾向于在战争中采取极端的防御性策略。`
    },
    assassin: {
        label: '暗杀者 (Assassin)',
        labelShort: 'Assassin',
        description:
        `Assassin 是最弱的职阶之一，但这是因为他们从来就不是为了公平战斗或与其他从者正面交锋而存在的。\n` +
        `Assassin 通常会秘密行动、使用诡计和遁术，首要目标是敌方御主。\n` +
        `Assassin 职阶的技能组合将使避免直接战斗变得轻而易举。`
    },
    berserker: {
        label: '狂战士 (Berserker)',
        labelShort: 'Berserker',
        description:
        `只有那些在生前曾陷入狂暴的人才能加入 Berserker 的行列。\n` +
        `Berserker 主要由较弱的从者组成，狂化技能可以极大地增强他们，使得他们能与真正的英灵平起平坐。但如果你将一个本已强大的从者再加以狂化，那就是另一回事了。\n` +
        `Berserker 是最强的职阶之一，尽管大多难以控制。`
    },

    // 非常规
    shielder: {
        label: '盾兵 (Shielder)',
        labelShort: 'Shielder',
        description:
        `Shielder 是专注于保护他人的职阶，要求是具有盾牌和其他类型的防御性武装。\n` +
        `Shielder 的不寻常之处在于他们专注于与其他从者团队合作。除非被召唤的英灵拥有适合单打独斗的特质，否则建议寻找盟友来发挥 Shielder 的优势。`
    },
    ruler: {
        label: '裁定者 (Ruler)',
        labelShort: 'Ruler',
        description:
        `Ruler 通常是为了应对有人公然违反圣杯战争规则、危及仪式而召唤的。\n` +
        `他们也旨在维护英灵的法则，防止死者统治生者。\n` +
        `Ruler 职阶的主要要求是公正无私，对圣杯没有欲望，因此他们的行列中以圣徒为主。`
    },
    avenger: {
        label: '复仇者 (Avenger)',
        labelShort: 'Avenger',
        description:
        `Avenger 是一个以强烈的仇恨和对复仇的执着而闻名的职阶。由于大众的看法，他们真实的自我通常会被严重扭曲。\n` +
        `每个 Avenger 都是独一无二的，因此没有一个放之四海而皆准的策略。所有 Avenger 唯一的共同点就是他们对复仇的追求。`,
    },

    // 兽
    beast: {
        label: '兽 (Beast)',
        labelShort: 'Beast',
        description:
        `从人理之树的树干中生长出来并试图吞噬它的灾厄之兽。一种罪恶的存在，以一种奇怪、扭曲的方式爱着人类，即使在给人类带来确定的毁灭时也是如此。\n` +
        `这是一种凌驾于从者之上的恶，就像从者凌驾于普通人之上一样。`
    }
}

export const ParameterDescription: Record<ServantParameterName, IParameterDescription> = {
    strength: {
        label: '筋力',
        description: `肉体力量的强度。`,
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
        description: `承受伤害的能力。`,
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
        description: `敏捷性和反应速度。`,
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
        description: `能够操纵多少魔力。`,
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
        description: `运气的好坏。`,
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
            `A 级以下的魔术全部无效化，即使是大魔术和仪礼咒法也不例外。能短暂地抵抗一划令咒。`,
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
            `随着战争的进行缓慢地回复魔力，但仍然需要御主才能维持现界。`,
            // B 级
            `无尽的魔法能量以小量不断涌现，直到复仇成功为止。`,
            // C 级
            `承受伤害时获得等量的魔力。`,
            // D 级
            `在战斗中可持续恢复少量魔力。`,
            // E 级
            `当使用攻击性的魔术能力时，如果成功，则返还小部分消耗的魔力。`
       ]
    },
    'self-field-defense': {
        label: '己阵防御',
        description: `盾兵的标志性技能，能够让使用者保护队友甚至整个友军阵营，达到超越人类极限的程度。`,
        ranks: [
            // A 级
            `将范围提升三倍。友方受到的伤害会直接转移到技能持有者。所有对持有者或其友方造成的伤害均减半。`,
            // B 级
            `将范围提升两倍。使用者受到的伤害会反弹给攻击者。`,
            // C 级
            `范围内所有友方受到的伤害减少三分之一，但技能持有者本人不能受益于这个效果。`,
            // D 级
            `完全地格挡普通攻击。并且只要技能持有者愿意，就能在战斗中不动如山。`,
            // E 级
            `能察觉到所有紧随在身后的友方的位置，并能快速冲向其中任何一人，以拦截对其的大部分攻击。`
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
        description: `在战斗中受到致命伤害之后仍能继续战斗的能力，能降低所受任何伤害的致死率。`,
        ranks: [
            // A 级
            `即使受到了致命伤也能继续战斗，只要没有受到决定性的伤害就能保持存活。`,
            // B 级
            `无论受了多重的伤害也总是能继续战斗，并且战斗力总是处于完美状态。`,
            // C 级
            `永不放弃，即使没有精力和魔力也能依靠纯粹的意志力继续战斗。`,
            // D 级
            `不再感受到疼痛，但伤口仍然会在战斗中造成影响。`,
            // E 级
            `在战斗中麻痹疼痛感，并且在对疼痛的反应上获得更强的控制力。`
       ]
    },
    'charisma': {
        label: '领袖气质',
        description: `个人魅力以及领导他人的才能，能通过提升士气来增强盟友的表现。`,
        ranks: [
            // A 级
            `即使是敌人也会被这样的魅力所吸引，在某些情况下甚至能说服对手放下武器或联手合作。`,
            // B 级
            `能领导一个国家的能力；大幅提振军队和其他跟随者的士气。`,
            // C 级
            `能吸引人们听从并跟随，前提是之前没有与他们有过负面的交集。`,
            // D 级
            `能与现有的盟友建立真正的友谊。`,
            // E 级
            `能领导一小群人，但无法提升他们的士气。`
       ]
    },
    'mana-burst': {
        label: '魔力放出',
        description: `向武器和盔甲中注入魔力以并在瞬间释放的能力，能提升战斗中的爆发力，但魔力消耗也会相应增加。`,
        ranks: [
            // A 级
            `能将随手捡来的木棍变成强力武器的程度。能一击摧毁没有神性级神秘的普通武器。还能将防御力提升数倍。`,
            // B 级
            `能从武器中如喷射般地释放出能力，可用作一种中程攻击手段。`,
            // C 级
            `能将全身注入魔力，以暂时提升战斗中的表现。`,
            // D 级
            `能在近距离内使用小范围的集中魔力，既可用于防御也可用于攻击。`,
            // E 级
            `能向武器和盔甲中注入魔力以提升其效能。`
       ]
    },
    'instinct': {
        label: '直感',
        description: `在战斗中瞬间找到出最佳行动方案的能力。`,
        ranks: [
            // A 级
            `直觉预知能力极高，几乎能在潜意识中预判整个战斗的进程。`,
            // B 级
            `能够通过猜测物体的位置及其移动轨迹，将视觉和听觉干扰造成的惩罚减半。`,
            // C 级
            `能够预判远程攻击的轨迹和近战攻击的大致方向。`,
            // D 级
            `赋予一种本能的常识，能在发动攻击之前就预判其是否会成功。`,
            // E 级
            `赋予一种模糊但可靠的危险感知能力，但如何运用就全凭自己本事了。`
       ]
    },
    'eye-of-the-mind-true': {
        label: '心眼·真',
        description: `通过努力和刻苦学习获得的简单能力，提升观察力和专注力，在面对强敌时有更大的反击潜力。`,
        ranks: [
            // A 级
            `能够在极短的时间内考虑所有可能性，几乎能瞬间脱离困境。`,
            // B 级
            `即使在危险中，也能冷静分析对手的能力和战斗状况。`,
            // C 级
            `赋予辨别当前所有潜在风险的能力。`,
            // D 级
            `牢牢掌握战斗状况，能将地形和旁观者等因素考虑在内，并用于制定下一步行动计划。`,
            // E 级
            `即使对手尝试隐藏，也能模糊地猜测出其实际的实力。`
       ]
    },
    'eye-of-the-mind-fake': {
        label: '心眼·伪',
        description: `依靠天赋而不是努力而获得的心眼，通常是神祇的祝福或是传说赋予的能力。`,
        ranks: [
            // A 级
            `能够在短时间内完全掌握对手的战斗风格并加以反制，使得对手的普通攻击在没有其他技能辅助的情况下全部失效。`,
            // B 级
            `在战斗中能进行幸运检定，若检定成功，所有导致必败或必死的路径都会被瞬间排除在外。`,
            // C 级
            `在视线受阻或者对手尝试隐藏自己的情况下，有可能无视这些障碍，并继续像视线清晰时一样行动。`,
            // D 级
            `在考虑下一步行动时，能预先知道所有可能的参数检定结果。能知道自己是否正被监视。`,
            // E 级
            `能够区分多个不同目标，并模糊地辨别它们的意图。`
       ]
    },
    'disengage': {
        label: '重整旗鼓',
        description: `能够在战斗中全身而退并重整态势的能力，需要保全性命或者改变追击目标时非常有用。`,
        ranks: [
            // A 级
            `在脱离战斗后，强制解除一些在战斗中获得的不良状态。`,
            // B 级
            `在成功脱离战斗后，恢复能力状态至初始值，并立即治愈所有轻伤。`,
            // C 级
            `在脱离战斗后，将地形等战斗状况恢复至战斗开始时的状态。`,
            // D 级
            `如果敏捷高于敌人，能够在战斗中迅速脱离战场；每天可以尝试一次。`,
            // E 级
            `能够察觉可能的逃跑路线，并找到从未知地点逃脱的方法。`
       ]
    },
    'bravery': {
        label: '勇猛',
        description: `无视精神干扰的能力。与狂化不兼容，后者会降低勇猛的等级，或是直接移除该技能。`,
        ranks: [
            // A 级
            `能够无视任何影响精神能力的魔术，例如战斗内外施加的幻术和魅惑。`,
            // B 级
            `能够在战斗中无视任何精神干扰，包括魔术。`,
            // C 级
            `能够让某些技能（如领袖气质或魔眼）的干扰效果失效。`,
            // D 级
            `失去武器或四肢不会引起恐慌或混乱，且在赤手空拳战斗时伤害会增加。`,
            // E 级
            `在战斗中不会因敌人的行动或言语而影响判断。`
       ]
    },
    'clairvoyance': {
        label: '千里眼',
        description: `提升感知力和使用远程武器的精确度。也会大幅度提升侦察能力。`,
        ranks: [
            // A 级
            `在某些情况下，能进行小范围的未来预测，甚至还能读取对方内心的想法。`,
            // B 级
            `能通过幸运检定看到隐藏的目标。`,
            // C 级
            `能在四公里范围内跟踪高速移动的目标。`,
            // D 级
            `能在相对较近的范围内感知视线外目标的动向。`,
            // E 级
            `大幅度提升视野范围，站立不动并集中注意力时，能看到数公里之外的目标。`
       ]
    },
    'divinity': {
        label: '神性',
        description: `体现与神明关系的技能。能够对神性低于自己的敌人造成更高的伤害，并削弱其防御类技能效果。`,
        ranks: [
            // A 级
            `作为神祇的后裔或自身即为神祇的存在，接近真正的神。`,
            // B 级
            `半神或在生前被赋予神性称号的人。`,
            // C 级
            `圣人或与神明关系密切之人。`,
            // D 级
            `因与神祇后裔有血缘关系而获得的神性。`,
            // E 级
            `与神明有过某种接触或互动，或者自身是神祇的某种力量残余。`
       ]
    },
    'golden-rule': {
        label: '黄金律',
        description: `体现财富和获取财富能力的技能。`,
        ranks: [
            // A 级
            `财富源源不断地流入手中，不费吹灰之力。`,
            // B 级
            `拥有足以支撑奢华生活的财富。`,
            // C 级
            `拥有某种宝藏；已经是一般意义上富裕的水平了。`,
            // D 级
            `能够高效地管理个人财务，总是能获得一定的利润。`,
            // E 级
            `吃穿不愁的财富水平。`
       ]
    },
    'magecraft': {
        label: '魔术',
        description: `使用现代魔术的能力，涵盖了当代所有的咒法。对于 Caster 职阶来说，就算没有这个技能，他们也至少能使用某种魔术。`,
        ranks: [
            // A 级
            `能与当代最伟大的魔术师相提并论的程度。`,
            // B 级
            `对现代魔术理论有着深刻的理解，能施展多种类型的魔术。`,
            // C 级
            `能使用正统的魔术，专精于某一种魔术技巧或类型。`,
            // D 级
            `对现代魔术理论有着深刻的理解，但真正会用的进攻型魔术不多。`,
            // E 级
            `对魔术理论的理解有限，只知道一些零散的实用咒法。`
       ]
    },
    'high-speed-incantation': {
        label: '高速神言',
        description: `能缩短施展魔术所需的时间，并加速仪礼咒法。`,
        ranks: [
            // A 级
            `能以一工程（Single Action）的时间启动大魔术。`,
            // B 级
            `需要大量时间准备的魔术和仪礼咒法能在几秒钟内完成。`,
            // C 级
            `施展魔术时能更好地集中注意力；能在奔跑或进行其他活动时使用魔术。`,
            // D 级
            `较弱的魔术和那些本来就能快速施展的魔术能瞬间完成。`,
            // E 级
            `提升施展魔术时的整体表现，使用魔术时几乎不会出错。`
       ]
    },
    'rune-magic': {
        label: '卢恩魔术',
        description: `使用和操纵北欧卢恩符文以施展魔术和进行简单战斗的能力。`,
        ranks: [
            // A 级
            `能使用十八个卢恩符文以实现多种目的，这些符文能间接地赋予使用者许多其他技能，并能暂时提升各项参数。`,
            // B 级
            `能使用十八个卢恩符文，这些符文对应着某些其他技能的效果，尽管效果较弱。`,
            // C 级
            `能使用十二个卢恩符文，能实现现代魔术无法企及的多种魔法效果。`,
            // D 级
            `能使用五六个卢恩符文，并组合它们的效果。`,
            // E 级
            `能使用一两个卢恩符文，赋予些许魔法效果。`
       ]
    },
    'throwing': {
        label: '投掷',
        description: `专精于使用各种投掷武器的能力。`,
        ranks: [
            // A 级
            `能把随手捡来的任何东西变成能爆炸的投掷物，即使是普通物品也能对从者造成伤害。`,
            // B 级
            `投掷物的破坏力与火器相当，能给人类目标带来致命伤害。`,
            // C 级
            `能够将物体投掷的更远并保持极高的精度。`,
            // D 级
            `使用所有现存的投掷武器时都具有超凡的精准度。`,
            // E 级
            `专精于某一种类型的投掷武器，例如匕首、飞斧等。`
       ]
    },
    'marksmanship': {
        label: '射击',
        description: `代表所有射击技巧的技能。只在使用火器的情况下才能生效。`,
        ranks: [
            // A 级
            `即使看不见目标也能百步穿杨，甚至可以仅凭声音和经验进行射击。`,
            // B 级
            `即使在移动中也能完美地命中目标。`,
            // C 级
            `能从数公里外精准地狙击目标。`,
            // D 级
            `能使用人类历史上所有已知的火器。`,
            // E 级
            `能以高于平均水平的技能使用自己生活年代的任何火器。`
       ]
    },
    'monstrous-strength': {
        label: '怪力',
        description: `象征怪物血统的技能，能让从者借助其怪物的一面，短暂地提升力量参数，提升幅度取决于该技能的等级。`,
        ranks: [
            // A 级
            `能够暂时变成真正的神话怪物，并继承其力量和能力。`,
            // B 级
            `能够在保持普通人类形态的同时，发挥出怪物的全部力量。`,
            // C 级
            `能够使某些身体部位永久地变成怪物的形态。`,
            // D 级
            `能够暂时地将某些身体部位变成怪物的形态，改变其外观并提升其身体能力。`,
            // E 级
            `虽然外表仍然像普通人类，但耐力和生命力更像怪物。`
       ]
    },
    'protection-from-arrows': {
        label: '避矢的加护',
        description: `提供对投射物或者远程攻击的防御能力。只对投射物有效，无法防御某些特殊能力，如区域性效果、大范围 Reach。`,
        ranks: [
            // A 级
            `能轻松地化解任何远程攻击，不论是否有所预料。`,
            // B 级
            `只要用眼睛确认了攻击对象，无论怎样的远距离攻击都可以闪避或者拦截。`,
            // C 级
            `只要能用眼睛追踪投射物，就能应对任何非魔术的投射物。`,
            // D 级
            `能够使用武器或者其他手段格挡单一的远程攻击，包括子弹。`,
            // E 级
            `能在大多数箭矢和类似的投射物到达之前察觉到它们，从而有机会躲避它们。`
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
        description: `并非用于小规模一对一战斗的战术知识，而是用于大规模冲突、乃至整支军队的战术知识。在应对对军宝具时提供加成。`,
        ranks: [
            // A 级
            `战略和规划的天才，制定出的计划甚至连随机事件都能考虑在内，几乎接近预知未来的程度。`,
            // B 级
            `对战略和战术有着精湛的洞察力；在使用对军宝具或应对对军宝具时提供加成。`,
            // C 级
            `能够进行消耗战，并在进攻和防守中领导军队。`,
            // D 级
            `能够动员军队并以高于平均水平的程度领导它们作战。`,
            // E 级
            `具备战略的理论知识，但缺乏实际应用经验；相当于纸上谈兵的将领水平。`
       ]
    },
    'knight-tactics': {
        label: '骑士的武略',
        description: `即使对手在实力上超过自己，也能在战斗中把握战斗节奏、诱导对手犯错并加以利用的方法论。`,
        ranks: [
            // A 级
            `只要对手在场，就会在潜意识中犯下策略上的的错误。`,
            // B 级
            `只要进行简单的对话，就能让对手在下一次行动中检定失败。`,
            // C 级
            `在与实力强于自己的对手直接接触时，能对其参数检定施加惩罚。`,
            // D 级
            `只要自己遵守骑士道和规则，就能强迫实力较弱的对手也遵守它们。`,
            // E 级
            `能够察觉对手犯错的时机，并抓住稍纵即逝的取胜机会。`
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
        description: `对艺术作品、美术品的执着心，无论是何种形式的作品，总是能看穿其真正的价值。`,
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
        description: `专门用于施加痛苦的专业知识，以及使用特定工具的能力。`,
        ranks: [
            // A 级
            `以具有特定特征的敌人（性别、职阶或者其他特性）为目标时，力量获得 ++ 补正。`,
            // B 级
            `强烈的施虐倾向，能够在造成暴击时回复自身的生命值。`,
            // C 级
            `敌人在受到刑具造成的每次伤害后，都会持续受到伤害。在与受伤的对手战斗时力量还会获得加成。`,
            // D 级
            `每次命中都会对冲击受害者，造成精神干扰并影响其决策能力。`,
            // E 级
            `能将刑具发挥出和普通武器一样的效力。`
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
        description: `那些传说因不公正的名誉而被扭曲，死后被公众视为怪物的人的技能。这是一个诅咒技能，选择它会返还点数。`,
        ranks: [
            // A 级
            `传说中怪物的本能和意志强行渗透到身体中，必须不断地挣扎以保持原本的自我。`,
            // B 级
            `受到传说中怪物的特性渗透，导致严重的精神创伤，还会带来自我厌恶感。`,
            // C 级
            `传说赋予的特征被永久性地夸大和怪物化。使用其他保有技能变得更加困难。`,
            // D 级
            `影响外观，看起来就像是某个邪恶传说中的大反派。`,
            // E 级
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
        description: `扭曲的心态，以可怕的代价清除思想中的任何外来干扰。与狂化不兼容，后者会降低精神污染的等级。这是一个诅咒技能，选择它会返还点数。`,
        ranks: [
            // A 级
            `由于精神错乱，能够以高机率屏蔽精神干涉系的魔术。不具备同等级精神污染的人物将无法沟通。`,
            // B 级
            `未能被即时抵御的精神干涉也会随着时间的推移缓慢消除。不具备精神污染的人物将无法沟通。`,
            // C 级
            `中等程度的抵御精神干涉的能力。如果御主具有邪恶属性并对从者残酷行事，这一技能的等级会短暂提升（不能提升到 B 级以上）`,
            // D 级
            `所看到的现实变得扭曲，幻觉随机出现。未能即时抵御的精神干涉也会被削弱。`,
            // E 级
            `言语行为对普通人来说变得难以理解，有一定几率抵御精神干涉。`
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
        description: `身为君主所具有的能力，如果坚信自己能做到某件事，那么就会获得一项与之相关的技能，从而使得不可能变为可能。`,
        ranks: [
            // A 级
            `备选项增加到七项，甚至可以模仿魔力抵抗、神性等保有技能，唯独“双重召唤”和“结合”除外。`,
            // B 级
            `备选项增加到五项，等级限制提升到 B 级，并且可以选择七大职阶的职阶技能。`,
            // C 级
            `选择 C 级或以下的三项保有技能作为备选项，每次可以使用其中一项。魔眼、神性等特殊能力无法用这种方式取得。`,
            // D 级
            `在战斗中能随机取得一项 C 级或以下的技能，该技能会在战斗结束后消失。`,
            // E 级
            `能够自由地熟练使用任何与战斗无关的普通技能。`
       ]
    },
    'double-summon': {
        label: '双重召唤',
        description: `一种罕见的技能，从者同时属于两个职阶。两个职阶必须都是四骑兵职阶才能生效。`,
        ranks: [
            // A 级
            `能够完全适应第二职阶的能力，为参数购点时可以自由地选择两职阶之一作为基准。`,
            // B 级
            `能够在取得第二职阶的职阶技能时享受相应的购点折扣。`,
            // C 级
            `如果第二职阶是 Rider，那么可以享受 Rider 职阶的宝具购点折扣。`,
            // D 级
            `赋予第二职阶的基本能力，例如 Caster 使用魔术的能力。`,
            // E 级
            `技术上来说从属于第二职阶，在与针对特定职阶的能力互动时会被视为该职阶。`
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
