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
    const { user2 } = await request.json()

    if (!user2) return badRequestResponse('Missing Person ID')

    // -- BUILD THE PAYLOAD
    const payload = {
      user1Uid: uid,
      user1DisplayName: locals.user.displayName || null,
      user1Email: locals.user.email || null,
      user1PhotoURL: locals.user.photoURL || null,

      user2Uid: user2.uid,
      user2DisplayName: user2.displayName || null,
      user2Email: user2.email || null,
      user2PhotoURL: user2.photoURL || null,

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

export const PUT = async ({request, locals}: {request:Request, locals:locals}) => {
  // -- 1. AUTH THE USEr
  if (!locals.user) return unauthorizedResponse()

  // -- 2. GET UID
  const uid = locals.user.uid

  try {
    const { friendshipId, status } = await request.json()
    console.log(friendshipId)

    // -- GET FRIENDSHIP REF
    const friendshipRef = adminDb
        .collection('friendships')
        .doc(friendshipId)

    await friendshipRef.update({status: status, acceptedBy: uid})

    return new Response(JSON.stringify({
      message: 'Friendship updated'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    })

  } catch (error) {
    console.error(error)
    return serverErrorResponse(error)
  }
}

export const DELETE = async ({url, locals}: {url: URL, locals: locals}) => {
  // -- 1. AUTH THE USEr
  if (!locals.user) return unauthorizedResponse()

  try {
    const friendshipId = url.searchParams.get('id')

    if (!friendshipId) return badRequestResponse()

    const friendshipRef = adminDb.collection('friendships').doc(friendshipId)

    await friendshipRef.delete()

    return new Response(JSON.stringify({
      message: 'Friendship deleted'
    }))
  } catch (error) {
    console.error(error)
    return serverErrorResponse(error)
  }
}