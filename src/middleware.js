import { defineMiddleware } from "astro:middleware";

// Define publicly accessible routes
const inPublicRoute = [
    '/',
    '/login',
    '/logout',
    '/login/',
    '/api/login',
    '/api/logout',
    '/api/register',
    '/api/register/',
    '/register',
    '/register/',
    '/register/otp',
    '/404',
    '/build-profile'
];

// Helper: Decodes a JWT token (payload only)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]; // Grab the payload part
    if (!base64Url) {
      console.error('JWT parse error: Token has no payload part.', { token });
      return null;
    }
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
  const decoded = parseJwt(token);
  if (!decoded || typeof decoded.exp !== 'number') {
    console.warn("JWT expiration check: Token invalid or no 'exp' field.", { decoded });
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  console.log(`JWT Expiry Check: Token EXP: ${new Date(decoded.exp * 1000).toISOString()}, Current Time: ${new Date(currentTime * 1000).toISOString()}, Expired: ${decoded.exp < currentTime}`);
  return decoded.exp < currentTime;
}

// Astro middleware
export const onRequest = defineMiddleware(async (context, next) => {
  return next()
  const { url, cookies, redirect, request, locals } = context;

  // 1. Skip authentication for public routes immediately
  const isPublicPath = inPublicRoute.includes(url.pathname) || inPublicRoute.includes(url.pathname + '/');

  if (isPublicPath) {
    const response = await next();
    // Add no-store cache headers for login/register pages
    if (url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
    }
    return response;
  }

  // --- Protected Route Authentication Logic ---
  const accessTokenCookie = cookies.get('Authentication'); // Access Token
  const refreshTokenCookie = cookies.get('Refresh');      // Refresh Token

  let isAuthenticated = false;
  let responseToReturn; // Variable to hold the final response object

  // Case 1: Access Token exists and is NOT expired
  if (accessTokenCookie?.value && !isJwtExpired(accessTokenCookie.value)) {
    isAuthenticated = true;
    console.log(`[${url.pathname}] Access token is valid.`);
  }
  // Case 2: Access Token is missing or expired, but Refresh Token exists
  else if (refreshTokenCookie?.value) {
    console.log(`[${url.pathname}] Access token missing or expired. Attempting to refresh token...`);

    try {
      // Make a server-side request to the backend's refresh endpoint.
      // `request.url.origin` ensures we hit the correct backend origin (e.g., http://localhost:3001).
      console.log(request.url.origin)
      const refreshApiUrl = new URL('/api/v1/auth/refresh', request.url.origin).toString();
      console.log(refreshApiUrl)

      // This fetch request is made from the Astro server (middleware).
      // `credentials: 'include'` is essential for the browser to send the 'Refresh' HttpOnly cookie
      // to your backend with this server-to-server request.
      const refreshResponse = await fetch(refreshApiUrl, {
        method: 'POST',
        credentials: 'include',
        // No body needed if your backend expects the refresh token in a cookie.
      });

      if (refreshResponse.ok) {
        console.log(`[${url.pathname}] Token refreshed successfully.`);
        isAuthenticated = true;

        // CRUCIAL: Get new Set-Cookie headers from the refresh API's response
        // and store them to be applied to the current browser response.
        // `getSetCookie()` is a standard Web API method for Response Headers.
        const newSetCookieHeaders = refreshResponse.headers.getSetCookie();

        if (newSetCookieHeaders && newSetCookieHeaders.length > 0) {
          // Use `context.locals` to temporarily store the new cookie headers.
          // This is a reliable way to pass data to the later stage where the
          // final response is built.
          locals.newCookiesFromRefresh = newSetCookieHeaders;
        }

      } else {
        // Refresh failed (e.g., refresh token invalid/expired on backend, 401/403 status)
        console.warn(`[${url.pathname}] Token refresh failed:`, refreshResponse.status, await refreshResponse.text());
        // Clear all authentication cookies and redirect
        cookies.delete('Authentication');
        cookies.delete('Refresh');
        return redirect('/login');
      }
    } catch (error) {
      // Network error during refresh request, or other unexpected issues
      console.error(`[${url.pathname}] Error during token refresh API call:`, error);
      // Clear all authentication cookies and redirect
      cookies.delete('Authentication');
      cookies.delete('Refresh');
      return redirect('/login');
    }
  }

  // Case 3: No valid access token, and no valid refresh token (or refresh failed)
  if (!isAuthenticated) {
    console.warn(`[${url.pathname}] Authentication failed. Redirecting to login.`);
    // Ensure all auth-related cookies are cleared
    cookies.delete('Authentication');
    cookies.delete('Refresh');
    return redirect('/login');
  }

  // --- If we reach here, the user is authenticated ---
  // (Either original access token was valid, or successfully refreshed)

  // Proceed to the next middleware or the Astro page/API route handler
  responseToReturn = await next();

  // Apply any new cookies obtained from a successful refresh to the outgoing response.
  // This ensures the browser gets the fresh tokens.
  if (locals.newCookiesFromRefresh && locals.newCookiesFromRefresh.length > 0) {
    locals.newCookiesFromRefresh.forEach(cookieString => {
      // `responseToReturn.headers.append` adds the raw Set-Cookie header.
      responseToReturn.headers.append('Set-Cookie', cookieString);
    });
  }

  // Add cache control headers for authenticated routes to prevent caching sensitive data
  responseToReturn.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  responseToReturn.headers.set('Pragma', 'no-cache');
  responseToReturn.headers.set('Expires', '0');

  return responseToReturn;
});