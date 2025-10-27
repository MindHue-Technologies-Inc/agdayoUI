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

    <!-- USER PROFILE PHOTO / ICON -->
    <div @click="redirectToProfile()" :class="[
        'flex items-center justify-center ',
         'text-2xl transition rounded-full ',
          'bg-none hover:text-zinc-500 cursor-pointer',
          'absolute right-0 bg-zinc-200 aspect-square border-2 border-zinc-300',
          'overflow-hidden h-8 w-8'
    ]">
      <!-- Use the prop directly for the photo URL -->
      <img v-if="photoURL" :src="photoURL" alt="User Profile Photo">
      <i v-else class="ph ph-user"></i>
    </div>
  </div>
</template>

<script>
// We no longer need to import the useAuthStore here
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBackButton: {
      type: Boolean,
      default: false
    },
    // Add a prop for the user's photo URL
    photoURL: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      // The store is no longer needed in the component's data
    }
  },

  computed: {
    // The photoURL is now a prop, so this computed property is no longer necessary
  },

  methods: {
    goBack() {
      window.history.back();
    },

    redirectToProfile() {
      window.location.href = '/user-profile'
    }
  }
}
</script>
