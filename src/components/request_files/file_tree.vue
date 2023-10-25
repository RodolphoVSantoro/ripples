<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { FileTreeProp, File } from "@/scripts/files";

const props = defineProps({
    fileTree: {
        type: Object as PropType<FileTreeProp | null>,
        default: null,
    },
    fatherExpanded: {
        type: Boolean,
    },
});

const expanded = ref(false);

watch(() => props.fatherExpanded, (newValue, _oldValue) => {
    if (newValue === false) {
        expanded.value = false
    }
})

function setVisibility(visibility: boolean) {
    expanded.value = visibility
}

</script>

<template>
    <!--file-->
    <div v-if="fileTree === null || fileTree.isFile()" class="treeview">
        <div class="list-group-item">
            <div class="empty-folder-item" v-if="fileTree === null">
                <!--empty icon--->
                <em class="empty-text">Empty</em>
            </div>
            <div v-else @click="$emit('open-file', fileTree?.path)">
                <!--file icon--->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-file-earmark" viewBox="0 0 16 16">
                    <path
                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
                {{ fileTree.name, fileTree.path }}
            </div>
        </div>
    </div>
    <!--folder-->
    <div v-else class="treeview">
        <div class="list-group-item" @click="setVisibility(!expanded)">
            <svg v-if="expanded" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-folder2-open" viewBox="0 0 16 16">
                <path
                    d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
            </svg>
            <!--folder icon--->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder"
                viewBox="0 0 16 16">
                <path
                    d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
            </svg>
            {{ fileTree.name, fileTree.path }}
        </div>
        <!--folder children-->
        <div v-show="expanded">
            <div v-if="fileTree.children.length <= 0" class="list-group">
                <file_tree v-bind:file-tree="null"></file_tree>
            </div>
            <div v-for="tree in fileTree.children" class="list-group">
                <file_tree @open-file="(filePath: string) => $emit('open-file', filePath)" v-bind:file-tree="tree"
                    v-bind:fatherExpanded="expanded" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.treeview {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    color: white;
    background-color: var(--color-background);
    background-clip: border-box;
    border-left: 8px solid var(--color-primary);
    padding: 0;
    overflow: hidden;
}

.list-group {
    margin-bottom: 0;
}

.list-group-item {
    border-radius: 0;
    border-width: 1px 0 0 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    border-top: 3px solid var(--color-primary);
    border-bottom: 3px solid var(--color-primary);
    cursor: pointer;
}

.list-group-item:hover {
    color: var(--color-primary-light);
    opacity: 0.9;
}

.treeview>.list-group-item:first-child {
    border-top-width: 0;
}

.empty-folder-item {
    opacity: 0.1;
}

.empty-text {
    text-emphasis-color: var(--color-text);
    font-style: italic;
    padding: 1rem;
}
</style>