<template>
  <Transition name="fade" appear>
    <div class="flex flex-col grow place-content-center">
      <h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit">
        Plan Your Next Adventure
      </h1>

      <Card customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
        <AdvInput
            label="Trip Name"
            icon="ph-paper-plane-tilt"
            ref="advInputName"
        >
          <div class="p-1">
            <InputTitle
                v-model="name"
                placeholder="e.g., Island Hopping Palawan"
                id="name"
                class="w-full text-2xl font-bold text-zinc-800"
            />
            <span class="text-sm text-zinc-500 mt-2 block">
              You can add preparations, activities, and routes after creating the trip.
            </span>
          </div>
        </AdvInput>

        <Destination ref="destination" v-model="location" @next="proceedNext('destination')"/>

        <Dates ref="dates" v-model="date" @next="proceedNext('dates')"/>

        <Button :loading="btnLoading" ref="submit" @click="goToTrip">Start Planning</Button>
      </Card>
    </div>
  </Transition>

  <ToastContainer>
    <Toast
        :variant="'error'"
        ref="dangerToast"
        :message="dangerToast.message"
    />
    <Toast
        :variant="'warning'"
        ref="warningToast"
        :message="warningToast.message"
    />
  </ToastContainer>
</template>

<script>
import Card from "../../UI/Card.vue"
import InputTitle from "../../UI/InputTitle.vue"
import Input from "../../UI/Input.vue";
import AdvInput from "../../UI/AdvInput.vue";
import Button from "../../UI/Button.vue";
import Destination from "./components/Destination.vue";
import Dates from "./components/Dates.vue";
import Budget from "./components/Budget.vue";
import InviteCompanions from "./components/InviteCompanions.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import Toast from "../../UI/Toast.vue";
import {
  useDbStore,
  addEmptyTrip,
  setName,
  setLocation,
  setDate,
  setTheme,
  setActivities,
  setPreparation, setBudget
} from "../../../stores/db.js";


export default {
  components: {
    Dates,
    Destination,
    Button,
    Card,
    Input,
    InputTitle,
    AdvInput,
    Budget,
    InviteCompanions,
    ToastContainer,
    Toast,
  },

  data(){
    return {
      // 1. Create a data property to hold the store's state reactively
      useDb: useDbStore.get(), // Initialize with the current state
      dangerToast: {
        message: '',
      },
      warningToast: {
        message: '',
      },
      name: '',
      date: {
        start: null,
        end: null,
      },
      location: '',
      btnLoading: false,
      unsubscribeFromDbStore: null, // 2. Property to hold the unsubscribe function
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.warningToast.message = "Please Enter the Trip Name";
        this.$refs.advInputName.expand();
        return false;
      }

      return true;
    },

    validateLocation() {
      if (!this.location) {
        this.warningToast.message = "Please Enter a Location";
        this.$refs.destination.expand();
        return false;
      }

      return true
    },
    validateDate() {
      if (!this.date.start && !this.date.end) {
        this.warningToast.message = 'Please Enter a Date Range';
        this.$refs.dates.expand();
        return false;
      }

      return true;
    },

    proceedNext(current) {
      if (current === 'destination') {
        this.$refs.destination.collapse();
        this.$refs.dates.expand();
      } else if (current === 'dates') {
        this.$refs.dates.collapse();
      }
    },

    goToTrip() {
      if (!this.validateName()) return;
      if (!this.validateLocation()) return;
      if (!this.validateDate()) return;

      // When you call addEmptyTrip(), it modifies the nanostores state
      const indexOfEmpty = addEmptyTrip()

      console.log(indexOfEmpty)

      setName(indexOfEmpty, this.name)
      setLocation(indexOfEmpty, this.location)
      setDate(indexOfEmpty, this.date)
      setTheme(indexOfEmpty, 'peach')
      setActivities(indexOfEmpty, [])
      setPreparation(indexOfEmpty, {preparationsChecklist: []})
      setBudget(indexOfEmpty, {totalBudget: null, categories: [], showSheet: false, currency: "PHP"})


      console.log(this.useDb.trips[indexOfEmpty])


      // The 'useDb' in your component's data() will automatically update
      // due to the subscription in 'mounted()'.

      this.btnLoading = true;
      window.location.href=`/trips/${indexOfEmpty}`
    }
  },

  // Lifecycle hook for initial setup and subscription
  mounted() {
    // 3. Subscribe to the nanostores store
    this.unsubscribeFromDbStore = useDbStore.listen(newValue => {
      // Update the component's reactive data property with the new store value
      this.useDb = newValue;
      console.log("Nanostores updated, Vue component data refreshed:", newValue);
    });
  },

  // Lifecycle hook to clean up the subscription when the component is unmounted
  beforeUnmount() {
    // 4. Unsubscribe to prevent memory leaks
    if (this.unsubscribeFromDbStore) {
      this.unsubscribeFromDbStore();
      console.log("Unsubscribed from Nanostores.");
    }
  }
}
</script>