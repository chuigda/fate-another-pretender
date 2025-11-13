<script setup lang="ts">
import { inject } from 'vue'
import type { ServantInstance } from '../logic/servant/servant_instance'
import { NoblePhantasmTypeDescription } from '..//logic/servant/servant_description'

import type { AskForConfirmation } from './App.vue'
import { AskForConfirmationKey } from './App.vue'
import RankModifier from '../component/RankModifier.vue'
import Row from '../component/Row.vue'
import ToggleButtonGroup from '../component/ToggleButtonGroup.vue'
import ToggleButton from '../component/ToggleButton.vue'
import { AdditionalNoblePhantasmExtraCost, NoblePhantasmAbandonmentRebate } from '..//logic/servant/servant_point_buy'
import { Modifier_None, Rank_C } from '../logic/servant/servant'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()

const askForConfirmation = inject(AskForConfirmationKey) as AskForConfirmation

const toggleCustomType = async (np: ServantInstance['noblePhantasms'][0]) => {
    if (np.customType === undefined) {
        np.customType = ''
    } else {
        const confirmed = np.customType === '' || await askForConfirmation(
            '移除自定义类别描述',
            '确定要移除自定义类别描述并恢复为标准描述吗？'
        )

        if (confirmed) {
            delete np.customType
        }
    }
}

const removeNoblePhantasm = async (index: number) => {
    const confirmed = await askForConfirmation(
        '删除宝具',
        '确定要删除该宝具吗？此操作无法撤销。'
    )

    if (confirmed) {
        servantInstance.noblePhantasms.splice(index, 1)
    }
}

const addNoblePhantasm = () => {
    servantInstance.noblePhantasms.push({
        label: '',
        rank: Rank_C,
        modifier: Modifier_None,
        type: 'anti-unit',
        description: ''
    })
}

</script>

<template>
    <h3>宝具</h3>
    <div class="panel">
        <div v-for="(np, index) in servantInstance.noblePhantasms" class="sub-panel">
            <input v-model="np.label" placeholder="宝具名称" />
            <Row>
                <RankModifier :value="np" />
                <ToggleButtonGroup :values="['anti-unit', 'anti-army', 'anti-fortress', 'anti-world']"
                                   :display="NoblePhantasmTypeDescription"
                                   v-model="np.type"
                />
                <ToggleButton :model-value="np.customType !== undefined"
                              @update:model-value="toggleCustomType(np)">
                    自定义类别描述
                </ToggleButton>
                <input v-if="np.customType !== undefined"
                       v-model="np.customType"
                       placeholder="自定义类别描述"
                       class="short"
                />
                <button class="right" @click="removeNoblePhantasm(index)">删除</button>
            </Row>
            <textarea v-model="np.description" rows="4" placeholder="宝具描述" />
        </div>

        <div v-show="showDetails && servantInstance.noblePhantasms.length === 0" class="tooltip">
            如果一个英灵没有任何宝具，则返还 {{ NoblePhantasmAbandonmentRebate }} 点数。<i>没有宝具的英灵还算是英灵吗？你做出了一个父马可亲的决定。</i>
        </div>
        <div v-show="showDetails && servantInstance.noblePhantasms.length > 1" class="tooltip">
            拥有超过一个宝具时，从第二个宝具起，每个宝具需要额外支付 {{ AdditionalNoblePhantasmExtraCost }} 点。
        </div>

        <Row>
            <button @click="addNoblePhantasm">添加宝具</button>
        </Row>
    </div>
</template>

<style scoped>
.right {
    margin-left: auto;
}
</style>
