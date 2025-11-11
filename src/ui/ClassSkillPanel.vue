<script setup lang="ts">
import { inject, ref } from 'vue'
import type { ServantClassSkill, ServantInstance } from '../logic/servant_instance'
import { ClassSkillDescription } from '../logic/servant_description'

import Row from '../component/Row.vue'
import RankModifier from '../component/RankModifier.vue'
import ToggleButton from '../component/ToggleButton.vue'
import RankTooltip from './RankTooltip.vue'

import type { AskForConfirmation } from './App.vue'
import type { ClassSkillName } from '../logic/servant'
import { AskForConfirmationKey } from './App.vue'
import { Modifier_None, Rank_A, } from '../logic/servant'
import Dialog from '../component/Dialog.vue'

const { servantInstance, showDetails } = defineProps<{ servantInstance: ServantInstance, showDetails: boolean }>()

const askForConfirmation = inject(AskForConfirmationKey) as AskForConfirmation

const toggleCustomDescription = async (classSkill: ServantClassSkill) => {
    if (classSkill.description === undefined) {
        classSkill.description = ''
    } else {
        const confirmed = await askForConfirmation(
            '移除自定义描述',
            '确定要移除自定义描述并恢复为标准描述吗？'
        )

        if (confirmed) {
            delete classSkill.description
        }
    }
}

const toggleCustomDisplay = async (classSkill: ServantClassSkill) => {
    if (classSkill.customDisplay === undefined) {
        classSkill.customDisplay = {
            label: '',
            rank: Rank_A,
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

const showAddClassSkillDialog = ref(false)
const selectedClassSkill = ref<ClassSkillName>('magic-resistance')
const addClassSkill = () => {
    showAddClassSkillDialog.value = true
}

const addUniqueClassSkill = () => {
    servantInstance.uniqueClassSkills.push({
        rank: Rank_A,
        modifier: Modifier_None,
        customCost: 0,
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
    const uniqueClassSkill = servantInstance.uniqueClassSkills[index]!!
    const confirmed = await askForConfirmation(
        '删除自定义职阶技能',
        `确定要删除自定义职阶技能「${uniqueClassSkill.label}」吗？`
    )

    if (confirmed) {
        servantInstance.uniqueClassSkills.splice(index, 1)
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
                <ToggleButton :model-value="classSkill!!.description !== undefined"
                              @update:model-value="toggleCustomDescription(classSkill!!)">
                    自定描述
                </ToggleButton>
                <ToggleButton :model-value="classSkill!!.customDisplay !== undefined"
                              @update:model-value="toggleCustomDisplay(classSkill!!)">
                    自定显示
                </ToggleButton>

                <button class="right" @click="deleteClassSkill(classSkillName)">删除</button>
            </Row>
            <div class="sub-panel" v-if="classSkill!!.customDisplay">
                <b>自定义显示</b>
                <div v-if="showDetails" class="tooltip">
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
                <input type="number" v-model.number="uniqueClassSkill.customCost" class="short" min="0" />
                <RankModifier :value="uniqueClassSkill" />
                <button class="right" @click="deleteUniqueClassSkill(index)">删除</button>
            </Row>
            <textarea v-model="uniqueClassSkill.description" rows="3" placeholder="技能描述" />
        </div>

        <Row>
            <button @click="addClassSkill">添加标准技能</button>
            <button @click="addUniqueClassSkill">添加自定技能</button>
            <button>应用职阶基准</button>
            <button :disabled="servantInstance.secondClass === undefined">应用第二职阶</button>
        </Row>
    </div>

    <Dialog v-if="showAddClassSkillDialog">
        <h2>添加标准职阶技能</h2>
        <hr />
        <select>
            <option v-for="(classSkillDesc, classSkillName) in ClassSkillDescription"
                    :key="classSkillName"
                    :value="classSkillName">
                {{ classSkillDesc.label }}
            </option>
        </select>
        <div class="dialog-bottom">
            <Row style="flex-flow: row nowrap;">
                <button>添加</button>
                <button class="right" @click="showAddClassSkillDialog = false">取消</button>
            </Row>
        </div>
    </Dialog>
</template>

<style scoped>
.right {
    margin-left: auto;
}

.dialog-bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1em;
}
</style>
