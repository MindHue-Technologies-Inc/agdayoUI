<template>
  <div class="flex flex-col gap-1 items-center justify-center">
    <i class="text-zinc-600 animate-spin ph ph-spinner text-4xl flex items-center justify-center"></i>
    <span class="text-zinc-600">{{props.label}}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  }
})

</script>