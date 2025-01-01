import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// This configuration is optimized for Vercel deployment with React
export default defineConfig({
  // React plugin handles JSX and enables Fast Refresh
  plugins: [react()],

  // Configure the build output directory and asset handling
  build: {
    // Specify where built files will be stored
    outDir: "dist",

    // Generate source maps for better debugging
    sourcemap: true,

    // Optimize the build for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor dependencies separately for better caching
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  // Configure the development server
  server: {
    // Enable hot module replacement
    hmr: true,

    // Configure CORS for development
    cors: true,

    // Set port (matches the one mentioned in your CORS settings)
    port: 5173,
  },

  // Handle environment variables and base URL
  base: "/",

  // Resolve path aliases for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
