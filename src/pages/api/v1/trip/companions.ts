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

export const DELETE = async ({url, locals}: {url:URL, locals:locals}) => {
  // -- 1. AUTH USER
  if (!locals.user) {
    return unauthorizedResponse()
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid

  try {
    // -- GET DATA
    const companionUid = url.searchParams.get('companionUid')
    const tripId = url.searchParams.get('tripId')

    // -- VERIFY DATA
    if (!companionUid || !tripId) return badRequestResponse('Missing IDs')

    // -- GET TRIP REF
    const tripRef = adminDb
        .collection('trips')
        .doc(tripId)

    // -- GET COMPANION REF
    const companionRef = tripRef
        .collection('companions')
        .doc(companionUid)

    // -- INIT BATCH
    const batch = adminDb.batch()

    // -- DO UPDATES
    batch.delete(companionRef)

    batch.update(tripRef, {
      companionsUids: FieldValue.arrayRemove(companionUid),
      updatedAt: FieldValue.serverTimestamp(),
    })

    // -- COMMIT BATCH
    await batch.commit()

    return new Response(JSON.stringify({
      message: 'Companion removed from trip successfully'
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