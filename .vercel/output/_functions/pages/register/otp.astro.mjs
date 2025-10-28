import { c as createComponent, e as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BZIeH3Xc.mjs';
import { M as Main } from '../../chunks/Main_DSKONqVp.mjs';
import { T as Toast, a as ToastContainer, I as Input } from '../../chunks/Toast_Lfe3ES13.mjs';
import { A as Anchor } from '../../chunks/Anchor_C95N-aL4.mjs';
import { B as Button } from '../../chunks/Button_W6bUmV4x.mjs';
import { useSSRContext, mergeProps, resolveComponent, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderDynamicModel, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
/* empty css                                  */
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { atom } from 'nanostores';
export { renderers } from '../../renderers.mjs';

const _sfc_main$1 = {
  // Props received by the component
  props: {
    /**
     * The number of individual OTP input fields.
     */
    length: {
      type: Number,
      default: 6, // Default OTP length to 6 digits
      validator: (val) => val > 0 && val <= 10, // Ensure length is reasonable
    },
    /**
     * The v-model binding for the complete OTP string.
     */
    modelValue: {
      type: String,
      default: '',
    },
    /**
     * Placeholder text for each input field.
     */
    placeholder: {
      type: String,
      default: '0',
    },
    /**
     * Whether all input fields should be disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The type of input field ('text' or 'password' for masking).
     */
    type: {
      type: String,
      default: 'text', // Use 'text' for mobile numeric keyboard, 'password' to mask input
      validator: (value) => ['text', 'password'].includes(value),
    },
    /**
     * Allows adding custom Tailwind classes to the input fields.
     */
    customClass: {
      type: String,
      default: '',
    }
  },
  // Events emitted by the component
  emits: ['update:modelValue', 'complete'],

  data() {
    return {
      // Internal array to hold the value of each individual input field
      otpValues: Array(this.length).fill(''),
    };
  },

  computed: {
    baseClasses() {
      // Replicating styles from your Input component's baseClasses
      return `
        px-1 py-1 text-base rounded-xl border-secondary-xs
        text-zinc-800
        bg-white dark:bg-zinc-900
        shadow-secondary-sm focus:ring-0 focus:outline-none
        transition-all duration-200
      `;
    },
    // Joins the individual OTP digits into a single string
    currentOtp() {
      return this.otpValues.join('');
    }
  },

  watch: {
    // Watch for external changes to modelValue prop
    modelValue: {
      handler(newValue) {
        // Only update internal state if the external modelValue is different
        // from the current joined OTP string to prevent infinite loops.
        if (newValue !== this.currentOtp) {
          // Clear previous values and populate from newValue
          this.otpValues = Array(this.length).fill('');
          for (let i = 0; i < newValue.length && i < this.length; i++) {
            // Use Vue.$set for reactivity when directly assigning to array indices
            this.$set(this.otpValues, i, newValue[i]);
          }
        }
      },
      immediate: true, // Run handler immediately on component mount to initialize
    },
    // Watch for internal changes to otpValues array
    otpValues: {
      handler(newVal) {
        const currentOtp = newVal.join('');
        // Emit 'update:modelValue' for v-model binding
        // Only emit if the current value is different from the modelValue
        // This prevents infinite loops when modelValue is updated internally.
        if (currentOtp !== this.modelValue) {
          this.$emit('update:modelValue', currentOtp);
        }
        // Emit 'complete' event if all fields are filled
        if (currentOtp.length === this.length) {
          this.$emit('complete', currentOtp);
        }
      },
      deep: true, // Crucial for watching changes within the array elements
    },
  },

  methods: {
    /**
     * Handles input events for each individual OTP digit field.
     * Restricts input to a single digit and manages focus.
     */
    handleInput(event, index) {
      const value = event.target.value;

      // Only allow digits (0-9)
      if (!/^\d*$/.test(value)) {
        this.otpValues[index] = ''; // Clear invalid input
        event.preventDefault(); // Prevent default if non-digit entered
        return;
      }

      // Ensure only one character is in the field
      this.otpValues[index] = value.charAt(0);

      // Move focus to the next input if a digit was entered and it's not the last field
      if (this.otpValues[index] && index < this.length - 1) {
        this.focusInput(index + 1);
      }
    },

    /**
     * Handles keydown events for navigation (Backspace) and preventing non-numeric input.
     */
    handleKeydown(event, index) {
      // Move focus to the previous input on Backspace if current field is empty
      if (event.key === 'Backspace' && this.otpValues[index] === '' && index > 0) {
        event.preventDefault(); // Prevent default browser back navigation
        this.focusInput(index - 1);
      }
      // Prevent entering non-numeric characters (except for functional keys like Tab, Enter, Arrows)
      else if (!/^\d$/.test(event.key) && event.key.length === 1 && event.key !== 'Tab' && event.key !== 'Enter') {
        event.preventDefault();
      }
    },

    /**
     * Handles pasting an OTP string into the first input field.
     * Distributes the digits across all fields.
     */
    handlePaste(event) {
      // Only process paste event on the first input field
      if (event.target !== this.$refs.otpInputs[0]) return;

      event.preventDefault(); // Prevent default paste behavior
      const pasteData = event.clipboardData.getData('text').trim();

      // Only proceed if pasted data consists only of digits
      if (!/^\d+$/.test(pasteData)) {
        return;
      }

      // Distribute pasted digits into the OTP fields
      for (let i = 0; i < this.length; i++) {
        if (i < pasteData.length) {
          this.$set(this.otpValues, i, pasteData[i]); // Use $set for reactivity
        } else {
          this.$set(this.otpValues, i, ''); // Clear remaining fields if pasted data is shorter
        }
      }

      // Move focus to the last filled field or the last field if all are filled
      const lastFilledIndex = Math.min(pasteData.length - 1, this.length - 1);
      this.$nextTick(() => {
        this.focusInput(lastFilledIndex);
      });
    },

    /**
     * Focuses on a specific input field by its index.
     */
    focusInput(index) {
      this.$refs.otpInputs[index]?.focus();
    },

    /**
     * Clears all OTP input fields and focuses the first one.
     * This method can be called externally.
     */
    clear() {
      this.otpValues = Array(this.length).fill('');
      this.$nextTick(() => {
        this.focusInput(0);
      });
    },
  },

  mounted() {
    // Optionally focus the first input on component mount, if not disabled
    this.$nextTick(() => {
      if (!this.disabled) {
        this.focusInput(0);
      }
    });
  },
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-2" }, _attrs))} data-v-d1d507b7><!--[-->`);
  ssrRenderList($data.otpValues, (value, index) => {
    _push(`<input${
      ssrRenderAttr("id", `otp-input-${index}`)
    }${
      ssrRenderDynamicModel($props.type, $data.otpValues[index], null)
    }${
      ssrRenderAttr("type", $props.type)
    }${
      ssrRenderAttr("maxlength", 1)
    }${
      (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
    }${
      ssrRenderAttr("placeholder", $props.placeholder)
    } class="${
      ssrRenderClass([
        $options.baseClasses,
        'w-12 py-4 text-center text-xl font-semibold', // Specific OTP sizing and text style
        $props.disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
        $props.customClass // Allow custom class from prop
      ])
    }" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" data-v-d1d507b7>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/OTPInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const OTPInput = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-d1d507b7"]]);

const address = "http://localhost:3000/api/v1";
const apiRequest = async ({ method = "GET", url, params = {}, body = null, headers }) => {
  try {
    const queryString = (method === "GET" || method === "DELETE") && Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : "";
    const fullUrl = `${address}${url}${queryString}`;
    const response = await fetch(fullUrl, {
      method,
      headers: headers ? headers : {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: method === "POST" || method === "PUT" ? JSON.stringify(body) : null
    });
    if (!response.ok) {
      return response;
    }
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${method} ${url}:`, err);
    throw err;
  }
};

// --- Key for localStorage ---
const STORAGE_KEY = 'registerData';

// --- Helper function to check if we are in a browser environment ---
const isBrowser = typeof window !== 'undefined';

// --- Helper function to get initial state from localStorage ---
function getInitialState() {
  if (isBrowser) { // ONLY access localStorage if in a browser
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        // console.log("Loaded from localStorage:", JSON.parse(storedData)); // For debugging
        return JSON.parse(storedData);
      }
    } catch (e) {
      console.error("Failed to parse stored data from localStorage, clearing:", e);
      // It's good practice to clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  // Default initial state if not in browser or no stored data/error
  return {
    register: false,
    email: '',
    password: '',
    fullName: '',
    homeProvince: '',
    hasExperience: null,
    spentVacations: [],
    heardUs: '',
  };
}

// --- Initialize the store with data from localStorage ---
const useRegisterStore = atom(getInitialState());

// --- Subscribe to store changes and save to localStorage (only in browser) ---
if (isBrowser) { // ONLY subscribe if in a browser
  useRegisterStore.listen(value => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save data to localStorage:", e);
    }
  });
}

// --- Exported setter functions ---

function setEmail(email) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    email: email,
  });
}

const _sfc_main = {
  components: {
    Input,
    Anchor,
    Button,
    ToastContainer,
    Toast,
    OTPInput
  },

  data() {
    return {
      isLoading: false,
      useRegister: useRegisterStore,
      activeInput: "email",
      otpCode: '',
      email: '',
      password: '',

      dangerToast: {
        message: '',
      }
    }
  },

  methods: {
    setActiveInput(newInput) {
      this.activeInput = newInput;
    },

    goToPassword() {
      // VALIDATE FIRST THE EMAIL
      if (this.email == null || this.email === '') {
        this.dangerToast.message = "Please Enter your email.";
        return
      }

      if (!this.email.includes('@')) {
        this.dangerToast.message = "Not an email format.";
        return
      }

      this.setActiveInput("password");
      setEmail(this.email);
      this.useRegister = useRegisterStore;
    },

    async resendCode() {
      const res = await apiRequest({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/auth/signup/resend-otp',
        body: {
          email: this.useRegister.value.email,
        }
      });

      console.log(await res.json());
    },

    async createAccount() {
      console.log(typeof this.otpCode);
      console.log(typeof this.useRegister.value.email);
      // setTimeout(()=>{window.location.href = '/build-profile'}, 1000)
      const res = await apiRequest({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/auth/signup/confirm-email',
        body: {
          email: this.useRegister.value.email,
          code: this.otpCode,
        }
      });

      if (!res.ok) {
        this.dangerToast.message = 'Something went wrong';
        return
      }

      console.log(await res.json());
      await this.handleLogin();

      // LOGIN THE USER
    },

    async handleLogin(){
      const response = await apiRequest({
        method: "POST",
        url: '/auth/signin',
        // Headers are optional here because your apiRequest sets 'Content-Type: application/json'
        // by default for POST/PUT if no headers are provided.
        body: {
          email: this.useRegister.value.email,
          password: this.useRegister.value.password,
        },
      });

      // IF RESPONSE IS FAILED
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response body
        this.dangerToast.message = errorData.message || "Login failed. Please check your credentials.";
        return;
      }

      // IF RESPONSE IS SUCCESS
      const data = await response.json();
      window.location.href='/build-profile';

      // Emit a 'success' event, possibly with user data or a signal to navigate
      this.$emit('login-success', data);
    }
  }
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_OTPInput = resolveComponent("OTPInput");
  const _component_Anchor = resolveComponent("Anchor");
  const _component_Button = resolveComponent("Button");
  const _component_ToastContainer = resolveComponent("ToastContainer");
  const _component_Toast = resolveComponent("Toast");

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center relative pt-20 px-8 grow" }, _attrs))} data-v-02d0609d><div class="flex flex-col items-center gap-4" data-v-02d0609d><span class="text-zinc-400 font-bold" data-v-02d0609d>Start your travels in</span><img class="w-48" src="/images/logo-agdayo-lg.png" alt="" data-v-02d0609d><span class="baybayin text-[.5rem] text-zinc-400" data-v-02d0609d>agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span></div><div class="gap-4 sm:w-72 w-full pt-20 flex flex-col items-center justify-center" data-v-02d0609d><div class="flex flex-col items-center justify-center gap-4" data-v-02d0609d> Enter your one-time password `);
  _push(ssrRenderComponent(_component_OTPInput, {
    modelValue: $data.otpCode,
    "onUpdate:modelValue": $event => (($data.otpCode) = $event),
    length: 6,
    placeholder: " ",
    disabled: false,
    onComplete: $options.createAccount
  }, null, _parent));
  _push(ssrRenderComponent(_component_Anchor, {
    onClick: $options.resendCode,
    href: "javascript:void(0)"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`Resend Code`);
      } else {
        return [
          createTextVNode("Resend Code")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_Button, {
    onClick: $options.createAccount,
    class: "w-full"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`Submit`);
      } else {
        return [
          createTextVNode("Submit")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_Anchor, {
    class: "pt-8",
    href: "/login"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`Go Back to login`);
      } else {
        return [
          createTextVNode("Go Back to login")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ToastContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'error',
          ref: "dangerToast",
          message: $data.dangerToast.message
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_Toast, {
            variant: 'error',
            ref: "dangerToast",
            message: $data.dangerToast.message
          }, null, 8, ["message"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/user-register/pages/otp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const OTP = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-02d0609d"]]);

const $$Otp = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "loading": false }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", null, { "title": "Register", "client:only": true, "client:component-hydration": "only", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "OTP", OTP, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/domains/user-register/pages/otp.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/register/otp.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/register/otp.astro";
const $$url = "/register/otp";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Otp,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
