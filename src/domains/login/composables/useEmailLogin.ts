import { ref, onMounted } from "vue";
import { auth } from "@/core/lib/firebase/client.ts";
import { login, useAuthStore } from "@/core/stores/auth.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {useSessionLogin} from "@/domains/login/composables/useSessionLogin.ts";
import { useLogin } from "./useLogin.ts"

const { loginData, useAuth, isLoading, dangerToast } = useLogin()

export const useEmailLogin = async () => {
  if (!loginData.value.email) {
    dangerToast.value.message = "Please enter your email address.";
    return;
  }

  if (!loginData.value.password) {
    dangerToast.value.message = "Please enter your password.";
    return;
  }

  isLoading.value = true;

  try {
    const { email, password } = loginData.value;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    await useSessionLogin(user, idToken)

    window.location.href = "/active-trip";
  } catch (err) {
    console.error("[Login Handler Error]:", err);
    if (err.message.includes("invalid-credential")) {
      dangerToast.value.message = "Please enter a valid email and password.";
    } else {
      dangerToast.value.message = "A network error occurred. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
}