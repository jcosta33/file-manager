import { type FC } from 'react';

import { type FileItem } from '../types/file';

import { FileCard } from './FileCard';

interface FilesListProps {
    files?: FileItem[];
}

/**
 * Renders a list of files using the FileCard component.
 * Each file is displayed as a card within a flexible container.
 *
 * @param {FileItem[]} files - Array of files to display.
 * @returns {JSX.Element} The component UI.
 */
export const FilesList: FC<FilesListProps> = ({ files }) => {
    if (!files || files.length === 0) {
        return null;
    }

    return (
        <section className="flex flex-wrap justify-center" role="list">
            {files.map((file) => (
                <div className="w-full p-2 sm:w-1/3" key={file.name} role="listitem">
                    <FileCard file={file} />
                </div>
            ))}
        </section>
    );
};
