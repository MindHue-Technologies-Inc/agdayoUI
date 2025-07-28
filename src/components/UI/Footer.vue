<template>
  <footer class="flex flex-col gap-10 bottom-0 w-full text-center text-sm text-zinc-500 py-4">
    <p>
      &copy; {{ currentYear }} MindHue Technologies Inc. All rights reserved. |
      <!--<Anchor href="/subscribe" class="text-blue-500 hover:underline">Subscribe</Anchor> |-->
      <Anchor href="" @click="logoutUser" class="text-blue-500 hover:underline">Logout</Anchor>
    </p>
  </footer>
</template>

<script>
import Anchor from "./Anchor.vue";
import {auth} from "../../lib/firebase/client.js";
import {logout} from "../../stores/auth.js";
export default {
  name: "AppFooter",
  components: {
    Anchor
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },

  methods: {
    async logoutUser() {
      try {
        // -- 1. SIGN OUT FROM FIREBASE CLIENT SDK
        await auth.signOut()
        console.log('FIREBASE CLIENT-SIDE SIGN OUT SUCCESSFUL')

        // -- 2. SEND REQUEST TO YOUR SERVER-SIDE LOGOUT API TO CLEAR THE HTTPONLY COOKIE
        const response = await fetch('/api/v1/auth/session-logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Server-side logout failed.');
        }

        console.log('SERVER-SIDE SESSION CLEARED')

        // -- 3. CLEAR NANOSTORES


        // -- 4. REDIRECT TO LOGIN
        window.location.href = '/login'
      } catch (error) {
        console.error("Logout Error:", error);
        alert(`An error occurred during logout. Please try again. ${error}`);
      }
    }
  }
};
</script>