<template>
  <Card class="fadeIn md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex-row!">
    <div class="flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200">
      <span class="text-peach-500 border-b text-lg mb-2">Day {{ days(trip).indexOf(activity.date) + 1 }}</span>
      <span class="text-xs text-zinc-500 mt-0.5">{{ getDay(activity.datetime) }}</span>
      <span class="font-bold text-lg text-zinc-800 whitespace-nowrap">{{ formatTime(activity.time) }}</span>
    </div>

    <div class="flex flex-col gap-2 pl-2 w-full justify-center">
      <div class="flex items-center justify-between w-full gap-1">
        <div class="flex items-center gap-1">
          <i class="ph text-xl text-peach-400" :class="activity.iconName"></i>
          <span class="text-lg font-medium">{{ activity.title }}</span>
        </div>
      </div>

      <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
        <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
        <span>{{ activity.location.split(',')[0] }}</span>
      </div>

      <div v-if="activity.costNote || activity.cost" class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
        <i v-if="activity.cost" class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
        <span v-if="activity.cost" class="font-semibold text-zinc-600">{{ formattedCost(activity.cost, activity.costCurrency) }}</span>
        <span v-if="activity.costNote" class="text-zinc-400">{{ activity.costNote }}</span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/shared/components/UI/Card.vue"

defineProps<{ activity: any; trip: any }>()

function formattedCost(cost:any, currency:any) {
  if (typeof cost === 'number') {
    // Format as currency if it's a number
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: currency }).format(cost);
  }
  return cost; // Return as is if it's a string (e.g., "Included")
}

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

function getDay(datetime:string) {
  const date = new Date(datetime)
  const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ]
  return days[date.getDay()]
}

function days(trip:any) {
  const dates = [];
  const startDate = new Date(trip.date.start);
  const endDate = new Date(trip.date.end);
  const locale = navigator.language || 'en-US';

  let currentDate = new Date(trip.date.start);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`
    const isoDate = `${year}-${month}-${day}`;
    const formattedDate = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(currentDate);

    dates.push(isoDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function formatTime(time:string) {
  if (!time) return

  const x = time.split(':')

  // HOUR
  let hour = Number(x[0])
  hour = hour % 12
  hour = hour === 0 ? 12 : hour

  // MINUTE
  let minute = x[1]

  let ampm = Number(x[0]) >= 12 ? 'PM': 'AM'

  return `${hour}:${minute} ${ampm}`
}
</script>
