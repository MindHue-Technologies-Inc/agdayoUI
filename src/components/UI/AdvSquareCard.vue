<template>
  <div
      v-if="mode === 'card'"
      @click="mode = 'full'"
      class="flex bg-white rounded-3xl shadow-secondary-md border-secondary-xs aspect-square overflow-hidden p-4 cursor-pointer"
  >
    <div class="flex flex-col justify-between items-start grow">
      <div>Logo</div>
      <div>Name</div>
    </div>
  </div>

  <Transition name="windows-zoom">
    <div
        v-if="mode === 'full'"
        class="flex bg-white absolute inset-0 items-center justify-center rounded-3xl shadow-secondary-md border-secondary-xs"
    >
      <div
          @click="mode = 'card'"
          class="absolute top-5 right-5 cursor-pointer aspect-square p-2 text-xl items-center justify-center flex"
      >
        <i class="ph ph-x"></i>
      </div>
      <div class="grow text-center">
        HELP
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      mode: 'card',
    };
  },
};
</script>

<style scoped>
/*
 * CSS for the 'windows-zoom' animation, mimicking a Windows-like feel.
 * These classes are automatically added/removed by Vue's <Transition> component.
 */

/* Define common transition properties for entering and leaving */
.windows-zoom-enter-active,
.windows-zoom-leave-active {
  /*
   * Custom cubic-bezier for a "Windows-like" feel:
   * Starts quickly (0,0 to 0.1,0.9), then decelerates significantly (0.2,1 to 1,1).
   * This gives it a quick, decisive snap at the beginning and a smooth finish.
   */
  transition: opacity 0.25s cubic-bezier(0.1, 0.9, 0.2, 1), /* Shorter duration for quickness */
  transform .5s cubic-bezier(0.1, 0.9, 0.2, 1);

  /* Ensure the element is positioned absolutely during the transition */
  /* This prevents layout shifts while it animates */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Starting state for the entering element (full screen mode) */
.windows-zoom-enter-from {
  opacity: 0;
  transform: scale(0.9); /* Starts slightly zoomed out */
}

/* Ending state for the leaving element (full screen mode when it closes) */
.windows-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9); /* Fades out and shrinks slightly as it leaves */
}

/* Final state for entering, and initial state for leaving */
.windows-zoom-enter-to,
.windows-zoom-leave-from {
  opacity: 1;
  transform: scale(1); /* Ends at full size */
}
</style>