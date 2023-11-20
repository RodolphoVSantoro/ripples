<script setup lang="ts">

import { PropType, computed, ref } from 'vue';

import { RustResponse } from '@/scripts/requests';


const props = defineProps({
    response: {
        type: Object as PropType<RustResponse | undefined>,
        default: undefined,
    },
});

type ResponseType = 'json' | 'xml' | 'html' | 'text';
const ContentTypes = ['application/json', 'application/xml', 'text/html'] as const;
type ContentType = typeof ContentTypes[number];

const responseType = computed((): ResponseType => {
    const contentTypeHeadersString = String(props.response?.headers?.['content-type']);
    const contentTypeHeaders = contentTypeHeadersString.split(';').map((s) => s.trim());

    const contentTypes = contentTypeHeaders.filter((header) => ContentTypes.includes(header as ContentType)) as ContentType[];
    const contentType = contentTypes[0] ?? undefined;
    if (!contentType) {
        return 'text';
    }

    const typeMap: Record<ContentType, ResponseType> = {
        'application/json': 'json',
        'application/xml': 'xml',
        'text/html': 'html',
    };
    return typeMap[contentType];
});

console.log(props.response?.body);

const responseBodyText = computed(() => {
    if (!props.response) {
        return '';
    }

    if (responseType.value === 'json') {
        return JSON.parse(props.response?.body ?? '');
    }

    return props.response?.body ?? '';
});

</script>

<template>
    <div v-show="responseType === 'text'" class="response_body_container">
        {{ responseBodyText }}
    </div>
    <div v-show="responseType === 'html'" class="response_body_container">
        <iframe :srcdoc="responseBodyText" class="response_body_inner"></iframe>
    </div>
    <div v-show="responseType === 'xml'" class="response_body_container">
        {{ responseBodyText }}
    </div>
    <div v-show="responseType === 'json'" class="response_body_container">
        <JsonEditorVue class="body_json_editor" :readOnly="true" v-model="responseBodyText" />
    </div>
</template>

<style scoped>
.response_body_container {
    max-height: 85dvh;
    min-height: 85dvh;
    width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
}

.response_body_inner {
    width: 100%;
    max-height: 85dvh;
    min-height: 85dvh;
    background-color: white;
}
</style>
