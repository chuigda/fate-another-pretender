<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { Rank, Modifier, ClassSkillName } from '../logic/servant/servant'
import type { ServantInstance } from '../logic/servant/servant_instance'
import { Rank_EX } from '../logic/servant/servant'
import {
    ClassSkillDescription,
    describeRankModifier,
    NoblePhantasmTypeDescription,
    ServantClassDescription,
    ServantUpkeepDescription,
    StandardPersonalSkillDescription
} from '..//logic/servant/servant_description'
import MultilineText from '../component/MultilineText.vue'

const { servantInstance } = defineProps<{ servantInstance: ServantInstance }>()

const AlignmentDescriptionX = {
    'lawful': '秩序',
    'neutral': '中立',
    'chaotic': '混沌'
}
const AlignmentDescriptionY = {
    'good': '善',
    'neutral': '中立',
    'evil': '恶'
}

const alignmentDescription = computed(() => {
    if (servantInstance.class === 'berserker' || servantInstance.class === 'avenger') {
        return `${AlignmentDescriptionX[servantInstance.alignment[0]]} · 狂`
    } else if (servantInstance.alignment[0] === 'neutral' && servantInstance.alignment[1] === 'neutral') {
        return '中立'
    } else {
        return `${AlignmentDescriptionX[servantInstance.alignment[0]]} · ${AlignmentDescriptionY[servantInstance.alignment[1]]}`
    }
})

const classDescription = computed(() => {
    const firstClassLabel = servantInstance.customClassLabel ?? ServantClassDescription[servantInstance.class].labelShort

    if (servantInstance.secondClass) {
        const secondClassLabel = servantInstance.customSecondClassLabel ?? ServantClassDescription[servantInstance.secondClass].labelShort
        return `${firstClassLabel} / ${secondClassLabel}`
    } else {
        return firstClassLabel
    }
})

interface IDisplay {
    label: string,
    rank: Rank,
    modifier: Modifier,
    description: string
}

const sortFunction = (a: IDisplay, b: IDisplay): number => {
    if (a.rank !== b.rank) {
        return a.rank - b.rank
    } else {
        return b.modifier - a.modifier
    }
}

const classSkillDisplay: ComputedRef<IDisplay[]> = computed(() => {
    const ret = []
    for (const classSkillName of Object.keys(servantInstance.classSkills) as ClassSkillName[]) {
        const classSkill = servantInstance.classSkills[classSkillName]!!
        const classSkillDescription = ClassSkillDescription[classSkillName]

        let label = classSkillDescription.label
        let rank = classSkill.rank
        let modifier = classSkill.modifier
        let description = classSkill.description ??
            (rank == Rank_EX ? '错误 - 请为 EX 级技能提供描述。' : classSkillDescription.ranks[rank])

        if (classSkill.customDisplay) {
            if (classSkill.customDisplay.label) {
                label = classSkill.customDisplay.label
            }
            rank = classSkill.customDisplay.rank
            modifier = classSkill.customDisplay.modifier
        }

        ret.push({
            label,
            rank,
            modifier,
            description
        })
    }

    for (const uniqueClassSkill of servantInstance.uniqueClassSkills) {
        ret.push({
            label: uniqueClassSkill.label,
            rank: uniqueClassSkill.rank,
            modifier: uniqueClassSkill.modifier,
            description: uniqueClassSkill.description
        })
    }

    return ret.sort(sortFunction)
})

const personalSkillDisplay: ComputedRef<IDisplay[]> = computed(() => {
    const ret = []
    for (const personalSkillName of Object.keys(servantInstance.standardPersonalSkills) as (keyof typeof servantInstance.standardPersonalSkills)[]) {
        const personalSkill = servantInstance.standardPersonalSkills[personalSkillName]!!
        const personalSkillDescription = StandardPersonalSkillDescription[personalSkillName]

        let label = personalSkillDescription.label
        let rank = personalSkill.rank
        let modifier = personalSkill.modifier
        let description = personalSkill.description ??
            (rank == Rank_EX ? '错误 - 请为 EX 级技能提供描述。' : personalSkillDescription.ranks[rank])

        if (personalSkill.customDisplay) {
            if (personalSkill.customDisplay.label) {
                label = personalSkill.customDisplay.label
            }
            rank = personalSkill.customDisplay.rank
            modifier = personalSkill.customDisplay.modifier
        }

        ret.push({
            label,
            rank,
            modifier,
            description
        })
    }

    for (const uniquePersonalSkill of servantInstance.uniquePersonalSkills) {
        ret.push({
            label: uniquePersonalSkill.label,
            rank: uniquePersonalSkill.rank,
            modifier: uniquePersonalSkill.modifier,
            description: uniquePersonalSkill.description
        })
    }

    return ret.sort(sortFunction)
})

interface DisplayNP {
    label: string,
    type: string,
    rank: Rank,
    modifier: Modifier,
    description: string
}

const npDisplay: ComputedRef<DisplayNP[]> = computed(() => {
    const ret = []
    for (const np of servantInstance.noblePhantasms) {
        ret.push({
            label: np.label,
            type: np.customType ?? NoblePhantasmTypeDescription[np.type].label,
            rank: np.rank,
            modifier: np.modifier,
            description: np.description
        })
    }

    return ret.sort(sortFunction)
})

const npLevelDisplay = computed(() => {
    if (npDisplay.value.length === 0) {
        return '-'
    } else {
        return describeRankModifier(npDisplay.value[0]!!)
    }
})

const copyMarkdown = () => {
    let md = `## 基础信息\n`

    md += `- 真名: ${servantInstance.name || '无名英灵'}\n`
    md += `- 阵营: ${alignmentDescription.value}\n`
    md += `- 职阶: ${classDescription.value}\n`
    md += `- 维系成本: ${ServantUpkeepDescription[servantInstance.upkeep].label}\n`
    md += `- 面板: 筋力${describeRankModifier(servantInstance.parameters.strength)} ` +
          `耐久${describeRankModifier(servantInstance.parameters.endurance)} ` +
          `敏捷${describeRankModifier(servantInstance.parameters.agility)} ` +
          `魔力${describeRankModifier(servantInstance.parameters.magicalEnergy)} ` +
          `幸运${describeRankModifier(servantInstance.parameters.luck)} ` +
          `宝具${npLevelDisplay.value}\n`
    md += `\n`

    if (servantInstance.description.length !== 0) {
        md += `${servantInstance.description}\n`
        md += `\n`
    }

    md += `## 职阶技能\n`
    for (const classSkill of classSkillDisplay.value) {
        md += `- ${classSkill.label}(${describeRankModifier(classSkill)}): ${classSkill.description}  \n`
    }
    md += `\n`

    md += `## 保有技能\n`
    for (const personalSkill of personalSkillDisplay.value) {
        md += `- ${personalSkill.label}(${describeRankModifier(personalSkill)}): ${personalSkill.description}  \n`
    }
    md += `\n`

    md += `## 宝具\n`
    for (const np of npDisplay.value) {
        md += `- ${np.label}(${np.type}，${describeRankModifier(np)}): ${np.description}  \n`
    }
    md += `\n`

    navigator.clipboard.writeText(md)
}

</script>

<template>
    <div class="content">
        <div class="content-print">
            <div class="content-inner">
                <h3>基本信息</h3>
                <div class="grid">
                    <div><b>真名:</b> {{ servantInstance.name || '无名英灵' }}</div>
                    <div><b>阵营:</b> {{ alignmentDescription }}</div>
                    <div><b>职阶:</b> {{ classDescription }}</div>
                    <div><b>维系成本:</b> {{ ServantUpkeepDescription[servantInstance.upkeep].label }}</div>
                </div>

                <hr />

                <h3>面板</h3>
                <div class="grid3">
                    <div><b>筋力:</b> {{ describeRankModifier(servantInstance.parameters.strength) }}</div>
                    <div><b>耐久:</b> {{ describeRankModifier(servantInstance.parameters.endurance) }}</div>
                    <div><b>敏捷:</b> {{ describeRankModifier(servantInstance.parameters.agility) }}</div>
                    <div><b>魔力:</b> {{ describeRankModifier(servantInstance.parameters.magicalEnergy) }}</div>
                    <div><b>幸运:</b> {{ describeRankModifier(servantInstance.parameters.luck) }}</div>
                    <div>
                        <b>宝具:</b>
                        {{ npLevelDisplay }}
                    </div>
                </div>

                <hr />

                <template v-if="servantInstance.description.length > 0">
                    <h3>背景故事</h3>
                    <MultilineText :value="servantInstance.description" />
                    <hr />
                </template>

                <h3>职阶技能</h3>
                <div v-for="classSkill in classSkillDisplay">
                    <b>{{ classSkill.label }}({{ describeRankModifier(classSkill) }}): </b>
                    {{ classSkill.description }}
                </div>
                <hr />

                <h3>保有技能</h3>
                <div v-for="personalSkill in personalSkillDisplay">
                    <b>{{ personalSkill.label }}({{ describeRankModifier(personalSkill) }}): </b>
                    {{ personalSkill.description }}
                </div>

                <hr />

                <h3>宝具</h3>
                <div v-for="np in npDisplay">
                    <b>{{ np.label }}({{ np.type }}，{{ describeRankModifier(np) }}): </b>
                    {{ np.description }}
                </div>

                <button class="copy-button" @click="copyMarkdown">📋︎</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    align-items: center;
}

.content-inner {
    position: relative;

    border: 1px solid var(--border-color);
    padding: 1em;
    margin: 1em;
    width: 600px;

    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

.grid {
    width: 450px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.25em;
}

.grid3 {
    width: 450px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 0.25em;
}

.copy-button {
    position: absolute;
    top: 1em;
    right: 1em;

    z-index: 1;
}

.alter-color {
    background-color: var(--section-background-color);
}
</style>