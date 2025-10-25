export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const requestBody = await request.json();
    const { query, place_type, location_bias } = requestBody;

    if (!query && !place_type) {
      return new Response(JSON.stringify({ error: 'Missing "query" or "place_type" parameter.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Default: Angeles City
    let lat = 15.1499;
    let lon = 120.5979;

    // Parse coordinates if provided
    if (location_bias && typeof location_bias === 'string' && location_bias.includes(',')) {
      const [latStr, lonStr] = location_bias.split(',');
      const parsedLat = parseFloat(latStr.trim());
      const parsedLon = parseFloat(lonStr.trim());
      if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
        lat = parsedLat;
        lon = parsedLon;
      }
    } else if (location_bias) {
      // Optional: geocode the location_bias text to lat/lon
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location_bias)}&format=json&limit=1`;
      const geoRes = await fetch(geocodeUrl, {
        headers: { 'User-Agent': 'MyApp/1.0 (your_email@example.com)' },
      });
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        lat = parseFloat(geoData[0].lat);
        lon = parseFloat(geoData[0].lon);
      }
    }

    // Map Google’s place_type to OpenStreetMap “amenity” or “tourism” tags
    const osmTypeMap: Record<string, string[]> = {
      restaurant: ['restaurant'],
      cafe: ['cafe', 'coffee_shop'],
      hotel: ['hotel', 'motel', 'guest_house'],
      park: ['park'],
      museum: ['museum'],
      shopping_mall: ['mall', 'department_store', 'supermarket'],
      beach: ['beach'],
    };

    const tags = place_type && osmTypeMap[place_type]
        ? osmTypeMap[place_type]
        : [query.toLowerCase()]; // fallback: search by keyword

    // Build Overpass query dynamically
    const radius = 5000; // 5 km
    const overpassQuery = `
      [out:json][timeout:25];
      (
        ${tags.map(t => `node["amenity"="${t}"](around:${radius},${lat},${lon});`).join('\n')}
        ${tags.map(t => `way["amenity"="${t}"](around:${radius},${lat},${lon});`).join('\n')}
        ${tags.map(t => `node["tourism"="${t}"](around:${radius},${lat},${lon});`).join('\n')}
      );
      out center;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
      headers: {
        "Content-Type": "text/plain",
        "User-Agent": "MyApp/1.0 (your_email@example.com)"
      }
    });

    const data = await response.json();

    const places = data.elements.map((el: any) => ({
      id: el.id,
      displayName: el.tags?.name || "Unnamed Place",
      type: el.tags?.amenity || el.tags?.tourism || "unknown",
      latitude: el.lat || el.center?.lat,
      longitude: el.lon || el.center?.lon,
      address: el.tags?.addr_full || `${el.tags?.addr_street || ''} ${el.tags?.addr_city || ''}`.trim(),
    }));

    return new Response(JSON.stringify({ status: "success", count: places.length, places }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching places:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
