<script setup lang="ts">
import { watch } from 'vue';
import type { Rank, Modifier } from '../logic/servant'
import {
    Modifier_Minus,
    Modifier_None,
    Modifier_Plus,
    Modifier_Plus2,
    Modifier_Plus3,
    Rank_A,
    Rank_B,
    Rank_C,
    Rank_D,
    Rank_E,
    Rank_EX
} from '../logic/servant'
import ToggleButtonGroup from './ToggleButtonGroup.vue'
import Row from './Row.vue'

export interface RankModifier {
    rank: Rank,
    modifier: Modifier
}

const { label, value } = defineProps<{ label: string, value: RankModifier }>()
const ranks = [Rank_EX, Rank_A, Rank_B, Rank_C, Rank_D, Rank_E]
const modifiers = [Modifier_Minus, Modifier_Plus, Modifier_Plus2, Modifier_Plus3]

const rankLabels = ['EX', 'A', 'B', 'C', 'D', 'E']
const modifierLabels = ['-', '+', '2+', '3+']

watch(() => value.rank, newRank => {
    if (newRank === Rank_EX && value.modifier !== Modifier_None) {
        value.modifier = Modifier_None
    }
})
</script>

<template>
    <Row>
        <b>{{ label }}</b>
        <ToggleButtonGroup :values="ranks"
                           :display="rankLabels"
                           v-model="value.rank"
        />
        <ToggleButtonGroup v-show="value.rank !== Rank_EX"
                           :values="modifiers"
                           :default-value="Modifier_None"
                           :display="modifierLabels"
                           v-model="value.modifier"
        />
    </Row>
</template>

<style>
.rank-modifier {
    display: flex;
    column-gap: 1em;
    align-items: center;
}
</style>
