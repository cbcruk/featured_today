import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import partytown from '@astrojs/partytown'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  site: 'https://cbcruk.github.io/',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
    partytown(),
  ],
  output: 'server',
  adapter: vercel(),
})
