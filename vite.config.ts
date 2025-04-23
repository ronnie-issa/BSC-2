import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Expose environment variables to the client
      'import.meta.env.CONTENTFUL_SPACE_ID': JSON.stringify(env.CONTENTFUL_SPACE_ID),
      'import.meta.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(env.CONTENTFUL_ACCESS_TOKEN),
      'import.meta.env.CONTENTFUL_PREVIEW_TOKEN': JSON.stringify(env.CONTENTFUL_PREVIEW_TOKEN),
      'import.meta.env.CONTENTFUL_ENVIRONMENT': JSON.stringify(env.CONTENTFUL_ENVIRONMENT || 'master'),
    },
  };
});