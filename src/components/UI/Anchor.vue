<template>
  <a
    :href="disabled ? undefined : href"
    :target="target"
    :rel="relAttr"
    :class="[
      baseClasses,
      disabled ? 'pointer-events-none opacity-60 cursor-not-allowed' : '',
      customClass
    ]"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: '_self',
    },
    rel: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    baseClasses() {
      return `
        text-zinc-800 dark:text-zinc-100
        hover:underline transition-colors duration-200
      `;
    },
    relAttr() {
      return this.target === '_blank' && !this.rel
        ? 'noopener noreferrer'
        : this.rel;
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    },
  },
};
</script>
