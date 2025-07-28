import { adminDb } from "../../../../lib/firebase/server.ts";
import type { APIRoute } from "astro";
import type {locals} from "../../../../types/locals.ts";
import type { TaskWriteData } from "../../../../types/trip-task.ts";
import {FieldValue} from "firebase-admin/firestore";
import {unauthorizedResponse, serverErrorResponse, notFoundResponse} from "../../../../responses/responses.ts";

export const prerender = false;

export const POST = async ({request, locals}: {request: Request, locals:locals}) => {
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return unauthorizedResponse();
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid;

  try {
    // -- 3. REQUEST JSON
    const jsonRequest = await request.json()

    // -- 4. DECONSTRUCT the request json
    const { task, tripId }: {task:TaskWriteData, tripId: string} = jsonRequest

    // -- INIT BATCH
    const batch = adminDb.batch()

    // -- 5. GET TRIP REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 6. GET TASK REF
    const taskDocRef = tripRef.collection('tasks').doc()

    // -- 6. CREATE TASK DATA
    const newTaskData = {
      ...task,
      tripId: tripId, // Denormalize tripId into task document
      task: task.name,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid,
      completed: false,
    }

    // -- 7. CREATE
    batch.set(taskDocRef, newTaskData)

    // -- UPDATE TRIPREF TASK IDS
    batch.update(tripRef, {
      taskIds: FieldValue.arrayUnion(taskDocRef.id),
      updatedAt: FieldValue.serverTimestamp(),
    })

    // -- COMMIT BATCH
    await batch.commit()

    // -- 8. Return Success Response
    return new Response(JSON.stringify({
      message: 'Task created successfully!',
      taskId: taskDocRef.id, // Return the ID of the newly created task
      createdTask: { id: taskDocRef.id, ...newTaskData } // Optionally return the created data
    }), {
      status: 201, // 201 Created for successful resource creation
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    // 13. Return proper error response to the client
    if (error instanceof Error) {
      return serverErrorResponse(`Failed to create task: ${error.message}`)
    }

    return serverErrorResponse('An unexpected error occurred during task creation.')
  }
}

export const PUT = async ({request, locals}:{request:Request, locals:locals}) => {
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return unauthorizedResponse();
  }

  // -- 2. GET USER ID
  const uid = locals.user.uid;

  try {
    // -- 3. GET REQUEST JSON
    const {taskId, taskData} = await request.json()

    // -- 4. GET TRIP ID
    const tripId = taskData.tripId

    // -- 5. GET TASK REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 6. GET TASK REF
    const taskRef = tripRef.collection('tasks').doc(taskId)

    // -- 7. UPDATE TASK
    await taskRef.update(taskData)

    return new Response(JSON.stringify({message:'Task updated successfully'}), {
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
  // -- 1. CHECK IF USER IS AUTHENTICATED
  if (!locals.user) {
    return unauthorizedResponse();
  }

  // -- 1. GET ACTIVITY ID
  const taskId = url.searchParams.get('taskId')

  // -- 2. GET TRIP ID
  const tripId = url.searchParams.get('tripId')

  // -- 3. CHECK IF ACTIVITY ID EXISTS
  if (!taskId && !tripId || taskId === null || tripId === null) {
    return notFoundResponse()
  }

  try {

    // -- 5. GET TASK REF
    const tripRef = adminDb.collection('trips').doc(tripId)

    // -- 6. GET TASK REF
    const taskRef = tripRef.collection('tasks').doc(taskId)

    // -- 7. UPDATE TASK
    await taskRef.delete()

    return new Response(JSON.stringify({message:'Task deleted successfully'}), {
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