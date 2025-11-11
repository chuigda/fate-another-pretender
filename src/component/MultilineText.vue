<script setup lang="ts">
import { computed } from 'vue'

const { value } = defineProps<{ value: string }>()

const blocks = computed(() => value.split('\n'))
</script>

<template>
    <div>
        <div v-for="(block, index) in blocks" :key="index">
            {{ block }}
        </div>
    </div>
</template>
