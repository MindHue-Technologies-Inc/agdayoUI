<template>
  <div
    class="w-12 h-6 flex items-center bg-zinc-700 p-1 cursor-pointer transition-all duration-300"
    :class="{ '!bg-emerald-500': modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div
      class="w-4 h-4 bg-white shadow-md transform transition-transform duration-300"
      :class="{ 'translate-x-6': modelValue, 'translate-x-0': !modelValue }"
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
