import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure it looks for `index.html` in the correct location
  build: {
    outDir: "dist",
  },
});
