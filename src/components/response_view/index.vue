<script setup lang="ts">

import { ref } from "vue";
import ResponseUrl from "@/components/response_view/url.vue";
import ResponseBody from "@/components/response_view/body.vue";
import ResponseHeaders from "@/components/response_view/header.vue";
import ResponseRequest from "@/components/response_view/request.vue";

enum Active {
    body,
    headers,
    request
}
const active = ref(Active.body);
function setActive(newActive: Active) {
    active.value = newActive;
}

const props = defineProps({
    response: {
        type: String,
        default: undefined,
    },
});

</script>

<template>
    <response-url />

    <div class="response_view_selector">
        <button class="response_view_selector_option" @click="setActive(Active.body)">body</button>
        <button class="response_view_selector_option" @click="setActive(Active.headers)">headers</button>
        <button class="response_view_selector_option" @click="setActive(Active.request)">request</button>
    </div>

    <div v-if="active === Active.body">
        <response-body
            v-bind:response="props.response"
        />
    </div>

    <div v-if="active === Active.headers">
        <response-headers />
    </div>

    <div v-if="active === Active.request">
        <response-request />
    </div>
</template>

<style scoped>
.response_view_selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    height: 5%;
    width: 100%;
}

.response_view_selector_option {
    color: white;
    background-color: var(--color-primary);
    border-radius: 0.2rem;
    width: inherit;
    border-radius: 4px;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>