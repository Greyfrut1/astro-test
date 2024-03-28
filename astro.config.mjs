import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import slugify from './slugify.js';

export default defineConfig({
  integrations: [react()],
  renderers: ['@astrojs/renderer-react', '@astrojs/renderer-astro/client'],
  markdownOptions: {
    render: [
      '@astrojs/renderer-markdown',
      {
        remarkPlugins: [
          [
            'remark-slug',
            {
              slugify,
            },
          ],
        ],
      },
    ],
  },
  vite: {
    ssr: {
      external: ['@astrojs/renderer-astro/client'],
    },
  },
  buildOptions: {
    pageDirectories: [
      {
        path: './src/pages',
        flat: true,
      },
    ],
  },
});