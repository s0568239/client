var cacheName = 'task-manager-pwa';
var urlsToCache = [
    '/',
];

// Install service worker
self.addEventListener('install', event => {
    // Perform the install steps
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return the requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('task-manager-pwa').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// Update service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['task-manager-pwa'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});