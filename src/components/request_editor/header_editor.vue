<script setup lang="ts">

    type Header = {
        key: string,
        value: string
    }
    const headers: Header[] = []

    function addHeader() {
        headers.push({
            key: '',
            value: ''
        })
    }

</script>

<template>

    <v-button v-on:click="addHeader">add header</v-button>
    
    <!-- Quando usar o v-for, precisa especificar uma "key" pro Vue conseguir lidar com a reatividade no caso de mudanças -->
    <v-for v-for="(header, index) in headers">

        <v-text-field
            label="key"
            outlined
            dense
            class="my-2"
            v-model="header.key"
        ></v-text-field>

        <v-text-field
            label="value"
            outlined
            dense
            class="my-2"
            v-model="header.value"
        ></v-text-field>

    </v-for>

</template>
