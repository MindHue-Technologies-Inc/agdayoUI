<template>
  <div>
    <!-- TOPBAR for small screens -->
    <div class="2xl:hidden fixed top-0 left-0 right-0 flex justify-start items-center gap-4 p-4 bg-black z-50">
      <div @click="toggleMenu" class="text-white flex items-center justify-center h-full">
        <i class="ph ph-list text-2xl"></i>
      </div>
      <span class="text-lg font-semibold text-white">Where's My Money</span>
    </div>

    <!-- SIDEBAR or MENU -->
    <div
      class="text-white 2xl:fixed 2xl:inset-0 2xl:w-64 2xl:h-full 2xl:block z-50"
       :class="[
          showMenu ? 'block' : 'hidden',
          '2xl:flex']">
        
      <div class="2xl:static 2xl:z-0 z-20 fixed inset-0 items-center bg-black p-4 flex flex-col h-full justify-between">
        <div class="2xl:static 2xl:z-0 z-20 shrink w-fit bg-black p-4 flex flex-col h-full justify-between">
          <!-- LOGO and USER -->
          <div class="flex flex-col gap-2 mb-4">
            <div class="flex flex-col">
              <span class="text-lg">Where's My Money</span>
              <span class="text-zinc-600 text-xs">α{{ version }}</span>
            </div>
            <span>{{ useAuth.value.user.full_name }}</span>
          </div>

          <button @click="toggleMenu" class="2xl:hidden block text-white fixed top-4 right-4">
            ☰
          </button>

          <!-- NAVIGATION -->
          <div class="flex flex-col gap-2">
            <a href="/expense-plan/" class="sidebar-buttons" :class="{'active': this.pathname.includes('expense-plan')}">Expense Plan</a>
            <a href="/expenses" class="sidebar-buttons" :class="{'active': this.pathname.includes('expenses')}">Expenses</a>
            <a href="/income" class="sidebar-buttons" :class="{'active': this.pathname.includes('income')}">Income</a>
            <a href="/accounts" class="sidebar-buttons" :class="{'active': this.pathname.includes('accounts')}">Accounts</a>
            <hr class="text-zinc-800">
            <a href="/charts" class="sidebar-buttons" :class="{'active': this.pathname.includes('charts')}">Charts</a>
            <!--<a href="/reports" class="sidebar-buttons" :class="{'active': this.pathname.includes('reports')}">Reports</a>-->

          </div>

          <!-- BOTTOM -->
          <div class="flex flex-col gap-2 mt-4">
            <a href="/settings" class="sidebar-buttons" :class="{'active': this.pathname.includes('settings')}">Settings</a>
            <a @click="logoutUser" class="sidebar-buttons">Logout</a>
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
  @apply text-base cursor-pointer text-zinc-400 transition-all duration-300;
  transition-property: font-size, color;
}

.active {
  @apply text-zinc-100 text-[1.1rem];
}

.sidebar-buttons:hover {
  @apply text-zinc-100;
  font-size: 1.1rem;
}
</style>
