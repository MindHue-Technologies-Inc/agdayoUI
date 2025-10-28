<template>
  <div :class="['flex flex-col gap-3 p-6 sm:p-6 md:p-8', headerClass(trip.theme)]">
    <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">
      {{ trip.name }}
    </h3>

    <div class="flex gap-1 items-center">
      <i :class="textClass(trip.theme)" class="ph ph-map-pin text-base"></i>
      <span>{{ trip.location }}</span>
    </div>

    <div class="flex flex-row gap-2 items-center">
      <TripTag :theme="trip.theme">
        <i :class="textClass(trip.theme)" class="ph ph-calendar-dots text-base"></i>
        <span>{{ formatDateRange(trip.date.start, trip.date.end) }}</span>
      </TripTag>

      <TripTag theme="purple">
        <i :class="textClass('purple')" class="ph ph-users text-base"></i>
        <span>{{ trip.companionsUids.length }} Companion{{ trip.companionsUids.length > 1 ? 's' : '' }}</span>
      </TripTag>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripTag from './TripTag.vue'

defineProps<{ trip: any }>()

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

function dateClass(theme:string) {
  switch (theme) {
    case 'peach':
      return 'bg-peach-100 text-peach-600';
    case 'blue':
      return 'bg-sky-100 text-sky-600';
    case 'amber':
      return 'bg-amber-100 text-amber-600';
    case 'emerald':
      return 'bg-emerald-100 text-emerald-600';
    case 'purple':
      return '!text-purple-700 bg-purple-200';
    default:
      return 'bg-peach-100 text-peach-600';
  }
}

function headerClass(theme:string) {
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
}

function textClass(theme:string) {
  switch (theme) {
    case 'peach':
      return 'text-peach-500';
    case 'blue':
      return 'text-sky-500';
    case 'purple':
      return '!text-purple-500';
    case 'amber':
      return 'text-amber-500';
    case 'emerald':
      return 'text-emerald-500';
    default:
      return 'text-peach-500';
  }
}

function formatDateRange(startDateIso: string, endDateIso: string): string {
  if (!startDateIso || !endDateIso) return '';

  const start = new Date(startDateIso);
  const end = new Date(endDateIso);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.warn(`Invalid date string(s) for range: Start "${startDateIso}", End "${endDateIso}"`);
    return '';
  }

  const monthDayOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };

  const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
  const endDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' } as Intl.DateTimeFormatOptions).format(end);
  const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

  // Single-day trip
  if (startDateIso === endDateIso) {
    return `${startMonthDay}, ${year}`;
  }

  // Multi-day, same month/year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start)} - ${endDay}, ${year}`;
  }

  // Cross-month or cross-year
  const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
  const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

  if (start.getFullYear() === end.getFullYear()) {
    return `${startFull} - ${endFull}, ${year}`;
  } else {
    const fullOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const startFullYear = new Intl.DateTimeFormat('en-US', fullOpts).format(start);
    const endFullYear = new Intl.DateTimeFormat('en-US', fullOpts).format(end);
    return `${startFullYear} - ${endFullYear}`;
  }
}

</script>
