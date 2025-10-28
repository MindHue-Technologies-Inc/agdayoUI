import { GoogleGenAI } from '@google/genai';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const API_KEY = "AIzaSyAcPq79nQuqhbmGrwKXI9jpOnmVgMaYHCM";
const ai = new GoogleGenAI({ apiKey: API_KEY });
const responseSchema = {
  type: "OBJECT",
  properties: {
    trip: {
      type: "OBJECT",
      description: "Trip Configuration with name, date range, and location. Ensure all specified fields are filled.",
      properties: {
        name: {
          type: "STRING",
          description: "A short name for the trip"
        },
        location: {
          type: "STRING",
          description: "Location of the trip. Make sure it is short and real. Include the country if necessary"
        },
        date: {
          type: "OBJECT",
          description: "Duration of the trip. Use ISO format",
          properties: {
            start: {
              type: "STRING",
              description: "Start date of the trip in ISO format. Start at midnight. Do not add Z at the end of datetime. Do not add timezone"
            },
            end: {
              type: "STRING",
              description: "End date of the trip in ISO format. Use midnight as time. Do not add Z at the end of datetime. Do not add timezone"
            }
          }
        }
      }
    }
  }
};
async function POST({ request }) {
  try {
    const { prompt, currentActivities } = await request.json();
    const contents = [
      {
        role: "user",
        parts: [{ text: `You are an itinerary planner. Use the example below. Your task is to create a trip plan. The activities are already provided for you. If no date provided, use the date today which is ${/* @__PURE__ */ new Date()}` }]
      },
      {
        role: "model",
        parts: [{
          text: JSON.stringify({
            name: "Trip to Somewhere",
            location: "Clark, Pampanga, Philippines",
            date: {
              start: "2025-07-11T16:00:00.000Z",
              end: "2025-07-11T16:00:00.000Z"
            }
          }, null, 2)
        }]
      },
      // Add the actual user prompt and existing activities
      {
        role: "user",
        parts: [{ text: prompt }, { text: currentActivities.length > 0 ? JSON.stringify(currentActivities) : "" }]
      }
    ];
    const payload = {
      contents,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema
      }
    };
    const apiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "RETURN A JSON ONLY \n" + JSON.stringify(payload)
    });
    if (apiResponse.text === void 0 || apiResponse.text === null) {
      throw new Error("Gemini API response text was undefined or null. No itinerary content generated.");
    }
    const jsonText = apiResponse.text;
    const regex = /```json\s*([\s\S]*?)\s*```/;
    let cleanedText;
    const match = jsonText.match(regex);
    if (match && match[1]) {
      cleanedText = match[1].trim();
    } else {
      console.warn("JSON block not found in expected '```json ... ```' format. Attempting to parse original text.");
      cleanedText = jsonText.trim();
    }
    const parsedJson = JSON.parse(cleanedText);
    return new Response(JSON.stringify(parsedJson), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    console.error(e);
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
