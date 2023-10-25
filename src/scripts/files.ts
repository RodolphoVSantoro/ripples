import { invoke } from "@tauri-apps/api";
export type FileTree = Folder | File;

export function convertToFileTreeProp(file_tree_string: string): FileTree[] {
    const json_rust_file_tree: JSONRustFileTree = JSON.parse(file_tree_string);

    const folders = json_rust_file_tree.folder_paths.map((folderTree) => {
        return convertJSONRustFileTreeToFileTree(folderTree);
    });
    const files = json_rust_file_tree.files.map((file) => {
        const { name, path } = file;
        return new File({
            name,
            path,
        });
    });
    return [...folders, ...files];
}

function convertJSONRustFileTreeToFileTree(json_rust_file_tree: JSONRustFileTree): FileTree {
    const children = [
        ...json_rust_file_tree.files.map((file) => {
            const { name, path } = file;
            return new File({
                name,
                path,
            });
        }),
    ];
    return new Folder({
        name: json_rust_file_tree.current_name,
        path: json_rust_file_tree.current_path,
        children: children,
    });
}

interface JSONRustFileTree {
    folder_paths: JSONRustFileTree[],
    files: {
        name: string,
        path: string,
    }[],
    current_path: string,
    current_name: string,
}

export interface StringRequest {
    url: string | null,
    method: string | null,
    body: string | undefined,
    headers: Record<string, string>,
}

export type JsonBody = boolean | number | string | null | { [key: string]: JsonBody } | Array<JsonBody>;

export interface FileTreeProp {
    name: string;
    path: string;
    children: FileTree[] | never[];
    isFile: () => boolean;
    create: () => Promise<void>;
    delete: () => Promise<void>;
}

export class File {
    name: string;
    path: string;
    children: never[];
    constructor(params: { name: string, path: string }) {
        const { name, path } = params;
        this.name = name;
        this.path = path;
        this.children = [];
    }

    isFile(): boolean {
        return true;
    }

    async create(): Promise<void> {
        try {
            await invoke("create_file", { path: this.path });
        } catch (error: any) {
            throw new Error(`Failed to create file, cause: ${error}`);
        }
    }

    async delete(): Promise<void> {
        try {
            await invoke("delete_file", { path: this.path });
        } catch (error: any) {
            throw new Error(`Failed to delete file, cause: ${error}`);
        }
    }
}

export class Folder {
    name: string;
    path: string;
    children: FileTree[];

    constructor(params: { name: string, path: string, children: FileTree[] }) {
        const { name, path, children } = params;
        this.name = name;
        this.path = path;
        this.children = children;
    }

    isFile(): boolean {
        return false;
    }

    async create(): Promise<void> {
        try {
            await invoke("create_file", { path: this.path });
        } catch (error: any) {
            throw new Error(`Failed to create file, cause: ${error}`);
        }
    }

    async delete(): Promise<void> {
        try {
            await invoke("delete_file", { path: this.path });
        } catch (error: any) {
            throw new Error(`Failed to delete file, cause: ${error}`);
        }
    }
}

export async function getFileTree(): Promise<FileTree[]> {
    try {
        const result = await invoke("get_environment_file_tree");
        try {
            return convertToFileTreeProp(result as string);
        } catch {
            throw new Error("Could not parse file tree json");
        }
    }
    catch (error: any) {
        throw new Error(`Failed to get file tree, cause: ${error}`);
    }
}

export async function getContents(path: string): Promise<string> {
    try {
        return await invoke("get_file_contents", { path });
    } catch (error: any) {
        throw new Error(`Failed to load file contents, cause: ${error}`);
    }
}