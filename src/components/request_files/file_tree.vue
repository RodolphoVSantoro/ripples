<script setup lang="ts">
    import { defineComponent, PropType, ref } from "vue";
    import { FileTree } from "@/scripts/files";

    const props = defineProps<{
        fileTree: FileTree,
    }>();

    const showChildren = ref(false);

    function a(){
        console.log(showChildren.value);
    }

</script>

<template>
    <div v-if="fileTree.isFile()">
        <v-list-item @click="">A {{ fileTree.name, fileTree.path }}</v-list-item>
    </div>
    <div v-else>

        <v-list-item @click="showChildren = !showChildren">P {{ fileTree.name, fileTree.path }}</v-list-item>

        <div v-show="showChildren"> 
            <v-list-item v-if="fileTree.children.length<=0">Empty</v-list-item>
            <v-list-group v-for="tree in fileTree.children">
                <template v-slot:activator>
                    <file_tree v-bind:file-tree="tree"/>
                </template>
            </v-list-group>
        </div>
    </div>
</template>
