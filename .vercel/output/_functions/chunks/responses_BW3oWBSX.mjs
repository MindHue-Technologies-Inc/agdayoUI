function unauthorizedResponse(message = "Unauthorized: Not logged in.") {
  return new Response(JSON.stringify({ message }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}
function forbiddenResponse(message = "Forbidden: You do not have permission to perform this action.") {
  return new Response(JSON.stringify({ message }), {
    status: 403,
    headers: { "Content-Type": "application/json" }
  });
}
function notFoundResponse(message = "Resource not found.") {
  return new Response(JSON.stringify({ message }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}
function badRequestResponse(message = "Bad Request: Invalid input.") {
  return new Response(JSON.stringify({ message }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
}
function serverErrorResponse(message = "An unexpected server error occurred.") {
  return new Response(JSON.stringify({ message }), {
    status: 500,
    headers: { "Content-Type": "application/json" }
  });
}

export { badRequestResponse as b, forbiddenResponse as f, notFoundResponse as n, serverErrorResponse as s, unauthorizedResponse as u };
