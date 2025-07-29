<template>
  <Card v-for="(trip, index) in trips" class="fadeIn" :class="`fadeIn-${index}`" :customClass="cardClass(trip.theme) + 'w-full p-0! overflow-hidden rounded-4xl hover:shadow-lg transition-shadow duration-200 cursor-pointer'">
    <a :href="`/trips/${trip.id}`" class="block">
      <div :class="['flex flex-col gap-3 p-4 sm:p-6 md:p-8', headerClass(trip.theme)]">
        <div class="flex flex-row items-center justify-between" id="status">
          <Tag v-if="checkUpcoming(trip.date.start, trip.date.end) === 'Upcoming'" label="Upcoming" class="bg-white border-primary-light-xs"/>
          <Tag v-if="checkUpcoming(trip.date.start, trip.date.end) === 'Active'" label="Active" variant="yellow"/>
          <Tag v-if="checkUpcoming(trip.date.start, trip.date.end) === 'Completed'" label="Completed" variant="green"/>
        </div>

        <div>
          <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">{{trip.name}}</h3>
        </div>

        <div class="mt-2">
          <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>
          <div :class="progressBgClass(trip.theme)" class="w-full rounded-full h-2 mt-1">
            <div class="h-2 rounded-full" :class="progressClass(trip.theme)" :style="{ width: `${(progressOfPlanning(trip)  / trip.planningProgress.total) * 100}%` }"></div>
          </div>
          <span class="text-xs text-zinc-500 mt-1 block"><span class="text-sm text-zinc-500 mt-1 block">{{ progressOfPlanning(trip) }}/{{ trip.planningProgress?.total }} Sections Complete</span></span>
        </div>

        <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">
          <div class="flex gap-1 items-center">
            <i :class="textClass(trip.theme)" class="ph ph-calendar-dots text-base"></i>
            <span id="date-range">{{formatDateRange(trip.date.start, trip.date.end)}}</span>
          </div>

          <div class="flex gap-1 items-center">
            <i :class="textClass(trip.theme)" class="ph ph-map-pin text-base"></i>
            <span>{{ trip.location }}</span>
          </div>
        </div>
      </div>
    </a>
  </Card>
</template>
<script>
import Card from "./Card.vue";
import Tag from "./Tag.vue";

export default {
  components: {
    Card,
    Tag
  },

  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  methods: {
    progressOfPlanning(trip) {
      const conditions = [
        trip.activityIds?.length > 0,
        trip.budgetIds?.length > 0,
        trip.companionsUids?.length > 1,
        trip.taskIds?.length > 0,
        !!trip.accommodationIds?.length > 0,
        // Add other conditions here
      ];

      const completed = conditions.filter(Boolean).length;
      const total = conditions.length;

      return completed
    },

    checkUpcoming(dateStart, dateEnd) {
      const currentDate = new Date()
      const startDate = new Date(dateStart)
      const endDate = new Date(dateEnd)
      endDate.setDate(endDate.getDate() + 1);

      console.log(currentDate)
      console.log(startDate)
      console.log(endDate)

      if ( currentDate < startDate) return 'Upcoming'
      if ( startDate <= currentDate && currentDate < endDate ) return 'Active'
      if ( endDate < currentDate ) return 'Completed'
    },

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
}
</script>