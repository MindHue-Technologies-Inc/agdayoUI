<template>
  <button @click="handlePayment" :disabled="isLoading">
    {{ isLoading ? 'Processing...' : buttonText }}
  </button>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
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
});

const isLoading = ref(false);

async function handlePayment() {
  isLoading.value = true;
  try {
    // Call your microservice
    const response = await fetch('http://localhost:3001/create-checkout-session', {
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
</script>

<style scoped>
button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
