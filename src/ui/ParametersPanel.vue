<script setup lang="ts">
import type { ServantInstance } from '../logic/servant_instance'
import { ServantParameterNames } from '../logic/servant'
import { ParameterDescription } from '../logic/servant_description'

import RankModifier from '../component/RankModifier.vue'
import ParameterRankTooltip from './ParameterRankTooltip.vue'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()

</script>

<template>
    <h3>属性值</h3>
    <div class="form-grid">
        <template v-for="parameterName in ServantParameterNames">
            <b class="button-title">{{ ParameterDescription[parameterName].label }}</b>
            <div>
                <RankModifier :value="servantInstance.parameters[parameterName]" />
                <ParameterRankTooltip v-if="showDetails"
                                      :description-set="ParameterDescription[parameterName]"
                                      :rank="servantInstance.parameters[parameterName].rank" />
            </div>
        </template>
    </div>
</template>

<style scoped>
.button-title {
    margin-top: 0.25em;
}
</style>
