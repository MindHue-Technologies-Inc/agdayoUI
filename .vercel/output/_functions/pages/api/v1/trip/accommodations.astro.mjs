import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { u as unauthorizedResponse, b as badRequestResponse, s as serverErrorResponse } from '../../../../chunks/responses_BW3oWBSX.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const GET = async ({ url, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  locals.user.uid;
  url.searchParams.get("tripId");
};
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  const uid = locals.user.uid;
  try {
    const { tripId, accommodationData } = await request.json();
    if (Object.keys(accommodationData).includes("showSheet")) {
      delete accommodationData.showSheet;
    }
    if (!tripId || !accommodationData) {
      return badRequestResponse("Trip ID and Accommodation are required");
    }
    const batch = adminDb.batch();
    const tripRef = adminDb.collection("trips").doc(tripId);
    const dataToSave = {
      ...accommodationData,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid
    };
    const accomRef = tripRef.collection("accommodations").doc();
    batch.set(accomRef, dataToSave);
    batch.update(tripRef, {
      accommodationIds: FieldValue.arrayUnion(accomRef.id),
      // Add the new activity's ID
      updatedAt: FieldValue.serverTimestamp()
      // Update the trip's timestamp as well
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Accommodation created successfully!",
      accommodationId: accomRef.id,
      // Return the ID of the newly created accommodation
      // You can also return a subset of the saved data if needed on the client
      createdAccommodation: { id: accomRef.id, ...dataToSave }
    }), {
      status: 201,
      // 201 Created for successful resource creation
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
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
