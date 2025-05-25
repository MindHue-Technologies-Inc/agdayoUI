# Guide: Setting Up Google Places API for Your App

This guide outlines the steps to set up Google Places API, emphasizing secure backend integration for your travel itinerary app.

---

## Step 1: Set Up a Google Cloud Project & Enable APIs

1.  **Go to Google Cloud Console:**
    * Open your web browser and navigate to [console.cloud.google.com](https://console.cloud.google.com/).
    * Sign in with your Google account.

2.  **Create a New Project (or select an existing one):**
    * In the top-left corner, click the project dropdown.
    * Select "New Project."
    * Name your project (e.g., "MyTravelItineraryApp") and note the **Project ID**.
    * Click "Create."

3.  **Enable Billing:**
    * In the left-hand navigation menu, go to **Billing** and follow the prompts to link a billing account. Billing must be enabled to use most APIs, even within free tiers.

4.  **Enable Necessary APIs:**
    * In the left-hand navigation menu, go to **APIs & Services > Enabled APIs & services**.
    * Click "+ ENABLE APIS AND SERVICES."
    * Search for and enable the following APIs:
        * **Places API:** For searching places, getting details, and autocomplete.
        * **Maps JavaScript API:** (Optional) For displaying maps directly in your frontend.
        * **Geocoding API:** (Optional) For converting addresses to lat/long and vice-versa.
        * **Geolocation API:** (Optional) For finding the user's current location accurately.

---

## Step 2: Generate an API Key

1.  **Create Credentials:**
    * In the left-hand navigation menu, go to **APIs & Services > Credentials**.
    * Click "+ CREATE CREDENTIALS."
    * Select "API Key."
    * A new API key will be generated. **Copy this key immediately.**

---

## Step 3: Secure Your API Key (CRUCIAL!)

**IMPORTANT: NEVER embed your Google API Key directly in your frontend (Vue.js) code. It must be used only on your backend server.**

1.  **Restrict the API Key:**
    * In the **APIs & Services > Credentials** section, click on the API key you just created.
    * Under "API restrictions," select "Restrict key."
    * **Application Restrictions:** Choose "IP addresses (web servers, cron jobs, etc.)" if your backend has a static IP address. Add your backend server's IP address. If using serverless functions (like AWS Lambda, Google Cloud Functions), consult their specific documentation for securing API keys (e.g., using environment variables).
    * **API Restrictions:** Select "Restrict key (select APIs)" and choose only the APIs you enabled in Step 1 (e.g., "Places API," "Maps JavaScript API"). This limits the key's functionality even if compromised.
    * Click "Save."

---

## Step 4: Backend Integration (Conceptual Flow)

Your Vue.js frontend app will **not** directly call Google's API endpoints. Instead, it will send requests to *your own backend API*, which then calls Google's APIs.

**Conceptual Flow:**

1.  **Frontend (Vue.js):**
    * Your Vue component initiates a request to *your backend's API endpoint* (e.g., `/api/suggestions`).
    * This request will include parameters like the destination (e.g., "Olongapo"), desired activity type (e.g., "restaurant"), and any other filters (dates, preferences).

    ```javascript
    // Example frontend fetch call (simplified)
    fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            destination: 'Olongapo',
            tripDate: '2025-05-28',
            type: 'restaurant',
            // ... other filters
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle suggestions received from your backend
        console.log(data.suggestions);
    })
    .catch(error => console.error('Error fetching suggestions:', error));
    ```

2.  **Backend Server (e.g., Node.js, Python, PHP, Ruby):**
    * **Receive Request:** Your backend receives the request from the frontend.
    * **Secure API Key Use:** It constructs the API call to Google Places, using your **Google API Key stored securely as an environment variable** (never hardcoded!).
    * **Make Google API Call:** It fetches data from Google Places (e.g., using "Nearby Search" or "Text Search").
        ```javascript
        // Conceptual Backend Logic (Node.js example using 'express' and 'node-fetch')

        const express = require('express');
        const fetch = require('node-fetch'); // For making HTTP requests
        const app = express();
        app.use(express.json()); // To parse JSON bodies

        const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY; // Loaded from environment variable

        app.post('/api/suggestions', async (req, res) => {
            const { destination, tripDate, type } = req.body;

            // Step 1: Resolve destination name to coordinates (if not already known/stored)
            // You might use Geocoding API here, or have a pre-stored list of destination coordinates.
            const destinationCoords = { lat: 14.8333, lng: 120.2667 }; // Example for Olongapo

            // Step 2: Construct and make a call to Google Places API
            try {
                const googleApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
                                     `location=${destinationCoords.lat},${destinationCoords.lng}` +
                                     `&radius=50000` + // Example radius in meters
                                     `&type=${type || 'point_of_interest'}` + // Default type
                                     `&key=${GOOGLE_PLACES_API_KEY}`;

                const googleResponse = await fetch(googleApiUrl);
                const googleData = await googleResponse.json();

                // Step 3: Apply your "Smart" (rule-based, non-AI) logic here
                // - Filter `googleData.results` by opening hours for `tripDate`.
                // - Filter out activities already in the user's saved trip itinerary.
                // - Rank/sort results by rating, review count, user preferences, proximity to other activities.
                const processedSuggestions = googleData.results.map(place => ({
                    name: place.name,
                    rating: place.rating,
                    address: place.vicinity,
                    placeId: place.place_id,
                    // ... extract other necessary details like photos, types, opening_hours
                }));

                // Step 4: Send the processed and filtered suggestions back to the frontend
                res.json({ suggestions: processedSuggestions });

            } catch (error) {
                console.error('Backend error fetching Google Places:', error);
                res.status(500).json({ error: 'Failed to fetch suggestions' });
            }
        });

        // Start your backend server (e.g., on port 3000)
        // app.listen(3000, () => console.log('Backend listening on port 3000'));
        ```

### Key Google Places API Services for Your App:

1.  **Place Search (`nearbysearch` / `textsearch`):**
    * `nearbysearch`: Discover places within a specified radius of coordinates.
    * `textsearch`: Find places based on general text queries (e.g., "museums in Olongapo").
2.  **Place Autocomplete:**
    * Provides real-time predictions as users type into search input fields, improving efficiency.
3.  **Place Details:**
    * Use a `place_id` (obtained from search or autocomplete) to fetch comprehensive information about a specific location (full address, phone, website, all photos, detailed opening hours, comprehensive review data).
4.  **Place Photos:**
    * Access high-quality images of places using `photo_reference` obtained from search results or place details.

---

This guide provides a secure and effective framework for integrating Google Places API into your travel itinerary app. Remember to monitor your API usage in the Google Cloud Console to stay within your free tier limits initially.