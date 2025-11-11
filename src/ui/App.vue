<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, ref } from 'vue'
import { deepCopy } from '../util'
import { DefaultServantInstance } from '../logic/servant_instance'

import BasicInfoPanel from './BasicInfoPanel.vue'
import ParametersPanel from './ParametersPanel.vue'
import ClassSkillPanel from './ClassSkillPanel.vue'
import PersonalSkillPanel from './PersonalSkillPanel.vue'
import NoblePhantasm from './NoblePhantasm.vue'
import PointBuyCalculator from './PointBuyCalculator.vue'
import Dialog from '../component/Dialog.vue'
import Row from '../component/Row.vue'
import ToggleButton from '../component/ToggleButton.vue'
import CharacterCard from './CharacterCard.vue'

const confirmDialogContent: Ref<{ title: string, message: string } | undefined> = ref(undefined)
const confirmResolve: Ref<((value: boolean) => void) | undefined> = ref(undefined)

const askForConfirmation = (title: string, message: string): Promise<boolean> => {
    confirmDialogContent.value = { title, message }
    return new Promise(resolve => confirmResolve.value = resolve)
}

provide(AskForConfirmationKey, askForConfirmation)

const showDetails = ref(true)
const servantInstance = ref(deepCopy(DefaultServantInstance))

const saveToJSON = () => {
    const dataStr = JSON.stringify(servantInstance.value, null, 4)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${servantInstance.value.name || 'servant'}.json`
    a.click()

    URL.revokeObjectURL(url)
}

const loadFromJSON = async () => {
    const confirmed = await askForConfirmation(
        '加载 Servant',
        '确定要从文件加载 Servant 吗？这将覆盖当前的 Servant Instance。'
    )
    if (!confirmed) {
        return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = () => {
        if (input.files && input.files.length > 0) {
            const file = input.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.result) {
                    try {
                        const obj = JSON.parse(reader.result as string)
                        servantInstance.value = obj
                    } catch (e) {
                        askForConfirmation(
                            '加载失败',
                            '无法解析所选文件。请确保该文件是有效的 Servant Instance JSON 文件。'
                        )
                    }
                }
            }
            reader.readAsText(file as any)
        }
    }
    input.click()
}

const presentMode = ref(false)
</script>

<script lang="ts">
export const AskForConfirmationKey = 'askForConfirmation'
export type AskForConfirmation = (title: string, message: string) => Promise<boolean>
</script>

<template>
    <div class="content">
        <h2>Fate/Another Pretender: Servant Character Card Builder</h2>

        <Row>
            <button @click="loadFromJSON">读取文件</button>
            <button @click="saveToJSON">保存文件</button>
            <ToggleButton v-model="presentMode">展示模式</ToggleButton>
            <ToggleButton class="right" v-model="showDetails">显示细节</ToggleButton>
        </Row>

        <template v-if="!presentMode">
            <hr />
            <BasicInfoPanel :servant-instance="servantInstance" :show-details="showDetails" />

            <hr />
            <ParametersPanel :servant-instance="servantInstance" :show-details="showDetails" />

            <hr />
            <ClassSkillPanel :servant-instance="servantInstance" :show-details="showDetails" />

            <hr />
            <PersonalSkillPanel :servant-instance="servantInstance" :show-details="showDetails" />

            <hr />
            <NoblePhantasm :servant-instance="servantInstance" :show-details="showDetails" />
        </template>
    </div>
    <CharacterCard :servant-instance="servantInstance" v-if="presentMode" />

    <PointBuyCalculator :servant-instance="servantInstance" />
    <Dialog v-if="confirmDialogContent">
        <h2>{{ confirmDialogContent.title }}</h2>
        <hr />
        <div>{{ confirmDialogContent.message }}</div>
        <div style="display: flex; justify-content: center; margin-top: 1em">
            <Row>
                <button @click="confirmResolve && confirmResolve(true); (confirmDialogContent = undefined)">确认</button>
                <button @click="confirmResolve && confirmResolve(false); (confirmDialogContent = undefined)">取消</button>
            </Row>
        </div>
    </Dialog>
</template>

<style scoped>
.right {
    margin-left: auto;
}
</style>