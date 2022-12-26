<script setup lang="ts">
import request_file from "@/components/request_files/index.vue";
import request_editor from "@/components/request_editor/index.vue";
</script>

<template>
  <v-app>
    <request_file/>
    <v-main>
      <request_editor/>
    </v-main>
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
