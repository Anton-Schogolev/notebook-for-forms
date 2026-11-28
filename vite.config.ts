import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), 'PUBLIC_URL').PUBLIC_URL || '/',
  plugins: [react()],
  resolve: {
    alias: {
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      store: fileURLToPath(new URL('./src/store', import.meta.url)),
    },
  },
  server: { port: 3000, strictPort: true },
  build: {
    outDir: 'build',
  },
}));
