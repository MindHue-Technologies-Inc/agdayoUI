<template>
  <span class="text-xs w-fit h-fit px-2 py-1 !text-peach-700 rounded-md bg-peach-200 uppercase tracking-wide">
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