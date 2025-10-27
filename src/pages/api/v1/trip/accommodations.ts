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


// -- TODO: UNFINISHED
export const GET = async ({url, locals}: {url:URL, locals:locals}) => {
  // -- 1. AUTH USER
  if (!locals.user) {
    return unauthorizedResponse()
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid

  // -- 3. GET TRIP ID
  const tripId = url.searchParams.get('tripId')
}

export const POST = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. AUTH USER
  if (!locals.user) {
    return unauthorizedResponse()
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid

  try {
    // -- 3. GET TRIP ID AND ACCOMMODATION DATA
    const { tripId, accommodationData } = await request.json()

    // -- DELETE SHOWSHEET
    if (Object.keys(accommodationData).includes('showSheet')) {
      delete accommodationData.showSheet
    }

    // -- 4. VERIFY IF REQUEST DATA EXISTS
    if (!tripId || !accommodationData) {
      return badRequestResponse('Trip ID and Accommodation are required')
    }

    const batch = adminDb.batch();

    // -- 5. GET TRIP REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- initiate data to save
    const dataToSave = {
      ...accommodationData,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid,
    }

    // -- 6. GET ACCOMMODATION REF
    const accomRef = tripRef.collection('accommodations').doc()
    batch.set(accomRef, dataToSave)

    batch.update(tripRef, {
      accommodationIds: FieldValue.arrayUnion(accomRef.id), // Add the new activity's ID
      updatedAt: FieldValue.serverTimestamp(), // Update the trip's timestamp as well
    });
    // -- 7. COMMIT BATCH
    await batch.commit()

    // -- RETURN RESPONSE
    return new Response(JSON.stringify({
      message: 'Accommodation created successfully!',
      accommodationId: accomRef.id, // Return the ID of the newly created accommodation
      // You can also return a subset of the saved data if needed on the client
      createdAccommodation: { id: accomRef.id, ...dataToSave }
    }), {
      status: 201, // 201 Created for successful resource creation
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error:any) {
    console.error(error)
    return serverErrorResponse(error)
  }
}