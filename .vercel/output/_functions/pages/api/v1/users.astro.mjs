import { b as adminDb } from '../../../chunks/server_kP1SA6Eq.mjs';
import { u as unauthorizedResponse, b as badRequestResponse, s as serverErrorResponse } from '../../../chunks/responses_BW3oWBSX.mjs';
import 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ url, locals }) => {
  if (!locals.user) return unauthorizedResponse();
  const uid = locals.user.uid;
  const searchQuery = url.searchParams.get("search");
  if (!searchQuery) return badRequestResponse("Search Query is empty");
  try {
    const userNameSnapshot = await adminDb.collection("users").where("displayNameLowercase", ">=", searchQuery.toLowerCase()).where("displayNameLowercase", "<=", searchQuery.toLowerCase() + "~").get();
    let usersName = userNameSnapshot.docs.map((doc) => doc.data());
    const filteredUsersName = usersName.filter((user) => user.uid !== uid);
    const userEmailSnapshot = await adminDb.collection("users").where("email", ">=", searchQuery.toLowerCase()).where("email", "<=", searchQuery.toLowerCase() + "~").get();
    let usersEmail = userEmailSnapshot.docs.map((doc) => doc.data());
    const filteredUsersEmail = usersEmail.filter((user) => user.uid !== uid);
    const combinedArray = [
      ...filteredUsersEmail,
      ...filteredUsersName
    ];
    return new Response(JSON.stringify({
      message: "Successfully fetched users",
      // GET UNIQUE PROFILES
      users: Array.from(
        new Map(combinedArray.map((user) => [user.uid, user])).values()
      )
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(JSON.stringify(error));
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
