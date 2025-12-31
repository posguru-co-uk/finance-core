import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'sdk.esm.js' : 'sdk.cjs',
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
