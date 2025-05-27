import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   hmr: {
  //     overlay: false,
  //     // Use polling for file changes
  //     watch: {
  //       usePolling: true,
  //     },
  //   },
  // }
})

