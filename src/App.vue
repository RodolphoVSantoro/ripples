<script setup lang="ts">
import request_editor from "@/components/request_editor/index.vue";
import response_view from "@/components/response_view/index.vue";
import environment_menu from "@/components/environment_menu/index.vue";
import environment_selector from "@/components/environment_selector/index.vue";
</script>

<template>
  <div class="app_container">

    <div class="top_bar_container">
      <environment_selector />
    </div>
    <div class="middle_container">

      <div class="environment_menu_container">
        <environment_menu />
      </div>

      <div class="request_container">
        <request_editor />
      </div>

      <div class="response_container">
        <response_view />
      </div>

    </div>

  </div>
</template>


<style scoped>
.app_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top_bar_container {
  display: flex;
  background-color: var(--color-background);
  color: white;
  height: 5dvh;
  border-bottom: solid 1px black;
}

.middle_container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: #1e1e1e;
  color: white;
  height: 95dvh;
  min-width: 100dvh;
}

.environment_menu_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 21dvw;
  height: 100%;
  border: solid 2px black;
}

.request_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 60dvw;
  height: 100%;
  border: solid 2px black;
}

.response_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 18dvw;
  height: 100%;
  border: solid 2px black;
}
</style>