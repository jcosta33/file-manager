/**
 * Extracts and returns the uppercase file extension from a given filename.
 * @param {string} fileName - The full name of the file.
 * @returns {string} The uppercase file extension, or an empty string if no extension found.
 */
export function getFileExtension(fileName: string): string {
    const pieces = fileName.split('.');
    // Handling cases where there might be no extension or hidden files without extensions
    if (pieces.length === 1 || (pieces[0] === '' && pieces.length === 2)) {
        return '';
    }
    return pieces.pop()?.toUpperCase() || '';
}

/**
 * Determines if a given filename is an image based on its extension.
 * @param {string} filename - The name of the file to check.
 * @returns {boolean} True if the file is an image; otherwise, false.
 */
export function isImageFile(filename: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = filename.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension || '');
}

/**
 * Formats a file size in bytes into a human-readable string.
 * @param {number} size - The size of the file in bytes.
 * @returns {string} Formatted size string in appropriate units (bytes, KB, MB).
 */
export function formatFileSize(size: number): string {
    if (size < 1024) {
        return `${size} bytes`;
    } else if (size < 1048576) {
        return `${(size / 1024).toFixed(1)} KB`;
    } else if (size < 1073741824) {
        return `${(size / 1048576).toFixed(1)} MB`;
    }
    return `${(size / 1073741824).toFixed(2)} GB`;
}
