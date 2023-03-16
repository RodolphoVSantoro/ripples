<script setup lang="ts">
import { defineComponent, ref, Ref } from "vue";
import file_tree from "@/components/request_files/file_tree.vue";
import { FileTree, getFileTree } from "@/scripts/files";

const fileTree: Ref<FileTree[]> = ref([]);
getFileTree().then((tree) => {
  fileTree.value = tree;
});
const open = ['Users'];
const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
];
const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete'],
];

</script>

<template>
  <v-list>
    <div v-for="tree in fileTree">
      <file_tree v-bind:file-tree="tree" />
    </div>
  </v-list>
</template>
