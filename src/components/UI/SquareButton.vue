<template>
  <button
      :type="type"
      :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      isActive ? activeVariantClasses : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      customClass,
      disabled || loading ? 'active:scale-100' : '',
    ]"
      :disabled="disabled || loading"
  >
    <div class="flex flex-col items-center justify-center gap-1">
      <span v-if="loading">
        <i class="ph ph-spinner animate-spin" :class="iconSize"></i>
      </span>
      <span v-else>
        <i :class="[icon, iconSize]"></i>
      </span>
      <span v-if="label" class="text-xs font-medium">{{ label }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'SquareButton',
  props: {
    modelValue: {
      default: '',
    },
    value: {
      default: '',
    },
    type: {
      type: String,
      default: 'button',
      validator: val => ['button', 'submit', 'reset'].includes(val),
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
      validator: val => ['sm', 'md', 'lg'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: val => ['primary', 'secondary', 'danger', 'ghost'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    }
  },
  computed: {
    isActive() {
      if (typeof this.modelValue === 'object') {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.value;
    },
    baseClasses() {
      return 'flex flex-col items-center justify-center font-bold duration-100 transition cursor-pointer overflow-hidden group active:scale-95 rounded-3xl text-center';
    },
    sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'w-14 h-14 text-sm';
        case 'lg':
          return 'w-24 h-24 text-lg';
        default:
          return 'w-20 h-20 text-base';
      }
    },
    iconSize() {
      switch (this.size) {
        case 'sm':
          return 'text-lg';
        case 'lg':
          return 'text-3xl';
        default:
          return 'text-2xl';
      }
    },
    variantClasses() {
      switch (this.variant) {
        case 'primary':
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          return 'bg-white text-zinc-500 hover:bg-zinc-200 shadow-secondary-sm border-secondary-xs';
        case 'danger':
          return 'bg-rose-400 text-white hover:bg-rose-500 shadow-danger-sm border-danger-xs';
        case 'ghost':
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        default:
          return '';
      }
    },
    activeVariantClasses() {
      switch (this.variant) {
        case 'primary':
          return 'ring-2 ring-peach-700 ring-offset-2';
        case 'secondary':
          return 'ring-2! ring-peach-300! ring-offset-2!';
        case 'danger':
          return 'ring-2 ring-rose-700 ring-offset-2';
        case 'ghost':
          return 'bg-peach-100 border-peach-600 text-peach-800';
        default:
          return '';
      }
    }
  }
};
</script>
