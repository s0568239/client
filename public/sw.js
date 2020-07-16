var cacheName = 'mensa';


// Install service worker
self.addEventListener('install', event => {
    // Perform the install steps
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll([
                    '/',
                    
                ]);
            })
    );
});


// Cache and return the requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('mensa').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });

// Update service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});