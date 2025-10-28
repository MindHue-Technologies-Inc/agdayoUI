import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
/* empty css                         */
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
  name: 'Card',
  props: {
    variant: {
      type: String,
      default: 'default', // other options: 'transparent', 'subtle', etc.
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    backgroundClass() {
      switch (this.variant) {
        case 'transparent':
          return 'bg-transparent';
        case 'subtle':
          return 'bg-zinc-100 dark:bg-zinc-900';
        case 'dotted':
          return 'dotted-bg';
        default:
          return 'bg-white rounded-4xl';
      }
    },
    borderClass() {
      return 'border-secondary-xs';
    },
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["card-container", [
      'py-6 px-3 md:p-6 flex flex-col gap-4 transition-colors',
      $options.backgroundClass,
      $props.customClass
    ]]
  }, _attrs))} data-v-4b3c9cfa>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Card = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-4b3c9cfa"]]);

export { Card as C };
