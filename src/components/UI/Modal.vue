<template>
  <div>
    <Transition name="modal-fade">
      <div v-if="show" class="modal-overlay" @click.self="closeModal">
        <div 
          class="modal-container  border border-zinc-600 shadow-xl  w-full mx-auto relative max-h-full overflow-auto"
          :class="[size === 'large' ? 'max-w-6xl' : (size === 'small' ? 'max-w-sm' : 'max-w-md')]"
        >
          <!-- Header -->
          <div class="modal-header p-4 flex justify-between items-center border-zinc-200 dark:border-zinc-800">
            <h3 class="text-lg font-medium text-zinc-900 dark:text-zinc-100">{{ title }}</h3>
            <button 
              @click="closeModal" 
              class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Body -->
          <div class="modal-body p-4 bg-black">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div class="modal-footer p-4  border-zinc-200 dark:border-zinc-800 flex justify-end space-x-2 bg-black">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    size: {
      type: String,
      default: 'medium', // 'small', 'medium', 'large'
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
    }
  },
  
  emits: ['update:modelValue', 'close'],
  methods: {
    closeModal() {
      if (this.closeOnOverlayClick) {
        this.$emit('update:modelValue', false);
        this.show = false
      }
    },
    showModal(){
      this.show = true
    },
  },
  mounted() {
    // Prevent scrolling when modal is open
    document.body.style.overflow = this.modelValue ? 'hidden' : '';
  },
  watch: {
    modelValue(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : '';
    }
  },
  beforeUnmount() {
    // Restore scrolling when component is destroyed
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
@reference "../../styles/global.css";

.modal-header {
  @apply bg-black/25
}

.modal-header::before {
  content: "";
  position: absolute;
  inset: 0; /* top, right, bottom, left = 0 */
  z-index: -1;
  pointer-events: none;

  background: linear-gradient(
    60deg,
    #a3a3a3,
    #5b5b5b,
    #292929,
    #747474,
    #2e2e2e
  );
  background-size: 100% 100%;

  -webkit-mask-image: radial-gradient(circle, black 1px, transparent 1px);
  mask-image: radial-gradient(circle, black 1px, transparent 1px);
  -webkit-mask-size: 10px 10px;
  mask-size: 10px 10px;
  mask-repeat: repeat;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
  backdrop-filter: blur(20px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.9);
}
</style>