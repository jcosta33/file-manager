/**
 * Formats the maximum file size into a readable string.
 * @param {number} [maxFileSize] - Maximum file size in bytes.
 * @returns {string} Formatted size string in megabytes or 'No limit.' if undefined.
 */
export function formatMaxFileSize(maxFileSize?: number) {
    return maxFileSize ? `${(maxFileSize / 1024 / 1024).toFixed(2)} MB` : 'No limit.';
}

/**
 * Formats a list of file extensions into a comma-separated string.
 * @param {string[]} [fileExtensions] - List of file extensions.
 * @returns {string} A string of formatted file extensions or 'Any file type.' if undefined.
 */
export function formatFileExtensions(fileExtensions?: string[]) {
    return fileExtensions ? fileExtensions.map((ext) => `.${ext}`).join(', ') : 'Any file type.';
}

/**
 * Checks if the file exceeds the maximum file size.
 * @param {File} file - The file to be checked.
 * @param {number} [maxFileSize] - Maximum file size in bytes.
 * @returns {boolean} True if the file size is within the limit, otherwise false.
 */
export function isValidFileSize(file: File, maxFileSize?: number) {
    if (maxFileSize && file.size > maxFileSize) {
        return false;
    }
    return true;
}

/**
 * Checks if the file has a valid extension from the provided list.
 * @param {File} file - The file to be checked.
 * @param {string[]} [fileExtensions] - Allowed file extensions.
 * @returns {boolean} True if the file has a valid extension, otherwise false.
 */
export function hasValidFileExtension(file: File, fileExtensions?: string[]) {
    if (fileExtensions && !fileExtensions.some((ext) => file.name.toLowerCase().endsWith(`.${ext.toLowerCase()}`))) {
        return false;
    }
    return true;
}

/**
 * Validates a file against size and extension criteria.
 * I am usually not afraid to use very explicit names for functions, even if they are long.
 * @param {File} file - The file to be checked.
 * @param {number} [maxFileSize] - Maximum file size in bytes.
 * @param {string[]} [fileExtensions] - Allowed file extensions.
 * @returns {boolean} True if the file passes all validation criteria, otherwise false.
 */
export function hasValidFileSizeAndExtension(file: File, maxFileSize?: number, fileExtensions?: string[]) {
    return isValidFileSize(file, maxFileSize) && hasValidFileExtension(file, fileExtensions);
}

/**
 * Handles invalid files by displaying an alert with error messages.
 * @param {Files} file - The files to be handled.
 * @param {number} [maxFileSize] - Maximum file size in bytes.
 * @param {string[]} [fileExtensions] - Allowed file extensions.
 * @returns {string} A string containing all error messages.
 */
export function getFilesErrorMessage(files: File[], maxFileSize?: number, fileExtensions?: string[]) {
    const largeFiles = files.filter((file) => !isValidFileSize(file, maxFileSize));
    const invalidFiles = files.filter((file) => !hasValidFileExtension(file, fileExtensions));

    const errorMessages = [
        ...largeFiles.map((file) => `File ${file.name} is too large.`),
        ...invalidFiles.map((file) => `File ${file.name} is invalid.`),
    ];

    return errorMessages.join('\n');
}

// I tend to avoid declaring types when they can be inferred from the return type of the function.
