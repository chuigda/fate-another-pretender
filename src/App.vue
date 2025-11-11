<script setup lang="ts">
import ToggleButtonGroup from './component/ToggleButtonGroup.vue'
import { ref } from 'vue'

const obj = ref({ value: 'a' })
</script>

<template>
    <div class="content">
        <ToggleButtonGroup :values="['a', 'b', 'c', 'd', 'e']"
                        :display="['A', 'B', 'C', 'D', 'E']"
                        v-model="obj.value"
        />
    </div>
</template>

<style>
.content {
    max-width: 800px;
}
</style>
