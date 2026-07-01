'use client';

export function read(key: string, urls: string[]) {
  const entry = map.get(key);
  if (typeof entry === 'boolean') return entry;
  if (entry) throw entry;

  const promise = probe(urls).then((cached) => void map.set(key, cached));
  map.set(key, promise);

  throw promise;
}

export function write(key: string) {
  map.set(key, true);
}

const map = new Map<string, boolean | Promise<void>>();
let sw: Promise<boolean> | null = null;

async function probe(urls: string[]) {
  if (!('serviceWorker' in navigator)) return Promise.resolve(false);

  sw ??= navigator.serviceWorker
    .register('/image-cache.sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
      if (navigator.serviceWorker.controller) return true;

      return new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 1000);
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          clearTimeout(timeout);
          resolve();
        }, {
          once: true,
        });
      }).then(() => Boolean(navigator.serviceWorker.controller));
    })
    .catch(() => false);

  if (!(await sw)) return false;

  const cached = await Promise.all(
    urls.map(async (url) => {
      try {
        return (await fetch(url, { cache: 'only-if-cached', mode: 'same-origin' })).ok;
      } catch {
        return false;
      }
    }),
  );

  return cached.some(Boolean);
}
