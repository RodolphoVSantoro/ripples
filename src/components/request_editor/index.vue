<script setup lang="ts">

import url_editor from "@/components/request_editor/url_editor.vue";
import body_editor from "@/components/request_editor/body_editor.vue";
import headers_editor from "@/components/request_editor/header_editor.vue";
import params_editor from "@/components/request_editor/param_editor.vue";
import auth_editor from "@/components/request_editor/auth_editor.vue";
import { ref } from "vue";

enum Active {
    body,
    headers,
    params,
    auth
}
let active = ref(Active.body);
function setActive(newActive: Active) {
    active.value = newActive;
}


</script>

<template>
    <div class="url_editor_container">
        <url_editor />
    </div>

    <div class="request_edition_selector">
        <button class="request_edition_selector_option" @click="setActive(Active.body)">body</button>
        <button class="request_edition_selector_option" @click="setActive(Active.auth)">auth</button>
        <button class="request_edition_selector_option" @click="setActive(Active.params)">params</button>
        <button class="request_edition_selector_option" @click="setActive(Active.headers)">headers</button>
    </div>

    <div class="request_editor_container">
        <div v-if="active === Active.body" class="body_editor">
            <body_editor />
        </div>

        <div v-else-if="active === Active.headers" class="body_editor">
            <headers_editor />
        </div>

        <div v-else-if="active === Active.params" class="body_editor">
            <params_editor />
        </div>

        <div v-else="active === Active.auth" class="body_editor">
            <auth_editor />
        </div>
    </div>
</template>
<style scoped>
.url_editor_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-background);
    padding: 0.5rem;
    height: 12%;
    width: 100%;
    border-bottom: 4px solid black;
}

.request_edition_selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    height: 5%;
    width: 100%;
}

.request_edition_selector_option {
    color: white;
    background-color: var(--color-primary);
    border-radius: 0.2rem;
    width: inherit;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}

.request_editor_container {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: white;
    height: 95%;
    width: 100%;
}

.body_editor {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: white;
    height: 100%;
    width: 100%;
    border: 2px solid var(--color-primary);
}
</style>