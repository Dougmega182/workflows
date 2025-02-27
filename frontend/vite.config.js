import { defineConfig } from 'vite';

export default defineConfig({
  base: "./", // Ensures correct relative paths
  build: {
    outDir: "dist",  // Use dist/ as output folder
    assetsDir: "assets",  // Puts JS/CSS inside dist/assets
  },
});
