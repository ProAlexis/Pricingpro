import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("docx")) return "vendor-docx";
            if (
              id.includes("jspdf") ||
              id.includes("html2canvas") ||
              id.includes("pako")
            ) {
              return "vendor-pdf";
            }
            if (id.includes("recharts") || id.includes("d3")) {
              return "vendor-charts";
            }
            if (id.includes("@supabase")) return "vendor-supabase";

            return "vendor-core";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
