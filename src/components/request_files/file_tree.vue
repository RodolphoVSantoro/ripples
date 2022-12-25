<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileTree } from "@src/scripts/files";

export default defineComponent({
    props: {
        fileTree: { type: Object as PropType<FileTree>, required: true }
    },
});
</script>

<template>
  
</template>