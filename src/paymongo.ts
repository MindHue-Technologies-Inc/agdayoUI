// -- READY API KEY FOR PAYMONGO (THIS IS TEST API KEY)
const API_KEY = import.meta.env.PAYMONGO_SECRET_KEY;

// -- CHECK IF API KEY EXISTS
if (!API_KEY) {
  throw new Error('PAYMONGO_SECRET_KEY environment variable is not set.')
}

// -- Define Paymongo default url
const PAYMONGO_BASE_URL = 'https://api.paymongo.com/v1';

// Pre-calculate the Authorization header once
const AUTH_HEADER = `Basic ${Buffer.from(API_KEY).toString('base64')}`;

// Define default headers
const DEFAULT_HEADERS = {
  'Authorization': AUTH_HEADER,
  'Content-Type': 'application/json'
};

// -- WRAPPER FOR PAYMONGO API CALLS
export async function paymongoFetch<T>(endpoint: string, options: any = {}): Promise<object> {
  const url = `${PAYMONGO_BASE_URL}${endpoint}`;

  // Merge default headers with any custom headers provided for this specific request
  const headers = {
    ...DEFAULT_HEADERS,
    ...options.headers,
  };

  // Construct the full options object for fetch
  const fetchOptions = {
    ...options, // Inherit method, cache, etc.
    headers: headers,
  };

  // If there's a body, and it's an object, stringify it
  if (fetchOptions.body && typeof fetchOptions.body === 'object') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  // If there's a data, and it's an object, stringify it
  if (fetchOptions.data && typeof fetchOptions.data === 'object') {
    fetchOptions.data = JSON.stringify(fetchOptions.data);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // Fetch does not throw on HTTP error codes (4xx, 5xx), so we check response.ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error', status: response.status }));
      console.error(`PayMongo API Error (${response.status}):`, errorData);
      throw new Error(`PayMongo API request failed with status ${response.status}: ${errorData.message || JSON.stringify(errorData)}`);
    }

    // Always parse response as JSON for PayMongo
    return await response.json() as T;
  } catch (error) {
    console.error('Network or Parsing Error:', error);
    // Re-throw the error for the caller to handle
    throw error;
  }
}