import { adminDb } from "@/core/lib/firebase/server.ts";
import type { APIRoute } from "astro";
import type {locals} from "@/core/types/locals.ts";
import type { TaskWriteData } from "@/core/types/trip-task.ts";
import {FieldValue, Filter} from "firebase-admin/firestore";
import {unauthorizedResponse, serverErrorResponse, notFoundResponse} from "@/core/responses/responses.ts";

export const prerender = false;

interface Friendship {
  id: string,
  user1Uid: string,
  user1Email: string,
  user1DisplayName: string,
  user1DisplayNameLower: string,
  user1PhotoURL: string,
  user2Uid: string,
  user2Email: string,
  user2DisplayName: string,
  user2DisplayNameLower: string,
  user2PhotoURL: string,
  status: string,
  requestedBy: string,

}

export const GET = async ({url, locals}: {url:URL, locals:locals}) => {
  // -- 1. AUTH THE USER
  if (!locals.user) return unauthorizedResponse()

  // -- 2. GET UID FROM LOCALS
  const uid = locals.user.uid

  // -- 3. QUERY THE USER IN FIRESTORE
  const userRef = adminDb
      .collection('users')
      .doc(uid)

  const user = await userRef.get()

  // -- GET NUMBER FOR TRIP
  const tripSnapshot = await adminDb
      .collection('trips')
      .where('companionsUids', 'array-contains', uid)
      .get()

  const tripCount = tripSnapshot.docs.length

  // -- GET FRIENDSHIPS
  const friendshipSnapshot = await adminDb
      .collection('friendships')
      .where(
          Filter.or(
              Filter.where('user1Uid', '==', uid),
              Filter.where('user2Uid', '==', uid)
          )
      )
      .get()

  const friendships = friendshipSnapshot.docs.map(doc=>{
    const data = doc.data()
    return {
      ...data,
      id: doc.id
    }
  })

  // -- GET PENDING FRIENDSHIP
  const pendingFriendships = friendships.filter((f)=>f.status === 'pending')
  const acceptedFriendships = friendships.filter((f)=>f.status === 'accepted')

  const newUserData = {
    ...user.data(),
    tripCount: tripCount,
    pendingFriendships: pendingFriendships,
    acceptedFriendships: acceptedFriendships,
  }

  // -- 4. VERIFY USER REF
  if (userRef) {
    return new Response(JSON.stringify(newUserData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  else {
    return notFoundResponse('User not found')
  }
}