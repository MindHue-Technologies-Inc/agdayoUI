<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:showSheet', false)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-bus"></i> <span class="font-bold">Transportation</span>
          <Tag label="+ Add Segment" mode="button" @click="addTransportRow" />
        </div>
        <button @click="$emit('update:showSheet', false)" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <AdvInput
            v-for="(transport, index) in localTransports"
            :key="transport.id"
            :summary="getTransportSummary(transport)"
            :label="`Segment ${index + 1}`"
            :icon="getTransportIcon(transport.mode)"
            @remove="removeTransportRow(transport.id)"
            removable
        >
          <div class="flex flex-col gap-4 p-1">
            <Select
                v-model="transport.mode"
                :id="`transport-mode-${transport.id}`"
                label="Mode of Transport"
                placeholder="Enter/Select Mode"
                :options="[
                { label: 'Flight', value: 'Flight' },
                { label: 'Bus', value: 'Bus' },
                { label: 'Train', value: 'Train' },
                { label: 'Car', value: 'Car' },
                { label: 'Ferry', value: 'Ferry' },
                { label: 'Taxi/Ride-share', value: 'Taxi/Ride-share' },
                { label: 'Other', value: 'Other' }
              ]"
            />

            <Input :id="index + 'location-departure'" v-model="transport.departureLocation" placeholder="e.g., NAIA Terminal 3" label="Departure Location" />
            <div class="grid grid-cols-2 gap-4">
              <Input :id="index + 'date-departure'" v-model="transport.departureDate" type="date" label="Departure Date" />
              <Input :id="index + 'time-departure'" v-model="transport.departureTime" type="time" label="Departure Time" />
            </div>

            <Input :id="index + 'location-arrival'" v-model="transport.arrivalLocation" placeholder="e.g., Baguio City Terminal" label="Arrival Location" />
            <div class="grid grid-cols-2 gap-4">
              <Input :id="index + 'date-arrival'" v-model="transport.arrivalDate" type="date" label="Arrival Date (Optional)" />
              <Input :id="index + 'time-arrival'" v-model="transport.arrivalTime" type="time" label="Arrival Time (Optional)" />
            </div>

            <Input :id="index + 'booking-reference'" v-model="transport.bookingRef" placeholder="e.g., ABC123DEF" label="Booking Reference (Optional)" />
            <Input :id="index + 'seat-number'" v-model="transport.seatNumber" placeholder="e.g., 12A" label="Seat/Vehicle Number (Optional)" />

            <div class="grid grid-cols-2 gap-4">
              <Input :id="index + 'cost'" v-model.number="transport.cost" type="number" placeholder="Cost" label="Cost" prefix="₱" min="0" />
              <Select
                  v-model="transport.currency"
                  :id="`transport-currency-${transport.id}`"
                  label="Currency"
                  :options="[
                  { label: 'PHP', value: 'PHP' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' }
                ]"
              />
            </div>

            <Input :id="index + 'notes'" v-model="transport.notes" placeholder="Any specific notes for this segment..." label="Notes (Optional)" />

            <div class="flex justify-end mt-2">
              <Button v-if="localTransports.length > 1" @click="removeTransportRow(transport.id)" variant="ghost">
                Delete Segment
              </Button>
            </div>
          </div>
        </AdvInput>

        <div v-if="localTransports.length === 0" class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg">
          <i class="ph ph-train-simple text-4xl mb-2"></i>
          <p class="text-center">No transportation segments added yet. Click '+ Add Segment' to plan your journey!</p>
          <Button class="mt-4" @click="addTransportRow">Add First Segment</Button>
        </div>
      </div>

      <div class="w-full mt-6">
        <Button class="w-full" @click="saveTransports">Save Transportation</Button>
      </div>

    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue"; // Ensure AdvInput has removable prop and emits 'remove'

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
    // modelValue is expected to be an object controlling sheet visibility
    // and containing an array of transportation segments.
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, transports: [] }), // Default with an empty transports array
      required: true,
    },

    showSheet: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'update:showSheet'],

  data() {
    return {
      // Create a local copy of transportation segments to allow direct manipulation
      localTransports: [],
      // Map modes to specific Phosphor Icons for AdvInput
      modeIcons: {
        'Flight': 'ph-airplane',
        'Bus': 'ph-bus',
        'Train': 'ph-train-simple',
        'Car': 'ph-car',
        'Ferry': 'ph-boat',
        'Taxi/Ride-share': 'ph-taxi',
        'Other': 'ph-question',
      }
    };
  },

  watch: {
    // Watch the prop and initialize localTransports when it changes
    // This handles initial load and external updates to modelValue.transports
    'modelValue.transports': {
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Watch nested properties of modelValue.transports
      handler(newTransports) {
        // Deep copy to avoid mutating the prop directly
        this.localTransports = newTransports ? newTransports.map(t => ({ ...t })) : [];
        // Add a default row if no transports exist and sheet is being opened
        if (this.showSheet && this.localTransports.length === 0) {
          this.addTransportRow();
        }
      }
    },
    // Watch showSheet to add a new transport row if the sheet is opened and there are no transports
    showSheet(newVal) {
      if (newVal && this.localTransports.length === 0) {
        this.addTransportRow();
      }
    }
  },

  methods: {
    // Helper to get locale for currency formatting (adjust if needed)
    getLocale() {
      return navigator.language || 'en-US';
    },
    // Generates a unique ID for new transport segments
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    // Adds a new blank transport segment object to the localTransports array
    addTransportRow() {
      this.localTransports.push({
        id: this.generateUniqueId(),
        mode: '', // Default mode
        departureLocation: '',
        departureDate: '',
        departureTime: '',
        arrivalLocation: '',
        arrivalDate: '',
        arrivalTime: '',
        bookingRef: '',
        seatNumber: '',
        cost: 0,
        currency: 'PHP', // Default currency
        notes: '',
      });
    },
    // Removes a transport segment from the localTransports array by ID
    removeTransportRow(id) {
      this.localTransports = this.localTransports.filter(transport => transport.id !== id);
      // Optional: if all removed, add a new blank row for convenience
      if (this.localTransports.length === 0) {
        this.addTransportRow();
      }
    },
    // Creates a summary string for the AdvInput component header
    getTransportSummary(transport) {
      const parts = [];
      if (transport.mode) {
        parts.push(transport.mode);
      }
      if (transport.departureLocation) {
        parts.push(`from ${transport.departureLocation}`);
      }
      if (transport.arrivalLocation) {
        parts.push(`to ${transport.arrivalLocation}`);
      }
      if (transport.departureDate) {
        parts.push(`on ${transport.departureDate}`);
      }
      if (transport.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: transport.currency,
          minimumFractionDigits: 0, // No decimals for summary
          maximumFractionDigits: 0,
        });
        parts.push(`(${formatter.format(transport.cost)})`);
      }

      return parts.length > 0 ? parts.join(' ') : 'New Transportation Segment';
    },
    // Gets the appropriate icon based on the transport mode
    getTransportIcon(mode) {
      return this.modeIcons[mode] || 'ph-question';
    },
    // Emits the updated transportation data back to the parent
    saveTransports() {
      // Filter out any completely empty transport rows before emitting
      const savedTransports = this.localTransports.filter(t =>
          t.mode || t.departureLocation.trim() !== '' || t.arrivalLocation.trim() !== '' || t.cost > 0
      );

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet)
        transports: savedTransports, // Update the transports array
        showSheet: false, // Close the sheet
      });
    }
  },
  mounted() {
    // Initialize with one segment if none exist on mount and sheet is visible
    if (this.showSheet && this.localTransports.length === 0) {
      this.addTransportRow();
    }
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