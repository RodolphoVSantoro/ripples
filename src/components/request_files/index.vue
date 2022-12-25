<script setup lang="ts">
import { defineComponent, ref, Ref } from "vue";
import file_tree from "@/components/request_files/file_tree.vue";
import { FileTree, getFileTree } from "@/scripts/files";

const fileTree: Ref<FileTree[]> = ref([]);
getFileTree().then((tree) => {
  fileTree.value = tree;
});

</script>

<template>
  <div class="container">
    <ol>
      <div v-for="tree in fileTree">
        <file_tree v-bind:file-tree="tree"/>
      </div>
    </ol>
  </div>
</template>
