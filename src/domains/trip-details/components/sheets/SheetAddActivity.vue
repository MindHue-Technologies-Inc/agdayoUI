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
            id="addActivityName"
            v-model="localActivity.title"
            placeholder="e.g., Explore Mines View Park"
            label="Activity Name (Required)"
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
                label="Date (Required)"
                :options="days"
                :placeholder="isEditing ? (localActivity.date ? new Intl.DateTimeFormat(getLocale(), { month: 'short', day: 'numeric' }).format(new Date(localActivity.date + 'T00:00:000')) : 'Select Date') : 'Select Date'"
                icon="ph-calendar"
            />
            <Input
                id="addActivityTime"
                v-model="localActivity.time"
                type="time"
                label="Time (Required)"
                icon="ph-clock"
            />
          </div>
        </div>

        <div class="relative">
          <Input
              id="addActivityLocation"
              v-model="localActivity.location"
              placeholder="e.g., Mines View Park, Baguio City"
              label="Location"
              icon="ph-map-pin"
              @input="searchLocations"
          />

          <ul
              v-if="suggestions.length > 0"
              class="absolute z-30 bg-white border border-zinc-200 rounded-md shadow-md w-full mt-1 max-h-48 overflow-y-auto"
          >
            <li
                v-for="(item, idx) in suggestions"
                :key="idx"
                @click="selectSuggestion(item)"
                class="px-3 py-2 hover:bg-zinc-100 cursor-pointer text-sm"
            >
              {{ item.display_name }}
            </li>
          </ul>
        </div>

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
              label="Budget Notes"
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
          <div class="flex flex-wrap justify-center gap-3 p-1">
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
        <Button class="w-full" @click="saveActivity" :disabled="!localActivity.title && !localActivity.date && !localActivity.time">
          {{ isEditing ? 'Save Changes' : 'Add Activity' }}
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "@/shared/components/UI/Sheet.vue";
import Tag from "@/shared/components/UI/Tag.vue";
import Button from "@/shared/components/UI/Button.vue";
import Input from "@/shared/components/UI/Input.vue";
import Select from "@/shared/components/UI/Select.vue";
import AdvInput from "@/shared/components/UI/AdvInput.vue";
import currencyData from "@/shared/json/currencies.json";
import Select2 from "@/shared/components/UI/SelectSimple.vue";

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
    showSheet: { type: Boolean, default: false },
    dateRange: { type: Object, required: true },
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true,
    },
  },

  data() {
    return {
      error: "",
      suggestions: [],
      searchTimeout: null,
      autocompleteService: null,
      placesService: null,
      currencies: currencyData,
      localActivity: this.getInitialActivityState(),
      activityIcons: [
        "ph-bus", "ph-coffee", "ph-tree", "ph-bowl-food", "ph-palette", "ph-bed",
        "ph-pizza", "ph-airplane", "ph-car", "ph-train", "ph-bicycle", "ph-camera",
        "ph-map-pin", "ph-shopping-bag", "ph-storefront", "ph-swimming-pool",
        "ph-mountains", "ph-tent", "ph-binoculars", "ph-campfire", "ph-first-aid",
        "ph-currency-circle-dollar", "ph-calendar", "ph-sparkle", "ph-sun", "ph-moon",
        "ph-globe-hemisphere-east", "ph-gift", "ph-ticket", "ph-book-open",
        "ph-microphone-stage", "ph-park", "ph-compass", "ph-cloud-sun",
        "ph-cloud-rain", "ph-wifi-high", "ph-device-mobile", "ph-user-list",
        "ph-cookie", "ph-question",
      ],
    };
  },

  mounted() {
    this.loadGoogleMapsScript();
  },

  computed: {
    isEditing() {
      return this.modelValue.activity && this.modelValue.activity.id;
    },
    localActivityFormat() {
      return {
        ...this.localActivity,
        datetime: `${this.localActivity.date}T${this.localActivity.time}:00`,
      };
    },
    days() {
      const dates = [];
      const startDate = new Date(this.dateRange.start);
      const endDate = new Date(this.dateRange.end);
      const locale = this.getLocale();
      let currentDate = new Date(this.dateRange.start);
      let dayCounter = 1;

      while (currentDate <= endDate) {
        const isoDate = currentDate.toISOString().split("T")[0];
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(currentDate);
        dates.push({ value: isoDate, label: `Day ${dayCounter} (${formattedDate})` });
        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
      }

      return dates;
    },
  },

  watch: {
    "modelValue.showSheet": {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.localActivity = this.modelValue.activity
              ? JSON.parse(JSON.stringify(this.modelValue.activity))
              : this.getInitialActivityState();
        }
      },
    },
  },

  methods: {
    getLocale() {
      return navigator.language || "en-US";
    },

    getInitialActivityState() {
      return {
        name: "",
        time: "",
        date: "",
        location: "",
        cost: 0,
        costCurrency: "PHP",
        costNote: "",
        description: "",
        iconName: "",
      };
    },

    selectIcon(iconClass) {
      this.localActivity.iconName = iconClass;
    },

    handleSheetClose() {
      this.$emit("update:showSheet", false);
      this.localActivity = this.getInitialActivityState();
    },

    cancelActivity() {
      this.handleSheetClose();
    },

    saveActivity() {
      if (!this.localActivity.title?.trim()) {
        this.error = "Activity name is required!";
        return;
      }
      if (!this.localActivity.time || !this.localActivity.date) {
        this.error = "Please select date and time";
        return;
      }
      this.$emit("activity-saved", this.localActivityFormat);
      this.handleSheetClose();
    },

    /** ------------------------------
     * GOOGLE MAPS AUTOCOMPLETE
     * ------------------------------ */
    loadGoogleMapsScript() {
      const GOOGLE_MAPS_API = import.meta.env.PUBLIC_MAP_API_KEY;

      // If already loaded, initialize immediately
      if (window.google && window.google.maps) {
        this.initGoogleServices();
        return;
      }

      // Prevent duplicate script loading
      const existingScript = document.querySelector("#google-maps-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => this.initGoogleServices());
        return;
      }

      // Inject Google Maps script
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initGoogleServices();
      document.head.appendChild(script);
    },

    initGoogleServices() {
      try {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(document.createElement("div"));
      } catch (err) {
        console.error("Failed to initialize Google Maps services:", err);
      }
    },

    async searchLocations(e) {
      const query = e.target.value.trim();
      clearTimeout(this.searchTimeout);

      if (!query || !this.placesService) {
        this.suggestions = [];
        return;
      }

      // debounce to avoid API spam
      this.searchTimeout = setTimeout(() => {
        this.placesService.textSearch(
            {
              query,
              region: "ph", // optional: restrict to PH results
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
                this.suggestions = results.map((r) => ({
                  place_id: r.place_id,
                  display_name: `${r.name}${r.formatted_address ? `, ${r.formatted_address}` : ""}`,
                  location: r.geometry?.location || null,
                }));
              } else {
                this.suggestions = [];
              }
            }
        );
      }, 300);
    },

    selectSuggestion(item) {
      this.localActivity.location = item.display_name;

      if (item.location) {
        this.localActivity.coordinates = {
          latitude: item.location.lat(),
          longitude: item.location.lng(),
        };
      }

      this.suggestions = [];
    },
  }
};
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