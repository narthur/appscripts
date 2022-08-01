import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      treeshake: false
    },
    minify: false,
    lib: {
      entry: '/src/index.ts',
      name: 'code',
      fileName: 'code',
      formats: ['cjs']
    }
  }
});
