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
        <template v-if="activeInput === 'email'">
          <Input
              type="email"
              class="w-full"
              id="email"
              label="Please Enter your email"
              placeholder="Email"
              prefix-icon="ph ph-user"
              v-model="email"
          />
          <Button @click="goToPassword" class="w-full">Next</Button>
        </template>

        <template v-else-if="activeInput === 'password'">
          <Input
              type="password"
              class="w-full"
              id="password"
              label="Please Enter your password"
              placeholder="Password"
              prefix-icon="ph ph-lock"
              v-model="password"
          />
          <Button @click="createAccount" :loading="isLoading" class="w-full">Create Account</Button>
          <Anchor @click="setActiveInput('email')" href="javascript:void('')">Go Back to email</Anchor>
        </template>
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
import Toast from "@/shared/components/UI/Toast.vue";
import {useRegisterStore, setEmail} from "@/core/stores/register.js";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "@/core/lib/firebase/client.js";
import {login} from "@/core/stores/auth.js";

export default {
  components: {
    Input,
    Anchor,
    Button,
    ToastContainer,
    Toast,
  },

  data() {
    return {
      isLoading: false,
      useRegister: useRegisterStore,
      activeInput: "email",
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

    async createAccount() {
      this.isLoading = true;
      // VALIDATE FIRST
      if (this.password == null || this.password === '') {
        this.dangerToast.message = "Please Enter a password.";
        return;
      }

      // -- CREATE USER ON FIREBASE
      // const registerResponse = await createUserWithEmailAndPassword(auth, this.email, this.password)
      try {
        const registerResponse = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: this.email, password: this.password})
        })

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          // Handle API errors (e.g., email already exists, weak password from server)
          throw new Error(registerData.message || 'Registration failed on server.');
        }

        console.log("Client: User registered via API. Server response:", registerData);
      } catch (err) {
        console.error(err)
      }

      try {
        // -- LOGIN USER ON FRONTEND
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);

        const user = userCredential.user
        const idToken = await user.getIdToken();

        // -- LOGIN USER USING BACKEND
        const sessionResponse = await fetch('/api/v1/auth/session-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({idToken})
        })

        if (!sessionResponse.ok) {
          const errorData = await sessionResponse.json();
          throw new Error(errorData.message || 'Failed to create session on server.');
        }

        // -- SESSION COOKIE IS NOW SET BY THE SERVER
        // -- UPDATE THE NANOSTORE AND REDIRECT
        login({
          user: {
            id: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
          },
          token: idToken, // This token is primarily for client-side use if needed. The cookie is the real source of truth for SSR.
        });

        window.location.href = '/build-profile'
      } catch (error) {
        console.error("Client: Registration/Login Error:", error);
        this.dangerToast.message = error.message || 'An unexpected error occurred during registration.';
      }

      this.isLoading = false

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