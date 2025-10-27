<template>
  <div class="flex flex-row w-screen lg:h-screen py-8 lg:py-0">
    <!-- SPLASH FRAME -->
    <div class="hidden lg:flex relative grow">
      <Splash class="absolute h-full inset-0"/>
    </div>

    <!-- LOGIN FORM -->
    <LoginForm/>
  </div>
</template>

<script>
import Splash from "../components/Splash.vue";
import LoginForm from "../components/LoginForm.vue"

export default {
  components: {
    Splash,
    LoginForm,
  },
}
</script>