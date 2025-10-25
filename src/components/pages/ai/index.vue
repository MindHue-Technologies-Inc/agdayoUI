<template>
  <div class="grow mt-8 flex flex-col gap-4 md:mt-16">
    <!-- HEADER -->
    <div
        class="flex flex-col gap-4 items-center h-1/2 justify-end transition-all ease-in-out duration-500"
        :class="{
        'max-h-56': isLoading || activities.length > 0,
        'max-h-1/2': activities.length === 0,
      }"
    >
      <h1
          class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit"
      >
        Let
        <span
            style="background-image: linear-gradient(to right, #eea092, #eabf67); color: transparent; background-clip: text;"
        >Agdayo AI</span
        >
        help you plan your next trip!
      </h1>

      <div class="w-full relative">
        <Input
            placeholder="Where do you want to go and when?"
            id="prompt"
            v-model="prompt"
            @enter="generateItinerary"
            class="w-full"
        />
        <div class="absolute inset top-2 bottom-2 right-3 z-10">
          <Button @click="generateItinerary" size="sm" custom-class="h-8 w-8 p-0!"
          ><i class="ph ph-arrow-right"></i
          ></Button>
        </div>
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="isLoading" class="h-24 flex flex-col items-center justify-center w-full gap-2">
      <Spinner />
      <span v-if="!isLoadingTrip" class="text-zinc-400">Generating Daily Plans</span>
      <span v-else class="text-zinc-400">Creating Trip Plan</span>
    </div>

    <div v-if="activities.length > 0" class="flex items-center justify-center w-full">
      <span class="text-zinc-500 text-xs"
      >Agdayo AI can make mistakes. Always verify the activities and its
        location!</span
      >
    </div>

    <div class="flex w-full">
      <Button class="w-full" v-if="activities.length > 0" @click="generateTrip"
      >Save this plan</Button
      >
    </div>

    <!-- ACTIVITIES -->
    <template v-for="(item, index) in groupedActivities" :key="index">
      <TransitionGroup name="fadeIn">
        <span
            v-if="item.type === 'day'"
            class="font-semibold text-2xl text-zinc-800 my-4"
        >Day {{ days.indexOf(item.iso) + 1 }} - {{ item.label }}</span
        >

        <div v-if="item.type === 'tag'" class="relative flex items-center justify-center my-3">
          <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
          <span
              class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase"
          >{{ item.label }}</span
          >
        </div>

        <div
            v-else-if="item.type === 'activity'"
            class="flex flex-row gap-2 md:gap-4 fadeIn"
            :class="`fadeIn-${index}`"
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

    <!-- MAP -->
    <div v-if="activities.length > 0 && mapLoaded" class="relative">
      <div id="map" class="w-full h-[400px] my-4 rounded-lg shadow-md"></div>

      <!-- INFO CARD -->
      <div
          class="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg shadow-md text-sm"
      >
        <p class="font-semibold text-zinc-700">Itinerary Overview</p>
        <ul class="mt-1 text-zinc-600">
          <li v-for="(day, index) in days" :key="index">
            Day {{ index + 1 }}: {{ formatIsoDateToDate(day) }}
          </li>
        </ul>
        <button
            class="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
            @click="resetZoom"
        >
          Reset Zoom
        </button>
      </div>

      <!-- USER LOCATION BUTTON -->
      <button
          class="absolute bottom-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
          title="My Location"
          @click="getUserLocation"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-geo-alt-fill text-blue-600"
            viewBox="0 0 16 16"
        >
          <path
              d="M4 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0m6 0a4 4 0 1 0-8 0 4 4 0 0 0 8 0M7 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
    </div>

    <div
        v-else-if="activities.length > 0 && !mapLoaded"
        class="w-full h-[800px] my-4 flex items-center justify-center text-zinc-400"
    >
      Loading Map...
    </div>
  </div>

  <!-- TOAST -->
  <ToastContainer>
    <Toast :variant="'error'" ref="dangerToast" :message="dangerToast.message" />
  </ToastContainer>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Input from "../../UI/Input.vue";
import Spinner from "../../UI/Spinner.vue";
import Toast from "../../UI/Toast.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import TimelineDot from "../trip/components/timeline/TimelineDot.vue";
import CardActivity from "../trip/components/timeline/CardActivity.vue";
import Button from "../../UI/Button.vue";

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
      dangerToast: { message: "" },
      prompt: "",
      isLoading: false,
      isLoadingTrip: false,
      map: null,
      mapLoaded: false,
      markers: [],
      activities: [],
    };
  },
  computed: {
    days() {
      return [...new Set(this.activities.map((a) => a.datetime.split("T")[0]))];
    },
    groupedActivities() {
      const result = [];
      let currentDay = null;
      this.activities.forEach((activity) => {
        const date = new Date(activity.datetime);
        const day = activity.datetime.split("T")[0];
        if (day !== currentDay) {
          currentDay = day;
          result.push({
            type: "day",
            label: this.formatIsoDateToDate(date),
            iso: day,
          });
        }
        result.push({ type: "activity", data: activity });
      });
      return result;
    },
  },
  methods: {
    async generateItinerary() {
      this.isLoading = true;
      try {
        const res = await fetch("/api/v1/generate-plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: this.prompt, currentActivities: this.activities }),
        });

        if (!res.ok) throw new Error("FAILED TO GENERATE PLANS")

        const data = await res.json();
        this.activities = data.activities || [];
        this.mapLoaded = true;
        this.$nextTick(() => this.initMap());
      } catch(error) {
        console.error(error)
      }
      finally {
        this.isLoading = false;
      }
    },
    initMap() {
      if (!this.map) {
        this.map = L.map("map", { zoomControl: false });
      } else {
        this.clearMarkers();
      }

      // Layers
      const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      });
      const satellite = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      );
      const hybrid = L.layerGroup([satellite, street]);

      street.addTo(this.map);
      L.control
          .layers(
              { Street: street, Satellite: satellite, Hybrid: hybrid },
              {},
              { position: "topright" }
          )
          .addTo(this.map);

      const activitiesWithCoords = this.activities.filter(
          (a) => a.coordinates?.latitude && a.coordinates?.longitude
      );
      if (activitiesWithCoords.length === 0) return;

      const bounds = L.latLngBounds([]);
      this.markers = activitiesWithCoords.map((activity, i) => {
        const lat = activity.coordinates.latitude;
        const lng = activity.coordinates.longitude;
        bounds.extend([lat, lng]);
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(`
          <div class="p-2">
            <strong>${activity.title}</strong><br>
            ${activity.location}<br>
            <a href="${this.getGoogleMapsLink(activity)}" target="_blank" style="color:#1e90ff;">View in Google Maps</a>
          </div>
        `);
        return marker;
      });

      this.map.fitBounds(bounds);
    },
    resetZoom() {
      if (this.map && this.markers.length > 0) {
        const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));
        this.map.fitBounds(bounds);
      }
    },
    clearMarkers() {
      this.markers.forEach((m) => this.map.removeLayer(m));
      this.markers = [];
    },
    getGoogleMapsLink(activity) {
      if (activity.coordinates) {
        const { latitude, longitude } = activity.coordinates;
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
      }
      return "#";
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          L.marker([lat, lng], {
            icon: L.icon({
              iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              iconSize: [32, 32],
            }),
          })
              .addTo(this.map)
              .bindPopup("Your Location")
              .openPopup();
        });
      }
    },
    formatIsoDateToTime(v) {
      const d = new Date(v);
      const h = d.getHours() % 12 || 12;
      const m = d.getMinutes().toString().padStart(2, "0");
      const ampm = d.getHours() >= 12 ? "PM" : "AM";
      return `${h}:${m} ${ampm}`;
    },
    formatIsoDateToDate(v) {
      return new Date(v).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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

        const tripToSave = {
          ...parsedJson.trip,
          theme: "peach",
          activities: this.activities,
        }

        console.log(tripToSave)

        // -- ADD TRIP TO FIRESTORE USING API ENDPOINT
        const tripsResponse = await fetch('/api/v1/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tripToSave)
        })

        if (!tripsResponse) {
          const error = await tripsResponse.json()
          throw new Error(`Error with saving trips: ${error.message}`)
        }

        // -- GET THE ID OF THE TRIP
        const tripsJsonResponse = await tripsResponse.json()
        console.log(tripsJsonResponse)
        const tripId = tripsJsonResponse.tripId

        console.log(tripId)

        // -- LOCATE TO TRIP WITH ITS ID
        window.location.href = `/trips/${tripId}`
        // -- ADD TRIP TO THE DATABASE
        // addTrip(parsedJson.trip)

        // -- REDIRECT TO THE TRIP PAGE
        // window.location.href=`/trips/${this.useDb.trips.length}`


      } catch (e) {
        console.error(e.message)
      } finally {
        this.isLoading = false
        this.isLoadingTrip = false;
      }
    },

  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
  border-radius: 0.5rem;
}
</style>
