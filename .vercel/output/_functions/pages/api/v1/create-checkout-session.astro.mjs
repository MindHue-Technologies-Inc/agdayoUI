export { renderers } from '../../../renderers.mjs';

const API_KEY = "sk_test_J9svPxrwUb7vjNLTQYYJLut7";
const PAYMONGO_BASE_URL = "https://api.paymongo.com/v1";
const AUTH_HEADER = `Basic ${Buffer.from(API_KEY).toString("base64")}`;
const DEFAULT_HEADERS = {
  "Authorization": AUTH_HEADER,
  "Content-Type": "application/json"
};
async function paymongoFetch(endpoint, options = {}) {
  const url = `${PAYMONGO_BASE_URL}${endpoint}`;
  const headers = {
    ...DEFAULT_HEADERS,
    ...options.headers
  };
  const fetchOptions = {
    ...options,
    // Inherit method, cache, etc.
    headers
  };
  if (fetchOptions.body && typeof fetchOptions.body === "object") {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }
  if (fetchOptions.data && typeof fetchOptions.data === "object") {
    fetchOptions.data = JSON.stringify(fetchOptions.data);
  }
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error", status: response.status }));
      console.error(`PayMongo API Error (${response.status}):`, errorData);
      throw new Error(`PayMongo API request failed with status ${response.status}: ${errorData.message || JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    throw error;
  }
}

const prerender = false;
async function POST({ request }) {
  try {
    const { amount, currency = "PHP", description, remarks, successUrl, userId } = await request.json();
    if (!amount || !description || !successUrl) {
      return new Response(JSON.stringify({
        error: "Amount, description, and successUrl are required.",
        details: ""
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const response = await paymongoFetch("/checkout_sessions", {
      method: "POST",
      body: {
        data: {
          attributes: {
            payment_method_types: ["card", "gcash", "paymaya"],
            line_items: [{
              currency,
              amount: amount * 100,
              // PayMongo expects amount in centavos
              name: description,
              quantity: 1
            }],
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            description,
            remarks,
            success_url: successUrl,
            metadata: {
              userId
              // Pass your internal user ID here
            }
          }
        }
      }
    });
    return new Response(JSON.stringify({
      checkout_url: response.data.attributes.checkout_url
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      error: "Payment Failed",
      details: `${e.message}`
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
