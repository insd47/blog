self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.cache !== 'only-if-cached') return;
  if (url.origin !== location.origin) return;
  if (url.pathname !== '/_next/image') return;

  event.respondWith(fetch(event.request).catch(() => new Response(null, { status: 304 })));
});
