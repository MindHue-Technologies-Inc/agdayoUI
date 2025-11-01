<template>
  <div class="relative flex items-center justify-center min-w-[375px] w-full lg:w-[390px]">
    <div class="flex flex-col gap-16 items-center justify-center w-fit">
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="text-zinc-400 font-bold">Start your travels in</span>
        <img class="w-60" src="/images/logo-agdayo-lg.png" alt="Agdayo Logo">
        <span class="baybayin text-[.7rem] text-zinc-400">
          agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo
        </span>
      </div>

      <!-- Google Login -->
      <Button
          variant="google"
          class="w-full"
          custom-class="font-medium text-sm"
          @click="useGoogleLogin"
      >
        <img alt="g" src="/images/google.png" class="h-4" />
        <span>Use Google Account</span>
      </Button>

      <div class="flex flex-row items-center justify-center text-xs -m-12">or</div>

      <!-- Email/Password Login -->
      <form @submit.prevent="useEmailLogin" class="flex flex-col gap-4 w-full">
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
        <Button :loading="isLoading" type="submit">Login</Button>
      </form>

      <div class="flex flex-col items-center justify-center">
        <span class="text-zinc-400">No account yet?</span>
        <Anchor href="/register">Sign Up</Anchor>
      </div>

      <!-- Footer -->
      <div class="flex flex-col gap-4 mb-8 lg:hidden">
        <div class="flex items-center justify-center gap-6 zain text-[1.25rem] font-medium text-zinc-700 text-shadow">
          <a href="/what-is-agdayo" class="transition hover:text-zinc-400">What is agdayo?</a>
          <a href="/features" class="transition hover:text-zinc-400">Features</a>
          <a href="/public" class="transition hover:text-zinc-400">About Us</a>
        </div>

        <div class="flex items-center justify-center gap-6 zain text-[1.25rem] font-medium text-zinc-700 text-shadow">
          <a href="/public" class="transition hover:text-zinc-400"><i class="ph ph-instagram-logo"></i></a>
          <a href="/public" class="transition hover:text-zinc-400"><i class="ph ph-facebook-logo"></i></a>
          <a href="/public" class="transition hover:text-zinc-400"><i class="ph ph-tiktok-logo"></i></a>
          <a href="/public" class="transition hover:text-zinc-400"><i class="ph ph-x-logo"></i></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Toasts -->
  <ToastContainer>
    <Toast
        variant="error"
        :message="dangerToast.message"
    />
  </ToastContainer>
</template>

<script setup lang="ts">
import Input from "@/shared/components/UI/Input.vue";
import Button from "@/shared/components/UI/Button.vue";
import Checkbox from "@/shared/components/UI/Checkbox.vue";
import Anchor from "@/shared/components/UI/Anchor.vue";
import ToastContainer from "@/shared/components/UI/ToastContainer.vue";
import Toast from "@/shared/components/UI/Toast.vue";
import { useLogin } from "../composables/useLogin.js";
import { useGoogleLogin } from "@/domains/login/composables/useGoogleLogin.ts";
import { useEmailLogin } from "@/domains/login/composables/useEmailLogin.ts";

// 💡 Extract only what you need from your composable
const {
  loginData,
  isLoading,
  dangerToast,
} = useLogin();
</script>
