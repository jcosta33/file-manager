import { describe, expect, it } from 'vitest';

import {
    formatFileExtensions,
    formatMaxFileSize,
    getFilesErrorMessage,
    hasValidFileExtension,
    hasValidFileSizeAndExtension,
    isValidFileSize,
} from '../utils';

describe('fileUtils', () => {
    describe('formatMaxFileSize', () => {
        it('formats bytes into a readable MB string', () => {
            expect(formatMaxFileSize(1048576)).toBe('1.00 MB'); // 1 MB
        });

        it('returns "No limit." if undefined', () => {
            expect(formatMaxFileSize()).toBe('No limit.');
        });
    });

    describe('formatFileExtensions', () => {
        it('formats file extensions into a comma-separated string', () => {
            expect(formatFileExtensions(['jpg', 'png'])).toBe('.jpg, .png');
        });

        it('returns "Any file type." if undefined', () => {
            expect(formatFileExtensions()).toBe('Any file type.');
        });
    });

    describe('isValidFileSize', () => {
        it('returns true if the file size is within the limit', () => {
            const file = new File(['content'], 'file.txt', { type: 'text/plain' });
            expect(isValidFileSize(file, 100)).toBe(true);
        });

        it('returns false if the file size exceeds the limit', () => {
            const file = new File(['content'], 'file.txt', { type: 'text/plain' });
            expect(isValidFileSize(file, 1)).toBe(false);
        });
    });

    describe('hasValidFileExtension', () => {
        it('returns true if the file has a valid extension', () => {
            const file = new File(['content'], 'example.jpg', { type: 'image/jpeg' });
            expect(hasValidFileExtension(file, ['jpg', 'png'])).toBe(true);
        });

        it('returns false if the file does not have a valid extension', () => {
            const file = new File(['content'], 'example.gif', { type: 'image/gif' });
            expect(hasValidFileExtension(file, ['jpg', 'png'])).toBe(false);
        });
    });

    describe('hasValidFileSizeAndExtension', () => {
        it('returns true if the file passes all validation criteria', () => {
            const file = new File(['content'], 'example.jpg', { type: 'image/jpeg' });
            expect(hasValidFileSizeAndExtension(file, 1000, ['jpg'])).toBe(true);
        });

        it('returns false if the file fails any validation criteria', () => {
            const file = new File(['content'], 'example.jpg', { type: 'image/jpeg' });
            expect(hasValidFileSizeAndExtension(file, 1, ['jpg'])).toBe(false); // Size too large
        });
    });

    describe('getFilesErrorMessage', () => {
        it('aggregates error messages for invalid files', () => {
            const files = [
                new File([''], 'largefile.txt', { type: 'text/plain' }),
                new File([''], 'invalidfile.gif', { type: 'image/gif' }),
            ];
            const errorMessage = getFilesErrorMessage(files, 1, ['txt', 'jpg']);
            expect(errorMessage).toContain('File invalidfile.gif is invalid.');
        });
    });
});
