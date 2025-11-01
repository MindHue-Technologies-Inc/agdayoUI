import { ref } from "vue"
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/core/lib/firebase/client.ts";
import {login} from "@/core/stores/auth";
import {useSessionLogin} from "@/domains/login/composables/useSessionLogin.ts";
import { useLogin } from "@/domains/login/composables/useLogin.ts";

const { dangerToast } = useLogin()

export const useGoogleLogin = async ()=>  {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    const idToken = await user.getIdToken();

    // -- REGISTER USER IN BACKEND --
    const googleResponse = await fetch("/api/v1/auth/register-using-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });

    if (!googleResponse.ok) {
      const errorData = await googleResponse.json();
      throw new Error(errorData.message || "Failed to create session on server.");
    }

    // -- CREATE SESSION COOKIE --
    await useSessionLogin(user, idToken)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectTo = urlParams.get("redirect_to");

    if (redirectTo) {
      window.location.href = decodeURIComponent(redirectTo);
    } else {
      window.location.href = "/active-trip";
    }
  } catch (error) {
    console.error("Google Login Error:", error.code, error.message);
    let userFacingMessage = "An error occurred during Google sign-in. Please try again.";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        userFacingMessage = "Google sign-in popup was closed.";
        break;
      case "auth/cancelled-popup-request":
        userFacingMessage = "Sign-in request was cancelled.";
        break;
      default:
        userFacingMessage = error.message;
        break;
    }

    dangerToast.value.message = userFacingMessage;
  }
}