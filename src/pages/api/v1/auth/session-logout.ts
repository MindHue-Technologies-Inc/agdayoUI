import type { APIRoute } from "astro";
import { adminAuth } from "../../../../lib/firebase/server.ts";
import { getCache, setCache, deleteCache } from "../../../../cache/simple-cache.ts";

export const prerender = false;

export const POST: APIRoute = async ({cookies, request}) => {
  try {
    const sessionCookie = cookies.get('__session')?.value;

    if (sessionCookie) {
      // -- 1. INVALIDATE THE SERVER-SIDE COOKIE IMMEDIATELY
      cookies.delete('__session', {path: '/'});

      // -- 2. REVOKE USER'S REFRESH TOKENS.
      // -- THIS LOGS THE USER OUT FROM ALL THEIR DEVICES/SESSIONS IMMEDIATELY.
      // -- TO DO THIS, YOU FIRST NEED TO VERIFY THE SESSION COOKIE TO GET THE UID.

      try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
        await adminAuth.revokeRefreshTokens(decodedClaims.uid);
        deleteCache(sessionCookie);
        console.log(`User ${decodedClaims.uid} refresh tokens revoked. Session cleared.`);
      } catch (error) {
        console.warn('Could not revoke refresh tokens (session might already be invalid/expired):', error);
      }
    } else {
      console.log('No session cookie found to clear during logout.');
    }

    return new Response(JSON.stringify({success: true, message: 'Logout successfully'}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error during server-side logout:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to complete logout.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}