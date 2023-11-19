<script setup lang="ts">

import { onBeforeMount, ref, Ref } from "vue";

import { FileTree, getFileTree } from "@/scripts/files";

import VFileTree from "@/components/RequestFiles/FileTree.vue";

const fileTree: Ref<FileTree[]> = ref([]);

const emit = defineEmits(['open-file']);

onBeforeMount(async () => {
  fileTree.value = await getFileTree();
});

</script>

<template>
  <v-list class="files_list">
    <div v-for="(tree, index) in fileTree" :key="index">
      <v-file-tree @open-file="(filePath: string) => emit('open-file', filePath)" v-bind:file-tree="tree"
        class="file_tree" />
    </div>
  </v-list>
</template>

<style scoped>
.files_list {
  padding: 0;
  background-color: var(--color-primary);
  height: 100%;
  width: 100%;
}
</style>