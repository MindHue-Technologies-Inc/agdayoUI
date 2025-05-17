<template>
  <Loader v-if="loading"/>
  <Transition name="fade">
    <div
      v-if="!loading"
      :class="['2xl:mt-0 mt-14 flex flex-col py-4 lg:w-[60rem] w-screen lg:px-0 px-1', customClass]"
    >
      <slot/>
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
      required: true,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    }
  }
}
</script>
