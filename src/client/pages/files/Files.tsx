import { useCallback, useMemo, type FC } from 'react';

import { Card } from '../../components/Card';
import { FileUpload } from '../../components/FileUpload';

import { FilesList } from './components/FilesList';
import { useFileUploadHook } from './hooks/fileUploadHook';
import { formatFileSize } from './utils/file.utils';

/**
 * A management component for handling file uploads and displaying a list of files.
 * Utilizes custom hooks for loading files and managing upload states.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const Files: FC = () => {
    const { files, isLoading, error, uploadFileMutation } = useFileUploadHook();

    const handleFilesUpload = useCallback(
        (files: File[]) => {
            uploadFileMutation.mutate(files);
        },
        [uploadFileMutation]
    );

    const totalFileSize = useMemo(() => files?.reduce((acc, file) => acc + file.size, 0) || 0, [files]);

    if (isLoading) {
        // We can do much better than this for a loading state but let's keep it simple.
        return <div className="container mx-auto py-4 text-center">Loading...</div>;
    }

    if (error instanceof Error) {
        return (
            <div className="container mx-auto py-4 text-red-500 text-center">An error occurred: {error.message}</div>
        );
    }

    return (
        <section className="container max-w-3xl mx-auto py-10">
            <Card>
                <header className="flex flex-col justify-center items-center w-full mb-3">
                    <h1 className="text-xl text-white">Uploaded Files</h1>
                    <span className="text-sm text-zinc-500">
                        {files?.length || 0} files ({formatFileSize(totalFileSize)})
                    </span>
                </header>
                <FileUpload
                    onFileChange={handleFilesUpload}
                    acceptsMultiple={true}
                    fileExtensions={['ts', 'tsx', 'jpg', 'pdf', 'txt', 'mp4', 'mp3']}
                    maxFileSize={5 * 1024 * 1024}
                >
                    <FilesList files={files} />
                </FileUpload>
            </Card>
        </section>
    );
};
