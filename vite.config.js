import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/__test__/**/*.{js,jsx}"],
    exclude: ["**/setupTests.js", "**/App.jsx", "**/main.jsx"],
    coverage: {
      include: ["src/**/*.{js}"],
      exclude: ["src/setupTests.js", "src/App.jsx", "src/main.jsx"],
    },
  },
});
