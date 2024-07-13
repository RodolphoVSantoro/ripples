import { invoke } from "@tauri-apps/api/core";

import { StringRequest } from "@/scripts/files";

export type RustResponse = {
    status: string,
    headers: Record<string, string | number | null | boolean>,
    url: string,
    body: string,
}

export type RustError = {
    name: string,
    message: string,
    status?: number,
    url?: string,
};

export async function rustRequest(stringRequest: StringRequest): Promise<RustResponse> {
    const { url, method, headers, body } = stringRequest;

    try{
        const response = await invoke<RustResponse>('send_request', { url, method, headers, body });
        return response;
    } catch (error) {
        const err = error as RustError | undefined;
        return {
            status: err?.status?.toString() ?? '',
            headers: {},
            url: err?.url ?? '',
            body: `name: "${err?.name}"; message: "${err?.message}"`,
        };
    }

}
