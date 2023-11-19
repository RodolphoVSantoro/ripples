<script setup lang="ts">

import { PropType } from 'vue';

import { RustResponse } from '@/scripts/requests';


const props = defineProps({
    response: {
        type: Object as PropType<RustResponse | undefined>,
        default: undefined,
    },
});

</script>

<template>
    <div v-for="(key) in Object.keys(props.response?.headers ?? {})" :key="key">
        {{ key }}: {{ props.response?.headers[key] }}
        <br>
    </div>
</template>