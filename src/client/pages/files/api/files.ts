import { type FileResponse, type FilesResponse } from '../types/file';

/**
 * Uploads a single file to the server.
 * @param {File} file - The file to upload.
 * @returns {Promise<{message: string}>} A promise that resolves to the server response.
 */
export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as FileResponse;
}

/**
 * Uploads a file in chunks to the server.
 * @param {File} file - The file to upload in chunks.
 * @param {(percentage: number) => void} [onProgress] - Optional callback to report upload progress.
 */
export async function uploadFileChunks(file: File, onProgress?: (percentage: number) => void) {
    const chunkSize = 1024 * 1024; // 1 MB per chunk
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let index = 0; index < totalChunks; index++) {
        const chunk = file.slice(index * chunkSize, (index + 1) * chunkSize);
        const formData = new FormData();

        formData.append('file', chunk, file.name);
        formData.append('currentChunkIndex', String(index));
        formData.append('totalChunks', String(totalChunks));

        const response = await fetch('/api/upload-chunk', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const progress = ((index + 1) / totalChunks) * 100;

        if (onProgress) {
            onProgress(progress);
        }
    }

    return { message: 'File uploaded successfully' };
}

/**
 * Fetches the list of files from the server.
 * @returns {Promise<string[]>} A promise that resolves to an array of file names.
 */
export async function fetchFiles() {
    const response = await fetch('/api/files');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { files } = (await response.json()) as FilesResponse;
    return files;
}

/**
 * Deletes a file on the server.
 * @param {string} fileName - The name of the file to delete.
 * @returns {Promise<{message: string}>} A promise that resolves to the server response after deleting the file.
 */
export async function deleteFile(fileName: string) {
    const response = await fetch(`/api/files/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as FilesResponse;
}
