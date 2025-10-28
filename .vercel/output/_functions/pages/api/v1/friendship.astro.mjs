import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { Filter, FieldValue } from 'firebase-admin/firestore';
import { u as unauthorizedResponse, b as badRequestResponse, s as serverErrorResponse } from '../../../chunks/responses_BW3oWBSX.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  try {
    const friendshipSnapshot = await adminDb.collection("friendships").where(
      Filter.or(
        Filter.where(user1Uid, "==", uid),
        Filter.where(user2Uid)
      )
    ).get();
    const data = friendshipSnapshot.docs.map((doc) => doc.data());
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
const POST = async ({ request, locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  try {
    const { user2 } = await request.json();
    if (!user2) return badRequestResponse("Missing Person ID");
    const payload = {
      user1Uid: uid,
      user1DisplayName: locals.user.displayName || null,
      user1Email: locals.user.email || null,
      user1PhotoURL: locals.user.photoURL || null,
      user2Uid: user2.uid,
      user2DisplayName: user2.displayName || null,
      user2Email: user2.email || null,
      user2PhotoURL: user2.photoURL || null,
      status: "pending",
      requestedBy: uid,
      createdAt: FieldValue.serverTimestamp()
    };
    const friendshipRef = adminDb.collection("friendships").doc();
    await friendshipRef.set(payload);
    return new Response(JSON.stringify({
      message: "Friend Requested"
    }), {
      status: 200,
      headers: {
        "Content-Type": "appliaction/json"
      }
    });
  } catch (error) {
    console.log(error);
    return serverErrorResponse(error);
  }
};
const PUT = async ({ request, locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  try {
    const { friendshipId, status } = await request.json();
    console.log(friendshipId);
    const friendshipRef = adminDb.collection("friendships").doc(friendshipId);
    await friendshipRef.update({ status, acceptedBy: uid });
    return new Response(JSON.stringify({
      message: "Friendship updated"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(error);
  }
};
const DELETE = async ({ url, locals }) => {
  if (!locals.user) return unauthorizedResponse();
  try {
    const friendshipId = url.searchParams.get("id");
    if (!friendshipId) return badRequestResponse();
    const friendshipRef = adminDb.collection("friendships").doc(friendshipId);
    await friendshipRef.delete();
    return new Response(JSON.stringify({
      message: "Friendship deleted"
    }));
  } catch (error) {
    console.error(error);
    return serverErrorResponse(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
