<script setup lang="ts">

import { ref } from 'vue';

type Param = {
    key: string,
    value: string
}
const params = ref([] as Param[]);

function addParam() {
    params.value.push({
        key: '',
        value: ''
    })
}

</script>

<template>
    <v-button v-on:click="addParam">add param</v-button>

    <div v-for="(param, index) in params" :key="index">

        <v-text-field label="key" outlined dense class="my-2" v-model="param.key"></v-text-field>

        <v-text-field label="value" outlined dense class="my-2" v-model="param.value"></v-text-field>

    </div>
</template>
