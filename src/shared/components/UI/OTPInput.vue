<template>
  <div class="flex gap-2">
    <input
        v-for="(value, index) in otpValues"
        :key="index"
        :id="`otp-input-${index}`"
        v-model="otpValues[index]"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @paste="handlePaste($event, index)"
        :type="type"
        :maxlength="1"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[
        baseClasses,
        'w-12 py-4 text-center text-xl font-semibold', // Specific OTP sizing and text style
        disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
        customClass // Allow custom class from prop
      ]"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        ref="otpInputs"
    />
  </div>
</template>

<script>
export default {
  // Props received by the component
  props: {
    /**
     * The number of individual OTP input fields.
     */
    length: {
      type: Number,
      default: 6, // Default OTP length to 6 digits
      validator: (val) => val > 0 && val <= 10, // Ensure length is reasonable
    },
    /**
     * The v-model binding for the complete OTP string.
     */
    modelValue: {
      type: String,
      default: '',
    },
    /**
     * Placeholder text for each input field.
     */
    placeholder: {
      type: String,
      default: '0',
    },
    /**
     * Whether all input fields should be disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The type of input field ('text' or 'password' for masking).
     */
    type: {
      type: String,
      default: 'text', // Use 'text' for mobile numeric keyboard, 'password' to mask input
      validator: (value) => ['text', 'password'].includes(value),
    },
    /**
     * Allows adding custom Tailwind classes to the input fields.
     */
    customClass: {
      type: String,
      default: '',
    }
  },
  // Events emitted by the component
  emits: ['update:modelValue', 'complete'],

  data() {
    return {
      // Internal array to hold the value of each individual input field
      otpValues: Array(this.length).fill(''),
    };
  },

  computed: {
    baseClasses() {
      // Replicating styles from your Input component's baseClasses
      return `
        px-1 py-1 text-base rounded-xl border-secondary-xs
        text-zinc-800
        bg-white dark:bg-zinc-900
        shadow-secondary-sm focus:ring-0 focus:outline-none
        transition-all duration-200
      `;
    },
    // Joins the individual OTP digits into a single string
    currentOtp() {
      return this.otpValues.join('');
    }
  },

  watch: {
    // Watch for external changes to modelValue prop
    modelValue: {
      handler(newValue) {
        // Only update internal state if the external modelValue is different
        // from the current joined OTP string to prevent infinite loops.
        if (newValue !== this.currentOtp) {
          // Clear previous values and populate from newValue
          this.otpValues = Array(this.length).fill('');
          for (let i = 0; i < newValue.length && i < this.length; i++) {
            // Use Vue.$set for reactivity when directly assigning to array indices
            this.$set(this.otpValues, i, newValue[i]);
          }
        }
      },
      immediate: true, // Run handler immediately on component mount to initialize
    },
    // Watch for internal changes to otpValues array
    otpValues: {
      handler(newVal) {
        const currentOtp = newVal.join('');
        // Emit 'update:modelValue' for v-model binding
        // Only emit if the current value is different from the modelValue
        // This prevents infinite loops when modelValue is updated internally.
        if (currentOtp !== this.modelValue) {
          this.$emit('update:modelValue', currentOtp);
        }
        // Emit 'complete' event if all fields are filled
        if (currentOtp.length === this.length) {
          this.$emit('complete', currentOtp);
        }
      },
      deep: true, // Crucial for watching changes within the array elements
    },
  },

  methods: {
    /**
     * Handles input events for each individual OTP digit field.
     * Restricts input to a single digit and manages focus.
     */
    handleInput(event, index) {
      const value = event.target.value;

      // Only allow digits (0-9)
      if (!/^\d*$/.test(value)) {
        this.otpValues[index] = ''; // Clear invalid input
        event.preventDefault(); // Prevent default if non-digit entered
        return;
      }

      // Ensure only one character is in the field
      this.otpValues[index] = value.charAt(0);

      // Move focus to the next input if a digit was entered and it's not the last field
      if (this.otpValues[index] && index < this.length - 1) {
        this.focusInput(index + 1);
      }
    },

    /**
     * Handles keydown events for navigation (Backspace) and preventing non-numeric input.
     */
    handleKeydown(event, index) {
      // Move focus to the previous input on Backspace if current field is empty
      if (event.key === 'Backspace' && this.otpValues[index] === '' && index > 0) {
        event.preventDefault(); // Prevent default browser back navigation
        this.focusInput(index - 1);
      }
      // Prevent entering non-numeric characters (except for functional keys like Tab, Enter, Arrows)
      else if (!/^\d$/.test(event.key) && event.key.length === 1 && event.key !== 'Tab' && event.key !== 'Enter') {
        event.preventDefault();
      }
    },

    /**
     * Handles pasting an OTP string into the first input field.
     * Distributes the digits across all fields.
     */
    handlePaste(event) {
      // Only process paste event on the first input field
      if (event.target !== this.$refs.otpInputs[0]) return;

      event.preventDefault(); // Prevent default paste behavior
      const pasteData = event.clipboardData.getData('text').trim();

      // Only proceed if pasted data consists only of digits
      if (!/^\d+$/.test(pasteData)) {
        return;
      }

      // Distribute pasted digits into the OTP fields
      for (let i = 0; i < this.length; i++) {
        if (i < pasteData.length) {
          this.$set(this.otpValues, i, pasteData[i]); // Use $set for reactivity
        } else {
          this.$set(this.otpValues, i, ''); // Clear remaining fields if pasted data is shorter
        }
      }

      // Move focus to the last filled field or the last field if all are filled
      const lastFilledIndex = Math.min(pasteData.length - 1, this.length - 1);
      this.$nextTick(() => {
        this.focusInput(lastFilledIndex);
      });
    },

    /**
     * Focuses on a specific input field by its index.
     */
    focusInput(index) {
      this.$refs.otpInputs[index]?.focus();
    },

    /**
     * Clears all OTP input fields and focuses the first one.
     * This method can be called externally.
     */
    clear() {
      this.otpValues = Array(this.length).fill('');
      this.$nextTick(() => {
        this.focusInput(0);
      });
    },
  },

  mounted() {
    // Optionally focus the first input on component mount, if not disabled
    this.$nextTick(() => {
      if (!this.disabled) {
        this.focusInput(0);
      }
    });
  },
};
</script>

<style scoped>
/* Remove default browser icons for number input type (if used, though text with inputmode is preferred) */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox specific */
}

/* Ensure no default browser outline appears on focus */
input:focus,
input:active {
  outline: none;
}
</style>