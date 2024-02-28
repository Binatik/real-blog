import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import ESLintPlugin from "eslint-webpack-plugin";

export default defineConfig({
  source: {
    alias: {
      "@ui": "./src/ui/*",
      "@module": "./src/module/*",
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
