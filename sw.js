// Service Worker pour Taxi Driver Courchevel
// Important: le site est servi sous /taxi/ (GitHub Pages project site)
const CACHE_NAME = 'taxi-driver-v2';
const APP_BASE_PATH = '/taxi/';
const urlsToCache = [
    'index.html',
    'styles.css',
    'script.js',
    'i18n.js',
    'manifest.json',
    'van.png'
];

function toScopedUrl(path) {
    return new URL(path, self.registration.scope).href;
}

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache.map(toScopedUrl)))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Cache first, then network
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(event.request.url);

    // Ignore les requêtes externes
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    // Ne gère que les requêtes de l'application /taxi/
    if (!requestUrl.pathname.startsWith(APP_BASE_PATH)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a success response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Fallback minimal sur la home pour les navigations
                        if (event.request.mode === 'navigate') {
                            return caches.match(toScopedUrl('index.html'));
                        }

                        return new Response('Erreur de connexion. Veuillez vérifier votre connexion internet.', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker enregistré');
