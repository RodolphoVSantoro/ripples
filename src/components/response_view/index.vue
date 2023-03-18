<script setup lang="ts">

import { ref } from "vue";
import response_url from "@/components/response_view/url.vue";
import response_body from "@/components/response_view/preview.vue";
import response_headers from "@/components/response_view/header.vue";
import response_request from "@/components/response_view/request.vue";

enum Active {
    body,
    headers,
    request
}
const active = ref(Active.body);
console.log(active.value)
</script>

<template>
    <response_url />

    <v-toolbar>
        <v-btn class="selector_button" @click="active = Active.body">body</v-btn>
        <v-btn class="selector_button" @click="active = Active.headers">headers</v-btn>
        <v-btn class="selector_button" @click="active = Active.request">request</v-btn>
    </v-toolbar>

    <div v-if="active === Active.body">
        <response_body />
    </div>

    <div v-if="active === Active.headers">
        <response_headers />
    </div>

    <div v-if="active === Active.request">
        <response_request />
    </div>
</template>
