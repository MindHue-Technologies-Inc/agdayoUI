import { ref, onMounted } from "vue";
import { auth } from "@/core/lib/firebase/client.ts";
import { login, useAuthStore } from "@/core/stores/auth.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useSessionLogin } from "@/domains/login/composables/useSessionLogin.ts";

// -- STATES --
const isLoading = ref(false);
const useAuth = ref(useAuthStore.get());
const loginData = ref({
  email: "",
  password: "",
  rememberMe: false,
});
const dangerToast = ref({ message: null });

export function useLogin() {
  // Watch auth state
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) console.log("User is logged in:", user);
    });
  });

  // ✅ RETURN ALL STATES AND ACTIONS
  return {
    // States
    isLoading,
    useAuth,
    loginData,
    dangerToast,
  };
}
