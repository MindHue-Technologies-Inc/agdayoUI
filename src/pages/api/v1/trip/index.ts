import { adminDb } from "@/core/lib/firebase/server.ts";
import type { APIRoute } from "astro";
import {
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "@/core/responses/responses.ts";
import type { locals } from "@/core/types/locals.ts";
import {FieldValue} from "firebase-admin/firestore";

export const prerender = false;

// -- HELPER FUNCTION TO RETURN DATA OF FIRESTORE SNAPSHOTS
const returnData = (doc:any) => {
  const data = doc.data()
  return {
    ...data,
    id:doc.id
  }
}

export const GET:APIRoute = async ({url} ) => {
  // -- 1. GET ID OF TRIP AND VERIFY
  const tripId = url.searchParams.get('tripId')

  // -- 2. IF TRIPID IS EMPTY SEND 400
  if (!tripId) {
    return notFoundResponse('Trip not found')
  }

  try {
    // -- 3. GET REFERENCE TO TRIP FROM FIRESTORE
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 4. GET TRIP DOCUMENT
    const trip = await tripRef.get()

    // -- 5. SAVE TRIP DATA TO TRIPDATA
    const tripData = trip.data()

    // -- 6. GET COMPANIONS SNAPSHOT
    const companionsSnapshot = await tripRef.collection('companions').get()

    const companions = companionsSnapshot.docs.map(returnData)

    // -- 7 GET ACTIVITIES SNAPSHOT
    const activitiesSnapshot = await tripRef.collection('activities').get()
    const activities = activitiesSnapshot.docs.map(returnData);

    // -- 8. GET TASKS SNAPSHOT
    const taskSnapshot = await tripRef.collection('tasks').get()
    const tasks = taskSnapshot.docs.map(returnData);

    // -- 9. GET ACCOMMODATION SNAPSHOT
    const accommodationSnapshot = await tripRef.collection('accommodations').get()
    const accommodations = accommodationSnapshot.docs.map(returnData)

    // -- 10. GET BUDGET SNAPSHOT
    const budgetSnapshot = await tripRef.collection('budget').get()
    const budget = budgetSnapshot.docs.map(returnData)

    return new Response(JSON.stringify({
      ...tripData,
      companions: companions,
      activities: activities,
      tasks: tasks,
      accommodations: accommodations,
      budget: budget,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error:any) {
    console.error('ERROR IN FETCHING TRIP', error)
    return badRequestResponse(error)
  }
}

// -- UPDATE TRIP SETTINGS
export const PUT = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. AUTH THE USER
  if (!locals.user) {
    return unauthorizedResponse();
  }

  // -- 2. GET THE USER ID
  const uid = locals.user.uid

  {
    try {
      // -- 3. GET REQUEST DATA
      const { tripData, tripId } = await request.json()

      // -- 4. GET TRIP REF
      const tripRef = adminDb.collection('trips').doc(tripId)

      // -- 5. SET THE NEW TRIP DATA
      const newTripData = {
        ...tripData,
        updatedBy: uid,
        updatedAt: FieldValue.serverTimestamp(),
      }

      // -- 6. SAVE NEW UPDATE
      await tripRef.update(newTripData)

      // -- 7. RETURN RESPONSE
      return new Response(JSON.stringify({
        message: 'SUCCESS'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error(error)
      return badRequestResponse()
    }
  }
}

// --- Helper function to delete a subcollection in batches ---
// This is crucial for large subcollections to avoid hitting batch limits (500 operations)
async function deleteCollection(collectionRef: FirebaseFirestore.CollectionReference, batchSize: number = 200) {
  const query = collectionRef.limit(batchSize);

  return new Promise<void>((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query: FirebaseFirestore.Query, resolve: () => void) {
  const snapshot = await query.get();

  // When there are no documents left, we are done
  if (snapshot.size === 0) {
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = adminDb.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next 200 documents
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

// -- DELETE THE TRIP
export const DELETE = async({url, locals}: {url:URL, locals:locals}) => {
  // -- 1. AUTH THE USER
  if (!locals.user) {
    return unauthorizedResponse();
  }

  // -- 2. GET THE TRIP ID
  const tripId = url.searchParams.get('tripId')

  // -- 3. RETURN ERROR IF TRIP ID IS EMPTY
  if (!tripId) {
    return badRequestResponse('Trip id is missing')
  }

  // -- 4. GET THE USER ID
  const uid = locals.user.uid

  try {
    const tripRef = adminDb.collection('trips').doc(tripId);
    const tripDoc = await tripRef.get();

    // 3. Check if the trip exists
    if (!tripDoc.exists) {
      return notFoundResponse('Trip not found.');
    }

    const tripData = tripDoc.data();

    // 4. Authorization: Only the owner can delete the trip
    if (tripData?.ownerUid !== uid) {
      return forbiddenResponse('Only the trip owner can delete this trip.');
    }

    // --- Start Deleting Subcollections ---
    console.log(`Starting deletion of subcollections for trip: ${tripId}`);

    // Delete 'activities' subcollection
    await deleteCollection(tripRef.collection('activities'));
    console.log(`Activities subcollection for trip ${tripId} deleted.`);

    // Delete 'companions' subcollection
    await deleteCollection(tripRef.collection('companions'));
    console.log(`Companions subcollection for trip ${tripId} deleted.`);

    // Delete 'tasks' subcollection
    await deleteCollection(tripRef.collection('tasks'));
    console.log(`Tasks subcollection for trip ${tripId} deleted.`);

    // Add other subcollections here if you have them (e.g., 'expenses', 'budgetItems', etc.)
    // await deleteCollection(tripRef.collection('expenses'));
    // await deleteCollection(tripRef.collection('budgetItems'));

    console.log(`All specified subcollections for trip ${tripId} deleted.`);
    // --- End Deleting Subcollections ---

    // 5. Delete the main trip document
    await tripRef.delete();
    console.log(`Main trip document ${tripId} deleted.`);

    // 6. Return Success Response
    return new Response(JSON.stringify({
      message: 'Trip and its subcollections deleted successfully!',
      tripId: tripId
    }), {
      status: 200, // 200 OK for successful deletion
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    console.error(error)
    return serverErrorResponse(`Failed to delete trip: ${error}`)
  }


}