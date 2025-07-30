import { adminDb } from "../../../../lib/firebase/server.ts";
import type { APIRoute } from "astro";
import type {locals} from "../../../../types/locals.ts";
import {FieldValue, Filter} from "firebase-admin/firestore";
import {
  unauthorizedResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse
} from "../../../../responses/responses.ts";

export const prerender = false;

export const GET = async ({locals}:{locals:locals}) => {
  // -- 1. AUTH THE USEr
  if (!locals.user) return unauthorizedResponse()

  // -- 2. GET UID
  const uid = locals.user.uid

  try {
    const friendshipSnapshot = await adminDb
        .collection('friendships')
        .where(
            Filter.or(
                Filter.where(user1Uid, '==', uid),
                Filter.where(user2Uid)
            )
        )
        .get()

    const data = friendshipSnapshot.docs.map(doc=>doc.data())
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export const POST = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. AUTH THE USEr
  if (!locals.user) return unauthorizedResponse()

  // -- 2. GET UID
  const uid = locals.user.uid

  try {
    // -- GET PAYLOAD
    const { user2Uid } = await request.json()

    if (!user2Uid) return badRequestResponse('Missing Person ID')

    // -- BUILD THE PAYLOAD
    const payload = {
      user1Uid: uid,
      user2Uid: user2Uid,
      status: 'pending',
      requestedBy: uid,
      createdAt: FieldValue.serverTimestamp(),
    }

    // -- GET FRIENDSHIP COLLECTION REF
    const friendshipRef = adminDb.collection('friendships').doc()

    // -- SAVE THE FRIEND REQUEST
    await friendshipRef.set(payload)

    // -- RETURN SUCCESS RESPONSE
    return new Response(JSON.stringify({
      message: 'Friend Requested',
    }), {
      status: 200,
      headers: {
        'Content-Type': 'appliaction/json'
      }
    })
  } catch (error) {
    console.log(error)
    return serverErrorResponse(error)
  }
}