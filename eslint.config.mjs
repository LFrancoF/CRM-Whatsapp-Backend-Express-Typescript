import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import importPlugin from 'eslint-plugin-import';
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.recommended
});

export default [
    ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
    importPlugin.flatConfigs.recommended,
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 12,
            sourceType: "module",
        },

        settings: {
            "import/resolver": {
                typescript: {},
            },
        },

        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",

            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "_",
            }],
            "@typescript-eslint/no-inferrable-types": "off",
            "import/prefer-default-export": "off",
            "no-console": "off",
            "no-param-reassign": "off",
            "prettier/prettier": "error",

            "import/extensions": ["error", "ignorePackages", {
                ts: "never",
            }],
            "quotes": ["error", "single", {
                "avoidEscape": true,
            }],
            "prettier/prettier": [
                "error",
                {
                    "singleQuote": true,
                    "tabWidth": 4,
                    "endOfLine": "auto",
                    "trailingComma": "none"
                },
            ]
        },
    },
    {
        ignores: ["**/*.json", "**/*.mjs", "node_modules", "dist"]
    }
];