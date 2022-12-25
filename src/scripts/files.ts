import { invoke } from "@tauri-apps/api/tauri";

export type FileTree = Folder | File;

export class File {
    name: string;
    path: string;
    constructor(params:{name: string, path: string}) {
        const { name, path } = params;
        this.name = name;
        this.path = path;
    }
    
    isFile(): boolean {
        return true;
    }

    async getContents(): Promise<string> {
        //TODO: Get from rust
        return `file contents of ${this.path}`;
    }

    async save(): Promise<void> {}

    async delete(): Promise<void> {}
}

export class Folder extends File {
    children: FileTree[];

    constructor(params:{name: string, path: string, children: FileTree[]}) {
        const { name, path, children } = params;
        super({name, path});
        this.children = children;
    }

    isFile(): boolean {
        return false;
    }
    
    async save(): Promise<void> {}
    async delete(): Promise<void> {}
}

// Gets saved files and folders from rust
export async function getFileTree(): Promise<FileTree[]> {
    //TODO: Get from rust
    return [
    new File({
        name: "test",
        path: "test",
    }),
    new Folder({
        name: "test2",
        path: "test2",
        children: [
        new File({
            name: "test3",
            path: "test3",
        }),
        ],
    }),
    new Folder({
        name: "test4",
        path: "test4",
        children: [],
    }),
    ];
}