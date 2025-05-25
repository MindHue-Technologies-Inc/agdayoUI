<template>
  <div class=" grow mt-16">
<!--    CARD BODY-->
    <Card customClass="p-0! overflow-hidden rounded-4xl border-primary-light-sm shadow-primary-light-lg">
      <!-- OVERVIEW -->
      <div class="flex flex-col gap-2 bg-peach-50 p-6">
        <!-- TOP PART -->
        <div class="flex flex-row items-center justify-between">
          <!-- TAG -->
          <Tag label="upcoming" class="bg-white"/>

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
      <div class="grid md:grid-cols-4 grid-cols-2 gap-4 px-6">
        <AdvSquareCard
            iconName="ph-suitcase"
            cardName="Preparations"
            tagName="3 Pending"
            tagVariant="blue"
            @card-click="showSheet = true" />
        <AdvSquareCard
          iconName="ph-bed"
          cardName="Accommodations"
          tagName="2 Booked"
          tagVariant="orange"
          @card-click="showSheet = true"
        />
        <AdvSquareCard
          iconName="ph-users"
          cardName="Companions"
          tagName="4 Travelers"
          tagVariant="purple"
          @card-click="showSheet = true"
        />
        <AdvSquareCard
          iconName="ph-wallet"
          cardName="Budget"
          tagName="$X Remaining"
          tagVariant="red"
          @card-click="showSheet = true"
        />
      </div>

      <div v-auto-animate>
        <div v-if="showMoreActions" class="grid md:grid-cols-4 grid-cols-2 gap-4 px-6 overflow-hidden pb-1">
          <AdvSquareCard
              iconName="ph-suitcase"
              cardName="Preparations"
              tagName="3 Pending"
              tagVariant="blue"
              @card-click="showSheet = true" />
          <AdvSquareCard
              iconName="ph-bed"
              cardName="Accommodations"
              tagName="2 Booked"
              tagVariant="orange"
              @card-click="showSheet = true"
          />
          <AdvSquareCard
              iconName="ph-users"
              cardName="Companions"
              tagName="4 Travelers"
              tagVariant="purple"
              @card-click="showSheet = true"
          />
          <AdvSquareCard
              iconName="ph-wallet"
              cardName="Budget"
              tagName="$X Remaining"
              tagVariant="red"
              @card-click="showSheet = true"
          />
        </div>
      </div>

      <div class="w-full text-center">
        <Anchor v-if="!showMoreActions" @click="showMoreActions = true" href="javascript:void(0)">Show More</Anchor>
        <Anchor v-else @click="showMoreActions = false" href="javascript:void(0)">Show Less</Anchor>
      </div>

      <!-- DAY PLANS -->
      <div class="flex flex-col gap-6 p-6">
        <!-- TITLE AND ADD ACTIVITY -->
        <div class="flex items-center justify-between">
          <span class="font-medium text-3xl">Day Plan</span>
          <Button>+ Add Activity</Button>
        </div>

        <!-- A DAY PLAN -->
        <div>
          <!-- TITLE -->
          <div class="flex items-center justify-between">
            <span class="font-semibold text-2xl">Day 1 - May 14, 2025</span>
            <Tag label="+ Add Note" mode="button"/>
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
          <Tag @click="showAddActivitySheet = true" label="+ Add Activity" mode="button"/>
        </div>
      </div>

    </Card>
  </div>


  <!--    SHEETS-->
  <SheetPreparation v-model="showSheet"/>

  <!-- ADD ACTIVITY SHEET -->
  <Sheet v-model="showAddActivitySheet">
    <div class="flex flex-col h-full bg-white p-6 sm:p-8 rounded-t-3xl overflow-hidden">
      <div class="flex items-center justify-between pb-6 border-b border-zinc-200">
        <h2 class="text-3xl font-bold text-zinc-800">Add New Activity</h2>
        <button class="text-zinc-500 hover:text-zinc-700 transition-colors">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto pt-6 pr-2 custom-scrollbar">
        <div class="flex flex-col gap-6">

          <div>
            <label for="activity-title" class="block text-sm font-medium text-zinc-700 mb-2">Activity Name</label>
            <input
                type="text"
                id="activity-title"
                placeholder="e.g., Explore Mines View Park"
                class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label for="activity-time" class="block text-sm font-medium text-zinc-700 mb-2">Time</label>
              <input
                  type="time"
                  id="activity-time"
                  class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
              />
            </div>
            <div class="flex-1">
              <label for="activity-date" class="block text-sm font-medium text-zinc-700 mb-2">Date (Optional)</label>
              <input
                  type="date"
                  id="activity-date"
                  class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label for="activity-location" class="block text-sm font-medium text-zinc-700 mb-2">Location</label>
            <input
                type="text"
                id="activity-location"
                placeholder="e.g., Mines View Park, Baguio City"
                class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label for="activity-budget" class="block text-sm font-medium text-zinc-700 mb-2">Budget (PHP)</label>
              <input
                  type="number"
                  id="activity-budget"
                  placeholder="e.g., 150.00"
                  step="0.01"
                  class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
              />
            </div>
            <div class="flex-1">
              <label for="budget-notes" class="block text-sm font-medium text-zinc-700 mb-2">Budget Notes (Optional)</label>
              <input
                  type="text"
                  id="budget-notes"
                  placeholder="e.g., per person, entrance fee"
                  class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label for="activity-description" class="block text-sm font-medium text-zinc-700 mb-2">Description (Optional)</label>
            <textarea
                id="activity-description"
                rows="3"
                placeholder="Add more details about this activity..."
                class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500 transition-colors resize-y"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-zinc-700 mb-2">Activity Type Icon</label>
            <div class="flex flex-wrap gap-3">
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-bus text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-coffee text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-tree text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-bowl-food text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-palette text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-bed text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-pizza text-xl"></i>
              </button>
              <button
                  :class="[
                'p-2 rounded-full border-2 transition-all duration-200',
                'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
              ]"
              >
                <i class="ph ph-question text-xl"></i>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-200 mt-6">
        <button
            class="flex-1 px-6 py-3 bg-white border border-zinc-300 text-zinc-700 rounded-lg
               hover:bg-zinc-100 transition-colors font-semibold"
        >
          Cancel
        </button>
        <button
            class="flex-1 px-6 py-3 bg-peach-500 text-white rounded-lg
               hover:bg-peach-600 transition-colors font-semibold
               disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Activity
        </button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"
import Sheet from "../../UI/Sheet.vue";
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue"
import Anchor from "../../UI/Anchor.vue";
import Button from "../../UI/Button.vue";
import SheetPreparation from "./components/SheetPreparation.vue";
import { vAutoAnimate } from '@formkit/auto-animate'

export default {
  components: {
    AdvSquareCard,
    Sheet,
    Card,
    Tag,
    Anchor,
    Button,
    SheetPreparation,
  },

  directives: {
    autoAnimate: vAutoAnimate // The key is the directive name (camelCase), the value is the imported directive
  },

  data() {
    return {
      showSheet: false,
      showMoreActions: false,
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