/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_MONITORING_HOST: string
  readonly VITE_MONITORING_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
