import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FinanceCore',
      fileName: (format) => (format === 'es' ? 'sdk.js' : 'sdk.umd.cjs'),
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [], // put peer deps here if needed
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outputDir: 'dist/types',
    }),
  ],
});
