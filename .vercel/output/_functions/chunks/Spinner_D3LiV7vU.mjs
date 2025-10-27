import { createVNode, resolveDynamicComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, defineComponent } from 'vue';
import { ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
/* empty css                          */
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main$1 = {
  props: {
    label: {
      type: String,
      required: true,
    },
    // Mode prop: 'display' for a simple tag, 'button' for a clickable tag
    mode: {
      type: String,
      default: 'display',
      validator: (value) => ['display', 'button'].includes(value),
    },
    // Variant prop: defines the color scheme
    variant: {
      type: String,
      default: 'peach', // Default to your existing peach color
    },

    icon: {
      type: String,
    }
  },
  computed: {
    // Returns the base class for the tag
    baseClasses() {
      return "text-xs w-fit h-fit px-2 py-1 rounded-md tracking-wide"
    },
    // Determines whether to render as a <span> or <button>
    tagElement() {
      return this.mode === 'button' ? 'button' : 'span';
    },
    // A boolean flag for easy checks if in button mode
    isButtonMode() {
      return this.mode === 'button';
    },
    // Returns the Tailwind CSS classes based on the selected variant
    variantClasses() {
      switch (this.variant) {
        case 'peach':
          return '!text-peach-600 bg-peach-100';
        case 'blue':
          return '!text-cyan-700 bg-cyan-200';
        case 'green':
          return '!text-emerald-700 bg-emerald-200';
        case 'red':
          return '!text-rose-700 bg-rose-200';
        case 'gray':
          return '!text-zinc-700 bg-zinc-200';
        case 'purple':
          return '!text-purple-700 bg-purple-200';
        case 'yellow':
          return '!text-amber-700 bg-amber-200';
        default:
          return '!text-peach-700 bg-peach-200'; // Fallback
      }
    },
  },
  methods: {
    handleClick() {
      // Only emit a click event if the mode is 'button'
      if (this.isButtonMode) {
        this.$emit('click');
      }
    },
  },
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($options.tagElement), mergeProps({
    class: [
          $options.baseClasses,
          $options.variantClasses, // Dynamic color classes
          { 'cursor-pointer': $options.isButtonMode, 'hover:brightness-95 active:brightness-90': $options.isButtonMode } // Button specific styles
    ]
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex items-center justify-center gap-1" data-v-bf256c88${
          _scopeId
        }><i class="${
          ssrRenderClass(['ph', $props.icon])
        }" data-v-bf256c88${
          _scopeId
        }></i> ${
          ssrInterpolate($props.label)
        }</div>`);
      } else {
        return [
          createVNode("div", { class: "flex items-center justify-center gap-1" }, [
            createVNode("i", {
              class: ['ph', $props.icon]
            }, null, 2),
            createTextVNode(" " + toDisplayString($props.label), 1)
          ])
        ]
      }
    }),
    _: 1
  }), _parent);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Tag.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Tag = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-bf256c88"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Spinner",
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1 items-center justify-center" }, _attrs))}><i class="text-zinc-600 animate-spin ph ph-spinner text-4xl flex items-center justify-center"></i><span class="text-zinc-600">${ssrInterpolate($setup.props.label)}</span></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/shared/components/UI/Spinner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Spinner = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Spinner as S, Tag as T };
