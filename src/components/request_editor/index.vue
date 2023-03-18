<script setup lang="ts">

import url_editor from "@/components/request_editor/url_editor.vue";
import body_editor from "@/components/request_editor/body_editor.vue";
import headers_editor from "@/components/request_editor/header_editor.vue";
import params_editor from "@/components/request_editor/param_editor.vue";
import auth_editor from "@/components/request_editor/auth_editor.vue";

enum Active {
    body,
    headers,
    params,
    auth
}
let active = Active.body;

</script>

<template>
    <url_editor />

    <v-toolbar>
        <v-button>body</v-button>
        <v-button>headers</v-button>
        <v-button>params</v-button>
        <v-button>auth</v-button>
    </v-toolbar>

    <div v-if="active === Active.body">
        <body_editor />
    </div>

    <div v-if="active === Active.headers">
        <headers_editor />
    </div>

    <div v-if="active === Active.params">
        <params_editor />
    </div>

    <div v-if="active === Active.auth">
        <auth_editor />
    </div>
</template>
