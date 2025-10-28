<template>
  <div
      class="text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm"
      :class="dateClass(theme)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ theme: string }>()

function dateClass(theme:string) {
  switch (theme) {
    case 'peach':
      return 'bg-peach-100 text-peach-600';
    case 'blue':
      return 'bg-sky-100 text-sky-600';
    case 'amber':
      return 'bg-amber-100 text-amber-600';
    case 'emerald':
      return 'bg-emerald-100 text-emerald-600';
    case 'purple':
      return '!text-purple-700 bg-purple-200';
    default:
      return 'bg-peach-100 text-peach-600';
  }
}
</script>
