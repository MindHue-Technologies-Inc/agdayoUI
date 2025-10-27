import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

// We no longer need to import the useAuthStore here
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBackButton: {
      type: Boolean,
      default: false
    },
    // Add a prop for the user's photo URL
    photoURL: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      // The store is no longer needed in the component's data
    }
  },

  computed: {
    // The photoURL is now a prop, so this computed property is no longer necessary
  },

  methods: {
    goBack() {
      window.history.back();
    },

    redirectToProfile() {
      window.location.href = '/user-profile';
    }
  }
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex flex-row justify-center w-full" }, _attrs))}>`);
  if (!$props.hideBackButton) {
    _push(`<div class="${ssrRenderClass([
        'flex items-center justify-center ',
         'text-2xl transition rounded-full p-1 ',
          'bg-none hover:text-peach-500 cursor-pointer',
          'absolute left-0 inset-y-0'
    ])}"><i class="ph ph-caret-left"></i></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div><span class="text-xl font-bold">${
    ssrInterpolate($props.title)
  }</span></div><div class="${
    ssrRenderClass([
        'flex items-center justify-center ',
         'text-2xl transition rounded-full ',
          'bg-none hover:text-zinc-500 cursor-pointer',
          'absolute right-0 bg-zinc-200 aspect-square border-2 border-zinc-300',
          'overflow-hidden h-8 w-8'
    ])
  }">`);
  if ($props.photoURL) {
    _push(`<img${ssrRenderAttr("src", $props.photoURL)} alt="User Profile Photo">`);
  } else {
    _push(`<i class="ph ph-user"></i>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Topbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Topbar = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { Topbar as T };
