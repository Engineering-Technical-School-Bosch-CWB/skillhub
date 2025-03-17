import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/SkillHub/",
  server: {
    port: 20041,
    host: '10.234.192.30',
    allowedHosts: [
      'ctp-ets.br.bosch.com'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
