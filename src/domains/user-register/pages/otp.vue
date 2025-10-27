<template>
  <div class="flex flex-col items-center relative pt-20 px-8 grow">
    <!--    LOGO-->
    <div class="flex flex-col items-center gap-4">
      <span class="text-zinc-400 font-bold">Start your travels in</span>
      <img class="w-48" src="/images/logo-agdayo-lg.png" alt="">
      <span class="baybayin text-[.5rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="activeInput" class="gap-4 sm:w-72 w-full pt-20 flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center gap-4">
          Enter your one-time password
          <OTPInput
              v-model="otpCode"
              :length="6"
              placeholder=" "
              :disabled="false"
              @complete="createAccount"
          />
          <Anchor @click="resendCode" href="javascript:void(0)">Resend Code</Anchor>
          <Button @click="createAccount" class="w-full">Submit</Button>
        </div>
      </div>
    </transition>



    <Anchor class="pt-8" href="/login">Go Back to login</Anchor>

    <!--TOAST-->
    <ToastContainer>
      <Toast
          :variant="'error'"
          ref="dangerToast"
          :message="dangerToast.message"
      />
    </ToastContainer>
  </div>
</template>

<script>
import Input from "@/shared/components/UI/Input.vue";
import Anchor from "@/shared/components/UI/Anchor.vue";
import Button from "@/shared/components/UI/Button.vue";
import ToastContainer from "@/shared/components/UI/ToastContainer.vue";
import OTPInput from "@/shared/components/UI/OTPInput.vue";
import Toast from "@/shared/components/UI/Toast.vue";
import {apiRequest} from "@/core/fetch.js";
import {useRegisterStore, setEmail, setPassword} from "@/core/stores/register.js";

export default {
  components: {
    Input,
    Anchor,
    Button,
    ToastContainer,
    Toast,
    OTPInput
  },

  data() {
    return {
      isLoading: false,
      useRegister: useRegisterStore,
      activeInput: "email",
      otpCode: '',
      email: '',
      password: '',

      dangerToast: {
        message: '',
      }
    }
  },

  methods: {
    setActiveInput(newInput) {
      this.activeInput = newInput;
    },

    goToPassword() {
      // VALIDATE FIRST THE EMAIL
      if (this.email == null || this.email === '') {
        this.dangerToast.message = "Please Enter your email."
        return
      }

      if (!this.email.includes('@')) {
        this.dangerToast.message = "Not an email format."
        return
      }

      this.setActiveInput("password");
      setEmail(this.email);
      this.useRegister = useRegisterStore;
    },

    async resendCode() {
      const res = await apiRequest({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/auth/signup/resend-otp',
        body: {
          email: this.useRegister.value.email,
        }
      })

      console.log(await res.json())
    },

    async createAccount() {
      console.log(typeof this.otpCode)
      console.log(typeof this.useRegister.value.email)
      // setTimeout(()=>{window.location.href = '/build-profile'}, 1000)
      const res = await apiRequest({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/auth/signup/confirm-email',
        body: {
          email: this.useRegister.value.email,
          code: this.otpCode,
        }
      });

      if (!res.ok) {
        this.dangerToast.message = 'Something went wrong'
        return
      }

      console.log(await res.json())
      await this.handleLogin()

      // LOGIN THE USER
    },

    async handleLogin(){
      const response = await apiRequest({
        method: "POST",
        url: '/auth/signin',
        // Headers are optional here because your apiRequest sets 'Content-Type: application/json'
        // by default for POST/PUT if no headers are provided.
        body: {
          email: this.useRegister.value.email,
          password: this.useRegister.value.password,
        },
      });

      // IF RESPONSE IS FAILED
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response body
        this.dangerToast.message = errorData.message || "Login failed. Please check your credentials.";
        return;
      }

      // IF RESPONSE IS SUCCESS
      const data = await response.json();
      window.location.href='/build-profile'

      // Emit a 'success' event, possibly with user data or a signal to navigate
      this.$emit('login-success', data);
    }
  }
}
</script>

<style scoped>
/* Fade animation for content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>