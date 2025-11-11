<script setup lang="ts">
import type { ServantInstance } from '../logic/servant_instance'
import { ServantClassDescription, ServantUpkeepDescription } from '../logic/servant_description'

import ClassSelect from '../component/ClassSelect.vue'
import MultilineText from '../component/MultilineText.vue'
import ToggleButtonGroup from '../component/ToggleButtonGroup.vue'
import Row from '../component/Row.vue'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()
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
                    <ToggleButtonGroup :values="['lawful', 'neutral', 'chaotic']" :display="['秩序', '中立', '混沌']"
                        v-model="servantInstance.alignment[0]" />
                    ·
                    <ToggleButtonGroup :values="['good', 'neutral', 'evil']" :display="['善', '中立', '恶']"
                        v-model="servantInstance.alignment[1]" />
                </Row>
            </div>

            <b>职阶</b>
            <div>
                <ClassSelect v-model="servantInstance.class" />
                <MultilineText v-if="showDetails" class="tooltip"
                    :value="ServantClassDescription[servantInstance.class].description" />
            </div>

            <b>第二职阶</b>
            <div>
                <ClassSelect v-model="servantInstance.secondClass" :optional="true" />
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
                                       :display="['无', '低', '中', '高', '致命']"
                                       v-model="servantInstance.upkeep"
                    />
                </Row>
                <div v-if="showDetails" class="tooltip">
                    {{ ServantUpkeepDescription[servantInstance.upkeep].description }}
                </div>
            </div>

            <b>背景故事</b>
            <textarea v-model="servantInstance.description" rows="8" placeholder="作为英灵的故事和传说。从前有座山，山上有座庙……" />
        </div>
    </div>
</template>
