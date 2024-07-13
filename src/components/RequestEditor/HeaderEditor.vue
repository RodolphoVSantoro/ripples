<script setup lang="ts">
import trashIcon from '@/assets/icons/trashbin.svg';
import enabledIcon from '@/assets/icons/checkbox-enabled.svg';
// import disabledIcon from '@/assets/icons/checkbox-disabled.svg';

import { PropType, ref } from 'vue';

const props = defineProps({
    headers: {
        type: Object as PropType<Record<string, string[]> | null>,
        default: null
    }
});

const emit = defineEmits(['add-header', 'delete-header']);

function addHeader() {
    emit('add-header');
}

function deleteHeader(key: string, index: number) {
    emit('delete-header', key, index);
}

</script>

<template>
    <div class="body_editor_container">
        <div v-for="(key) in Object.keys(props?.headers ?? {})" :key="key" class="header_rows">

            <div v-for="(value, index) in props?.headers?.[key]" :key="index" class="header_row">
                <v-text-field :model-value="value" :placeholder="'header'" outlined dense class="header_text_field" />
                <v-text-field :model-value="key" :placeholder="'key'" outlined dense class="header_text_field" />
                <v-btn icon class="header_button">
                    <img :src="enabledIcon" class="header_button_icon" alt=""/>
                </v-btn>
                <v-btn icon class="header_button" @click="deleteHeader(key, index)">
                    <img :src="trashIcon" class="header_button_icon" alt="" />
                </v-btn>
            </div>

        </div>

        <v-btn @click="addHeader" class="header_button">add header</v-btn>
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

.header_rows {
    width: 100%;
}

.header_button_icon {
    width: 60%;
    height: 60%;
}

.header_row {
    width: 100%;
    display: flex;
}

.header_button {
    background-color: var(--color-primary);
    color: white;
}
</style>