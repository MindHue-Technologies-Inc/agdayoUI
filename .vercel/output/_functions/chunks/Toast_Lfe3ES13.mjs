import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
/* empty css                         */
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main$2 = {
  name: 'Input',
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    label: String,
    placeholder: String,
    id: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      default: 2
    },
    suffix: {
      type: String,
      default: '',
    },
    formatCommas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full px-6 py-3 text-base rounded-full border-secondary-xs
        text-zinc-800
        bg-white dark:bg-zinc-900
        shadow-secondary-sm focus:ring-0 focus:outline-none
      `;
    },
    displayValue() {
      // Format with commas only if not focused and the value is a number
      if (this.formatCommas && !this.focused && this.modelValue && !isNaN(Number(this.modelValue))) {
        return this.addCommas(this.modelValue);
      }
      return this.modelValue;
    },

    suffixIcon() {
      switch (this.type) {
        case 'date':
          return 'calendar';
        case 'time':
          return 'clock';
        case 'number':
          return 'number-square';
        case 'search':
          return 'magnifying-glass';
        case 'email':
          return 'envelope-simple';
        default:
          return '';
      }
    },
  },

  emits: ['update:modelValue', 'enter'],

  methods: {
    selectAllText(event) {
      event.target.select();
    },
    handleSuffixClick() {
      if (this.type === 'date') {
        this.$el.querySelector('input')?.showPicker?.();
      }
    },
    handleInput(event) {
      let value = event.target.value;

      if (this.formatCommas) {
        value = value.replace(/,/g, '');

        // Only allow numeric characters, optional negative, and one decimal
        if (this.type === 'number') {
          // Prevent multiple dots or multiple minus signs
          const validPattern = /^-?\d*(\.\d*)?$/;
          if (!validPattern.test(value)) return;
        }
      }

      this.$emit('update:modelValue', value);
    },

    handleBlur() {
      this.focused = false;

      if (this.formatCommas && this.modelValue && !isNaN(Number(this.modelValue))) {
        this.$emit('update:modelValue', this.modelValue); // Ensures external model stays updated
      }
    },

    handleFocus() {
      this.focused = true;
    },
    addCommas(value) {
      // Convert to string and handle both string and number inputs
      const stringValue = String(Number(value));

      // Split by decimal point
      const parts = stringValue.split('.');

      // Add commas to the integer part
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // Rejoin with decimal part if it exists
      return parts.join('.');
    },

    preventInvalidChars(e) {
      if (this.type !== 'number') return;

      // Allow Ctrl+A / Cmd+A
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') return;

      const allowedKeys = [
        'Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'Delete',
        '-', '.', // for negative and decimal
      ];

      if (
        (e.key >= '0' && e.key <= '9') ||
        allowedKeys.includes(e.key)
      ) {
        return; // allow
      }

      e.preventDefault(); // block everything else
    }
  }
};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}>`);
  if ($props.label) {
    _push(`<label${
      ssrRenderAttr("for", $props.id)
    } class="ml-6 text-sm font-medium text-zinc-900">${
      ssrInterpolate($props.label)
    }</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="relative flex items-center">`);
  if ($props.prefix) {
    _push(`<div class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400">${ssrInterpolate($props.prefix)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.prefixIcon) {
    _push(`<div class="absolute left-0 pl-6 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400"><i class="${ssrRenderClass($props.prefixIcon)}"></i></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<input${
    ssrRenderAttr("id", $props.id)
  }${
    ssrRenderAttr("step", $props.type==='number' ? $props.step : null)
  } autocomplete="off"${
    ssrRenderAttr("type", $props.formatCommas ? 'text' : $props.type)
  }${
    ssrRenderAttr("value", $options.displayValue)
  }${
    ssrRenderAttr("placeholder", $props.placeholder)
  }${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  }${
    (ssrIncludeBooleanAttr($props.required)) ? " required" : ""
  } class="${
    ssrRenderClass([
          $options.baseClasses,
          $props.prefix ? 'pl-14' : '',
          $props.prefixIcon ? 'pl-14' : '',
          $props.suffix ? 'pr-12' : '',
          $props.disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
          $props.customClass
        ])
  }">`);
  if ($props.suffix || $options.suffixIcon) {
    _push(`<div class="absolute right-0 pr-3 flex items-center text-zinc-500 dark:text-zinc-400 cursor-default">`);
    if ($props.suffix) {
      _push(`<span>${ssrInterpolate($props.suffix)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($props.error) {
    _push(`<p class="text-sm text-red-500">${ssrInterpolate($props.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Input.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const Input = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2]]);

const _sfc_main$1 = {};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-4 right-4 z-50" }, _attrs))}><div class="relative flex flex-col gap-4">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/ToastContainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const ToastContainer = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  name: 'Toast',
  props: {
    message: {
      type: String,
    },
    variant: {
      type: String,
      default: 'success',
      validator: (val) => ['success', 'error', 'info', 'warning'].includes(val),
    },
    duration: {
      type: Number,
      default: 5000, // duration in ms
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
    };
  },

  watch: {
    message() {
      this.visible = true;
      this.hideToast(this.duration);
    }
  },

  computed: {
    baseClasses() {
      return 'transition-all duration-300 ease-out z-50 max-w-xs w-full p-4 rounded-3xl';
    },
    positionClasses() {
      return 'bottom-4 right-4';
    },
    variantClasses() {
      switch (this.variant) {
        case 'success':
          return 'bg-emerald-500 text-white shadow-success-dark-md border-success-dark-xs';
        case 'error':
          return 'bg-rose-600 text-white shadow-danger-dark-md border-danger-dark-xs';
        case 'info':
          return 'bg-sky-500 text-white shadow-info-dark-md border-info-dark-xs';
        case 'warning':
          return 'bg-amber-500 text-black shadow-warning-dark-md border-warning-dark-xs';
        default:
          return '';
      }
    },
  },
  methods: {
    hideToast(duration) {
      setTimeout(() => this.visible = false, duration); // Emit closed event after the fade out
    },
    showToast() {
      this.visible = true;
      this.hideToast(this.duration);
    }
  },
  mounted() {
    setTimeout(this.hideToast, this.duration);
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($data.visible) {
    _push(`<div${
      ssrRenderAttrs(mergeProps({
        class: ["", [
      $options.baseClasses,
      $options.variantClasses,
      $options.positionClasses,
      $props.customClass,
      { 'opacity-100': $data.visible, 'opacity-0': !$data.visible, 'transition-opacity duration-300 ease-in-out': true }
    ]]
      }, _attrs))
    }><div class="relative flex justify-between items-center gap-2"><span class="text-white">${
      ssrInterpolate($props.message)
    }</span><button class="cursor-pointer h-6 w-6"><i class="ph ph-x"></i></button></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Toast.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Toast = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { Input as I, Toast as T, ToastContainer as a };
