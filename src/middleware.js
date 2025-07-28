import { defineMiddleware, sequence } from "astro:middleware";
import { adminAuth } from "./lib/firebase/server.js";

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
    '/features'
];

// -- MAIN AUTHENTICATION MIDDLEWARE
const authMiddleware = defineMiddleware(async (context, next) => {
  const currentPath = context.url.pathname;
  let authenticatedUser = null;

  // -- 1. TRY TO GET THE SESSION COOKIE
  const sessionCookie = context.cookies.get('__session')?.value;

  if (sessionCookie) {
    try {
      // -- 2. VERIFY THE SESSION COOKIE USING FIREBASE ADMIN SDK
      // -- THE TRUE ARGUMENT ENSURES IT ALSO CHECKS FOR TOKEN REVOCATION
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

      // -- 3. IF VALID, POPULATE THE authenticatedUser OBJECT
      authenticatedUser = {
        uid: decodedClaims.uid,
        email: decodedClaims.email,
        displayName: decodedClaims.name,
        photoURL: decodedClaims.picture
      };

      console.log(`MIDDLEWARE: AUTHENTICATED USER ${authenticatedUser.uid} FOR PATH ${currentPath}`)
    } catch (error) {
      console.log(`Middleware: No session cookie found for path ${currentPath}`);
    }
  }

  // -- 5. ATTACH THE AUTHENTICATED USER (OR NULL) TO 'CONTEXT.LOCALS'
  context.locals.user = authenticatedUser

  // --- NEW REDIRECTION RULE: If user is logged in and tries to access login/signup pages ---
  if (context.locals.user && (currentPath === '/login' || currentPath === '/login/' || currentPath === '/register' || currentPath === '/register/')) {
    console.log(`Middleware: Redirecting authenticated user from ${currentPath} to /active-trip`);
    return context.redirect('/active-trip'); // Or '/' if that's your general home page
  }

  // -- 6. HANDLE PROTECTED ROUTES (REDIRECTION LOGIN)
  const isPublicPath = inPublicRoute.includes(currentPath);
  console.log(!context.locals.user && !isPublicPath)
  if (!context.locals.user && !isPublicPath) {
    // If the user is NOT authenticated AND the path is NOT public, redirect to login
    console.log(`Middleware: Redirecting unauthenticated user from ${currentPath} to /login`);
    return context.redirect('/login');
  }

  // 7. Continue to the next middleware or the page/API route handler
  return next();
})

// Astro middleware
export const onRequest = sequence(authMiddleware);