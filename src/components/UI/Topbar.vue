<template>
  <div class="relative flex flex-row justify-center w-full">
    <!-- BACK BUTTON -->
    <div @click="goBack" v-if="!hideBackButton" :class="[
        'flex place-content-center ',
         'text-2xl transition rounded-full p-1 ',
          'bg-none hover:text-peach-500 cursor-pointer',
          'absolute left-0 inset-y-0'
    ]">
      <i class="ph ph-caret-left"></i>
    </div>

    <!-- TITLE -->
    <div>
      <span class="text-xl font-bold">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBackButton: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    goBack() {
      window.history.back();
    },
  }
}
</script>