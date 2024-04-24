import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteFile, fetchFiles, uploadFile, uploadFileChunks } from '../api/files';

/**
 * Custom hook for managing file operations including fetching, uploading, and deleting files.
 * Utilizes React Query for data fetching and mutation management to maintain cache consistency.
 *
 * @returns {object} An object containing file data, loading state, error state, and handlers for file operations.
 */
export const useFileUploadHook = () => {
    const queryClient = useQueryClient();

    const { data: files, isLoading, error } = useQuery({ queryKey: ['files'], queryFn: fetchFiles });

    const uploadFileMutation = useMutation({
        mutationFn: async (files: File[]) => {
            const uploadPromises = files.map((file) => {
                return file.size > 1024 * 1024 ? uploadFileChunks(file) : uploadFile(file);
            });
            await Promise.all(uploadPromises);
            await queryClient.invalidateQueries({ queryKey: ['files'] });
        },
        onError: (err) => {
            console.error('Error uploading files:', err);
            // Handle error state appropriately
        },
    });

    const deleteFileMutation = useMutation({
        mutationFn: async (filename: string) => {
            await deleteFile(filename);
            await queryClient.invalidateQueries({ queryKey: ['files'] });
        },
        onError: (err) => {
            console.error('Error deleting file:', err);
            // Handle error state appropriately
        },
    });

    return {
        files,
        isLoading,
        error,
        uploadFileMutation,
        deleteFileMutation,
    };
};
