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
    <div class="url_editor_container">
        <div class="paste_area">
            <label for="pasteFrom" class="paste_label">from</label>
            <select class="paste_select" name="pasteFrom">
                <option class="paste_option" v-for="paste in pasteFrom">
                    {{ paste }}
                </option>
            </select>
        </div>
        <input placeholder="Url here" class="url_input">
        <button class="send_button">send</button>
    </div>
</template>

<style scoped>
.url_editor_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-background);
    padding: 0.5rem;
    height: 12%;
    width: 100%;
    border-bottom: 4px solid black;
}

.paste_area {
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 100%;
}

.paste_label {
    color: white;
    background-color: var(--color-primary);
    text-align: center;
}

.paste_select {
    color: white;
    background-color: var(--color-primary);
    width: 100%;
    text-align: center;
}

.paste_option {
    color: white;
    background-color: var(--color-primary);
    width: 100%;
}

.url_input {
    color: white;
    width: 90%;
    height: 85%;
    border: 3px solid white;
    border-radius: 0.5rem;
}

.send_button {
    color: white;
    background-color: var(--color-primary);
    border: 3px solid white;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    width: 10%;
    margin: 0.15rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>