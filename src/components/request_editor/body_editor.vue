<script setup lang="ts">
import { PropType, Ref, ref, watch } from 'vue';
import JsonEditorVue from 'json-editor-vue';
import { JsonBody } from '@/scripts/files';

const props = defineProps({
    currentBody: {
        type: Object as PropType<string | undefined>,
        default: undefined,
    },
});

const jsonBody: Ref<JsonBody | undefined> = ref(undefined);

watch(() => props.currentBody, (newBody) => {
    if (newBody) {
        jsonBody.value = JSON.parse(newBody);
    }
    if (newBody === undefined) {
        jsonBody.value = undefined;
    }
}, { immediate: true });

enum BodyTypes {
    NO_BODY,
    JSON,
    XML,
    TEXT
}

let active = ref(BodyTypes.NO_BODY);
function setActive(newActive: BodyTypes) {
    active.value = newActive;
}

</script>

<template>
    <div class="body_editor_container">
        <div class="body_edition_selector">
            <button class="body_edition_selector_option" @click="setActive(BodyTypes.NO_BODY)">no body</button>
            <button class="body_edition_selector_option" @click="setActive(BodyTypes.JSON)">json</button>
            <button class="body_edition_selector_option" @click="setActive(BodyTypes.XML)">xml</button>
            <button class="body_edition_selector_option" @click="setActive(BodyTypes.TEXT)">text</button>
        </div>
        <div class="body_fields">
            <div v-show="active === BodyTypes.NO_BODY">
                <div class="no_body_message">
                    No body
                </div>
            </div>
            <div class="body_editor" v-show="active === BodyTypes.JSON">
                <JsonEditorVue class="body_json_editor" v-model="jsonBody" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.body_editor_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-background);
    padding: 0.5rem;
    height: 100%;
    max-height: 100%;
    width: 100%;
}

.body_edition_selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    height: 5%;
    width: 100%;
}

.body_edition_selector_option {
    color: white;
    background-color: var(--color-primary);
    border-radius: 0.2rem;
    width: inherit;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}

.body_fields {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: 100%;
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    margin-top: 1%;
    overflow-y: auto;
}

.body_editor {
    width: 100%;
    height: 100%;
    border: none;
}

.body_json_editor {
    width: 100%;
    height: 100%;
    border: none;
    background-color: var(--color-background);
    color: white;
    padding: 0.5rem;
    font-family: monospace;
    font-size: 1rem;
    resize: none;
}



.body_fields {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: 100%;
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    margin-top: 1%;
    overflow-y: auto;
}

.no_body_message {
    width: 96%;
    height: 98%;
    font-size: 1.5rem;
    margin-left: 4%;
    margin-top: 2%;
    color: var(--color-primary);
}
</style>