<script setup lang="ts">

    const items = ['No auth', 'Basic', 'Bearer'];

    // Pra isso aqui funcionar, deveria ser uma `ref()`
    // https://vuejs.org/api/reactivity-core.html
    const selected = ref('No auth');

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

    <div v-if="selected === 'Bearer'">
        <v-text-field
            label="token"
            outlined
            dense
            class="my-2"
        ></v-text-field>
    </div>

</template>