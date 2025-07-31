import { adminDb } from "../../../../lib/firebase/server.ts";
import type { APIRoute } from "astro";
import {
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "../../../../responses/responses.ts";
import type { locals } from "../../../../types/locals.ts";
import {FieldValue} from "firebase-admin/firestore";

export const prerender = false;

export const POST = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. AUTH USER
  if (!locals.user) {
    return unauthorizedResponse()
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid

  try {
    // -- GET THE COMPANION
    const { companion, tripId } = await request.json()

    // -- VERIFY REQUEST DATA
    if (!companion || !tripId) return badRequestResponse('No companion or trip id')

    // -- GET TRIP REF
    const tripRef = adminDb
        .collection('trips')
        .doc(tripId)

    // -- GET COMPANION REF
    const companionsRef = tripRef
        .collection('companions')
        .doc(companion.uid)

    // -- INIT BATCH
    const batch = adminDb.batch()

    batch.set(companionsRef, companion)
    batch.update(tripRef, {
      companionsUids: FieldValue.arrayUnion(companion.uid),
      updatedAt: FieldValue.serverTimestamp(),
    })

    // -- COMMIT BATCH
    await batch.commit()
    return new Response(JSON.stringify({
      message: 'Companion Added Successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error:any) {
    console.error(error)
    return serverErrorResponse(error)
  }
}