module.exports = {
  root: true,
  ignorePatterns: [ '*.config.js', '.eslintrc.js', 'dist/**/*' ],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  parserOptions: {
    // parser: "@typescript-eslint/parser",
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    'max-len': ['warn', { code: 120, ignoreComments: true }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    semi: ["error", "always"]
    // "prettier/prettier": [
    //   'warn',
    //   {
    //     singleQuote: true,
    //     semi: true,
    //     trailingComma: 'none',
    //     printWidth: 120,
    //     bracketSpacing: true
    //   }
    // ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
