<script setup lang="ts">
import { ref } from 'vue';


    const items = ['No auth', 'Basic', 'Bearer'] as const;
    type AuthType = typeof items[number];
    const selected = ref('No auth' as AuthType);

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
