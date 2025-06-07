import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default {
  plugins: [
    react({
      jsxRuntime: "automatic", // <- THIS IS REQUIRED
    }),
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
};
