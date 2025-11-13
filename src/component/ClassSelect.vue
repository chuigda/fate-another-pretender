<script setup lang="ts">
import { ServantClasses, type ServantClass } from '../logic/servant/servant'
import { ServantClassDescription } from '..//logic/servant/servant_description';

const { optional } = defineProps<{ optional?: boolean }>()
const servantClass = defineModel<ServantClass>()
</script>

<template>
    <select v-model="servantClass">
        <option v-if="optional" :value="undefined">-- 无 --</option>
        <option v-for="clazz in ServantClasses" :value="clazz">
            {{ ServantClassDescription[clazz].label }}
        </option>
    </select>
</template>
