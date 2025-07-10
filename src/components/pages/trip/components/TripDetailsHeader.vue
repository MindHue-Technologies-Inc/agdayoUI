<template>
    <div :class="['flex flex-col gap-3 p-4 md:p-6 sm:p-8', headerClass]">
      <div class="fadeIn flex flex-row items-center justify-between">
        <div class="flex flex-row gap-2 items-center">
          <!--<Tag label="Upcoming" class="bg-white border-primary-light-xs"/>-->
          <Tag label="View on Map" variant="green" mode="button" icon="ph-map-trifold" />
        </div>

        <button @click="$emit('show-settings')" class="flex justify-center items-center text-2xl text-zinc-600 cursor-pointer transition hover:text-peach-500 active:text-peach-600 focus:outline-none focus:ring-2 focus:ring-peach-300 rounded-full p-1 -mr-1">
          <i class="ph ph-gear-six"></i>
        </button>
      </div>

      <div class="fadeIn fadeIn-1">
        <h2 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">{{tripConfig.name}}</h2>
      </div>

      <div class="mt-2 fadeIn fadeIn-2">
        <span class="text-zinc-600 font-semibold">Planning Progress:</span>
        <div :class="progressBgClass" class="w-full rounded-full h-2 mt-1">
          <div :class="['h-2 rounded-full transition-all ease', progressClass]" :style="{ width: `${(planningProgress.completed / planningProgress.total) * 100}%` }"></div>
        </div>
        <span class="text-sm text-zinc-500 mt-1 block">{{ planningProgress.completed }}/{{ planningProgress.total }} Sections Complete</span>
      </div>

      <div class="fadeIn fadeIn-3 flex flex-row items-center gap-6 text-zinc-600 font-medium mt-2">
        <div class="flex gap-2 items-center">
          <i :class="['ph ph-calendar-dots text-xl', textClass]"></i>
          <span>{{formatDateRange(tripConfig.date.start, tripConfig.date.end)}}</span>
        </div>

        <div class="flex gap-2 items-center">
          <i :class="['ph ph-map-pin text-xl', textClass]"></i>
          <span>{{tripConfig.location}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import Card from "../../../UI/Card.vue";
import Tag from "../../../UI/Tag.vue";

export default {
  name: 'TripDetailsHeader',
  components: {
    Card,
    Tag,
  },
  props: {
    tripConfig: {
      type: Object,
      required: true,
    },
    planningProgress: {
      type: Object,
      required: true,
    },
  },
  emits: ['show-settings'],
  computed: {
    cardClass() {
      switch (this.tripConfig.theme) {
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
    headerClass() {
      switch (this.tripConfig.theme) {
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
    progressClass() {
      switch (this.tripConfig.theme) {
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
    progressBgClass() {
      switch (this.tripConfig.theme) {
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
    textClass() {
      switch (this.tripConfig.theme) {
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
    }
  },
  methods: {
    formatDateRange(startDate, endDate) {
      if (!startDate || !endDate) return '';

      const start = startDate
      const end = endDate

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid date string(s) for range: Start "${startDate}", End "${endDate}"`);
        return '';
      }

      const monthDayOptions = { month: 'short', day: 'numeric' };
      const yearOptions = { year: 'numeric' };

      const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(end);
      const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

      if (startDate === endDate) {
        return `${startMonthDay}, ${year}`;
      }

      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start)} - ${endDay}, ${year}`;
      }

      const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

      if (start.getFullYear() === end.getFullYear()) {
        return `${startFull} - ${endFull}, ${year}`;
      } else {
        const startFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(start);
        const endFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(end);
        return `${startFullYear} - ${endFullYear}`;
      }
    },
  },
};
</script>
