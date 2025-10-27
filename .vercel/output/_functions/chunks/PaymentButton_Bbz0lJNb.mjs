import { useSSRContext, ref, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { B as Button } from './Button_W6bUmV4x.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
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

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/PaymentButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const PaymentButton = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { PaymentButton as P };
