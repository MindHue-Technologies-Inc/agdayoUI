<template>
  <div class="flex flex-nowrap gap-2 md:gap-4">
    <AgdayoCard class="fadeIn fadeIn-0" custom-class="flex flex-col items-start justify-between relative">
      <div class="flex flex-col items-start justify-between">
        <span class="font-medium text-normal md:text-lg text-zinc-700">Active Trips</span>
        <span class="font-bold text-4xl md:text-6xl">{{ activeCount }}</span>
      </div>
      <span class="text-xs text-zinc-400 mt-4">With 4 upcoming activities</span>
      <i class="ph ph-airplane-tilt text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
    </AgdayoCard>

    <AgdayoCard class="fadeIn fadeIn-1" custom-class="flex flex-col items-start justify-between relative">
      <div class="flex flex-col items-start justify-between">
        <span class="font-medium text-normal md:text-lg text-zinc-700">Upcoming Trips</span>
        <span class="font-bold text-4xl md:text-6xl">{{ upcomingCount }}</span>
      </div>
      <span class="text-xs text-zinc-400 mt-4">Planned Adventures</span>
      <i class="ph ph-calendar-dots text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
    </AgdayoCard>

    <AgdayoCard class="fadeIn fadeIn-2 hidden md:flex" custom-class="flex flex-col items-start justify-between relative">
      <div class="flex flex-col items-start justify-between">
        <span class="font-medium text-normal md:text-lg text-zinc-700">Companions</span>
        <span class="font-bold text-4xl md:text-6xl">{{ companionsCount }}</span>
      </div>
      <span class="text-xs text-zinc-400 mt-4">Currently on active trips</span>
      <i class="ph ph-users text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"></i>
    </AgdayoCard>
  </div>
</template>

<script setup lang="ts">
import AgdayoCard from "./AgdayoCard.vue";

defineProps<{
  activeCount: number;
  upcomingCount: number;
  companionsCount: number;
}>();
</script>
