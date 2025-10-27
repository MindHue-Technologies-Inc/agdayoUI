<template>
  <div class="container">
    <!-- State 1: Verifying Payment -->
    <Card v-if="status === 'verifying'" class="rounded-4xl border-secondary-xs shadow-secondary-lg w-96 flex flex-col gap-2! items-center justify-center verifying">
      <Spinner />
      <h1 class="title">Verifying Your Payment</h1>
      <p class="message">Please wait a moment while we confirm your transaction. This should only take a few seconds.</p>
      <p class="sub-message">Do not close or refresh this page.</p>
    </Card>

    <!-- State 2: Payment Successful -->
    <Card v-else-if="status === 'success'" class="rounded-4xl border-secondary-xs shadow-secondary-lg w-96 flex flex-col gap-2! items-center justify-center success">
      <div class="icon-container">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
      </div>
      <h1 class="title">Payment Successful!</h1>
      <p class="message">Welcome aboard, {{ user.name }}! Your access has been granted.</p>
      <Anchor href="/trips">Go to My Dashboard</Anchor>
    </Card>

    <!-- State 3: Verification Failed -->
    <Card v-else-if="status === 'failed'" class="rounded-4xl border-secondary-xs shadow-secondary-lg w-96 flex flex-col gap-2! items-center justify-center failed">
       <div class="icon-container">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
      </div>
      <h1 class="title">Verification Failed</h1>
      <p class="message">We couldn't confirm your payment automatically. If you believe the payment went through, please contact our support team.</p>
      <a href="/pricing" class="button">Try Payment Again</a>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Spinner from "../../UI/Spinner.vue";
import Card from "../../UI/Card.vue";
import Anchor from "../../UI/Anchor.vue";

const status = ref('verifying');
const user = ref({ name: '' });
let pollingInterval;

// In a real app, get the user ID or auth token from your state management (e.g., Pinia, Vuex)
const getAuthToken = () => 'your_jwt_or_session_token';

async function checkPaymentStatus() {
  try {
    const response = await fetch('/api/v1/get-user-status', {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` },
    });
    const data = await response.json();

    if (data.subscriptionStatus === 'active') {
      status.value = 'success';
      user.value.name = data.name;
      clearInterval(pollingInterval);
    }
  } catch (error) {
    console.error('Polling Error:', error);
  }
}

onMounted(() => {
  pollingInterval = setInterval(checkPaymentStatus, 3000);
  setTimeout(() => {
    if (status.value === 'verifying') {
      clearInterval(pollingInterval);
      status.value = 'failed';
    }
  }, 120000); // Timeout after 2 minutes
});

onUnmounted(() => {
  clearInterval(pollingInterval);
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.status-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 450px;
  width: 100%;
}
.icon-container {
  margin-bottom: 20px;
}
.icon {
  width: 80px;
  height: 80px;
}
.success .icon {
  color: #48bb78;
}
.failed .icon {
  color: #f56565;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.message {
  color: #4a5568;
  margin-bottom: 24px;
}
.sub-message {
  color: #a0aec0;
  font-size: 14px;
}
.button {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
}
.button:hover {
  background-color: #3182ce;
}
</style>