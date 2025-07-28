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

          <template v-if="trips.length > 0">
            <TripCard :trips="sortedTrips"></TripCard>
          </template>

          <template v-else-if="isLoading">
            <div class="flex items-center justify-center w-full h-[32rem]">
              <Spinner label="Loading your trips"/>
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col grow items-center justify-center gap-2 h-[32rem]">
              <i class="ph ph-island text-5xl text-zinc-400"></i>
              <span class="font-medium text-zinc-400">No Trips</span>
            </div>
          </template>

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
import Spinner from "../../UI/Spinner.vue";
import Anchor from "../../UI/Anchor.vue";

export default {
  components: {
    Anchor,
    Spinner,
    Card,
    Tag,
    Button,
    TripCard
  },

  data() {
    return {
      trips: [],
      isLoading: true,
    }
  },

  computed: {
    sortedTrips() {
      return this.trips.toSorted((a,b) => {
        return a.date.start.localeCompare(b.date.start)
      })
    },

  },

  methods: {
    async fetchTrips() {
      try {
        const response = await fetch('/api/v1/trips')
        if (!response.ok) {
          const error = await response.json()
          console.error('Something went wrong', error.message)
          throw new Error(`Something went wrong: ${error.message}`)
        }

        this.trips = await response.json()
        console.log(this.trips)
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    redirect(address){
      window.location.href=address
    },
  },

  async mounted() {
    await this.fetchTrips();
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