const API_KEY = import.meta.env.MAP_API_KEY;
export const prerender = false;

if (!API_KEY) {
  console.error("Missing API_KEY environment variable. Please set it in your .env file.");
  // In a real API, you might return an error response here
}

export async function GET({request}: {request: Request}) {
  const endpoint = 'https://places.googleapis.com/v1/places:searchText';
  const body = {
    textQuery: 'Angeles Pampanga',
    languageCode: 'en',
    // You can add locationBias, rankPreference, etc., here if provided by your Gemini tool call
    // Example for locationBias (circular region):
    // locationBias: {
    //   circle: {
    //     center: { latitude: 34.052235, longitude: -118.243683 }, // Example: Los Angeles
    //     radius: 500.0 // meters
    //   }
    // },
    // The curl example didn't include locationBias, but you'd add it here if needed.
  };
  const params = {
    method: "POST",
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'Content-Type': 'application/json',
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel',
    },
    body: JSON.stringify(body)
  };

  const response = await fetch(endpoint, params)
  console.log(await response.json())
  return new Response('GOODs')
}