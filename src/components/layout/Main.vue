<template>
  <Loader v-if="loading"/>
  <Transition name="fade">
    <div class="w-full grow flex relative">
      <div class=" w-full flex justify-center">
        <div
            v-if="!loading"
            :class="['mt-0 flex flex-col py-4 md:w-[60rem] w-screen md:px-0 px-2', customClass]"
        >
          <slot/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Loader from '../UI/Loader.vue';

export default {
  components: {
    Loader
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    }
  }
}
</script>
