<script setup lang="ts">
</script>

<template>
    <div class="url_editor_container">
        <input value="Url here" class="url_input">
        <v-btn class="send_button">send</v-btn>
    </div>
</template>

<style scoped>
/**
    Tem convenções de nomenclatura pra CSS também, não é tão importante quanto as de JS mas ajuda a manter o código consistente
    https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing
*/
.url_editor_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background);
    padding: 0.5rem;
    width: 100%;
    border-bottom: 4px solid black;
}

.url_input {
    color: white;
    width: 90%;
    height: 90%;
    border: 3px solid white;
    border-radius: 0.5rem;
}

.send_button {
    color: white;
    background-color: var(--color-primary);
    border: 3px solid white;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
}
</style>