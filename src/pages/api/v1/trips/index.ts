import { adminAuth, adminDb } from "@/lib/firebase/server.ts";
import type { locals } from "@/types/locals.ts";
import { FieldValue } from "firebase-admin/firestore";
import type {ActivityWriteData} from "@/types/trip-activity.ts";

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


export const GET = async ({locals}:{url:URL, request:Request,locals:locals}) => {
  // -- 1. GET CURRENT LOGGED IN ID
  const currentUid = locals?.user?.uid

  if (!currentUid) {
    return new Response(JSON.stringify({message: 'currentUid is empty'}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  try {
    // -- 2. GET DOCUMENT TRIPS OF USER
    console.log(currentUid)
    const tripsSnapshot = await adminDb.collection('trips')
        .where('companionsUids', 'array-contains', currentUid)
        .orderBy('date.start', 'desc')
        .get()

    // -- 3. FORMAT THE SNAPSHOT
    const trips = tripsSnapshot.docs.map((doc:any) => {
      const data = doc.data();
      console.log(data.date)
      console.log(doc.id)
      return {
        id: doc.id,
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
        }
      }
    })

    // -- 4. RETURN THE TRIPS AS RESPONSE
    return new Response(JSON.stringify(trips), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.error('Something went wrong:', err)
    return new Response(JSON.stringify({message: err}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

}

export const POST = async ({request, locals}:{request:Request, locals:locals}) => {
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Not logged in.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // -- 2. GET USER ID AND DISPLAY NAME
  const uid = locals.user.uid;
  const displayName = locals.user.displayName || locals.user.email || 'Unknown User';
  const email = locals.user.email || 'N/A';
  const photoURL = locals.user.photoURL || '';

  try {
    // -- 3. PARSE THE REQUEST BODY
    const body: CreateTripRequestBody = await request.json()

    const {
      activities,
      name,
      location,
      theme,
      date,
    } = body;

    // -- 4. BASIC VALIDATION
    if (!name || name.trim() === '') {
      return new Response(JSON.stringify({ message: 'Trip name is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!location || location.trim() === '') {
      return new Response(JSON.stringify({ message: 'Trip location is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!date || typeof date.end !== 'string') {
      return new Response(JSON.stringify({ message: 'Trip date range (start and end) is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // -- 4. CONSTRUCT THE TRIP DOCUMENT DATA
    const newTripData = {
      ownerUid: uid,
      ownerDisplayName: displayName,
      name: name.trim(),
      location: location.trim(),
      theme: theme || 'peach',
      date: {
        start: date.start,
        end: date.end,
      },
      planningProgress: {
        completed: 0,
        total: 7,
      },
      overallBudget: 0, // Use nullish coalescing for default 0
      currency: 'PHP',
      description: '',
      visibility: 'friends-only',
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

    // -- 5. USE FIRESTORE BATCH FOR ATOMICITY
    // If one operation fails, all operations in the batch fail.
    const batch = adminDb.batch();

    // -- 6. ADD THE MAIN TRIP DOCUMENT
    const tripRef = adminDb.collection('trips').doc()
    batch.set(tripRef, newTripData)

    // -- 7. ADD THE OWNER TO THE COMPANIONS
    const companionRef = tripRef.collection('companions').doc(uid)
    batch.set(companionRef, {
      uid: uid,
      role: 'admin',
      status: 'accepted',
      displayName: displayName,
      email: email,
      photoURL: photoURL,
      joinedAt: FieldValue.serverTimestamp(),
    })

    const newActivityIds: string[] = [];

    // -- 7.1 ADD ACTIVITIES IF IT EXISTS
    const activitiesToLoop = activities ? [...activities] : []
    for (const activity of activitiesToLoop) {
      if (activity.id) {
        delete activity.id
      }
      const activityToSave = {
        ...activity,
        createdAt: FieldValue.serverTimestamp(),
        createdBy: uid,
      }

      const activityRef = tripRef
          .collection('activities')
          .doc()

      batch.set(activityRef, activityToSave)

      newActivityIds.push(activityRef.id); // Collect the ID
    }

    if (newActivityIds.length > 0) {
      batch.update(tripRef, {
        activityIds: FieldValue.arrayUnion(...newActivityIds), // Use spread operator for multiple IDs
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    // -- 8. COMMIT THE BATCH
    await batch.commit();

    // -- 9. RETURN SUCCESS
    return new Response(JSON.stringify({
      message: 'Trip created successfully!',
      tripId: tripRef.id,
      tripData: { ...newTripData, id: tripRef.id }
    }), {
      status: 201, // 201 Created status
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating trip:", error);
    // Determine if it's a known input error or a server error
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: `Failed to create trip: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'An unexpected error occurred during trip creation.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}