<template>
  <Transition name="fade" appear>
    <div class="flex flex-col grow py-16">
      <Card customClass="p-6 rounded-4xl border-secondary-xs shadow-secondary-lg">
        <InputTitle placeholder="Enter the Name of the Trip" id="name" />
        <span>You can add preparations, activities, and routes after creating the trip.</span>
        <Destination/>
        <Dates/>
        <Budget/>
        <InviteCompanions/>
        <Button>Save</Button>
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