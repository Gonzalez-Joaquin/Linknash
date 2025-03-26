/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_NAME: string
  VITE_SERVER_PORT: number
  VITE_PUBLIC_URL: string
  VITE_STAGE: string
  VITE_SONAR_URL: string
  VITE_SONAR_TOKEN: string
  VITE_VERSION: number
  VITE_SENTRY_DSN: string
}

interface ImportMeta extends import("vite/types/importMeta").ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.svg"
