<script setup lang="ts">
import { computed } from 'vue'

import type { Rank } from '../logic/common'
import type { IParameterDescription } from '../logic/common_description'
import { Rank_EX } from '../logic/common'
import { describeRank } from '../logic/common_description'

const { descriptionSet, rank, showBase } = defineProps<{
    descriptionSet: IParameterDescription,
    rank: Rank,
    showBase?: boolean
}>()

const descriptionForThisRank = computed(() => {
    if (rank === Rank_EX) {
        return '规格外的能力，请自行设定。'
    } else {
        return descriptionSet.ranks[rank]
    }
})

</script>

<template>
    <div class="tooltip">
        <div v-if="showBase">{{ descriptionSet.description }}</div>
        <span v-if="showBase">{{ describeRank(rank)  }} 级: </span>
        {{ descriptionForThisRank }}
    </div>
</template>
