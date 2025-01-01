import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",
    sourcemap: true,

    // Ensure assets are handled correctly
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  server: {
    hmr: true,
    cors: true,
    port: 5173,
  },

  // This is crucial for client-side routing
  base: "/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
