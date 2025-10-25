export const prerender = false;

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    // -- GET LOCATION NAME FROM THE REQUEST
    const locationName: string = await request.json();

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

    const response = await fetch(geocodeUrl, {
      headers: {
        'User-Agent': 'MyApp/1.0 (your_email@example.com)' // Required by Nominatim terms
      }
    });

    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];

      return new Response(
          JSON.stringify({ latitude: parseFloat(lat), longitude: parseFloat(lon) }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
      );
    } else {
      console.warn(`Geocoding failed for: "${locationName}".`);
      return new Response(
          JSON.stringify({ error: 'Location not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (e: any) {
    console.error(e);
    return new Response(
        JSON.stringify({
          error: 'Failed to generate locations',
          details: e.message || 'An unknown error occurred'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
