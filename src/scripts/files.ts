import { invoke } from "@tauri-apps/api/tauri";

export type FileTree = Folder | File;

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

    async getContents(): Promise<string> {
        //TODO: Get from rust
        return `file contents of ${this.path}`;
    }

    async save(): Promise<void> { }

    async delete(): Promise<void> { }
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

    async getContents(): Promise<string> {
        throw new Error("Cannot get contents of a folder");
    }

    async save(): Promise<void> { }
    async delete(): Promise<void> { }
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
                new Folder({
                    name: "test5",
                    path: "test5",
                    children: [
                        new File({
                            name: "test6",
                            path: "test6",
                        }),
                        new Folder({
                            name: "test7",
                            path: "test7",
                            children: [
                                new Folder({
                                    name: "test8",
                                    path: "test8",
                                    children: [
                                        new Folder({
                                            name: "test9",
                                            path: "test9",
                                            children: [],
                                        }),
                                    ]
                                }),
                            ],
                        }),
                    ],
                })
            ],
        },
        ),
        new Folder({
            name: "test4",
            path: "test4",
            children: [],
        }),
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
                new Folder({
                    name: "test5",
                    path: "test5",
                    children: [
                        new File({
                            name: "test6",
                            path: "test6",
                        }),
                        new Folder({
                            name: "test7",
                            path: "test7",
                            children: [
                                new Folder({
                                    name: "test8",
                                    path: "test8",
                                    children: [
                                        new Folder({
                                            name: "test9",
                                            path: "test9",
                                            children: [],
                                        }),
                                    ]
                                }),
                            ],
                        }),
                    ],
                }), new Folder({
                    name: "test5",
                    path: "test5",
                    children: [
                        new File({
                            name: "test6",
                            path: "test6",
                        }),
                        new Folder({
                            name: "test7",
                            path: "test7",
                            children: [
                                new Folder({
                                    name: "test8",
                                    path: "test8",
                                    children: [
                                        new Folder({
                                            name: "test9",
                                            path: "test9",
                                            children: [],
                                        }),
                                    ]
                                }),
                            ],
                        }),
                    ],
                })
            ],
        }),
    ];
}
