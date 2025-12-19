
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 如果你是部署到子目錄，請修改此處
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
