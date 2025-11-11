<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
    <div :class="model ? ['toggle-button', 'toggled'] : ['toggle-button']"
         @click = "model = !model">
        <slot />
    </div>
</template>

<style scoped>
.toggle-button {
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;

    border: 1px solid var(--border-color);
    background-color: var(--section-background-color);
    cursor: pointer;
}

.toggle-button.toggled {
    background-color: var(--selected-background-color);
    color: var(--selected-text-color);
}
</style>
