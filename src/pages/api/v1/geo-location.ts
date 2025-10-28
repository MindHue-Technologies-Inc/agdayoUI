export const prerender = false;

const API_KEY: string = import.meta.env.MAP_API_KEY

if (!API_KEY) {
  console.error('MAP_API_KEY environment variable is not set.')
  throw new Error('MAP_API_KEY not found.')
}

export async function POST({request}: {request: Request}): Promise<Response> {
  try {
    // -- GET LOCATION NAME FROM THE REQUEST
    const locationName: string = await request.json()
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`;

    const response: Response = await fetch(geocodeUrl)
    const data: any = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const {lat, lng } = data.results[0].geometry.location;

      return new Response(JSON.stringify({latitude: lat, longitude: lng}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      console.warn(`Geocoding failed for: "${locationName}". Status: ${data.status}. Error: ${data.error_message || 'N/A'}`);
      return new Response(JSON.stringify(data.status), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (e:any) {
    console.error(e)

    // -- RETURNS A RESPONSE ERROR
    return new Response(JSON.stringify({
      error: 'Failed to generate locations',
      details: e.message || 'An unknown error occurred'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}