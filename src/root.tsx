import { component$ ,useTask$,} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isServer } from '@builder.io/qwik/build';
import "./global.css";
import { setLocaleGetter} from 'vite-plugin-static-i18n'
// import {currentLocale} from '@i18n/__state'

export function getCookie(cookieName) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split('; ');

  // Iterate through the cookies to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [name, value] = cookie.split('=');

      // Trim leading and trailing whitespaces
      const trimmedName = name.trim();

      // Check if the current cookie is the one we're looking for
      if (trimmedName === cookieName) {
          // Decode and return the cookie value
          return decodeURIComponent(value);
      }
  }

  // Return null if the cookie is not found
  return null;
}

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useTask$(({cleanup}) => {
    if (isServer) {
      return; // Server guard
    }

    // if (typeof document !== 'undefined')  {
    //   const lang = document.documentElement.lang
    //   console.log("document " , lang); // this get correct value, but at runtime it still getting defaultLocale
    //    currentLocale = lang
    // }

    setLocaleGetter(()=>{ 
      // this only works in dev. 
      const c = getCookie("locale");
      return c;
    })
  },{eagerness:"load"});
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
