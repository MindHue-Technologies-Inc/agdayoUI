export { renderers } from '../../../renderers.mjs';

const prerender = false;
const Maps_API_KEY = "AIzaSyD0ueloZ3TtHb8vff0f7R5Umdihxfu_FyQ";
async function POST({ request }) {
  try {
    const requestBody = await request.json();
    const { query, location_bias, place_type, languageCode = "en" } = requestBody;
    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing "query" parameter in request body.' }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const endpoint = "https://places.googleapis.com/v1/places:searchText";
    const placesApiRequestBody = {
      textQuery: query,
      languageCode,
      includedType: "",
      // Default to Angeles City coordinates if no location_bias is provided
      // or if it's a generic city name.
      // This is the "current location" context you mentioned.
      locationBias: {
        circle: {
          center: { latitude: 15.1499, longitude: 120.5979 },
          // Coordinates for Angeles City, Pampanga
          radius: 5e4
          // 50km radius
        }
      }
    };
    if (location_bias) {
      if (typeof location_bias === "string" && location_bias.includes(",")) {
        const [latStr, lngStr] = location_bias.split(",");
        const lat = parseFloat(latStr.trim());
        const lng = parseFloat(lngStr.trim());
        if (!isNaN(lat) && !isNaN(lng)) {
          placesApiRequestBody.locationBias = {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 5e4
              // Still using a 50km radius for explicit lat/lng bias
            }
          };
        } else {
          placesApiRequestBody.textQuery = `${query} in ${location_bias}`;
        }
      } else {
        placesApiRequestBody.textQuery = `${query} in ${location_bias}`;
        delete placesApiRequestBody.locationBias;
      }
    }
    if (place_type) {
      placesApiRequestBody.includedType = place_type;
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": Maps_API_KEY,
        // Crucial: specify the fields you want to receive back
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.userRatingCount,places.location,places.types,places.websiteUri,places.photos,places.internationalPhoneNumber"
      },
      body: JSON.stringify(placesApiRequestBody)
    });
    const data = await response.json();
    if (response.ok && data.places) {
      const places = data.places.map((place) => ({
        displayName: place.displayName?.text,
        formattedAddress: place.formattedAddress,
        priceLevel: place.priceLevel,
        rating: place.rating,
        userRatingCount: place.userRatingCount,
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        types: place.types || [],
        // Get the list of types for the place
        websiteUri: place.websiteUri,
        phoneNumber: place.internationalPhoneNumber
        // You might need a separate call to Places Photos API for full photo URLs,
        // but 'photos' field might give you references.
        // photos: place.photos // This would be photo references
      }));
      console.log(places);
      return new Response(JSON.stringify({ status: "success", places }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      console.error("Google Places API Error:", data);
      return new Response(JSON.stringify({
        status: "error",
        message: data.error?.message || "Failed to fetch places from Google API.",
        details: data.error
        // Include more error details for debugging
      }), {
        status: response.status || 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Error in Astro API route:", error);
    return new Response(JSON.stringify({ status: "error", message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
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
