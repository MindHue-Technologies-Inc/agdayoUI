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
        <div class="w-full relative">
          <Input
              placeholder="Where do you want to go and when?"
              id="prompt"
              v-model="prompt"
              @enter="generateItinerary"
              class="w-full"
          />

          <!--SUBMIT BUTTON-->
          <div class="absolute inset top-2 bottom-2 right-3 z-10">
            <Button @click="generateItinerary" size="sm" custom-class="h-8 w-8 p-0!" ><i class="ph ph-arrow-right"></i></Button>
          </div>
        </div>
      </div>
      <!--<pre>{{activities.length}}</pre>-->
      <!--<pre>{{chatHistory}}</pre>-->
      <!--<pre>{{activities}}</pre>-->

      <div v-if="isLoading" class="h-24 flex flex-col items-center justify-center w-full gap-2">
        <Spinner />
        <span v-if="!isLoadingTrip" class="text-zinc-400">Generating Daily Plans</span>
        <span v-else class="text-zinc-400">Creating Trip Plan</span>
      </div>

      <div v-if="activities.length > 0" class="flex items-center justify-center w-full">
        <span class="text-zinc-500 text-xs">Agdayo AI can make mistakes. Always verify the activities and its location!</span>
      </div>

      <div class="flex w-full">
        <Button class="w-full" v-if="activities.length > 0" @click="generateTrip">Create Trip</Button>
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
                :currency="item.data.costCurrency"
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
import Button from "../../UI/Button.vue";
import { useDbStore, addTrip } from "../../../stores/db.js";

export default {
  components: {
    CardActivity,
    TimelineDot,
    Input,
    Spinner,
    Toast,
    Button,
    ToastContainer,
  },

  data() {
    return {
      dangerToast: {
        message: '',
      },
      useDb: useDbStore.get(),
      prompt: '',
      isLoading: false,
      isLoadingTrip: false,
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
    // ------------------------------ CREATES SET OF DAYS FROM DATETIME IN ACTIVITES
    days() {
      let x = this.activities.map(activity=>{
        return activity.datetime.split('T')[0]
      })
      return [...new Set(x)]
    },
    // ------------------------------ ADD STATE OF DAY AND DAY NUMBER ON ACTIVITES TO EASILY LOOP ON THE DOM
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
    // ------------------------------ CONVERTS ISO DATETIME TO TIME
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

    // ------------------------------ GENERATES TRIP
    async generateTrip() {
      // -- INITIATE LOADING STATUS
      this.isLoading = true;
      this.isLoadingTrip = true;

      try {
        // -- PAYLOAD FOR BACKEND GEMINI API
        const payloadToSend = {
          prompt: this.prompt,
          currentActivities: this.activities
        };

        // -- FETCH RESULTS FROM THE BACKEND GEMINI API
        const response = await fetch('/api/v1/generate-trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadToSend), // -- STRINGIFY THE PAYLOAD
        });

        // CHECK IF RESPONSE IS NOT OK
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.error)
        }

        // -- PARSE THE RESPONSE BODY
        let parsedJson = await response.json();

        // -- ADD THEME AND ACTIVITIES TO THE JSON

        parsedJson.trip = {
          ...parsedJson.trip,
          theme: "peach",
          activities: this.activities,
          preparation: {
            preparationsChecklist: []
          },
          accommodation: {
            location: "Davao City, Philippines",
          },
          companions: {},
          budget: {
            categories: [],
            currency: "PHP",
            showSheet: false,
            totalBudget: null,
          },
          transportation: {},
          roles: {},
          planningProgress: {
            completed: 1,
            total: 7
          }
        }

        console.log(parsedJson)

        // -- ADD TRIP TO THE DATABASE
        addTrip(parsedJson.trip)

        // -- REDIRECT TO THE TRIP PAGE
        window.location.href=`/trips/${this.useDb.trips.length}`


      } catch (e) {
        console.error(e.message)
      } finally {
        this.isLoading = false
        this.isLoadingTrip = false;
      }
    },

    // ------------------------------ GENERATES ITINERARY PLANS
    async generateItinerary() {
      // -- INITIATE LOADING STATUS
      this.isLoading = true;

      try {
        // -- PAYLOAD FOR BACKEND GEMINI API
        const payloadToSend = {
          prompt: this.prompt,
          currentActivities: this.activities
        };

        // -- FETCH RESULTS FROM THE BACKEND GEMINI API
        const response = await fetch('/api/v1/generate-plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadToSend), // -- STRINGIFY THE PAYLOAD
        });

        // CHECK IF RESPONSE IS NOT OK
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.error)
        }

        // -- PARSE THE RESPONSE BODY
        const parsedJson = await response.json();

        // -- SAVE THE PARSED JSON TO THE ACTIVITIES DATA
        this.activities = parsedJson.activities;

        // -- GET GEOLOCATION OF THE LOCATIONS
        const geocodingPromises = parsedJson.activities.map(async item => {
          if (item.location && !item.coordinates) { // Only geocode if coordinates are missing
            item.coordinates = await this.geocodeLocation(item.location); // Await here
          }
          return item; // Return the modified item
        });

        // -- RESOLVE ALL PROMISES AND SAVE TO ACTIVITIES
        this.activities = await Promise.all(geocodingPromises);

        // -- INITIALIZE MAP
        if (this.mapLoaded) {
          this.initMapAndMarkers();
        }
      } catch (error) {
        console.error(`Failed to generate itinerary: ${error.message}`);
        this.dangerToast.message = `Failed to generate itinerary: ${error.message}`;
      } finally {
        this.isLoading = false;
      }
    },

    // ------------------------------ GENERATES LAT LONG FOR THE LOCATION
    async geocodeLocation(locationName) {
      try {
        const response = await fetch('/api/v1/geo-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationName),
        });

        if (!response.ok) {
          console.error('Response not OK')
          const error = await response.json()
          if (error === 'ZERO_RESULTS') {
            throw new Error("Can't add marker for this location")
          }
          throw new Error(error)
        }

        return await response.json()
      } catch (e) {
        console.error(e)
        this.dangerToast.message = e.message
      }
    },

    // ------------------------------ CONVERTS ISO DATE TO DATE
    formatIsoDateToDate(value) {
      const date = new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },

    // ------------------------------ LOADS GOOGLE MAPS
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

    // ------------------------------ ADD MARKERS ON MAP
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

    // ------------------------------ REMOVE MARKERS ON THE MAP AND RESETS MAP STATUS
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

    // ------------------------------ REMOVE MARKERS
    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },

    // ------------------------------ GET USER LOCATION AND ADD ON MAP
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