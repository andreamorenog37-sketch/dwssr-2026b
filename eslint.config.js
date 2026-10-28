import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Ignorar archivos/carpetas
  {
    ignores: [
      "dist/**",
      "node_modules/**" // Corregido: "node_" incompleto
    ]
  },

  // 2. Reglas globales para JS recomendadas
  js.configs.recommended,

  // 3. Configuración de Vite
  {
    files: ["vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    }
  },

  // 4. Configuración del Back-end
  {
    files: ["server/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  },

  // 5. Configuración del Front-end y archivos src/
  {
    files: ["src/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }]
    }
  },

  // 6. Configuración opcional para archivos en public/
  {
    files: ["public/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    }
  }
]);