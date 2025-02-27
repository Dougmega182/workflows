import { defineConfig } from 'vite';

export default defineConfig({
  base: "./", // Ensures correct relative paths
  build: {
    outDir: "build",
    assetsDir: "assests",  // Moves assets to dist/static instead of dist/assets
  },
});
