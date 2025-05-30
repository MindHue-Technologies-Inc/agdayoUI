<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="ml-6 text-sm font-medium text-zinc-900">
      {{ label }}
    </label>
    <div class="relative">
      <div
          v-if="prefix"
          class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10"
      >
        {{ prefix }}
      </div>

      <div v-if="prefixIcon" class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10">
        <i :class="prefixIcon"></i>
      </div>

      <input
          :id="id"
          type="text"
          :disabled="disabled"
          :placeholder="placeholder"
          autocomplete="off"
          :class="[
            baseClasses,
            prefix || prefixIcon ? 'pl-12' : 'pl-6',
            suffix || suffixIcon ? 'pr-12' : 'pr-6',
            disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
            customClass
          ]"
          v-model="searchTerm"
          @focus="showOptions = true"
          @input="filterOptions"
          @blur="handleBlur"
          @keydown.up.prevent="highlightPrevious"
          @keydown.down.prevent="highlightNext"
          @keydown.enter.prevent="selectHighlighted"
      />

      <div
          v-if="showOptions && filteredOptions.length > 0"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
      >
        <ul role="listbox">
          <li
              v-for="(option, index) in filteredOptions"
              :key="option[optionValue]"
              :class="[
              'px-4 py-2 cursor-pointer hover:bg-peach-100',
              {'bg-peach-100': index === highlightedIndex}
            ]"
              @mousedown.prevent="selectOption(option)"
          >
            {{ option[optionLabel] }}
          </li>
        </ul>
      </div>
      <div v-else-if="showOptions && searchTerm && filteredOptions.length === 0"
           class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 p-4 text-zinc-500 text-center">
        No results found for "{{ searchTerm }}"
      </div>

      <div
          class="absolute right-0 top-0 pr-3 flex items-center h-full text-zinc-500 dark:text-zinc-400 pointer-events-none z-10"
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
  name: 'Select', // Renaming this to Combobox or Autocomplete would be more accurate now!
  props: {
    modelValue: {
      type: [String, Number, null], // Allow null for initial empty state
      default: null,
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
  emits: ['update:modelValue'],
  data() {
    return {
      searchTerm: '',
      showOptions: false,
      filteredOptions: [],
      highlightedIndex: -1, // For keyboard navigation
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full py-3 text-base rounded-full border-secondary-xs
        text-zinc-800
        bg-white!
        shadow-secondary-sm focus:ring-0 focus:outline-none
      `;
    },
    suffixIcon() {
      return 'caret-down'; // Keeps the dropdown arrow icon
    },
  },
  watch: {
    // When modelValue changes from outside, update searchTerm to reflect the selected option's label
    modelValue: {
      immediate: true, // Run on component mount
      handler(newValue) {
        if (newValue !== null && newValue !== undefined) {
          const selectedOption = this.options.find(
              option => option[this.optionValue] === newValue
          );
          if (selectedOption) {
            this.searchTerm = selectedOption[this.optionLabel];
          }
        } else {
          this.searchTerm = ''; // Clear search term if modelValue is null/undefined
        }
      }
    },
    // When options change, refilter them
    options: {
      handler() {
        this.filterOptions();
      },
      immediate: true, // Also run on component mount
    },
    // Watch showOptions to reset highlightedIndex when dropdown closes
    showOptions(newVal) {
      if (!newVal) {
        this.highlightedIndex = -1;
      }
    }
  },
  methods: {
    filterOptions() {
      this.highlightedIndex = -1; // Reset highlight on new input
      if (this.searchTerm.trim() === '') {
        this.filteredOptions = this.options;
      } else {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredOptions = this.options.filter(option =>
            option[this.optionLabel].toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    },
    selectOption(option) {
      this.searchTerm = option[this.optionLabel];
      this.$emit('update:modelValue', option[this.optionValue]);
      this.showOptions = false;
    },
    handleBlur() {
      // Delay closing to allow click on option
      setTimeout(() => {
        this.showOptions = false;
        // If the current search term doesn't match an existing option, clear the modelValue
        const matchedOption = this.options.find(
            option => option[this.optionLabel] === this.searchTerm
        );
        if (!matchedOption) {
          this.$emit('update:modelValue', this.searchTerm); // Or '' depending on preferred empty state
        }
      }, 150); // Small delay
    },
    highlightPrevious() {
      if (!this.showOptions) {
        this.showOptions = true;
        this.highlightedIndex = this.filteredOptions.length - 1; // Start from last if closed
      } else if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      } else {
        this.highlightedIndex = this.filteredOptions.length - 1; // Wrap around
      }
      this.scrollIntoView();
    },
    highlightNext() {
      if (!this.showOptions) {
        this.showOptions = true;
        this.highlightedIndex = 0; // Start from first if closed
      } else if (this.highlightedIndex < this.filteredOptions.length - 1) {
        this.highlightedIndex++;
      } else {
        this.highlightedIndex = 0; // Wrap around
      }
      this.scrollIntoView();
    },
    selectHighlighted() {
      if (this.highlightedIndex !== -1 && this.filteredOptions[this.highlightedIndex]) {
        this.selectOption(this.filteredOptions[this.highlightedIndex]);
      } else if (this.searchTerm.trim() !== '' && this.filteredOptions.length === 1) {
        // If only one option left and user presses enter, select it
        this.selectOption(this.filteredOptions[0]);
      }
    },
    scrollIntoView() {
      this.$nextTick(() => {
        const highlighted = this.$el.querySelector('.bg-peach-100');
        if (highlighted) {
          highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }
  },
  mounted() {
    this.filterOptions(); // Initial filtering on mount
  }
};
</script>

<style scoped>
/*
 * Base styling for the input field.
 * `appearance: none` and `background-image: none` were relevant for `<select>`,
 * but for `<input type="text">`, they are less critical.
 * The important part is to ensure default browser styles don't interfere
 * with your custom prefix/suffix icon positioning.
 */
input[type="text"] {
  /* Remove default browser styling for input to ensure consistent appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none; /* Ensure no default dropdown arrow on some browsers */
}

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