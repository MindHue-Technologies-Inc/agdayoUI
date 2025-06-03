<template>
  <transition name="toast">
    <div
        v-if="visible"
        class=""
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
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
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
      visible: false,
    };
  },
  computed: {
    baseClasses() {
      return 'transition-all duration-300 ease-out z-50 max-w-xs w-full p-4 rounded-3xl';
    },
    positionClasses() {
      return 'bottom-4 right-4';
    },
    variantClasses() {
      switch (this.variant) {
        case 'success':
          return 'bg-emerald-500 text-white shadow-success-dark-md border-success-dark-xs';
        case 'error':
          return 'bg-rose-600 text-white shadow-danger-dark-md border-danger-dark-xs';
        case 'info':
          return 'bg-sky-500 text-white shadow-info-dark-md border-info-dark-xs';
        case 'warning':
          return 'bg-amber-500 text-black shadow-warning-dark-md border-warning-dark-xs';
        default:
          return '';
      }
    },
  },
  methods: {
    hideToast(duration) {
      setTimeout(() => this.visible = false, duration); // Emit closed event after the fade out
    },
    showToast() {
      this.visible = true
      this.hideToast(this.duration)
    }
  },
  mounted() {
    setTimeout(this.hideToast, this.duration);
  },
};
</script>
