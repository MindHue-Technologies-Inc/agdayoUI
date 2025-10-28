import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { u as unauthorizedResponse, b as badRequestResponse, s as serverErrorResponse } from '../../../../chunks/responses_BW3oWBSX.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  locals.user.uid;
  try {
    const { companion, tripId } = await request.json();
    if (!companion || !tripId) return badRequestResponse("No companion or trip id");
    const tripRef = adminDb.collection("trips").doc(tripId);
    const companionsRef = tripRef.collection("companions").doc(companion.uid);
    const batch = adminDb.batch();
    batch.set(companionsRef, companion);
    batch.update(tripRef, {
      companionsUids: FieldValue.arrayUnion(companion.uid),
      updatedAt: FieldValue.serverTimestamp()
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Companion Added Successfully"
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
  if (!locals.user) {
    return unauthorizedResponse();
  }
  locals.user.uid;
  try {
    const companionUid = url.searchParams.get("companionUid");
    const tripId = url.searchParams.get("tripId");
    if (!companionUid || !tripId) return badRequestResponse("Missing IDs");
    const tripRef = adminDb.collection("trips").doc(tripId);
    const companionRef = tripRef.collection("companions").doc(companionUid);
    const batch = adminDb.batch();
    batch.delete(companionRef);
    batch.update(tripRef, {
      companionsUids: FieldValue.arrayRemove(companionUid),
      updatedAt: FieldValue.serverTimestamp()
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Companion removed from trip successfully"
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
