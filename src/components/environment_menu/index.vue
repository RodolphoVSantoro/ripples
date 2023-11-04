<script setup lang="ts">
import RequestFile from "@/components/request_files/index.vue"
import EnvironmentVariablesEditor from "@/components/environment_variables_editor/index.vue"
import { ref } from "vue"

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

const classes = 'selector_button';
const show = true;

</script>

<template>
    <div class="menu_selector">
        <button class="selector_button" @click="setShownComponent(MenuComponents.request_file)">Requests</button>
        <button class="selector_button"
            @click="setShownComponent(MenuComponents.environment_variables_editor)">Variables</button>
    </div>

    <div class="menu_selected">
        <div v-show="isComponentVisible(MenuComponents.request_file)" class="menu_option">
            <request-file @open-file="(filePath: string) => $emit('open-file', filePath)" />
        </div>
        <div v-show="isComponentVisible(MenuComponents.environment_variables_editor)" class="menu_option">
            <environment-variables-editor />
        </div>
    </div>
</template>
<style scoped>
.menu_selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    height: 5%;
    width: 100%;
}

.selector_button {
    color: white;
    background-color: var(--color-primary);
    border-radius: 0.2rem;
    width: inherit;
    border-radius: 4px;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
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
</style>
