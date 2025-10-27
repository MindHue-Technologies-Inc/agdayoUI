<template>
  <Sheet :model-value="showSheet" @update:modelValue="closeSheetViaProp">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Accommodations</span>
          <!--<Tag label="+ Add More" mode="button"/>-->
        </div>
        <button @click="closeSheetViaProp" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex flex-col gap-4 w-full">
        <AdvInput :summary="localConfig.name" label="Accommodation Name" icon="ph-article">
          <div class="flex flex-col gap-4 p-1">
            <div class="grid grid-cols-4 gap-4">
              <Input v-model="localConfig.name" id="accommodation-name" class="col-span-3" placeholder="Enter the name of Accommodation" label="Name"/>
              <Select v-model="localConfig.type" id="accommodation-type" label="Type" :options="[
                 { label: 'Hotel', value: 'Hotel' },
                 { label: 'AirBnb', value: 'AirBnb' },
                 { label: 'Transient', value: 'Transient' },
                 { label: 'Other', value: 'Other' }
               ]"
              />
            </div>

          </div>
        </AdvInput>

        <AdvInput :summary="localConfig.location" label="Location" icon="ph-map-pin">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.location" id="accommodation-location" placeholder="Enter name of location" label="Name" />

          </div>
        </AdvInput>

        <Dates :disable-button="true" v-model="localConfig.dates" :summary="formatDateRange(localConfig.dates.start, localConfig.dates.end)"/>

        <AdvInput :summary="`${localConfig.numberOfRooms} Room(s)` || 'Add details for rooms & guests'" label="Rooms & Guests" icon="ph-users">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.numberOfRooms" id="number-numbers" type="number" placeholder="Number of Rooms" label="Rooms" min="1" />

          </div>
        </AdvInput>

        <AdvInput :summary="formatCost(localConfig.totalCost)" label="Cost" icon="₱">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.totalCost" id="cost" type="number" :formatCommas="true" placeholder="Estimated total cost" label="Total Cost" prefix="₱" min="0" />

          </div>
        </AdvInput>

        <AdvInput :summary="`${localConfig.checkInTime} | ${localConfig.checkOutTime}` || 'Set check-in/out times'" label="Check-in/out Times" icon="ph-clock">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.checkInTime" id="check-in" type="time" label="Check-in Time" />
            <Input v-model="localConfig.checkOutTime" id="check-out" type="time" label="Check-out Time" />

          </div>
        </AdvInput>

        <Button @click="save">Save Accommodations</Button>

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
import Dates from "@/domains/trip-planning/components/Dates.vue";

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
    Dates
  },

  props: {
    // This prop now directly controls the Sheet's visibility
    showSheet: {
      type: Boolean,
      default: false,
    },
    // modelValue now strictly represents the accommodation data
    modelValue: {
      type: Object,
      default: () => ({
        name: '',
        type: '',
        location: '',
        numberOfRooms: null,
        totalCost: null,
        checkInTime: '',
        checkOutTime: '',
        dates: {
          start: '',
          end: '',
        }
      }),
      required: true,
    }
  },

  data() {
    return {
      // Create a local copy of modelValue to allow internal modifications
      localConfig: {...this.modelValue},
    }
  },

  // No `showSheets` computed property needed if you're controlling it via `showSheet` prop.
  // computed: {
  //   showSheets: {
  //     get() {
  //       return this.showSheet
  //     },
  //     set(value) {
  //       this.showSheet = value
  //     }
  //   }
  // },

  watch: {
    // Watch for changes in the prop and update the local copy
    'modelValue': {
      handler(newValue) {
        // Use a more robust check for deep equality if needed,
        // or simply assign if you're sure updates won't cause loops.
        // For simple objects, `JSON.stringify` works, for complex, a deep-compare utility.
        if (JSON.stringify(newValue) !== JSON.stringify(this.localConfig)) {
          this.localConfig = {...newValue};
        }
      },
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Deep watch for nested property changes
    }
  },

  methods: {
    // Helper method to format date range for summary
    formatDateRange(startDateIso, endDateIso) {
      if (!startDateIso || !endDateIso) return '';
      const start = new Date(startDateIso);
      const end = new Date(endDateIso);
      const options = { month: 'short', day: 'numeric' };
      if (start.getFullYear() !== end.getFullYear()) {
        options.year = 'numeric';
      }
      console.log(startDateIso, endDateIso)
      try {
        return `${new Intl.DateTimeFormat('en-US', options).format(start)} - ${new Intl.DateTimeFormat('en-US', options).format(end)}`;
      } catch (error) {
        console.error(error)
      }
    },

    // Helper method to format cost for summary
    formatCost(cost) {
      if (cost === null || cost === undefined || isNaN(cost)) return 'Enter estimated cost';
      return `₱${new Intl.NumberFormat('en-US').format(cost)}`;
    },

    // Emits an event to tell the parent to close the sheet
    closeSheetViaProp() {
      this.$emit('update:showSheet', false);
    },

    async save() {
      // -- Emit the localConfig (updated data) and then signal to close the sheet
      this.$emit('update:modelValue', this.localConfig); // Emit updated data
      this.$emit('update:showSheet', false); // Signal to close the sheet

      // -- GET TRIP ID FIRST
      const pathname = window.location.pathname
      const tripId = pathname.split('/')[2]

      // -- SAVE to FIRESTORE
      const response = await fetch('/api/v1/trip/accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: tripId,
          accommodationData: this.localConfig
        })
      })

      // -- PRINT RESPONSE
      console.log(await response.json())
    }
  },
}
</script>

<style scoped>
/* Your existing styles */
</style>