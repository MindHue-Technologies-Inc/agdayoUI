import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
function checkUpcoming(dateStart, dateEnd) {
  const currentDate = /* @__PURE__ */ new Date();
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  endDate.setDate(endDate.getDate() + 1);
  if (currentDate < startDate) return "Upcoming";
  if (startDate <= currentDate && currentDate < endDate) return "Active";
  return "Completed";
}
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
    const tripsSnapshot = await adminDb.collection("trips").where("companionsUids", "array-contains", currentUid).get();
    if (tripsSnapshot.empty) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const tripsWithSubcollectionsPromises = tripsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const tripId = doc.id;
      const activitiesSnapshot = await adminDb.collection("trips").doc(tripId).collection("activities").get();
      const activities = activitiesSnapshot.docs.map((subDoc) => ({
        id: subDoc.id,
        ...subDoc.data()
      }));
      return {
        id: tripId,
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
        },
        status: checkUpcoming(data.date.start, data.date.end),
        activities
      };
    });
    const tripsWithActivities = await Promise.all(tripsWithSubcollectionsPromises);
    tripsWithActivities.sort((a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime());
    return new Response(JSON.stringify(tripsWithActivities), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error("Something went wrong:", err);
    return new Response(JSON.stringify({ message: "Something went wrong while fetching trips" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
