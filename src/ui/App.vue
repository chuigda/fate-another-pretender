<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, ref } from 'vue'
import { deepCopy } from '../util'

import type { ServantClass } from '../logic/servant/servant'
import { ServantClassData, ServantClasses } from '../logic/servant/servant'

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
import { ClassSkillDescription, ServantClassDescription } from '../logic/servant/servant_description'
import { ServantTemplates } from '../logic/servant/servant_template'

const confirmDialogContent: Ref<{ title: string, message: string } | undefined> = ref(undefined)
const confirmResolve: Ref<((value: boolean) => void) | undefined> = ref(undefined)

const askForConfirmation = (title: string, message: string): Promise<boolean> => {
    confirmDialogContent.value = { title, message }
    return new Promise(resolve => confirmResolve.value = resolve)
}

provide(AskForConfirmationKey, askForConfirmation)

const showDetails = ref(true)
const servantInstance = ref(deepCopy(ServantTemplates.saber))

const newServantClass = ref<ServantClass | undefined>(undefined)

const newServantInstance = async () => {
    const confirmed = await askForConfirmation(
        '新建档案',
        '确定要新建 Servant 档案吗？这将覆盖当前的 Servant。'
    )
    if (!confirmed) {
        return
    }

    newServantClass.value = 'saber'
}

const createServantInstance = () => {
    if (newServantClass.value === undefined) {
        return
    }

    servantInstance.value = deepCopy(ServantTemplates[newServantClass.value])
    newServantClass.value = undefined
}

const cancelCreateServantInstance = () => {
    newServantClass.value = undefined
}

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
        '确定要从文件加载 Servant 吗？这将覆盖当前的 Servant。'
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
            <button @click="newServantInstance">新建档案</button>
            <button @click="loadFromJSON">读取文件</button>
            <button @click="saveToJSON">保存文件</button>
            <ToggleButton v-model="presentMode">展示模式</ToggleButton>
            <ToggleButton class="right" v-model="showDetails">显示细节</ToggleButton>
        </Row>

        <Dialog v-if="newServantClass !== undefined">
            <h3>新建档案</h3>
            <hr />
            <select>
                <option v-for="className in ServantClasses"
                        :value="className"
                        @click="newServantClass = className as ServantClass">
                    {{ ServantClassDescription[className].label }}
                </option>
            </select>
            <b class="tooltip hint">职阶技能: {{
                ServantClassData[newServantClass].classSkills
                    .map(skill => ClassSkillDescription[skill].label)
                    .join('，')
            }}</b>
            <Row style="justify-content: center">
                <button @click="createServantInstance">创建</button>
                <button @click="cancelCreateServantInstance">取消</button>
            </Row>
        </Dialog>

        <Row v-if="showDetails">
            <a href="https://imgchest.com/p/ej7m32dna4d" target="_blank">规则书</a>
            <a href="https://github.com/chuigda/fate-another-pretender" target="_blank">GitHub Repository</a>
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
        <h3>{{ confirmDialogContent.title }}</h3>
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

.hint {
    display: block;
    width: calc(20 * var(--base-font-size));
    padding-top: 0.25em;
    padding-bottom: 0.25em;
}
</style>