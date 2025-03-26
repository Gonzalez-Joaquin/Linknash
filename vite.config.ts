import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.VITE_SERVER_PORT}`,
          changeOrigin: true,
          secure: false,
          ws: true
        }
      },
      watch: {
        usePolling: true
      }
    }
  })
}
