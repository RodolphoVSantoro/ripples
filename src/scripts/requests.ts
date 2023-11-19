import { invoke } from "@tauri-apps/api";

import { StringRequest } from "@/scripts/files";

export type RustResponse = {
    status: string,
    headers: Record<string, string | number | null | boolean>,
    url: string,
    body: string,
}

export async function rustRequest(stringRequest: StringRequest): Promise<RustResponse> {
    const { url, method, headers, body } = stringRequest;

    const response = await invoke<RustResponse>('send_request', { url, method, headers, body });

    return response;
}
