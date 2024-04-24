import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC } from 'react';

import { Files } from './pages/files';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Files />
        </QueryClientProvider>
    );
};
