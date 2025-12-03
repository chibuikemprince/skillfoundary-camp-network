/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ORIGIN_CLIENT_ID?: string;
  readonly REACT_APP_ORIGIN_CLIENT_ID?: string;
  // add other env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
