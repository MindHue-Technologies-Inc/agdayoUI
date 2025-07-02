<template>
  <div class="flex items-center justify-center min-w-[375px] w-full lg:w-[390px]">
    <div class="flex flex-col gap-16 items-center justify-center w-fit">
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="text-zinc-400 font-bold">Start your travels in</span>
        <img class="w-60" src="/images/logo-agdayo-lg.png" alt="Agdayo Logo">
        <span class="baybayin text-[.7rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
      </div>

      <Button @click="redirectToHome">Try out Agdayo</Button>

      <!--<form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full">-->
      <!--  <Input-->
      <!--      id="email-input"-->
      <!--      label="Email"-->
      <!--      placeholder="Enter your Email"-->
      <!--      type="email"-->
      <!--      prefixIcon="ph ph-user"-->
      <!--      v-model="loginData.email"-->
      <!--      :required="true"-->
      <!--  />-->
      <!--  <Input-->
      <!--      id="password-input"-->
      <!--      label="Password"-->
      <!--      placeholder="Enter your password"-->
      <!--      type="password"-->
      <!--      prefixIcon="ph ph-lock"-->
      <!--      v-model="loginData.password"-->
      <!--      :required="true"-->
      <!--  />-->
      <!--  <Checkbox-->
      <!--      class="ml-6"-->
      <!--      id="remember-me"-->
      <!--      label="Remember Me"-->
      <!--      v-model="loginData.rememberMe"-->
      <!--  />-->
      <!--  <Button :loading="isLoading" type="submit">Login</Button>-->
      <!--</form>-->

      <!--<div class="flex flex-col items-center justify-center">-->
      <!--  <span class="text-zinc-400">No account yet?</span>-->
      <!--  <Anchor href="/register">Sign Up</Anchor>-->
      <!--</div>-->
    </div>
  </div>

  <!--TOASTS-->
  <ToastContainer>
    <Toast
        :variant="'error'"
        variant="success"
        ref="dangerToast"
        :message="dangerToast.message" />
  </ToastContainer>
</template>

<script>
import Input from "../../UI/Input.vue";
import Button from "../../UI/Button.vue";
import Checkbox from "../../UI/Checkbox.vue";
import Anchor from "../../UI/Anchor.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import Toast from "../../UI/Toast.vue";
import {apiRequest} from "../../../fetch.js";

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Anchor,
    ToastContainer,
    Toast
  },

  data() {
    return {
      isLoading: false,
      loginData: {
        email: 'janalbertsobreo@gmail.com',
        password: '1234',
        rememberMe: false,
      },
      dangerToast: {
        message: null,
      }
    }
  },

  methods: {
    redirectToHome() {
      window.location.href = '/active-trip'
    },

    async handleLogin() {

      // --- Client-side validation ---
      if (!this.loginData.email) {
        this.dangerToast.message = "Please enter your email address.";
        return;
      }
      if (!this.loginData.password) {
        this.dangerToast.message = "Please enter your password.";
        return;
      }

      this.isLoading = true; // Set loading state

      try {
        const { email, password } = this.loginData; // Destructure for cleaner body

        const response = await apiRequest({
          method: "POST",
          url: '/auth/signin',
          // Headers are optional here because your apiRequest sets 'Content-Type: application/json'
          // by default for POST/PUT if no headers are provided.
          body: {
            email,
            password,
          },
        });

        // IF RESPONSE IS FAILED
        if (!response.ok) {
          // If response.ok is false, it means an HTTP error (4xx, 5xx)
          const errorData = await response.json(); // Parse the error response body
          // console.error("Login API Error:", errorData); // For debugging

          // Display a user-friendly error message
          this.dangerToast.message = errorData.message || "Login failed. Please check your credentials.";
          // Emit a 'failed' event to the parent
          this.$emit('login-failed', errorData);
          return; // Stop execution here
        }

        // IF RESPONSE IS SUCCESS
        const data = await response.json();
        window.location.href='/active-trip'

        // Emit a 'success' event, possibly with user data or a signal to navigate
        this.$emit('login-success', data);

      } catch (err) {
        // This catch block handles network errors or errors thrown by apiRequest itself
        console.error("[Login Handler Error]:", err);
        this.dangerToast.message = "A network error occurred. Please try again.";

        this.isLoading = false; // Always turn off loading state
        // Emit a general error event
        this.$emit('login-error', err);
      }
    },
  },
};
</script>