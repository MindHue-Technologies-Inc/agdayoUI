import {type GenerateContentResponse, GoogleGenAI} from "@google/genai";
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

// --- Type Definitions ---

interface Activity {
  datetime: string;
  iconName: string;
  title: string;
  location: string;
  cost: number;
  costCurrency: string;
  costNote: string;
  description: string;
  date: string;
  time: string;
  coordinates: {
      latitude: string;
      longitude: string;
    };
  // If you move geocoding here, add:
  // coordinates?: {
  //   latitude: string;
  //   longitude: string;
  // };
}

interface DateRange {
  start: string;
  end: string
}

interface ShowSheet {
  showSheet: boolean
}

interface Preparation {
  showSheet: boolean;
  preparationsChecklist: object;
}

interface Trip {
  name: string;
  location: string;
  date: DateRange;
  theme: string;
  preparation: Preparation;
  accommodation: ShowSheet;
  companions: ShowSheet;
  budget: ShowSheet;
  transportation: ShowSheet;
  roles: ShowSheet;
  activities: Activity[];
  planningProgress: {
    completed: number;
    totle: number;
  }

}

interface ItineraryResponse {
  activities: Activity[];
}

interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: ChatPart[];
}

interface GenerateItineraryRequestBody {
  // Frontend might not send chatHistory, but if it does:
  // chatHistory?: ChatMessage[];
  prompt: string;
  currentActivities: Activity[];
}
// --- End Type Definitions ---

// -- READY RESPONSE SCHEME OF GEMINI
const responseSchema:object = {
  type: 'OBJECT',
  properties: {
    trip: {
      type: 'OBJECT',
      description: 'Trip Configuration with name, date range, and location. Ensure all specified fields are filled.',
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
              description: "Start date of the trip in ISO format. Start at midnight."
            },
            end: {
              type: "STRING",
              description: "End date of the trip in ISO format. Use midnight as time."
            }
          }
        }
      },
    }
  }
}


// -- MAIN POST FUNCTION
// -- TAKES REQUEST OBJECT
export async function POST ({ request }: { request: Request }): Promise<Response> {
  try {
    // -- REQUEST JSON IS 2 BODY OBJECTS
    const { prompt, currentActivities }: GenerateItineraryRequestBody = await request.json();

    // Reconstruct the chat history for the Gemini API
    const contents: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: `You are an itinerary planner. Use the example below. Your task is to create a trip plan. The activities are already provided for you. If no date provided, use the date today which is ${new Date()}` }]
      },
      {
        role: 'model',
        parts: [{
          text: JSON.stringify({
            name: "Trip to Somewhere",
            location: "Clark, Pampanga, Philippines",
            date: {
              start: "2025-07-11T16:00:00.000Z",
              end: "2025-07-11T16:00:00.000Z"
            },
          }, null, 2)
        }]
      },
      // Add the actual user prompt and existing activities
      {
        role: 'user',
        parts: [{ text: prompt }, { text: currentActivities.length > 0 ? JSON.stringify(currentActivities) : '' }]
      }
    ];

    // -- INITIATE PAYLOAD FOR GEMINI
    const payload = {
      contents: contents,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    };

    // -- GENERATE A RESPONSE FROM GEMINI USING THE PAYLOAD
    const apiResponse: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "RETURN A JSON ONLY \n" + JSON.stringify(payload)
    });

    // -- CHECK IF RESPONSE IS INVALID AND EMPTY; THROWS AN ERROR
    if (apiResponse.text === undefined || apiResponse.text === null) {
      throw new Error('Gemini API response text was undefined or null. No itinerary content generated.');
    }

    // -- SAVE RESPONSE TEXT
    const jsonText: string = apiResponse.text;

    // Regular expression to capture content between ```json and ```
    // - ````: Matches the literal closing sequence
    const regex = /```json\s*([\s\S]*?)\s*```/;

    let cleanedText: string;
    const match = jsonText.match(regex);

    if (match && match[1]) {
      // If a match is found and the first capturing group (index 1) has content
      cleanedText = match[1].trim(); // Get the captured content and trim any leading/trailing whitespace
    } else {
      // Fallback: If the expected format is not found.
      console.warn("JSON block not found in expected '```json ... ```' format. Attempting to parse original text.");
      cleanedText = jsonText.trim(); // Fallback to just trimming the whole response
    }

    // -- SAVE CLEANED JSON TO PARSED JSON
    const parsedJson: ItineraryResponse = JSON.parse(cleanedText);

    // -- RETURNS THE PARSED JSON TO THE CLIENT
    return new Response(JSON.stringify(parsedJson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e: any) {
    console.error(e)

    // -- RETURNS A RESPONSE ERROR
    return new Response(JSON.stringify({
      error: 'Failed to generate itinerary',
      details: e.message || 'An unknown error occurred'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}