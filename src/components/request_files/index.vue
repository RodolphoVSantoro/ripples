<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import VFileTree from "@/components/request_files/file_tree.vue";
import { FileTree, getFileTree } from "@/scripts/files";

const fileTree: Ref<FileTree[]> = ref([]);

onBeforeMount(async () => {
  fileTree.value = await getFileTree();
});

</script>

<template>
  <v-list class="files_list">
    <v-for v-for="tree in fileTree" :key="tree">
      <v-file-tree @open-file="(filePath: string) => $emit('open-file', filePath)" v-bind:file-tree="tree"
        class="file_tree" />
    </v-for>
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