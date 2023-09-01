// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
    serve:{
      port: 3791
    }
  }

  if (command !== 'serve') {
    config.base = '/devitrak-consumer-app/'
  }

  return config
})