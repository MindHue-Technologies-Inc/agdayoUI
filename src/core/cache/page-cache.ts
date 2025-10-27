// This file sets up a simple in-memory cache.
// For a production app, you would want to use a more robust
// solution like Redis, but this demonstrates the concept.

const cache = new Map();

/**
 * Caches a page's HTML content.
 * @param {string} url The URL of the page to cache.
 * @param {string} content The rendered HTML content.
 */
export function setCache(url, content) {
  // We'll store the content and a timestamp for expiration
  cache.set(url, { content, timestamp: Date.now() });
  console.log(`[Cache] Stored page for URL: ${url}`);
}

/**
 * Retrieves a cached page's content, if it exists and is not expired.
 * @param {string} url The URL of the page to retrieve.
 * @param {number} ttl The time-to-live in milliseconds (e.g., 60000 for 1 minute).
 * @returns {string | null} The cached HTML content or null.
 */
export function getCache(url, ttl = 300000) { // Default TTL is 5 minutes
  const cachedItem = cache.get(url);
  if (!cachedItem) {
    return null;
  }

  // Check if the cache has expired
  const isExpired = Date.now() - cachedItem.timestamp > ttl;
  if (isExpired) {
    console.log(`[Cache] Expired page for URL: ${url}`);
    cache.delete(url);
    return null;
  }

  console.log(`[Cache] Serving from cache for URL: ${url}`);
  return cachedItem.content;
}

/**
 * Manually invalidates a specific page from the cache.
 * This is useful for when data changes and you need to ensure
 * the page is re-rendered on the next request.
 * @param {string} url The URL to invalidate.
 */
export function invalidateCache(url) {
  if (cache.delete(url)) {
    console.log(`[Cache] Invalidated page for URL: ${url}`);
  }
}