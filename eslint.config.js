import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactEslint from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "build", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      react: reactEslint,
      "unused-imports": unusedImports,
    },

    rules: {
      "react/display-name": "off",
      "unused-imports/no-unused-imports": "error",
      "no-duplicate-imports": "error",
      "react-refresh/only-export-components": "off",

      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],

      "react/self-closing-comp": [
        "warn",
        {
          component: true,
          html: true,
        },
      ],

      "no-restricted-syntax": [
        "warn",
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|warn)$/]",
          message: "Unexpected property on console object was called. Only console.error or console.warn are allowed.",
        },
      ],

      curly: ["error", "all"],
    },
  },
]);
