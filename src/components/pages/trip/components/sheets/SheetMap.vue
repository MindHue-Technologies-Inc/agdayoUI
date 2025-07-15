<template>
  <Sheet :model-value="showSheet" @update:modelValue="closeSheetViaProp">
    <div class="relative flex flex-col items-start grow h-full">
      <!-- HEADER CONTAINER -->
      <div class="bg-linear-to-b from-white/100 via-white/70 to-white/0 z-10 md:px-6 md:py-8 px-2 px-2 py-1 flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-globe-hemisphere-west"></i> <span class="font-bold">Map</span>
        </div>

        <button @click="closeSheetViaProp" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <!--BODY-->
      <div class="w-full grow flex flex-col h-full absolute top-0 z-0">
        <div id="map" class="h-full flex grow"></div>
      </div>
    </div>
  </Sheet>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted, onRenderTriggered,
  defineProps,
  watch,
  computed,
} from "vue";
import Sheet from "../../../../UI/Sheet.vue";
import Button from "../../../../UI/Button.vue";

// -- API URL
const api_url = import.meta.env.VITE_API_BASE_URL

// -- PROPS
const props = defineProps({
  showSheet: {
    type: Boolean,
    default: false,
  },
  activities: {
    type: Array,
    required: true,
  }
});

// -- EMITS
const emit = defineEmits(['update:showSheet', 'showMap', 'confirm']);

// -- CLOSES THE SHEET
const closeSheetViaProp = () => {
  emit('update:showSheet', false)
  clearMap();
}

// -- MAP STUFFS
const map = ref<any>(null);
const mapLoaded = ref<Boolean>(false);
const markers = ref<object>([]);

// -- LOADS GOOGLE MAPS
const loadGoogleMapsScript = () => {

  // -- CHECK IF GOOGLE MAPS IS BEING LOADED
  if (document.getElementById('google-maps-script')) {
    console.log('Google Maps script is already being loaded.')
    return;
  }

  // -- START OF LOADING GOOGLE MAPS
  console.log('Loading Google Maps Script...')

  // -- CREATES A NEW SCRIPT ELEMENT IN THE DOM
  const script = document.createElement('script');
  const Maps_API_KEY = import.meta.env.PUBLIC_MAP_API_KEY

  // -- SCRIPT CONFIG
  script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}&callback=initMapCallback`;
  script.async = true;
  script.defer = true;
  script.id = 'google-maps-script';

  // -- ADD THE SCRIPT ELEMENT TO HEAD
  document.head.appendChild(script);

  window.initMapCallback = () => {
    console.log("Google Maps API script loaded successfully!");
    mapLoaded.value = true;
  }

  script.onerror = () => {
    console.error("Failed to load Google Maps script.");
  };
}

// -- INITIALIZE MAP AND MARKERS
const initMapAndMarkers = async () => {
  if (!mapLoaded || props.activities.length === 0) {
    return;
  }

  // -- FILTER OUT ACTIVITIES WITHOUT COORDS
  let activitiesWithCoords = props.activities.filter(a => {
    return a.coordinates && a.coordinates.latitude && a.coordinates.longitude
  });

  const activitiesWOCoords = props.activities.filter(a => {
    return !a.coordinates
  })

  if (activitiesWOCoords.length > 0) {
    for (let a of activitiesWOCoords) {
      const response = await fetch(`${api_url}/geo-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(a.location)
      });

      if (!response.ok) {
        console.error('Response not OK')
      }

      a.coordinates = await response.json()
      activitiesWithCoords.push(a)
    }
  }

  if (activitiesWithCoords.length === 0) {
    console.warn('No activities with valid coordinates found to display on map.')
    clearMap();
    return;
  }

  // -- CALCULATE INITIAL MAP CENTER AND BOUNDS
  let bounds = new google.maps.LatLngBounds();
  activitiesWithCoords.forEach(activity => {
    bounds.extend(new google.maps.LatLng(activity.coordinates.latitude, activity.coordinates.longitude));
  });

  // -- INITIALIZE MAP IF IT DOESN'T EXISTS OR RE-CENTER/FIT BOUND IF IT DOES
  if (!map.value) {
    map.value = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: bounds.getCenter(),
      mapId: 'YOU_MAP_ID_HERE',
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      rotateControl: false,
      scaleControl: false,
    });
  } else {
    cleaerMarkers();
  }

  map.value.fitBounds(bounds)

  markers.value = activitiesWithCoords.map((activity, index) => {
    const marker = new google.maps.Marker({
      position: { lat: activity.coordinates.latitude, lng: activity.coordinates.longitude },
      map: map.value,
      title: activity.title,
      label: ( index + 1 ).toString(),
    });

    const googleMapsLink = getGoogleMapsLink(activity);

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-4 pt-0">
          <span class="font-bold text-2xl">${activity.title}</span>
          <br>
          ${activity.location}
          <br>
          ${googleMapsLink !== '#' ? `
          <div>
            <a href="${googleMapsLink}" target="_blank" rel="noopener noreferrer"
               style="
                 color: #1a73e8; /* Google blue */
                 text-decoration: none;
                 font-weight: 500;
                 display: inline-block; /* Allows padding/margin if needed */
                 padding-top: 5px; /* Space from location text */
               ">
              View in Google Maps
            </a>
          </div>
        ` : ''}
        </div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    });

    return marker
  })
}

// -- CLEARS MAP
const clearMap = () => {
  if (map.value) {
    clearMarkers();
    map.value = null;
    mapLoaded.value = false;
  }
  markers.value = [];
  const x = document.getElementById('map')
  const y = document.getElementById('google-maps-script')
  x.remove()
  y.remove()
}

// -- CLEAR MARKERS
const clearMarkers = () => {
  markers.value.forEach(marker => marker.setMap(null));
  markers.value = []
}

// -- GET USER LOCATION
const getUserLocation = () => {
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

// HELPER FUNCTION TO OPEN GOOGLE MAP LINKS
const getGoogleMapsLink = (activity) => {
  // Prefer coordinates for a precise link
  if (activity.coordinates && typeof activity.coordinates.latitude === 'number' && typeof activity.coordinates.longitude === 'number') {
    const lat = activity.coordinates.latitude;
    const lng = activity.coordinates.longitude;
    // This URL opens Google Maps centered on the coordinates with a reasonable zoom level (e.g., 15)
    return `https://www.google.com/maps/@${lat},${lng},19z`;
  } else if (activity.location) {
    // Fallback to a search query if coordinates are not available or invalid
    const encodedLocation = encodeURIComponent(activity.location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }
  // Return a fallback or empty string if no location data is present
  return '#'; // Or an empty string if you prefer not to show the link
};

// -- WATCHER FOR mapLoaded
watch(mapLoaded, (isLoaded)=>{
  if (isLoaded) {
    initMapAndMarkers();
  }
})


const showSheet = computed(()=>{
  return props.showSheet
})
watch(showSheet, (status)=>{
  if (status) {
    loadGoogleMapsScript()
  }
})

</script>