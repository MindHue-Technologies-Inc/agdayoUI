<template>
  <button
    :type="type"
    :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      customClass,
      disabled || loading ? 'active:scale-100' : '',
    ]"
    :disabled="disabled || loading"
    @click="$emit('clicked', $event)"
  >
    <!-- Content layer with text color transition -->
    <span class="relative flex justify-between items-center gap-2 w-full">
      <slot v-if="!loading" />
      <i v-else class=" animate-spin ph ph-spinner flex items-center justify-center" :class="[{'!text-[28px]': size=='lg'}, {'!text-[24px]': size=='md'}, {'!text-[20px]': size=='sm'}]"></i>
    </span>
  </button>
</template>


<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'submit', 'reset'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'danger', 'ghost'].includes(val),
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    baseClasses() {
      return 'relative px-8 font-bold duration-100 transition cursor-pointer overflow-hidden group active:scale-95 rounded-full';
    },

    sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'text-sm px-3 py-1.5';
        case 'lg':
          return 'text-lg px-6 py-3';
        default: // 'md'
          return 'text-base px-4 py-2';
      }
    },
    
    variantClasses() {
      switch (this.variant) {
        case 'primary':
          // Branded peach action
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          // Neutral modern tone (grayish)
          return 'bg-zinc-700 text-white hover:bg-zinc-600';
        case 'danger':
          // Softer red tone, not too loud
          return 'bg-rose-500 text-white hover:bg-rose-600';
        case 'ghost':
          // Peach outline/ghost style
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        default:
          return '';
      }
    }
  },
};
</script>
