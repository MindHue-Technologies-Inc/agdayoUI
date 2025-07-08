<template>
  <transition name="fade" appear>
    <div class="grow mt-8 md:mt-16">
      <div class="max-w-4xl ">
        <div class="flex items-center justify-between mb-8">
          <h1 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">
            My Trips
          </h1>
          <Button variant="primary" @click="redirect('/create-trip')">
            <i class="ph ph-plus text-lg mr-1"></i> New Trip
          </Button>
        </div>

        <div class="flex flex-col gap-6">

          <TripCard :trips="sortedTrips.map(trip=>trip.trip)" :actual-index="sortedTrips.map(trip=>trip.originalIndex)"></TripCard>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import Card from "../../UI/Card.vue";
import TripCard from "../../UI/TripCard.vue";
import Tag from "../../UI/Tag.vue";
import Button from "../../UI/Button.vue";
import {useDbStore} from "../../../stores/db.js";

export default {
  components: {
    Card,
    Tag,
    Button,
    TripCard
  },

  data() {
    return {
      useDb: useDbStore.get(), // Initialize with the current state
      unsubscribeFromDbStore: null,
      trips: [],
    }
  },

  computed: {
    sortedTrips() {
      const trips = [...this.useDb.trips]
      const sortedTrips =  trips.sort((a,b) => {
        return b.date.start.localeCompare(a.date.start)
      })

      return sortedTrips.map(trip=>{
        const originalIndex = this.useDb.trips.indexOf(trip);
        return {
          trip: trip,
          originalIndex: originalIndex
        };
      })
    }
  },

  methods: {
    redirect(address){
      window.location.href=address
    },
  },

  mounted() {
    // 3. Subscribe to the nanostores store
    this.unsubscribeFromDbStore = useDbStore.listen(newValue => {
      // Update the component's reactive data property with the new store value
      this.useDb = newValue;
      console.log("Nanostores updated, Vue component data refreshed:", newValue);
    });
  },
}
</script>

<style scoped>
/* Outfit font import and usage for titles (ensure it's globally available or imported here if needed) */
.outfit {
  font-family: 'Outfit', sans-serif;
}
/* Ensure your custom-scrollbar class is defined elsewhere for overflow-x-auto styling */
</style>