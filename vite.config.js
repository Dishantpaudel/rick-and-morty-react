import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const resolvedDirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          environment: 'jsdom',
          globals: true,
          setupFiles: './src/setupTests.js',
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(resolvedDirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright', // Simplified provider call
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
