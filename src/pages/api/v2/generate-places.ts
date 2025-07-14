import {GoogleGenAI, Type} from "@google/genai";
export const prerender = false;

// -- READY API KEY FOR GOOGLE GEMINI
const API_KEY = import.meta.env.GEMINI_API_KEY;

// -- CHECK IF API KEY EXISTS
if (!API_KEY) {
  console.error('GEMINI_API_KEY environment variable is not set.');
  // In a production environment, you might want to throw an error or handle this more gracefully.
}

// -- INSTANTIATE GOOGLE GEMINI
const ai = new GoogleGenAI({apiKey: API_KEY});

// --- Part 1: Define the Tool for Gemini (as above) ---
const findPlacesTool = {
      name: "find_places_nearby",
      description: "Finds real-world places (e.g., restaurants, beaches, hotels) based on a text query, an optional specific type, and an optional location bias. Useful for discovering points of interest.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          query: {
            type: Type.STRING,
            description: "The general search query (e.g., 'best pizza', 'hiking trails', 'places to relax').",
          },
          place_type: {
            type: Type.STRING,
            description: "Optional: A specific type of place to filter results. Examples include 'restaurant', 'beach', 'cafe', 'hotel', 'park', 'shopping_mall', 'museum'. Use singular lowercase.",
            enum: [
              "restaurant",
              "beach",
              "cafe",
              "hotel",
              "park",
              "shopping_mall",
              "museum",
            ],
          },
          location_bias: {
            type: Type.STRING,
            description: "Optional: A geographical bias for the search, e.g., 'Angeles City', 'Olongapo City', or a 'latitude,longitude' pair (e.g., '15.1706,120.5925'). If not provided, the search will be biased towards the current location (Angeles City) or where the user's IP suggests.",
          },
        },
        required: ["query"],
      },
};

// -- PART 2: SET THE API ENDPOINT
export async function POST ({ request }: { request: Request }): Promise<Response> {
  const contents:any = [
    {
      role: 'user',
      parts: [{ text: `You are an itinerary planner. Your job is to generate an array of places by using a function call. You can generate multiple function calls for different types of places.` }]
    },
    {
      role: 'model',
      parts: [{
        text: 'I\'m in Angeles City. Can you find some nearby places for a trip?'
      }]
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      tools: [{
        functionDeclarations: [findPlacesTool]
      }],
      // Force the model to call 'any' function, instead of chatting.
      toolConfig: {
        functionCallingConfig: {
          mode: 'any'
        }
      }
    },
  });

  console.log('HUH?')
  // Check for function calls in the response
  if (response.functionCalls && response.functionCalls.length > 0) {
    for (const call of response.functionCalls) {
      const functionCall= call; // Assuming one function call
      console.log(`Function to call: ${functionCall.name}`);
      console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
      const result = await fetch('http://localhost:4321/api/v2/maps-places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(functionCall.args)
      })
      console.log(await result.json())
    }

  } else {
    console.log("No function call found in the response.");
    console.log(response.text);
  }

  return new Response('b0ss')
}