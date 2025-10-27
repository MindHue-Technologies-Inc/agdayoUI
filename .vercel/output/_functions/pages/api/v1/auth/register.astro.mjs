import { a as adminAuth, b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userRecord = await adminAuth.createUser({
      email,
      password
    });
    const uid = userRecord.uid;
    console.log(`Server: Firebase Auth user created with UID: ${uid}`);
    await adminDb.collection("users").doc(uid).set({
      uid,
      email,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastLogin: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`Server: Firestore user document created for UID: ${uid}`);
    return new Response(JSON.stringify({
      success: true,
      uid,
      message: "Account created successfully."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Server: Error during registration:", error);
    let errorMessage = "Failed to create account. Please try again.";
    if (error.code === "auth/email-already-exists") {
      errorMessage = "This email is already registered. Please try logging in or resetting your password.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "The email address is not valid.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "The password is too weak. Please use a stronger password.";
    }
    return new Response(JSON.stringify({ success: false, message: errorMessage }), {
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
