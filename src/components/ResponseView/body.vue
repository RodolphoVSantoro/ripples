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
    <div class="response_body_container">
        {{ props.response?.body ?? 'response body here' }}
    </div>
</template>

<style scoped>
.response_body_container {
    max-height: 85dvh;
    width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
}
</style>