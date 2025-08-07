import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import locatorBabel from "@locator/babel-jsx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [locatorBabel],
      },
    }),
  ],
});
