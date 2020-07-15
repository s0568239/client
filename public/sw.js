var cacheName = 'task-manager-pwa';


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
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

// Update service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['task-manager-pwa'];
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