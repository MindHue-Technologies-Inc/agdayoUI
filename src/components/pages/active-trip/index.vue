<!-- NEED TO ADD ACTUAL TRIP THAT IS UPCOMING OR ACTIVE -->

<template>
  <transition name="fade" appear>
    <!-- IF ACTIVITIES EMPTY-->
    <div v-if="upcomingActivities.length <= 0" class="flex flex-col grow items-center justify-center gap-4">
      <i class="ph ph-island text-8xl text-zinc-400"></i>
      <span class="font-medium text-zinc-400">No Active or Upcoming Trip</span>
      <Anchor href="/create-trip" class="text-xl">Start Planning your Trip</Anchor>
    </div>

    <!-- ELSE -->
    <div v-else  class="flex flex-col gap-6 mt-12">
      <TripCard :trips="upcomingActivities.map(trip=>trip.trip)" :actual-index="upcomingActivities.map(trip=>trip.originalIndex)"/>
    </div>
  </transition>
</template>

<script>
import Anchor from "../../UI/Anchor.vue";
import TripCard from "../../UI/TripCard.vue";
import {
  useDbStore,
  addEmptyTrip,
  setName,
  setLocation,
  setDate,
  setTheme,
  setPreparation,
  setCompanions,
  setAccommodation,
  setBudget,
  setTransportation,
  setRoles,
  setActivities,
  setPlanningProgress,
  removeTrip

} from "../../../stores/db.js";

export default {
  name: "ActiveTrips",
  components: {
    Anchor,
    TripCard
  },

  data() {
    return {
      useDb: useDbStore.get()
    }
  },

  computed: {
    upcomingActivities() {
      const filteredTrips = this.useDb.trips.filter((trip, index) => {
        const currentDate = new Date()
        let week1FromNow = new Date()
        let week1Past = new Date()
        week1FromNow.setDate(week1FromNow.getDate() + 3)
        week1Past.setDate(week1Past.getDate() - 2)
        const datetime = new Date(trip.date.start)
        return week1Past <= datetime && datetime <= week1FromNow;
      })

      return filteredTrips
          .sort((a,b)=>{
            return a.date.start.localeCompare(b.date.start)
          })
          .map(filteredTrip => {
        const originalIndex = this.useDb.trips.indexOf(filteredTrip);
        return {
          trip: filteredTrip,
          originalIndex: originalIndex
        };
      });
    }
  }
}
</script>