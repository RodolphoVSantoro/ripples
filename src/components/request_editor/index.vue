<script setup lang="ts">

import UrlEditor from "@/components/request_editor/url_editor.vue";
import BodyEditor from "@/components/request_editor/body_editor.vue";
import HeadersEditor from "@/components/request_editor/header_editor.vue";
import { PropType, Ref, ref, watch } from "vue";
import { StringRequest } from "@/scripts/files";

const props = defineProps({
    currentRequest: {
        type: Object as PropType<StringRequest | null>,
        default: null,
    },
});

const request: Ref<StringRequest> = ref({
    method: null,
    url: null,
    headers: {},
    body: undefined,
});

watch(() => props.currentRequest, (newRequest) => {
    if (newRequest !== null) {
        request.value = newRequest;
    }
}, { immediate: true });

enum Active {
    body,
    headers,
    params,
    auth
}
const active = ref(Active.body);
function setActive(newActive: Active) {
    active.value = newActive;
}


</script>

<template>
    <div class="url_editor_container">
        <url-editor v-bind:current-url="request?.url ?? ''" />
    </div>

    <div>
        {{ request?.method ?? '' }}
    </div>

    <div class="request_edition_selector">
        <button class="request_edition_selector_option" @click="setActive(Active.body)">body</button>
        <button class="request_edition_selector_option" @click="setActive(Active.headers)">headers</button>
    </div>

    <div class="request_editor_container">
        <div v-if="active === Active.body" class="body_editor">
            <body-editor v-bind:current-body="request?.body" />
        </div>

        <div v-else-if="active === Active.headers" class="body_editor">
            <headers-editor v-bind:headers="request?.headers" />
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