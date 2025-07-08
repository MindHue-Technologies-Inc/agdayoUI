<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="ml-6 text-sm font-medium text-zinc-900">
      {{ label }}
    </label>
    <div class="relative">
      <button
          :id="id"
          type="button"
          :disabled="disabled"
          :class="[
            baseClasses,
            prefix || prefixIcon ? 'pl-12' : 'pl-6',
            suffix || suffixIcon ? 'pr-12' : 'pr-6',
            disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
            customClass
          ]"
          @click="toggleOptions"
          @blur="handleBlur"
      >
        <div
            v-if="prefix"
            class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10"
        >
          {{ prefix }}
        </div>
        <div v-if="prefixIcon" class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10">
          <i :class="prefixIcon"></i>
        </div>

        <span :class="{ 'text-zinc-500': !displayValue }">
          {{ displayValue || placeholder }}
        </span>

        <div
            class="absolute right-0 top-0 pr-3 flex items-center h-full text-zinc-500 dark:text-zinc-400 pointer-events-none z-10"
        >
          <span v-if="suffix">{{ suffix }}</span>
          <i v-else :class="`ph ph-${suffixIcon}`"></i>
        </div>
      </button>

      <div
          v-if="showOptions && options.length > 0"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
      >
        <ul role="listbox">
          <li
              v-for="(option, index) in options"
              :key="option[optionValue]"
              :class="[
                'px-4 py-2 cursor-pointer hover:bg-peach-100',
                {'bg-peach-100': option[optionValue] === modelValue} // Highlight selected
              ]"
              @mousedown.prevent="selectOption(option)"
          >
            {{ option[optionLabel] }}
          </li>
        </ul>
      </div>
      <div v-else-if="showOptions && options.length === 0 && !disabled"
           class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 p-4 text-zinc-500 text-center">
        No options available
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Select2',
  props: {
    modelValue: {
      type: [String, Number, null], // The currently selected value
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    label: String,
    placeholder: {
      type: String,
      default: 'Select an option',
    },
    options: {
      type: Array,
      required: true, // Format: [{ label: 'Option Display', value: 'option_value' }]
    },
    optionLabel: {
      type: String,
      default: 'label' // Key for the display text of an option
    },
    optionValue: {
      type: String,
      default: 'value' // Key for the actual value of an option
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
      default: '', // Not typically used for a pure select, but kept for consistency
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showOptions: false,
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full py-3 text-base rounded-full border-secondary-xs
        text-zinc-800 text-left
        bg-white!
        shadow-secondary-sm focus:ring-0 focus:outline-none
        relative flex items-center
      `;
    },
    suffixIcon() {
      // Rotate caret-down based on showOptions state for visual feedback
      return this.showOptions ? 'caret-up' : 'caret-down';
    },
    displayValue() {
      // Find the selected option based on modelValue and return its label
      const selectedOption = this.options.find(
          option => option[this.optionValue] === this.modelValue
      );
      return selectedOption ? selectedOption[this.optionLabel] : null;
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.$emit('update:modelValue', option[this.optionValue]);
      this.showOptions = false; // Close dropdown after selection
    },
    handleBlur() {
      // Delay closing to allow click on option
      setTimeout(() => {
        this.showOptions = false;
      }, 150);
    },
  },
};
</script>

<style scoped>
/*
 * Styles from the original component that are still relevant.
 * The `input[type="text"]` specific styles are no longer needed here.
 */

/* Custom scrollbar styles if needed for the options div */
.max-h-60::-webkit-scrollbar {
  width: 8px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>