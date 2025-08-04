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
import { Filter } from 'firebase-admin/firestore'


export const prerender = false;

export const GET = async({url, locals}: {url:URL, locals:locals}) => {
  // -- 1. AUTH THE USER
  if (!locals.user) return unauthorizedResponse()

  // -- GET UID
  const uid = locals.user.uid

  // -- 2. GET THE SEARCH QUERY
  const searchQuery = url.searchParams.get('search')

  // -- 4. VERIFY SEARCH QUERY
  if (!searchQuery) return badRequestResponse('Search Query is empty')

  try {
    // -- 5. GET REF FOR USERS
    const userNameSnapshot = await adminDb
        .collection('users')
        .where("displayNameLowercase", ">=", searchQuery.toLowerCase())
        .where("displayNameLowercase", "<=", searchQuery.toLowerCase() + '~')
        .get()

    let usersName = userNameSnapshot.docs.map(doc => doc.data());
    const filteredUsersName = usersName.filter(user => user.uid !== uid);

    const userEmailSnapshot = await adminDb
        .collection('users')
        .where("email", ">=", searchQuery.toLowerCase())
        .where("email", "<=", searchQuery.toLowerCase() + '~')
        .get()

    let usersEmail = userEmailSnapshot.docs.map(doc => doc.data());
    const filteredUsersEmail = usersEmail.filter(user => user.uid !== uid);

    const combinedArray = [
        ...filteredUsersEmail,
        ...filteredUsersName,
    ]

    return new Response(JSON.stringify({
      message: 'Successfully fetched users',

      // GET UNIQUE PROFILES
      users: Array.from(
          new Map(combinedArray.map(user => [user.uid, user])).values()
      )
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error:any) {
    console.error(error)
    return serverErrorResponse(JSON.stringify(error))
  }
}