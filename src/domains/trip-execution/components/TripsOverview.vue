<template>
  <div class="flex flex-col gap-8 mt-12">
    <TripsStats
        :active-count="activeTrips.length"
        :upcoming-count="upcomingTrips.length"
        :companions-count="companions.length"
    />

    <span class="font-bold text-4xl fadeIn">Active Trips</span>
    <TripsList :trips="activeTrips" />
  </div>
</template>

<script setup lang="ts">
import TripsStats from "./TripsStats.vue";
import TripsList from "./TripsList.vue";

defineProps<{
  activeTrips: any[];
  upcomingTrips: any[];
  companions: any[];
}>();
</script>
