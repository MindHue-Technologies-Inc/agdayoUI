import { adminDb } from "../../../../lib/firebase/server.ts";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET:APIRoute = async ({url} ) => {
  // -- 1. GET ID OF TRIP AND VERIFY
  const tripId = url.searchParams.get('tripId')

  // -- 2. IF TRIPID IS EMPTY SEND 400
  if (!tripId) {
    return new Response(JSON.stringify({message: 'Trip not found'}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    // -- 3. GET REFERENCE TO TRIP FROM FIRESTORE
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 4. GET TRIP DOCUMENT
    const trip = await tripRef.get()

    // -- 5. SAVE TRIP DATA TO TRIPDATA
    const tripData = trip.data()

    // -- 6. GET COMPANIONS SNAPSHOT
    const companionsSnapshot = await tripRef.collection('companions').get()

    const companions = companionsSnapshot.docs.map(doc=>{
      const data = doc.data();
      return {
        ...data,
        id: doc.id, // The document ID is typically the companion's UID here
      };
    })

    return new Response(JSON.stringify({...tripData, companions: companions}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('ERROR IN FETCHING TRIP', error)
    return new Response(JSON.stringify({message: error}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}