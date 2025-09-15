<template>
  <ButtonFile @addPhotos="addPhotos"/>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
    <div v-for="(file, index) in files" class="relative aspect-square flex items-center h-fit rounded-2xl shadow-primary-light-md">
      <div @click="removePhoto(file, index)" class="h-8 w-8 cursor-pointer scale-100 active:scale-90 rounded-full flex items-center justify-center bg-zinc-900 text-zinc-100 absolute -top-3 -right-3">
        <i class="ph ph-x"></i>
      </div>
      <img alt="" class="w-full h-full object-cover rounded-2xl" :src="imagePreviews[index]" />
    </div>
  </div>
  {{imagePreviews}}
</template>

<script setup lang="ts">
import ButtonFile from "@/components/UI/ButtonFile.vue";
import {computed, ref} from "vue";

const files = ref([]);
const addPhotos = (e) => {
  files.value = [...files.value, ...e]
}

const imagePreviews = computed(() => {
  return files.value
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
});

const removePhoto = (file, index) => {
  const url = JSON.parse(JSON.stringify(imagePreviews.value[index]))
  files.value.splice(index, 1)
  URL.revokeObjectURL(url)

}
</script>