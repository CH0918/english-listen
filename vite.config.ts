import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.lrc'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.lrc', '.flac'],
  },
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: `https://netease-cloud-music-api-red-eta.vercel.app`,
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [Icons({ compiler: 'jsx', jsx: 'react' }), Unocss(), react()],
});
