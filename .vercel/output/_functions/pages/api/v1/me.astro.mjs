import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { Filter } from 'firebase-admin/firestore';
import { u as unauthorizedResponse, n as notFoundResponse } from '../../../chunks/responses_BW3oWBSX.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ url, locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();
  const tripSnapshot = await adminDb.collection("trips").where("companionsUids", "array-contains", uid).get();
  const tripCount = tripSnapshot.docs.length;
  const friendshipSnapshot = await adminDb.collection("friendships").where(
    Filter.or(
      Filter.where("user1Uid", "==", uid),
      Filter.where("user2Uid", "==", uid)
    )
  ).get();
  const friendships = friendshipSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id
    };
  });
  const pendingFriendships = friendships.filter((f) => f.status === "pending");
  const acceptedFriendships = friendships.filter((f) => f.status === "accepted");
  const newUserData = {
    ...user.data(),
    tripCount,
    pendingFriendships,
    acceptedFriendships
  };
  if (userRef) {
    return new Response(JSON.stringify(newUserData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    return notFoundResponse("User not found");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
