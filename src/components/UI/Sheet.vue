<template>
  <Transition name="ios-sheet-slide">
    <div
        v-if="modelValue"
        class="fixed inset-0 z-[999] flex items-end justify-center" @click.self="closeSheet"
    >
      <Transition name="ios-sheet-slide">
        <div
            v-if="modelValue"
            ref="sheetContent"
            class="bg-white rounded-t-3xl border-secondary-sm shadow-secondary-md md:min-w-[48rem] min-w-full max-w-lg min-h-[90%] max-h-[90%] flex flex-col" :style="{
              'max-height': maxHeight,
              transform: `translateY(${dragOffsetY}px)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }"
            @click.stop
        >
          <div
              class="w-full py-2 flex items-center justify-center flex-shrink-0" @touchstart.stop="startDrag" @mousedown.stop="startDrag"
          >
            <div
                v-if="showHandle"
                class="w-10 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 mb-2 cursor-grab"
            >
            </div>
          </div>

          <div class="overflow-y-auto flex-grow"> <div class="p-6">
            <slot></slot>
          </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'IOSSheet',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: String,
      default: '90vh'
    },
    showHandle: {
      type: Boolean,
      default: true
    },
    // Threshold (in px) for how far down the sheet needs to be dragged to close
    dragThreshold: {
      type: Number,
      default: 100 // Drag down 100px to dismiss
    }
  },
  emits: ['update:modelValue'],

  data() {
    return {
      isDragging: false,
      startY: 0, // Y-coordinate where drag started
      dragOffsetY: 0, // Current Y-offset during drag
      initialSheetY: 0, // Initial Y-position of the sheet when drag starts
    };
  },

  watch: {
    // Reset drag state when sheet closes or opens
    modelValue(newVal) {
      if (!newVal) {
        this.resetDragState();
      }
    }
  },

  methods: {
    closeSheet() {
      if (this.closeOnClickOutside) {
        this.$emit('update:modelValue', false);
      }
    },
    startDrag(event) {
      // Only allow drag if sheet is fully open (not during initial slide-up animation)
      if (!this.modelValue) return;

      this.isDragging = true;
      this.startY = event.touches ? event.touches[0].clientY : event.clientY;

      // Get the current Y position of the sheet content element
      // This ensures smooth drag from its current rendered position
      const sheetRect = this.$refs.sheetContent.getBoundingClientRect();
      this.initialSheetY = sheetRect.y;

      // Add event listeners for moving and ending the drag
      window.addEventListener('touchmove', this.doDrag, { passive: false }); // passive: false for preventDefault
      window.addEventListener('touchend', this.endDrag);
      window.addEventListener('mousemove', this.doDrag);
      window.addEventListener('mouseup', this.endDrag);
    },
    doDrag(event) {
      if (!this.isDragging) return;

      const currentY = event.touches ? event.touches[0].clientY : event.clientY;
      let newOffset = currentY - this.startY;

      // Prevent dragging upwards beyond the initial position
      if (newOffset < 0) {
        newOffset = 0;
      }

      this.dragOffsetY = newOffset;

      // Prevent default to stop scrolling the background
      if (event.cancelable) {
        event.preventDefault();
      }
    },
    endDrag() {
      if (!this.isDragging) return;

      this.isDragging = false;
      window.removeEventListener('touchmove', this.doDrag);
      window.removeEventListener('touchend', this.endDrag);
      window.removeEventListener('mousemove', this.doDrag);
      window.removeEventListener('mouseup', this.endDrag);

      // Check if the sheet has been dragged down enough to dismiss
      if (this.dragOffsetY > this.dragThreshold) {
        this.$emit('update:modelValue', false);
      }

      // Reset the offset for the next time it opens, or if it didn't dismiss
      this.resetDragState();
    },
    resetDragState() {
      this.startY = 0;
      this.dragOffsetY = 0;
      this.initialSheetY = 0;
    }
  }
};
</script>

<style scoped>
/*
 * 1. Backdrop (Dimming Overlay) Animation (Fade In/Out)
 * This transition applies to the `.fixed.inset-0` div
 */
.ios-sheet-backdrop-enter-active,
.ios-sheet-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.ios-sheet-backdrop-enter-from,
.ios-sheet-backdrop-leave-to {
  opacity: 0;
}


/*
 * 2. Sheet Content (Slide Up/Down) Animation
 * This transition applies to the `.bg-white` div inside the backdrop
 */
.ios-sheet-slide-enter-active {
  /* Use cubic-bezier for a smooth, common ease-out effect */
  /* This transition is for the initial slide-up when entering */
  transition: transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1);
}

.ios-sheet-slide-leave-active {
  /* This transition is for the slide-down when leaving (e.g., after dismissing via drag) */
  transition: opacity 1s cubic-bezier(0.1, 0.9, 0.2, 1), /* Shorter duration for quickness */
  transform .5s cubic-bezier(0.1, 0.9, 0.2, 1);
}


/* Starting state for entering: off-screen bottom */
.ios-sheet-slide-enter-from {
  transform: translateY(100%); /* Starts completely off-screen at the bottom */
}

/* Ending state for leaving (e.g., after dismissing via drag or close button): back off-screen bottom */
.ios-sheet-slide-leave-to {
  opacity: 0; /* Fades out slightly as it leaves */
  transform: translateY(100%); /* Slides back down off-screen */
}

/* Final state for entering & initial state for leaving: on-screen */
/* The element is fully on screen (transform: translateY(0) is default) */
.ios-sheet-slide-enter-to,
.ios-sheet-slide-leave-from {
  transform: translateY(0); /* On-screen position */
  opacity: 1; /* Fully visible */
}
</style>