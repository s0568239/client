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
    event.respondWith(fetch(event.request));
    // or simply don't call event.respondWith, which
    // will result in default browser behaviour
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