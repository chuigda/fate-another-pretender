<script setup lang="ts">
import RankModifier from '../component/RankModifier.vue'
import ClassSelect from '../component/ClassSelect.vue'
import MultilineText from '../component/MultilineText.vue'

import { ref } from 'vue'
import { deepCopy } from '../util'
import { DefaultServantInstance } from '../logic/servant_instance'
import { ParameterDescription, rankDescription, RankDescription, ServantClassDescription } from '../logic/servant_description'
import RankTooltip from './ParameterRankTooltip.vue'

const showDetails = ref(true)
const servantInstance = ref(deepCopy(DefaultServantInstance))
</script>

<template>
    <div class="content">
        <h2>Fate/Another Pretender: Servant Character Card Builder</h2>
        <hr />
        <h3>基础信息</h3>
        <div class="form-grid">
            <b>真名</b>
            <input type="text" v-model="servantInstance.name" placeholder="最难的一步，取名……" />

            <b>职阶</b>
            <div>
                <ClassSelect v-model="servantInstance.class" />
                <MultilineText v-if="showDetails"
                               class="tooltip"
                               :value="ServantClassDescription[servantInstance.class].description" />
            </div>

            <b>第二职阶</b>
            <div>
                <ClassSelect v-model="servantInstance.secondClass" :optional="true"/>
                <div v-if="showDetails && servantInstance.secondClass !== undefined">
                    <MultilineText class="tooltip" :value="ServantClassDescription[servantInstance.secondClass]?.description || '无第二职阶' " />
                    <div class="tooltip"><b>注意:</b> 需要保有技能<b>双重召唤</b>才能让第二职阶真正意义上产生作用。</div>
                </div>
            </div>

            <b>背景故事</b>
            <textarea v-model="servantInstance.description" rows="8" placeholder="作为英灵的故事和传说。从前有座山，山上有座庙……" />
        </div>
        <hr />
        <h3>属性值</h3>
        <div class="form-grid form-grid-toggle-button-group">
            <b>筋力</b>
            <div>
                <RankModifier :value="servantInstance.parameters.strength" />
                <RankTooltip v-if="showDetails"
                            :description-set="ParameterDescription.strength"
                            :rank="servantInstance.parameters.strength.rank" />
            </div>
            <b>耐久</b>
            <div>
                <RankModifier :value="servantInstance.parameters.endurance" />
                <RankTooltip v-if="showDetails"
                            :description-set="ParameterDescription.endurance"
                            :rank="servantInstance.parameters.endurance.rank" />
            </div>
            <b>敏捷</b>
            <div>
                <RankModifier label="敏捷" :value="servantInstance.parameters.agility" />
                <RankTooltip v-if="showDetails"
                            :description-set="ParameterDescription.agility"
                            :rank="servantInstance.parameters.agility.rank" />
            </div>
            <b>魔力</b>
            <div>
                <RankModifier label="魔力" :value="servantInstance.parameters.magicalEnergy" />
                <RankTooltip v-if="showDetails"
                            :description-set="ParameterDescription.magicalEnergy"
                            :rank="servantInstance.parameters.magicalEnergy.rank" />
            </div>
            <b>幸运</b>
            <div>
                <RankModifier label="幸运" :value="servantInstance.parameters.luck" />
                <RankTooltip v-if="showDetails"
                            :description-set="ParameterDescription.luck"
                            :rank="servantInstance.parameters.luck.rank" />
            </div>
        </div>
        <hr />
    </div>
</template>

<style scoped>
.content {
    padding: 1em;
    padding-bottom: 4em;
    width: 800px;
    background-color: var(--body-background-color);

    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

.form-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 0.5em;
    column-gap: 1em;

    padding-left: 0.5em;
    padding-right: 0.5em;
}

.form-grid > div {
    display: flex;
    flex-direction: column;
    row-gap: 0.25em;
}

.form-grid-toggle-button-group > b {
    margin-top: 0.25em;
}
</style>
