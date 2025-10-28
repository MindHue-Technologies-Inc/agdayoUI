import { useSSRContext, mergeProps, resolveComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main$1 = {};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-screen flex items-center justify-center" }, _attrs))}><i class="text-zinc-600 animate-spin ph ph-spinner text-4xl flex items-center justify-center"></i></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Loader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Loader = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  components: {
    Loader
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    }
  }
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Loader = resolveComponent("Loader");

  _push(`<!--[-->`);
  if ($props.loading) {
    _push(ssrRenderComponent(_component_Loader, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="w-full grow flex relative"><div class="w-full flex justify-center">`);
  if (!$props.loading) {
    _push(`<div class="${ssrRenderClass(['mt-0 flex flex-col py-4 md:w-[48rem] w-screen md:px-0 md:mb-0 mb-8 px-2', $props.customClass])}">`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/layouts/Main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Main = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { Main as M };
