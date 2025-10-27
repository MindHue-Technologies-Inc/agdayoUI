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
  // -- 1. AUTH THE USER
  if (!locals.user) {
    return unauthorizedResponse()
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid

  // -- INITIATE BUDGETIDS
  let newBudgetIds: string[] = [];

  try {
    // -- 3. GET REQUEST DATA
    const { tripId, overallBudget, budgetBreakdown } = await request.json()

    // -- 4. INITIATE FIRESTORE BATCH
    const batch = adminDb.batch()

    // -- 5. GET TRIP REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- UPDATE OVERALL BUDGET OF TRIP
    batch.update(tripRef, {
      overallBudget: Number(overallBudget)
    })

    // -- 6. FOR LOOP EACH BREAKDOWN
    for (const breakdown of budgetBreakdown) {
      if (breakdown.id) {
        const budgetRef = tripRef.collection('budget').doc(breakdown.id)
        // -- INITIATE DATA TO SAVE
        const budgetToSave = {
          ...breakdown,
          updatedBy: uid,
          updatedAt: FieldValue.serverTimestamp(),
        }
        batch.update(budgetRef, budgetToSave)

      } else {
        const budgetRef = tripRef.collection('budget').doc()

        // -- INITIATE DATA TO SAVE
        const budgetToSave = {
          ...breakdown,
          createdBy: uid,
          createdAt: FieldValue.serverTimestamp(),
        }
        batch.set(budgetRef, budgetToSave)

        // Collect the ID of the newly created budget item
        newBudgetIds.push(budgetRef.id);
      }
    }

    // -- UPDATE THE LIST OF BUDGET IDS IN TRIP
    if (newBudgetIds.length > 0) {
      batch.update(tripRef, {
        budgetIds: FieldValue.arrayUnion(...newBudgetIds), // Add all new budget item IDs
        updatedAt: FieldValue.serverTimestamp(),           // Update the trip's timestamp
      });
    }

    // -- COMMIT CHANGES
    await batch.commit()

    // -- RETURN RESPONSE
    return new Response(JSON.stringify({
      message: 'Budget Successfully saved',
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

  try {
    // -- GET TRIP ID AND BUDGET ID
    const tripId = url.searchParams.get('tripId')
    const budgetId = url.searchParams.get('budgetId')

    if (!tripId || !budgetId) {
      return badRequestResponse('Trip ID and Budget ID are missing!')
    }

    // -- GET TRIP REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- GET BUDGET REF
    const budgetRef = tripRef.collection('budget').doc(budgetId)

    // -- INIT BATCH
    const batch = adminDb.batch()

    // -- DELETE BUDGET
    batch.delete(budgetRef)

    // -- REMOVE BUDGET ID FROM TRIP'S budgetIds ARRAY
    batch.update(tripRef, {
      budgetIds: FieldValue.arrayRemove(budgetId),
      updatedAt: FieldValue.serverTimestamp(),
    });

    batch.commit()

    // -- RETURN RESPONSE
    return new Response(JSON.stringify({
      message: 'Budget deleted successfully!'
    }))
  } catch (error:any) {
    console.error(error)
    return serverErrorResponse(error)
  }
}