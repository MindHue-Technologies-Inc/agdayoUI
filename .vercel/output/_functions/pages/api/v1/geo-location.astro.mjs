export { renderers } from '../../../renderers.mjs';

const prerender = false;
const API_KEY = "AIzaSyD0ueloZ3TtHb8vff0f7R5Umdihxfu_FyQ";
async function POST({ request }) {
  try {
    const locationName = await request.json();
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return new Response(JSON.stringify({ latitude: lat, longitude: lng }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      console.warn(`Geocoding failed for: "${locationName}". Status: ${data.status}. Error: ${data.error_message || "N/A"}`);
      return new Response(JSON.stringify(data.status), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({
      error: "Failed to generate locations",
      details: e.message || "An unknown error occurred"
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
