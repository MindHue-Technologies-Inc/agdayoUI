<template>
  <Card
      class="md:!p-6 !p-4 gap-2 grow rounded-2xl border border-zinc-200 shadow-sm
           transition-all duration-200 hover:shadow-md hover:border-peach-400 cursor-pointer"
      @click="handleClick"
  >
    <div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
      <i :class="[iconClass, 'text-peach-500 text-xl flex-shrink-0']"></i>
      <span>{{ title }}</span>
    </div>

    <div v-if="location" class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
      <i class="ph ph-map-pin text-peach-400 flex-shrink-0"></i>
      <span>{{ location }}</span>
    </div>

    <div v-if="cost" class="flex items-center gap-1 text-sm text-zinc-500 mt-1">
      <i class="ph ph-wallet text-peach-400 flex-shrink-0"></i>
      <span class="font-semibold text-zinc-600">{{ formattedCost }}</span>
      <span v-if="costNote" class="text-zinc-400">{{ costNote }}</span>
    </div>
  </Card>
</template>

<script>
import Card from "../../../../UI/Card.vue";

export default {
  name: 'ActivityCard', // Good practice to name your components
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Unnamed Activity' // Sensible default
    },
    iconName: { // Phosphor icon class name, e.g., "ph-pizza"
      type: String,
      required: true,
      default: 'ph-question' // Default icon if none provided
    },
    location: {
      type: String,
      default: '' // Location is optional
    },
    cost: {
      type: [Number, String], // Can be a number or a string like "Included"
      default: 0 // Default to 0 or empty string if no cost
    },
    costNote: {
      type: String,
      default: '' // e.g., "/ Person Ticket", "(Est.)"
    },
    // Optional: If you want to pass an entire activity object
    // activity: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  computed: {
    // Dynamically generates the full icon class
    iconClass() {
      return `ph ${this.iconName}`;
    },
    // Formats the cost based on type
    formattedCost() {
      if (typeof this.cost === 'number') {
        // Format as currency if it's a number
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(this.cost);
      }
      return this.cost; // Return as is if it's a string (e.g., "Included")
    }
  },
  methods: {
    handleClick() {
      // Emit an event when the card is clicked, useful for opening sheets, etc.
      this.$emit('card-click');
    }
  }
};
</script>

<style scoped>
/* Scoped styles for ActivityCard if any specific to this component */
</style>