self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('finances').then((cache) => cache.addAll([
      '/finances/',
      '/finances/index.html',
      '/finances/index.js',
      '/finances/style.css',
      '/finances/icons/about.svg',
      '/finances/icons/archives.svg',
      '/finances/icons/cassette.svg',
      '/finances/icons/house.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  // console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
