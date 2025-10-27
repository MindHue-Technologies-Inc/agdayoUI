/**
 * Returns an unauthorized (401) HTTP response.
 * @param message An optional custom message.
 */
export function unauthorizedResponse(message: string = 'Unauthorized: Not logged in.'): Response {
  return new Response(JSON.stringify({ message:message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Returns a forbidden (403) HTTP response.
 * @param message An optional custom message.
 */
export function forbiddenResponse(message: string = 'Forbidden: You do not have permission to perform this action.'): Response {
  return new Response(JSON.stringify({ message:message }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Returns a not found (404) HTTP response.
 * @param message An optional custom message.
 */
export function notFoundResponse(message: string = 'Resource not found.'): Response {
  return new Response(JSON.stringify({ message:message }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Returns a bad request (400) HTTP response.
 * @param message An optional custom message.
 */
export function badRequestResponse(message: string = 'Bad Request: Invalid input.'): Response {
  return new Response(JSON.stringify({ message:message }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Returns an internal server error (500) HTTP response.
 * @param message An optional custom message.
 */
export function serverErrorResponse(message: string = 'An unexpected server error occurred.'): Response {
  return new Response(JSON.stringify({ message:message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}