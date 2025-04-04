// PWA registration and utility functions

/**
 * Extended ServiceWorkerRegistration interface to include background sync
 */
interface ExtendedServiceWorkerRegistration extends ServiceWorkerRegistration {
  sync?: {
    register(tag: string): Promise<void>;
  };
}

/**
 * Register the service worker for PWA functionality
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Set up periodic background sync if supported
          setupBackgroundSync(registration as ExtendedServiceWorkerRegistration);
          
          // Set up push notifications if supported
          setupPushNotifications(registration);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
};

/**
 * Check if the app can be installed (PWA criteria met)
 * @returns Promise<boolean>
 */
export const canInstallPWA = async (): Promise<boolean> => {
  if (!window.matchMedia('(display-mode: browser)').matches) {
    // Already installed
    return false;
  }
  
  // Check if the app meets PWA criteria
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      return registrations.length > 0;
    } catch (error) {
      console.error('Error checking service worker registrations:', error);
      return false;
    }
  }
  
  return false;
};

/**
 * Setup background sync for offline functionality
 * @param registration - ServiceWorkerRegistration object
 */
const setupBackgroundSync = (registration: ExtendedServiceWorkerRegistration) => {
  if (registration.sync) {
    // Register sync for symptoms
    navigator.serviceWorker.ready
      .then(swRegistration => {
        // Register for symptom data syncing
        return (swRegistration as ExtendedServiceWorkerRegistration).sync?.register('sync-symptoms') || Promise.resolve();
      })
      .catch(error => {
        console.error('Error registering background sync:', error);
      });
    
    // Register sync for journal entries
    navigator.serviceWorker.ready
      .then(swRegistration => {
        return (swRegistration as ExtendedServiceWorkerRegistration).sync?.register('sync-journal') || Promise.resolve();
      })
      .catch(error => {
        console.error('Error registering background sync:', error);
      });
  }
};

/**
 * Setup push notifications
 * @param registration - ServiceWorkerRegistration object
 */
const setupPushNotifications = (registration: ServiceWorkerRegistration) => {
  if ('Notification' in window && 'PushManager' in window) {
    // We'll request permission when the user interacts with a feature that requires notifications
    console.log('Push notifications are supported');
    
    // Initialize push manager if needed in the future
    if (registration && registration.pushManager) {
      // Future push notification setup can be implemented here
    }
  }
};

/**
 * Request permission for push notifications
 * @returns Promise<boolean> - Whether permission was granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission === 'denied') {
    console.warn('Notification permission was denied');
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Subscribe to push notifications
 * @param topic - Topic to subscribe to (e.g., 'appointments', 'medication-reminders')
 * @returns Promise<boolean> - Whether subscription was successful
 */
export const subscribeToPushNotifications = async (topic: string): Promise<boolean> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return false;
  }
  
  try {
    const permission = await requestNotificationPermission();
    if (!permission) {
      return false;
    }
    
    const registration = await navigator.serviceWorker.ready;
    
    // Get the subscription if it exists or create a new one
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Get the server's public key for VAPID
      const response = await fetch('/api/notifications/public-key');
      const data = await response.json();
      
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey)
      });
    }
    
    // Send the subscription to the server with the topic
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription,
        topic
      })
    });
    
    return true;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return false;
  }
};

/**
 * Create an install prompt for the PWA
 * @returns A function to show the install prompt
 */
export const useInstallPrompt = () => {
  let deferredPrompt: any = null;
  
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser install prompt
    e.preventDefault();
    // Save the event to use later
    deferredPrompt = e;
  });
  
  // Function to show the install prompt
  const showInstallPrompt = async () => {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    // We can only use the prompt once, discard it
    deferredPrompt = null;
  };
  
  return showInstallPrompt;
};

/**
 * Check if the app is being used in standalone mode (installed PWA)
 * @returns boolean
 */
export const isRunningStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

/**
 * Convert a base64 string to a Uint8Array for push subscription
 * @param base64String - Base64 encoded string
 * @returns Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

/**
 * Utility to save data to IndexedDB for offline storage
 * @param storeName - Name of the IndexedDB store
 * @param data - Data to store
 * @returns Promise<void>
 */
export const saveToOfflineStorage = async (
  storeName: 'offline-symptoms' | 'offline-journal', 
  data: any
): Promise<void> => {
  // This function requires idb library, which we'll add below
  if (!('indexedDB' in window)) {
    console.error('IndexedDB not supported');
    return;
  }
  
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.add(data);
    
    // Use the oncomplete event instead of the .complete property
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error(`Error saving to ${storeName}:`, error);
  }
};

/**
 * Get data from offline storage
 * @param storeName - Name of the IndexedDB store
 * @returns Promise<any[]> - Array of stored items
 */
export const getFromOfflineStorage = async (
  storeName: 'offline-symptoms' | 'offline-journal'
): Promise<any[]> => {
  if (!('indexedDB' in window)) {
    console.error('IndexedDB not supported');
    return [];
  }
  
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Error getting from ${storeName}:`, error);
    return [];
  }
};

/**
 * Open the IndexedDB database
 * @returns Promise<IDBDatabase>
 */
async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('patient-advocacy-db', 1);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains('offline-symptoms')) {
        db.createObjectStore('offline-symptoms', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('offline-journal')) {
        db.createObjectStore('offline-journal', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Export other PWA-related functions as needed
