<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, ref } from 'vue'
import { deepCopy } from '../util'
import { DefaultServantInstance } from '../logic/servant_instance'

import BasicInfoPanel from './BasicInfoPanel.vue'
import ParametersPanel from './ParametersPanel.vue'
import ClassSkillPanel from './ClassSkillPanel.vue'
import PersonalSkillPanel from './PersonalSkillPanel.vue'
import Row from '../component/Row.vue'
import ToggleButton from '../component/ToggleButton.vue'
import Dialog from '../component/Dialog.vue'
import NoblePhantasm from './NoblePhantasm.vue'

const confirmDialogContent: Ref<{ title: string, message: string } | undefined> = ref(undefined)
const confirmResolve: Ref<((value: boolean) => void) | undefined> = ref(undefined)

const askForConfirmation = (title: string, message: string): Promise<boolean> => {
    confirmDialogContent.value = { title, message }
    return new Promise(resolve => confirmResolve.value = resolve)
}

provide(AskForConfirmationKey, askForConfirmation)

const showDetails = ref(true)
const servantInstance = ref(deepCopy(DefaultServantInstance))
</script>

<script lang="ts">
export const AskForConfirmationKey = 'askForConfirmation'
export type AskForConfirmation = (title: string, message: string) => Promise<boolean>
</script>

<template>
    <div class="content">
        <h2>Fate/Another Pretender: Servant Character Card Builder</h2>

        <Row>
            <ToggleButton v-model="showDetails">显示细节</ToggleButton>
        </Row>

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
    </div>
</template>
