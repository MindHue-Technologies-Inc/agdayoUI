import { c as createComponent, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_2E1FEmW9.mjs';
import { C as Card } from '../chunks/Card_BZn4KDPy.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createTextVNode, toDisplayString, resolveComponent, createVNode, createBlock, openBlock } from 'vue';
import { B as Button } from '../chunks/Button_W6bUmV4x.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main$1 = {
  __name: 'PaymentButton',
  props: {
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'Pay Now',
  },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const isLoading = ref(false);

async function handlePayment() {
  isLoading.value = true;
  try {
    // Call your microservice
    const response = await fetch('/api/v1/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: props.amount, // The amount in PHP
        description: props.description,
        successUrl: 'http://localhost:4321/payment-success', // Your success page
        userId: 'user_123' // The currently logged-in user's ID
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session.');
    }

    const data = await response.json();

    // Redirect to PayMongo's checkout page
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      throw new Error('Checkout URL not found in response.');
    }

  } catch (error) {
    console.error('Payment Error:', error);
    alert('An error occurred during payment. Please try again.');
    isLoading.value = false;
  }
}

const __returned__ = { props, isLoading, handlePayment, ref, Button };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["Button"], mergeProps({
    onClick: $setup.handlePayment,
    disabled: $setup.isLoading
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`${ssrInterpolate($setup.isLoading ? 'Processing...' : $props.buttonText)}`);
      } else {
        return [
          createTextVNode(toDisplayString($setup.isLoading ? 'Processing...' : $props.buttonText), 1)
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/PaymentButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const PaymentButton = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  name: "Subscribe",
  components: {
    Card,
    PaymentButton,
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_PaymentButton = resolveComponent("PaymentButton");

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grow mt-8 md:mt-16" }, _attrs))} data-v-5d89d80b>`);
  _push(ssrRenderComponent(_component_Card, { class: "max-w-2xl mx-auto p-8 bg-white rounded-4xl border-secondary-xs shadow-secondary-lg" }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<h1 class="text-3xl font-bold text-center mb-6 text-gray-800" data-v-5d89d80b${
          _scopeId
        }>Subscribe to Premium</h1><p class="text-center text-gray-600 mb-8" data-v-5d89d80b${
          _scopeId
        }>Unlock exclusive features and enhance your travel planning experience!</p><div class="flex flex-col gap-6" data-v-5d89d80b${
          _scopeId
        }><div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" data-v-5d89d80b${
          _scopeId
        }><h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight" data-v-5d89d80b${
          _scopeId
        }>1 Month</h2><div class="flex items-baseline mb-6" data-v-5d89d80b${
          _scopeId
        }><p class="text-5xl md:text-6xl font-extrabold text-black leading-none" data-v-5d89d80b${
          _scopeId
        }>₱49</p><span class="text-xl font-medium text-gray-500 ml-1" data-v-5d89d80b${
          _scopeId
        }></span></div><ul class="text-gray-700 text-left mb-8 space-y-3 w-full" data-v-5d89d80b${
          _scopeId
        }><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Access to AI Trip Planner</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Unlimited Trip Creation</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Priority Support</span></li></ul>`);
        _push(ssrRenderComponent(_component_PaymentButton, {
          description: "Premium Access - 1 Month",
          amount: 49,
          class: "w-full py-3 text-lg"
        }, null, _parent, _scopeId));
        _push(`</div><div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" data-v-5d89d80b${
          _scopeId
        }><div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md z-10 whitespace-nowrap" data-v-5d89d80b${
          _scopeId
        }> Most Popular </div><h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight" data-v-5d89d80b${
          _scopeId
        }>3 Months</h2><div class="flex items-baseline mb-6" data-v-5d89d80b${
          _scopeId
        }><p class="text-5xl md:text-6xl font-extrabold text-black leading-none" data-v-5d89d80b${
          _scopeId
        }>₱119</p></div><ul class="text-gray-700 text-left mb-8 space-y-3 w-full" data-v-5d89d80b${
          _scopeId
        }><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Access to AI Trip Planner</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Unlimited Trip Creation</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Priority Support</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Exclusive Discounts</span></li></ul>`);
        _push(ssrRenderComponent(_component_PaymentButton, {
          description: "Premium Access - 3 Months",
          amount: 119,
          class: "w-full py-3 text-lg"
        }, null, _parent, _scopeId));
        _push(`</div><div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" data-v-5d89d80b${
          _scopeId
        }><h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight" data-v-5d89d80b${
          _scopeId
        }>1 Year</h2><div class="flex items-baseline mb-6" data-v-5d89d80b${
          _scopeId
        }><p class="text-5xl md:text-6xl font-extrabold text-black leading-none" data-v-5d89d80b${
          _scopeId
        }>₱399</p></div><ul class="text-gray-700 text-left mb-8 space-y-3 w-full" data-v-5d89d80b${
          _scopeId
        }><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Access to AI Trip Planner</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Unlimited Trip Creation</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Priority Support</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Exclusive Discounts</span></li><li class="flex items-center" data-v-5d89d80b${
          _scopeId
        }><svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5d89d80b${
          _scopeId
        }><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-5d89d80b${
          _scopeId
        }></path></svg><span data-v-5d89d80b${
          _scopeId
        }>Early Access to New Features</span></li></ul>`);
        _push(ssrRenderComponent(_component_PaymentButton, {
          description: "Premium Access - 1 Year",
          amount: 399,
          class: "w-full py-3 text-lg"
        }, null, _parent, _scopeId));
        _push(`</div></div><p class="text-center text-gray-500 text-xs mt-8" data-v-5d89d80b${_scopeId}> Prices are in Philippine Pesos (PHP). All subscriptions are one-time payments for the specified duration. </p>`);
      } else {
        return [
          createVNode("h1", { class: "text-3xl font-bold text-center mb-6 text-gray-800" }, "Subscribe to Premium"),
          createVNode("p", { class: "text-center text-gray-600 mb-8" }, "Unlock exclusive features and enhance your travel planning experience!"),
          createVNode("div", { class: "flex flex-col gap-6" }, [
            createVNode("div", { class: "relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" }, [
              createVNode("h2", { class: "text-3xl font-bold text-gray-800 mb-4 tracking-tight" }, "1 Month"),
              createVNode("div", { class: "flex items-baseline mb-6" }, [
                createVNode("p", { class: "text-5xl md:text-6xl font-extrabold text-black leading-none" }, "₱49"),
                createVNode("span", { class: "text-xl font-medium text-gray-500 ml-1" })
              ]),
              createVNode("ul", { class: "text-gray-700 text-left mb-8 space-y-3 w-full" }, [
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Access to AI Trip Planner")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Unlimited Trip Creation")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Priority Support")
                ])
              ]),
              createVNode(_component_PaymentButton, {
                description: "Premium Access - 1 Month",
                amount: 49,
                class: "w-full py-3 text-lg"
              })
            ]),
            createVNode("div", { class: "relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" }, [
              createVNode("div", { class: "absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md z-10 whitespace-nowrap" }, " Most Popular "),
              createVNode("h2", { class: "text-3xl font-bold text-gray-800 mb-4 tracking-tight" }, "3 Months"),
              createVNode("div", { class: "flex items-baseline mb-6" }, [
                createVNode("p", { class: "text-5xl md:text-6xl font-extrabold text-black leading-none" }, "₱119")
              ]),
              createVNode("ul", { class: "text-gray-700 text-left mb-8 space-y-3 w-full" }, [
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Access to AI Trip Planner")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Unlimited Trip Creation")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Priority Support")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Exclusive Discounts")
                ])
              ]),
              createVNode(_component_PaymentButton, {
                description: "Premium Access - 3 Months",
                amount: 119,
                class: "w-full py-3 text-lg"
              })
            ]),
            createVNode("div", { class: "relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between" }, [
              createVNode("h2", { class: "text-3xl font-bold text-gray-800 mb-4 tracking-tight" }, "1 Year"),
              createVNode("div", { class: "flex items-baseline mb-6" }, [
                createVNode("p", { class: "text-5xl md:text-6xl font-extrabold text-black leading-none" }, "₱399")
              ]),
              createVNode("ul", { class: "text-gray-700 text-left mb-8 space-y-3 w-full" }, [
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Access to AI Trip Planner")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Unlimited Trip Creation")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Priority Support")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Exclusive Discounts")
                ]),
                createVNode("li", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6 text-green-500 mr-2 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ])),
                  createVNode("span", null, "Early Access to New Features")
                ])
              ]),
              createVNode(_component_PaymentButton, {
                description: "Premium Access - 1 Year",
                amount: 399,
                class: "w-full py-3 text-lg"
              })
            ])
          ]),
          createVNode("p", { class: "text-center text-gray-500 text-xs mt-8" }, " Prices are in Philippine Pesos (PHP). All subscriptions are one-time payments for the specified duration. ")
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/subscription/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Subscribe = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-5d89d80b"]]);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutWSidebar", $$LayoutWSidebar, { "title": "Subscribe to Premium" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Subscribe", Subscribe, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/subscription/pages/index.vue", "client:component-export": "default" })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/subscribe/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/subscribe/index.astro";
const $$url = "/subscribe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
