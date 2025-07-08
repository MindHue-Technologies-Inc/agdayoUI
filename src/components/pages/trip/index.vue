<template>
  <transition name="fade" appear>
    <div class="grow mt-8 md:mt-16">
      <!--<div class="absolute right-0 border w-[24rem] text-wrap top-0">-->
      <!--  <pre>tripConfig</pre>-->
      <!--  <pre>{{tripConfig}}</pre>-->

      <!--  <pre>settings</pre>-->
      <!--  <pre>{{settings}}</pre>-->

      <!--  <pre>preparation</pre>-->
      <!--  <pre>{{preparation}}</pre>-->

      <!--  <pre>accommodation</pre>-->
      <!--  <pre>{{accommodation}}</pre>-->

      <!--  <pre>companions</pre>-->
      <!--  <pre>{{companions}}</pre>-->

      <!--  <pre>budget</pre>-->
      <!--  <pre>{{budget}}</pre>-->

      <!--  <pre>transportation</pre>-->
      <!--  <pre>{{transportation}}</pre>-->

      <!--  <pre>roles</pre>-->
      <!--  <pre>{{roles}}</pre>-->

      <!--  <pre>dayNote</pre>-->
      <!--  <pre>{{dayNote}}</pre>-->

      <!--  <pre>addActivity</pre>-->
      <!--  <pre>{{addActivity}}</pre>-->

      <!--  <pre>editActivity</pre>-->
      <!--  <pre>{{editActivity}}</pre>-->

      <!--  <pre>selectedActivity</pre>-->
      <!--  <pre>{{selectedActivity}}</pre>-->

      <!--  <pre>planningProgress</pre>-->
      <!--  <pre>{{planningProgress}}</pre>-->
      <!--</div>-->
      <Card :customClass='cardClass + " max-w-4xl mx-auto p-0! overflow-hidden rounded-4xl bg-white"'>
        <div :class="['flex flex-col gap-3 p-4 md:p-6 sm:p-8', headerClass]">
          <div class="fadeIn flex flex-row items-center justify-between">
            <div class="flex flex-row gap-2 items-center">
              <Tag label="Upcoming" class="bg-white border-primary-light-xs"/>
              <Tag label="View on Map" variant="green" mode="button" icon="ph-map-trifold" />
            </div>

            <button @click="settingsShowSheet = true" class="flex justify-center items-center text-2xl text-zinc-600 cursor-pointer transition hover:text-peach-500 active:text-peach-600 focus:outline-none focus:ring-2 focus:ring-peach-300 rounded-full p-1 -mr-1">
              <i class="ph ph-gear-six"></i>
            </button>
          </div>

          <div class="fadeIn fadeIn-1">
            <h2 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">{{tripConfig.name}}</h2>
          </div>

          <div class="mt-2 fadeIn fadeIn-2">
            <span class="text-zinc-600 font-semibold">Planning Progress:</span>
            <div :class="progressBgClass" class="w-full rounded-full h-2 mt-1">

              <div :class="['h-2 rounded-full transition-all ease', progressClass]" :style="{ width: `${(planningProgress.completed / planningProgress.total) * 100}%` }"></div>
            </div>
            <span class="text-sm text-zinc-500 mt-1 block">{{ planningProgress.completed }}/{{ planningProgress.total }} Sections Complete</span>
          </div>

          <div class="fadeIn fadeIn-3 flex flex-row items-center gap-6 text-zinc-600 font-medium mt-2">
            <div class="flex gap-2 items-center">
              <i :class="['ph ph-calendar-dots text-xl', textClass]"></i>
              <span>{{formatDateRange(tripConfig.date.start, tripConfig.date.end)}}</span>
            </div>

            <div class="flex gap-2 items-center">
              <i :class="['ph ph-map-pin text-xl', textClass]"></i>
              <span>{{tripConfig.location}}</span>
            </div>
          </div>

        </div>

        <div class="flex flex-row gap-4 py-4 sm:py-6 px-4 md:px-6 overflow-x-auto custom-scrollbar bg-zinc-50 border-t border-b border-zinc-100">
          <AdvSquareCard
              iconName="ph-suitcase"
              cardName="Preparations"
              :tagName="`${preparation.preparationsChecklist.length} Tasks`"
              tagVariant="blue"
              @card-click="preparationShowSheet = true" />
          <AdvSquareCard
              iconName="ph-bed"
              cardName="Accommodations"
              :tagName="`${accommodation.numberOfRooms} ${accommodation.numberOfRooms > 1 ? 'Rooms' : 'Room'}`"
              tagVariant="orange"
              @card-click="accommodationShowSheet = true"
          />
          <AdvSquareCard
              iconName="ph-wallet"
              cardName="Budget"
              :tagName="`${formatCurrency(budget.totalBudget)} Budget`"
              tagVariant="red"
              @card-click="budgetShowSheet = true"
          />
          <AdvSquareCard
              iconName="ph-users"
              cardName="Companions"
              tagName="4 Travelers"
              tagVariant="purple"
              @card-click="companionsShowSheet = true"
          />
          <AdvSquareCard
              iconName="ph-bus"
              cardName="Transportation"
              tagName="3 Pending"
              tagVariant="blue"
              @card-click="transportationShowSheet = true"
          />
          <AdvSquareCard
              iconName="ph-hand-palm"
              cardName="Roles"
              tagName="4 Roles"
              tagVariant="primary"
              @card-click="rolesShowSheet = true"
          />
        </div>

        <div class="flex flex-col gap-0 p-4 md:p-6 sm:p-8">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-3xl sm:text-4xl text-zinc-800 outfit">Day Plan</h3>
            <Button @click="addActivityShowSheet = true">+ Add Activity</Button>
          </div>

          <div>
            <template v-if="groupedActivities.length <= 0">
              <div class="py-8 text-center flex flex-col items-center justify-center">
                <i class="ph ph-note-pencil text-4xl text-zinc-300 mb-2"></i> <span class="text-zinc-500 font-medium text-lg">No Activities Yet</span>
                <p class="text-zinc-400 text-sm mt-1">Start by adding your first activity.</p>
              </div>
            </template>
            <template v-else v-for="(item, index) in groupedActivities" :key="index">
              <div :class="[
                  'fadeIn',
                  `fadeIn-${index}`
              ]">
                <div :key="'top-' + index" class="flex items-center justify-between">
                  <button
                      @click="dayNoteShowSheet = true"
                      class="flex items-center gap-2 text-left p-2 -ml-2 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-peach-500"
                  >
                    <span v-if="item.type === 'day'" class="font-semibold text-2xl text-zinc-800 my-4">Day {{days.indexOf(item.iso) + 1}} - {{ item.label }}</span>
                  </button>
                  <Tag v-if="item.type === 'day'" @click="dayNoteShowSheet = true" label="+ Add Note" mode="button"/>
                </div>

                <div :key="'mid' + index" v-if="item.type === 'tag'" class="relative flex items-center justify-center">
                  <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
                  <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">{{ item.label }}</span>
                </div>

                <div
                    :key="'bot' + index"
                    v-else-if="item.type === 'activity'"
                    class="flex flex-row gap-2 md:gap-4"
                >
                  <TimelineDot :time="formatIsoDateToTime(item.data.datetime)" :isLast="false" />
                  <CardActivity
                      @click="showViewActivitySheet(item.data)"
                      :iconName="item.data.iconName"
                      :title="item.data.title"
                      :location="item.data.location"
                      :cost="item.data.cost"
                      :costNote="item.data.costNote"
                      :currency="item.data.currency"
                  />
                </div>
              </div>
            </template>
          </div>
          <div class="w-full text-center mt-8">
            <Button @click="addActivityShowSheet = true" variant="secondary" class="border border-zinc-200 hover:border-peach-400 w-full">
              <i class="ph ph-plus text-lg mr-1"></i> Add Activity
            </Button>
          </div>
        </div>
      </Card>
      <!--TOAST-->
      <ToastContainer>
        <Toast
            :variant="'error'"
            ref="dangerToast"
            :message="dangerToast.message"
        />
      </ToastContainer>
      <!--TOAST-->
      <ToastContainer>
        <Toast
            :variant="'success'"
            ref="successToast"
            :message="successToast.message"
        />
      </ToastContainer>
    </div>
  </transition>


  <SheetTripSettings v-model:showSheet="settingsShowSheet" v-model="settings" @save="saveSettings"/>
  <SheetPreparation v-model:showSheet="preparationShowSheet" v-model="preparation"/>
  <SheetAccom v-model:showSheet="accommodationShowSheet" @update:showSheet="accommodationShowSheet" v-model="accommodation" />
  <SheetCompanions v-model:showSheet="companionsShowSheet" v-model="companions"/>
  <SheetBudget v-model:showSheet="budgetShowSheet" v-model="budget"/>
  <SheetTransportation v-model:showSheet="transportationShowSheet" v-model="transportation"/>
  <SheetRoles v-model:showSheet="rolesShowSheet" v-model="roles"/>
  <SheetAddActivity v-model:showSheet="addActivityShowSheet" :dateRange="tripConfig.date" v-model="addActivity" @activity-saved="addNewActivity"/>
  <SheetEditActivity
      v-model:showSheet="editActivityShowSheet"
      :dateRange="tripConfig.date"
      v-model="editActivity"
      @activity-saved="updateActivity"
  />
  <SheetViewActivity
      v-model:showSheet="selectedActivityShowSheet"
      v-model="selectedActivity"
      @edit-activity="editSelectedActivity"
      @delete-activity="deleteActivity"
  />
  <SheetDayNote v-model:showSheet="dayNoteShowSheet" v-model="dayNote"/>

</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue"
import Button from "../../UI/Button.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import Toast from "../../UI/Toast.vue";
import {
    useDbStore,
    addEmptyTrip,
    setName,
    setLocation,
    setDate,
    setTheme,
    setPreparation,
    setCompanions,
    setAccommodation,
    setBudget,
    setTransportation,
    setRoles,
    setActivities,
    setPlanningProgress,
    removeTrip

} from "../../../stores/db.js";


// Sheets
import SheetTripSettings from "./components/sheets/SheetTripSettings.vue";
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
    SheetTripSettings,
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
    ToastContainer,
    Toast,
  },

  directives: {
    // Only include if you're actually using v-auto-animate in this template
    // autoAnimate: vAutoAnimate
  },

  props: {
    index: {
      type: Number,
      required: true,
    }
  },

  watch: {
    //--------------------------------------------- Watcher for 'preparation'
    preparation: {
      handler(newValue) {
        if (!newValue) return

        setPreparation(this.index, newValue)
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'accommodation'
    accommodation: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null && newValue.name !== '') {
          setAccommodation(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'companions'
    companions: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          setCompanions(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'budget'
    budget: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          setBudget(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'transportation'
    transportation: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          setTransportation(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'roles'
    roles: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          setRoles(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },

    //--------------------------------------------- Watcher for 'activities'
    // activities: {
    //   handler(newValue) {
    //     if (newValue !== undefined && newValue !== null) {
    //       setActivities(this.index, newValue);
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },

    //--------------------------------------------- Watcher for 'planningProgress'
    planningProgress: {
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          setPlanningProgress(this.index, newValue);
        }
      },
      deep: true,
      immediate: true,
    },
  },

  data() {
    return {
      dangerToast: {
        message: '',
      },
      successToast: {
        message: '',
      },
      useDb: useDbStore.get(), // Initialize with the current state
      unsubscribeFromDbStore: null, // 2. Property to hold the unsubscribe function
      tripConfig: {
        name: '',
        location: '',
        theme: '',
        date: {
          start: new Date,
          end: new Date,
        },
      },
      settingsShowSheet: false,
      preparationShowSheet: false,
      accommodationShowSheet: false,
      companionsShowSheet: false,
      budgetShowSheet: false,
      transportationShowSheet: false,
      rolesShowSheet: false,
      dayNoteShowSheet: false,
      addActivityShowSheet: false,
      editActivityShowSheet: false,
      selectedActivityShowSheet: false,
      settings: {
        showSheet: false,
        trip: {
          name: 'Summer in Baguio City',
          location: "Baguio City",
          theme: 'peach',
          date: {
            start: new Date(),
            end: new Date(),
          },
        }
      },
      preparation: {
        showSheet: false,
        preparationsChecklist: [],
      },
      accommodation: {
        showSheet: false,
        name: '',
        type: '',

        location: '',
        numberOfRooms: 1,
        totalCost: 0,
        // currency: 'PHP', // If you plan to make currency selectable or dynamic

        checkInTime: '15:00', // Common default check-in time
        checkOutTime: '11:00', // Common default check-out time

        dates: {
          start: '',
          end: '',
        }

      },
      companions: {
        showSheet: false,
      },
      budget: {
        showSheet: false,
        totalBudget: null,
        currency: 'PHP', // Default currency
        categories: []
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
      activities: [
      ],
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

      // Data for the progress bar
      planningProgress: {
        completed: 1, // Example: based on 4/7 sections complete
        total: 7,
      },
    }
  },
  computed: {
    days() {
      let x = this.activities.map(activity=>{
        return activity.datetime.split('T')[0]
      })
      return [...new Set(x)]
    },

    groupedActivities() {
      const result = [];
      let currentDay = null;
      let hasMorning = false;
      let hasNoon = false;
      let hasAfternoon = false;
      let hasEvening = false;
      let hasDay = false;

      this.activities?.sort((a, b) => {
            // Convert datetime strings to Date objects for accurate comparison
            // Or, for ISO strings, direct string comparison often works too for chronological order.
            // Using Date objects is generally safer, especially if you deal with varying levels of precision.
            const dateA = new Date(a.datetime);
            const dateB = new Date(b.datetime);

            // Compare the Date objects
            // Returns a negative value if a comes before b
            // Returns a positive value if a comes after b
            // Returns 0 if they are the same
            return dateA - dateB;
          })
          .forEach((activity, index) => {
        const activityDate = new Date(activity.datetime)
        const activityDay = activity.datetime.split('T')[0]
        const activityHour = activityDate.getHours();

        if(activityDay !== currentDay) {
          currentDay = activityDay;
          hasMorning = false;
          hasNoon = false;
          hasAfternoon = false;
          hasEvening = false;
          hasDay = false;
        }

        if (!hasDay) {
          hasDay = true;
          result.push({type: 'day', label: this.formatIsoDateToDate(activityDate), iso: activity.datetime.split('T')[0]})
        }

        if (activityHour >= 0 && activityHour < 12 && !hasMorning) {
          result.push({ type: 'tag', label: 'Morning' });
          hasMorning = true;
        } else if (activityHour >= 12 && activityHour < 13 && !hasNoon) {
          result.push({ type: 'tag', label: 'Noon' });
          hasNoon = true;
        } else if (activityHour >= 13 && activityHour < 18 && !hasAfternoon) {
          result.push({ type: 'tag', label: 'Afternoon' });
          hasAfternoon = true;
        } else if (activityHour >= 18 && activityHour < 23 && !hasEvening) { // Evening from 8 PM to 5 AM next day
          result.push({ type: 'tag', label: 'Evening' });
          hasEvening = true;
        }
        result.push({ type: 'activity', data: activity });
      })
      return result
    },

    cardClass() {
      switch (this.tripConfig.theme) {
        case 'peach':
          return 'border-primary-light-sm shadow-primary-light-md';
        case 'blue':
          return 'border-info-light-sm shadow-info-light-md';
        case 'amber':
          return 'border-warning-light-sm shadow-warning-light-md';
        case 'emerald':
          return 'border-success-light-sm shadow-success-light-md';
        default:
          return 'border-primary-light-sm shadow-primary-light-md';
      }
    },

    headerClass() {
      switch (this.tripConfig.theme) {
        case 'peach':
          return 'bg-peach-50';
        case 'blue':
          return 'bg-sky-50';
        case 'amber':
          return 'bg-amber-50';
        case 'emerald':
          return 'bg-emerald-50';
        default:
          return 'bg-peach-50';
      }
    },

    progressClass() {
      switch (this.tripConfig.theme) {
        case 'peach':
          return 'bg-peach-500';
        case 'blue':
          return 'bg-sky-500';
        case 'amber':
          return 'bg-amber-500';
        case 'emerald':
          return 'bg-emerald-500';
        default:
          return 'bg-peach-500';
      }
    },

    progressBgClass() {
      switch (this.tripConfig.theme) {
        case 'peach':
          return 'bg-peach-200'
        case 'blue':
          return 'bg-sky-200';
        case 'amber':
          return 'bg-amber-200';
        case 'emerald':
          return 'bg-emerald-200';
        default:
          return 'bg-peach-200';
      }
    },

    textClass() {
      switch (this.tripConfig.theme) {
        case 'peach':
          return 'text-peach-500';
        case 'blue':
          return 'text-sky-500';
        case 'amber':
          return 'text-amber-500';
        case 'emerald':
          return 'text-emerald-500';
        default:
          return 'text-peach-500';
      }
    }
  },
  methods: {
    showViewActivitySheet(activity) {
      this.selectedActivityShowSheet = true
      this.selectedActivity.activity = activity
    },

    formatCurrency(cost) {
      const formatter = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: this.budget.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatter.format(this.budget.totalBudget);
    },

    updateActivity(activity) {
      // -- FIND THE ACTIVITY TO BE UPDATED
      let activityToUpdate = this.activities.find(act=>act.id === activity.id)

      // -- SET THE NEW ACTIVITY TO THE ACTIVITY FOUND
      activityToUpdate = activity

      // -- UPDATE THE LOCALSTORAGE WITH NEW ACTIVITY
      setActivities(this.index, this.activities)
    },

    editSelectedActivity(activity) {
      this.editActivityShowSheet = true
      this.editActivity = {activity: activity}
    },

    deleteActivity(id) {
      this.activities = this.activities.filter(activity=>activity.id !== id)
      setActivities(this.index, this.activities)
    },

    addNewActivity(activity) {
      try {
        this.activities.push(activity)
        this.successToast.message = 'Activity Added'
        setActivities(this.index, this.activities)
      } catch (e) {
        this.dangerToast.message = `${e}`
      }
    },
    formatDateRange(startDateIso, endDateIso) {
      if (!startDateIso || !endDateIso) return '';

      const start = new Date(startDateIso);
      const end = new Date(endDateIso);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid date string(s) for range: Start "${startDateIso}", End "${endDateIso}"`);
        return '';
      }

      // Options for consistent short month and numeric day
      const monthDayOptions = { month: 'short', day: 'numeric' };
      const yearOptions = { year: 'numeric' };

      const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(end);
      const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

      // If it's a single-day trip
      if (startDateIso === endDateIso) {
        return `${startMonthDay}, ${year}`;
      }

      // If it's a multi-day trip within the same month and year
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        // Example: "May 14 - 16, 2025"
        return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start)} - ${endDay}, ${year}`;
      }

      // If it spans different months or years, show full start date and end date
      // Example: "Dec 25 - Jan 5, 2026" or "Dec 25, 2025 - Jan 5, 2026"
      const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

      if (start.getFullYear() === end.getFullYear()) {
        return `${startFull} - ${endFull}, ${year}`;
      } else {
        // If years are different, include year for both
        const startFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(start);
        const endFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(end);
        return `${startFullYear} - ${endFullYear}`;
      }
    },

    formatIsoDateToTime(value){
      let date = new Date(value)

      let hours = date.getHours()
      const minutes = date.getMinutes()

      const ampm = hours >= 12 ? 'PM' : 'AM'

      hours = hours % 12;
      hours = hours ? hours : 12

      const formattedMinutes = minutes < 10 ? '0' + minutes: minutes;

      return `${hours}:${formattedMinutes} ${ampm}`;
    },

    formatIsoDateToDate(value) {
      const date = new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },

    hasPayload(payload) {
      return payload === null || typeof payload === 'undefined'
    },

    initTripConfig(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.tripConfig.name = payload.trip.name
        this.tripConfig.location = payload.trip.location
        this.tripConfig.date.start = payload.trip.start_date
        this.tripConfig.date.end = payload.trip.end_date
        this.tripConfig.theme = payload.trip.theme
      } catch (err) {
        console.error(err)
      }
    },

    initBudget(payload) {
      try {
        this.budget = payload.trip.budget;
      } catch (err) {
        console.error(err)
      }
    },

    initAccommodation(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.accommodation = payload?.trip?.accommodation ? payload.trip.accommodation : this.accommodation
        this.accommodation.location = payload.trip.location
        this.accommodation.dates = { start:payload.trip.start_date, end:payload.trip.end_date }
      } catch (err) {
        console.error(err)
      }
    },

    initSettings(payload) {
      this.settings.trip.name = payload.trip.name
      this.settings.trip.date = { start:payload.trip.start_date, end:payload.trip.end_date }
      this.settings.trip.theme = payload.trip.theme
      this.settings.trip.location = payload.trip.location
    },

    initPreparation(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.preparation = payload.trip.preparation
      } catch (e) {
        console.error(e)
      }
    },

    initActivities(payload) {
      this.activities = payload.trip.activities
    },

    saveSettings(payload){
      try {
        this.tripConfig.name = payload.name ?? this.tripConfig.name;
        this.tripConfig.location = payload.location ?? this.tripConfig.location;
        this.tripConfig.theme = payload.theme ?? this.tripConfig.theme;

        // More explicit update for date object, especially if it could be partial
        if (payload.date) { // Only update if payload.date is not null/undefined
          this.tripConfig.date.start = payload.date.start ?? this.tripConfig.date.start;
          this.tripConfig.date.end = payload.date.end ?? this.tripConfig.date.end;
        }

        setName(this.index, this.tripConfig.name)
        setLocation(this.index, this.tripConfig.location)
        setTheme(this.index, this.tripConfig.theme)
        setDate(this.index, this.tripConfig.date)
      } catch (err) {
        console.error('Error at Saving Settings', err)
      }
    }
  },

  mounted() {
    // SUBSCRIBE TO NANOTSTORES
    this.unsubscribeFromDbStore = useDbStore.listen(newValue => {
      // Update the component's reactive data property with the new store value
      this.useDb = newValue;
    });

    // SIMULATE API CALL
    const payload = {
      trip: {
        name: this.useDb.trips[this.index].name,
        start_date: new Date(this.useDb.trips[this.index].date.start),
        end_date: new Date(this.useDb.trips[this.index].date.end),
        status: '',
        location: this.useDb.trips[this.index].location,
        created_by: 'Albert Sobreo',
        theme: this.useDb.trips[this.index].theme,
        preparation: this.useDb.trips[this.index].preparation,
        budget: this.useDb.trips[this.index].budget,
        activities: this.useDb.trips[this.index].activities,
        accommodation: this.useDb.trips[this.index].accommodation,
      },
    }



    this.initTripConfig(payload)
    this.initAccommodation(payload)
    this.initSettings(payload)
    this.initPreparation(payload)
    this.initBudget(payload)
    this.initActivities(payload)
  }
}
</script>

<style scoped>

/* Custom scrollbar for horizontal actions */

</style>