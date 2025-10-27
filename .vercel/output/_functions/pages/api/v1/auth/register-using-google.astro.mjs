import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const { user } = await request.json();
  try {
    await adminDb.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      displayNameLowercase: user.displayName.toLowerCase(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
      photoURL: user.photoURL
    });
    console.log(`Server: Firestore user document created for UID: ${user.uid}`);
    return new Response(JSON.stringify({
      success: true,
      uid: user.uid,
      message: "Account created successfully."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Server: Error saving data to firestore:", error);
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 400,
      // Bad Request for validation errors
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
