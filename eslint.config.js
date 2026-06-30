import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      tseslint.configs.recommended,

      eslintJs.configs.recommended,
      eslintReact.configs["recommended-typescript"],

      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    // Configure language/parsing options
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        projectServices: true,
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
      "@eslint-react/no-missing-key": "warn",
      "@eslint-react/naming-convention-context-name": "error",
      "react-debug/hook": "error",
    },
  },
]);
