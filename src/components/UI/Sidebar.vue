<template>
    <!-- SIDEBAR or MENU -->
    <div class="flex lg:flex-col p-4 lg:py-4 py-8 items-center lg:justify-between justify-center lg:bg-transparent bg-zinc-100 fixed text-white lg:fixed lg:inset-0 lg:w-fit lg:h-full bottom-0 h-auto w-full z-50">
          <!-- LOGO and USER -->
          <div class="hidden lg:flex flex-col items-center justify-center gap-2 mb-4">
            <div class="flex flex-col">
              <img src="/images/logo-agdayo-sm.png" width="48" alt="">
            </div>
            <span class="text-zinc-400 text-xs">α{{ version }}</span>
          </div>

<!--          <button @click="toggleMenu" class="lg:hidden block text-white fixed top-4 right-4">-->
<!--            ☰-->
<!--          </button>-->

          <!-- NAVIGATION -->
          <div class="flex lg:flex-col gap-4 lg:justify-center justify-around lg:w-fit w-full items-center text-2xl">
            <a href="/active-trip" class="sidebar-buttons" :class="{'text-peach-500!': pathname.includes('active-trip')}" ><i class="ph ph-house"></i></a>
            <a href="/trips" class="sidebar-buttons" :class="{'text-peach-500!': pathname.includes('trips')}" ><i class="ph ph-island"></i></a>
            <a href="/create-trip" class="sidebar-buttons bg-white h-8 w-8 flex items-center justify-center rounded-xl" :class="{'text-peach-500!': pathname.includes('create-trip')}" ><i class="ph ph-plus"></i></a>
            <a href="/expenses" class="sidebar-buttons" :class="{'text-peach-500!': pathname.includes('expenses')}" ><i class="ph ph-coins"></i></a>
            <a href="" class="sidebar-buttons" :class="{'text-peach-500!': pathname.includes('profile')}" ><i class="ph ph-user"></i></a>
            <!--<a href="/reports" class="sidebar-buttons" :class="{'active': this.pathname.includes('reports')}">Reports</a>-->

          </div>

          <!-- BOTTOM -->
          <div class="hidden lg:flex flex-col gap-2 mt-4 items-center">
            <a @click="logoutUser" class="sidebar-buttons"><i class="ph ph-sign-out"></i></a>
          </div>
    </div>
</template>

<script>
import { logout, useAuthStore } from '../../stores/auth';
import { version } from '../../../package.json'
import {apiRequest} from "../../fetch.js";

export default {
  data() {
    return {
      showMenu: false,
      useAuth: useAuthStore,
      pathname: '',
      version: version
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async logoutUser() {
      const res = await apiRequest({
        method: 'DELETE',
        url: "/auth/signout"
      })

      if (!res.ok){
        console.log('RES IS NOT OK')
        return
      }

      await res.json()
      window.location.href = "/login";
    }
  },
  mounted() {
    this.pathname = window.location.pathname
  }
};
</script>

<style scoped>
@reference "../../styles/global.css";

.sidebar-buttons {
  @apply text-2xl cursor-pointer text-zinc-600 transition-all duration-300;
  transition-property: font-size, color;
}

.active {
  @apply text-zinc-100 text-[1.1rem];
}

.sidebar-buttons:hover {
  @apply text-zinc-950;
}
</style>
