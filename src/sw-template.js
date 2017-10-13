importScripts('/workbox-sw.js');
//self.workbox.logLevel = self.workbox.LOG_LEVEL.verbose;

const workboxSW = new self.WorkboxSW();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

workboxSW.precache([]);

// webfont-cache
const webFontHandler = workboxSW.strategies.cacheFirst({
  cacheName: 'webfont-cache',
  cacheExpiration: {
    maxEntries: 20
  },
  cacheableResponse: { statuses: [0, 200] }
});
workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)', webFontHandler);
workboxSW.router.registerRoute('https://fonts.gstatic.com/(.*)', webFontHandler);
workboxSW.router.registerRoute('https://use.fontawesome.com/(.*)', webFontHandler);

// get-urls-cache
const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrls/(.*)';
const apiHandler = workboxSW.strategies.networkFirst({
  cacheName: 'get-urls-cache'
});
workboxSW.router.registerRoute(API, apiHandler);

// work-images-cache
workboxSW.router.registerRoute('https://storage.googleapis.com/joanne-lee.appspot.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'work-images-cache',
    cacheExpiration: {
      maxEntries: 60
    },
    cacheableResponse: { statuses: [0, 200] }
  })
);
