<script setup lang="ts">

    type Param = {
        key: string,
        value: string
    }
    const params: Param[] = []

    function addParam() {
        params.push({
            key: '',
            value: ''
        })
    }

</script>

<template>

    <v-button v-on:click="addParam">add param</v-button>
    
    <v-for v-for="(param, index) in params">

        <v-text-field
            label="key"
            outlined
            dense
            class="my-2"
            v-model="param.key"
        ></v-text-field>

        <v-text-field
            label="value"
            outlined
            dense
            class="my-2"
            v-model="param.value"
        ></v-text-field>

    </v-for>

</template>
