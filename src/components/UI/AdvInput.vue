<template>
  <div :class="[baseClass]">
    <div class="cursor-pointer">
      <!-- Header -->
      <div @click="toggle" class="flex items-center justify-between">
        <div :class="['flex items-center gap-2 text-zinc-900 font-medium header-text', { expanded: isExpanded }]">
          <i :class="['ph', icon]"></i>
          <span>{{ label }}</span>
        </div>
        <div v-if="!isExpanded">{{ summary }}</div>
      </div>
    </div>

    <!-- Expandable content with height transition -->
    <transition
        name="expand"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
    >
      <div v-show="isExpanded" ref="content" class="overflow-hidden">
        <div class="mt-2">
          <div class="w-full">
            <slot/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AdvInput",
  data() {
    return {
      isExpanded: false,
    };
  },

  props: {
    summary: {
      type: String,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    }
  },

  computed: {
    baseClass() {
      return 'rounded-[2rem] border-secondary-xs shadow-secondary-md p-6 bg-white transition duration-150 ease-in-out';
    },
    hoverClass() {
      return 'hover:bg-zinc-100';
    }
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
    beforeEnter(el) {
      el.style.height = '0';
      el.style.opacity = '0';
    },
    enter(el) {
      el.style.height = '0';
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
        el.style.height = el.scrollHeight + 'px';
        el.style.opacity = '1';
      });
    },
    afterEnter(el) {
      el.style.height = 'auto'; // clear height after animation
    },
    leave(el) {
      el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = '1';

      // Force reflow before collapsing
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.height = '0';
        el.style.opacity = '0';
      });
    },
    afterLeave(el) {
      el.style.height = '';
    }
  }
};
</script>

<style scoped>
.header-text {
  font-size: 1rem; /* base */
  transition: font-size 0.3s ease;
}
.header-text.expanded {
  font-size: 2rem; /* text-3xl ~ 30px */
}
</style>
