import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { FieldValue } from 'firebase-admin/firestore';
import { u as unauthorizedResponse, s as serverErrorResponse, n as notFoundResponse } from '../../../../chunks/responses_BW3oWBSX.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  const uid = locals.user.uid;
  try {
    const jsonRequest = await request.json();
    const { task, tripId } = jsonRequest;
    const batch = adminDb.batch();
    const tripRef = adminDb.collection("trips").doc(tripId);
    const taskDocRef = tripRef.collection("tasks").doc();
    const newTaskData = {
      ...task,
      tripId,
      // Denormalize tripId into task document
      task: task.name,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid,
      completed: false
    };
    batch.set(taskDocRef, newTaskData);
    batch.update(tripRef, {
      taskIds: FieldValue.arrayUnion(taskDocRef.id),
      updatedAt: FieldValue.serverTimestamp()
    });
    await batch.commit();
    return new Response(JSON.stringify({
      message: "Task created successfully!",
      taskId: taskDocRef.id,
      // Return the ID of the newly created task
      createdTask: { id: taskDocRef.id, ...newTaskData }
      // Optionally return the created data
    }), {
      status: 201,
      // 201 Created for successful resource creation
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof Error) {
      return serverErrorResponse(`Failed to create task: ${error.message}`);
    }
    return serverErrorResponse("An unexpected error occurred during task creation.");
  }
};
const PUT = async ({ request, locals }) => {
  if (!locals.user) {
    return unauthorizedResponse();
  }
  locals.user.uid;
  try {
    const { taskId, taskData } = await request.json();
    const tripId = taskData.tripId;
    const tripRef = adminDb.collection("trips").doc(tripId);
    const taskRef = tripRef.collection("tasks").doc(taskId);
    await taskRef.update(taskData);
    return new Response(JSON.stringify({ message: "Task updated successfully" }), {
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
  const taskId = url.searchParams.get("taskId");
  const tripId = url.searchParams.get("tripId");
  if (!taskId && !tripId || taskId === null || tripId === null) {
    return notFoundResponse();
  }
  try {
    const tripRef = adminDb.collection("trips").doc(tripId);
    const taskRef = tripRef.collection("tasks").doc(taskId);
    await taskRef.delete();
    return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
