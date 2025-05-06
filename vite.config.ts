import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { loadEnv } from "vite";
import dns from "node:dns";

// Prevent DNS resolution issues with localhost
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = mode === 'production';

  return {
    server: {
      host: "::",
      port: 8080,
      // Pre-transform frequently used files for better performance
      warmup: {
        clientFiles: [
          './src/components/ui/**/*.tsx',
          './src/components/Navbar.tsx',
          './src/components/Footer.tsx',
          './src/contexts/ContentfulProductsProvider.tsx',
          './src/contexts/ProductContext.tsx',
          './src/services/contentful.ts',
        ],
      },
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
      'import.meta.env.RESEND_API_KEY': JSON.stringify(env.RESEND_API_KEY),
    },
    optimizeDeps: {
      // Pre-bundle these dependencies to improve page load performance
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'contentful',
        '@contentful/rich-text-react-renderer',
        'lucide-react',
        '@tanstack/react-query',
      ],
    },
    build: {
      // Optimize production build
      target: 'es2015',
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      rollupOptions: {
        output: {
          // Split chunks for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-components': ['@/components/ui'],
            'contentful': ['contentful', '@contentful/rich-text-react-renderer'],
            'animation': ['framer-motion'],
          },
        },
      },
    },
  };
});