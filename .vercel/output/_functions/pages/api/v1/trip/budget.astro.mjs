import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { u as unauthorizedResponse, s as serverErrorResponse, b as badRequestResponse } from '../../../../chunks/responses_BW3oWBSX.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  const uid = locals.user.uid;
  let newBudgetIds = [];
  try {
    const { tripId, overallBudget, budgetBreakdown } = await request.json();
    const batch = adminDb.batch();
    const tripRef = adminDb.collection("trips").doc(tripId);
    batch.update(tripRef, {
      overallBudget: Number(overallBudget)
    });
    for (const breakdown of budgetBreakdown) {
      if (breakdown.id) {
        const budgetRef = tripRef.collection("budget").doc(breakdown.id);
        const budgetToSave = {
          ...breakdown,
          updatedBy: uid,
          updatedAt: FieldValue.serverTimestamp()
        };
        batch.update(budgetRef, budgetToSave);
      } else {
        const budgetRef = tripRef.collection("budget").doc();
        const budgetToSave = {
          ...breakdown,
          createdBy: uid,
          createdAt: FieldValue.serverTimestamp()
        };
        batch.set(budgetRef, budgetToSave);
        newBudgetIds.push(budgetRef.id);
      }
    }
    if (newBudgetIds.length > 0) {
      batch.update(tripRef, {
        budgetIds: FieldValue.arrayUnion(...newBudgetIds),
        // Add all new budget item IDs
        updatedAt: FieldValue.serverTimestamp()
        // Update the trip's timestamp
      });
    }
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Budget Successfully saved"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(error);
  }
};
const DELETE = async ({ url, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  try {
    const tripId = url.searchParams.get("tripId");
    const budgetId = url.searchParams.get("budgetId");
    if (!tripId || !budgetId) {
      return badRequestResponse("Trip ID and Budget ID are missing!");
    }
    const tripRef = adminDb.collection("trips").doc(tripId);
    const budgetRef = tripRef.collection("budget").doc(budgetId);
    const batch = adminDb.batch();
    batch.delete(budgetRef);
    batch.update(tripRef, {
      budgetIds: FieldValue.arrayRemove(budgetId),
      updatedAt: FieldValue.serverTimestamp()
    });
    batch.commit();
    return new Response(JSON.stringify({
      message: "Budget deleted successfully!"
    }));
  } catch (error) {
    console.error(error);
    return serverErrorResponse(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
