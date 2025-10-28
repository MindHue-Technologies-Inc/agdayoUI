import { b as adminDb } from '../../../../chunks/server_kP1SA6Eq.mjs';
import { Filter } from 'firebase-admin/firestore';
import { u as unauthorizedResponse } from '../../../../chunks/responses_BW3oWBSX.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const GET = async ({ locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  try {
    const friendshipSnapshot = await adminDb.collection("friendships").where("status", "==", "accepted").where(
      Filter.or(
        Filter.where(user1Uid, "==", uid),
        Filter.where(user2Uid)
      )
    ).get();
    const data = friendshipSnapshot.docs.map((doc) => doc.data());
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
