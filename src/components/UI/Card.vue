<template>
  <div
    class="card-container"
    :class="[
      'border p-6 flex flex-col gap-4 transition-colors',
      backgroundClass,
      borderClass,
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
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    backgroundClass() {
      switch (this.variant) {
        case 'transparent':
          return 'bg-transparent';
        case 'subtle':
          return 'bg-zinc-100 dark:bg-zinc-900';
        case 'dotted':
          return 'dotted-bg';
        default:
          return 'bg-white rounded-3xl';
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