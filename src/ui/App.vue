<script setup lang="ts">
import RankModifier from '../component/RankModifier.vue'
import ClassSelect from '../component/ClassSelect.vue'
import MultilineText from '../component/MultilineText.vue'

import { ref } from 'vue'
import { deepCopy } from '../util'
import { DefaultServantInstance } from '../logic/servant_instance'
import { ParameterDescription, RankDescription, ServantClassDescription } from '../logic/servant_description'

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

            <b>简介</b>
            <textarea v-model="servantInstance.description" rows="8" placeholder="作为英灵的背景、故事和传说。从前有座山，山上有座庙……" />
        </div>
        <hr />
        <h3>属性值</h3>
        <RankModifier label="筋力" :value="servantInstance.parameters.strength" />
        <div v-if="showDetails" class="tooltip">{{ ParameterDescription.strength.description }} {{   }}</div>
        <RankModifier label="耐久" :value="servantInstance.parameters.endurance" />
        <RankModifier label="敏捷" :value="servantInstance.parameters.agility" />
        <RankModifier label="魔力" :value="servantInstance.parameters.magicalEnergy" />
        <RankModifier label="幸运" :value="servantInstance.parameters.luck" />
    </div>
</template>

<style>
.content {
    padding: 1em;
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
}

.form-grid > div {
    display: flex;
    flex-direction: column;
    row-gap: 0.25em;
}
</style>
