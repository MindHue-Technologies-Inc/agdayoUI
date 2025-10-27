<template>
  <div class="flex items-center gap-2">
    <!-- Actual checkbox input -->
    <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
        'rounded-md border-secondary-xs text-primary shadow-secondary-sm',
        'focus:ring-0 focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        customClass
      ]"
        @change="$emit('update:modelValue', $event.target.checked)"
    />

    <!-- Optional label displayed beside the checkbox -->
    <label
        v-if="label"
        :for="id"
        class="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
        :class="labelClass"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: {
    // v-model support
    modelValue: {
      type: Boolean,
      default: false,
    },
    // ID is required for input-label association
    id: {
      type: String,
      required: true,
    },
    // Optional label text beside checkbox
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: ''
    },
    // Whether the checkbox is disabled
    disabled: {
      type: Boolean,
      default: false,
    },
    // Whether the checkbox is required
    required: {
      type: Boolean,
      default: false,
    },
    // Optional custom class for styling the checkbox
    customClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
/* Custom checkbox styles */
input[type="checkbox"]:checked + span svg {
  display: block;
}
</style>
