import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
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
        text-blue-400 dark:text-blue-100
        hover:underline transition-colors duration-200
        cursor-pointer
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

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<a${ssrRenderAttrs(mergeProps({
    href: $props.disabled ? undefined : $props.href,
    target: $props.target,
    rel: $options.relAttr,
    class: [
      $options.baseClasses,
      $props.disabled ? 'pointer-events-none opacity-60 cursor-not-allowed' : '',
      $props.customClass
    ]
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</a>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Anchor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Anchor = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { Anchor as A };
