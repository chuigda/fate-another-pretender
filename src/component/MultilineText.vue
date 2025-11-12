<script setup lang="ts">
import { computed } from 'vue'

const { value } = defineProps<{ value: string }>()

const blocks = computed(() => value.split('\n'))
</script>

<template>
    <div>
        <template v-for="(block, index) in blocks" :key="index">
            <div v-if="block.length !== 0">{{ block }}</div>
            <br v-else />
        </template>
    </div>
</template>
