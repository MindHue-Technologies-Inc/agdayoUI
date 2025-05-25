<template>
  <component
      :is="tagElement"
      :class="[
          baseClasses,
          variantClasses, // Dynamic color classes
          { 'cursor-pointer': isButtonMode, 'hover:brightness-95 active:brightness-90': isButtonMode } // Button specific styles
    ]"
      @click="handleClick"
  >
    {{ label }}
  </component>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    // Mode prop: 'display' for a simple tag, 'button' for a clickable tag
    mode: {
      type: String,
      default: 'display',
      validator: (value) => ['display', 'button'].includes(value),
    },
    // Variant prop: defines the color scheme
    variant: {
      type: String,
      default: 'peach', // Default to your existing peach color
    },
  },
  computed: {
    // Returns the base class for the tag
    baseClasses() {
      return "text-xs w-fit h-fit px-2 py-1 rounded-md tracking-wide"
    },
    // Determines whether to render as a <span> or <button>
    tagElement() {
      return this.mode === 'button' ? 'button' : 'span';
    },
    // A boolean flag for easy checks if in button mode
    isButtonMode() {
      return this.mode === 'button';
    },
    // Returns the Tailwind CSS classes based on the selected variant
    variantClasses() {
      switch (this.variant) {
        case 'peach':
          return '!text-peach-600 bg-peach-100';
        case 'blue':
          return '!text-cyan-700 bg-cyan-200';
        case 'green':
          return '!text-emerald-700 bg-emerald-200';
        case 'red':
          return '!text-rose-700 bg-rose-200';
        case 'gray':
          return '!text-zinc-700 bg-zinc-200';
        case 'purple':
          return '!text-purple-700 bg-purple-200';
        case 'yellow':
          return '!text-amber-700 bg-amber-200';
        default:
          return '!text-peach-700 bg-peach-200'; // Fallback
      }
    },
  },
  methods: {
    handleClick() {
      // Only emit a click event if the mode is 'button'
      if (this.isButtonMode) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style scoped>
/*
 * No specific scoped CSS needed if you're using Tailwind for all styles.
 * Tailwind's utility classes are sufficient.
 */
</style>