import { a as adminAuth } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { d as deleteCache } from '../../../../chunks/simple-cache_CG8WXooW.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ cookies, request }) => {
  try {
    const sessionCookie = cookies.get("__session")?.value;
    if (sessionCookie) {
      cookies.delete("__session", { path: "/" });
      try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
        await adminAuth.revokeRefreshTokens(decodedClaims.uid);
        deleteCache(sessionCookie);
        console.log(`User ${decodedClaims.uid} refresh tokens revoked. Session cleared.`);
      } catch (error) {
        console.warn("Could not revoke refresh tokens (session might already be invalid/expired):", error);
      }
    } else {
      console.log("No session cookie found to clear during logout.");
    }
    return new Response(JSON.stringify({ success: true, message: "Logout successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error during server-side logout:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to complete logout." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
