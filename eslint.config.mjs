// ESLint flat config.
//
// Built from the same plugins eslint-config-next uses (React, Hooks, jsx-a11y, typescript-eslint)
// but without @next/eslint-plugin-next, whose fast-glob → micromatch → braces chain has an
// unpatched advisory (GHSA-vfj7-8cjw-p6xm). The two Next rules that matter for an App Router
// site are re-created below with no-restricted-syntax.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
  { ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs,jsx}"],
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/prop-types": "off",
      "react/no-unknown-property": ["error", { ignore: ["fetchPriority"] }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // Equivalents of @next/next/no-img-element and @next/next/no-html-link-for-pages
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='img']",
          message: "Use next/image instead of <img> for optimised, responsive images.",
        },
        {
          selector: "JSXOpeningElement[name.name='a'] > JSXAttribute[name.name='href'] > Literal[value=/^\\/(?!\\/)/]",
          message: "Use next/link for internal links instead of <a href=\"/...\">.",
        },
      ],
    },
  },
);
