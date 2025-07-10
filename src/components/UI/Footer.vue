<template>
  <footer class="flex flex-col gap-10 bottom-0 w-full text-center text-sm text-zinc-500 py-4">
    <p>
      &copy; {{ currentYear }} MindHue Technologies Inc. All rights reserved. |
      <!--<Anchor href="/subscribe" class="text-blue-500 hover:underline">Subscribe</Anchor> |-->
      <Anchor href="/login" class="text-blue-500 hover:underline">Logout</Anchor>
    </p>
  </footer>
</template>

<script>
import Anchor from "./Anchor.vue";
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
};
</script>