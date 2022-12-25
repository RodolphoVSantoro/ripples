<script setup lang="ts">
import { defineComponent, ref, Ref } from "vue";
import file_tree from "@src/components/request_files/file_tree.vue";
import { FileTree, getFileTree } from "@src/scripts/files";

const fileTree: Ref<FileTree[]> = ref([]);
getFileTree().then((tree) => {
  fileTree.value = tree;
});

</script>

<template>
  <div class="container">
    <h1>Simple requests prototype</h1>
    <div v-for="tree in fileTree">
      <file_tree v-bind:file-tree="tree"/>
    </div>
  </div>
</template>
