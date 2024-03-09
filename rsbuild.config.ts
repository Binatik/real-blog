import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import ESLintPlugin from "eslint-webpack-plugin";

export default defineConfig({
  source: {
    alias: {
      "@validations": "./src/validations/*",
      "@ui": "./src/ui/*",
      "@module": "./src/module/*",
      "@page": "./src/page/*",
      "@layout": "./src/layout/*",
      "@hooks": "./src/hooks/*",
      "@assets": "./src/assets/*",
      "@api": "./src/api/*",
      "@src": "./src/*",
    },
  },
  html: {
    title: "Real-blog",
  },
  plugins: [pluginReact()],
  tools: {
    bundlerChain(chain) {
      chain.plugin("eslint-plugin").use(ESLintPlugin, [
        {
          extensions: [".js", ".ts", ".jsx", "tsx", ".mjs", ".cjs"],
        },
      ]);
    },
  },
});
