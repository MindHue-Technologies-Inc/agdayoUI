<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', { ...this.modelValue, showSheet: false })">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <!--HEADERS-->
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Accommodations</span>
          <Tag label="+ Add More" mode="button"/>
        </div>
        <button @click="$emit('update:modelValue', { ...this.modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <!--INPUTS-->
      <div class="flex flex-col gap-4 w-full">
        <!--ACCOMMODATION NAME-->
        <AdvInput :summary="modelValue.name" label="Accommodation Name" icon="ph-article">
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
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--LOCATION-->
        <AdvInput :summary="localConfig.location" label="Location" icon="ph-map-pin">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.location" id="accommodation-location" placeholder="Enter name of location" label="Name" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--DATES-->
        <Dates v-model="localConfig.dates" summary="Select your Dates"/>

        <!--ROOMS-->
        <AdvInput :summary="`${localConfig.numberOfRooms}` || 'Add details for rooms & guests'" label="Rooms & Guests" icon="ph-users">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.numberOfRooms" id="number-numbers" type="number" placeholder="Number of Rooms" label="Rooms" min="1" />
            <!--<Input id="adult-numbers" type="number" placeholder="Number of Adults" label="Adults" min="1" />-->
            <!--<Input id="children-numbers" type="number" placeholder="Number of Children (optional)" label="Children" min="0" />-->
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--COST-->
        <AdvInput :summary="localConfig.totalCost || 'Enter estimated cost'" label="Cost" icon="₱">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.totalCost" id="cost" type="number" :formatCommas="true" placeholder="Estimated total cost" label="Total Cost" prefix="₱" min="0" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--CHECK IN / OUT-->
        <AdvInput :summary="`${localConfig.checkInTime} | ${localConfig.checkOutTime}` || 'Set check-in/out times'" label="Check-in/out Times" icon="ph-clock">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localConfig.checkInTime" id="check-in" type="time" label="Check-in Time" />
            <Input v-model="localConfig.checkOutTime" id="check-out" type="time" label="Check-out Time" />
            <Button>Next</Button>
          </div>
        </AdvInput>

        <!--NEXT BUTTON-->
        <Button @click="save">Save Accommodations</Button>

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
      default: () => ({
        showSheet: false,
        name: '',
        type: '',

        location: '',
        numberOfRooms: 1,
        totalCost: 0,
        // currency: 'PHP', // If you plan to make currency selectable or dynamic

        checkInTime: new Date('15:00').getTime(), // Common default check-in time
        checkOutTime: '12:00', // Common default check-out time

        dates: {
          start: '', // Get it from start date of the trip
          end: '', // Get it from end date of the trip
        }
      }), // Use a factory function for object defaults
      required: true,
    }
  },

  data() {
    return {
      localConfig: {...this.modelValue}
    }
  },

  watch: {
    'modelValue': {
      handler(newValue) {
        this.localConfig = newValue
      },
      immediate: true,
      deep: true,
    }
  },

  methods: {
    save() {
      this.$emit('update:modelValue', {...this.modelValue, showSheet:false})
      this.$emit('save')
    }
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },

  }
}
</script>

<style scoped>
/* Your existing styles */
</style>