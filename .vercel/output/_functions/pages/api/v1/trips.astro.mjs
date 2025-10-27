import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ locals }) => {
  const currentUid = locals?.user?.uid;
  if (!currentUid) {
    return new Response(JSON.stringify({ message: "currentUid is empty" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    console.log(currentUid);
    const tripsSnapshot = await adminDb.collection("trips").where("companionsUids", "array-contains", currentUid).orderBy("date.start", "desc").get();
    const trips = tripsSnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(data.date);
      console.log(doc.id);
      return {
        id: doc.id,
        name: data.name,
        location: data.location,
        theme: data.theme,
        date: {
          start: data.date.start,
          end: data.date.end
        },
        companionsUids: data.companionsUids,
        budgetIds: data.budgetIds,
        accommodationIds: data.accommodationIds,
        taskIds: data.taskIds,
        activityIds: data.activityIds,
        planningProgress: {
          completed: data.planningProgress.completed,
          total: data.planningProgress.total
        }
      };
    });
    return new Response(JSON.stringify(trips), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error("Something went wrong:", err);
    return new Response(JSON.stringify({ message: err }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ message: "Unauthorized: Not logged in." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const uid = locals.user.uid;
  const displayName = locals.user.displayName || locals.user.email || "Unknown User";
  const email = locals.user.email || "N/A";
  const photoURL = locals.user.photoURL || "";
  try {
    const body = await request.json();
    const {
      activities,
      name,
      location,
      theme,
      date
    } = body;
    if (!name || name.trim() === "") {
      return new Response(JSON.stringify({ message: "Trip name is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!location || location.trim() === "") {
      return new Response(JSON.stringify({ message: "Trip location is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!date || typeof date.end !== "string") {
      return new Response(JSON.stringify({ message: "Trip date range (start and end) is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const newTripData = {
      ownerUid: uid,
      ownerDisplayName: displayName,
      name: name.trim(),
      location: location.trim(),
      theme: theme || "peach",
      date: {
        start: date.start,
        end: date.end
      },
      planningProgress: {
        completed: 0,
        total: 5
      },
      overallBudget: 0,
      // Use nullish coalescing for default 0
      currency: "PHP",
      description: "",
      visibility: "friends-only",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      companionsUids: [uid],
      tasksIds: [],
      accommIds: [],
      transpoIds: [],
      budgetIds: [],
      activityIds: [],
      rolesIds: []
    };
    const batch = adminDb.batch();
    const tripRef = adminDb.collection("trips").doc();
    batch.set(tripRef, newTripData);
    const companionRef = tripRef.collection("companions").doc(uid);
    batch.set(companionRef, {
      uid,
      role: "admin",
      status: "accepted",
      displayName,
      email,
      photoURL,
      joinedAt: FieldValue.serverTimestamp()
    });
    const newActivityIds = [];
    const activitiesToLoop = activities ? [...activities] : [];
    for (const activity of activitiesToLoop) {
      if (activity.id) {
        delete activity.id;
      }
      const activityToSave = {
        ...activity,
        createdAt: FieldValue.serverTimestamp(),
        createdBy: uid
      };
      const activityRef = tripRef.collection("activities").doc();
      batch.set(activityRef, activityToSave);
      newActivityIds.push(activityRef.id);
    }
    if (newActivityIds.length > 0) {
      batch.update(tripRef, {
        activityIds: FieldValue.arrayUnion(...newActivityIds),
        // Use spread operator for multiple IDs
        updatedAt: FieldValue.serverTimestamp()
      });
    }
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Trip created successfully!",
      tripId: tripRef.id,
      tripData: { ...newTripData, id: tripRef.id }
    }), {
      status: 201,
      // 201 Created status
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating trip:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to create trip: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "An unexpected error occurred during trip creation." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
