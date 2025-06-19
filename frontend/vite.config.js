import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default {
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  server: {
    host: true,
    watch: {
      usePolling: false,
    },
    allowedHosts: ["all"],
  },
};
