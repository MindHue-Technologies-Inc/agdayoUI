<template>
  <div class="py-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Unleash Your Wanderlust with <span class="text-peach-600">Agdayo Features</span>
        </h1>
        <p class="fadeIn fadeIn-1 text-xl text-gray-600 max-w-3xl mx-auto font-light">
          Agdayo offers a comprehensive suite of features designed to enhance every aspect of your travel experience, from seamless planning to unforgettable moments.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <Card class="fadeIn fadeIn-2" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-robot text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">AI-Powered Itinerary Planning</h2>
          <p class="text-gray-700 leading-relaxed">Our intelligent AI analyzes your preferences, budget, and travel style to create personalized and optimized itineraries in minutes.</p>
        </Card>

        <Card class="fadeIn fadeIn-3" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-currency-dollar text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Smart Budget Management</h2>
          <p class="text-gray-700 leading-relaxed">Keep track of your expenses, find cost-saving opportunities, and stay within your budget with our intuitive financial tools.</p>
        </Card>

        <Card class="fadeIn fadeIn-4" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-map-pin text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Interactive Maps & Navigation</h2>
          <p class="text-gray-700 leading-relaxed">Explore your destination with interactive maps, discover points of interest, and get real-time navigation assistance tailored for your route.</p>
        </Card>

        <Card class="fadeIn fadeIn-5" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-chat-circle-dots text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Local Recommendations & Tips</h2>
          <p class="text-gray-700 leading-relaxed">Access curated recommendations from locals for dining, attractions, and hidden gems to experience the most authentic culture.</p>
        </Card>

        <Card class="fadeIn fadeIn-6" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-users-three text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Collaborative Planning</h2>
          <p class="text-gray-700 leading-relaxed">Plan trips with friends and family seamlessly. Share itineraries, expenses, and ideas within the app for a collective adventure.</p>
        </Card>

        <Card class="fadeIn fadeIn-7" customClass="rounded-4xl border-secondary-xs shadow-secondary-lg">
          <div class="bg-peach-100 w-fit self-center p-4 rounded-full mb-6">
            <i class="ph ph-bell-ringing text-peach-600 text-5xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Real-time Alerts & Updates</h2>
          <p class="text-gray-700 leading-relaxed">Receive timely notifications for flight changes, weather updates, and local events to ensure a smooth, worry-free journey.</p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "../../UI/Card.vue";
</script>

<style scoped>
/* Remember to include the Phosphor Icons stylesheet in your main HTML file (e.g., public/index.html or your Astro layout) */
/* For example: <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/css/phosphor.css" /> */
</style>