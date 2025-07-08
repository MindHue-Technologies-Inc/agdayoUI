<template>
  <Sheet :model-value="showSheet" @update:modelValue="handleSheetClose">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i :class="isEditing ? 'ph ph-pencil-simple' : 'ph ph-plus-circle'"></i>
          <span class="font-bold">
            {{ isEditing ? `Edit Activity: ${localActivity.title || '(Unnamed)'}` : 'Add New Activity' }}
          </span>
        </div>
        <button @click="handleSheetClose" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar">

        <Input
            id="activityTitle"
            v-model="localActivity.title"
            placeholder="e.g., Explore Mines View Park"
            label="Activity Name"
            icon="ph-article"
            :error="validationErrors.title"
        />

        <div class="flex flex-col gap-4">
          <label for="activityDate" class="ml-6 text-sm font-medium text-zinc-900">
            Date & Time
          </label>
          <div class="grid grid-cols-2 gap-4">
            <Select2
                class="w-full"
                v-model="localActivity.date"
                id="activityDate"
                label="Date"
                :options="days"
                :placeholder="localActivity.date ? new Intl.DateTimeFormat(getLocale(), { month: 'short', day: 'numeric' }).format(new Date(localActivity.date + 'T00:00:00Z')) : 'Select Date'"
                icon="ph-calendar"
                :error="validationErrors.date"
            />
            <Input
                id="activityTime"
                v-model="localActivity.time"
                type="time"
                label="Time"
                icon="ph-clock"
                :error="validationErrors.time"
            />
          </div>
          <p v-if="validationErrors.dateTimeCombo" class="text-sm text-red-500 ml-6 -mt-3">{{ validationErrors.dateTimeCombo }}</p>
        </div>

        <Input
            id="activityLocation"
            v-model="localActivity.location"
            placeholder="e.g., Mines View Park, Baguio City"
            label="Location"
            icon="ph-map-pin"
            :error="validationErrors.location"
        />

        <div class="flex flex-col gap-4">
          <label for="activityCost" class="ml-6 text-sm font-medium text-zinc-900">
            Budget
          </label>
          <div class="grid grid-cols-2 gap-4">
            <Input
                id="activityCost"
                v-model.number="localActivity.cost"
                type="number"
                placeholder="e.g., 150.00"
                label="Amount"
                prefix="₱"
                min="0"
                :step="0.01"
                icon="ph-currency-circle-dollar"
                :error="validationErrors.cost"
            />
            <Select
                v-model="localActivity.costCurrency"
                id="activity-cost-currency"
                label="Currency"
                :options="currencies"
                icon="ph-wallet"
                :error="validationErrors.costCurrency"
            />
          </div>
          <Input
              id="activityCostNote"
              v-model="localActivity.costNote"
              placeholder="e.g., per person, entrance fee"
              label="Notes (Optional)"
              icon="ph-note"
              :error="validationErrors.costNote"
          />
        </div>

        <Input
            id="activityDescription"
            v-model="localActivity.description"
            type="textarea"
            rows="3"
            placeholder="Add more details about this activity..."
            label="Description"
            icon="ph-notepad"
            :error="validationErrors.description"
        />

        <div class="flex flex-col gap-4">
          <label class="ml-6 text-sm font-medium text-zinc-900">
            Activity Type Icon
          </label>
          <div class="flex flex-wrap gap-3 p-1">
            <button
                v-for="(iconClass) in activityIcons"
                :key="iconClass"
                @click="selectIcon(iconClass)"
                :class="[
                  'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                  localActivity.iconName === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                ]"
            >
              <i class="ph" :class="iconClass"></i>
            </button>
          </div>
        </div>

      </div>

      <div v-if="Object.values(validationErrors).some(err => err)" class="py-2">
        <span class="text-rose-500 text-sm">Please fix the errors above to save.</span>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 pt-6 w-full">
        <Button class="w-full" @click="cancelActivity" variant="secondary">
          Cancel
        </Button>
        <Button class="w-full" @click="saveActivity" :disabled="!isFormValid">
          {{ isEditing ? 'Save Changes' : 'Add Activity' }}
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
// AdvInput is now removed as it's no longer used
// Tag is removed as it wasn't used
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import currencyData from "../../../../../assets/json/currencies.json"
import Select2 from "../../../../UI/SelectSimple.vue"; // Ensure this path is correct based on your file structure

export default {
  components: {
    Select2,
    Sheet,
    Button,
    Input,
    Select,
  },

  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },
    dateRange: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true, // Should always be required as it defines the sheet's state
    }
  },

  data() {
    return {
      localActivity: this.getInitialActivityState(),
      currencies: currencyData.map(c => ({
        label: `${c.label} (${c.value})`, // e.g., "Philippine Peso (PHP)"
        value: c.value
      })),
      activityIcons: [
        'ph-bus', 'ph-coffee', 'ph-tree', 'ph-bowl-food', 'ph-palette', 'ph-bed',
        'ph-pizza', 'ph-airplane', 'ph-car', 'ph-train', 'ph-bicycle', 'ph-camera',
        'ph-map-pin', 'ph-shopping-bag', 'ph-storefront', 'ph-swimming-pool',
        'ph-mountains', 'ph-tent', 'ph-binoculars', 'ph-campfire', 'ph-first-aid',
        'ph-currency-circle-dollar', 'ph-calendar', 'ph-sparkle', 'ph-sun', 'ph-moon',
        'ph-globe-hemisphere-east', 'ph-gift', 'ph-ticket', 'ph-book-open',
        'ph-microphone-stage', 'ph-park', 'ph-compass', 'ph-cloud-sun',
        'ph-cloud-rain', 'ph-wifi-high', 'ph-device-mobile', 'ph-user-list',
        'ph-cookie', 'ph-question',
      ],
      // Centralized object for all validation errors
      validationErrors: {
        title: '',
        date: '',
        time: '',
        dateTimeCombo: '', // For errors related to date/time combination
        location: '',
        cost: '',
        costCurrency: '',
        costNote: '',
        description: '',
        iconName: '',
      },
    };
  },

  computed: {
    localActivityFormat() {
      return {...this.localActivity, datetime:`${this.localActivity.date}T${this.localActivity.time}:00`}
    },
    isEditing() {
      // Check if activity exists and has an ID (meaning it's an existing activity)
      return this.modelValue.activity && this.modelValue.activity.id;
    },
    days() {
      const dates = [];
      // Use dateRange from props for trip start/end
      const startDate = new Date(this.dateRange.start);
      const endDate = new Date(this.dateRange.end);
      const locale = this.getLocale();

      let currentDate = new Date(startDate);
      let dayCounter = 1;

      while (currentDate <= endDate) {
        const isoDate = currentDate.toISOString().split('T')[0];
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push({ value: isoDate, label: `Day ${dayCounter} (${formattedDate})` });

        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        dayCounter++;
      }
      return dates;
    },
    // This computed prop simplifies the Button's disabled state
    isFormValid() {
      // Basic check: title is required
      if (!this.localActivity.title.trim()) {
        return false;
      }
      // You can add more complex checks here if needed before attempting to save
      // E.g., if you want to disable the button until all errors are cleared
      const hasErrors = Object.values(this.validationErrors).some(err => err !== '');
      return !hasErrors;
    },
    // The following summary computed properties are now less critical since AdvInput is removed.
    // They are kept here as a reference but can be removed if not used elsewhere.
    activityDateTimeSummary() {
      const parts = [];
      if (this.localActivity.time) {
        parts.push(`at ${this.localActivity.time}`);
      }
      if (this.localActivity.date) {
        parts.push(`on ${this.localActivity.date}`);
      }
      return parts.length > 0 ? parts.join(' ') : 'Set time & date';
    },
    activityBudgetSummary() {
      if (this.localActivity.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localActivity.costCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        let summary = formatter.format(this.localActivity.cost);
        if (this.localActivity.costNote) {
          summary += ` (${this.localActivity.costNote})`;
        }
        return summary;
      }
      return 'Enter estimated cost';
    },
    selectedIconSummary() {
      const iconText = this.localActivity.iconName ? this.localActivity.iconName.replace('ph-', '').replace(/-/g, ' ') : 'Choose an icon';
      return iconText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  },

  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.localActivity = newVal.activity
      }
    },
    // You might want to watch individual fields to clear their specific error messages
    // as the user types/selects, e.g.:
    'localActivity.title'(newVal) {
      if (newVal.trim() !== '') {
        this.validationErrors.title = '';
      }
    },
    'localActivity.date'(newVal) {
      if (newVal) {
        this.validationErrors.date = '';
        this.validationErrors.dateTimeCombo = ''; // Clear combo error if date selected
      }
    },
    'localActivity.time'(newVal) {
      if (newVal) {
        this.validationErrors.time = '';
        this.validationErrors.dateTimeCombo = ''; // Clear combo error if time selected
      }
    },
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialActivityState() {
      return {
        id: this.generateUniqueId(),
        title: '', // Changed from 'name' to 'title' for consistency
        time: '',
        date: '',
        location: '',
        cost: 0,
        costCurrency: 'PHP', // Default currency for Olongapo
        costNote: '',
        description: '',
        iconName: '', // Selected icon class, e.g., 'ph-bus'
      };
    },
    selectIcon(iconClass) {
      this.localActivity.iconName = iconClass;
    },
    // Resets all validation errors
    clearValidationErrors() {
      for (const key in this.validationErrors) {
        this.validationErrors[key] = '';
      }
    },
    handleSheetClose() {
      this.$emit('update:showSheet', false);
      this.localActivity = this.getInitialActivityState(); // Reset form state
      this.clearValidationErrors(); // Clear errors
    },
    cancelActivity() {
      this.handleSheetClose(); // Simply close and reset
    },
    saveActivity() {
      this.clearValidationErrors(); // Clear all errors at the start of validation

      let isValid = true; // Flag to track overall form validity

      // Validate Activity Name
      if (!this.localActivity.title.trim()) {
        this.validationErrors.title = 'Activity name is required.';
        isValid = false;
      }

      // Validate Date & Time relationship and range
      if (this.localActivity.time && !this.localActivity.date) {
        this.validationErrors.date = 'Date is required if time is set.';
        this.validationErrors.dateTimeCombo = 'A date must be selected if time is entered.'; // More general error
        isValid = false;
      }

      if (this.localActivity.date) {
        const selectedDate = new Date(this.localActivity.date + 'T00:00:00Z'); // Parse as UTC
        const tripStartDate = new Date(this.dateRange.start);
        tripStartDate.setUTCHours(0,0,0,0);

        const tripEndDate = new Date(this.dateRange.end);
        tripEndDate.setUTCHours(0,0,0,0);

        if (selectedDate < tripStartDate || selectedDate > tripEndDate) {
          this.validationErrors.date = `Date must be within the trip range (${new Intl.DateTimeFormat(this.getLocale(), { dateStyle: 'short' }).format(tripStartDate)} - ${new Intl.DateTimeFormat(this.getLocale(), { dateStyle: 'short' }).format(tripEndDate)}).`;
          isValid = false;
        }
      }

      // Add more specific validations for other fields if needed (e.g., cost > 0)
      if (this.localActivity.cost < 0) {
        this.validationErrors.cost = 'Cost cannot be negative.';
        isValid = false;
      }


      // If any validation failed, stop here
      if (!isValid) {
        return;
      }

      // All validations passed, proceed to save
      // The `activity-saved` event will carry the formatted activity data
      this.$emit('activity-saved', this.localActivityFormat);
      this.handleSheetClose(); // Close the sheet after saving
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>