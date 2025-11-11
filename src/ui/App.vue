<script setup lang="ts">
import { ref } from 'vue'
import { deepCopy } from '../util'
import { DefaultServantInstance } from '../logic/servant_instance'

import BasicInfoPanel from './BasicInfoPanel.vue'
import ParametersPanel from './ParametersPanel.vue'

const showDetails = ref(true)
const servantInstance = ref(deepCopy(DefaultServantInstance))
</script>

<template>
    <div class="content">
        <h2>Fate/Another Pretender: Servant Character Card Builder</h2>

        <hr />
        <BasicInfoPanel :servant-instance="servantInstance" :show-details="showDetails" />

        <hr />
        <ParametersPanel :servant-instance="servantInstance" :show-details="showDetails" />

        <hr />
    </div>
</template>