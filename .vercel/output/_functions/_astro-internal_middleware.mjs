import { s as sequence, d as defineMiddleware } from './chunks/index_DW09kk4u.mjs';
import { a as adminAuth } from './chunks/server_kP1SA6Eq.mjs';
import { g as getCache, s as setCache, d as deleteCache } from './chunks/simple-cache_CG8WXooW.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CFZXR9mu.mjs';
import 'kleur/colors';
import './chunks/astro/server_BDZuUS1O.mjs';
import 'clsx';
import 'cookie';

const SESSION_CACHE_MAX_AGE_SECONDS = 60;

// Define publicly accessible routes
const inPublicRoute = [
    '/',
    '/login',
    '/logout',
    '/login/',
    '/api/login',
    '/api/v1/auth/logout',
    '/api/v1/auth/register',
    '/api/v1/auth/register/',
    '/api/v1/auth/register-using-google',
    '/api/v1/auth/register-using-google/',
    '/api/v1/auth/session-login',
    '/api/v1/auth/session-logout',
    '/api/v2/maps-places',
    '/register',
    '/register/',
    '/register/otp',
    '/404',
    '/what-is-agdayo',
    '/features',
];

// -- MAIN AUTHENTICATION MIDDLEWARE
const authMiddleware = defineMiddleware(async (context, next) => {
  const currentPath = context.url.pathname;
  let authenticatedUser = null;

  // -- 1. TRY TO GET THE SESSION COOKIE
  const sessionCookie = context.cookies.get('__session')?.value;

  if (sessionCookie) {
    try {
      // -- CHECK FIRST IF DECODED CLAIMS IN CACHE
      let decodedClaims = getCache(sessionCookie);

      if (decodedClaims) {
        authenticatedUser = {
          uid: decodedClaims.uid,
          email: decodedClaims.email,
          displayName: decodedClaims.name,
          photoURL: decodedClaims.picture
        };
      } else {
        // -- 2. VERIFY THE SESSION COOKIE USING FIREBASE ADMIN SDK
        // -- THE TRUE ARGUMENT ENSURES IT ALSO CHECKS FOR TOKEN REVOCATION
        decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

        // -- 3. IF VALID, POPULATE THE authenticatedUser OBJECT
        authenticatedUser = {
          uid: decodedClaims.uid,
          email: decodedClaims.email,
          displayName: decodedClaims.name,
          photoURL: decodedClaims.picture
        };

        setCache(sessionCookie, decodedClaims, SESSION_CACHE_MAX_AGE_SECONDS);
      }

      console.log(`MIDDLEWARE: AUTHENTICATED USER ${authenticatedUser.uid} FOR PATH ${currentPath}`);
    } catch (error) {
      console.log(`Middleware: No session cookie found for path ${currentPath}`);
      deleteCache(sessionCookie);
    }
  }

  // -- 5. ATTACH THE AUTHENTICATED USER (OR NULL) TO 'CONTEXT.LOCALS'
  context.locals.user = authenticatedUser;

  // --- NEW REDIRECTION RULE: If user is logged in and tries to access login/signup pages ---
  if (context.locals.user && (currentPath === '/login' || currentPath === '/login/' || currentPath === '/register' || currentPath === '/register/')) {
    console.log(`Middleware: Redirecting authenticated user from ${currentPath} to /active-trip`);
    return context.redirect('/active-trip'); // Or '/' if that's your general home page
  }

  const path = context.url.pathname;

  // -- 6. HANDLE PROTECTED ROUTES (REDIRECTION LOGIN)
  const isPublicPath = inPublicRoute.includes(currentPath);
  console.log(!context.locals.user && !isPublicPath);
  if (!context.locals.user && !isPublicPath) {
    // If the user is NOT authenticated AND the path is NOT public, redirect to login
    console.log(`Middleware: Redirecting unauthenticated user from ${currentPath} to /login`);
    // Store the original URL in a query parameter for redirection after login
    const redirectTo = encodeURIComponent(path + context.url.search); // Include query params if any
    return context.redirect(`/login?redirect_to=${redirectTo}`);
  }

  // 7. Continue to the next middleware or the page/API route handler
  return next();
});

// Astro middleware
const onRequest$1 = sequence(authMiddleware);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
