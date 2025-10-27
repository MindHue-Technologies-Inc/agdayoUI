// src/lib/firebase/server.ts
import type { ServiceAccount } from 'firebase-admin';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore'; // If you'll use Firestore

// Make sure to load your service account key securely from environment variables
// For example, if you stored the entire JSON as a string in a single env var:
const serviceAccount = JSON.parse(import.meta.env.FIREBASE_ADMIN_SDK_CONFIG);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');



// Initialize Admin SDK
const adminApp = !getApps().length ? initializeApp({
  credential: cert(serviceAccount),
}) : getApp();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp); // If using Firestore with Admin privileges