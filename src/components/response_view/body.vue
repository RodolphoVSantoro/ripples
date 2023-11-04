<script setup lang="ts">

const props = defineProps({
    response: {
        type: String,
        default: null,
    },
});

</script>

<template>
    <div class="response_body_container">
        {{ props.response ?? 'response body here' }}
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