import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // No 'root' property here
  // No 'base' or it should be base: '/'
})
