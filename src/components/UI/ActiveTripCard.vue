<template>
  <Card v-for="(trip, index) in trips" class="fadeIn" :class="`fadeIn-${index}`" :customClass="cardClass(trip.theme) + 'w-full p-0! overflow-hidden rounded-4xl hover:shadow-lg transition-shadow duration-200 cursor-pointer'">
    <a :href="`/trips/${trip.id}`" class="block">
      <div :class="['flex flex-col gap-3 p-6 sm:p-6 md:p-8', headerClass(trip.theme)]">
        <!-- NAME OF TRIP -->
        <div>
          <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">{{trip.name}}</h3>
        </div>

        <!-- LOCATION OF TRIP -->
        <div class="flex gap-1 items-center">
          <i :class="textClass(trip.theme)" class="ph ph-map-pin text-base"></i>
          <span>{{ trip.location }}</span>
        </div>

        <div class="flex flex-row gap-2 items-center">
          <!-- DATE OF TRIP -->
          <div
              class="text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm"
              :class="[dateClass(trip.theme)]"
          >
            <div class="flex gap-1 items-center">
              <i :class="textClass(trip.theme)" class="ph ph-calendar-dots text-base"></i>
              <span id="date-range">{{formatDateRange(trip.date.start, trip.date.end)}}</span>
            </div>
          </div>

          <div
              class="text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm"
              :class="[dateClass('purple')]"
          >
            <div class="flex gap-1 items-center">
              <i :class="textClass('purple')" class="ph ph-users text-base"></i>
              <span>{{trip.companionsUids.length}} Companion{{trip.companionsUids.length > 1 ? 's' : ''}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CURRENT ACTIVITIES-->
      <div class="flex flex-col gap-3 p-6 sm:p-6 md:p-8 pt-2!">
        <span class="text-lg text-zinc-800 font-semibold">Current Activity</span>

        <!-- ACTIVITY -->
        <Card v-if="currentActivity(trip)" class="fadeIn md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm
   transition-all duration-200 hover:shadow-md cursor-pointer flex-row!">
          <!-- ENHANCED CLOCK SECTION -->
          <div class="flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200">
            <span class="text-peach-500 border-b text-lg mb-2">Day {{days(trip).indexOf(currentActivity(trip)?.date) + 1}}</span>
            <span class="text-xs text-zinc-500 mt-0.5">{{getDay(currentActivity(trip)?.datetime)}}</span>
            <span class="font-bold text-lg text-zinc-800 whitespace-nowrap">{{formatTime(currentActivity(trip)?.time)}}</span>
          </div>
          <!-- CONTENT -->
          <div class="flex flex-col gap-2 pl-2 w-full justify-center"> <!-- Added left padding to content -->
            <div class="flex items-center justify-between w-full gap-1">
              <div class="flex items-center gap-1">
                <i class="ph text-xl text-peach-400" :class="currentActivity(trip)?.iconName"></i>
                <span class="text-lg font-medium">{{currentActivity(trip)?.title}}</span>
              </div>
            </div>
            <!-- B0SS -->
            <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
              <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
              <span>{{ currentActivity(trip)?.location.split(',')[0] }}</span>
            </div>

            <div v-if="currentActivity(trip)?.costNote || currentActivity(trip)?.cost" class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
              <i v-if="currentActivity(trip)?.cost" class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
              <span v-if="currentActivity(trip)?.cost" class="font-semibold text-zinc-600">{{ formattedCost(currentActivity(trip)?.cost, currentActivity(trip)?.costCurrency) }}</span>
              <span v-if="currentActivity(trip)?.costNote" class="text-zinc-400">{{ currentActivity(trip)?.costNote }}</span>
            </div>
          </div>
        </Card>

        <div class="flex flex-col items-center justify-center" v-else-if="isLoading && !currentActivity(trip)">
          <Spinner></Spinner>
          <span class="text-zinc-400">Loading Activity</span>
        </div>

        <div class="flex items-center justify-center" v-else>
          No Activities
        </div>

        <span v-if="nextActivity(trip)" class="text-lg text-zinc-800 font-semibold">Next Activity</span>

        <!-- NEXT ACTIVITY -->
        <Card v-if="nextActivity(trip)" class="fadeIn fadeIn-1 md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm
   transition-all duration-200 hover:shadow-md cursor-pointer flex-row!">
          <!-- ENHANCED CLOCK SECTION -->
          <div class="flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200">
            <span class="text-peach-500 border-b text-lg mb-2">Day {{days(trip).indexOf(nextActivity(trip)?.date) + 1}}</span>
            <span class="text-xs text-zinc-500 mt-0.5">{{getDay(nextActivity(trip)?.datetime)}}</span>
            <span class="font-bold text-lg text-zinc-800 whitespace-nowrap">{{formatTime(nextActivity(trip)?.time)}}</span>
          </div>
          <!-- CONTENT -->
          <div class="flex flex-col gap-2 pl-2 w-full justify-center"> <!-- Added left padding to content -->
            <div class="flex items-center justify-between w-full gap-1">
              <div class="flex items-center gap-1">
                <i class="ph text-xl text-peach-400" :class="nextActivity(trip)?.iconName"></i>
                <span class="text-lg font-medium">{{nextActivity(trip)?.title}}</span>
              </div>
            </div>
            <!-- B0SS -->
            <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
              <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
              <span>{{ nextActivity(trip)?.location.split(',')[0] }}</span>
            </div>

            <div v-if="nextActivity(trip)?.costNote || nextActivity(trip)?.cost" class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
              <i v-if="nextActivity(trip)?.cost" class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
              <span v-if="nextActivity(trip)?.cost" class="font-semibold text-zinc-600">{{ formattedCost(nextActivity(trip)?.cost, nextActivity(trip)?.costCurrency) }}</span>
              <span v-if="nextActivity(trip)?.costNote" class="text-zinc-400">{{ nextActivity(trip)?.costNote }}</span>
            </div>
          </div>
        </Card>
      </div>
    </a>
  </Card>
</template>
<script>
import Card from "./Card.vue";
import Tag from "./Tag.vue";
import Spinner from "./Spinner.vue";

export default {
  components: {
    Spinner,
    Card,
    Tag,
  },

  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isLoading: false,
    }
  },

  watch: {
    trips() {
      if (this.trips) this.isLoading = false
    }
  },

  methods: {
    formattedCost(cost, currency) {
      if (typeof cost === 'number') {
        // Format as currency if it's a number
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: currency }).format(cost);
      }
      return cost; // Return as is if it's a string (e.g., "Included")
    },
    days(trip) {
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
    },

    getDay(datetime) {
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
    },

    formatTime(time) {
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
    },

    currentActivity(trip) {
      const x = trip.activities?.filter(act => {
        return act.datetime <= this.getLocalIsoStringWithOffset(new Date())
      })

      if (!x) return x

      return x.sort((a,b)=>b.datetime.localeCompare(a.datetime))[0]
    },

    nextActivity(trip) {
      const x = trip.activities?.filter(act => {
        return act.datetime >= this.getLocalIsoStringWithOffset(new Date())
      })

      if (!x) return x

      return x.sort((a,b)=>a.datetime.localeCompare(b.datetime))[0]
    },

    getLocalIsoStringWithOffset(date) {
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
    },

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

      if ( currentDate < startDate) return 'Upcoming'
      if ( startDate <= currentDate && currentDate <= endDate ) return 'Active'
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

    dateClass(theme) {
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
        case 'purple':
          return '!text-purple-500';
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