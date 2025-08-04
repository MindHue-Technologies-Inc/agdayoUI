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
        .where('status', '==', 'accepted')
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
