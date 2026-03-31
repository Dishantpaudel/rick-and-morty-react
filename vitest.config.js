import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    pool: 'threads',
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['src/**/*.stories.*', '.storybook/**'],
  },
});
