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

          <Card v-for="(trip, index) in useDb.trips" class="fadeIn" :class="`fadeIn-${index}`" :customClass="cardClass(trip.theme) + 'w-full p-0! overflow-hidden rounded-4xl hover:shadow-lg transition-shadow duration-200 cursor-pointer'">
            <a :href="`/trips/${index}`" class="block">
              <div :class="['flex flex-col gap-3 p-4 sm:p-6 md:p-8', headerClass(trip.theme)]">
                <div class="flex flex-row items-center justify-between">
                  <Tag label="Upcoming" class="bg-white border-primary-light-xs"/>
                </div>

                <div>
                  <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">{{trip.name}}</h3>
                </div>

                <div class="mt-2">
                  <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>
                  <div :class="progressBgClass(trip.theme)" class="w-full rounded-full h-2 mt-1">
                    <div class="h-2 rounded-full" :class="progressClass(trip.theme)" style="width: 75%;"></div>
                  </div>
                  <span class="text-xs text-zinc-500 mt-1 block"><span class="text-sm text-zinc-500 mt-1 block">{{ trip.planningProgress?.completed }}/{{ trip.planningProgress?.total }} Sections Complete</span></span>
                </div>

                <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">
                  <div class="flex gap-1 items-center">
                    <i :class="textClass(trip.theme)" class="ph ph-calendar-dots text-base"></i>
                    <span>{{formatDateRange(trip.date.start, trip.date.end)}}</span>
                  </div>

                  <div class="flex gap-1 items-center">
                    <i :class="textClass(trip.theme)" class="ph ph-map-pin text-base"></i>
                    <span>{{ trip.location }}</span>
                  </div>
                </div>
              </div>
            </a>
          </Card>

          <!--<Card class="fadeIn fadeIn-1" customClass="w-full p-0! overflow-hidden rounded-4xl border-info-light-sm shadow-info-light-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">-->
          <!--  <a href="/trip/cebu-island-hopping" class="block">-->
          <!--    <div class="flex flex-col gap-3 bg-blue-50 p-4 sm:p-6 md:p-8">-->
          <!--      <div class="flex flex-row items-center justify-between">-->
          <!--        <Tag label="Completed" class="bg-white border-primary-light-xs"/>-->
          <!--        <button class="text-xl text-zinc-600 transition hover:text-blue-500 active:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1">-->
          <!--          <i class="ph ph-dots-three-outline-vertical"></i>-->
          <!--        </button>-->
          <!--      </div>-->

          <!--      <div>-->
          <!--        <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">Cebu Island Hopping Adventure</h3>-->
          <!--      </div>-->

          <!--      <div class="mt-2">-->
          <!--        <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>-->
          <!--        <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">-->
          <!--          <div class="bg-blue-500 h-2 rounded-full" style="width: 100%;"></div>-->
          <!--        </div>-->
          <!--        <span class="text-xs text-zinc-500 mt-1 block">All Sections Complete</span>-->
          <!--      </div>-->

          <!--      <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">-->
          <!--        <div class="flex gap-1 items-center">-->
          <!--          <i class="ph ph-calendar-dots text-blue-500 text-base"></i>-->
          <!--          <span>April 1 - 5, 2024</span>-->
          <!--        </div>-->

          <!--        <div class="flex gap-1 items-center">-->
          <!--          <i class="ph ph-map-pin text-blue-500 text-base"></i>-->
          <!--          <span>Cebu, PH</span>-->
          <!--        </div>-->
          <!--      </div>-->
          <!--    </div>-->
          <!--  </a>-->
          <!--</Card>-->

          <!--<Card class="fadeIn fadeIn-2" customClass="w-full p-0! overflow-hidden rounded-4xl border-warning-light-sm shadow-warning-light-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">-->
          <!--  <a href="/trip/batanes-exploration" class="block">-->
          <!--    <div class="flex flex-col gap-3 bg-yellow-50 p-4 sm:p-6 md:p-8">-->
          <!--      <div class="flex flex-row items-center justify-between">-->
          <!--        <Tag label="Draft" class="bg-white border-primary-light-xs"/>-->
          <!--        <button class="text-xl text-zinc-600 transition hover:text-yellow-500 active:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-full p-1">-->
          <!--          <i class="ph ph-dots-three-outline-vertical"></i>-->
          <!--        </button>-->
          <!--      </div>-->

          <!--      <div>-->
          <!--        <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">Batanes Island Exploration</h3>-->
          <!--      </div>-->

          <!--      <div class="mt-2">-->
          <!--        <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>-->
          <!--        <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">-->
          <!--          <div class="bg-yellow-500 h-2 rounded-full" style="width: 20%;"></div>-->
          <!--        </div>-->
          <!--        <span class="text-xs text-zinc-500 mt-1 block">1/5 Sections Complete</span>-->
          <!--      </div>-->

          <!--      <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">-->
          <!--        <div class="flex gap-1 items-center">-->
          <!--          <i class="ph ph-calendar-dots text-yellow-500 text-base"></i>-->
          <!--          <span>August 1 - 7, 2025</span>-->
          <!--        </div>-->

          <!--        <div class="flex gap-1 items-center">-->
          <!--          <i class="ph ph-map-pin text-yellow-500 text-base"></i>-->
          <!--          <span>Batanes, PH</span>-->
          <!--        </div>-->
          <!--      </div>-->
          <!--    </div>-->
          <!--  </a>-->
          <!--</Card>-->

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue";
import Button from "../../UI/Button.vue";
import {useDbStore} from "../../../stores/db.js";

export default {
  components: {
    Card,
    Tag,
    Button
  },

  data() {
    return {
      useDb: useDbStore.get(), // Initialize with the current state
      unsubscribeFromDbStore: null,
      trips: [],
    }
  },

  methods: {
    cardClass(theme) {
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
    },

    headerClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-50';
        case 'blue':
          return 'bg-sky-50';
        case 'amber':
          return 'bg-amber-50';
        case 'emerald':
          return 'bg-emerald-50';
        default:
          return 'bg-peach-50';
      }
    },

    progressClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-500';
        case 'blue':
          return 'bg-sky-500';
        case 'amber':
          return 'bg-amber-500';
        case 'emerald':
          return 'bg-emerald-500';
        default:
          return 'bg-peach-500';
      }
    },

    progressBgClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-200'
        case 'blue':
          return 'bg-sky-200';
        case 'amber':
          return 'bg-amber-200';
        case 'emerald':
          return 'bg-emerald-200';
        default:
          return 'bg-peach-200';
      }
    },

    textClass(theme) {
      switch (theme) {
        case 'peach':
          return 'text-peach-500';
        case 'blue':
          return 'text-sky-500';
        case 'amber':
          return 'text-amber-500';
        case 'emerald':
          return 'text-emerald-500';
        default:
          return 'text-peach-500';
      }
    },

    redirect(address){
      window.location.href=address
    },

    formatDateRange(startDateIso, endDateIso) {
      if (!startDateIso || !endDateIso) return '';

      const start = new Date(startDateIso);
      const end = new Date(endDateIso);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid date string(s) for range: Start "${startDateIso}", End "${endDateIso}"`);
        return '';
      }

      // Options for consistent short month and numeric day
      const monthDayOptions = { month: 'short', day: 'numeric' };
      const yearOptions = { year: 'numeric' };

      const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(end);
      const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

      // If it's a single-day trip
      if (startDateIso === endDateIso) {
        return `${startMonthDay}, ${year}`;
      }

      // If it's a multi-day trip within the same month and year
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        // Example: "May 14 - 16, 2025"
        return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start)} - ${endDay}, ${year}`;
      }

      // If it spans different months or years, show full start date and end date
      // Example: "Dec 25 - Jan 5, 2026" or "Dec 25, 2025 - Jan 5, 2026"
      const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

      if (start.getFullYear() === end.getFullYear()) {
        return `${startFull} - ${endFull}, ${year}`;
      } else {
        // If years are different, include year for both
        const startFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(start);
        const endFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(end);
        return `${startFullYear} - ${endFullYear}`;
      }
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