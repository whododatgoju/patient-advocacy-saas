const CACHE_NAME = 'patient-advocacy-cache-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Resources that will be pre-cached (App Shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/main.css', 
  '/static/js/main.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico',
  '/offline.html'
];

// Critical API endpoints to cache
const API_CACHE_URLS = [
  '/api/resources/patient-rights',
  '/api/symptom-categories'
];

// Install event - Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network with cache fallback strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://api.patientadvocacy.com')) {
    return;
  }

  // For API requests - Network first with cache fallback
  if (event.request.url.includes('/api/')) {
    // Check if it's a critical API endpoint
    const isCriticalApi = API_CACHE_URLS.some(url => 
      event.request.url.includes(url)
    );

    if (isCriticalApi) {
      return event.respondWith(
        fetch(event.request)
          .then(response => {
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            return caches.match(event.request);
          })
      );
    }
  }

  // For navigation requests - Cache first with network fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then(cache => {
                cache.put(event.request, responseToCache);
              });

              return response;
            })
            .catch(() => {
              // If offline and no cache, show offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // For static assets - Cache first with network fallback
  if (event.request.destination === 'style' || 
      event.request.destination === 'script' || 
      event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then(cache => {
                cache.put(event.request, responseToCache);
              });
              
              return response;
            });
        })
    );
    return;
  }

  // Default fetch behavior for all other requests
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // For symptom tracking and health journal pages, show specific fallback
        if (event.request.url.includes('/journal')) {
          return caches.match('/offline-journal.html');
        }
        
        // For resources pages, show resources fallback
        if (event.request.url.includes('/resources')) {
          return caches.match('/offline-resources.html');
        }
        
        return caches.match('/offline.html');
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-symptoms') {
    event.waitUntil(syncSymptoms());
  } else if (event.tag === 'sync-journal') {
    event.waitUntil(syncJournal());
  }
});

// Function to sync symptoms data when back online
function syncSymptoms() {
  return idb.open('patient-advocacy-db')
    .then(db => {
      const tx = db.transaction('offline-symptoms', 'readonly');
      const store = tx.objectStore('offline-symptoms');
      
      return store.getAll();
    })
    .then(symptoms => {
      return Promise.all(symptoms.map(symptom => {
        return fetch('/api/symptoms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(symptom)
        })
        .then(response => {
          if (response.ok) {
            // Remove from IndexedDB after successful sync
            return idb.open('patient-advocacy-db')
              .then(db => {
                const tx = db.transaction('offline-symptoms', 'readwrite');
                const store = tx.objectStore('offline-symptoms');
                store.delete(symptom.id);
                return tx.complete;
              });
          }
        });
      }));
    });
}

// Function to sync journal entries when back online
function syncJournal() {
  return idb.open('patient-advocacy-db')
    .then(db => {
      const tx = db.transaction('offline-journal', 'readonly');
      const store = tx.objectStore('offline-journal');
      
      return store.getAll();
    })
    .then(entries => {
      return Promise.all(entries.map(entry => {
        return fetch('/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry)
        })
        .then(response => {
          if (response.ok) {
            // Remove from IndexedDB after successful sync
            return idb.open('patient-advocacy-db')
              .then(db => {
                const tx = db.transaction('offline-journal', 'readwrite');
                const store = tx.objectStore('offline-journal');
                store.delete(entry.id);
                return tx.complete;
              });
          }
        });
      }));
    });
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    const urlToOpen = event.notification.data.url;
    
    event.waitUntil(
      clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then(windowClients => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window/tab is open, open one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});
