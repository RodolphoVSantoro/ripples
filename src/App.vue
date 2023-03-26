<script setup lang="ts">
import request_editor from "@/components/request_editor/index.vue";
import response_view from "@/components/response_view/index.vue";
import environment_menu from "@/components/environment_menu/index.vue";
import environment_selector from "@/components/environment_selector/index.vue";

import { getContents, StringRequest } from "@/scripts/files";
import { onMounted, Ref, ref } from "vue";
import { resizerFromDiv } from "@/scripts/elementResizer";

onMounted(() => {
  const resizerDiv = document.getElementById("middle_container");
  if (!resizerDiv) {
    throw new Error("Could not find element with id 'middle_container'");
  }
  window.addEventListener("load", () => resizerFromDiv(resizerDiv));
})

const currentRequest: Ref<StringRequest> = ref({
  url: null,
  method: null,
  headers: {},
  body: undefined,
});

function changeFile(contents: string) {
  try {
    const jsonRequest: StringRequest = JSON.parse(contents);
    currentRequest.value = jsonRequest;
  } catch (error) {
    console.error(`Failed to parse file contents as String Request, cause: ${error}`);
  }
}
</script>

<template>
  <div class="app_container">

    <div class="top_bar_container">
      <environment_selector />
    </div>
    <div class="middle_container" id="middle_container">

      <div class="environment_menu_container horizontal_resize">
        <environment_menu
          @open-file="(filePath: string) => getContents(filePath).then((contents) => changeFile(contents))" />
      </div>
      <div class="resizer"></div>
      <div class="request_container horizontal_resize">
        <request_editor v-bind:current-request="currentRequest" />
      </div>
      <div class="resizer"></div>
      <div class="response_container horizontal_resize">
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
  min-width: 100dvw;
}

.environment_menu_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 16dvw;
  min-width: 4dvw;
  height: 100%;
  resize: horizontal;
  border: solid 2px black;
  flex: 1 1 auto;
}

.request_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 47dvw;
  min-width: 4dvw;
  height: 100%;
  resize: horizontal;
  border: solid 2px black;
  flex: 1 1 auto;
}

.response_container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-background);
  width: 37dvw;
  min-width: 4dvw;
  height: 100%;
  resize: horizontal;
  border: solid 2px black;
  flex: 1 1 auto;
}
</style>
