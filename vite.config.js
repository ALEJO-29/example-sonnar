import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/__tests__/**/*.{js,jsx}"],
    exclude: ["**/setupTests.js"],
    coverage: {
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.js"],
      exclude: ["src/setupTests.js", "**/*.jsx"],
    },
  },
});
