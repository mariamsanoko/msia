import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://msia.github.io',
  base: '/msia',

  adapter: node({
    mode: 'standalone'
  })
});