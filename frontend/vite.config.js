import { defineConfig } from 'vite';

export default defineConfig({
  base: "./", // Ensures correct relative paths
  build: {
    outDir: "dist",
    assetsDir: "static",  // Moves assets to dist/static instead of dist/assets
  },
});
