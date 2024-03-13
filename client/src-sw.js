const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

registerRoute( // if user working offline, cache assets
  ({ request }) => ['style', 'script', 'worker', 'assets', 'icons'].includes(request.destination),
  new CacheFirst({ // cache assets using the CacheFirst strategy
    cacheName: 'asset-cache', 
    plugins: [ // add CacheableResponsePlugin and ExpirationPlugin to the CacheFirst strategy
      new CacheableResponsePlugin({
        statuses: [0, 200], // cacheable response status codes
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // expiration time for the cache
      }),
    ],
  })
);
