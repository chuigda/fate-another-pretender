<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'

import type { ServantInstance } from '../logic/servant/servant_instance'
import type { ServantPointBuyResult } from '../logic/servant/point_buy_calculate'
import { servantPointBuy } from '../logic/servant/point_buy_calculate'

const { servantInstance } = defineProps<{
    servantInstance: ServantInstance
}>()

const pointBuyResult: ComputedRef<string | ServantPointBuyResult> = computed(() => {
    try {
        return servantPointBuy(servantInstance)
    } catch (e) {
        console.error(e)
        return `计算错误: ${e}`
    }
})

const expanded = ref(false)

</script>

<template>
    <div class="side-panel" :class="{ expanded }">
        <div class="button small-button" @click="expanded = !expanded">
            {{ expanded ? '>' : '<' }}
        </div>
        <div class="side-panel-content">
            <h3>小计</h3>
            <div v-if="typeof pointBuyResult === 'string'">
                114
            </div>
            <div v-else>
                <textarea readonly :value="pointBuyResult.details.join('\n')" />
                合计: {{ pointBuyResult.cost }} 点
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-panel {
    position: fixed;
    right: calc(-300px + 1em);
    top: calc(50%);

    width: 300px;
    height: 400px;

    display: flex;
    align-items: center;

    transform: translate(0, -50%);
    transition: right 0.15s ease-in-out;
}

.side-panel.expanded {
    right: 0;
}

.small-button {
    padding: 0.1em;
    width: 1em;
    border: 1px solid var(--border-color);
    border-right: none;
    background-color: var(--body-background-color);
    color: var(--button-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.side-panel-content {
    flex: 1;
    height: 100%;

    border: 1px solid var(--border-color);
    background-color: var(--body-background-color);
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

.side-panel-content > div {
    flex: 1;

    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

.side-panel-content > div > textarea {
    flex: 1;
    font-size: 14px;
}

.right {
    margin-left: auto;
}
</style>
