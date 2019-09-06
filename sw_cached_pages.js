const cacheName = 'v4';
const cacheAssets = [ 'index.html', 'about.html', 'css/style.css', '/js/main.js' ];

// Call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker : Installed');

  //Put files in cache
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files...');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Call activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker : Activated');

  //remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call fetch event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching...');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
