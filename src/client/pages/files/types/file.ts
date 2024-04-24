export type FileItem = {
    name: string;
    size: number;
};

export type FilesResponse = {
    files: FileItem[];
};

export type FileResponse = {
    message: string;
};
