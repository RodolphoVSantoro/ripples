<script setup lang="ts">

    const items = ['no body', 'json', 'xml', 'text', 'binary', 'form-data'];
    let selected = 'no body';

</script>

<template>
    
    <v-select
        :items="items"
        item-text="text"
        item-value="value"
        label="Select"
        multiple
        chips
        small-chips
        hide-details
        outlined
        dense
        class="my-2"
        v-model="selected"
    ></v-select>
    
    <div v-if="selected !== 'no body'">
        <v-textarea
            label="Body"
            outlined
            dense
            class="my-2"
        ></v-textarea>
    </div>
</template>
