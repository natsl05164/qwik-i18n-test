import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {i18nPlugin} from 'vite-plugin-static-i18n/vite'

export default defineConfig(() => {
  return {
    plugins: [	i18nPlugin({
			locales: ['en', 'nl'],
      defaultLocale : "en",
			// For Qwik, browser assets are under /build. For other frameworks that differs
			// Leave out if all output is for the browser
			assetsDir: 'build',
		}),qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
