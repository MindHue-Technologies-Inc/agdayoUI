<template>
  <transition name="fade" appear>
    <div class="flex flex-col gap-4">
      <!--TITLE-->
      <div class="text-2xl gap-2 font-bold flex items-center">
        <i class="ph ph-users"></i>
        <span>My Friends</span>
      </div>
      <!--SEARCH FIELD-->
      <Input
          id="friends-search"
          prefix-icon="ph ph-magnifying-glass"
          placeholder="Search friends"
      />

      <!--LIST OF FRIENDS-->
      <template v-if="props.friends.length > 0">
        FREINDS
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10">
          <i class="ph ph-users text-3xl"></i>
          <span>You have no friends</span>
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Input from "../../../UI/Input.vue";
import Button from "../../../UI/Button.vue";
import { ref, defineProps } from 'vue'

const props = defineProps({
  friends: {
    type: Array,
    default: [],
  }
})
</script>