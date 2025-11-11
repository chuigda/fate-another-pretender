<script setup lang="ts">
import { computed } from 'vue';
import { Rank_EX, type Rank } from '../logic/servant'
import type { IParameterDescription } from '../logic/servant_description'

const { descriptionSet, rank } = defineProps<{
    descriptionSet: IParameterDescription,
    rank: Rank
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
    <div class="tooltip"> {{ descriptionForThisRank }} </div>
</template>
