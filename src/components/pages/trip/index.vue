<template>
  <div class="relative grow mt-16">
    <div class="grid md:grid-cols-3 grid-cols-2 gap-4">
      <AdvSquareCard/>
      <AdvSquareCard/>
      <AdvSquareCard/>
    </div>
  </div>
</template>

<script>
import AdvSquareCard from "../../UI/AdvSquareCard.vue"

export default {
  components: {
    AdvSquareCard,
  }
}
</script>