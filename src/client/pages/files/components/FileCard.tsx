import { useCallback, useMemo, type FC, type ReactElement } from 'react';
import {
    FaExternalLinkAlt,
    FaFile,
    FaFileAlt,
    FaFileAudio,
    FaFileCode,
    FaFilePdf,
    FaFileVideo,
    FaTrash,
} from 'react-icons/fa';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { useFileUploadHook } from '../hooks/fileUploadHook';
import { type FileItem } from '../types/file';
import { formatFileSize, getFileExtension, isImageFile } from '../utils';

interface FileProps {
    file: FileItem;
}

interface IconMap {
    [key: string]: ReactElement;
}

const icons: IconMap = {
    pdf: <FaFilePdf className="text-red-500" size={100} />,
    txt: <FaFileAlt className="text-gray-500" size={100} />,
    js: <FaFileCode className="text-blue-500" size={100} />,
    jsx: <FaFileCode className="text-blue-500" size={100} />,
    ts: <FaFileCode className="text-blue-500" size={100} />,
    tsx: <FaFileCode className="text-blue-500" size={100} />,
    html: <FaFileCode className="text-blue-500" size={100} />,
    css: <FaFileCode className="text-blue-500" size={100} />,
    mp4: <FaFileVideo className="text-purple-500" size={100} />,
    avi: <FaFileVideo className="text-purple-500" size={100} />,
    mp3: <FaFileAudio className="text-orange-500" size={100} />,
    wav: <FaFileAudio className="text-orange-500" size={100} />,
};

/**
 * Retrieves an icon based on the file extension.
 * Uses a predefined map of file extensions to React components (icons).
 *
 * @param {string} extension - The file extension to determine the icon for.
 * @returns {ReactElement} The icon component corresponding to the file type.
 */

const getFileTypeIcon: FC<string> = (extension) => {
    // Ensure the extension is a valid key in the map to avoid TypeScript errors.
    const icon = icons[extension.toLowerCase()];
    return icon ?? <FaFile className="text-gray-500" size={100} aria-hidden="true" />;
};

/**
 * FileCard displays a card for each file with options to open or delete the file,
 * and shows an image thumbnail if the file is an image.
 *
 * @param {FileItem} file - The file to display in the card.
 */
export const FileCard: FC<FileProps> = ({ file }) => {
    const { deleteFileMutation } = useFileUploadHook();

    const handleDeleteFile = useCallback(() => {
        deleteFileMutation.mutate(file.name);
    }, [deleteFileMutation, file.name]);

    const handleOpenFile = useCallback(() => {
        window.open(`/uploads/${file.name}`, '_blank');
    }, [file.name]);

    const fileExtension = useMemo(() => getFileExtension(file.name), [file.name]);

    return (
        <Card className="text-center">
            <div className="p-2 text-slate-300 hover:text-white transition-colors">
                <div className="h-32 rounded-lg overflow-hidden">
                    {isImageFile(file.name) ? (
                        <img src={`/uploads/${file.name}`} alt={`${file.name} thumbnail`} className="w-full h-auto" />
                    ) : (
                        <div className="flex justify-center items-center h-full">{getFileTypeIcon(fileExtension)}</div>
                    )}
                </div>

                <h4 className="text-md truncate" title={file.name}>
                    {file.name}
                </h4>

                <p className="text-sm text-slate-500">
                    {formatFileSize(file.size)} - {fileExtension}
                </p>
            </div>

            <div className="flex gap-2 justify-center" role="toolbar">
                <Button
                    color="default"
                    variant="text"
                    size="small"
                    onClick={handleOpenFile}
                    icon={<FaExternalLinkAlt />}
                >
                    Open
                </Button>
                <Button color="danger" variant="text" size="small" onClick={handleDeleteFile} icon={<FaTrash />}>
                    Delete
                </Button>
            </div>
        </Card>
    );
};
