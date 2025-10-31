import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ include: "./build" })],
  build: {
    lib: {
      entry: resolve(__dirname, "build/vue-setup-extend.ts"),
      name: "vueSetupExtend",
      fileName: (format) => `vue-setup-extend.${format}.js`,
    },
    rollupOptions: {
      external: ["vite", "vue/compiler-sfc"],
      output: {
        globals: {
          vite: "Vite",
          "vue/compiler-sfc": "VueCompilerSfc",
        },
      },
    },
  },
});
