/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import {defaultLocale, setLocaleGetter} from 'vite-plugin-static-i18n'
import { getLocale } from '@builder.io/qwik';
setLocaleGetter(() => getLocale(defaultLocale))
import type { RenderOptions } from '@builder.io/qwik';

// Base path for assets, e.g. /build/en
const extractBase = ({serverData}: RenderOptions): string => {
	if (import.meta.env.DEV) {
		return '/build'
	} else {
		return '/build/' + serverData!.locale
	}
}
export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    base: extractBase,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang:  opts.serverData!.locale,
      ...opts.containerAttributes,
    },
  });
}
