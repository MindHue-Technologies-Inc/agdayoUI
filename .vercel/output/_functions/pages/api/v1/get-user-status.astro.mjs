export { renderers } from '../../../renderers.mjs';

const prerender = false;
const mockDatabase = {
  "user_123": { name: "Juan dela Cruz", subscriptionStatus: "inactive" },
  "user_456": { name: "Maria Clara", subscriptionStatus: "active" }
  // Example of an active user
};
setTimeout(() => {
  if (mockDatabase["user_123"]) {
    mockDatabase["user_123"].subscriptionStatus = "active";
    console.log("Mock database updated for user_123 to active.");
  }
}, 1e4);
const GET = async ({ request }) => {
  request.headers.get("Authorization");
  const userId = "user_123";
  const user = mockDatabase[userId];
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }
  return new Response(JSON.stringify({
    subscriptionStatus: user.subscriptionStatus,
    name: user.name
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
