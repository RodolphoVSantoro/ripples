<script setup lang="ts">
import { ref, Ref } from "vue";
import file_tree from "@/components/request_files/file_tree.vue";
import { FileTree, getFileTree } from "@/scripts/files";

const fileTree: Ref<FileTree[]> = ref([]);
getFileTree().then((tree) => {
  fileTree.value = tree;
});

</script>

<template>
  <v-list class="files_list">
    <div v-for="tree in fileTree">
      <file_tree v-bind:file-tree="tree" class="file_tree" />
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