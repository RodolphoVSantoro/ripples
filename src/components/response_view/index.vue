<script setup lang="ts">

    import response_url from "@/components/response_view/url.vue";
    import response_body from "@/components/response_view/preview.vue";
    import response_headers from "@/components/response_view/header.vue";
    import response_request from "@/components/response_view/request.vue";

    enum Active {
        body,
        headers,
        request
    }
    let active = Active.body;

</script>

<template>

    <response_url/>

    <v-toolbar>
        <v-button>body</v-button>
        <v-button>headers</v-button>
        <v-button>request</v-button>
    </v-toolbar>

    <div v-if="active === Active.body">
        <response_body/>
    </div>

    <div v-if="active === Active.headers">
        <response_headers/>
    </div>

    <div v-if="active === Active.request">
        <response_request/>
    </div>

</template>
