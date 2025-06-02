<template>
  <Transition name="fade" appear>
    <div class="flex flex-col grow place-content-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit">
        Plan Your Next Adventure
      </h1>
      <Card customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">

        <AdvInput

            label="Trip Name"
            icon="ph-paper-plane-tilt"
        >
          <div class="p-1">
            <InputTitle

                placeholder="e.g., Island Hopping Palawan"
                id="name"
                class="w-full text-2xl font-bold text-zinc-800"
            />
            <span class="text-sm text-zinc-500 mt-2 block">
              You can add preparations, activities, and routes after creating the trip.
            </span>
          </div>
        </AdvInput>
        <Destination/>
        <Dates/>
        <Button>Start Planning</Button>
      </Card>
    </div>
  </Transition>
</template>

<script>
import Card from "../../UI/Card.vue"
import InputTitle from "../../UI/InputTitle.vue"
import Input from "../../UI/Input.vue";
import AdvInput from "../../UI/AdvInput.vue";
import Button from "../../UI/Button.vue";
import Destination from "./components/Destination.vue";
import Dates from "./components/Dates.vue";
import Budget from "./components/Budget.vue"; // New: Import Budget
import InviteCompanions from "./components/InviteCompanions.vue"; // New: Import InviteCompanions


export default {
  components: {
    Dates,
    Destination,
    Button,
    Card,
    Input,
    InputTitle,
    AdvInput,
    Budget,          // New: Register Budget
    InviteCompanions, // New: Register InviteCompanions
  },
}
</script>