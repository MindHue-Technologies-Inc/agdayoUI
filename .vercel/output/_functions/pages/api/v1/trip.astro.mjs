import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { n as notFoundResponse, b as badRequestResponse, u as unauthorizedResponse, f as forbiddenResponse, s as serverErrorResponse } from '../../../chunks/responses_BW3oWBSX.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const returnData = (doc) => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id
  };
};
const GET = async ({ url }) => {
  const tripId = url.searchParams.get("tripId");
  if (!tripId) {
    return notFoundResponse("Trip not found");
  }
  try {
    const tripRef = adminDb.collection("trips").doc(tripId);
    const trip = await tripRef.get();
    const tripData = trip.data();
    const companionsSnapshot = await tripRef.collection("companions").get();
    const companions = companionsSnapshot.docs.map(returnData);
    const activitiesSnapshot = await tripRef.collection("activities").get();
    const activities = activitiesSnapshot.docs.map(returnData);
    const taskSnapshot = await tripRef.collection("tasks").get();
    const tasks = taskSnapshot.docs.map(returnData);
    const accommodationSnapshot = await tripRef.collection("accommodations").get();
    const accommodations = accommodationSnapshot.docs.map(returnData);
    const budgetSnapshot = await tripRef.collection("budget").get();
    const budget = budgetSnapshot.docs.map(returnData);
    return new Response(JSON.stringify({
      ...tripData,
      companions,
      activities,
      tasks,
      accommodations,
      budget
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("ERROR IN FETCHING TRIP", error);
    return badRequestResponse(error);
  }
};
const PUT = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  const uid = locals.user.uid;
  {
    try {
      const { tripData, tripId } = await request.json();
      const tripRef = adminDb.collection("trips").doc(tripId);
      const newTripData = {
        ...tripData,
        updatedBy: uid,
        updatedAt: FieldValue.serverTimestamp()
      };
      await tripRef.update(newTripData);
      return new Response(JSON.stringify({
        message: "SUCCESS"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error(error);
      return badRequestResponse();
    }
  }
};
async function deleteCollection(collectionRef, batchSize = 200) {
  const query = collectionRef.limit(batchSize);
  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}
async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();
  if (snapshot.size === 0) {
    resolve();
    return;
  }
  const batch = adminDb.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}
const DELETE = async ({ url, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  const tripId = url.searchParams.get("tripId");
  if (!tripId) {
    return badRequestResponse("Trip id is missing");
  }
  const uid = locals.user.uid;
  try {
    const tripRef = adminDb.collection("trips").doc(tripId);
    const tripDoc = await tripRef.get();
    if (!tripDoc.exists) {
      return notFoundResponse("Trip not found.");
    }
    const tripData = tripDoc.data();
    if (tripData?.ownerUid !== uid) {
      return forbiddenResponse("Only the trip owner can delete this trip.");
    }
    console.log(`Starting deletion of subcollections for trip: ${tripId}`);
    await deleteCollection(tripRef.collection("activities"));
    console.log(`Activities subcollection for trip ${tripId} deleted.`);
    await deleteCollection(tripRef.collection("companions"));
    console.log(`Companions subcollection for trip ${tripId} deleted.`);
    await deleteCollection(tripRef.collection("tasks"));
    console.log(`Tasks subcollection for trip ${tripId} deleted.`);
    console.log(`All specified subcollections for trip ${tripId} deleted.`);
    await tripRef.delete();
    console.log(`Main trip document ${tripId} deleted.`);
    return new Response(JSON.stringify({
      message: "Trip and its subcollections deleted successfully!",
      tripId
    }), {
      status: 200,
      // 200 OK for successful deletion
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(`Failed to delete trip: ${error}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
