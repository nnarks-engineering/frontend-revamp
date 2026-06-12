import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "*.config.ts", "src/routeTree.gen.ts"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],

    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },

    rules: {
      // ── TypeScript ──────────────────────────────────────────────────────
      "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports below
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // ── Unused imports / vars ───────────────────────────────────────────
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ── Import order ────────────────────────────────────────────────────
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // ── No TypeScript enums — use const objects instead ─────────────────
      // Covered by the lint-check script; add as a custom lint warning here:
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message:
            "Do not use TypeScript enums. Use a `const` object + type instead: " +
            "export const Foo = { a: 'a' } as const; export type Foo = typeof Foo[keyof typeof Foo]",
        },
      ],

      // ── No exported interfaces/types inside .tsx files ──────────────────
      // (Interfaces belong in types/{domain}/*.types.ts)
      // Enforced via lint-check.ts script — kept here as a reminder comment.

      // ── No default exports (except route/page files) ────────────────────
      "import/no-default-export": "warn",

      // ── General quality ─────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "react-refresh/only-export-components": "off",
    },
  },

  // ── Route / page files may use default exports & export non-components ──
  {
    files: [
      "src/routes/**/*.{ts,tsx}",
      "src/pages/**/*.{ts,tsx}",
      "src/components/landing/**/*.{ts,tsx}",
      "src/components/ui/world-map.tsx",
      "src/components/world-map-demo.tsx",
      "src/app/i18n/i18n.ts",
      "*.config.{ts,js}",
      "vite.config.ts",
      "scripts/**/*.ts"
    ],
    rules: {
      "import/no-default-export": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off"
    },
  },

  // ── Context files export hooks alongside providers ──────────────────────
  {
    files: ["src/shared/contexts/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  // ── UI library components (shadcn) — co-located types are acceptable ────
  // Inline type check in lint-check.ts excludes components/ui/ files.
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
