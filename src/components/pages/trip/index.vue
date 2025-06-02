<template>
  <div class="grow mt-8 md:mt-16">
    <Card customClass="max-w-4xl mx-auto p-0! overflow-hidden rounded-4xl border-primary-light-sm shadow-primary-light-md bg-white">
      <div class="flex flex-col gap-3 bg-peach-50 p-4 md:p-6 sm:p-8">
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row gap-2 items-center">
            <Tag label="Upcoming" class="bg-white border-primary-light-xs"/>
            <Tag label="View on Map" variant="green" mode="button" icon="ph-map-trifold" />
          </div>

          <button class="text-2xl text-zinc-600 cursor-pointer transition hover:text-peach-500 active:text-peach-600 focus:outline-none focus:ring-2 focus:ring-peach-300 rounded-full p-1 -mr-1">
            <i class="ph ph-gear-six"></i>
          </button>
        </div>

        <div>
          <h2 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">Summer in Baguio City</h2>
        </div>

        <div class="mt-2">
          <span class="text-zinc-600 font-semibold">Planning Progress:</span>
          <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">
            <div class="bg-peach-500 h-2 rounded-full" :style="{ width: `${(planningProgress.completed / planningProgress.total) * 100}%` }"></div>
          </div>
          <span class="text-sm text-zinc-500 mt-1 block">{{ planningProgress.completed }}/{{ planningProgress.total }} Sections Complete</span>
        </div>

        <div class="flex flex-row items-center gap-6 text-zinc-600 font-medium mt-2">
          <div class="flex gap-2 items-center">
            <i class="ph ph-calendar-dots text-peach-500 text-xl"></i>
            <span>May 14 - 16, 2025</span>
          </div>

          <div class="flex gap-2 items-center">
            <i class="ph ph-map-pin text-peach-500 text-xl"></i>
            <span>Baguio City</span>
          </div>
        </div>

      </div>

      <div class="flex flex-row gap-4 py-4 sm:py-6 px-4 md:px-6 overflow-x-auto custom-scrollbar bg-zinc-50 border-t border-b border-zinc-100">
        <AdvSquareCard
            iconName="ph-suitcase"
            cardName="Preparations"
            tagName="3 Pending"
            tagVariant="blue"
            @card-click="preparation.showSheet = true" />
        <AdvSquareCard
            iconName="ph-bed"
            cardName="Accommodations"
            tagName="2 Booked"
            tagVariant="orange"
            @card-click="accommodation.showSheet = true"
        />
        <AdvSquareCard
            iconName="ph-users"
            cardName="Companions"
            tagName="4 Travelers"
            tagVariant="purple"
            @card-click="companions.showSheet = true"
        />
        <AdvSquareCard
            iconName="ph-wallet"
            cardName="Budget"
            tagName="$X Remaining"
            tagVariant="red"
            @card-click="budget.showSheet = true"
        />
        <AdvSquareCard
            iconName="ph-bus"
            cardName="Transportation"
            tagName="3 Pending"
            tagVariant="blue"
            @card-click="transportation.showSheet = true"
        />
        <AdvSquareCard
            iconName="ph-hand-palm"
            cardName="Roles"
            tagName="4 Roles"
            tagVariant="primary"
            @card-click="roles.showSheet = true"
        />
      </div>

      <div class="flex flex-col gap-8 p-4 md:p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-3xl sm:text-4xl text-zinc-800 outfit">Day Plan</h3>
          <Button @click="addActivity.showSheet = true">+ Add Activity</Button>
        </div>

        <div>
          <div class="flex items-center justify-between mb-4">
            <button
                @click="dayNote.showSheet = true"
                class="flex items-center gap-2 text-left p-2 -ml-2 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-peach-500"
            >
              <span class="font-semibold text-2xl text-zinc-800">Day 1 - May 14, 2025</span>
            </button>
            <Tag @click="dayNote.showSheet = true" label="+ Add Note" mode="button"/>
          </div>

          <div class="flex flex-col gap-4">
            <div class="relative flex items-center justify-center my-3">
              <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
              <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">Morning</span>
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="9:00 AM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-bus"
                  title="Arrival At Bus Terminal"
                  location="Victory Liner Terminal, Baguio City"
                  :cost="540.00"
                  costNote="/ Person Ticket"
              />
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="9:30 AM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-coffee"
                  title="Breakfast at Oh My Gulay!"
                  location="Session Road, Baguio City"
                  :cost="300.00"
                  costNote="/ Person (Est.)"
              />
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="10:45 AM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-tree"
                  title="Explore Burnham Park"
                  location="G. Perfecto St, Baguio City"
                  :cost="100.00"
                  costNote="(Boat Rental Est.)"
              />
            </div>

            <div class="relative flex items-center justify-center my-3">
              <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
              <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">Noon</span>
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="12:30 PM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-bowl-food"
                  title="Lunch at Good Taste Cafe & Restaurant"
                  location="Otek St, Baguio City"
                  :cost="250.00"
                  costNote="/ Person (Est.)"
              />
            </div>

            <div class="relative flex items-center justify-center my-3">
              <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
              <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">Afternoon</span>
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="2:00 PM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-palette"
                  title="Visit BenCab Museum"
                  location="Km 6 Asin Rd, Tuba, Benguet"
                  :cost="150.00"
                  costNote="/ Person (Entrance Fee)"
              />
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="4:30 PM" :isLast="false" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-bed"
                  title="Hotel Check-in & Rest"
                  location="The Manor at Camp John Hay, Baguio City"
                  cost="Included"
                  costNote="in Accommodation"
              />
            </div>

            <div class="relative flex items-center justify-center my-3">
              <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
              <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">Evening</span>
            </div>

            <div class="flex flex-row gap-2 md:gap-4">
              <TimelineDot time="7:00 PM" :isLast="true" />
              <CardActivity
                  @click="selectedActivity.showSheet = true"
                  iconName="ph-pizza"
                  title="Dinner at Cafe by the Ruins"
                  location="Shuntug Rd, Baguio City"
                  :cost="400.00"
                  costNote="/ Person (Est.)"
              />
            </div>
          </div>
        </div>
        <div class="w-full text-center mt-4">
          <Button @click="addActivity.showSheet = true" variant="secondary" class="border border-zinc-200 hover:border-peach-400 w-full">
            <i class="ph ph-plus text-lg mr-1"></i> Add Activity
          </Button>
        </div>
      </div>
    </Card>
  </div>


  <SheetPreparation v-model="preparation"/>
  <SheetAccom v-model="accommodation" />
  <SheetCompanions v-model="companions"/>
  <SheetBudget v-model="budget"/>
  <SheetTransportation v-model="transportation"/>
  <SheetRoles v-model="roles"/>
  <SheetAddActivity v-model="addActivity"/>
  <SheetEditActivity v-model="editActivity"/>
  <SheetViewActivity v-model="selectedActivity" @edit-activity="editActivity.showSheet = true"/>
  <SheetDayNote v-model="dayNote"/>

</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"
import Sheet from "../../UI/Sheet.vue"; // Only if directly used, otherwise just for component registration
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue"
import Anchor from "../../UI/Anchor.vue"; // Only if directly used
import Button from "../../UI/Button.vue";


// Sheets
import SheetPreparation from "./components/sheets/SheetPreparation.vue";
import SheetAddActivity from "./components/sheets/SheetAddActivity.vue";
import SheetEditActivity from "./components/sheets/SheetEditActivity.vue";
import SheetViewActivity from "./components/sheets/SheetViewActivity.vue";
import SheetAccom from "./components/sheets/SheetAccom.vue";
import SheetCompanions from "./components/sheets/SheetCompanions.vue";
import SheetBudget from "./components/sheets/SheetBudget.vue";
import SheetTransportation from "./components/sheets/SheetTransportation.vue";
import SheetRoles from "./components/sheets/SheetRoles.vue";
import SheetDayNote from "./components/sheets/SheetDayNote.vue";
import CardActivity from "./components/timeline/CardActivity.vue";
import TimelineDot from "./components/timeline/TimelineDot.vue";

export default {
  components: {
    AdvSquareCard,
    // Sheet, // Removed if not directly used in this template
    Card,
    Tag,
    // Anchor, // Removed if not directly used in this template
    Button,
    SheetPreparation,
    SheetAddActivity,
    SheetEditActivity,
    SheetViewActivity,
    SheetAccom,
    // Ensure all sheets are registered
    SheetCompanions,
    SheetBudget,
    SheetTransportation,
    SheetRoles,
    SheetDayNote,
    CardActivity,
    TimelineDot,
  },

  directives: {
    // Only include if you're actually using v-auto-animate in this template
    // autoAnimate: vAutoAnimate
  },

  data() {
    return {
      preparation: {
        showSheet: false,
      },
      accommodation: {
        showSheet: false,
        name: "Hotel Veniz", // Example initial data
      },
      companions: {
        showSheet: false,
      },
      budget: {
        showSheet: false,
      },
      transportation: {
        showSheet: false,
      },
      roles: {
        showSheet: false,
      },
      dayNote: {
        showSheet: false,
      },
      addActivity: {
        showSheet: false,
      },
      editActivity: {
        showSheet: false,
      },
      selectedActivity: {
        showSheet: false,
        activity: {
          id: 'act_foodie_002',
          name: 'Strawberry Picking at La Trinidad Farm',
          time: '08:30',
          date: '2025-06-16',
          location: 'Strawberry Farm, La Trinidad, Benguet',
          budget: 350.00,
          budgetCurrency: 'PHP',
          budgetNotes: 'Per basket (est.), transportation not included',
          description: 'Head early to the famous Strawberry Farm in La Trinidad, just outside Baguio, to pick fresh strawberries. Enjoy the cool morning air and local produce.',
          icon: 'ph-apple-bin',
        }
      },
      // You likely don't need these two if you're using specific sheet data objects
      // showSheet: false,
      // showAddActivitySheet: false,

      // Data for the progress bar
      planningProgress: {
        completed: 4, // Example: based on 4/7 sections complete
        total: 7,
      },

      // These seem to be preparation checklist data, not directly related to sheets' showSheet state
      activeTab: 'all', // For filtering tasks in the sheet
      newTask: '',
      preparationsChecklist: [
        { id: 1, task: 'Renew Passport', category: 'documents', completed: false, notes: 'Expires Aug 2025' },
        { id: 2, task: 'Book Accommodation', category: 'essentials', completed: true, notes: 'The Manor' },
        { id: 3, task: 'Buy Travel Insurance', category: 'documents', completed: false },
        { id: 4, task: 'Pack Clothes for Cold Weather', category: 'packing', completed: false },
        { id: 5, task: 'Prepare Itinerary for Day 1', category: 'essentials', completed: false },
        { id: 6, task: 'Charge all devices', category: 'packing', completed: true },
        { id: 7, task: 'Download offline maps', category: 'essentials', completed: false },
      ],
    }
  },
  computed: {
    filteredChecklist() {
      if (this.activeTab === 'all') {
        return this.preparationsChecklist;
      }
      return this.preparationsChecklist.filter(item => item.category === this.activeTab);
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') return;
      this.preparationsChecklist.push({
        id: Date.now(), // Simple unique ID
        task: this.newTask.trim(),
        category: 'essentials', // Default category for new tasks
        completed: false,
        notes: '',
      });
      this.newTask = '';
    }
  }
}
</script>

<style scoped>
/*
 * Styles for the height-fade transition
 */
.height-fade-enter-active,
.height-fade-leave-active {
  transition: opacity 0.2s ease, max-height 0.4s ease;
}

.height-fade-enter-from,
.height-fade-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.height-fade-enter-to,
.height-fade-leave-from {
  opacity: 1;
  max-height: 450px;
}

/* Custom scrollbar for horizontal actions */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px; /* Adjust thickness */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0; /* Light gray track */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc; /* Darker gray thumb */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999; /* Even darker on hover */
}
</style>