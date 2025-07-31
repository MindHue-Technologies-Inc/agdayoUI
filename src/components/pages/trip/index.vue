<template>
  <template v-if="isLoading">
    <div class="flex items-center justify-center w-full h-[32rem]">
      <Spinner label="Loading your trips"/>
    </div>
  </template>
  <template v-else>
    <transition name="fade" appear>

      <div class="grow mt-8 md:mt-16 fadeIn" v-if="tripConfig.name">
        <!-- PAYMENT BUTTON -->
        <!--<PaymentButton description="Premium Subscription" :amount="999"/>-->

        <!-- MAIN CARD -->
        <Card :customClass='cardClass + " max-w-4xl mx-auto p-0! overflow-hidden rounded-4xl bg-white"'>
          <!-- TRIP HEADER -->
          <TripDetailsHeader
              :trip-config="tripConfig"
              :planning-progress="progressOfPlanning"
              @show-settings="settingsShowSheet = true"
              @show-map="mapShowSheet = true"
          />

          <!-- TRIP SECTION -->
          <TripSections

              @show-accommodation="accommodationShowSheet=true"
              @show-budget="budgetShowSheet=true"
              @show-companions="companionsShowSheet=true"
              @show-preparation="preparationShowSheet=true"
              @show-roles="rolesShowSheet=true"
              @show-transportation="transportationShowSheet=true"

              :preparation="preparation"
              :budget="budget"
              :accommodation="accommodation"
              :companions="companions"
              :roles="roles"
              :transportation="transportation"

          />

          <!-- DAY PLANS -->
          <ActivityTimeline
              :trip-config="tripConfig"
              :activities="activities"

              @show-add-activity="addActivityShowSheet=true"
              @show-day-note="dayNoteShowSheet=true"
              @show-view-activity="showViewActivitySheet"
          />
        </Card>
        <!-- END OF MAIN CARD -->
        <div id="fuck"></div>
      </div>
    </transition>
  </template>


  <!--TOAST-->
  <ToastContainer>
    <Toast
        :variant="'error'"
        ref="dangerToast"
        :message="dangerToast.message"
    />
    <Toast
        :variant="'success'"
        ref="successToast"
        :message="successToast.message"
    />
  </ToastContainer>


  <SheetTripSettings v-model:showSheet="settingsShowSheet" v-model="settings" @save="saveSettings" @delete="deleteTrip"/>
  <SheetPreparation v-model:showSheet="preparationShowSheet" v-model="preparation"/>
  <SheetAccom v-model:showSheet="accommodationShowSheet" @update:showSheet="accommodationShowSheet" v-model="accommodation" />
  <SheetCompanions @companion-added="companionAdded" :uid="user.uid" :accepted-friendships="user.acceptedFriendships" :ownerUid="ownerUid" v-model:showSheet="companionsShowSheet" v-model="companions"/>
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
  <SheetMap :activities="activities" v-model:showSheet="mapShowSheet"/>

</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue"
import Button from "../../UI/Button.vue";
import PaymentButton from "../../UI/PaymentButton.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import Toast from "../../UI/Toast.vue";
import TripDetailsHeader from "./components/TripDetailsHeader.vue";
import TripSections from "./components/TripSections.vue";
import ActivityTimeline from "./components/ActivityTimeline.vue";
import {
    useDbStore,
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
    removeTrip,

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
import SheetMap from "./components/sheets/SheetMap.vue";
import CardActivity from "./components/timeline/CardActivity.vue";
import TimelineDot from "./components/timeline/TimelineDot.vue";
import Spinner from "../../UI/Spinner.vue";

export default {
  components: {
    Spinner,
    AdvSquareCard,
    Card,
    Tag,
    Button,
    PaymentButton,
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
    SheetMap,
    CardActivity,
    TimelineDot,
    ToastContainer,
    Toast,
    TripDetailsHeader,
    TripSections,
    ActivityTimeline
  },

  props: {
    index: {
      type: Number,
      required: false,
    },
    tripId: {
      type: String,
      required: true
    }
  },

  watch: {
    anySheetOpen(isOpen) {
      if (isOpen) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    },
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
  },

  data() {
    return {
      user: {},
      dangerToast: {
        message: '',
      },
      successToast: {
        message: '',
      },
      isLoading: true,
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
      mapShowSheet: false,
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
      ownerUid: '',
      preparation: {
        showSheet: false,
        preparationsChecklist: [],
      },
      accommodation: {
        showSheet: false,
        name: '',
        type: '',

        location: '',
        numberOfRooms: 0,
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

    progressOfPlanning() {
      const conditions = [
        this.activities?.length > 0,
        this.budget.categories?.length > 0,
        this.companions?.length > 1,
        this.preparation?.preparationsChecklist.length > 0,
        !!this.accommodation?.name,
        // Add other conditions here
      ];

      const completed = conditions.filter(Boolean).length;
      const total = conditions.length;

      return {
        completed: completed,
        total: 7
      };
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

    anySheetOpen() {
      return this.settingsShowSheet ||
          this.preparationShowSheet ||
          this.accommodationShowSheet ||
          this.companionsShowSheet ||
          this.budgetShowSheet ||
          this.transportationShowSheet ||
          // this.rolesShowSheet ||
          // this.dayNoteShowSheet ||
          this.addActivityShowSheet ||
          this.editActivityShowSheet ||
          this.selectedActivityShowSheet ||
          this.mapShowSheet;
    },
  },
  methods: {
    showViewActivitySheet(activity) {
      this.selectedActivityShowSheet = true
      this.selectedActivity.activity = activity
    },

    async deleteTrip() {
      if (confirm("Do you want to delete this trip?")) {
        const response = await fetch(`/api/v1/trip?tripId=${this.tripId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const error = await response.json()
          console.error(error.message)
          this.dangerToast.message = error.message
          return
        }

        this.successToast.message = 'Trip Deleted!'

        // removeTrip(this.index)
        window.location.href = '/trips'
      }
    },

    async companionAdded() {
      await this.fetchTrip()
    },

    async updateActivity(activity) {
      try {
        const response = await fetch('/api/v1/activity', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activity)
        })

        if (!response.ok) {
          const error = await response.json()
          console.error('Error updating an activity:', error.message)
          throw new Error(`Error updating an activity: ${error.message}`)
        }

        const jsonResponse = await response.json()

        // -- GET THE INDEX OF THE OLD ACTIVITY
        const indexOfOriginal = this.activities.findIndex(activity=>{
          return activity.id === jsonResponse?.updatedActivity?.id
        })

        this.activities[indexOfOriginal] = jsonResponse.updatedActivity

        this.successToast.message = jsonResponse.message
      } catch (error) {
        console.error(error)
        this.dangerToast.message = error
      }
    },

    editSelectedActivity(activity) {
      this.editActivityShowSheet = true
      this.editActivity = {activity: activity}
    },

    async deleteActivity(id) {
      try {
        // -- SEND DELETE CALL TO BACKEND
        const response = await fetch(`/api/v1/activity?activityId=${id}&tripId=${this.tripId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(`Error delete activity: ${error.message}`)
        }

        const jsonResponse = await response.json()

        // -- SUCCESS TOAST
        this.successToast.message = jsonResponse.message

        this.activities = this.activities.filter(activity=>activity.id !== id)
      } catch (error) {
        console.error(error)
      }
    },

    async addNewActivity(activity) {
      try {
        const response = await fetch('/api/v1/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...activity, tripId:this.tripId})
        })

        if (!response.ok) {
          const error = await response.json()
          console.error('Error saving activity:', error.message)
          throw new Error(`Error saving activity: ${error.message}`)
        }

        const jsonResponse = await response.json()
        console.log(jsonResponse)

        // -- SAVE THE NEW ACTIVITY TO THE ACTIVITIES
        this.activities.push(jsonResponse.createdActivity)

        // -- SUCCESS TOAST
        this.successToast.message = jsonResponse.message

      } catch (error) {
        console.error(error)
        this.dangerToast.message = error
      }
      // try {
      //   this.activities.push(activity)
      //   this.successToast.message = 'Activity Added'
      //   setActivities(this.index, this.activities)
      // } catch (e) {
      //   this.dangerToast.message = `${e}`
      // }
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

    async saveSettings(payload){
      try {
        this.tripConfig.name = payload.name ?? this.tripConfig.name;
        this.tripConfig.location = payload.location ?? this.tripConfig.location;
        this.tripConfig.theme = payload.theme ?? this.tripConfig.theme;

        // More explicit update for date object, especially if it could be partial
        if (payload.date) { // Only update if payload.date is not null/undefined
          this.tripConfig.date.start = payload.date.start ?? this.tripConfig.date.start;
          this.tripConfig.date.end = payload.date.end ?? this.tripConfig.date.end;
        }

        const response = await fetch('/api/v1/trip', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({tripData: this.tripConfig, tripId: this.tripId})
        })
      } catch (err) {
        console.error('Error at Saving Settings', err)
        this.dangerToast.message = `Error at saving settings.`
      }
    },

    async fetchUser() {
      const response = await fetch('/api/v1/me')

      if (!response.ok) {
        const error = await response.json()
        console.error(error)
      }

      this.user = await response.json()
    },

    setTripConfig(data) {
      this.tripConfig.name = data.name
      this.tripConfig.location = data.location
      this.tripConfig.theme = data.theme
      this.tripConfig.date.start = new Date(data.date.start)
      this.tripConfig.date.end = new Date(data.date.end)
    },

    setTripSettings(data) {
      this.settings.trip = {...this.tripConfig}
    },

    setActivities(data) {
      this.activities = data.activities
    },

    setPreparation(data) {
      this.preparation.preparationsChecklist = data.tasks
    },

    setAccommodation(data) {
      try {
        const accommodation = data.accommodations.sort((a,b)=>a.createdAt._seconds - b.createdAt._seconds)[data.accommodations.length - 1]
        this.accommodation = {
          ...accommodation,
          dates: {
            start: new Date(accommodation.dates.start),
            end: new Date(accommodation.dates.end)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    setBudget(data) {
      this.budget.totalBudget = data.overallBudget;
      this.budget.categories = data.budget;
    },

    setCompanions(data) {
      this.companions = data.companions
    },

    setOwnerUid(data) {
      this.ownerUid = data.ownerUid
    },

    async fetchTrip() {
      const response = await fetch(`/api/v1/trip?tripId=${this.tripId}`, {
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      console.log(data)

      this.setTripConfig(data)
      this.setTripSettings(data)
      this.setActivities(data)
      this.setPreparation(data)
      this.setAccommodation(data)
      this.setBudget(data)
      this.setCompanions(data)
      this.setOwnerUid(data)
    }
  },

  async mounted() {
    await this.fetchTrip()
    await this.fetchUser()

    this.isLoading = false
  }
}
</script>