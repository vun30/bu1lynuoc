import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Fake process + process.version
    "process.env": JSON.stringify({}),
    "process.version": JSON.stringify("v18.18.0"),
    "process.versions": JSON.stringify({ node: "18.18.0" }),
    // Nhiều package đọc globalThis.process (đặc biệt là axios, dayjs)
    "globalThis.process": {
      version: "v18.18.0",
      versions: { node: "18.18.0" },
      env: {},
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor libraries
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "vendor-react";
            }
            if (id.includes("antd")) {
              return "vendor-antd";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("@tinymce")) {
              return "vendor-editor";
            }
            // Other node_modules
            return "vendor-other";
          }

          // Split by service layer
          if (id.includes("/src/services/customer/")) {
            return "services-customer";
          }
          if (id.includes("/src/services/seller/")) {
            return "services-seller";
          }
          if (id.includes("/src/services/admin/")) {
            return "services-admin";
          }
          if (id.includes("/src/services/staff/")) {
            return "services-staff";
          }

          // Split by page
          if (id.includes("/src/pages/Customer/")) {
            return "pages-customer";
          }
          if (id.includes("/src/pages/Seller/")) {
            return "pages-seller";
          }
          if (id.includes("/src/pages/Admin/")) {
            return "pages-admin";
          }
          if (id.includes("/src/pages/StoreStaff/")) {
            return "pages-staff";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: "esbuild",
  },
});
