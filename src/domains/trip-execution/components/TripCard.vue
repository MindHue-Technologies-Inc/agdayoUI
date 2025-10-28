<template>
  <Card
      class="fadeIn"
      :class="[`fadeIn-${index}`, cardClass(trip.theme), 'w-full p-0! overflow-hidden rounded-4xl hover:shadow-lg transition-shadow duration-200 cursor-pointer']"
  >
    <a :href="`/trips/${trip.id}`" class="block">
      <TripHeader :trip="trip" />

      <div class="flex flex-col gap-3 p-6 sm:p-6 md:p-8 pt-2!">
        <span class="text-lg text-zinc-800 font-semibold">Current Activity</span>

        <ActivityCard v-if="currentActivity(trip)" :activity="currentActivity(trip)" :trip="trip" />
        <div v-else-if="isLoading" class="flex flex-col items-center justify-center">
          <Spinner />
          <span class="text-zinc-400">Loading Activity</span>
        </div>
        <div v-else>No Activities</div>

        <template v-if="nextActivity(trip)">
          <span class="text-lg text-zinc-800 font-semibold">Next Activity</span>
          <ActivityCard :activity="nextActivity(trip)" :trip="trip" />
        </template>
      </div>
    </a>
  </Card>
</template>

<script setup lang="ts">
import TripHeader from './TripHeader.vue';
import ActivityCard from './ActivityCard.vue';
import Spinner from "@/shared/components/UI/Spinner.vue";
import Card from "@/shared/components/UI/Card.vue"
import {ref} from "vue";

defineProps<{
  trip: any
  index: number
}>()

const isLoading = ref(false)

function cardClass(theme:string) {
  switch (theme) {
    case 'peach':
      return 'border-primary-light-sm shadow-primary-light-md';
    case 'blue':
      return 'border-info-light-sm shadow-info-light-md';
    case 'amber':
      return 'border-warning-light-sm shadow-warning-light-md';
    case 'emerald':
      return 'border-success-light-sm shadow-success-light-md';
    default:
      return 'border-primary-light-sm shadow-primary-light-md';
  }
}

function getActivity(trip: any, type: 'current' | 'next') {
  const nowIso = getLocalIsoStringWithOffset(new Date());
  const activities = trip.activities ?? [];

  if (activities.length === 0) return null;

  const filtered = activities.filter((a: any) =>
      type === 'current' ? a.datetime <= nowIso : a.datetime >= nowIso
  );

  if (filtered.length === 0) return null;

  const sorted = filtered.sort((a: any, b: any) =>
      type === 'current'
          ? b.datetime.localeCompare(a.datetime) // latest past
          : a.datetime.localeCompare(b.datetime) // earliest upcoming
  );

  return sorted[0];
}

// 👇 usage
const currentActivity = (trip: any) => getActivity(trip, 'current');
const nextActivity = (trip: any) => getActivity(trip, 'next');


function getLocalIsoStringWithOffset(date:Date) {
  const pad = (num:any) => num < 10 ? '0' + num : num;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Get timezone offset in minutes and convert to HH:mm format
  const offsetMinutes = date.getTimezoneOffset(); // Returns difference in minutes between UTC and local time
  const offsetSign = offsetMinutes > 0 ? '-' : '+'; // Invert sign because getTimezoneOffset is UTC - local
  const offsetHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetRemainingMinutes = pad(Math.abs(offsetMinutes) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
</script>
