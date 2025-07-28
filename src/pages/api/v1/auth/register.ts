import type { APIRoute } from "astro";
import { adminAuth, adminDb } from "../../../../lib/firebase/server.ts";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json()

    // --- 1. Basic Server-Side Validation ---
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- 2. Create User in Firebase Authentication ---
    // This uses the Admin SDK, which bypasses client-side security rules.
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
    });

    const uid = userRecord.uid;
    console.log(`Server: Firebase Auth user created with UID: ${uid}`);

    // --- 3. Create User Document in Firestore ---
    // This ensures a profile exists for the new user.
    await adminDb.collection('users').doc(uid).set({
      uid: uid,
      email: email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
    console.log(`Server: Firestore user document created for UID: ${uid}`);

    return new Response(JSON.stringify({
      success: true,
      uid: uid,
      message: 'Account created successfully.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error('Server: Error during registration:', error);
    let errorMessage = 'Failed to create account. Please try again.';

    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'This email is already registered. Please try logging in or resetting your password.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak. Please use a stronger password.';
    }

    return new Response(JSON.stringify({ success: false, message: errorMessage }), {
      status: 400, // Bad Request for validation errors
      headers: { 'Content-Type': 'application/json' },
    });
  }
}