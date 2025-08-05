<!-- NEED TO ADD ACTUAL TRIP THAT IS UPCOMING OR ACTIVE -->

<template>
    <!-- IF ACTIVITIES EMPTY-->
    <div v-if="activeTrips.length <= 0" class="flex flex-col grow items-center justify-center gap-4">
      <template v-if="isLoading">
        <div class="flex items-center justify-center w-full h-[32rem]">
          <Spinner label="Loading your trips"/>
        </div>
      </template>
      <template v-else>
        <transition name="fade" appear>
          <div class="flex flex-col grow items-center justify-center gap-4">
            <i class="ph ph-island text-8xl text-zinc-400"></i>
            <span class="font-medium text-zinc-400">No Active or Upcoming Trip</span>
            <div class="flex flex-col gap-1 items-center justify-center">
              <Anchor href="/create-trip" class="text-xl">Start Planning your Trip</Anchor>
              <span>or</span>
              <span class="text-xl">Use <a href="/ai" class="p-1 rounded-lg bg-white transition border border-zinc-200 scale-100 active:scale-95 hover:scale-105"><span class="font-medium" style="background-image: linear-gradient(to right, #eea092, #eabf67);color: transparent;background-clip: text;">Agdayo AI</span></a> to help you plan your Trip!</span>
            </div>
          </div>
        </transition>
      </template>
    </div>

    <!-- ELSE -->
    <div v-else  class="flex flex-col gap-8 mt-12">
      <!-- COUNTERS -->
      <div class="flex flex-nowrap gap-2 md:gap-4">
        <!-- ACTIVE TRIPS -->
        <AgdayoCard class="fadeIn fadeIn-0" custom-class="flex flex-col items-start justify-between relative">
          <div class="flex flex-col items-start justify-between">
            <span class="font-medium text-normal md:text-lg text-zinc-700">Active Trips</span>
            <span class="font-bold text-4xl md:text-6xl">{{activeTrips.length}}</span>

          </div>
          <span class="text-xs text-zinc-400 mt-4">With 4 upcoming activities</span>
          <i class="ph ph-airplane-tilt text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
        </AgdayoCard>

        <!-- UPCOMING TRIPS -->
        <AgdayoCard class="fadeIn fadeIn-1" custom-class="flex flex-col items-start justify-between relative">
          <div class="flex flex-col items-start justify-between">
            <span class="font-medium text-normal md:text-lg text-zinc-700">Upcoming Trips</span>
            <span class="font-bold text-4xl md:text-6xl">{{upcomingTrips.length}}</span>

          </div>
          <span class="text-xs text-zinc-400 mt-4">Planned Adventures</span>
          <i class="ph ph-calendar-dots text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
        </AgdayoCard>

        <!-- NUMBER OF COMPANIONS FOR ACTIVE TRIPS -->
        <AgdayoCard class="fadeIn fadeIn-2 hidden md:flex" custom-class="flex flex-col items-start justify-between relative">
          <div class="flex flex-col items-start justify-between">
            <span class="font-medium text-normal md:text-lg text-zinc-700">Companions</span>
            <span class="font-bold text-4xl md:text-6xl">{{companions.length}}</span>

          </div>
          <span class="text-xs text-zinc-400 mt-4">Currently on active trips</span>
          <i class="ph ph-users text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
        </AgdayoCard>
      </div>

      <span class="font-bold text-4xl fadeIn">Active Trips</span>
      <ActiveTripCard :trips="activeTrips"/>
    </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  defineProps,
  watch,
  computed,
  defineOptions,
} from "vue";
import Anchor from "../../UI/Anchor.vue";
import TripCard from "../../UI/TripCard.vue";
import ActiveTripCard from "../../UI/ActiveTripCard.vue";
import Spinner from "../../UI/Spinner.vue";
import AgdayoCard from "../../UI/AgdayoCard.vue";

defineOptions({
  name: 'ActiveTrips'
})

const trips = ref([]);
const isLoading = ref<boolean>(true);

// COMPUTED STATES
const activeTrips = computed(()=>{
  return trips.value.filter((trip:any) => {
    return checkUpcoming(trip.date.start, trip.date.end) === 'Active'
  })
})

const upcomingTrips = computed(()=>{
  return trips.value.filter((trip:any) => {
    return checkUpcoming(trip.date.start, trip.date.end) === 'Upcoming'
  })
})

const companions = computed(()=>{
  return [...new Set(activeTrips.value.map(trip=>trip.companionsUids).flat())]
})

const fetchTrips = async () => {
  try {
    const response = await fetch('/api/v1/active-trips');

    // Check if the response is valid
    if (!response.ok) {
      console.error(`Failed to fetch trips. Status: ${response.status}`);
      // Throwing an error here will be caught by the outer try/catch
      throw new Error(`Failed to fetch trips: ${response.statusText}`);
    }

    isLoading.value = false
    // Return the parsed JSON data
    return await response.json();
  } catch (error) {
    console.error('Error fetching trips:', error);
    isLoading.value = false
    // Return null to indicate a failure and allow the page to render an error state
    return null;
  }
}

function getLocalIsoStringWithOffset(date) {
  const pad = (num) => num < 10 ? '0' + num : num;

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

function checkUpcoming(dateStart, dateEnd) {
  const currentDate = new Date()
  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)
  endDate.setDate(endDate.getDate() + 1);

  if ( currentDate < startDate) return 'Upcoming'
  if ( startDate <= currentDate && currentDate < endDate ) return 'Active'
  if ( endDate < currentDate ) return 'Completed'
}

onMounted( async () => {
  trips.value = await fetchTrips()
})

</script>