import {adminDb} from "@/core/lib/firebase/server.ts";
import type {locals} from "@/core/types/locals.ts";
import { FieldValue } from "firebase-admin/firestore";
import type {ActivityWriteData} from "@/core/types/trip-activity.ts";

export const prerender = false;

// Interface for the incoming request body
interface CreateTripRequestBody {
  name: string;
  activities: ActivityWriteData[],
  location: string;
  theme?: string; // Optional field
  date: {
    start: string; // Expecting ISO string or similar date string
    end: string;   // Expecting ISO string or similar date string
  };
  overallBudget?: number; // Optional field, defaults to 0
  currency?: string;      // Optional field, defaults to ''
  description?: string;   // Optional field, defaults to ''
}

// Interface for the data returned from the database, including the subcollection
interface ActivityReturnData extends ActivityWriteData {
  id: string; // The Firestore document ID for the activity
}

interface TripReturnData {
  id: string;
  name: string;
  location: string;
  theme?: string;
  date: {
    start: string;
    end: string;
  };
  companionsUids: string[];
  budgetIds: string[];
  accommodationIds: string[];
  taskIds: string[];
  activityIds: string[];
  planningProgress: {
    completed: number;
    total: number;
  };
  status: 'Upcoming' | 'Active' | 'Completed'; // The status of the trip based on the dates
  activities: ActivityReturnData[]; // The fetched subcollection data
}

function checkUpcoming(dateStart: string, dateEnd: string) {
  const currentDate = new Date()
  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)
  // Add a day to the end date to make the 'Active' check inclusive of the last day
  endDate.setDate(endDate.getDate() + 1);

  if ( currentDate < startDate) return 'Upcoming'
  if ( startDate <= currentDate && currentDate < endDate ) return 'Active'
  return 'Completed' // If the end date is past, the trip is completed
}

export const GET = async ({ locals }: { url: URL, request: Request, locals: locals }) => {
  // -- 1. GET CURRENT LOGGED IN ID
  const currentUid = locals?.user?.uid

  if (!currentUid) {
    return new Response(JSON.stringify({ message: 'currentUid is empty' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const today = new Date();

  try {
    // -- 2. GET DOCUMENT TRIPS OF USER
    // The query is optimized to get only current and upcoming trips
    const tripsSnapshot = await adminDb
        .collection('trips')
        .where('companionsUids', 'array-contains', currentUid)
        .get();

    if (tripsSnapshot.empty) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // --- 3. CONCURRENTLY FETCH SUBCOLLECTIONS FOR EACH TRIP ---
    // We create an array of promises, each promise fetching a trip and its subcollection.
    const tripsWithSubcollectionsPromises = tripsSnapshot.docs.map(async (doc: any) => {
      const data = doc.data();
      const tripId = doc.id;

      // Fetch the 'activities' subcollection for the current trip
      const activitiesSnapshot = await adminDb
          .collection('trips')
          .doc(tripId)
          .collection('activities')
          .get();
      const activities = activitiesSnapshot.docs.map((subDoc: any) => ({
        id: subDoc.id,
        ...subDoc.data()
      }));

      // Combine the trip data with the activities and add the status
      return {
        id: tripId,
        name: data.name,
        location: data.location,
        theme: data.theme,
        date: {
          start: data.date.start,
          end: data.date.end,
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
        activities: activities,
      };
    });

    // Resolve all promises to get the full list of trips with their subcollections
    const tripsWithActivities: TripReturnData[] = await Promise.all(tripsWithSubcollectionsPromises);

    // --- 4. SORT THE FINAL RESULTS CLIENT-SIDE ---
    // The query can't sort on 'date.start' because the 'where' clause is on 'date.end'.
    // So we sort the array in memory after fetching all data.
    tripsWithActivities.sort((a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime());

    // -- 5. RETURN THE TRIPS AS A RESPONSE
    return new Response(JSON.stringify(tripsWithActivities), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (err) {
    console.error('Something went wrong:', err);
    return new Response(JSON.stringify({ message: 'Something went wrong while fetching trips' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
