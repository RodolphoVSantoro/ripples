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
    <url_editor />

    <div class="request_edition_selector">
        <button class="request_edition_selector_option" @click="setActive(Active.body)">body</button>
        <button class="request_edition_selector_option" @click="setActive(Active.auth)">auth</button>
        <button class="request_edition_selector_option" @click="setActive(Active.params)">params</button>
        <button class="request_edition_selector_option" @click="setActive(Active.headers)">headers</button>
    </div>

    <div v-if="active === Active.body">
        <body_editor />
    </div>

    <div v-if="active === Active.headers">
        <headers_editor />
    </div>

    <div v-if="active === Active.params">
        <params_editor />
    </div>

    <div v-if="active === Active.auth">
        <auth_editor />
    </div>
</template>
<style scoped>
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
    border-radius: 4px;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>