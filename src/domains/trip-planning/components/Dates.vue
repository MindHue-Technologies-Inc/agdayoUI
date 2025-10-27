<template>
  <AdvInput
      id="travel-dates"
      label="Dates"
      icon="ph ph-calendar"
      :summary="summary"
      ref="advInput"
  >
    <div class="flex flex-col p-1 gap-2">
      <DateRangePicker v-model:range="range" />
      <Button v-if="!disableButton" class="w-full" @click="proceedNext" :disabled="!range.start || !range.end">Next</Button>
    </div>
  </AdvInput>
</template>

<script>
import AdvInput from "@/shared/components/UI/AdvInput.vue";
import Button from "@/shared/components/UI/Button.vue";
import DateRangePicker from "@/shared/components/UI/DateRange.vue";

export default {
  components: {
    DateRangePicker,
    AdvInput,
    Button,
  },
  props: {
    summary: {
      type: String,
    },

    disableButton: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Object,
      default: () => ({
        range: {
          start: '',
          end: '',
        }
      })
    }
  },
  data() {
    return {
      range: { ...this.modelValue },
    };
  },

  watch: {
    range: {
      handler(newRange) {
        this.$emit('update:modelValue', newRange)
      }
    }
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
        this.$emit('next')
      } else {
      }
    },

    expand() {
      this.$refs.advInput.expand()
    },

    collapse() {
      this.$refs.advInput.collapse()
    }
  },
};
</script>