<template>
  <div class="relative flex items-center justify-center min-w-[375px] w-full lg:w-[390px]">
    <!-- HEADER -->

    <div class="flex flex-col gap-16 items-center justify-center w-fit">
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="text-zinc-400 font-bold">Start your travels in</span>
        <img class="w-60" src="/images/logo-agdayo-lg.png" alt="Agdayo Logo">
        <span class="baybayin text-[.7rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
      </div>

      <!--<Button @click="redirectToHome">Try out Agdayo</Button>-->

      <Button
          variant="google"
          class="w-full"
          custom-class="font-medium text-sm"
          @click="handleLoginWithGoogle"
      >
        <img alt="g" src="/images/google.png" class="h-4"/>
        <span>Use Google Account</span>
      </Button>

      <div class="flex flex-row items-center justify-center text-xs -m-12">
        or
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
        <Button :loading="isLoading" type="submit">Login</Button>
      </form>

      <div class="flex flex-col items-center justify-center">
        <span class="text-zinc-400">No account yet?</span>
        <Anchor href="/register">Sign Up</Anchor>
      </div>

      <div class="flex flex-col gap-4 mb-8 lg:hidden">
        <div class="flex items-center justify-center gap-6 zain text-[1.25rem] font-medium text-zinc-700 text-shadow">
          <!-- What is agdayo -->
          <a href="/what-is-agdayo" class="transition hover:text-zinc-400">What is agdayo?</a>

          <!-- Features -->
          <a href="/features" class="transition hover:text-zinc-400">Features</a>

          <!-- About us -->
          <a href="/public" class="transition hover:text-zinc-400">About Us</a>
        </div>
        <div class="flex items-center justify-center gap-6 zain text-[1.25rem font-medium text-zinc-700 text-shadow">
          <!-- Links -->
          <!-- IG -->
          <a href="/public" class="flex items-center justify-center transition hover:text-zinc-400">
            <i class="ph ph-instagram-logo"></i>
          </a>

          <!-- FACEBOOK -->
          <a href="/public" class="flex items-center justify-center transition hover:text-zinc-400">
            <i class="ph ph-facebook-logo"></i>
          </a>

          <!-- TIKTOK -->
          <a href="/public" class="flex items-center justify-center transition hover:text-zinc-400">
            <i class="ph ph-tiktok-logo"></i>
          </a>

          <!-- X -->
          <a href="/public" class="flex items-center justify-center transition hover:text-zinc-400">
            <i class="ph ph-x-logo"></i>
          </a>
        </div>
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
import Input from "@/shared/components/UI/Input.vue";
import Button from "@/shared/components/UI/Button.vue";
import Checkbox from "@/shared/components/UI/Checkbox.vue";
import Anchor from "@/shared/components/UI/Anchor.vue";
import ToastContainer from "@/shared/components/UI/ToastContainer.vue";
import Toast from "@/shared/components/UI/Toast.vue";
import { auth } from "@/core/lib/firebase/client.ts";
import { login, useAuthStore } from "@/core/stores/auth.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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
      useAuth: useAuthStore.get(),
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
    redirectToHome() {
      window.location.href = '/active-trip'
    },

    async handleLoginWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;
        const user = result.user;
        const idToken = await user.getIdToken();

        // -- CREATE A FIRESTORE DATA FOR THIS USER
        const googleResponse = await fetch('/api/v1/auth/register-using-google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
          })
        })

        if (!googleResponse.ok) {
          const errorData = await googleResponse.json();
          throw new Error(errorData.message || 'Failed to create session on server.');
        }

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
            photoURL: user.photoURL
          },
          token: idToken, // This token is primarily for client-side use if needed. The cookie is the real source of truth for SSR.
        });

        // Get the current URL's query string (e.g., "?redirect_to=%2Ftrips%2F...")
        const queryString = window.location.search;

        // Create a URLSearchParams object from the query string
        const urlParams = new URLSearchParams(queryString);

        // Retrieve the value of the 'redirect_to' parameter
        const redirectTo = urlParams.get('redirect_to');

        if (redirectTo) {
          window.location.href = decodeURIComponent(redirectTo);
        } else {
          window.location.href='/active-trip'
        }
      } catch (error) {
        console.error("Google Login Error:", error.code, error.message);
        let userFacingMessage = "An error occurred during Google sign-in. Please try again.";

        switch (error.code) {
          case 'auth/popup-closed-by-user':
            userFacingMessage = "Google sign-in popup was closed.";
            break;
          case 'auth/cancelled-popup-request':
            userFacingMessage = "Sign-in request was cancelled.";
            break;
            // You might add more specific error handling here
          default:
            userFacingMessage = error.message;
            break;
        }
        // Update your UI with errorMessage
        this.dangerToast.message = userFacingMessage
      }
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

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user
        const idToken = await user.getIdToken();

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
            photoURL: user.photoURL
          },
          token: idToken, // This token is primarily for client-side use if needed. The cookie is the real source of truth for SSR.
        });

        window.location.href='/active-trip'

      } catch (err) {
        // This catch block handles network errors or errors thrown by apiRequest itself
        console.error("[Login Handler Error]:", err);
        if (err.message.includes('invalid-credential')) {
          this.dangerToast.message = "Please Enter a valid email and password.";
        } else {
          this.dangerToast.message = "A network error occurred. Please try again.";
        }

        this.isLoading = false; // Always turn off loading state
        // Emit a general error event
        this.$emit('login-error', err);
      }
    },
  },

  mounted() {
    onAuthStateChanged(auth, (user)=>{
      if(user)
        console.log(user)
    })
  }
};
</script>