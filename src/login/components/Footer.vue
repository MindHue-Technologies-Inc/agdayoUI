<template>
  <div class="flex items-center justify-between text-[#BEBEBE] text-[12px]">
    <span>© MindHue Technologies {{ year }}  </span>

    <!-- CREDITS -->
    <span>{{ credits }}</span>
  </div>
</template>

<script>
export default {
  props: {
    credits: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>