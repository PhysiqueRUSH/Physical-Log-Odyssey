// Changement de nom de cache pour forcer la mise à jour
const CACHE_NAME = 'plo-cache-v7';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './plo-ico.png', // AJOUT DE L'ICÔNE AU CACHE
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});

// Optionnel : Nettoyer les anciens caches lors de l'activation
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
