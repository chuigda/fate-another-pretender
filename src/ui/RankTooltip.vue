<script setup lang="ts">
import { computed } from 'vue';
import { Rank_EX, type Rank } from '../logic/servant/servant'
import { describeRank, type IParameterDescription } from '../logic/servant/servant_description'

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
