<template>
  <AdvInput
      id="travel-dates"
      label="Dates"
      icon="ph ph-calendar"
      :summary="formattedDateRange"
  >
    <div class="flex flex-col p-1 gap-2">
      <DateRangePicker v-model:range="range" />
      <Button class="w-full" @click="proceedNext" :disabled="!range.start || !range.end">Next</Button>
    </div>
  </AdvInput>
</template>

<script>
import AdvInput from "../../../UI/AdvInput.vue";
import Button from "../../../UI/Button.vue";
import DateRangePicker from "../../../UI/DateRange.vue";

export default {
  components: {
    DateRangePicker,
    AdvInput,
    Button,
  },
  props: {
    summary: {
      type: String,
    }
  },
  data() {
    return {
      range: {
        start: null, // Stores the start Date object
        end: null,   // Stores the end Date object
      },
    };
  },
  computed: {
    /**
     * Formats the selected date range for the AdvInput summary.
     * Displays "Select your travel dates" if no range is selected.
     */
    formattedDateRange() {
      if (this.range.start && this.range.end) {
        const options = { month: 'short', day: 'numeric' };
        const start = this.range.start.toLocaleDateString('en-US', options);
        const end = this.range.end.toLocaleDateString('en-US', options);
        return `${start} - ${end}`;
      }
      return this.summary;
    },
  },
  methods: {
    /**
     * Handles the "Next" button click.
     * Here you would typically emit the selected date range or navigate.
     */
    proceedNext() {
      if (this.range.start && this.range.end) {
        console.log('Selected Date Range:', this.range.start.toISOString(), 'to', this.range.end.toISOString());
        // Example: this.$emit('dates-selected', this.range);
        // Navigate to the next step, etc.
      } else {
        console.warn('Please select both start and end dates.');
      }
    },
  },
};
</script>