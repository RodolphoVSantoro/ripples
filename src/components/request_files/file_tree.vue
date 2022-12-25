<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileTree } from "@/scripts/files";

export default defineComponent({
    props: {
        fileTree: { type: Object as PropType<FileTree>, required: true }
    },
    data() {
        return {
            showChildren: false
        }
    },
});


</script>

<template>
    <div v-if="fileTree.isFile()">
        <li @click="">A {{ fileTree.name, fileTree.path }}</li>
    </div>
    <div v-else>
        <li @click="showChildren = !showChildren">P {{ fileTree.name, fileTree.path }}</li>
        <div v-show="showChildren">
            <ol>
                <div v-if="fileTree.children.length<=0">
                    <li>Empty</li>
                </div>
                <div v-for="tree in fileTree.children">
                    <file_tree v-bind:file-tree="tree"/>
                </div>
            </ol>
        </div>
    </div>
</template>