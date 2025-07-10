<template>
  <div class="grow mt-8 md:mt-16">
    <Card class="max-w-2xl mx-auto p-8 bg-white rounded-4xl border-secondary-xs shadow-secondary-lg">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Subscribe to Premium</h1>
      <p class="text-center text-gray-600 mb-8">Unlock exclusive features and enhance your travel planning experience!</p>

      <div class="flex flex-col gap-6">
        <!-- 1-Month Plan -->
        <div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between">

          <h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight">1 Month</h2>

          <div class="flex items-baseline mb-6">
            <p class="text-5xl md:text-6xl font-extrabold text-black leading-none">₱49</p>
            <span class="text-xl font-medium text-gray-500 ml-1"></span>
          </div>

          <ul class="text-gray-700 text-left mb-8 space-y-3 w-full">
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Access to AI Trip Planner</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited Trip Creation</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Priority Support</span>
            </li>
          </ul>

          <PaymentButton description="Premium Subscription - 1 Month" :amount="4900" class="w-full py-3 text-lg" />
        </div>

        <!-- 3 month support -->
        <div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between">

          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md z-10 whitespace-nowrap">
            Most Popular
          </div>

          <h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight">3 Months</h2>

          <div class="flex items-baseline mb-6">
            <p class="text-5xl md:text-6xl font-extrabold text-black leading-none">₱119</p>
          </div>

          <ul class="text-gray-700 text-left mb-8 space-y-3 w-full">
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Access to AI Trip Planner</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited Trip Creation</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Priority Support</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Exclusive Discounts</span>
            </li>
          </ul>

          <PaymentButton description="Premium Subscription - 3 Months" :amount="11900" class="w-full py-3 text-lg" />
        </div>

        <!-- 1 Year Support -->
        <div class="relative bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between">

          <h2 class="text-3xl font-bold text-gray-800 mb-4 tracking-tight">1 Year</h2>

          <div class="flex items-baseline mb-6">
            <p class="text-5xl md:text-6xl font-extrabold text-black leading-none">₱399</p>
          </div>

          <ul class="text-gray-700 text-left mb-8 space-y-3 w-full">
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Access to AI Trip Planner</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited Trip Creation</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Priority Support</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Exclusive Discounts</span>
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Early Access to New Features</span>
            </li>
          </ul>

          <PaymentButton description="Premium Subscription - 1 Year" :amount="39900" class="w-full py-3 text-lg" />
        </div>
      </div>

      <p class="text-center text-gray-500 text-xs mt-8">
        Prices are in Philippine Pesos (PHP). All subscriptions are one-time payments for the specified duration.
      </p>
    </Card>
  </div>
</template>

<script>
import Card from "../../UI/Card.vue";
import PaymentButton from "../../UI/PaymentButton.vue";

export default {
  name: "Subscribe",
  components: {
    Card,
    PaymentButton,
  },
};
</script>

<style scoped>
/* Add any specific styles for this page here if needed */
</style>
