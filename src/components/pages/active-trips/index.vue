<!-- NEED TO ADD ACTUAL TRIP THAT IS UPCOMING OR ACTIVE -->

<template>
  <transition name="fade" appear>
    <div class="flex flex-col grow place-content-center gap-4">
      <i class="ph ph-island text-8xl text-zinc-400"></i>
      <span class="font-medium text-zinc-400">No Active or Upcoming Trip</span>
      <Anchor href="/create-trip" class="text-xl">Start Planning your Trip</Anchor>
    </div>
  </transition>
</template>

<script>
import Anchor from "../../UI/Anchor.vue";
export default {
  name: "ActiveTrips",
  components: {
    Anchor,
  }
}
</script>