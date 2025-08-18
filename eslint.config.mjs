import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@typescript-eslint/recommended", "prettier"),
  {
    rules: {
      "no-unneeded-ternary": "error",
      "prefer-const": "error",
      "no-nested-ternary": "error",
      "react/no-unused-state": ["error"],
      "react/no-unescaped-entities": ["off"],
      "react/no-direct-mutation-state": ["error"],
      "react/button-has-type": ["error"],
      "require-await": "error",
      "no-param-reassign": "error",
      "no-mixed-operators": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-lonely-if": "error",
      "default-case": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "import/order": ["error", { groups: ["builtin", "external", "internal"] }],
    },
  },
];

export default eslintConfig;
