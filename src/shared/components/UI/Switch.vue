<template>
  <div
    class="w-12 rounded-full h-6 flex items-center bg-white  p-1 cursor-pointer transition-all duration-300"
    :class="{ '!bg-peach-500 border-primary-xs shadow-primary-xs': modelValue, 'border-secondary-xs shadow-secondary-sm': !modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div
      class="rounded-full w-4 h-4 bg-zinc-400 shadow-md transform transition-transform duration-300"
      :class="{ 'translate-x-6': modelValue, 'translate-x-0': !modelValue, '!bg-peach-900': modelValue }"
    />
  </div>
</template>

<script>
export default {
  name: "Switch",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
