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

        <Button :loading="btnLoading" ref="submit" @click="saveTrip">Start Planning</Button>
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

    async saveTrip() {
      this.btnLoading = true;

      // -- 1. VALIDATE INPUTS
      if (!this.validateName()) return;
      if (!this.validateLocation()) return;
      if (!this.validateDate()) return;

      try {
        // -- 1.5 CONSTRUCT TRIP PAYLOAD
        const payload = {
          name: this.name,
          date: this.date,
          location: this.location,
        }

        // -- 2. CALL POST API
        const response = await fetch('/api/v1/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })

        // -- 3. CHECK IF RESPONSE IS NOT GOOD
        if (!response.ok) {
          const error = await response.json()
          console.error('Something went wrong', error.message)
          throw new Error(error.message)
        }

        // -- 4. GET THE ID OF THE NEWLY CREATED TRIP
        const { tripId, tripData } = await response.json()

        console.log(tripId, tripData)

        window.location.href=`/trips/${tripId}`

      } catch (error) {
        console.error(error)
      }
    }
  },
}
</script>