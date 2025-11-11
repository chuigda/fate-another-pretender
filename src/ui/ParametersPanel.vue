<script setup lang="ts">
import type { IServantClassData } from '../logic/servant'
import type { ServantInstance } from '../logic/servant_instance'
import { Modifier_None, ServantClassData, ServantParameterNames } from '../logic/servant'
import { ParameterDescription } from '../logic/servant_description'

import ParameterRankTooltip from './ParameterRankTooltip.vue'
import RankModifier from '../component/RankModifier.vue'
import Row from '../component/Row.vue'
import { inject } from 'vue'

import { AskForConfirmationKey, type AskForConfirmation } from './App.vue'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()

const askForConfirmation = inject(AskForConfirmationKey) as AskForConfirmation

const askAndApplyClassData = async (title: string, message: string, classData: IServantClassData) => {
    if (classData.parameterBase === undefined) {
        return
    }

    const confirmed = await askForConfirmation(
        title,
        message
    )

    if (!confirmed) {
        return
    }

    for (const parameterName of ServantParameterNames) {
        const baseRank = classData.parameterBase[parameterName]
        servantInstance.parameters[parameterName].rank = baseRank
        servantInstance.parameters[parameterName].modifier = Modifier_None
    }
}

const applyClassBase = async () => {
    const classData = ServantClassData[servantInstance.class]
    if (classData.parameterBase === undefined) {
        return
    }

    await askAndApplyClassData(
        '应用职阶基准',
        '确定要将属性值设置为当前职阶的基准值吗？这将覆盖当前的属性值。',
        classData
    )
}

const applySecondClassBase = async () => {
    if (servantInstance.secondClass === undefined) {
        return
    }

    const classData = ServantClassData[servantInstance.secondClass]
    if (classData.parameterBase === undefined) {
        return
    }

    await askAndApplyClassData(
        '应用第二职阶基准',
        '确定要将属性值设置为第二职阶的基准值吗？这将覆盖当前的属性值。',
        classData
    )
}

</script>

<template>
    <h3>属性值</h3>
    <div class="panel">
        <div class="form-grid">
            <template v-for="parameterName in ServantParameterNames">
                <b class="button-title">{{ ParameterDescription[parameterName].label }}</b>
                <div>
                    <RankModifier :value="servantInstance.parameters[parameterName]" />
                    <ParameterRankTooltip v-if="showDetails"
                                        :description-set="ParameterDescription[parameterName]"
                                        :rank="servantInstance.parameters[parameterName].rank"
                    />
                </div>
            </template>
        </div>
        <Row>
            <button @click="applyClassBase">应用职阶基准</button>
            <button :disabled="servantInstance.secondClass === undefined"
                    @click="applySecondClassBase">
                应用第二职阶
            </button>
        </Row>
    </div>
</template>

<style scoped>
.button-title {
    margin-top: 0.25em;
}
</style>
