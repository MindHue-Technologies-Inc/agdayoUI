import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ message: "Unauthorized: Not logged in." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const uid = locals.user.uid;
  try {
    const activity = await request.json();
    console.log(activity);
    const tripId = activity.tripId;
    if (!tripId) {
      return new Response(JSON.stringify({ message: "Trip ID is missing from the URL path." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const activityDataToSave = {
      ...activity,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid
    };
    const batch = adminDb.batch();
    const tripRef = adminDb.collection("trips").doc(tripId);
    const activityRef = tripRef.collection("activities").doc();
    batch.set(activityRef, activityDataToSave);
    batch.update(tripRef, {
      activityIds: FieldValue.arrayUnion(activityRef.id),
      // Add the new activity's ID
      updatedAt: FieldValue.serverTimestamp()
      // Update the trip's timestamp as well
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Activity created successfully!",
      activityId: activityRef.id,
      // Return the ID of the newly created activity
      // You can also return a subset of the saved data if needed on the client
      createdActivity: { id: activityRef.id, ...activityDataToSave }
    }), {
      status: 201,
      // 201 Created for successful resource creation
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to create activity: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "An unexpected error occurred during activity creation." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PATCH = async ({ request, locals }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ message: "Unauthorized: Not logged in." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  locals.user.uid;
  try {
    const activity = await request.json();
    const newActivityData = {
      ...activity,
      updatedAt: FieldValue.serverTimestamp()
    };
    const tripId = activity.tripId;
    const tripRef = adminDb.collection("trips").doc(tripId);
    const activityRef = tripRef.collection("activities").doc(activity.id);
    await activityRef.update(newActivityData);
    return new Response(JSON.stringify({
      message: "Successfully updated activity",
      activityId: activityRef.id,
      updatedActivity: { ...newActivityData }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error updating activity:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to update activity: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "An unexpected error occurred during activity update." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ url }) => {
  const activityId = url.searchParams.get("activityId");
  const tripId = url.searchParams.get("tripId");
  if (!activityId) {
    return new Response(JSON.stringify({ message: "Activity ID Missing" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  if (!tripId) {
    return new Response(JSON.stringify({ message: "Trip ID Missing" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    const tripRef = adminDb.collection("trips").doc(tripId);
    const activityRef = tripRef.collection("activities").doc(activityId);
    const batch = adminDb.batch();
    batch.delete(activityRef);
    batch.update(tripRef, {
      activityIds: FieldValue.arrayRemove(activityId),
      // Remove the activity's ID
      updatedAt: FieldValue.serverTimestamp()
      // Update the trip's timestamp
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Activity deleted successfully!"
    }), {
      status: 200,
      // 200 OK for successful deletion
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(`Error deleting activity ${activityId} for trip ${tripId}:`, error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to delete activity: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "An unexpected error occurred during activity deletion." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
