importScripts('/workbox-sw.js');
//self.workbox.logLevel = self.workbox.LOG_LEVEL.verbose;

const w = new self.WorkboxSW();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

w.precache([]);

// app-shell
//w.router.registerNavigationRoute('/index.html');
w.router.registerRoute('/', w.strategies.networkFirst());
w.router.registerRoute(/^\/$|home|profile|work|contact/, w.strategies.networkFirst());

// webfont-cache
const webFontHandler = w.strategies.cacheFirst({
  cacheName: 'webfont-cache',
  cacheExpiration: {
    maxEntries: 20
  },
  cacheableResponse: { statuses: [0, 200] }
});
w.router.registerRoute('https://fonts.googleapis.com/(.*)', webFontHandler);
w.router.registerRoute('https://fonts.gstatic.com/(.*)', webFontHandler);
w.router.registerRoute('https://use.fontawesome.com/(.*)', webFontHandler);

// get-urls-cache
const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrls/(.*)';
const apiHandler = w.strategies.networkFirst({
  cacheName: 'get-urls-cache'
});
w.router.registerRoute(API, apiHandler);

// work-images-cache
w.router.registerRoute('https://storage.googleapis.com/joanne-lee.appspot.com/(.*)',
  w.strategies.cacheFirst({
    cacheName: 'work-images-cache',
    cacheExpiration: {
      maxEntries: 60
    },
    cacheableResponse: { statuses: [0, 200] }
  })
);
