<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
    <div class="button" :class="{ toggled: model }"
         @click = "model = !model">
        <slot />
    </div>
</template>