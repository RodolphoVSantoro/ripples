<script setup lang="ts">
const pasteFrom = [
    "url",
    "curl",
    "file",
    "graphql",
    "soap",
];
const selected = pasteFrom[0];
</script>

<template>
    <div class="paste_area">
        <button class="paste_select" name="pasteFrom">
            paste from
        </button>
    </div>
    <input placeholder="http://localhost:3000/test" class="url_input">
    <button class="send_button">send</button>
</template>

<style scoped>
.paste_area {
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 70%;
    border: 1px solid white;
    border-radius: 0.5rem;
    margin-right: 1%;
}

.paste_select {
    color: white;
    background-color: var(--color-primary);
    width: 100%;
    text-align: center;
    border-radius: 0.5rem;
    flex: auto;
}

.url_input {
    color: white;
    padding-left: 2%;
    width: 90%;
    height: 70%;
    border: 1px solid white;
    border-radius: 0.5rem;
}

.url_input:focus {
    outline: none;
}

.send_button {
    color: white;
    background-color: var(--color-primary);
    border: 1px solid white;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    width: 10%;
    height: 70%;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>