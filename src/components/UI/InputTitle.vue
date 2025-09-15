<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-zinc-900 text-sm font-medium">
      {{ label }}
    </label>
    <textarea
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="false"
        class="w-full text-[2rem] bg-transparent font-medium outline-none focus:outline-none text-zinc-800 disabled:text-zinc-400"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'NewInput',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
}
</script>
