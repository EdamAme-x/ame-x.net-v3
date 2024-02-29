import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";
const PORT = 8080;


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno({
    port: PORT
  }),
  server: {
    port: PORT
  },
  integrations: [react(), tailwind(), sitemap(), robotsTxt(), compress()],
  site: "https://ame-x.net",
  resolve: {
    alias: {
      crypto: 'crypto-js'
    }
  }
});