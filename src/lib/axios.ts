import { getImageUrl } from './imageUtils';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://devlajidigital.com/backend/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


// --- Frontend Cache Implementation ---
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Clear cache on explicit page refresh (F5)
if (typeof window !== 'undefined' && window.performance) {
  const navEntries = window.performance.getEntriesByType('navigation');
  if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === 'reload') {
    // It's a hard refresh, clear the api cache from sessionStorage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('api_cache_v8_')) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

const getCache = (key: string) => {
  try {
    const item = sessionStorage.getItem('api_cache_v8_' + key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data;
    }
    sessionStorage.removeItem('api_cache_v8_' + key);
  } catch (e) {}
  return null;
};

const setCache = (key: string, data: any) => {
  try {
    sessionStorage.setItem('api_cache_v8_' + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {}
};

// Global loading tracker for UI
let activeRequests = 0;

export const incrementApiLoad = () => {
  activeRequests++;
  if (activeRequests === 1) window.dispatchEvent(new Event('api-load-start'));
};

export const decrementApiLoad = () => {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) window.dispatchEvent(new Event('api-load-end'));
};

export const getCachedDataSync = (url: string) => getCache(url);

apiClient.interceptors.request.use((config) => {
  incrementApiLoad();
  if (config.method?.toLowerCase() === 'get' && !window.location.pathname.startsWith('/admin')) {
    const url = config.url || '';
    const cacheKey = url + (config.params ? JSON.stringify(config.params) : '');
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      config.adapter = async () => {
        return {
          data: cachedData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        } as any;
      };
    }
  }

  const token = localStorage.getItem('adminToken');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});


// --- Image Path Fixer Interceptor ---
// Recursively fix image URLs coming from the backend

const imageKeys = new Set([
  'image', 'image_url', 'image_urls', 
  'thumbnail', 'thumbnail_url', 'thumbnail_image', 'thumbnail_image_url',
  'gallery_image', 'gallery_image_urls', 'gallery_urls',
  'category_image', 'category_image_url',
  'sub_category_image', 'sub_category_image_url',
  'pdf', 'pdf_url'
]);

const fixImageUrls = (data: any, keyName?: string): any => {
  if (typeof data === 'string') {
    if (keyName && imageKeys.has(keyName)) {
      return getImageUrl(data);
    }
    // Universal regex to match ANY domain or localhost path ending in /storage/ and replace it
    return data.replace(/https?:\/\/[^\/"']+(?:\/[^\/"']+)*?\/storage\//g, 'https://devlajidigital.com/backend/storage/app/public/');
  }
  
  if (Array.isArray(data)) {
    return data.map(item => fixImageUrls(item, keyName));
  }
  
  if (data !== null && typeof data === 'object') {
    const newData: any = {};
    for (const key in data) {
      newData[key] = fixImageUrls(data[key], key);
    }
    return newData;
  }
  
  return data;
};

apiClient.interceptors.response.use(
  (response) => {
    decrementApiLoad();
    
    // Fix image paths
    if (response.data) {
      response.data = fixImageUrls(response.data);
    }

    // Save successful frontend GET requests to cache
    const { config } = response;
    if (config.method?.toLowerCase() === 'get' && !window.location.pathname.startsWith('/admin')) {
      const url = config.url || '';
      const cacheKey = url + (config.params ? JSON.stringify(config.params) : '');
      setCache(cacheKey, response.data);
    }
    return response;
  },
  (error) => {
    decrementApiLoad();
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login'; 
    }
    return Promise.reject(error);
  }
);


