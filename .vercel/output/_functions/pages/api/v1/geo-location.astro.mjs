export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const locationName = await request.json();
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
    const response = await fetch(geocodeUrl, {
      headers: {
        "User-Agent": "MyApp/1.0 (your_email@example.com)"
        // Required by Nominatim terms
      }
    });
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return new Response(
        JSON.stringify({ latitude: parseFloat(lat), longitude: parseFloat(lon) }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      console.warn(`Geocoding failed for: "${locationName}".`);
      return new Response(
        JSON.stringify({ error: "Location not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: "Failed to generate locations",
        details: e.message || "An unknown error occurred"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
