<template>
  <div class="grow mt-8 flex flex-col gap-4 md:mt-16">
    <!--HEADER-->
    <div
      class="flex flex-col gap-4 items-center h-1/2 justify-end transition-all ease-in-out duration-500"
    >
      <h1
          class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit"
      >
        Let
        <span
            style="background-image: linear-gradient(to right, #eea092, #eabf67); color: transparent; background-clip: text;"
        >Agdayo AI</span
        >
        help you plan your next trip!
      </h1>

      <!-- PROMPT FIELD -->
      <div class="w-full relative">
        <Input
            placeholder="Where do you want to go and when?"
            id="prompt"
            v-model="prompt"
            @enter="generateItinerary"
            class="w-full"
        />
        <div class="absolute inset top-2 bottom-2 right-3 z-10">
          <Button @click="generateItinerary" size="sm" custom-class="h-8 w-8 p-0!"
          ><i class="ph ph-arrow-right"></i
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "@/shared/components/UI/Button.vue";
import Input from "@/shared/components/UI/Input.vue";
import { ref, reactive } from "vue";

const dangerToast = reactive({ message: "" });
const userPrompt  = reactive([])
</script>
