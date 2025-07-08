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
      {{`${this.localActivity.date}T${this.localActivity.time}:00`}}
      <div class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar">
        <Input
            id="addActivityName"
            v-model="localActivity.title"
            placeholder="e.g., Explore Mines View Park"
            label="Activity Name"
            icon="ph-article"
        />

        <div class="flex flex-col gap-4">
          <label for="addActivityDate" class="ml-6 text-sm font-medium text-zinc-900">
            Date & Time
          </label>
          <div class="grid grid-cols-2 gap-4">
            <Select2
                class="w-full"
                v-model="localActivity.date"
                id="addActivityDate"
                label="Date"
                :options="days"
                :placeholder="isEditing ? (localActivity.date ? new Intl.DateTimeFormat(getLocale(), { month: 'short', day: 'numeric' }).format(new Date(localActivity.date + 'T00:00:00Z')) : 'Select Date') : 'Select Date'"
                icon="ph-calendar"
            />
            <Input
                id="addActivityTime"
                v-model="localActivity.time"
                type="time"
                label="Time"
                icon="ph-clock"
            />
          </div>
        </div>

        <Input
            id="addActivityLocation"
            v-model="localActivity.location"
            placeholder="e.g., Mines View Park, Baguio City"
            label="Location"
            icon="ph-map-pin"
        />

        <div class="flex flex-col gap-4">
          <label for="addActivityBudget" class="ml-6 text-sm font-medium text-zinc-900">
            Budget
          </label>
          <div class="grid grid-cols-2 gap-4">
            <Input
                id="addActivityBudget"
                v-model.number="localActivity.cost"
                type="number"
                placeholder="e.g., 150.00"
                label="Amount"
                prefix="₱"
                min="0"
                :step="0.01"
                icon="ph-currency-circle-dollar"
            />
            <Select
                v-model="localActivity.costCurrency"
                id="activity-budget-currency"
                label="Currency"
                :options="currencies"
                icon="ph-wallet"
            />
          </div>
          <Input
              id="addActivityCostNote"
              v-model="localActivity.costNote"
              placeholder="e.g., per person, entrance fee"
              label="Notes (Optional)"
              icon="ph-note"
          />
        </div>

        <Input
            id="addActivityDescription"
            v-model="localActivity.description"
            type="textarea"
            rows="3"
            placeholder="Add more details about this activity..."
            label="Description"
            icon="ph-notepad"
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

      <!-- ERROR MESSAGES -->
      <div class="py-2">
        <span class="text-rose-500">{{error}}</span>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 pt-6 grow w-full">
        <Button class="w-full" @click="cancelActivity" variant="secondary">
          Cancel
        </Button>
        <Button class="w-full" @click="saveActivity" :disabled="!localActivity.title">
          {{ isEditing ? 'Save Changes' : 'Add Activity' }}
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue"; // Keep if used for internal display, not essential for the form
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue";
import currencyData from "../../../../../assets/json/currencies.json"
import Select2 from "../../../../UI/SelectSimple.vue";

export default {
  components: {
    Select2,
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
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

    // modelValue now expects an object: { showSheet: boolean, activity: object | null }
    // If activity is an object, it's edit mode. If null, it's add mode.
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true,
    }
  },

  data() {
    return {
      b0ss: null,
      error: '',
      // localActivity will be either a new empty object or a copy of the activity being edited
      currencies: currencyData,
      localActivity: this.getInitialActivityState(),
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
      ]
    };
  },

  computed: {
    // Determines if the component is in "edit" mode
    isEditing() {
      // An activity exists and has an ID (meaning it's not a fresh, unsaved activity)
      return this.modelValue.activity && this.modelValue.activity.id;
    },
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
    localActivityFormat() {
      return {...this.localActivity, datetime:`${this.localActivity.date}T${this.localActivity.time}:00`}
    },
    days() {
      const dates = [];
      const startDate = new Date(this.dateRange.start);
      const endDate = new Date(this.dateRange.end);
      const locale = this.getLocale();

      let currentDate = new Date(this.dateRange.start);
      let dayCounter = 1;

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`
        const day = currentDate.getDate()
        const isoDate = `${year}-${month}-${day}`;
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push({ value: isoDate, label: `Day ${dayCounter} (${formattedDate})` });

        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
      }
      console.log(dates)
      return dates;
    },
    selectedIconSummary() {
      // Replaces 'ph-' prefix for cleaner summary
      const iconText = this.localActivity.iconName ? this.localActivity.iconName.replace('ph-', '').replace('-', ' ') : 'Choose an icon';
      // Capitalize first letter of each word
      return iconText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  },

  watch: {
    // Watch modelValue.showSheet to reset form or load data when sheet opens/closes
    'modelValue.showSheet': {
      immediate: true, // Run immediately on component mount
      handler(newVal) {
        if (newVal) {
          // If a specific activity object is passed, create a DEEP copy to avoid direct mutation
          if (this.modelValue.activity) {
            this.localActivity = JSON.parse(JSON.stringify(this.modelValue.activity));
          } else {
            // Otherwise, reset to initial state for a new activity
            this.localActivity = this.getInitialActivityState();
          }
        }
      }
    }
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    generateUniqueId() {
      // Basic ID generation; for a real app, use a UUID library or backend ID
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialActivityState() {
      // Returns a fresh, empty activity object for adding a new one
      return {
        id: this.generateUniqueId(), // Give new activities an ID upfront for consistency
        name: '',
        time: '',
        date: '',
        location: '',
        cost: 0,
        costCurrency: 'PHP',
        costNote: '',
        description: '',
        iconName: '', // Selected icon class, e.g., 'ph-bus'
      };
    },
    selectIcon(iconClass) {
      this.localActivity.iconName = iconClass;
    },
    handleSheetClose() {
      // Emits the update to close the sheet. Also resets localActivity on close.
      this.$emit('update:showSheet', false);
      this.localActivity = this.getInitialActivityState(); // Reset form on close
    },
    cancelActivity() {
      this.handleSheetClose(); // Simply close and reset
    },
    saveActivity() {
      if (!this.localActivity.title.trim()) {
        this.error = 'Activity name is required!'; // Basic validation
        return;
      }
      if (!this.localActivity.time || !this.localActivity.date) {
        this.error = 'Please select date and time';
        return;
      }
      // Emit the *modified* localActivity object
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