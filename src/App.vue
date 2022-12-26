<script setup lang="ts">
import request_file from "@/components/request_files/index.vue";
import request_editor from "@/components/request_editor/index.vue";
import response_view from "@/components/response_view/index.vue";
import config_bar from "@/components/config_bar/index.vue";
</script>

<template>
  <v-app>
    <v-app-bar> <config_bar/> </v-app-bar>
    <v-navigation-drawer> <request_file/> </v-navigation-drawer>
    <v-content>
      <request_editor/>
    </v-content>
  </v-app>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
