import { describe, expect, it } from 'vitest';

import { formatFileSize, getFileExtension, isImageFile } from '../utils';

describe('File Utils', () => {
    describe('getFileExtension', () => {
        it('returns the uppercase extension of a filename', () => {
            expect(getFileExtension('example.TXT')).toBe('TXT');
        });

        it('returns an empty string if no extension is found', () => {
            expect(getFileExtension('example')).toBe('');
        });

        it('handles hidden files and files without extensions', () => {
            expect(getFileExtension('.hiddenfile')).toBe('');
            expect(getFileExtension('normalfile.')).toBe('');
        });
    });

    describe('isImageFile', () => {
        it('identifies image files by extension', () => {
            expect(isImageFile('photo.jpg')).toBe(true);
            expect(isImageFile('image.jpeg')).toBe(true);
            expect(isImageFile('graphic.png')).toBe(true);
            expect(isImageFile('drawing.gif')).toBe(true);
        });

        it('returns false for non-image files', () => {
            expect(isImageFile('document.txt')).toBe(false);
            expect(isImageFile('archive.zip')).toBe(false);
            expect(isImageFile('spreadsheet.xlsx')).toBe(false);
        });
    });

    describe('formatFileSize', () => {
        it('formats sizes in bytes correctly', () => {
            expect(formatFileSize(512)).toBe('512 bytes');
        });

        it('formats sizes in kilobytes correctly', () => {
            expect(formatFileSize(2048)).toBe('2.0 KB');
        });

        it('formats sizes in megabytes correctly', () => {
            expect(formatFileSize(1048576)).toBe('1.0 MB');
        });

        it('formats sizes in gigabytes correctly', () => {
            expect(formatFileSize(1073741824)).toBe('1.00 GB');
        });
    });
});
