<template>
  <div class="bg-none py-8 px-0 sm:px-0 lg:px-8 min-h-screen flex items-center justify-center">
    <Card class="max-w-4xl mx-auto overflow-hidden rounded-4xl bg-white border-secondary-light-sm shadow-secondary-light-md">
      <div class="flex flex-col items-center text-center mb-8">
        <img class="fadeIn w-48 my-10" src="/images/logo-agdayo-lg.png" alt="Agdayo Logo">
        <h1 class="fadeIn fadeIn-1 text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          What is <span class="text-peach-500 zain text-6xl font-black">Agdayo?</span>
        </h1>
        <p class="fadeIn fadeIn-2 text-xl text-gray-600 max-w-2xl font-light">
          Your journey to effortless, personalized travel planning starts here.
        </p>
      </div>

      <div class="space-y-8 text-lg text-gray-700 leading-relaxed">
        <p class="fadeIn fadeIn-3">
          Agdayo is your ultimate AI-powered travel companion, designed to help you plan, manage, and enjoy your trips like never before. We harness the power of artificial intelligence to transform the way you discover, organize, and experience the world.
        </p>
        <p class="fadeIn fadeIn-4">
          Whether you're a seasoned traveler seeking new horizons or planning your very first adventure, Agdayo provides personalized itineraries tailored to your unique preferences, smart budgeting tools to keep your finances in check, and exclusive opportunities to connect with authentic local experiences.
        </p>
        <p class="fadeIn fadeIn-5">
          Our mission is to make travel accessible, enjoyable, and truly unforgettable for everyone. We believe that every journey should be a unique story waiting to be written, and Agdayo is here to empower you to write yours with ease and excitement.
        </p>

        <p class="text-center pt-8 fadeIn fadeIn-6">
          <Button @click="goToLogin">Start Your Agdayo Adventure Today!</Button>
        </p>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Button from "../../UI/Button.vue";
import Card from "../../UI/Card.vue";

// -- Redirect to login
const goToLogin = () => {
  window.location.href = '/'
}
</script>

<style scoped>
/* Any highly specific, non-Tailwind styles can still go here if absolutely necessary */
</style>