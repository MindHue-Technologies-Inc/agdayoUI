export const prerender = false;


// Function Declaration for Gemini
const findPlacesTool = {
  function_declarations: [
    {
      name: "find_places_nearby",
      description: "Finds real-world places (e.g., restaurants, beaches, hotels) based on a text query, an optional specific type, and an optional location bias. Useful for discovering points of interest.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The general search query (e.g., 'best pizza', 'hiking trails', 'places to relax').",
          },
          place_type: {
            type: "string",
            description: "Optional: A specific type of place to filter results. Examples include 'restaurant', 'beach', 'cafe', 'hotel', 'park', 'shopping_mall', 'museum'. Use singular lowercase.",
            enum: [
              "restaurant",
              "beach",
              "cafe",
              "hotel",
              "park",
              "shopping_mall",
              "museum",
              // Add more relevant types as needed from Google's Place Types:
              // https://developers.google.com/maps/documentation/places/web-service/supported_types
            ],
          },
          location_bias: {
            type: "string",
            description: "Optional: A geographical bias for the search, e.g., 'Angeles City', 'Olongapo City', or a 'latitude,longitude' pair (e.g., '15.1706,120.5925'). If not provided, the search will be biased towards the current location (Angeles City) or where the user's IP suggests.",
          },
        },
        required: ["query"],
      },
    },
  ],
};

// IMPORTANT: Ensure your .env file has Maps_API_KEY
const Maps_API_KEY = import.meta.env.MAP_API_KEY;

if (!Maps_API_KEY) {
  console.error("Maps_API_KEY is not set in your .env file.");
}

export async function POST({ request }: {request: Request}) {
  if (!Maps_API_KEY) {
    return new Response(JSON.stringify({ error: "Server API key is not configured." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestBody = await request.json();
    const { query, location_bias, place_type, languageCode = 'en' } = requestBody;

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing "query" parameter in request body.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const endpoint = 'https://places.googleapis.com/v1/places:searchText';

    const placesApiRequestBody = {
      textQuery: query,
      languageCode: languageCode,
      includedType: '',
      // Default to Angeles City coordinates if no location_bias is provided
      // or if it's a generic city name.
      // This is the "current location" context you mentioned.
      locationBias: {
        circle: {
          center: { latitude: 15.1499, longitude: 120.5979 }, // Coordinates for Angeles City, Pampanga
          radius: 50000.0 // 50km radius
        }
      }
    };

    // If a specific location_bias is provided by Gemini
    if (location_bias) {
      // Simple parsing: if it contains a comma, assume it's lat,lng
      if (typeof location_bias === 'string' && location_bias.includes(',')) {
        const [latStr, lngStr] = location_bias.split(',');
        const lat = parseFloat(latStr.trim());
        const lng = parseFloat(lngStr.trim());
        if (!isNaN(lat) && !isNaN(lng)) {
          placesApiRequestBody.locationBias = {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 50000.0 // Still using a 50km radius for explicit lat/lng bias
            }
          };
        } else {
          // Fallback to query if coordinates are invalid
          placesApiRequestBody.textQuery = `${query} in ${location_bias}`;
        }
      } else {
        // If it's a text string (city name), incorporate into query for better results
        // or you could geocode it first to get precise coordinates for locationBias.
        placesApiRequestBody.textQuery = `${query} in ${location_bias}`;
        // Optionally, remove the default locationBias if a specific text location is given
        delete placesApiRequestBody.locationBias;
      }
    }

    if (place_type) {
      placesApiRequestBody.includedType = place_type; // Maps Gemini's place_type to includedType for the API
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': Maps_API_KEY,
        // Crucial: specify the fields you want to receive back
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.userRatingCount,places.location,places.types,places.websiteUri,places.photos,places.internationalPhoneNumber',
      },
      body: JSON.stringify(placesApiRequestBody),
    });

    const data = await response.json();

    if (response.ok && data.places) {
      const places = data.places.map((place:any) => ({
        displayName: place.displayName?.text,
        formattedAddress: place.formattedAddress,
        priceLevel: place.priceLevel,
        rating: place.rating,
        userRatingCount: place.userRatingCount,
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        types: place.types || [], // Get the list of types for the place
        websiteUri: place.websiteUri,
        phoneNumber: place.internationalPhoneNumber,
        // You might need a separate call to Places Photos API for full photo URLs,
        // but 'photos' field might give you references.
        // photos: place.photos // This would be photo references
      }));
      return new Response(JSON.stringify({ status: 'success', places: places }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Google Places API Error:', data);
      return new Response(JSON.stringify({
        status: 'error',
        message: data.error?.message || 'Failed to fetch places from Google API.',
        details: data.error // Include more error details for debugging
      }), {
        status: response.status || 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in Astro API route:', error);
    return new Response(JSON.stringify({ status: 'error', message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}