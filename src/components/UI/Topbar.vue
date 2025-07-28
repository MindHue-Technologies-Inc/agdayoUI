<template>
  <div class="relative flex flex-row justify-center w-full">
    <!-- BACK BUTTON -->
    <div @click="goBack" v-if="!hideBackButton" :class="[
        'flex items-center justify-center ',
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

    <div :class="[
        'flex items-center justify-center ',
         'text-2xl transition rounded-full ',
          'bg-none hover:text-zinc-500 cursor-pointer',
          'absolute right-0 bg-zinc-200 aspect-square border-2 border-zinc-300',
          'overflow-hidden h-8 w-8'
    ]">
      <img v-if="photoURL" :src="photoURL" alt="">
      <i v-else class="ph ph-user"></i>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../../stores/auth.js";
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

  data() {
    return {
      useAuth: useAuthStore.get()
    }
  },

  computed: {
    photoURL() {
      return this.useAuth.user?.user?.photoURL
    }
  },

  methods: {
    goBack() {
      window.history.back();
    },
  }
}
</script>