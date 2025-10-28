<template>
  <div class="grid gap-6">
    <TripCard v-for="(trip, index) in trips" :key="trip.id" :trip="trip" :index="index" />
  </div>
</template>

<script setup lang="ts">
import TripCard from './TripCard.vue'

defineProps<{
  trips: any[]
}>()
</script>
