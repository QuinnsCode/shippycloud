import dns from 'dns'

import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

import redwood from '@redwoodjs/vite'

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim')

/** @type {import('vite').UserConfig} */
const viteConfig = {
  plugins: [redwood(), tailwindcss()],
  server: {
    allowedHosts: ['localhost', '.ngrok-free.app'],
  },
}

export default defineConfig(viteConfig)
