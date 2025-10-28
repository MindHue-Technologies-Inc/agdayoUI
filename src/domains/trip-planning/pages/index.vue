<template>
  <div class="flex flex-col grow place-content-center">
    <h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit">
      Plan Your Next Adventure
    </h1>

    <Card class="fadeIn fadeIn-1" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
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

      <Destination ref="destinationRef" v-model="location" @next="proceedNext('destination')"/>

      <Dates ref="datesRef" v-model="date" @next="proceedNext('dates')"/>

      <Button :loading="btnLoading" ref="submit" @click="saveTrip">Start Planning</Button>
    </Card>
  </div>

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

<script setup lang="ts">
import { ref } from "vue"
// UI COMPONENTS
import Card from "@/shared/components/UI/Card.vue"
import InputTitle from "@/shared/components/UI/InputTitle.vue"
import AdvInput from "@/shared/components/UI/AdvInput.vue";
import Button from "@/shared/components/UI/Button.vue";
import ToastContainer from "@/shared/components/UI/ToastContainer.vue";
import Toast from "@/shared/components/UI/Toast.vue";

// TRIP PLANNING COMPONENTS
import Destination from "../components/Destination.vue";
import Dates from "../components/Dates.vue";

import {useCreateTrip} from "../composables/useCreateTrip.ts";

const {

  dangerToast,
  warningToast,
  name,
  location,
  date,
  btnLoading,
  saveTrip,
} = useCreateTrip();

const destinationRef = ref(null)
const datesRef = ref(null)

function proceedNext(current) {
  if (current === 'destination') {
    destinationRef.value?.collapse()
    datesRef.value?.expand();
  } else if (current === 'dates') {
    datesRef.value?.collapse();
  }
}
</script>