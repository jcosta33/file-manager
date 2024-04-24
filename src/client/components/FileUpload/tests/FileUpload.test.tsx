import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FileUpload } from '../FileUpload';

global.alert = vi.fn();

const mockFiles = [
    new File(['hello'], 'hello.png', { type: 'image/png' }),
    new File(['hello'], 'index.ts', { type: 'text/plain' }),
];

describe('UploadArea', () => {
    const mockOnFileChange = vi.fn();

    // We could create a beforeAll but in this sort of case I expect the props will be different for each test

    it('renders the component with default props', () => {
        render(<FileUpload onFileChange={mockOnFileChange}>{<div>Upload Here</div>}</FileUpload>);
        expect(screen.getByText(/upload here/i)).toBeInTheDocument();
    });

    it('handles drag and drop of files', () => {
        render(<FileUpload onFileChange={mockOnFileChange}>{<div>Upload Here</div>}</FileUpload>);
        const uploadArea = screen.getByLabelText(/file upload area/i);
        const dataTransfer = new DataTransfer();

        for (const file of mockFiles) {
            dataTransfer.items.add(file);
        }

        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('border-slate-400');

        fireEvent.drop(uploadArea, { dataTransfer });
        expect(mockOnFileChange).toHaveBeenCalledWith(mockFiles);
    });

    it('validates the file size and type', () => {
        render(
            <FileUpload onFileChange={mockOnFileChange} fileExtensions={['ts']}>
                {<div>Upload Here</div>}
            </FileUpload>
        );
        const uploadArea = screen.getByLabelText(/file upload area/i);
        const dataTransfer = new DataTransfer();

        for (const file of mockFiles) {
            dataTransfer.items.add(file);
        }

        fireEvent.drop(uploadArea, { dataTransfer });
        expect(mockOnFileChange).toHaveBeenCalledTimes(1);
    });

    it('triggers file selection via keyboard', () => {
        render(<FileUpload onFileChange={mockOnFileChange}>{<span>Upload Here</span>}</FileUpload>);
        const uploadArea = screen.getByRole('button');

        fireEvent.keyDown(uploadArea, { key: 'Enter' });
    });
});
