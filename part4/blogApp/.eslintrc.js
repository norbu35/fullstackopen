module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
  },
};
