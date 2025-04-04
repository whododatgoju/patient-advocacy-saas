import { useState, useEffect, useCallback, useRef } from 'react';

// Cache for storing previously fetched data
const dataCache = new Map<string, {
  data: any;
  timestamp: number;
  ttl: number;
}>();

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
  // Time to live in milliseconds, default 5 minutes
  cacheTTL?: number;
  // Whether to use the cache
  useCache?: boolean;
  // Whether to update the cache with the new data
  updateCache?: boolean;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook for optimized data fetching and caching
 * 
 * @param url - The URL to fetch data from
 * @param options - Fetch options including caching configuration
 * @returns FetchState containing data, loading state, and any errors
 */
function useOptimizedFetch<T>(url: string, options: FetchOptions = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    credentials,
    cacheTTL = 300000, // Default 5 minutes
    useCache = true,
    updateCache = true,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const isMounted = useRef(true);
  const abortController = useRef<AbortController | null>(null);

  // Check if we have cached data
  const getCachedData = useCallback(() => {
    if (!useCache) return null;
    
    const cachedItem = dataCache.get(url);
    if (!cachedItem) return null;
    
    // Check if the cached data is still valid
    const now = Date.now();
    if (now - cachedItem.timestamp <= cachedItem.ttl) {
      return cachedItem.data;
    }
    
    // Remove expired cache item
    dataCache.delete(url);
    return null;
  }, [url, useCache]);

  // Cleanup function for aborting fetch requests
  const cleanup = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }
  }, []);

  const fetchData = useCallback(async () => {
    cleanup();
    
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      setState({
        data: cachedData,
        loading: false,
        error: null,
      });
      return;
    }

    // Prepare to fetch
    setState(prev => ({ ...prev, loading: true }));
    abortController.current = new AbortController();
    
    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: abortController.current.signal,
        credentials,
      };

      if (body && method !== 'GET') {
        fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
      }

      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setState({
          data,
          loading: false,
          error: null,
        });
        
        // Update cache if needed
        if (updateCache) {
          dataCache.set(url, {
            data,
            timestamp: Date.now(),
            ttl: cacheTTL,
          });
        }
      }
    } catch (error) {
      // Only update state if error is not from aborting and component is mounted
      if (error.name !== 'AbortError' && isMounted.current) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
  }, [url, method, headers, body, credentials, updateCache, cacheTTL, getCachedData, cleanup]);

  useEffect(() => {
    fetchData();
    
    // Cleanup on unmount or when dependencies change
    return () => {
      isMounted.current = false;
      cleanup();
    };
  }, [fetchData, cleanup]);

  // Function to manually refetch data
  const refetch = useCallback(() => {
    if (isMounted.current) {
      fetchData();
    }
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
}

/**
 * Utility function to manually clear cache
 * 
 * @param url - Optional URL to clear from cache. If not provided, clears entire cache.
 */
export function clearCache(url?: string) {
  if (url) {
    dataCache.delete(url);
  } else {
    dataCache.clear();
  }
}

/**
 * Utility function to prefetch data and store in cache
 * 
 * @param url - The URL to prefetch
 * @param options - Fetch options
 */
export async function prefetchData(url: string, options: FetchOptions = {}) {
  try {
    const {
      method = 'GET',
      headers = {},
      body,
      credentials,
      cacheTTL = 300000,
    } = options;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials,
    };

    if (body && method !== 'GET') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    dataCache.set(url, {
      data,
      timestamp: Date.now(),
      ttl: cacheTTL,
    });
    
    return data;
  } catch (error) {
    console.error('Error prefetching data:', error);
    throw error;
  }
}

export default useOptimizedFetch;
