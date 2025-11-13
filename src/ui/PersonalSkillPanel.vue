<script setup lang="ts">
import type { ServantInstance, ServantStandardPersonalSkill } from '../logic/servant/servant_instance'
import { computed, inject, ref } from 'vue'
import { Modifier_None, Rank_B, } from '../logic/servant/servant'
import { StandardPersonalSkillDescription } from '..//logic/servant/servant_description'

import Row from '../component/Row.vue'
import RankModifier from '../component/RankModifier.vue'
import ToggleButton from '../component/ToggleButton.vue'
import RankTooltip from './RankTooltip.vue'

import type { AskForConfirmation } from './App.vue'
import type { StandardPersonalSkillName } from '../logic/servant/servant'
import { AskForConfirmationKey } from './App.vue'
import Dialog from '../component/Dialog.vue'

const {
    servantInstance,
    showDetails
} = defineProps<{
    servantInstance: ServantInstance,
    showDetails: boolean
}>()

const askForConfirmation = inject(AskForConfirmationKey) as AskForConfirmation

const toggleCustomDisplay = async (standardPersonalSkill: ServantStandardPersonalSkill) => {
    if (standardPersonalSkill.customDisplay === undefined) {
        standardPersonalSkill.customDisplay = {
            label: '',
            rank: Rank_B,
            modifier: Modifier_None
        }
    } else {
        const confirmed = await askForConfirmation(
            '移除自定义显示',
            '确定要移除自定义显示并恢复为标准显示吗？'
        )

        if (confirmed) {
            delete standardPersonalSkill.customDisplay
        }
    }
}

const toggleCustomDescription = async (standardPersonalSkill: ServantStandardPersonalSkill) => {
    if (standardPersonalSkill.description === undefined) {
        standardPersonalSkill.description = ''
    } else {
        const confirmed = standardPersonalSkill.description === '' || await askForConfirmation(
            '移除自定义描述',
            '确定要移除自定义描述并恢复为标准描述吗？'
        )

        if (confirmed) {
            delete standardPersonalSkill.description
        }
    }
}

const showAddPersonalSkillDialog = ref(false)
const selectedPersonalSkill = ref<StandardPersonalSkillName>('mana-burst')
const selectedPersonalSkillAlreadyExists = computed(
    () => servantInstance.standardPersonalSkills[selectedPersonalSkill.value] !== undefined
)

const addPersonalSkill = () => {
    showAddPersonalSkillDialog.value = true
}

const doAddPersonalSkill = () => {
    servantInstance.standardPersonalSkills[selectedPersonalSkill.value] = {
        rank: Rank_B,
        modifier: Modifier_None,
    }
    showAddPersonalSkillDialog.value = false
}

const addUniquePersonalSkill = () => {
    servantInstance.uniquePersonalSkills.push({
        rank: Rank_B,
        modifier: Modifier_None,
        label: '',
        description: '',
        customCost: -50
    })
}

const deletePersonalSkill = async (skillName: StandardPersonalSkillName) => {
    const confirmed = await askForConfirmation(
        '删除保有技能',
        `确定要删除保有技能「${StandardPersonalSkillDescription[skillName].label}」吗？`
    )

    if (confirmed) {
        delete servantInstance.standardPersonalSkills[skillName]
    }
}

const deleteUniquePersonalSkill = async (index: number) => {
    const uniquePersonalSkill = servantInstance.uniquePersonalSkills[index]
    if (uniquePersonalSkill === undefined) {
        return
    }

    const confirmed = await askForConfirmation(
        '删除保有技能',
        `确定要删除保有技能「${uniquePersonalSkill.label}」吗？`
    )

    if (confirmed) {
        servantInstance.uniquePersonalSkills.splice(index, 1)
    }
}
</script>

<template>
    <h3>保有技能</h3>
    <div class="panel">
        <div v-for="(personalSkill, personalSkillName) in servantInstance.standardPersonalSkills" class="sub-panel">
            <Row>
                <b>{{ StandardPersonalSkillDescription[personalSkillName].label }}</b>
                <RankModifier :value="personalSkill!!" />
                <ToggleButton :model-value="personalSkill!!.customDisplay !== undefined"
                              @update:model-value="toggleCustomDisplay(personalSkill!!)">
                    自定显示
                </ToggleButton>
                <ToggleButton :model-value="personalSkill!!.description !== undefined"
                              @update:model-value="toggleCustomDescription(personalSkill!!)">
                    自定描述
                </ToggleButton>

                <button class="right" @click="deletePersonalSkill(personalSkillName)">删除</button>
            </Row>
            <div class="sub-panel" v-if="personalSkill!!.customDisplay">
                <b>自定义显示</b>
                <div v-show="showDetails" class="tooltip">
                    启用自定义显示时，点数计算使用实际上的职阶技能和等级，但最终角色卡上展示为自定义的技能名称和等级。
                </div>
                <Row>
                    <input v-model="personalSkill!!.customDisplay.label" placeholder="自定义技能名称" />
                    <RankModifier :value="personalSkill!!.customDisplay" />
                </Row>
            </div>

            <RankTooltip v-if="personalSkill!!.description === undefined"
                         :description-set="StandardPersonalSkillDescription[personalSkillName]"
                         :rank="personalSkill!!.rank"
                         :show-base="true"
            />
            <textarea v-else v-model="personalSkill!!.description" rows="3" placeholder="自定义技能描述" />
        </div>

        <div v-for="(uniquePersonalSkill, index) in servantInstance.uniquePersonalSkills" class="sub-panel">
            <Row>
                <input v-model="uniquePersonalSkill.label" placeholder="技能名称" />
                <input type="number"
                       v-model.number="uniquePersonalSkill.customCost"
                       class="short"
                       min="-9999"
                       max="9999"
                       placeholder="技能开销"
                />
                <RankModifier :value="uniquePersonalSkill" />
                <button class="right" @click="deleteUniquePersonalSkill(index)">删除</button>
            </Row>
            <textarea v-model="uniquePersonalSkill.description" rows="3" placeholder="技能描述" />
        </div>

        <Row>
            <button @click="addPersonalSkill">添加标准技能</button>
            <button @click="addUniquePersonalSkill">添加自定技能</button>
        </Row>
    </div>

    <Dialog v-show="showAddPersonalSkillDialog">
        <h2>添加标准职阶技能</h2>
        <hr />
        <select v-model="selectedPersonalSkill">
            <option v-for="(personalSkillDesc, personalSkillName) in StandardPersonalSkillDescription"
                    :key="personalSkillName"
                    :value="personalSkillName">
                {{ personalSkillDesc.label }}
            </option>
        </select>
        <div class="tooltip hint" :class="{ 'red-tooltip': selectedPersonalSkillAlreadyExists }">
            <div v-if="selectedPersonalSkillAlreadyExists">
                该保有技能已存在
            </div>
            <div v-else>
                {{ StandardPersonalSkillDescription[selectedPersonalSkill].description }}
            </div>
        </div>
        <Row>
            <button :disabled="selectedPersonalSkillAlreadyExists"
                    @click="doAddPersonalSkill">
                添加
            </button>
            <button class="right" @click="showAddPersonalSkillDialog = false">取消</button>
        </Row>
    </Dialog>
</template>

<style scoped>
.right {
    margin-left: auto;
}

.hint {
    width: calc(20 * var(--base-font-size));
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}
</style>
