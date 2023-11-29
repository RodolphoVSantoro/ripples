<script setup lang="ts">

import { onMounted, Ref, ref } from "vue";

import { getContents, StringRequest } from "@/scripts/files";
import { RustResponse } from "@/scripts/requests";
import { resizerFromDiv } from "@/scripts/elementResizer";

import RequestEditor from "@/components/RequestEditor/index.vue";
import ResponseView from "@/components/ResponseView/index.vue";
import EnvironmentMenu from "@/components/EnvironmentMenu/index.vue";
import EnvironmentSelector from "@/components/EnvironmentSelector/index.vue";
import { JsonEditorContent } from "./scripts/requestEditor";

onMounted(() => {
	const resizerDiv = document.getElementById("middle_container");
	if (!resizerDiv) {
		throw new Error("Could not find element with id 'middle_container'");
	}
	window.addEventListener("load", () => resizerFromDiv(resizerDiv));
})

const currentRequest: Ref<StringRequest> = ref({
	url: null,
	method: 'GET',
	headers: {},
	body: undefined,
});

const displayedResponse: Ref<RustResponse | undefined> = ref(undefined);

function displayResponse(response: RustResponse) {
	displayedResponse.value = response;
}

function changeFile(contents: string) {
	try {
		const jsonRequest: StringRequest = JSON.parse(contents);
		console.log(jsonRequest.headers);
		currentRequest.value = jsonRequest;
	} catch (error) {
		console.error(`Failed to parse file contents as String Request, cause: ${error}`);
	}
}

function addHeader(key: string, value: string) {
	if (!currentRequest.value.headers) {
		currentRequest.value.headers = {};
	}
	if (!currentRequest.value.headers?.[key]) {
		currentRequest.value.headers[key] = [value];
	} else {
		currentRequest.value.headers[key].push(value);
	}
}

function updateBody(content: JsonEditorContent) {
	if (content.text) {
		currentRequest.value.body = content.text;
	}
	if (content.json) {
		currentRequest.value.body = JSON.stringify(content.json);
	}
}

</script>

<template>
	<div class="app_container">

		<div class="top_bar_container">
			<environment-selector />
		</div>
		<div class="middle_container" id="middle_container">

			<div class="environment_menu_container horizontal_resize">
				<environment-menu
					@open-file="(filePath: string) => getContents(filePath).then((contents) => changeFile(contents))" />
			</div>

			<div class="resizer"></div>

			<div class="request_container horizontal_resize">
				<request-editor v-bind:request="currentRequest" v-on:response="displayResponse" v-on:add-header="addHeader"
					v-on:update-body="updateBody" />
			</div>

			<div class="resizer"></div>

			<div class="response_container horizontal_resize">
				<response-view v-bind:response="displayedResponse" />
			</div>

		</div>

	</div>
</template>

<style scoped>
.app_container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.top_bar_container {
	display: flex;
	background-color: var(--color-background);
	color: white;
	height: 5dvh;
	border-bottom: solid 1px black;
}

.middle_container {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	background-color: #1e1e1e;
	color: white;
	height: 95dvh;
	max-height: 95dvh;
	min-width: 100dvw;
}

.environment_menu_container {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: var(--color-background);
	width: 16dvw;
	min-width: 4dvw;
	height: 100%;
	resize: horizontal;
	border: solid 2px black;
	flex: 1 1 auto;
}

.request_container {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: var(--color-background);
	width: 47dvw;
	min-width: 4dvw;
	height: 100%;
	resize: horizontal;
	border: solid 2px black;
	flex: 1 1 auto;
}

.response_container {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: var(--color-background);
	width: 37dvw;
	min-width: 4dvw;
	height: 100%;
	resize: horizontal;
	border: solid 2px black;
	flex: 1 1 auto;
	max-height: 95dvh;
}
</style>
