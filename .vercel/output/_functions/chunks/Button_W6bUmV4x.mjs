import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'submit', 'reset'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'danger', 'ghost', 'google'].includes(val),
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    baseClasses() {
      return 'relative px-8 font-bold duration-100 transition cursor-pointer overflow-hidden group active:scale-95 rounded-full';
    },

    sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'text-sm px-3 py-2';
        case 'lg':
          return 'text-lg px-6 py-4';
        default: // 'md'
          return 'text-base px-4 py-3';
      }
    },
    
    variantClasses() {
      switch (this.variant) {
        case 'primary':
          // Branded peach action
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          // Neutral modern tone (grayish)
          return 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-secondary-sm border-secondary-xs';
        case 'danger':
          // Softer red tone, not too loud
          return 'bg-rose-500 text-white hover:bg-rose-600 shadow-danger-sm border-danger-xs';
        case 'ghost':
          // Peach outline/ghost style
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        case 'google':
          // DARK BUTTON
          return 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        default:
          return '';
      }
    }
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: $props.type,
    class: [
      $options.baseClasses,
      $options.sizeClasses,
      $options.variantClasses,
      $props.disabled ? 'opacity-50 cursor-not-allowed' : '',
      $props.customClass,
      $props.disabled || $props.loading ? 'active:scale-100' : '',
    ],
    disabled: $props.disabled || $props.loading
  }, _attrs))}><span class="relative flex justify-center items-center gap-2 w-full">`);
  if (!$props.loading) {
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  } else {
    _push(`<i class="${ssrRenderClass([[{'!text-[28px]': $props.size=='lg'}, {'!text-[24px]': $props.size=='md'}, {'!text-[20px]': $props.size=='sm'}], "animate-spin ph ph-spinner flex items-center justify-center"])}"></i>`);
  }
  _push(`</span></button>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Button = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { Button as B };
