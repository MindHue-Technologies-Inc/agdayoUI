<template>
  <Sheet :model-value="showSheet" @update:modelValue="closeSheet">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-4 py-6">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-gear-six"></i> <span class="font-bold">Trip Settings</span>
        </div>
        <button @click="closeSheet" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex flex-col gap-6 w-full overflow-y-auto pr-2">
        <AdvInput
            label="Trip Name"
            icon="ph-paper-plane-tilt"
        >
          <div class="p-1">
            <InputTitle
                v-model="internalTrip.name"
                placeholder="e.g., Island Hopping Palawan"
                id="name"
                class="w-full text-2xl font-bold text-zinc-800"
            />
            <span class="text-sm text-zinc-500 mt-2 block">
              You can add preparations, activities, and routes after creating the trip.
            </span>
          </div>
        </AdvInput>

        <Destination v-model="internalTrip.location" :summary="internalTrip.location"/>
        <Dates v-model="internalTrip.date"/>

        <div>
          <label class="ml-6 text-sm font-medium text-zinc-900 mb-2 block">Color Theme</label>
          <div class="flex flex-wrap gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <button
                class="w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"
                :class="{
                'bg-peach-500 border-peach-600 ring-peach-300': internalTrip.theme === 'peach',
                'bg-peach-300 border-transparent ring-zinc-300': internalTrip.theme !== 'peach'
              }"
                @click="internalTrip.theme = 'peach'"
                title="Peach Theme"
            ></button>
            <button
                class="w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"
                :class="{
                'bg-blue-500 border-blue-600 ring-blue-300': internalTrip.theme === 'blue',
                'bg-blue-300 border-transparent ring-zinc-300': internalTrip.theme !== 'blue'
              }"
                @click="internalTrip.theme = 'blue'"
                title="Blue Theme"
            ></button>
            <button
                class="w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"
                :class="{
                'bg-emerald-500 border-emerald-600 ring-emerald-300': internalTrip.theme === 'emerald',
                'bg-emerald-300 border-transparent ring-zinc-300': internalTrip.theme !== 'emerald'
              }"
                @click="internalTrip.theme = 'emerald'"
                title="Emerald Theme"
            ></button>
            <button
                class="w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"
                :class="{
                'bg-amber-500 border-amber-600 ring-amber-300': internalTrip.theme === 'amber',
                'bg-amber-300 border-transparent ring-zinc-300': internalTrip.theme !== 'amber'
              }"
                @click="internalTrip.theme = 'amber'"
                title="Amber Theme"
            ></button>
          </div>
        </div>

      </div>

      <div class="flex items-start justify-between w-full pt-6 flex-col lg:flex-row gap-5">
        <Button variant="ghost" @click="$emit('delete')">Delete</Button>
        <div class="flex gap-3 w-full lg:w-fit">
          <Button class="w-full lg:w-fit" variant="secondary" @click="closeSheet">Cancel</Button>
          <Button class="w-full lg:w-fit" variant="primary" @click="saveSettings">Save Changes</Button>
        </div>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "@/shared/components/UI/Sheet.vue";
import AdvInput from "@/shared/components/UI/AdvInput.vue"; // Changed import to AdvInput
import Button from "@/shared/components/UI/Button.vue";
import InputTitle from "@/shared/components/UI/InputTitle.vue";
import Dates from "@/trip-planning/components/Dates.vue";
import Destination from "@/trip-planning/components/Destination.vue";

export default {
  name: 'TripSettingsSheet',
  components: {
    Destination,
    Dates,
    InputTitle,
    Sheet,
    AdvInput, // Changed component registration to AdvInput
    Button,
  },
  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        trip: {
          name: '',
          date: {},
          location: '',
          theme: 'peach',
        }
      }),
      required: true,
    }
  },

  data() {
    return {
      internalTrip: { ...this.modelValue.trip },
    };
  },
  watch: {
    'modelValue.trip': {
      handler(newTrip) {
        this.internalTrip = { ...newTrip };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closeSheet() {
      this.$emit('update:showSheet', false);
    },
    saveSettings() {
      this.$emit('save', this.internalTrip);
      this.closeSheet();
    },
  }
}
</script>

<style scoped>
.outfit {
  font-family: 'Outfit', sans-serif;
}
/* You may need to define your color palette in Tailwind config or global CSS if not already present */
</style>