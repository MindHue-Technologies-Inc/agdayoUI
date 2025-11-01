<template>
  <div
      class="card-container"
      :class="[
      'p-4 md:p-6 flex flex-col gap-2 transition-colors',
      'w-full overflow-hidden rounded-2xl',
      'border-secondary-xs shadow-secondary-sm',
      backgroundClass,
      customClass
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    variant: {
      type: String,
      default: 'default', // other options: 'transparent', 'subtle', etc.
    },
    size: {
      type: String,
      default: 'default',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'asdf':
          return '';
        default:
          return '  '
      }
    },

    backgroundClass() {
      switch (this.variant) {
        case 'transparent':
          return 'bg-transparent';
        case 'subtle':
          return 'bg-zinc-100 dark:bg-zinc-900';
        case 'dotted':
          return 'dotted-bg';
        default:
          return 'bg-white rounded-4xl';
      }
    },
    borderClass() {
      return 'border-secondary-xs';
    },
  },
};
</script>

<style scoped>
.card-container {
  position: relative;
  z-index: 1;
}
</style>