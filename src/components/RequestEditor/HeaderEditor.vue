<script setup lang="ts">

import { PropType } from 'vue';

const props = defineProps({
    headers: {
        type: Object as PropType<Record<string, string[]> | null>,
        default: null
    }
});

const emit = defineEmits(['add-header']);

</script>

<template>
    <div class="body_editor_container">
        <div v-for="(key) in Object.keys(props?.headers ?? {})" :key="key">

            <div v-for="(value, index) in props?.headers?.[key]" :key="index">
                {{ key }}: {{ value }}
            </div>

        </div>

        <button v-on:click="() => emit('add-header')">add header</button>
    </div>
</template>

<style scoped>
.body_editor_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-background);
    padding: 0.5rem;
    height: 100%;
    max-height: 100%;
    width: 100%;
}
</style>