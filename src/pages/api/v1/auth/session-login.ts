import type { APIRoute } from "astro";
import { adminAuth } from "@/core/lib/firebase/server.ts";

export const prerender = false;

export const POST: APIRoute = async ({request, cookies}) => {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return new Response(JSON.stringify({message: 'ID token is missing.'}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // -- DEFINE SESSION COOKIE EXPIRATION
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days in milliseconds

    // -- VERIFY THE ID TOKEN AND CREATE A SESSION COOKIE
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // -- SET THE SESSION COOKIE AS AN HTTPONLY
    cookies.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000, // CONVERT MS TO SECONDS
      httpOnly: true,
      secure: import.meta.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    });

    return new Response(JSON.stringify({success: true, message: 'Session cookie set.'}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error:any) {
    console.error('Error creating session cookie.', error);
    let errorMessage = 'Failed to create session. Please try again.';
    if (error.code === 'auth/id-token-expired') {
      errorMessage = 'Authentication expired. Please sign in again.';
    } else if (error.code === 'auth/argument-error') {
      errorMessage = 'Invalid ID token provided.';
    }

    return new Response(JSON.stringify({ success: false, message: errorMessage }), {
      status: 401, // Unauthorized
      headers: { 'Content-Type': 'application/json' },
    });
  }
}