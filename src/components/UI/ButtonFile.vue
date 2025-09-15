<template>
  <button
      type="button"
      :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      customClass,
      disabled || loading ? 'active:scale-100' : '',
    ]"
      :disabled="disabled || loading"
      @click="triggerFilePicker"
  >
    + Add Photos
  </button>

  <input
      type="file"
      ref="fileInputRef"
      class="hidden"
      accept="image/*"
      :multiple="true"
      @change="handleFileChange"
  />
</template>


<script>
export default {
  name: 'Button',
  emits: ['addPhotos'],
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'submit', 'reset'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'danger', 'ghost', 'google'].includes(val),
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
          return 'text-sm px-3 py-2';
        case 'lg':
          return 'text-lg px-6 py-4';
        default: // 'md'
          return 'text-base px-4 py-3';
      }
    },

    variantClasses() {
      switch (this.variant) {
        case 'primary':
          // Branded peach action
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          // Neutral modern tone (grayish)
          return 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-secondary-sm border-secondary-xs';
        case 'danger':
          // Softer red tone, not too loud
          return 'bg-rose-500 text-white hover:bg-rose-600 shadow-danger-sm border-danger-xs';
        case 'ghost':
          // Peach outline/ghost style
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        case 'google':
          // DARK BUTTON
          return 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        default:
          return '';
      }
    }
  },
  methods: {
    triggerFilePicker() {
      this.$refs.fileInputRef.click();
    },

    handleFileChange(event) {
      const target = event.target
      const files = target.files
      this.$emit('addPhotos', Array.from(files))
    }
  }
};
</script>
