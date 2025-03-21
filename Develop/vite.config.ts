import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 to allow external access
    port: 5173, // Specify the port
    allowedHosts: ['ku-13-candidate-search.onrender.com'],
  },
});