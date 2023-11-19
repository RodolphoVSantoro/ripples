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
    sent request here
</template>