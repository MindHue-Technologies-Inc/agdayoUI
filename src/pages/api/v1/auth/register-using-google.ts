import type { APIRoute } from "astro";
import { adminDb } from "../../../../lib/firebase/server.ts";
export const prerender = false;

export const POST: APIRoute = async ({request}) => {
  const { user } = await request.json()
  try {
    await adminDb.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });

    console.log(`Server: Firestore user document created for UID: ${user.uid}`);

    return new Response(JSON.stringify({
      success: true,
      uid: user.uid,
      message: 'Account created successfully.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Server: Error saving data to firestore:', error);
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 400, // Bad Request for validation errors
      headers: { 'Content-Type': 'application/json' },
    });
  }
}