<script setup lang="ts" generic="T">
import { computed } from 'vue'

type DisplayObject = { [key: string]: any }

const {
    values,
    display,
    labelField: labelField0
} = defineProps<{
    values: T[],
    display: Record<string, string | DisplayObject> | (string | DisplayObject)[],
    labelField?: string
}>()

const labelField = labelField0 ?? 'label'

const labels = computed(() => {
    if (Array.isArray(display)) {
        return display.map(d => typeof d === 'string' ? d : d[labelField])
    } else {
        return values.map(v => {
            const d = display[v as string]!!
            return typeof d === 'string' ? d : d[labelField]
        })
    }
})

const model = defineModel<T>()
</script>

<template>
    <div class="toggle-button-group" :style="{ columnCount: values.length }">
        <div v-for="(value, index) in values"
             :class="{ selected: value === model }"
             @click="model = value">
            {{ labels[index] }}
        </div>
    </div>
</template>

<style>
.toggle-button-group {
    border: 1px solid var(--border-color);
    column-fill: balance;
    column-gap: 0;
}

.toggle-button-group > div {
    flex: 1;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    border-left: 1px solid var(--border-color);
    text-align: center;
    cursor: pointer;
}

.toggle-button-group > div.selected {
    background-color: var(--selected-background-color);
    color: var(--selected-text-color);
}
</style>
