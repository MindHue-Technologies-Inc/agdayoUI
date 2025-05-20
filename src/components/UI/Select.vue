<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="ml-6 text-sm font-medium text-zinc-900">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <!-- Prefix Element -->
      <div 
        v-if="prefix" 
        class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400"
      >
        {{ prefix }}
      </div>

<!--      PREFIX ICON-->
      <div v-if="prefixIcon" class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400">
        <i :class="prefixIcon"></i>
      </div>

      <select
        :id="id"
        :disabled="disabled"
        :class="[
          baseClasses,
          prefix ? 'pl-12' : '',
          prefixIcon ? 'pl-12' : '',
          suffix || suffixIcon ? 'pr-12' : '',
          disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
          customClass
        ]"
        v-model="internalValue"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option[optionValue]" :value="option[optionValue]">
          {{ option[optionLabel] }}
        </option>
      </select>

      <!-- Suffix Icon -->
      <div 
        v-if="suffix || suffixIcon" 
        class="absolute right-0 pr-3 flex items-center text-zinc-500 dark:text-zinc-400 pointer-events-none"
      >
        <span v-if="suffix">{{ suffix }}</span>
        <i v-else :class="`ph ph-${suffixIcon}`"></i>
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    label: String,
    placeholder: String,
    options: {
      type: Array,
      required: true, // Format: [{ label: 'Option', value: 'value' }]
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      required: true,
      default: 'value'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  computed: {
    baseClasses() {
      return `
        w-full px-6 py-3 text-base rounded-full border-secondary-xs
        text-zinc-800
        bg-white!
        shadow-secondary-sm focus:ring-0 focus:outline-none
      `;
    },
    suffixIcon() {
      return 'caret-down';
    },
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  }
};
</script>

<style scoped>
select {
  appearance: none;
  background-color: transparent;
  background-image: none;
}
</style>
