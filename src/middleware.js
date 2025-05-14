import { defineMiddleware } from "astro:middleware";

// Define publicly accessible routes
const inPublicRoute = [
  '/',
  '/login',
  '/login/',
  '/api/login',
  '/api/logout',
  '/api/register/',
  '/register',
  '/register/',
  '/404',
];

// Helper: Decodes a JWT token (payload only)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]; // Grab the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix base64 format
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload); // Return the parsed payload
  } catch (err) {
    console.error('JWT parse error:', err);
    return null; // Return null if decoding fails
  }
}

// Helper: Checks if JWT token is expired
function isJwtExpired(token) {
  const decoded = parseJwt(token); // Decode the token
  if (!decoded || !decoded.exp) return true; // Invalid or no expiration
  const currentTime = Math.floor(Date.now() / 1000); // Current UNIX timestamp
  return decoded.exp < currentTime; // Compare with token's exp field
}

// Astro middleware
export const onRequest = defineMiddleware(async (context, next) => {
  // Skip auth check for public routes
  if (inPublicRoute.includes(context.url.pathname)) {
    return next();
  }

  // Process request normally
  const response = await next();

  // Add cache control headers for authenticated routes
  if (!inPublicRoute.includes(context.url.pathname)) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Get 'auth' cookie
  const authCookie = context.cookies.get('auth');
  if (!authCookie?.value) {
    return context.redirect('/login'); // Redirect if cookie missing
  }

  try {
    const auth = JSON.parse(authCookie.value); // Parse cookie content

    // Check if token exists, is authenticated, and not expired
    if (!auth.token || !auth.isAuthenticated || isJwtExpired(auth.token)) {
      console.warn("Token missing or expired. Redirecting to login.");
      return context.redirect('/login');
    }

    // Auth is valid, allow access
    return next();
  } catch (err) {
    // If cookie is invalid or can't be parsed
    console.error('Invalid auth cookie:', err);
    return context.redirect('/login');
  }
});
