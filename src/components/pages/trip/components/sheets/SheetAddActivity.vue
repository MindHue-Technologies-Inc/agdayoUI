<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 place-content-center text-3xl text-zinc-800">
          <i class="ph ph-plus-circle"></i> <span class="font-bold">Add New Activity</span>
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
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
                    'p-2 rounded-full border-2 transition-all duration-200 aspect-square flex place-content-center',
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
        <Button class="w-full" @click="cancelActivity" variant="secondary">
          Cancel
        </Button>
        <Button class="w-full" @click="saveActivity" :disabled="!localActivity.name">
          Add Activity
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
// Removed unused components: Checkbox, Card, Dropdown
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue";

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
  },

  props: {
    // modelValue now expects an object: { showSheet: boolean, activityData: object (optional for editing) }
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }), // activity: null for new, or an object for editing
      required: true,
    }
  },

  emits: ['update:modelValue', 'activity-saved'], // Emits 'activity-saved' on successful addition/update

  data() {
    return {
      // Local state for the activity being edited/added
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
      return this.localActivity.icon ? `Icon: ${this.localActivity.icon.replace('ph-', '')}` : 'Choose an icon';
    }
  },

  watch: {
    // Watch modelValue.showSheet to reset form or load data when sheet opens/closes
    'modelValue.showSheet': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // If a specific activity is passed for editing, load it
          if (this.modelValue.activity) {
            this.localActivity = { ...this.modelValue.activity };
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
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialActivityState() {
      return {
        id: this.generateUniqueId(),
        name: '',
        time: '',
        date: '',
        location: '',
        budget: 0,
        budgetCurrency: 'PHP',
        budgetNotes: '',
        description: '',
        icon: '', // Selected icon class
      };
    },
    selectIcon(iconClass) {
      this.localActivity.icon = iconClass;
    },
    cancelActivity() {
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false });
    },
    saveActivity() {
      if (!this.localActivity.name.trim()) {
        alert('Activity name is required!'); // Basic validation
        return;
      }
      this.$emit('activity-saved', this.localActivity); // Emit the full activity object
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false }); // Close the sheet
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