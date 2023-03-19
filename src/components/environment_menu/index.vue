<script setup lang="ts">
import request_file from "@/components/request_files/index.vue"
import environment_variables_editor from "@/components/environment_variables_editor/index.vue"
import { computed, ref } from "vue"

enum MenuComponents {
    request_file,
    environment_variables_editor
}

const componentVisibility = ref(MenuComponents.request_file)

function setShownComponent(component: MenuComponents) {
    componentVisibility.value = component
}

function isComponentVisible(component: MenuComponents) {
    return componentVisibility.value === component
}

</script>

<template>
    <div class="menu_selector">
        <v-btn class="selector_button" @click="setShownComponent(MenuComponents.request_file)">Requests</v-btn>
        <v-btn class="selector_button"
            @click="setShownComponent(MenuComponents.environment_variables_editor)">Variables</v-btn>
    </div>

    <div class="menu_selected">
        <div v-if="isComponentVisible(MenuComponents.request_file)" class="menu_option">
            <request_file />
        </div>
        <div v-if="isComponentVisible(MenuComponents.environment_variables_editor)" class="menu_option">
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
    overflow-y: auto;
}

.menu_option {
    position: relative;
    width: 100%;
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