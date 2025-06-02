<template>
  <Sheet :model-value="showSheet" @update:modelValue="handleSheetClose">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-pencil-simple"></i> <span class="font-bold">Edit Activity</span>
        </div>
        <button @click="handleSheetClose" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">

        <AdvInput :summary="localActivity.name || 'Enter activity name'" label="Activity Name" icon="ph-article">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localActivity.name" placeholder="e.g., Explore Mines View Park" label="Name"/>
          </div>
        </AdvInput>

        <AdvInput :summary="activityDateTimeSummary" label="Date & Time" icon="ph-calendar">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localActivity.time" type="time" label="Time"/>
            <Input v-model="localActivity.date" type="date" label="Date (Optional)"/>
          </div>
        </AdvInput>

        <AdvInput :summary="localActivity.location || 'Add activity location'" label="Location" icon="ph-map-pin">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localActivity.location" placeholder="e.g., Mines View Park, Baguio City" label="Name" />
          </div>
        </AdvInput>

        <AdvInput :summary="activityBudgetSummary" label="Budget" icon="ph-currency-circle-dollar">
          <div class="flex flex-col gap-4 p-1">
            <div class="grid grid-cols-2 gap-4">
              <Input v-model.number="localActivity.budget" type="number" placeholder="e.g., 150.00" label="Amount" prefix="₱" min="0" step="0.01"/>
              <Select
                  v-model="localActivity.budgetCurrency"
                  id="activity-budget-currency"
                  label="Currency"
                  :options="[
                    { label: 'PHP', value: 'PHP' },
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' }
                  ]"
              />
            </div>
            <Input v-model="localActivity.budgetNotes" placeholder="e.g., per person, entrance fee" label="Notes (Optional)" />
          </div>
        </AdvInput>

        <AdvInput :summary="localActivity.description || 'Add more details'" label="Description" icon="ph-notepad">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localActivity.description" type="textarea" rows="3" placeholder="Add more details about this activity..."/>
          </div>
        </AdvInput>

        <AdvInput :summary="selectedIconSummary" label="Activity Type Icon" :icon="localActivity.icon || 'ph-question'">
          <div class="flex flex-col gap-4 p-1">
            <div class="flex flex-wrap gap-3">
              <button
                  v-for="(iconClass) in activityIcons"
                  :key="iconClass"
                  @click="selectIcon(iconClass)"
                  :class="[
                    'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                    localActivity.icon === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                  ]"
              >
                <i class="ph" :class="iconClass"></i>
              </button>
            </div>
          </div>
        </AdvInput>

      </div>

      <div class="flex flex-col sm:flex-row gap-4 pt-6 grow w-full">
        <Button class="w-full" @click="cancelEdit" variant="secondary">
          Cancel
        </Button>
        <Button class="w-full" @click="saveChanges" :disabled="!localActivity.name">
          Save Changes
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue";

export default {
  components: {
    Sheet,
    Button,
    Input,
    Select,
    AdvInput,
  },

  props: {
    // modelValue for editing will always expect an activity object
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }), // activity should ideally always be provided for edit mode
      required: true,
    }
  },

  emits: ['update:modelValue', 'activity-updated'], // Emits 'activity-updated' on successful save

  data() {
    return {
      // localActivity will always be initialized with the activity passed via prop
      localActivity: {},
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
    showSheet() {
      return this.modelValue.showSheet;
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
      if (this.localActivity.budget > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localActivity.budgetCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        let summary = formatter.format(this.localActivity.budget);
        if (this.localActivity.budgetNotes) {
          summary += ` (${this.localActivity.budgetNotes})`;
        }
        return summary;
      }
      return 'Enter estimated cost';
    },
    selectedIconSummary() {
      const iconText = this.localActivity.icon ? this.localActivity.icon.replace('ph-', '').replace('-', ' ') : 'Choose an icon';
      return iconText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  },

  watch: {
    // Watch modelValue.activity to load data when sheet opens or if activity prop changes
    'modelValue.activity': {
      immediate: true, // Run immediately on component mount
      deep: true,      // Watch for changes within the activity object
      handler(newActivity) {
        if (newActivity) {
          // Create a DEEP copy to avoid direct mutation of the prop
          this.localActivity = JSON.parse(JSON.stringify(newActivity));
        } else {
          // If for some reason activity becomes null, reset to empty state
          this.localActivity = {}; // Or a more structured empty object if preferred
        }
      }
    },
    // Watch showSheet to handle initial load when sheet becomes visible
    'modelValue.showSheet': {
      handler(newVal) {
        if (newVal && !this.modelValue.activity) {
          // This case should ideally not happen if used only for editing,
          // but as a safeguard, if sheet opens without an activity, reset localActivity.
          this.localActivity = {}; // Or structured empty object
        }
      }
    }
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    selectIcon(iconClass) {
      this.localActivity.icon = iconClass;
    },
    // Handles closing the sheet, used by both cancel and save
    handleSheetClose() {
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false });
      // No need to reset localActivity here, as it's reset by the watcher when modelValue.activity changes
    },
    cancelEdit() {
      this.handleSheetClose();
    },
    saveChanges() {
      if (!this.localActivity.name.trim()) {
        alert('Activity name is required!');
        return;
      }
      // Emit the updated activity object
      this.$emit('activity-updated', this.localActivity);
      this.handleSheetClose();
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