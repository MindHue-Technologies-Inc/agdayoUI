<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center mt-4 gap-2">
      <button @click="changeMonth(-1)" class="px-2 py-1 rounded-md hover:bg-zinc-100 transition">
        <i class="ph ph-caret-left"></i>
      </button>
      <div class="flex gap-2">
        <select
            v-model="selectedMonth"
            @change="updateCalendar"
            class="border px-2 py-1 rounded text-sm bg-white cursor-pointer"
        >
          <option v-for="(month, i) in months" :key="i" :value="i">
            {{ month }}
          </option>
        </select>

        <select
            v-model="selectedYear"
            @change="updateCalendar"
            class="border px-2 py-1 rounded text-sm bg-white cursor-pointer"
        >
          <option v-for="year in yearRange" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <button @click="changeMonth(1)" class="px-2 py-1 rounded-md hover:bg-zinc-100 transition">
        <i class="ph ph-caret-right"></i>
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center text-sm font-medium text-zinc-500">
      <div v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 gap-1 items-center text-center justify-center">
      <div
          v-for="(day, index) in paddedDays"
          :key="index"
          class="flex items-center justify-center"
          @click="selectDate(day)"
      >
        <div
            class="aspect-square rounded-full w-12 flex items-center justify-center cursor-pointer transition-all duration-200"
            :class="getDayClass(day)"
        >
          {{ day ? day.getDate() : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Removed unused Button and Select imports
// import Button from "./Button.vue";
// import Select from "./Select.vue";

export default {
  name: "DateRangePicker",
  emits: ["update:range"],
  props: {
    range: { // Changed from modelValue to range to match v-model:range usage
      type: Object,
      default: () => ({ start: null, end: null }),
    },
  },
  data() {
    const today = new Date();
    return {
      today,
      // Initialize selected month/year to today's month/year
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      startDate: null,
      endDate: null,
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
    };
  },
  watch: {
    // Watch for external changes to the 'range' prop to update internal state
    range: {
      handler(newRange) {
        this.startDate = newRange.start;
        this.endDate = newRange.end;
        // Optionally, update the displayed month/year to show the start date if provided
        if (newRange.start) {
          this.selectedMonth = newRange.start.getMonth();
          this.selectedYear = newRange.start.getFullYear();
        }
      },
      immediate: true, // Run handler immediately on component mount
      deep: true,      // Watch for nested changes in the range object
    },
    // Emit changes whenever startDate or endDate are updated internally
    startDate() { this.emitRange(); },
    endDate() { this.emitRange(); },
  },
  computed: {
    paddedDays() {
      const days = [];
      // Use local date methods for current month/year display
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
      const dayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

      // Add leading nulls for padding
      for (let i = 0; i < dayOfWeek; i++) {
        days.push(null);
      }

      // Add actual days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(this.selectedYear, this.selectedMonth, i));
      }

      return days;
    },
    yearRange() {
      const currentYear = new Date().getFullYear();
      // Provide a reasonable range, e.g., 10 years back, 10 years forward
      return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
    },
  },
  methods: {
    /**
     * Updates the calendar view when month or year selection changes.
     */
    updateCalendar() {
      // selectedMonth and selectedYear are already updated by v-model
      // No explicit currentMonth variable needed.
    },
    /**
     * Changes the displayed month.
     * @param {number} offset - -1 for previous month, 1 for next month.
     */
    changeMonth(offset) {
      const newDate = new Date(this.selectedYear, this.selectedMonth + offset, 1);
      this.selectedMonth = newDate.getMonth();
      this.selectedYear = newDate.getFullYear();
    },
    /**
     * Handles selection of a date. Implements range selection logic.
     * @param {Date|null} date - The date object clicked, or null for padding.
     */
    selectDate(date) {
      if (!date) return;

      // Reset selection if both start and end are already chosen
      if (this.startDate && this.endDate) {
        this.startDate = date;
        this.endDate = null;
      }
      // If only start date is chosen, set end date
      else if (this.startDate) {
        if (date >= this.startDate) {
          this.endDate = date;
        } else { // If selected date is before startDate, swap them
          this.endDate = this.startDate;
          this.startDate = date;
        }
      }
      // If no date is chosen, set start date
      else {
        this.startDate = date;
      }
    },
    /**
     * Emits the current start and end dates.
     * This is called by watchers on startDate and endDate.
     */
    emitRange() {
      this.$emit("update:range", {
        start: this.startDate,
        end: this.endDate,
      });
    },
    /**
     * Checks if two Date objects represent the same day.
     * @param {Date} d1 - First date.
     * @param {Date} d2 - Second date.
     * @returns {boolean} True if they are the same day, false otherwise.
     */
    isSameDay(d1, d2) {
      return (
          d1 instanceof Date &&
          d2 instanceof Date &&
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
      );
    },
    /**
     * Checks if a date falls within the selected range (exclusive of start/end).
     * @param {Date} date - The date to check.
     * @returns {boolean} True if within range, false otherwise.
     */
    isInRange(date) {
      // Ensure date is a Date object before comparison
      if (!(date instanceof Date) || !this.startDate || !this.endDate) return false;

      // Normalize dates for accurate comparison if needed, but direct comparison usually works
      const start = this.startDate.getTime();
      const end = this.endDate.getTime();
      const current = date.getTime();

      return current > start && current < end;
    },
    /**
     * Determines CSS classes for a calendar day based on its selection state.
     * @param {Date|null} day - The date object for the calendar cell.
     * @returns {Object} An object mapping CSS classes to boolean values.
     */
    getDayClass(day) {
      if (!day) return "";

      const isStart = this.isSameDay(day, this.startDate);
      const isEnd = this.isSameDay(day, this.endDate);
      const inRange = this.isInRange(day);
      const isToday = this.isSameDay(day, this.today);

      return {
        // Highlight today's date if not part of selection
        "border border-blue-400": isToday && !isStart && !isEnd && !inRange,
        "text-blue-600 font-semibold": isToday && !isStart && !isEnd && !inRange,

        // Range selection styling
        "bg-peach-400 text-white": isStart || isEnd, // Start or End date
        "bg-peach-100": inRange, // Dates within the range

        // Hover effect for non-selected, non-range dates
        "hover:bg-zinc-100": !isStart && !isEnd && !inRange,

        // Text color for dates not in current month (if you decide to show them)
        // "text-zinc-300": day.getMonth() !== this.selectedMonth,
      };
    },
  },
};
</script>

<style scoped>
/* Basic styling for select elements, potentially overridden by your UI components */
select {
  /* Remove default browser appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Basic styling using Tailwind-like properties */
  border: 1px solid #d1d5db; /* border-zinc-300 */
  padding: 0.25rem 2.25rem 0.25rem 0.75rem; /* py-1 px-3 but with more room on right */
  border-radius: 0.375rem; /* rounded-md */
  font-size: 0.875rem; /* text-sm */
  background-color: #ffffff; /* bg-white */
  cursor: pointer;

  /* Custom SVG arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.25em;

  /* Remove default outline and add a custom focus style */
  outline: none;
}

  /* Optional: Add a focus style for accessibility */
select:focus {
  @apply border-2; /* Tailwind focus ring */
}
</style>