<template>
  <div class="flex flex-row w-screen h-screen">
    <!-- SPLASH FRAME -->
    <div class="hidden lg:flex relative grow">
      <Splash class="absolute h-full inset-0"/>
    </div>

    <!-- LOGIN FORM -->
    <LoginForm/>
  </div>
</template>

<script>
import Splash from "./Splash.vue";
import LoginForm from "./LoginForm.vue"

export default {
  components: {
    Splash,
    LoginForm,
  },
}
</script>