<template>
  <div class="flex flex-col grow items-center justify-center gap-4">
    <i class="ph ph-island text-8xl text-zinc-400"></i>
    <span class="font-medium text-zinc-400">No Active or Upcoming Trip</span>
    <div class="flex flex-col gap-1 items-center justify-center">
      <Anchor href="/create-trip" class="text-xl">Start Planning your Trip</Anchor>
      <span>or</span>
      <span class="text-xl">
        Use
        <a href="/ai" class="p-1 rounded-lg bg-white transition border border-zinc-200 scale-100 active:scale-95 hover:scale-105">
          <span class="font-medium bg-gradient-to-r from-[#eea092] to-[#eabf67] text-transparent bg-clip-text">
            Agdayo AI
          </span>
        </a>
        to help you plan your Trip!
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Anchor from "@/shared/components/UI/Anchor.vue";
</script>
