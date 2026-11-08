import { fileURLToPath } from "node:url";
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@/lib/external': fileURLToPath(new URL('../web/lib/external', import.meta.url)),
      '@/lib/security': fileURLToPath(new URL('../web/lib/security', import.meta.url)),
      '@/lib/calculation': '../web/lib/calculation',
      '@/types': '../web/types',
    },
  },
});
