<template>
  <footer class="bottom-0 w-full text-center text-sm text-zinc-500 py-4">
    <p>
      &copy; {{ currentYear }} MindHue Technologies Inc. All rights reserved.
    </p>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>