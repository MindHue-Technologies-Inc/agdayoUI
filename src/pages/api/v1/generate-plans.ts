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
  currency: string;
  costNote: string;
  // If you move geocoding here, add:
  // coordinates?: {
  //   latitude: string;
  //   longitude: string;
  // };
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
    activities: {
      type: 'ARRAY',
      description: 'An array of daily itinerary plans. Ensure all specified fields for each activity are filled.',
      items: {
        type: 'OBJECT',
        properties: {
          id: {
            type: 'STRING',
            description: 'A randomly generated id string consisting of letters and numbers.'
          },
          datetime: {
            type: 'STRING',
            description: 'ISO 8601 full date and time string (e.g., \'YYYY-MM-DDTHH:MM:SS\'). This MUST include both date and time. Do  not add Z at the end of datetime'
          },
          date: {
            type: 'STRING',
            description: 'ISO 8601 but just the date (e.g., \'YYYY-MM-DD\'. Use the datetime for reference',
          },
          time: {
            type: 'STRING',
            description: 'Time format would be HH:MM. It is in 24-hour format. Use datetime for reference'
          },
          description: {
            type: 'STRING',
            description: 'A very short description about this activity.'
          },
          iconName: {
            type: 'STRING',
            description: 'A suitable Phosphor icon name, always prefixed with \'ph-\' (e.g., \'ph-bus\', \'ph-coffee\', \'ph-tree\', \'ph-bowl-food\', \'ph-palette\', \'ph-bed\', \'ph-pizza\', \'ph-church\', \'ph-shopping-bag\', \'ph-airplane-takeoff\', \'ph-rowboat\', \'ph-mountain\', \'ph-horse\', \'ph-wine\', \'ph-heart\', \'ph-suitcase-rolling\', \'ph-leaf\', etc.). Choose the most relevant icon for the activity. DO NOT omit this field.'
          },
          title: {
            type: 'STRING',
            description: 'A short title for the activity. Do not combine multiple activities or whole day plans into a single title. Keep it less than twenty words. Do NOT include dates or times in this title, as they are provided separately in the `datetime` field. (e.g., Arrive at Bus Terminal, Dine-in at Good Taste, etc.)'
          },
          location: {
            type: 'STRING',
            description: 'The specific name of the place and its city/town (e.g., \'Victory Liner Terminal, Baguio City\'). If it\'s a general activity, provide a relevant general area. Do NOT omit this field. Make sure the location name is searchable on Google Maps. Include Country Name'
          },
          cost: {
            type: 'NUMBER',
            description: 'The estimated cost of this activity as a number (e.g., 540.00). Use 0 if the activity is generally considered free (e.g., a park visit without special rentals). Provide a reasonable numerical estimate.'
          },
          costCurrency: {
            type: 'STRING',
            description: 'Currency of the provided cost in 3-letter code; uppercased'
          },
          costNote: {
            type: 'STRING',
            description: 'A brief note clarifying the cost, such as \'/ Person Ticket\', \'(Boat Rental Est.)\', \'Included in Accommodation\', or \'Depends on purchases\'. Leave this empty if no specific note is applicable, but do NOT omit the field.'
          },
        }
      }
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
        parts: [{ text: `You are an itinerary planner. Use the example below. Always Suggest real locations. If no date provided, use the date today which is ${new Date()}` }]
      },
      {
        role: 'model',
        parts: [{
          text: JSON.stringify({
            activities: [
              {
                datetime: '2025-07-01T08:30:00',
                iconName: 'ph-coffee',
                title: 'Morning Coffee & Pastries at Tsokolateria',
                location: 'Tsokolateria, Igorot Park, Baguio City',
                cost: 250.00,
                costNote: '/ Person (Est.)',
              },
              {
                datetime: '2025-07-01T10:00:00',
                iconName: 'ph-leaf',
                title: 'Relaxing Stroll at Camp John Hay Eco-Trail',
                location: 'Camp John Hay, Baguio City',
                cost: 0,
                costNote: 'Entrance Fee: Free',
              },
              {
                datetime: '2025-07-01T12:30:00',
                iconName: 'ph-bowl-food',
                title: 'Lunch at Cafe by the Ruins',
                location: 'Shuntug Rd, Baguio City',
                cost: 400.00,
                costNote: '/ Person (Est.)',
              }
            ]
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