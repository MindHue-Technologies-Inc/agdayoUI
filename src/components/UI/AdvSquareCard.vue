<template>
  <div
      :class="[
          baseClasses
      ]"
      @click="handleClick"
  >
    <div class="flex-shrink-0">
      <i :class="['ph', iconName, 'text-5xl', iconColorClass]"></i> </div>

    <div class="flex flex-col items-start mt-auto">
      <Tag :label="tagName" :variant="tagVariant" class="mb-1" />

      <span class="text-base font-semibold text-zinc-800">
        {{ cardName }}
      </span>
    </div>
  </div>
</template>

<script>
import Tag from '../UI/Tag.vue'; // Assuming AppTag.vue is in the same directory or adjust path

export default {
  components: {
    Tag,
  },
  props: {
    // Icon name from Phosphor Icons (e.g., 'ph-map-pin', 'ph-calendar')
    iconName: {
      type: String,
      required: true,
    },
    // Color variant for the icon (e.g., 'peach', 'blue', 'green')
    iconColorVariant: {
      type: String,
      validator: (value) =>
          ['peach', 'blue', 'green', 'red', 'gray', 'purple', 'yellow'].includes(value),
    },
    // The main name/title for the card (e.g., 'Destination', 'Budget')
    cardName: {
      type: String,
      required: true,
    },
    // The label for the AppTag component (e.g., 'Trip Basics')
    tagName: {
      type: String,
      required: true,
    },
    // The variant for the AppTag component (e.g., 'peach', 'blue')
    tagVariant: {
      type: String,
      default: 'peach', // Default tag color
      validator: (value) =>
          ['peach', 'blue', 'green', 'red', 'gray', 'purple', 'yellow'].includes(value),
    },
  },
  computed: {
    baseClasses() {
      return "flex flex-col justify-between items-start " +
          "bg-white rounded-4xl shadow-secondary-md border-secondary-xs " +
          "aspect-square overflow-hidden p-4 cursor-pointer " +
          "transition-all duration-200 hover:shadow-lg hover:border-peach-400"
    },

    // Dynamically determines the Tailwind class for the icon color
    iconColorClass() {
      switch (this.iconColorVariant) {
        case 'peach':
          return 'text-peach-500';
        case 'blue':
          return 'text-blue-500';
        case 'green':
          return 'text-green-500';
        case 'red':
          return 'text-red-500';
        case 'gray':
          return 'text-gray-500';
        case 'purple':
          return 'text-purple-500';
        case 'yellow':
          return 'text-yellow-500';
        default:
          return 'text-zinc-900';
      }
    },
  },
  methods: {
    // Emits a custom 'card-click' event when the card is clicked
    handleClick() {
      this.$emit('card-click', this.cardName); // Emit the card's name for identification
    },
  },
};
</script>

<style scoped>
/*
 * Note: 'rounded-4xl' is not a standard Tailwind class.
 * I've used 'rounded-3xl' (24px) as the largest standard option.
 * If you have a custom Tailwind config with 'rounded-4xl',
 * ensure it's defined there.
 */

/* No additional scoped CSS needed if using Tailwind for all styles */
</style>