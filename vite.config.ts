import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use process.cwd() to get the current working directory for loading environment variables.
  // Casting process to any to bypass the TypeScript error when Node.js types are not fully recognized in the configuration context.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    base: '/', 
    define: {
      // Inject the Gemini API key from environment variables so it can be accessed by process.env.API_KEY in the frontend code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || '')
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'genai': ['@google/genai']
          }
        }
      }
    },
    server: {
      port: 3000,
      host: true
    }
  };
});