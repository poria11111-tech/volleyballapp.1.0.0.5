
const CACHE_NAME = "volley-app-cache-v1";
const OFFLINE_URL = "offline.html";

// Dynamically generated file list later if needed
const ASSETS = [
  "/volleyballapp.1.0.0.4/manifest.webmanifest",
  "/volleyballapp.1.0.0.4/service-worker.js",
  "/volleyballapp.1.0.0.4/offline.html",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/index.html",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/manifest.json",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/manifest.webmanifest",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/offline.html",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/pwa-bootstrap.js",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/pwa-tweak.css",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/service-worker.js",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/sw.js",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-128.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-144.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-152.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-192.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-256.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-384.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-48.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-512.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-72.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-96.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-maskable-192.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-maskable-512.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-mono-192.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/assets/icons/icon-mono-512.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-192.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-256.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-384.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-512.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-maskable-192.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-maskable-256.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-maskable-384.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/icon-maskable-512.png",
  "/volleyballapp.1.0.0.4/pwa_refit_mobile_only_v3/icons/logo.png",
  "/volleyballapp.1.0.0.4/icons/icon-192.png",
  "/volleyballapp.1.0.0.4/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
