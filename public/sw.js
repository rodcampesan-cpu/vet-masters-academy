// Service Worker básico para permitir instalação do PWA
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Apenas deixa as requisições passarem normalmente
  event.respondWith(fetch(event.request));
});
