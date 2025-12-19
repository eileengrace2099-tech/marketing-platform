
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 關鍵：確保在 GitHub Pages 的子目錄下能正確找到 JS/CSS 資源
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000 
  }
});
