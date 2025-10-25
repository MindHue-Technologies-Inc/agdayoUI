<template>
  <Sheet :padding-on="false" :model-value="showSheet" @update:modelValue="closeSheetViaProp">
    <div class="relative flex flex-col items-start grow h-full rounded-t-xl overflow-hidden">
      <!-- HEADER -->
      <div class="z-10 absolute top-5 left-5 flex gap-2 items-center justify-center text-3xl p-2 rounded-xl bg-white text-zinc-700">
        <i class="ph ph-globe-hemisphere-west"></i>
        <span class="font-bold">Map</span>
      </div>

      <button @click="closeSheetViaProp" class="z-10 absolute top-5 right-5 cursor-pointer">
        <div class="h-10 w-10 rounded-full flex items-center justify-center bg-white">
          <i class="text-black ph ph-x text-2xl"></i>
        </div>
      </button>

      <!-- MAP -->
      <div class="w-full grow flex flex-col h-full top-0 z-0">
        <div id="map" class="h-full flex grow"></div>
      </div>

      <!-- ACTIVITY LIST (BOTTOM SLIDER) -->
      <div class="p-3 w-full">
        <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          <div
              v-for="(activity, index) in activities"
              :key="index"
              class="flex-shrink-0 w-60 p-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 cursor-pointer transition flex items-center gap-3"
              @click="focusActivity(activity)"
          >
            <span class="flex-shrink-0 text-zinc-500 text-3xl font-medium">{{ index + 1 }}</span>

            <div class="flex flex-col min-w-0"> <!-- ensures ellipsis works -->
              <div
                  class="font-semibold text-zinc-800 text-sm truncate"
                  title="{{ activity.title }}"
              >
                {{ activity.title }}
              </div>
              <div
                  class="text-xs text-zinc-500 truncate"
                  title="{{ activity.location }}"
              >
                {{ activity.location }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </Sheet>
</template>

<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from "vue";
import Sheet from "../../../../UI/Sheet.vue";

const props = defineProps({
  showSheet: { type: Boolean, default: false },
  activities: { type: Array, required: true },
});

const emit = defineEmits(["update:showSheet"]);
const closeSheetViaProp = () => {
  emit("update:showSheet", false);
  clearMap();
};

let map: any = null;
const markers = ref<any[]>([]);

const loadLeaflet = async () => {
  if (window.L) return window.L;
  await Promise.all([
    import("leaflet/dist/leaflet.css").then(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }),
    import("leaflet"),
  ]);
  if (!document.getElementById("leaflet-script")) {
    const script = document.createElement("script");
    script.id = "leaflet-script";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    document.head.appendChild(script);
    await new Promise((resolve) => (script.onload = resolve));
  }
  return window.L;
};

const initMapAndMarkers = async () => {
  const L = await loadLeaflet();
  const activities = [...props.activities];

  let activitiesWithCoords = activities.filter(
      (a) => a.coordinates && a.coordinates.latitude && a.coordinates.longitude
  );

  const missingCoords = activities.filter((a) => !a.coordinates);
  if (missingCoords.length > 0) {
    for (const a of missingCoords) {
      const response = await fetch(`/api/v1/geo-location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a.location),
      });
      if (!response.ok) continue;
      a.coordinates = await response.json();
      activitiesWithCoords.push(a);
    }
  }

  if (activitiesWithCoords.length === 0) return clearMap();

  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  if (!map) {
    map = L.map(mapContainer, {
      zoomControl: false,
      attributionControl: false,
    });
  } else {
    clearMarkers();
  }

  // Layers
  const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles © Esri",
      }
  );

  const hybridLabels = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "© Esri",
      }
  );

  const hybridLayer = L.layerGroup([satelliteLayer, hybridLabels]);
  hybridLayer.addTo(map);

  L.control
      .layers(
          {
            Street: streetLayer,
            Satellite: satelliteLayer,
            Hybrid: hybridLayer,
          },
          {},
          { position: "bottomright" }
      )
      .addTo(map);

  function getGoogleMapsLink(activity: any) {
    if (activity.coordinates) {
      const lat = activity.coordinates.latitude;
      const lng = activity.coordinates.longitude;
      return `https://www.google.com/maps/@${lat},${lng},19z`;
    }
    return "#";
  }

  // Create markers
  markers.value = activitiesWithCoords.map((activity: any) => {
    const lat = activity.coordinates.latitude;
    const lng = activity.coordinates.longitude;
    const marker = L.marker([lat, lng]).addTo(map);

    marker.bindPopup(`
      <div class="p-2">
        <strong>${activity.title}</strong><br>
        ${activity.location}<br>
        <a href="${getGoogleMapsLink(activity)}" target="_blank" style="color:#1a73e8;">
          View in Google Maps
        </a>
      </div>
    `);

    return { marker, activity };
  });

  const bounds = L.latLngBounds(markers.value.map((m) => m.marker.getLatLng()));
  map.fitBounds(bounds, { padding: [50, 50] });
};

// Focus map on clicked activity
const focusActivity = (activity: any) => {
  if (!map) return;
  console.log(markers.value)
  console.log(activity)
  const markerObj = markers.value.find((m) => m.activity.id === activity.id);
  console.log(markerObj)
  if (markerObj) {
    const { marker } = markerObj;
    const latLng = marker.getLatLng();
    map.setView(latLng, 16, { animate: true });
    marker.openPopup();
  }
};

const clearMap = () => {
  if (map) {
    map.remove();
    map = null;
  }
  markers.value = [];
};
const clearMarkers = () => {
  markers.value.forEach((m) => m.marker.remove());
  markers.value = [];
};

const showSheet = computed(() => props.showSheet);
watch(showSheet, (status) => {
  if (status) initMapAndMarkers();
  else clearMap();
});

onBeforeUnmount(() => clearMap());
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
