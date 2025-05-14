<template>
  <span class="text-xs w-fit h-fit px-2 py-1 bg-zinc-700 rounded-md text-zinc-300 uppercase tracking-wide">
    {{ label }}
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    }
  }
}
</script>