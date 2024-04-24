import {
    useCallback,
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
    type FC,
    type KeyboardEvent,
    type ReactNode,
} from 'react';
import { FaUpload } from 'react-icons/fa';

import { type UploadProps } from './types';
import { formatFileExtensions, formatMaxFileSize, getFilesErrorMessage, hasValidFileSizeAndExtension } from './utils';

interface UploadAreaProps extends UploadProps {
    children: ReactNode;
}

/**
 * A drag-and-drop enabled area that allows file uploads with validation.
 * Supports keyboard interactions and multiple file selection depending on props.
 * @param {UploadAreaProps} props - The properties including children and file handling configurations.
 */
export const FileUpload: FC<UploadAreaProps> = ({
    children,
    onFileChange,
    acceptsMultiple = false,
    maxFileSize,
    fileExtensions,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Some of the gains of using useCallback here may be minimal but it's good practice and can't hurt
    const processFiles = useCallback(
        (files: File[]) => {
            if (!maxFileSize && !fileExtensions) {
                onFileChange(files);
                return;
            }

            if (!acceptsMultiple && files.length > 1) {
                alert('Only one file can be uploaded at a time.');
                return;
            }

            const validFiles = files.filter((file) => hasValidFileSizeAndExtension(file, maxFileSize, fileExtensions));

            if (validFiles.length > 0) {
                onFileChange(validFiles);
            }
            if (validFiles.length !== files.length) {
                // Ideally we would use a more user-friendly way to display this error message
                alert(getFilesErrorMessage(files, maxFileSize, fileExtensions));
            }
        },
        [maxFileSize, fileExtensions, acceptsMultiple, onFileChange]
    );

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            processFiles(files);
            setIsHovering(false);
        },
        [processFiles]
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (e.target.files) {
                processFiles(Array.from(e.target.files));
            }
        },
        [processFiles]
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
        }
    }, []);

    /* 
        We could use useMemo here but this seems to be one of those cases where it's not worth the verbosity that is added.
        It can often be unclear when to use useMemo and useCallback and I am happy to follow any conventions that are in place.
    */
    const uploadAreaClasses = `relative border-2 border-dashed p-4 cursor-default rounded-lg outline-0 focus-visible:border-zinc-400 ${isHovering ? 'border-zinc-400' : 'border-black'}`;
    const formattedFileExtensions = formatFileExtensions(fileExtensions);
    const formattedMaxFileSize = formatMaxFileSize(maxFileSize);

    return (
        /* 
            In this case, we really do need to avoid assigning a role to the div as we have a separate area to handle keyboard events.
            It's a tricky situation because we want this whole area to be droppable but we can't assign the onKeyDown event to it otherwise the children within it, which are also interactive, will not be able to receive keyboard events.
            So we make use of a separate button element to handle click and keyboard events and the div element to handle drag and drop events.
            I would love to hear any suggestions on how to improve this pattern.
        */
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={uploadAreaClasses}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {children}
            <div className="text-center text-gray-500 p-5 mt-3">
                <div
                    className="max-w-96 p-2 mx-auto cursor-pointer text-zinc-400 transition-colors hover:text-white"
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-describedby="file-drop-area-label file-upload-description"
                >
                    <FaUpload size={30} className="mx-auto mb-2" aria-hidden="true" />
                    <p id="file-drop-area-label" className="text-lg  mb-2" aria-hidden="true">
                        Drag and drop files here or click to upload.
                    </p>
                </div>

                <div id="file-upload-description" className="text-sm" aria-hidden="true">
                    <p className="mb-1">
                        <span>Multiple files:</span>
                        <br />
                        <strong>{acceptsMultiple ? 'Yes' : 'No'}</strong>
                    </p>

                    <p className="mb-1">
                        <span>Max size:</span>
                        <br />
                        <strong>{formattedMaxFileSize}</strong>
                    </p>
                    <p className="mb-1">
                        <span>File types:</span>
                        <br />
                        <strong>{formattedFileExtensions}</strong>
                    </p>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple={acceptsMultiple}
                onChange={handleChange}
                className="w-0 h-0 opacity-0 absolute inset-0 cursor-pointer"
                accept={formattedMaxFileSize}
                tabIndex={-1}
                aria-hidden="true"
            />
        </div>
    );
};
