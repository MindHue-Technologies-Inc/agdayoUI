<template>
  <div class="flex items-center justify-center min-w-[375px] w-full lg:w-[390px]">
    <div class="flex flex-col gap-16 items-center justify-center w-fit">
      <!-- TOP TITLE -->
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="text-zinc-400 font-bold">Start your travels in</span>
        <img class="w-60" src="/images/logo-agdayo-lg.png" alt="">
        <span class="baybayin text-[.7rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
      </div>

      <!-- LOGIN FORM -->
      <div class="flex flex-col gap-4 w-full">
        <Input id="email-input" label="Email" placeholder="Enter your Email" type="email" prefixIcon="ph ph-user" />
        <Input id="password-input" label="Password" placeholder="Enter your password" type="password" prefixIcon="ph ph-lock"/>
        <Checkbox id="remember-me" label="Remember Me" />
        <Button>Login</Button>
      </div>
      <!-- REGISTER BUTTON -->
      <div class="flex flex-col items-center justify-center">
        <span class="text-zinc-400">No account yet?</span>
        <Anchor href="/">Sign Up</Anchor>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../../UI/Input.vue";
import Button from "../../UI/Button.vue";
import Checkbox from "../../UI/Checkbox.vue";
import Anchor from "../../UI/Anchor.vue";

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Anchor,
  },


}
</script>