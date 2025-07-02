<template>
    <div class="grow mt-8 flex flex-col gap-4 md:mt-16">
      <div class="flex flex-col gap-4 items-center h-1/2 justify-end transition-all ease-in-out duration-500"
           :class="
           {
             'max-h-56': isLoading || activities.length > 0,
             'max-h-1/2': activities.length === 0,
           }">
        <!--HEADER-->
        <h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit">
          Let <span style="background-image: linear-gradient(to right, #eea092, #eabf67);color: transparent;background-clip: text;">Agdayo AI</span> help you plan your next trip!
        </h1>
        <Input
            placeholder="Where do you want to go and when?"
            id="prompt"
            v-model="prompt"
            @enter="generateItinerary"
            class="w-full"
        />
      </div>
      <!--<pre>{{activities.length}}</pre>-->
      <!--<pre>{{chatHistory}}</pre>-->
      <!--<pre>{{activities}}</pre>-->

      <div v-if="isLoading" class="h-24 flex flex-col items-center justify-center w-full gap-2">
        <Spinner />
        <span class="text-zinc-400">Generating Daily Plans</span>
      </div>

      <div v-if="activities.length > 0" class="flex items-center justify-center w-full">
        <span class="text-zinc-500 text-xs">Agdayo AI can make mistakes. Always verify the activities and its location!</span>
      </div>
      <template v-for="(item, index) in groupedActivities" :key="index">
        <TransitionGroup name="fadeIn">
          <span v-if="item.type === 'day'" class="font-semibold text-2xl text-zinc-800 my-4">Day {{days.indexOf(item.iso) + 1}} - {{ item.label }}</span>
          <div v-if="item.type === 'tag'" class="relative flex items-center justify-center my-3">
            <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
            <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">{{ item.label }}</span>
          </div>

          <div
              v-else-if="item.type === 'activity'"
              class="flex flex-row gap-2 md:gap-4"
          >
            <TimelineDot :time="formatIsoDateToTime(item.data.datetime)" :isLast="false" />
            <CardActivity
                :iconName="item.data.iconName"
                :title="item.data.title"
                :location="item.data.location"
                :cost="item.data.cost"
                :costNote="item.data.costNote"
                :currency="item.data.currency"
            />
          </div>
        </TransitionGroup>
      </template>

      <div v-if="activities.length > 0 && mapLoaded" class="relative">
        <div id="map" class="w-full h-[400px] my-4 rounded-lg shadow-md"></div>

        <div v-if="activities.length > 0 && mapLoaded" class="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg shadow-md text-sm">
          <p class="font-semibold text-zinc-700">Itinerary Overview</p>
          <ul class="mt-1 text-zinc-600">
            <li v-for="(day, index) in days" :key="index">
              Day {{ index + 1 }}: {{ formatIsoDateToDate(day) }}
            </li>
          </ul>
          <button

              class="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
          >
            Reset Zoom
          </button>
        </div>
        <button
            v-if="map"

            class="absolute bottom-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
            title="My Location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-geo-alt-fill text-blue-600" viewBox="0 0 16 16">
            <path d="M4 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0m6 0a4 4 0 1 0-8 0 4 4 0 0 0 8 0M7 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
      </div>


      <div v-else-if="activities.length > 0 && !mapLoaded" class="w-full h-[400px] my-4 flex items-center justify-center text-zinc-400">Loading Map...</div>
    </div>

  <!--TOAST-->
  <ToastContainer>
    <Toast
        :variant="'error'"
        ref="dangerToast"
        :message="dangerToast.message"
    />
  </ToastContainer>
</template>

<script>
import Input from "../../UI/Input.vue";
import Spinner from "../../UI/Spinner.vue";
import Toast from "../../UI/Toast.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import TimelineDot from "../trip/components/timeline/TimelineDot.vue";
import CardActivity from "../trip/components/timeline/CardActivity.vue";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({apiKey: 'AIzaSyAcPq79nQuqhbmGrwKXI9jpOnmVgMaYHCM'});

export default {
  components: {
    CardActivity,
    TimelineDot,
    Input,
    Spinner,
    Toast,
    ToastContainer,
  },

  data() {
    return {
      dangerToast: {
        message: '',
      },
      prompt: '',
      isLoading: false,
      chatHistory: [],
      markers: [],
      map: null,
      mapLoaded: false, // Flag to indicate if Google Maps API has loaded
      // Your existing activities data for initial display or fallback
      activities: [
      ],
    }
  },

  computed: {
    days() {
      let x = this.activities.map(activity=>{
        return activity.datetime.split('T')[0]
      })
      return [...new Set(x)]
    },

    groupedActivities() {
      const result = [];
      let currentDay = null;
      let hasMorning = false;
      let hasNoon = false;
      let hasAfternoon = false;
      let hasEvening = false;
      let hasDay = false;

      this.activities.forEach((activity, index) => {
        const activityDate = new Date(activity.datetime)
        const activityDay = activity.datetime.split('T')[0]
        const activityHour = activityDate.getHours();

        if(activityDay !== currentDay) {
          currentDay = activityDay;
          hasMorning = false;
          hasNoon = false;
          hasAfternoon = false;
          hasEvening = false;
          hasDay = false;
        }

        if (!hasDay) {
          hasDay = true;
          result.push({type: 'day', label: this.formatIsoDateToDate(activityDate), iso: activity.datetime.split('T')[0]})
        }

        if (activityHour >= 0 && activityHour < 12 && !hasMorning) {
          result.push({ type: 'tag', label: 'Morning' });
          hasMorning = true;
        } else if (activityHour >= 12 && activityHour < 13 && !hasNoon) {
          result.push({ type: 'tag', label: 'Noon' });
          hasNoon = true;
        } else if (activityHour >= 13 && activityHour < 18 && !hasAfternoon) {
          result.push({ type: 'tag', label: 'Afternoon' });
          hasAfternoon = true;
        } else if (activityHour >= 18 && activityHour < 23 && !hasEvening) { // Evening from 8 PM to 5 AM next day
          result.push({ type: 'tag', label: 'Evening' });
          hasEvening = true;
        }
        result.push({ type: 'activity', data: activity });
      })
      return result
    }
  },

  watch: {
    activities: {
      handler(newActivities) {
        if (newActivities.length > 0) {
          this.loadGoogleMapsScript(); // Load script only when needed
        } else {
          this.clearMap(); // Clear map when activities are empty
        }
      },
      deep: true, // Watch for changes inside the activities array
      immediate: true // Run handler immediately on component mount
    },
    mapLoaded(isLoaded) {
      if (isLoaded && this.activities.length > 0) {
        this.initMapAndMarkers();
      }
    }
  },

  methods: {
    formatIsoDateToTime(value) {
      let date = new Date(value)

      let hours = date.getHours()
      const minutes = date.getMinutes()

      const ampm = hours >= 12 ? 'PM' : 'AM'

      hours = hours % 12;
      hours = hours ? hours : 12

      const formattedMinutes = minutes < 10 ? '0' + minutes: minutes;

      return `${hours}:${formattedMinutes} ${ampm}`;
    },

    async generateItinerary() {
      this.isLoading = true

      // --- Few-Shot Example START ---
      // This part tells Gemini EXACTLY what kind of output you expect.
      // Make sure the example response matches your desired schema and data types perfectly.

      // User's example request that would yield the sample response
      this.chatHistory.push({
        role: 'user',
        parts: [{ text: 'You are an itinerary planner. Use the example below. Always Suggest real locations' }]
      });

      // Model's desired example response (this is the "sample response for gemini")
      this.chatHistory.push({
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
          }, null, 2) // `null, 2` for pretty-printing JSON in the prompt text for readability
        }]
      });
      // --- Few-Shot Example END ---

      // This is the actual prompt from the user in your UI
      this.chatHistory.push({role: 'user', parts: [{text: this.prompt}, {text: this.activities.length > 0 ? JSON.stringify(this.activities) : ''}]});

      // IMPROVED responseSchema descriptions
      const responseSchema = {
        type: 'OBJECT',
        properties: {
          activities: {
            type: 'ARRAY',
            description: 'An array of daily itinerary plans. Ensure all specified fields for each activity are filled.',
            items: {
              type: 'OBJECT',
              properties: {
                datetime: {
                  type: 'STRING',
                  description: 'ISO 8601 full date and time string (e.g., \'YYYY-MM-DDTHH:MM:SS\'). This MUST include both date and time. Use local time zone for Baguio, Philippines.'
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
                // coordinates: {
                //   type: 'OBJECT',
                //   description: 'Approximate longitude and latitude coordinates of the location. Provide the best possible estimate for accuracy. Do NOT omit this field.',
                //   properties: {
                //     longitude: {
                //       type: 'STRING',
                //       description: 'The longitude coordinate of the location as a string (e.g., \'120.5960\'). Provide a reasonable estimate even if not exact.'
                //     },
                //     latitude: {
                //       type: 'STRING',
                //       description: 'The latitude coordinate of the location as a string (e.g., \'16.4024\'). Provide a reasonable estimate even if not exact.'
                //     }
                //   }
                // },
                cost: {
                  type: 'NUMBER',
                  description: 'The estimated cost of this activity as a number (e.g., 540.00). Use 0 if the activity is generally considered free (e.g., a park visit without special rentals). Provide a reasonable numerical estimate.'
                },
                currency: {
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

      // CONSTRUCT THE PAYLOAD FOR THE API
      const payload = {
        contents: this.chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema
        }
      };

      // MAKE THE FETCH
      const apiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "RETURN A JSON ONLY \n" + JSON.stringify(payload)
      });

      // Parse the JSON response from the API.
      const jsonText = apiResponse.text;
      try {
        let cleanedText = jsonText.replace(/^\s*```json\n/, '');
        cleanedText = cleanedText.replace(/\n```\s*$/, '');
        cleanedText = cleanedText.trim();
        const parsedJson = JSON.parse(cleanedText); // Parse the JSON string into an object
        this.activities = parsedJson.activities

        console.log(parsedJson.activities)
        const geocodingPromises = parsedJson.activities.map(async item => {
          if (item.location) {
            item.coordinates = await this.geocodeLocation(item.location); // Await here
          }
          return item; // Return the modified item
        });

        // Wait for all geocoding promises to resolve
        this.activities = await Promise.all(geocodingPromises);

        if (this.mapLoaded) {
          this.initMapAndMarkers();
        }
      } catch (parseError) {
        console.error(`Failed to parse JSON response: ${parseError.message}. Raw response: ${jsonText}`);
        this.dangerToast.message = parseError.message
      }

      this.isLoading = false;
    },

    async geocodeLocation(locationName) {
      const Maps_API_KEY = "AIzaSyD0ueloZ3TtHb8vff0f7R5Umdihxfu_FyQ"
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${Maps_API_KEY}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          console.log({ latitude: lat, longitude: lng })
          return { latitude: lat, longitude: lng };
        } else {
          console.warn(`Geocoding failed for: "${locationName}". Status: ${data.status}. Error: ${data.error_message || 'N/A'}`);
          return null;
        }
      } catch (error) {
        console.error(`Error during geocoding for "${locationName}":`, error);
        return null;
      }
    },

    formatIsoDateToDate(value) {
      const date = new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },

    loadGoogleMapsScript() {
      // Only load if not already loaded or currently loading
      if (window.google && window.google.maps && this.mapLoaded) {
        console.log("Google Maps script already loaded.");
        return;
      }
      if (document.getElementById('google-maps-script')) {
        console.log("Google Maps script is already being loaded.");
        return;
      }

      console.log("Loading Google Maps script...");
      const script = document.createElement('script');
      const Maps_API_KEY = "AIzaSyD0ueloZ3TtHb8vff0f7R5Umdihxfu_FyQ"
      script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}&callback=initMapCallback`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script';
      document.head.appendChild(script);

      // Set a global callback function for when the Maps API is loaded
      // This is crucial for Google Maps JS API's loading mechanism
      window.initMapCallback = () => {
        console.log("Google Maps API script loaded successfully!");
        this.mapLoaded = true;
      };

      script.onerror = () => {
        console.error("Failed to load Google Maps script.");
        this.errorMessage = "Failed to load map. Check your API key or network connection.";
      };
    },

    initMapAndMarkers() {
      if (!this.mapLoaded || this.activities.length === 0) {
        return; // Don't proceed if API not loaded or no activities
      }

      // Filter out activities without coordinates
      const activitiesWithCoords = this.activities.filter(a => a.coordinates && a.coordinates.latitude && a.coordinates.longitude);

      if (activitiesWithCoords.length === 0) {
        console.warn("No activities with valid coordinates found to display on map.");
        this.clearMap(); // Ensure map is cleared if no markers
        return;
      }

      // Calculate initial map center and bounds
      let bounds = new google.maps.LatLngBounds();
      activitiesWithCoords.forEach(activity => {
        bounds.extend(new google.maps.LatLng(activity.coordinates.latitude, activity.coordinates.longitude));
      });

      // Initialize map if it doesn't exist or re-center/fit bounds if it does
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10, // Default zoom, will be adjusted by fitBounds
          center: bounds.getCenter(),
          mapId: 'YOUR_MAP_ID_HERE', // Optional: Replace with a custom map ID from Google Cloud Console
          zoomControl: false,          // Hide zoom +/- buttons
          mapTypeControl: false,       // Hide Map/Satellite toggle
          streetViewControl: false,    // Hide Pegman (Street View) button
          fullscreenControl: true,    // Hide fullscreen button
          rotateControl: false,        // Hide 45° imagery rotate control
          scaleControl: false,
        });
      } else {
        // If map already exists, just clear markers and fit new bounds
        this.clearMarkers();
      }

      this.map.fitBounds(bounds); // Zoom and center map to fit all markers

      // Add markers for each activity
      this.markers = activitiesWithCoords.map((activity, index) => {
        const marker = new google.maps.Marker({
          position: { lat: activity.coordinates.latitude, lng: activity.coordinates.longitude },
          map: this.map,
          title: activity.title,
          label: (index + 1).toString(), // Numbered markers
        });

        // Optional: Add info window on marker click
        const infoWindow = new google.maps.InfoWindow({
          content: `<div><strong>${activity.title}</strong><br>${activity.location}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });

        return marker;
      });

      // Optional: Draw a polyline connecting the activities
      // const pathCoordinates = activitiesWithCoords.map(activity => ({
      //   lat: activity.coordinates.latitude,
      //   lng: activity.coordinates.longitude,
      // }));
      //
      // if (pathCoordinates.length > 1) {
      //   const activityPath = new google.maps.Polyline({
      //     path: pathCoordinates,
      //     geodesic: true,
      //     strokeColor: '#FF0000', // Red line
      //     strokeOpacity: 0.8,
      //     strokeWeight: 4,
      //   });
      //   activityPath.setMap(this.map);
      // }
      this.getUserLocation(); // Try to get user location after map is ready
    },

    clearMap() {
      if (this.map) {
        this.clearMarkers();
        // If you had polylines, clear them too
        // For simplicity, we'll recreate the map instance or just clear markers
        this.map = null; // Reset map instance to force re-initialization
        this.mapLoaded = false; // Reset map loaded status to allow re-loading script if needed
      }
      this.markers = [];
    },

    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },

    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              new google.maps.Marker({
                position: userLatLng,
                map: this.map,
                title: "Your Location",
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Blue dot for user location
                }
              });
              // Optional: Center map on user if no itinerary or if desired
              // this.map.setCenter(userLatLng);
            },
            (error) => {
              console.error("Error getting user location:", error);
              // Handle user denying location access
            }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  },

  mounted() {
    if (this.activities.length > 0) {
      this.loadGoogleMapsScript();
    }
  }
}
</script>

<style>
/* You might need some basic styles for your map container */
#map {
  width: 100%;
  height: 400px; /* Or adjust as per your design */
  background-color: #f0f0f0; /* Placeholder background */
}
</style>