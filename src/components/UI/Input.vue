<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="ml-6 text-sm font-medium text-zinc-900">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <!-- Prepend/Prefix Element -->
      <div
        v-if="prefix"
        class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400"
      >
        {{ prefix }}
      </div>
      <div v-if="prefixIcon" class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400">
        <i :class="prefixIcon"></i>
      </div>

      <input
        :id="id"
        :step="type==='number' ? step : null"
        autocomplete="off"
        :type="formatCommas ? 'text' : type"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          baseClasses,
          prefix ? 'pl-12' : '',
          prefixIcon ? 'pl-12' : '',
          suffix ? 'pr-12' : '',
          disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
          customClass
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="preventInvalidChars"
        @click="selectAllText"
      />

      <!-- Suffix/Append Element -->
      <div
        v-if="suffix || suffixIcon"
        class="absolute right-0 pr-3 flex items-center text-zinc-500 dark:text-zinc-400 cursor-default"
        @click="handleSuffixClick"
      >
        <span v-if="suffix">{{ suffix }}</span>
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    label: String,
    placeholder: String,
    id: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
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
    step: {
      type: Number,
      default: 2
    },
    suffix: {
      type: String,
      default: '',
    },
    formatCommas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full px-6 py-3 text-base rounded-full border-secondary-xs
        text-zinc-800
        bg-white dark:bg-zinc-900
        shadow-secondary-sm focus:ring-0 focus:outline-none
      `;
    },
    displayValue() {
      // Format with commas only if not focused and the value is a number
      if (this.formatCommas && !this.focused && this.modelValue && !isNaN(Number(this.modelValue))) {
        return this.addCommas(this.modelValue);
      }
      return this.modelValue;
    },

    suffixIcon() {
      switch (this.type) {
        case 'date':
          return 'calendar';
        case 'time':
          return 'clock';
        case 'number':
          return 'number-square';
        case 'search':
          return 'magnifying-glass';
        case 'email':
          return 'envelope-simple';
        default:
          return '';
      }
    },
  },
  methods: {
    selectAllText(event) {
      event.target.select();
    },
    handleSuffixClick() {
      if (this.type === 'date') {
        this.$el.querySelector('input')?.showPicker?.();
      }
    },
    handleInput(event) {
      let value = event.target.value;

      if (this.formatCommas) {
        value = value.replace(/,/g, '');

        // Only allow numeric characters, optional negative, and one decimal
        if (this.type === 'number') {
          // Prevent multiple dots or multiple minus signs
          const validPattern = /^-?\d*(\.\d*)?$/;
          if (!validPattern.test(value)) return;
        }
      }

      this.$emit('update:modelValue', value);
    },

    handleBlur() {
      this.focused = false;

      if (this.formatCommas && this.modelValue && !isNaN(Number(this.modelValue))) {
        this.$emit('update:modelValue', this.modelValue); // Ensures external model stays updated
      }
    },

    handleFocus() {
      this.focused = true;
    },
    addCommas(value) {
      // Convert to string and handle both string and number inputs
      const stringValue = String(Number(value));

      // Split by decimal point
      const parts = stringValue.split('.');

      // Add commas to the integer part
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // Rejoin with decimal part if it exists
      return parts.join('.');
    },

    preventInvalidChars(e) {
      if (this.type !== 'number') return;

      // Allow Ctrl+A / Cmd+A
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') return;

      const allowedKeys = [
        'Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'Delete',
        '-', '.', // for negative and decimal
      ];

      if (
        (e.key >= '0' && e.key <= '9') ||
        allowedKeys.includes(e.key)
      ) {
        return; // allow
      }

      e.preventDefault(); // block everything else
    }
  }
};
</script>

<style>
input::-ms-reveal {
  filter: invert(80%);
}

/* Remove default browser icons */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* Remove outline for all states */
input:focus,
input:active {
  outline: none;
}
</style>