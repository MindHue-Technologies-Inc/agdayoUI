
import type { APIRoute } from "astro";
import { adminDb } from "@/core/lib/firebase/server.ts";
import type {ActivityUpdateData, ActivityWriteData} from "@/core/types/trip-activity.ts";
import type { locals } from "@/core/types/locals.ts";
import { FieldValue } from "firebase-admin/firestore";

export const prerender = false;

export const POST = async ({ request, locals }: {request: Request, locals: locals}) => {
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Not logged in.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid;

  try {
    // -- 3. GET THE PAYLOAD FROM REQUEST DATA
    const activity: ActivityWriteData = await request.json();
    console.log(activity)

    // -- 3.5 GET TRIP ID
    const tripId = activity.tripId

    // Basic validation for tripId
    if (!tripId) {
      return new Response(JSON.stringify({ message: 'Trip ID is missing from the URL path.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // -- 4. ADD ADDITIONAL DATA
    const activityDataToSave = {
      ...activity,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid,
    }

    // --- Start Firestore Batch ---
    const batch = adminDb.batch();

    // -- 5. GET TRIP REFERENCE
    const tripRef = adminDb.collection('trips').doc(tripId);

    // -- 6. Create the activity document in the subcollection
    const activityRef = tripRef.collection('activities').doc(); // Let Firestore auto-generate ID
    batch.set(activityRef, activityDataToSave);

    // -- 6.5. Update the parent trip document to add the new activity's ID to the 'activityIds' array
    batch.update(tripRef, {
      activityIds: FieldValue.arrayUnion(activityRef.id), // Add the new activity's ID
      updatedAt: FieldValue.serverTimestamp(), // Update the trip's timestamp as well
    });

    // -- 7. Commit the batch
    await batch.commit();

    // -- 8. RETURN RESPONSE

    return new Response(JSON.stringify({
      message: 'Activity created successfully!',
      activityId: activityRef.id, // Return the ID of the newly created activity
      // You can also return a subset of the saved data if needed on the client
      createdActivity: { id: activityRef.id, ...activityDataToSave }
    }), {
      status: 201, // 201 Created for successful resource creation
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    // Return a proper error response to the client
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to create activity: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'An unexpected error occurred during activity creation.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PATCH = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Not logged in.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid;

  try {
    // -- 3. GET THE PAYLOAD DATA
    const activity: ActivityUpdateData = await request.json()

    // -- 4. CREATE NEW CONST FOR STORING NEW DATA
    const newActivityData = {
      ...activity,
      updatedAt: FieldValue.serverTimestamp(),
    }

    // -- 5. GET TRIP ID
    const tripId = activity.tripId

    // -- 6. GET REFERENCE TO TRIP
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 7. GET REFERENCE TO ACTIVITY
    const activityRef = tripRef
        .collection('activities')
        .doc(activity.id)

    // -- 8. SAVE THE UPDATE
    await activityRef.update(newActivityData)

    // -- 9. RETURN RESPONSE
    return new Response(JSON.stringify({
      message: 'Successfully updated activity',
      activityId: activityRef.id,
      updatedActivity: {...newActivityData}
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // -- 4. GET ACTIVITY ID
  } catch (error) {
    console.error("Error updating activity:", error);
    // Return a proper error response to the client
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to update activity: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'An unexpected error occurred during activity update.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const DELETE: APIRoute = async ({url}) => {
  // -- 1. GET ACTIVITY ID
  const activityId = url.searchParams.get('activityId')

  // -- 2. GET TRIP ID
  const tripId = url.searchParams.get('tripId')

  // -- 3. CHECK IF ACTIVITY ID EXISTS
  if (!activityId) {
    return new Response(JSON.stringify({message: 'Activity ID Missing'}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  if (!tripId) {
    return new Response(JSON.stringify({message: 'Trip ID Missing'}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    // -- 4. GET TRIP REF
    const tripRef = adminDb
        .collection('trips')
        .doc(tripId)

    // -- 5. GET ACTIVITY REF
    const activityRef = tripRef
        .collection('activities')
        .doc(activityId)

    // -- 6. DECLARE A BATCH
    const batch = adminDb.batch()

    // -- 7. ADD DELETE TO BATCH
    batch.delete(activityRef)

    // -- 8. ADD UDPATE OF ACTIVITY IDS TO BATCH
    batch.update(tripRef, {
      activityIds: FieldValue.arrayRemove(activityId), // Remove the activity's ID
      updatedAt: FieldValue.serverTimestamp(),         // Update the trip's timestamp
    });

    // -- 9. COMMIT BATCH
    await batch.commit()

    // 10. Return success response
    return new Response(JSON.stringify({
      message: 'Activity deleted successfully!',
    }), {
      status: 200, // 200 OK for successful deletion
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error deleting activity ${activityId} for trip ${tripId}:`, error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to delete activity: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'An unexpected error occurred during activity deletion.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}