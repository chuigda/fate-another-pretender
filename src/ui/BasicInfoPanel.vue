<script setup lang="ts">
import { watch } from 'vue'

import type { ServantInstance } from '../logic/servant/servant_instance'
import { ServantClassDescription, ServantUpkeepDescription } from '../logic/servant/servant_description'

import MultilineText from '../component/MultilineText.vue'
import ToggleButtonGroup from '../component/ToggleButtonGroup.vue'
import ToggleButton from '../component/ToggleButton.vue'
import Row from '../component/Row.vue'
import ClassSelect from './ClassSelect.vue'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()

const toggleCustomClassLabel = () => {
    if (servantInstance.customClassLabel === undefined) {
        servantInstance.customClassLabel = ''
    } else {
        delete servantInstance.customClassLabel
    }
}

const toggleCustomSecondClassLabel = () => {
    if (servantInstance.customSecondClassLabel === undefined) {
        servantInstance.customSecondClassLabel = ''
    } else {
        delete servantInstance.customSecondClassLabel
    }
}

watch(() => servantInstance.classSkills, (classSkills, prevClassSkills) => {
    const previousInsane = prevClassSkills['mad-enchantment'] !== undefined
    const currentlyInsane = classSkills['mad-enchantment'] !== undefined

    if (!previousInsane && currentlyInsane) {
        servantInstance.alignment[1] = 'insane'
    } else if (previousInsane && !currentlyInsane) {
        servantInstance.alignment[1] = 'neutral'
    }
})

</script>

<template>
    <h3>基础信息</h3>
    <div class="panel">
        <div class="form-grid">
            <b>真名</b>
            <input type="text" v-model="servantInstance.name" placeholder="最难的一步，取名……" />

            <b class="button-title">阵营</b>
            <div>
                <Row style="column-gap: 0;">
                    <ToggleButtonGroup :values="['lawful', 'neutral', 'chaotic']"
                                       :display="['秩序', '中立', '混沌']"
                                       v-model="servantInstance.alignment[0]"
                    />
                    ·
                    <ToggleButtonGroup v-if="servantInstance.alignment[1] !== 'insane'"
                                       :values="['good', 'neutral', 'evil']"
                                       :display="['善', '中立', '恶']"
                                       v-model="servantInstance.alignment[1]"
                    />
                    <div v-else>狂</div>
                </Row>
            </div>

            <b>职阶</b>
            <div>
                <Row>
                    <ClassSelect v-model="servantInstance.class" />
                    <ToggleButton :model-value="servantInstance.customClassLabel !== undefined"
                                  @click="toggleCustomClassLabel">
                        自定义
                    </ToggleButton>
                    <input v-if="servantInstance.customClassLabel !== undefined"
                           type="text"
                           v-model="servantInstance.customClassLabel"
                           placeholder="自定义职阶名称"
                    />
                </Row>
                <MultilineText v-show="showDetails" class="tooltip"
                               :value="ServantClassDescription[servantInstance.class].description"
                />
            </div>

            <b>第二职阶</b>
            <div>
                <Row>
                    <ClassSelect v-model="servantInstance.secondClass" :optional="true" />
                    <ToggleButton :model-value="servantInstance.customSecondClassLabel !== undefined"
                                  @click="toggleCustomSecondClassLabel">
                        自定义
                    </ToggleButton>
                    <input v-if="servantInstance.customSecondClassLabel !== undefined"
                           type="text"
                           v-model="servantInstance.customSecondClassLabel"
                           placeholder="自定义第二职阶名称"
                    />
                </Row>
                <div v-if="showDetails && servantInstance.secondClass !== undefined">
                    <MultilineText class="tooltip"
                                   :value="ServantClassDescription[servantInstance.secondClass].description" />
                    <div class="tooltip">
                        <b>注意:</b>
                        至少需要<b> C 级</b>的<b>双重召唤</b>才能让第二职阶真正意义上产生作用，且两个职阶必须都是四骑兵职阶 (Four Cavalry Classes，即 Rider / Caster / Asssassin / Berserker)。
                    </div>
                </div>
            </div>

            <b>维系成本</b>
            <div>
                <Row>
                    <ToggleButtonGroup :values="['free', 'low', 'medium', 'high', 'lethal']"
                                       :display="ServantUpkeepDescription"
                                       v-model="servantInstance.upkeep"
                    />
                </Row>
                <div v-show="showDetails" class="tooltip">
                    {{ ServantUpkeepDescription[servantInstance.upkeep].description }}
                </div>
            </div>

            <b>背景故事</b>
            <textarea v-model="servantInstance.description" rows="4" placeholder="作为英灵的故事和传说。从前有座山，山上有座庙……" />
        </div>
    </div>
</template>
