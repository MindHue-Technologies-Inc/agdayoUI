import React, { useState } from 'react';


// Main App component for the Gemini API integration example
function App() {
  // State to hold the user's input prompt
  const [prompt, setPrompt] = useState('');
  // State to hold the response from the Gemini API (now expecting a JSON object)
  const [response, setResponse] = useState(null); // Changed to null to indicate no response yet
  // State to manage loading status during API call
  const [isLoading, setIsLoading] = useState(false);
  // State to manage any errors during the API call
  const [error, setError] = useState(null);


  /**
      * Handles the click event for the "Generate Itinerary" button.
      * Calls the Gemini API with the user's prompt, requesting a JSON output.
      */
  const generateItinerary = async () => {
    // Clear previous response and error messages
    setResponse(null); // Clear previous JSON response
    setError(null);
    setIsLoading(true); // Set loading state to true


    try {
      // Prepare the chat history for the Gemini API request.
      // The prompt is sent as a user message.
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });


      // Define the schema for the desired JSON output.
      // This tells the Gemini model exactly how to structure its response.
      const responseSchema = {
        type: "OBJECT",
        properties: {
          tripName: { type: "STRING", description: "A concise name for the trip" },
          durationDays: { type: "NUMBER", description: "The total number of days for the trip" },
          destination: { type: "STRING", description: "The primary destination city or region" },
          travelStyle: { type: "STRING", description: "The overall style of travel (e.g., adventure, relaxing, cultural)" },
          budgetEstimate: { type: "STRING", description: "An estimated budget range for the trip (e.g., 'low', 'medium', 'high')" },
          dailyPlan: {
            type: "ARRAY",
            description: "An array of daily itinerary plans",
            items: {
              type: "OBJECT",
              properties: {
                day: { type: "NUMBER", description: "The day number of the itinerary" },
                theme: { type: "STRING", description: "A short theme or focus for the day" },
                activities: {
                  type: "ARRAY",
                  description: "A list of activities planned for the day",
                  items: { type: "STRING" }
                },
                meals: {
                  type: "ARRAY",
                  description: "Suggested meals for the day",
                  items: { type: "STRING" }
                }
              },
              propertyOrdering: ["day", "theme", "activities", "meals"]
            }
          }
        },
        propertyOrdering: ["tripName", "durationDays", "destination", "travelStyle", "budgetEstimate", "dailyPlan"]
      };


      // Construct the payload for the API request, including the generationConfig.
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json", // Request JSON output
          responseSchema: responseSchema // Specify the JSON schema
        }
      };


      // API Key for the Gemini API.
      // For models like gemini-2.0-flash, Canvas automatically provides the API key.
      // Leave this as an empty string.
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;


      // Make the fetch call to the Gemini API.
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });


      // Check if the API response was successful
      if (!apiResponse.ok) {
        // If not successful, throw an error with the status text
        const errorData = await apiResponse.json();
        throw new Error(`API error: ${apiResponse.status} ${apiResponse.statusText} - ${errorData.error.message}`);
      }


      // Parse the JSON response from the API.
      const result = await apiResponse.json();


      // Check if the response structure is as expected and extract and parse the JSON text.
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonText = result.candidates[0].content.parts[0].text;
        try {
          const parsedJson = JSON.parse(jsonText); // Parse the JSON string into an object
          setResponse(parsedJson); // Update the response state with the parsed JSON object
        } catch (parseError) {
          setError(`Failed to parse JSON response: ${parseError.message}. Raw response: ${jsonText}`);
        }
      } else {
        // Handle cases where the response structure is unexpected or content is missing
        setError('Unexpected API response structure or no content generated.');
      }
    } catch (err) {
      // Catch and set any errors that occur during the fetch operation
      console.error('Error calling Gemini API:', err);
      setError(`Failed to generate itinerary: ${err.message}`);
    } finally {
      setIsLoading(false); // Always set loading state to false after the operation
    }
  };


  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4 font-sans antialiased">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.01] border border-gray-200">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-sm">
            Travel Itinerary AI
          </h1>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Describe your dream trip, and let our AI create a personalized itinerary for you!
          </p>


          {/* Input area for the user's prompt */}
          <div className="mb-6">
            <label htmlFor="prompt-input" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Travel Request:
            </label>
            <textarea
                id="prompt-input"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y min-h-[120px] text-gray-800 text-base shadow-sm"
                placeholder="E.g., A 7-day adventurous trip to Patagonia for hiking and nature photography in April, budget-friendly. Output as JSON."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows="5"
            ></textarea>
          </div>


          {/* Button to trigger the API call */}
          <button
              onClick={generateItinerary}
              disabled={isLoading || !prompt.trim()} // Disable button when loading or prompt is empty
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md"
          >
            {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
            ) : (
                'Generate Itinerary'
            )}
          </button>


          {/* Display area for API response or error */}
          <div className="mt-8">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}


            {response && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner overflow-auto max-h-[400px]">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Generated Itinerary (JSON):</h2>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap break-all text-gray-800">
                {JSON.stringify(response, null, 2)}
              </pre>
                </div>
            )}
          </div>
        </div>
        {/* Footer for mobile responsiveness and branding */}
        <footer className="mt-8 text-gray-600 text-sm text-center">
          Powered by Google Gemini
        </footer>
      </div>
  );
}


export default App;


