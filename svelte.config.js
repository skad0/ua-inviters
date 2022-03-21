import sveltePreprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import { createRequire } from "module";
import svg from "@poppanator/sveltekit-svg";

const require = createRequire(import.meta.url);

const pkg = require("./package.json");

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    babel: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: false,
            // No need for babel to resolve modules
            modules: false,
            targets: {
              // ! Very important. Target es6+
              esmodules: true,
            },
          },
        ],
      ],
    },
    postcss: true,
  }),
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node(),

    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
      plugins: [svg()],
    },
  },
};
