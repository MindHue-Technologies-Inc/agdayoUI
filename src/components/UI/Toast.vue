<template>
  <div
    v-if="visible"
    class="z-50 max-w-xs w-full p-4  shadow-lg"
    :class="[
      baseClasses,
      variantClasses,
      positionClasses,
      customClass,
      { 'opacity-100': visible, 'opacity-0': !visible, 'transition-opacity duration-300 ease-in-out': true }
    ]"
    @click="hideToast"
  >
    <!-- Toast content -->
    <div class="relative flex justify-between items-center gap-2">
      <span class="text-white">{{ message }}</span>

      <button class="cursor-pointer h-6 w-6" @click="hideToast">
        <i class="ph ph-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'success',
      validator: (val) => ['success', 'error', 'info', 'warning'].includes(val),
    },
    duration: {
      type: Number,
      default: 5000, // duration in ms
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    baseClasses() {
      return 'transition-all duration-300 ease-out';
    },
    positionClasses() {
      return 'bottom-4 right-4';
    },
    variantClasses() {
      switch (this.variant) {
        case 'success':
          return 'bg-emerald-500 text-white';
        case 'error':
          return 'bg-red-600 text-white';
        case 'info':
          return 'bg-blue-500 text-white';
        case 'warning':
          return 'bg-yellow-500 text-black';
        default:
          return '';
      }
    },
  },
  methods: {
    hideToast() {
      this.visible = false;
      setTimeout(() => this.$emit('closed'), 300); // Emit closed event after the fade out
    },
  },
  mounted() {
    setTimeout(this.hideToast, this.duration);
  },
};
</script>

<style scoped>
/* Toast entry and exit animation */
.toast-enter-active, .toast-leave-active {
  transition: opacity 0.3s ease;
}
.toast-enter, .toast-leave-to /* .toast-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
