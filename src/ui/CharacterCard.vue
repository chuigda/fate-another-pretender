<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { type Rank, type Modifier, type ClassSkillName, Rank_EX } from '../logic/servant'
import type { ServantInstance } from '../logic/servant_instance'
import { ClassSkillDescription, describeRankModifier, NoblePhantasmTypeDescription, ServantClassDescription, ServantUpkeepDescription, StandardPersonalSkillDescription } from '../logic/servant_description'
import MultilineText from '../component/MultilineText.vue';
import NoblePhantasm from './NoblePhantasm.vue';

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
    if (servantInstance.secondClass) {
        return `${ServantClassDescription[servantInstance.class].labelShort} / ${ServantClassDescription[servantInstance.secondClass].labelShort}`
    } else {
        return ServantClassDescription[servantInstance.class].labelShort
    }
})

interface DisplaySkill {
    label: string,
    rank: Rank,
    modifier: Modifier,
    description: string
}

const classSkillDisplay: ComputedRef<DisplaySkill[]> = computed(() => {
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

    return ret
})

const personalSkillDisplay: ComputedRef<DisplaySkill[]> = computed(() => {
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

    return ret
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
    return ret
})

</script>

<template>
    <div class="content">
        <div class="content-inner">
            <h3>基本信息</h3>
            <div class="grid">
                <div><b>真名:</b> {{ servantInstance.name || '无名英灵' }}</div>
                <div><b>阵营:</b> {{ alignmentDescription }}</div>
                <div><b>职阶:</b> {{ classDescription }}</div>
                <div><b>维系成本:</b> {{ ServantUpkeepDescription[servantInstance.upkeep].label }}</div>
            </div>
            <div class="sub-panel alter-color">{{ servantInstance.description || '暂无背景故事。' }}</div>

            <hr />

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
                <b>{{ np.label }}({{ np.type }}, {{ describeRankModifier(np) }}): </b>
                {{ np.description }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    align-items: center;
}

.content-inner {
    border: 1px solid var(--border-color);
    padding: 1em;
    width: 600px;

    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.25em;
}

.grid > * {
    text-align: left;
}

.alter-color {
    background-color: var(--section-background-color);
}
</style>