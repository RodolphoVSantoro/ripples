<script setup lang="ts">

import { PropType, ref, computed } from 'vue';

import JsonEditorVue from 'json-editor-vue';

import { BodyType, JsonEditorContent } from '@/scripts/requestEditor.js';

const props = defineProps({
    bodyType: {
        type: String as PropType<BodyType>,
        default: undefined,
    },
    currentBody: {
        type: Object as PropType<string>,
        default: undefined,
    },
});

const formattedBody = computed(() => {
    if (!props.currentBody || !props.bodyType) {
        return undefined;
    }
    if (props.bodyType === 'json') {
        return JSON.parse(props.currentBody);
    }
    const textTypes = ['text', 'xml', 'html'];
    if (textTypes.includes(props.bodyType)) {
        return props.currentBody;
    }
});

function updateBody(content: JsonEditorContent) {
    emit('updateBody', content);
}

function updateBodyType(bodyType?: BodyType) {
    emit('changeBodyType', bodyType);
}

const emit = defineEmits(['updateBody', 'changeBodyType']);

</script>

<template>
    <div class="body_editor_container">
        <div class="body_edition_selector">
            <button class="body_edition_selector_option" @click="updateBodyType()">no body</button>
            <button class="body_edition_selector_option" @click="updateBodyType('json')">json</button>
            <button class="body_edition_selector_option" @click="updateBodyType('xml')">xml</button>
            <button class="body_edition_selector_option" @click="updateBodyType('text')">text</button>
        </div>
        <div class="body_fields">
            <div v-show="!props.bodyType" class="no_body_message">
                No body
            </div>
            <div class="body_editor" v-show="props?.bodyType === 'json'">
                <JsonEditorVue class="body_json_editor" v-model="formattedBody" :onChange="updateBody" />
            </div>
            <div class="body_editor" v-show="props?.bodyType !== 'json'">
                {{ formattedBody }}
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
    width: inherit;
    height: 80%;
    border-radius: 0.2rem;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 0px;
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

@media screen and (max-width: 1200px) and (orientation: landscape) {
    .body_edition_selector_option {
        font-size: 0.6rem;
        border-radius: 0.1rem;
        margin: 0.08rem;
    }
    .body_json_editor {
        font-size: 0.6rem;
    }
    .body_fields {
        margin-top: 0.5%;
    }
    .no_body_message {
        font-size: 1rem;
    }
}

@media screen and (max-width: 800px) and (orientation: landscape) {
    .body_edition_selector_option {
        border-radius: 0.05rem;
        margin: 0.04rem;
        font-size: 0.4rem;
    }
    .body_json_editor {
        font-size: 0.4rem;
    }
    .body_fields {
        margin-top: 0.5%;
    }

    .no_body_message {
        font-size: 0.6rem;
    }
}

@media screen and (orientation: portrait) {
    .body_edition_selector_option {
        font-size: 0.6rem;
    }
    .body_json_editor {
        font-size: 0.6rem;
    }
    .body_fields {
        margin-top: 0.5%;
    }
}
</style>
