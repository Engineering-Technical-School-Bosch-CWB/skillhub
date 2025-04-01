import { defineConfig, ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

const isProd = process.env.NODE_ENV === "production";

const prodOptions: ServerOptions = {
  port: 20041,
  host: '10.234.192.30',
  allowedHosts: [
    'ctp-ets.br.bosch.com'
  ]
}

const devOptions: ServerOptions = {

}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/SkillHub/",
  server: isProd ? prodOptions : devOptions,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
