<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Modifier_None, Rank_B, ServantClassData, } from '../logic/servant'
import type { ServantClassSkill, ServantInstance } from '../logic/servant_instance'
import { ClassSkillDescription } from '../logic/servant_description'

import Row from '../component/Row.vue'
import RankModifier from '../component/RankModifier.vue'
import ToggleButton from '../component/ToggleButton.vue'
import RankTooltip from './RankTooltip.vue'

import type { AskForConfirmation } from './App.vue'
import type { ClassSkillName, IServantClassData } from '../logic/servant'
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

const toggleCustomDisplay = async (classSkill: ServantClassSkill) => {
    if (classSkill.customDisplay === undefined) {
        classSkill.customDisplay = {
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
            delete classSkill.customDisplay
        }
    }
}

const toggleCustomDescription = async (classSkill: ServantClassSkill) => {
    if (classSkill.description === undefined) {
        classSkill.description = ''
    } else {
        const confirmed = classSkill.description === '' || await askForConfirmation(
            '移除自定义描述',
            '确定要移除自定义描述并恢复为标准描述吗？'
        )

        if (confirmed) {
            delete classSkill.description
        }
    }
}

const showAddClassSkillDialog = ref(false)
const selectedClassSkill = ref<ClassSkillName>('magic-resistance')
const selectedClassSkillAlreadyExists = computed(
    () => servantInstance.classSkills[selectedClassSkill.value] !== undefined
)
const selectedClassSkillIsStandard = computed(
    () => ServantClassData[servantInstance.class].classSkills.includes(selectedClassSkill.value)
)
const selectedClassSkillIsSecondStandard = computed(
    () => servantInstance.secondClass !== undefined &&
        ServantClassData[servantInstance.secondClass].classSkills.includes(selectedClassSkill.value)
)

const addClassSkill = () => {
    showAddClassSkillDialog.value = true
}

const doAddClassSkill = () => {
    servantInstance.classSkills[selectedClassSkill.value] = {
        rank: Rank_B,
        modifier: Modifier_None
    }
    showAddClassSkillDialog.value = false
}

const addUniqueClassSkill = () => {
    servantInstance.uniqueClassSkills.push({
        rank: Rank_B,
        modifier: Modifier_None,
        customCost: -50,
        label: '',
        description: ''
    })
}

const deleteClassSkill = async (classSkillName: ClassSkillName) => {
    const confirmed = await askForConfirmation(
        '删除职阶技能',
        `确定要删除职阶技能「${ClassSkillDescription[classSkillName].label}」吗？`
    )

    if (confirmed) {
        delete servantInstance.classSkills[classSkillName]
    }
}

const deleteUniqueClassSkill = async (index: number) => {
    const uniqueClassSkill = servantInstance.uniqueClassSkills[index]
    if (uniqueClassSkill === undefined) {
        return
    }

    const confirmed = await askForConfirmation(
        '删除自定义职阶技能',
        `确定要删除自定义职阶技能「${uniqueClassSkill.label}」吗？`
    )

    if (confirmed) {
        servantInstance.uniqueClassSkills.splice(index, 1)
    }
}

const applyClassBase = async () => {
    await askAndApplyClassData(
        '应用职阶基准',
        '确定要采用当前职阶的标准职阶技能组吗？这将覆盖当前的职阶技能。',
        ServantClassData[servantInstance.class]
    )
}

const applySecondClassBase = async () => {
    if (servantInstance.secondClass === undefined) {
        return
    }

    await askAndApplyClassData(
        '应用第二职阶基准',
        '确定要采用第二职阶的标准职阶技能组吗？这将覆盖当前的职阶技能。',
        ServantClassData[servantInstance.secondClass]
    )
}

const askAndApplyClassData = async (
    title: string,
    message: string,
    classData: IServantClassData
) => {
    const confirmed = await askForConfirmation(
        title,
        message
    )

    if (!confirmed) {
        return
    }

    servantInstance.classSkills = {}
    for (const classSkillName of classData.classSkills) {
        servantInstance.classSkills[classSkillName] = {
            rank: Rank_B,
            modifier: Modifier_None
        }
    }
}
</script>

<template>
    <h3>职阶技能</h3>
    <div class="panel">
        <div v-for="(classSkill, classSkillName) in servantInstance.classSkills" class="sub-panel">
            <Row>
                <b>{{ ClassSkillDescription[classSkillName].label }}</b>
                <RankModifier :value="classSkill!!" />
                <ToggleButton :model-value="classSkill!!.customDisplay !== undefined"
                              @update:model-value="toggleCustomDisplay(classSkill!!)">
                    自定显示
                </ToggleButton>
                <ToggleButton :model-value="classSkill!!.description !== undefined"
                              @update:model-value="toggleCustomDescription(classSkill!!)">
                    自定描述
                </ToggleButton>

                <button class="right" @click="deleteClassSkill(classSkillName)">删除</button>
            </Row>
            <div class="sub-panel" v-if="classSkill!!.customDisplay">
                <b>自定义显示</b>
                <div v-show="showDetails" class="tooltip">
                    启用自定义显示时，点数计算使用实际上的职阶技能和等级，但最终角色卡上展示为自定义的技能名称和等级。
                </div>
                <Row>
                    <input v-model="classSkill!!.customDisplay.label" placeholder="自定义技能名称" />
                    <RankModifier :value="classSkill!!.customDisplay" />
                </Row>
            </div>

            <RankTooltip v-if="classSkill!!.description === undefined"
                         :description-set="ClassSkillDescription[classSkillName]"
                         :rank="classSkill!!.rank"
                         :show-base="true"
            />
            <textarea v-else v-model="classSkill!!.description" rows="3" placeholder="自定义技能描述" />
        </div>

        <div v-for="(uniqueClassSkill, index) in servantInstance.uniqueClassSkills" class="sub-panel">
            <Row>
                <input v-model="uniqueClassSkill.label" placeholder="技能名称" />
                <input type="number"
                       v-model.number="uniqueClassSkill.customCost"
                       class="short"
                       min="-9999"
                       max="9999"
                       placeholder="技能开销"
                />
                <RankModifier :value="uniqueClassSkill" />
                <button class="right" @click="deleteUniqueClassSkill(index)">删除</button>
            </Row>
            <textarea v-model="uniqueClassSkill.description" rows="3" placeholder="技能描述" />
        </div>

        <Row>
            <button @click="addClassSkill">添加标准技能</button>
            <button @click="addUniqueClassSkill">添加自定技能</button>
            <button @click="applyClassBase">应用职阶基准</button>
            <button :disabled="servantInstance.secondClass === undefined"
                    @click="applySecondClassBase">
                应用第二职阶
            </button>
        </Row>
    </div>

    <Dialog v-show="showAddClassSkillDialog">
        <h2>添加标准职阶技能</h2>
        <hr />
        <select v-model="selectedClassSkill">
            <option v-for="(classSkillDesc, classSkillName) in ClassSkillDescription"
                    :key="classSkillName"
                    :value="classSkillName">
                {{ classSkillDesc.label }}
            </option>
        </select>
        <div class="tooltip hint" :class="{ 'red-tooltip': selectedClassSkillAlreadyExists }">
            <div v-if="selectedClassSkillAlreadyExists">
                该职阶技能已存在
            </div>
            <div v-else>
                <div>{{ ClassSkillDescription[selectedClassSkill].description }}</div>
                <b v-if="selectedClassSkillIsStandard">
                    这是当前职阶的标配技能。
                </b>
                <b v-else-if="selectedClassSkillIsSecondStandard">
                    这是第二职阶的标配技能。
                </b>
            </div>
        </div>
        <Row>
            <button :disabled="selectedClassSkillAlreadyExists"
                    @click="doAddClassSkill">
                添加
            </button>
            <button class="right" @click="showAddClassSkillDialog = false">取消</button>
        </Row>
    </Dialog>
</template>

<style scoped>
.right {
    margin-left: auto;
}

.hint {
    width: calc(20 * var(--base-font-size));
    padding-top: 0.25em;
    padding-bottom: 0.25em;
}
</style>
