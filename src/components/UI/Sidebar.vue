<template>
  <div>
    <!-- BOTTOM BAR for small screens -->
    <div class="2xl:hidden fixed bottom-0 left-0 right-0 flex justify-start items-center gap-4 p-4 border z-50">
      <div @click="toggleMenu" class="text-white flex items-center justify-center h-full">
        <i class="ph ph-list text-2xl"></i>
      </div>
      <span class="text-lg font-semibold text-white">Where's My Money</span>
    </div>

    <!-- SIDEBAR or MENU -->
    <div class="text-white 2xl:fixed 2xl:inset-0 2xl:w-fit 2xl:h-full 2xl:block z-50"
       :class="[
          showMenu ? 'block' : 'hidden',
          '2xl:flex'
        ]">
        
      <div class="2xl:static 2xl:z-0 z-20 fixed inset-0 items-center flex flex-col h-full justify-between">
        <div class="2xl:static 2xl:z-0 z-20 shrink w-fit p-4 flex flex-col h-full justify-between">
          <!-- LOGO and USER -->
          <div class="flex flex-col items-center justify-center gap-2 mb-4">
            <div class="flex flex-col">
              <img src="/images/logo-agdayo-sm.png" width="48" alt="">
            </div>
            <span class="text-zinc-400 text-xs">α{{ version }}</span>
          </div>

          <button @click="toggleMenu" class="2xl:hidden block text-white fixed top-4 right-4">
            ☰
          </button>

          <!-- NAVIGATION -->
          <div class="flex flex-col gap-4 items-center text-2xl">
            <a href="" class="sidebar-buttons text-peach-500!" ><i class="ph ph-house"></i></a>
            <a href="" class="sidebar-buttons" ><i class="ph ph-island"></i></a>
            <a href="" class="sidebar-buttons bg-white h-8 w-8 flex items-center justify-center rounded-xl" ><i class="ph ph-plus"></i></a>
            <a href="" class="sidebar-buttons" ><i class="ph ph-coins"></i></a>
            <a href="" class="sidebar-buttons" ><i class="ph ph-user"></i></a>
            <!--<a href="/reports" class="sidebar-buttons" :class="{'active': this.pathname.includes('reports')}">Reports</a>-->

          </div>

          <!-- BOTTOM -->
          <div class="flex flex-col gap-2 mt-4 items-center">
            <a @click="logoutUser" class="sidebar-buttons"><i class="ph ph-sign-out"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, useAuthStore } from '../../stores/auth';
import { version } from '../../../package.json'

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
      await fetch('/api/logout', { method: 'POST' });
      logout();
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
