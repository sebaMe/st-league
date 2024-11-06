import jsLint from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import twPlugin from "eslint-plugin-tailwindcss";
import vuePlugin from "eslint-plugin-vue";
import globals from "globals";
import tsLint from "typescript-eslint";

import customPrettierRules from "./prettier.config.mjs";

export default [
  { files: ["**/*.{js,mjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  ...twPlugin.configs["flat/recommended"],
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: { parserOptions: { parser: tsLint.parser } },
    rules: {
      "tailwindcss/no-custom-classname": 0
    }
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSortPlugin
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  },
  prettierPlugin,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          ...customPrettierRules
        }
      ]
    }
  }
];
