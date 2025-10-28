import { a as adminAuth } from '../../../../chunks/server_kP1SA6Eq.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return new Response(JSON.stringify({ message: "ID token is missing." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const expiresIn = 60 * 60 * 24 * 5 * 1e3;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    cookies.set("__session", sessionCookie, {
      maxAge: expiresIn / 1e3,
      // CONVERT MS TO SECONDS
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
    });
    return new Response(JSON.stringify({ success: true, message: "Session cookie set." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating session cookie.", error);
    let errorMessage = "Failed to create session. Please try again.";
    if (error.code === "auth/id-token-expired") {
      errorMessage = "Authentication expired. Please sign in again.";
    } else if (error.code === "auth/argument-error") {
      errorMessage = "Invalid ID token provided.";
    }
    return new Response(JSON.stringify({ success: false, message: errorMessage }), {
      status: 401,
      // Unauthorized
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
