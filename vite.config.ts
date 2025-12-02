import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    target: "es2017", // smaller & modern JS output
    minify: "esbuild", // default, but explicitly fastest
    cssMinify: true, // ensure CSS is minified
    sourcemap: false, // reduce bundle size
    reportCompressedSize: false, // faster builds
    chunkSizeWarningLimit: 600, // avoid unnecessary warnings

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // better caching for vendor libs
        },
      },
    },
  },
});
