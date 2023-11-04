<script setup lang="ts">
import { ref } from 'vue';


type Header = {
    key: string,
    value: string
}
const headers = ref([] as Header[])

function addHeader() {
    headers.value.push({
        key: '',
        value: ''
    })
}

</script>

<template>
    <v-button v-on:click="addHeader">add header</v-button>

    <v-for v-for="(header) in headers" :key="header">

        <v-text-field label="key" outlined dense class="my-2" v-model="header.key"></v-text-field>

        <v-text-field label="value" outlined dense class="my-2" v-model="header.value"></v-text-field>

    </v-for>
</template>
