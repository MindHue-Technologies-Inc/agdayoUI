<template>
  <div class="flex items-center justify-center min-w-[375px] w-full lg:w-[390px]">
    <div class="flex flex-col gap-16 items-center justify-center w-fit">
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="text-zinc-400 font-bold">Start your travels in</span>
        <img class="w-60" src="/images/logo-agdayo-lg.png" alt="Agdayo Logo">
        <span class="baybayin text-[.7rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full">
        <Input
            id="email-input"
            label="Email"
            placeholder="Enter your Email"
            type="email"
            prefixIcon="ph ph-user"
            v-model="loginData.email"
            :required="true"
        />
        <Input
            id="password-input"
            label="Password"
            placeholder="Enter your password"
            type="password"
            prefixIcon="ph ph-lock"
            v-model="loginData.password"
            :required="true"
        />
        <Checkbox
            class="ml-6"
            id="remember-me"
            label="Remember Me"
            v-model="loginData.rememberMe"
        />
        <Button type="submit">Login</Button>
      </form>

      <div class="flex flex-col items-center justify-center">
        <span class="text-zinc-400">No account yet?</span>
        <Anchor href="/register">Sign Up</Anchor>
      </div>
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
      loginData: {
        email: '',
        password: '',
        rememberMe: false,
      },
      dangerToast: {
        message: null,
      }
    }
  },

  methods: {
    /**
     * Handles the form submission.
     * This method is called when the "Login" button is clicked
     * or the form is submitted (e.g., by pressing Enter).
     */
    handleLogin() {
      // Access the current form data directly from `this.localLoginData`
      // This data is reactive and comes from the parent's v-model.

      window.location.href='/active-trip'

      // --- Optional: Basic client-side validation ---
      if (!this.loginData.email || !this.loginData.password) {
        this.dangerToast.message = "Please Enter both Email and Password."
        return; // Stop if validation fails
      }

      // Emit a custom 'submit' event, passing the login data to the parent.
      // The parent will then decide what to do with this data (e.g., make an API call, navigate).
      this.$emit('submit', this.loginData);
    },
  },
};
</script>