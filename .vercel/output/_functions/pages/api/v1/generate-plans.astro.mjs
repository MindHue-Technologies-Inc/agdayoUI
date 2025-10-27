import { GoogleGenAI } from '@google/genai';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GEMINI_API_KEY = "AIzaSyAcPq79nQuqhbmGrwKXI9jpOnmVgMaYHCM";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const CURRENT_DATE_TIME = (/* @__PURE__ */ new Date()).toISOString();
const findPlacesToolDeclaration = {
  name: "find_places_nearby",
  description: `Finds real-world places (e.g., restaurants, beaches, hotels, landmarks) using a database. This tool is essential for providing accurate locations in the itinerary.`,
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The general search query (e.g., 'best pizza', 'hiking trails', 'places to relax'). This is a mandatory field."
      },
      place_type: {
        type: "string",
        description: "Optional: A specific type of place to filter results. Examples include 'restaurant', 'beach', 'cafe', 'hotel', 'park', 'shopping_mall', 'museum', 'lodging', 'tourist_attraction', 'historical_site'. Use singular lowercase. Only use types from the enum if possible.",
        enum: [
          "restaurant",
          "beach",
          "cafe",
          "hotel",
          "park",
          "shopping_mall",
          "museum",
          "lodging",
          "tourist_attraction",
          "historical_site",
          "airport",
          "bus_station",
          "train_station",
          "church",
          "art_gallery",
          "bar",
          "book_store",
          "car_rental",
          "gym",
          "hospital",
          "light_rail_station",
          "night_club",
          "pharmacy",
          "police",
          "post_office",
          "school",
          "spa",
          "stadium",
          "supermarket",
          "zoo"
        ]
      },
      location_bias: {
        type: "string",
        description: `Optional: A geographical bias for the search, e.g., 'Baguio City, Philippines' or '15.1706,120.5925'.`
      }
    },
    required: ["query"]
  }
};
const responseSchema = {
  type: "OBJECT",
  properties: {
    activities: {
      type: "ARRAY",
      description: "An array of daily itinerary plans. Ensure all specified fields for each activity are filled. Each activity must have a real, specific location.",
      items: {
        type: "OBJECT",
        properties: {
          datetime: {
            type: "STRING",
            description: "ISO 8601 full date and time string (e.g., 'YYYY-MM-DDTHH:MM:SS'). This MUST include both date and time. Do not add Z at the end of datetime."
          },
          coordinates: {
            type: "OBJECT",
            description: "Map coordinates of the location.",
            properties: {
              latitude: {
                type: "STRING",
                description: "Latitude coordinate of the location"
              },
              longitude: {
                type: "STRING",
                description: "Longitude coordinate of the location"
              }
            }
          },
          date: {
            type: "STRING",
            description: "ISO 8601 but just the date (e.g., 'YYYY-MM-DD'). Use the datetime for reference."
          },
          time: {
            type: "STRING",
            description: "Time format would be HH:MM. It is in 24-hour format. Use datetime for reference."
          },
          description: {
            type: "STRING",
            description: "A very short description about this activity."
          },
          iconName: {
            type: "STRING",
            description: "A suitable Phosphor icon name, always prefixed with 'ph-' (e.g., 'ph-bus', 'ph-coffee', 'ph-tree', 'ph-bowl-food', 'ph-palette', 'ph-bed', 'ph-pizza', 'ph-church', 'ph-shopping-bag', 'ph-airplane-takeoff', 'ph-rowboat', 'ph-mountain', 'ph-horse', 'ph-wine', 'ph-heart', 'ph-suitcase-rolling', 'ph-leaf', etc.). Choose the most relevant icon for the activity. DO NOT omit this field."
          },
          title: {
            type: "STRING",
            description: "A short title for the activity. Do not combine multiple activities or whole day plans into a single title. Keep it less than twenty words. Do NOT include dates or times in this title, as they are provided separately in the `datetime` field. (e.g., Arrive at Bus Terminal, Dine-in at Good Taste, etc.)"
          },
          location: {
            type: "STRING",
            description: "The specific, real-world name of the place and its city/town (e.g., 'Victory Liner Terminal, Baguio City, Philippines'). This MUST be a verifiable place on Google Maps. Do NOT omit this field. Always include Country Name."
          },
          cost: {
            type: "NUMBER",
            description: "The estimated cost of this activity as a number (e.g., 540.00). Use 0 if the activity is generally considered free (e.g., a park visit without special rentals). Provide a reasonable numerical estimate."
          },
          costCurrency: {
            type: "STRING",
            description: "Currency of the provided cost in 3-letter code; uppercased. (e.g., PHP, USD, JPY)"
          },
          costNote: {
            type: "STRING",
            description: "A brief note clarifying the cost, such as '/ Person Ticket', '(Boat Rental Est.)', 'Included in Accommodation', or 'Depends on purchases'. Leave this empty if no specific note is applicable, but do NOT omit the field."
          }
        }
      }
    }
  }
};
async function callAstroPlacesApi(query, location_bias, place_type) {
  const ASTRO_PLACES_API_URL = process.env.NODE_ENV === "production" ? "https://agdayo-ui.vercel.app/api/v2/maps-places" : "http://localhost:4321/api/v2/maps-places";
  try {
    const response = await fetch(ASTRO_PLACES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, location_bias, place_type })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error calling Astro Places API (${response.status}):`, errorData);
      throw new Error(`Places API call failed: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in callAstroPlacesApi:", error);
    return { status: "error", message: `Internal API call failed: ${error.message}` };
  }
}
async function POST({ request }) {
  try {
    const { prompt, currentActivities } = await request.json();
    console.log(prompt, currentActivities);
    const initialContents = [
      {
        role: "user",
        parts: [
          {
            text: `You are an expert itinerary planner. Generate a detailed, realistic, and sequential travel itinerary based on the user's request.
        
        Always suggest real, verifiable locations. You MUST use the 'find_places_nearby' tool to search for locations if you need to find specific places like restaurants, beaches, museums, etc. Do NOT hallucinate locations.
        
        Always suggest real places to eat.
        
        The current date is ${CURRENT_DATE_TIME}.
        
        Your response MUST be ONLY a JSON object matching the provided schema. DO NOT include any conversational text, preambles, or markdown formatting (e.g., \`\`\`json). Just the raw JSON object.
        
        Example JSON Structure for your final output:`
          },
          {
            text: JSON.stringify({
              activities: [
                {
                  id: "abc123def456",
                  datetime: "2025-07-01T08:30:00",
                  date: "2025-07-01",
                  time: "08:30",
                  description: "Enjoy a warm cup of coffee.",
                  iconName: "ph-coffee",
                  title: "Morning Coffee & Pastries at Tsokolateria",
                  location: "Tsokolateria, Igorot Park, Baguio City, Philippines",
                  cost: 250,
                  costCurrency: "PHP",
                  costNote: "/ Person (Est.)",
                  coordinates: {
                    latitude: 120.53542600000002,
                    longitude: 15.173604
                  }
                },
                {
                  id: "xyz789uvw012",
                  datetime: "2025-07-01T10:00:00",
                  date: "2025-07-01",
                  time: "10:00",
                  description: "Relax and take photos.",
                  iconName: "ph-leaf",
                  title: "Relaxing Stroll at Camp John Hay Eco-Trail",
                  location: "Camp John Hay, Baguio City, Philippines",
                  cost: 0,
                  costCurrency: "PHP",
                  costNote: "Entrance Fee: Free",
                  coordinates: {
                    latitude: 120.53542600000002,
                    longitude: 15.173604
                  }
                }
              ]
            }, null, 2)
          },
          { text: `Here is the user's request: ${prompt}.` },
          { text: currentActivities.length > 0 ? `Existing activities to consider: ${JSON.stringify(currentActivities)}` : "" }
        ]
      }
    ];
    let geminiResponse;
    const chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      history: initialContents,
      responseSchema,
      config: {
        tools: [{
          functionDeclarations: [findPlacesToolDeclaration]
        }],
        // Make Gemini aware of your tool
        // Use AUTO to let Gemini decide if it needs to call the tool
        toolConfig: { functionCallingConfig: { mode: "AUTO" } }
      }
    });
    let currentResponse;
    try {
      currentResponse = await chatSession.sendMessage({
        message: prompt
      });
    } catch (sendError) {
      console.error("Error sending initial message to Gemini:", sendError);
      throw new Error("Failed to get initial response from Gemini.");
    }
    let theLoopStopper = true;
    while (theLoopStopper) {
      console.log("CURRENT RESPONSE", currentResponse.candidates);
      const candidate = currentResponse.candidates?.[0];
      console.log("CANDIDATE", candidate?.content?.parts);
      if (!candidate || !candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error("Gemini API response was empty or malformed.");
      }
      const parts = candidate.content.parts;
      console.log("FIRST PART", parts);
      const toolCalls = parts.filter((p) => p.functionCall);
      const textParts = parts.filter((p) => p.text);
      if (textParts.length > 0) {
        geminiResponse = textParts.map((tp) => tp.text).join("\n");
        console.log("GEMINI RESPONSE", geminiResponse);
        theLoopStopper = false;
        break;
      }
      if (toolCalls.length > 0) {
        console.log(`Gemini requested ${toolCalls.length} tool calls`);
        const toolPromises = toolCalls.map(async (toolCall) => {
          const { name: functionName, args: functionArgs } = toolCall.functionCall;
          if (functionName === "find_places_nearby") {
            const { query, location_bias, place_type } = functionArgs;
            return await callAstroPlacesApi(query, location_bias, place_type);
          } else {
            console.warn(`Unknown function requested: ${functionName}`);
            return { status: "error", message: "Unknown function requested." };
          }
        });
        const allToolOutput = await Promise.all(toolPromises);
        console.log("output tool all", allToolOutput);
        currentResponse = await chatSession.sendMessage({
          message: JSON.stringify(allToolOutput)
        });
      } else {
        console.error("Unexpected Gemini response format:", candidate);
        throw new Error("Gemini returned an unexpected response format.");
      }
    }
    if (!geminiResponse) {
      throw new Error("Gemini did not provide a final text response containing the itinerary.");
    }
    const regex = /```json\s*([\s\S]*?)\s*```/;
    let cleanedText;
    const match = geminiResponse.match(regex);
    if (match && match[1]) {
      cleanedText = match[1].trim();
    } else {
      console.warn("JSON block not found in expected '```json ... ```' format. Attempting to parse original text.");
      cleanedText = geminiResponse.trim();
    }
    const parsedJson = JSON.parse(cleanedText);
    return new Response(JSON.stringify(parsedJson), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    console.error("Error in generate-itinerary API:", e);
    return new Response(JSON.stringify({
      error: "Failed to generate itinerary",
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
