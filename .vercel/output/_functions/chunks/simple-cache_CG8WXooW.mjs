const sessionCache = /* @__PURE__ */ new Map();
const setCache = (key, claims, maxAgeSeconds) => {
  const expiry = Date.now() + maxAgeSeconds * 1e3;
  sessionCache.set(key, { claims, expiry });
};
const getCache = (key) => {
  const entry = sessionCache.get(key);
  if (entry) {
    if (Date.now() < entry.expiry) return entry.claims;
    else sessionCache.delete(key);
  }
  return null;
};
const deleteCache = (key) => {
  sessionCache.delete(key);
};

export { deleteCache as d, getCache as g, setCache as s };
