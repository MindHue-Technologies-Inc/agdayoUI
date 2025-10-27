<template>
  <div class="flex flex-col items-center justify-start gap-2">
    <span class="font-medium text-zinc-700 whitespace-nowrap">{{ time }}</span>

    <div
        class="w-3.5 h-3.5 bg-peach-500 rounded-full flex-shrink-0 relative z-[1] border-2 border-peach-300 shadow-sm"
    ></div>

    <div v-if="!isLast" class="grow border-l-2 border-peach-200 -mt-1 w-0.5"></div>
  </div>
</template>

<script>
export default {
  name: 'TimelineDot',
  props: {
    time: {
      type: String,
      required: true,
      default: 'HH:MM AM/PM' // Default time display
    },
    isLast: {
      type: Boolean,
      default: false // By default, assume there are more items, so show the line
    }
  }
};
</script>

<style scoped>
/* No specific scoped styles needed if only using Tailwind classes */
</style>