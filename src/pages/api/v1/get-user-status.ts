export const prerender = false

import type { APIRoute } from 'astro';

// This is a MOCK implementation. You must replace this with your actual database logic.
// 1. Get the user ID from the auth token.
// 2. Query your database for that user.
// 3. Return their subscription status and name.

const mockDatabase = {
  'user_123': { name: 'Juan dela Cruz', subscriptionStatus: 'inactive' },
  'user_456': { name: 'Maria Clara', subscriptionStatus: 'active' }, // Example of an active user
};

// This function simulates your webhook updating the database.
// In a real scenario, your /paymongo-webhook would trigger this change.
setTimeout(() => {
  if (mockDatabase['user_123']) {
    mockDatabase['user_123'].subscriptionStatus = 'active';
    console.log('Mock database updated for user_123 to active.');
  }
}, 10000); // Simulate webhook arrival after 10 seconds


export const GET: APIRoute = async ({ request }) => {
  // In a real app, you would validate the JWT/session token here.
  const authHeader = request.headers.get('Authorization');
  // if (!authHeader) {
  //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  // }

  // For this example, we'll assume the token just contains the user ID.
  // In reality, you'd use a library like `jose` to verify a JWT.
  const userId = 'user_123'; // Hardcoded for demonstration

  const user = mockDatabase[userId];

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({
    subscriptionStatus: user.subscriptionStatus,
    name: user.name,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
