<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <!--HEADERS-->
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Accommodations</span>
          <Tag label="+ Add More" mode="button"/>
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <!--INPUTS-->
      <div class="flex flex-col gap-4 w-full">
        <!--ACCOMMODATION NAME-->
        <AdvInput :summary="modelValue.name" label="Accommodation Name" icon="ph-article">
          <div class="flex flex-col gap-4 p-1">
            <div class="grid grid-cols-4 gap-4">
              <Input class="col-span-3" placeholder="Enter the name of Accommodation" label="Name"/>
              <Select id="accommodation-type" label="Type" :options="[
                 { label: 'Hotel', value: 'Hotel' },
                 { label: 'AirBnb', value: 'AirBnb' },
                 { label: 'Transient', value: 'Transient' }
               ]"
              />
            </div>
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--LOCATION-->
        <AdvInput :summary="modelValue.location" label="Location" icon="ph-map-pin">
          <div class="flex flex-col gap-4 p-1">
            <Input placeholder="Enter name of location" label="Name" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--DATES-->
        <Dates summary="Select your Dates"/>

        <!--ROOMS-->
        <AdvInput :summary="modelValue.roomsSummary || 'Add details for rooms & guests'" label="Rooms & Guests" icon="ph-users">
          <div class="flex flex-col gap-4 p-1">
            <Input type="number" placeholder="Number of Rooms" label="Rooms" min="1" />
            <Input type="number" placeholder="Number of Adults" label="Adults" min="1" />
            <Input type="number" placeholder="Number of Children (optional)" label="Children" min="0" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--COST-->
        <AdvInput :summary="modelValue.costSummary || 'Enter estimated cost'" label="Cost" icon="₱">
          <div class="flex flex-col gap-4 p-1">
            <Input type="number" placeholder="Estimated total cost" label="Total Cost" prefix="₱" min="0" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--CHECK IN / OUT-->
        <AdvInput :summary="modelValue.timesSummary || 'Set check-in/out times'" label="Check-in/out Times" icon="ph-clock">
          <div class="flex flex-col gap-4 p-1">
            <Input type="time" label="Check-in Time" />
            <Input type="time" label="Check-out Time" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--NEXT BUTTON-->
        <Button>Next</Button>

      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Checkbox from "../../../../UI/Checkbox.vue"; // Not used in this template, consider removing
import Card from "../../../../UI/Card.vue"; // Not used in this template, consider removing
import Input from "../../../../UI/Input.vue";
import Dropdown from "../../../../UI/Dropdown.vue"; // Not used in this template, consider removing
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue";
import Dates from "../../../create-trip/components/Dates.vue";

export default {
  components: {
    Sheet,
    Tag,
    Button,
    // Checkbox, // Remove if not used
    // Card,     // Remove if not used
    Input,
    // Dropdown, // Remove if not used
    Select,
    AdvInput,
    Dates
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({showSheet: false}), // Use a factory function for object defaults
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      // You'll likely want to add local state here for the new inputs
      // For example, to store the current values for rooms, cost, times
      // Example:
      // rooms: 1,
      // adults: 1,
      // children: 0,
      // totalCost: 0,
      // currency: 'PHP',
      // checkInTime: '15:00', // Default check-in time
      // checkOutTime: '11:00' // Default check-out time
    }
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // You might want to add computed properties for the AdvInput summaries:
    // roomsSummary() {
    //   if (this.rooms && this.adults) {
    //     return `${this.rooms} Room${this.rooms > 1 ? 's' : ''}, ${this.adults} Adult${this.adults > 1 ? 's' : ''}`;
    //   }
    //   return 'Add details for rooms & guests';
    // },
    // costSummary() {
    //   if (this.totalCost > 0) {
    //     return `${this.currency} ${this.totalCost.toLocaleString()}`; // Formats number
    //   }
    //   return 'Enter estimated cost';
    // },
    // timesSummary() {
    //   if (this.checkInTime && this.checkOutTime) {
    //     return `Check-in: ${this.checkInTime} / Check-out: ${this.checkOutTime}`;
    //   }
    //   return 'Set check-in/out times';
    // }
  }
}
</script>

<style scoped>
/* Your existing styles */
</style>