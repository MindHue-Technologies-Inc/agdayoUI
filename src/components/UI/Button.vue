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
    <!-- Background hover layer -->
    <div 
      class="absolute inset-0 w-0 h-full bg-black transition-all duration-300 ease-out group-hover:w-full z-0"
    ></div>

    <!-- Content layer with text color transition -->
    <span class="relative flex justify-between items-center gap-2 w-full z-10 transition-colors duration-300 group-hover:text-white">
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
      return 'relative font-medium transition-colors duration-200 cursor-pointer overflow-hidden group active:scale-95';
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
          // Previously "secondary" styles
          return 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300';
        case 'secondary':
          // Darker version of secondary
          return 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700';
        case 'danger':
          return 'bg-red-600 text-white hover:bg-red-700';
        case 'ghost':
          return 'text-zinc-700 border border-zinc-700 !bg-black hover:bg-zinc-100';
        default:
          return '';
      }
    }
  },
};
</script>
