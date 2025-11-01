import {login} from "@/core/stores/auth";

export const useSessionLogin = async (user:any, idToken:any) => {
  const sessionResponse = await fetch("/api/v1/auth/session-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!sessionResponse.ok) {
    const errorData = await sessionResponse.json();
    throw new Error(errorData.message || "Failed to create session on server.");
  }

  login({
    user: {
      id: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split("@")[0],
      photoURL: user.photoURL,
    },
    token: idToken,
  });
}