<script setup lang="ts">
// Convenção de nomenclatura: https://vuejs.org/style-guide/
import RequestFile from "@/components/request_files/index.vue"
import EnvironmentVariablesEditor from "@/components/environment_variables_editor/index.vue"
import { ref } from "vue"

enum MenuComponents {
    request_file,
    environment_variables_editor
}
/**
 * Se usasse o <component is>, vc teria um objeto mais ou menos assim pra controlar:
 * {
 *   "request_file": RequestFile,
 *   "environment_variables_editor": EnvironmentVariablesEditor
 * }
 */

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
        <!-- Aqui talvez caberia melhor um router: https://router.vuejs.org/ -->
        <!-- Ou então vc poderia usar o <component is="nome_do_componente" /> -->
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