import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'FinanceCore',
       fileName: (format) =>
      format === 'es' ? 'sdk.esm.js' : 'sdk.cjs.js',
       formats: ['es', 'cjs'],
    },
    rollupOptions: {
      treeshake: false, // ⬅ reduces helper vars (_a, _b)
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outputDir: 'dist/types',
    }),
  ],
});
