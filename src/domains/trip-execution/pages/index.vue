<template>
  <TripsLoading v-if="isLoading" />
  <TripsEmptyState v-else-if="activeTrips.length === 0" />
  <TripsOverview
      v-else
      :active-trips="activeTrips"
      :upcoming-trips="upcomingTrips"
      :companions="companions"
  />
</template>

<script setup lang="ts">
import TripsEmptyState from "../components/TripsEmptyState.vue";
import TripsLoading from "../components/TripsLoading.vue";
import TripsOverview from "../components/TripsOverview.vue";
import { useTrips } from "../composables/useTrips";

const { isLoading, activeTrips, upcomingTrips, companions } = useTrips();
</script>
