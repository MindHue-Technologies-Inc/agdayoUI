<template>
  <div class="relative inline-block text-left" >
    <!-- Trigger button -->
    <button
      :class="[
        baseClasses,
        sizeClasses,
        variantClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        'group relative w-full flex items-center justify-between',
        customClass
      ]"
      :disabled="disabled"
      @click="toggle()"
    >
      <span><slot name="trigger">Dropdown</slot></span>
      <svg
        class="ml-2 h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <transition name="fade">
      <div
        v-if="open"
        class="absolute mt-2 z-20 w-full shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700"
      >
        <ul class="py-1 text-sm text-zinc-700 dark:text-zinc-200">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="handleSelect(item)"
            class="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    items: {
      type: Array,
      required: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'ghost'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    handleSelect(item) {
      this.$emit('select', item);
      this.open = false;
    },
  },
  computed: {
    baseClasses() {
      return 'font-medium transition-colors duration-200 cursor-pointer overflow-hidden';
    },
    sizeClasses() {
      switch (this.size) {
        case 'sm': return 'text-sm px-3 py-1.5';
        case 'lg': return 'text-lg px-6 py-3';
        default:   return 'text-base px-4 py-2';
      }
    },
    variantClasses() {
      switch (this.variant) {
        case 'primary':
          return 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300';
        case 'secondary':
          return 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700';
        case 'ghost':
          return 'bg-transparent text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
