<script setup lang="ts">
import type { ServantInstance } from '../logic/servant_instance'

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
    <h3>职阶技能</h3>
    <div class="panel">
        <div v-for="classSkill in servantInstance.classSkills" class="skill">
        </div>
        <Row>
            <button>添加标准技能</button>
            <button>添加自定技能</button>
        </Row>
    </div>
</template>

<style scoped>
.skill {
    border: 1px solid var(--border-color);
    padding: 0.5em;
}
</style>
