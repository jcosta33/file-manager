export interface UploadProps {
    onFileChange: (files: File[]) => void;
    acceptsMultiple?: boolean;
    maxFileSize?: number;
    fileExtensions?: string[];
}
