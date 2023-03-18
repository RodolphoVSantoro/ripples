<script setup lang="ts">
import request_file from "@/components/request_files/index.vue"
import environment_variables_editor from "@/components/environment_variables_editor/index.vue"
import { computed, ref } from "vue"

type MenuComponents = 'request_file' | 'environment_variables_editor'
const componentVisibility = ref({ request_file: true, environment_variables_editor: false })

function showComponent(component: MenuComponents): boolean {
    return componentVisibility.value[component]
}

</script>

<template>
    <div class="menu_selector">
        <v-btn class="selector_button"
            @click="componentVisibility.request_file = true; componentVisibility.environment_variables_editor = false">Requests</v-btn>
        <v-btn class="selector_button"
            @click="componentVisibility.request_file = false; componentVisibility.environment_variables_editor = true">Variables</v-btn>
    </div>

    <div class="menu_selected">
        <div v-if="showComponent('request_file')" class="menu_option">
            <request_file />
        </div>
        <div v-if="showComponent('environment_variables_editor')" class="menu_option">
            <environment_variables_editor />
        </div>
    </div>
</template>
<style scoped>
.menu_selector {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
}

.menu_selected {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: inherit;
    overflow: auto;
}

.menu_option {
    position: relative;
    width: 21dvw;
    height: 100%;
}

.selector_button {
    flex: 1;
}

.v-btn--size-default {
    --v-btn-size: 0.875rem;
    --v-btn-height: 36px;
    font-size: 0.875rem;
    padding: 0 16px;
}
</style>