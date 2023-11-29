import { RustResponse } from "./requests";
import { StringRequest } from "@/scripts/files";

export interface JsonEditorContent {
    text: string;
    json: object;
}

const BodyTypes = ['json', 'xml', 'html', 'text'] as const;
export type BodyType = typeof BodyTypes[number];
const ContentTypes = ['application/json', 'application/xml', 'text/html'] as const;
export type ContentType = typeof ContentTypes[number];

function getContentType(headers: Record<string, string | number | string[] | boolean | null>): ContentType | undefined {
    const lowerCaseHeaders = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]));

    const contentTypeHeadersString = String(lowerCaseHeaders?.['content-type']);
    const contentTypeHeaders = contentTypeHeadersString.split(';').map((s) => s.trim());

    const contentTypes = contentTypeHeaders.filter((header) => ContentTypes.includes(header as ContentType)) as ContentType[];
    const contentType = contentTypes[0] ?? undefined;

    return contentType;
}

export function getResponseContentType(response?: RustResponse): ContentType | undefined {
    if (!response?.headers) {
        return undefined;
    }

    return getContentType(response.headers);
}

export function getRequestBodyType(StringRequest?: StringRequest): ContentType | undefined {
    if (!StringRequest?.headers) {
        return undefined;
    }

    return getContentType(StringRequest.headers);
}

export const contentTypeMap: Record<ContentType, BodyType> = {
    'application/json': 'json',
    'application/xml': 'xml',
    'text/html': 'html',
};