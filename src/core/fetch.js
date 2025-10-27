const address = import.meta.env.PUBLIC_API_URL;

export const apiRequest = async ({ method = 'GET', url, params = {}, body = null, headers }) => {
  try {
    // Convert params to query string for GET/DELETE
    const queryString = (method === 'GET' || method === 'DELETE') && Object.keys(params).length
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    const fullUrl = `${address}${url}${queryString}`;

    const response = await fetch(fullUrl, {
      method,
      headers: headers ? headers : {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: (method === 'POST' || method === 'PUT') ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      return response
    }

    return response;
  } catch (err) {
    console.error(`[API ERROR] ${method} ${url}:`, err);
    throw err;
  }
};
