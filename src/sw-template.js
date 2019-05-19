importScripts('/workbox-sw.js');
//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute([]);

// app-shell
workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(/^\/$|home|profile|work|contact/, new workbox.strategies.NetworkFirst());

// webfont-cache
const webFontHandler = new workbox.strategies.CacheFirst({
  cacheName: 'webfont-cache',
  plugins: [
    new workbox.expiration.Plugin({maxEntries: 20}),
    new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
  ],
});
workbox.routing.registerRoute(/https:\/\/fonts.googleapis.com\/.*/, webFontHandler);
workbox.routing.registerRoute(/https:\/\/fonts.gstatic.com\/.*/, webFontHandler);
workbox.routing.registerRoute(/https:\/\/use.fontawesome.com\/.*/, webFontHandler);

// get-urls-cache
const API = /https:\/\/us-central1-joanne-lee.cloudfunctions.net\/getUrls\/.*/;
const apiHandler = new workbox.strategies.NetworkFirst({
  cacheName: 'get-urls-cache'
});
workbox.routing.registerRoute(API, apiHandler);

// work-images-cache
workbox.routing.registerRoute(/https:\/\/storage.googleapis.com\/joanne-lee.appspot.com\/.*/,
  new workbox.strategies.CacheFirst({
    cacheName: 'work-images-cache',
    plugins: [
      new workbox.expiration.Plugin({maxEntries: 60}),
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
    ],
  })
);
