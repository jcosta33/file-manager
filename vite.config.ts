import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: 'src/client/setupTests.js',
        environment: 'happy-dom',
        env: {
            NODE_ENV: 'test',
        },
    },
});
