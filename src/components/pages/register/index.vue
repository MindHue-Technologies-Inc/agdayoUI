<template>
  <div class="flex flex-col items-center relative pt-20 px-8 grow">
<!--    LOGO-->
    <div class="flex flex-col items-center gap-4">
      <span class="text-zinc-400 font-bold">Start your travels in</span>
      <img class="w-48" src="/images/logo-agdayo-lg.png" alt="">
      <span class="baybayin text-[.5rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="activeInput" class="gap-4 sm:w-72 w-full pt-20 flex flex-col place-content-center">
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
          <Button @click="createAccount" class="w-full">Create Account</Button>
          <Anchor @click="setActiveInput('email')" href="javascript:void('')">Go Back to email</Anchor>
        </template>
      </div>
    </transition>



    <Anchor class="pt-8" href="/login">Go Back to login</Anchor>
  </div>
</template>

<script>
import Input from "../../UI/Input.vue";
import Anchor from "../../UI/Anchor.vue";
import Button from "../../UI/Button.vue";
import {useRegisterStore, setEmail, setPassword} from "../../../stores/register.js";

export default {
  components: {
    Input,
    Anchor,
    Button,
  },

  data() {
    return {
      useRegister: useRegisterStore,
      activeInput: "email",
      email: '',
      password: '',
    }
  },

  methods: {
    setActiveInput(newInput) {
      this.activeInput = newInput;
    },

    goToPassword() {
      this.setActiveInput("password");
      setEmail(this.email);
      this.useRegister = useRegisterStore;
    },

    createAccount() {
      setPassword(this.password);
      window.location.href = '/build-profile'
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