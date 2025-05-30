<template>
  <div class=" grow mt-16">
<!--    CARD BODY-->
    <Card customClass="p-0! overflow-hidden rounded-4xl border-primary-light-sm shadow-primary-light-lg">
      <!-- OVERVIEW -->
      <div class="flex flex-col gap-2 bg-peach-50 p-6">
        <!-- TOP PART -->
        <div class="flex flex-row items-center justify-between">
          <!-- TAG -->
          <div class="flex flex-row gap-2 items-center justify-center">
            <Tag label="Upcoming" class="bg-white"/>
            <Tag label="View on Map" variant="green" mode="button" />
          </div>

          <!-- SETTINGS -->
          <span class="text-2xl text-zinc-600 cursor-pointer transition hover:text-zinc-400 active:text-zinc-300"><i class="ph ph-gear-six"></i></span>
        </div>

        <!-- TITLE -->
        <div>
          <span class="font-medium text-[2rem]">Summer in Baguio City</span>
        </div>

        <!-- PROGRESS -->
        <div>
          <span class="text-zinc-500">Planning Progress: 4/7 Sections Complete</span>
        </div>

        <!-- DATE AND LOCATION -->
        <div class="flex flex-row items-center gap-4 text-zinc-500">
          <div class="flex gap-1 items-center">
            <i class="ph ph-calendar-dots"></i>
            <span>May 14 - 16, 2025</span>
          </div>

          <div class="flex gap-1 items-center">
            <i class="ph ph-map-pin"></i>
            <span>Baguio City</span>
          </div>
        </div>

      </div>

      <!-- ACTIONS -->
      <div class="flex flex-row grow gap-4 py-2 w-auto px-6 overflow-y-auto">
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

      <!-- DAY PLANS -->
      <div class="flex flex-col gap-6 p-6">
        <!-- TITLE AND ADD ACTIVITY -->
        <div class="flex items-center justify-between">
          <span class="font-medium text-3xl">Day Plan</span>
          <Button @click="addActivity.showSheet = true">+ Add Activity</Button>
        </div>

        <!-- A DAY PLAN -->
        <div>
          <!-- TITLE -->
          <div class="flex items-center justify-between">
            <span class="font-semibold text-2xl cursor-pointer" @click="dayNote.showSheet = true">Day 1 - May 14, 2025</span>
            <Tag @click="dayNote.showSheet = true" label="+ Add Note" mode="button"/>
          </div>

          <!-- TIMELINE -->
          <div class="flex flex-col gap-4">
            <div class="w-full text-center text-zinc-400 text-sm">Morning</div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">9:00 AM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-bus text-peach-500 text-xl flex-shrink-0"></i> Arrival At Bus Terminal
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>Victory Liner Terminal, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 540.00</span>
                  <span class="text-zinc-400">/ Person Ticket</span>
                </div>
              </Card>
            </div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">9:30 AM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-coffee text-peach-500 text-xl flex-shrink-0"></i> Breakfast at Oh My Gulay!
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>Session Road, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 300.00</span>
                  <span class="text-zinc-400">/ Person (Est.)</span>
                </div>
              </Card>
            </div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">10:45 AM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-tree text-peach-500 text-xl flex-shrink-0"></i> Explore Burnham Park
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>G. Perfecto St, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 100.00</span>
                  <span class="text-zinc-400"> (Boat Rental Est.)</span>
                </div>
              </Card>
            </div>

            <div class="w-full text-center text-zinc-400 text-sm">Noon</div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">12:30 PM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-bowl-food text-peach-500 text-xl flex-shrink-0"></i> Lunch at Good Taste Cafe & Restaurant
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>Otek St, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 250.00</span>
                  <span class="text-zinc-400"> / Person (Est.)</span>
                </div>
              </Card>
            </div>

            <div class="w-full text-center text-zinc-400 text-sm">Afternoon</div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">2:00 PM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-palette text-peach-500 text-xl flex-shrink-0"></i> Visit BenCab Museum
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>Km 6 Asin Rd, Tuba, Benguet</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 150.00</span>
                  <span class="text-zinc-400"> / Person (Entrance Fee)</span>
                </div>
              </Card>
            </div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">4:30 PM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="grow border-l-2 border-zinc-300 -mt-1 w-0.5"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-bed text-peach-500 text-xl flex-shrink-0"></i> Hotel Check-in & Rest
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>The Manor at Camp John Hay, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">Included</span>
                  <span class="text-zinc-400"> in Accommodation</span>
                </div>
              </Card>
            </div>

            <div class="w-full text-center text-zinc-400 text-sm">Evening</div>

            <div class="flex flex-row gap-4">
              <div class="flex flex-col items-center justify-start gap-2">
                <span class="font-medium text-zinc-700 whitespace-nowrap">7:00 PM</span>
                <div class="w-3 h-3 bg-peach-500 rounded-full flex-shrink-0 relative z-[1]"></div>
                <div class="border-l-2 border-zinc-300 -mt-1 w-0.5" style="height: 24px;"></div>
              </div>

              <Card class="p-4 gap-2 grow overflow-hidden rounded-2xl border border-primary-light-xs shadow-primary-light-sm
     transition-all duration-200 hover:shadow-lg hover:border-peach-400 cursor-pointer">
                <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
                  <i class="ph ph-pizza text-peach-500 text-xl flex-shrink-0"></i> Dinner at Cafe by the Ruins
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
                  <span>Shuntug Rd, Baguio City</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
                  <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
                  <span class="font-semibold text-zinc-600">P 400.00</span>
                  <span class="text-zinc-400"> / Person (Est.)</span>
                </div>
              </Card>
            </div>
          </div>

        </div>
        <div class="w-full text-center">
          <Tag @click="addActivity.showSheet = true" label="+ Add Activity" mode="button"/>
        </div>
      </div>

    </Card>
  </div>


  <!--    SHEETS-->

  <!--PREPARATIONS-->
  <SheetPreparation v-model="preparation"/>

  <!--ACCOMMODATIONS-->
  <SheetAccom v-model="accommodation" />

  <!--COMPANIONS-->
  <SheetCompanions v-model="companions"/>

  <!--BUDGET-->
  <SheetBudget v-model="budget"/>

  <!--TRANSPORTATION-->
  <SheetTransportation v-model="transportation"/>

  <!--ROLES-->
  <SheetRoles v-model="roles"/>

  <!-- ADD ACTIVITY SHEET -->
  <SheetAddActivity v-model="addActivity"/>

  <!--DAY NOTE-->
  <SheetDayNote v-model="dayNote"/>

</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"
import Sheet from "../../UI/Sheet.vue";
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue"
import Anchor from "../../UI/Anchor.vue";
import Button from "../../UI/Button.vue";
import { vAutoAnimate } from '@formkit/auto-animate'
import SheetPreparation from "./components/sheets/SheetPreparation.vue";
import SheetAddActivity from "./components/sheets/SheetAddActivity.vue";
import SheetAccom from "./components/sheets/SheetAccom.vue";
import SheetCompanions from "./components/sheets/SheetCompanions.vue";
import SheetBudget from "./components/sheets/SheetBudget.vue";
import SheetTransportation from "./components/sheets/SheetTransportation.vue";
import SheetRoles from "./components/sheets/SheetRoles.vue";
import SheetDayNote from "./components/sheets/SheetDayNote.vue";

export default {
  components: {
    AdvSquareCard,
    Sheet,
    Card,
    Tag,
    Anchor,
    Button,
    SheetPreparation,
    SheetAddActivity,
    SheetAccom,
    SheetCompanions,
    SheetBudget,
    SheetTransportation,
    SheetRoles,
    SheetDayNote,
  },

  directives: {
    autoAnimate: vAutoAnimate // The key is the directive name (camelCase), the value is the imported directive
  },

  data() {
    return {
      preparation: {
        showSheet: false,
      },
      accommodation: {
        showSheet: false,
        name: "Hotel Veniz",
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
      showSheet: false,
      showAddActivitySheet: false,
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
  /*
   * Transition both opacity and max-height for a smooth fade and expand/collapse.
   * Adjust duration and easing as needed.
   */
  transition: opacity 0.2s ease, max-height 0.4s ease;
}

.height-fade-enter-from,
.height-fade-leave-to {
  opacity: 0;
  max-height: 0; /* Starts/ends with no height, effectively hidden */
  padding-top: 0 !important; /* Override Tailwind's px-6, py-6 during transition */
  padding-bottom: 0 !important; /* Override Tailwind's px-6, pb-6 during transition */
}

.height-fade-enter-to,
.height-fade-leave-from {
  opacity: 1;
  /*
   * Set a max-height value that is guaranteed to be larger than the content's
   * maximum possible height. This allows the content to expand fully.
   * 500px is a common safe value for a few rows of content. Adjust if your content is taller.
   */
  max-height: 450px;
}
</style>