// -- SIMPLE IN-MEMORY CACHE
const sessionCache = new Map<string, {claims: any; expiry:number}>();

// -- FUNCTION TO SET CACHE IN-MEMORY
export const setCache = (key:string, claims:any, maxAgeSeconds:number) => {
  const expiry = Date.now() + maxAgeSeconds * 1000
  sessionCache.set(key, {claims, expiry})
}

// -- FUNCTION TO GET THE CACHE IN-MEMORY
export const getCache = (key:string): string | null => {
  const entry = sessionCache.get(key);
  if (entry) {
    if (Date.now() < entry.expiry) return entry.claims
    else sessionCache.delete(key)
  }
  return null
}

// -- FUNCTION TO DELETE THE CACHE
export const deleteCache = (key:string) => {
  sessionCache.delete(key)
}