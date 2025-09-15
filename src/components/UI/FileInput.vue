<template>
  <div class="flex flex-col gap-1">
    <!-- Label -->
    <label v-if="label" :for="id" class="ml-6 text-sm font-medium text-zinc-900">
      {{ label }}
    </label>

    <div class="relative flex items-center">
      <!-- Visually styled input container -->
      <div
          :class="[
          baseClasses,
          disabled ? 'bg-zinc-100 cursor-not-allowed' : 'cursor-pointer',
          modelValue.length > 0 ? 'pr-10' : ''
        ]"
          @click="!disabled && triggerFilePicker()"
      >
        <!-- Display selected file previews or placeholder text -->
        <div class="flex items-center gap-2 overflow-hidden">
          <!-- Image Previews -->
          <template v-if="modelValue.length > 0">
            <div
                v-for="(file, index) in modelValue"
                :key="index"
                class="flex items-center gap-2"
            >
              <img
                  v-if="isImage(file)"
                  :src="imagePreviews[index]"
                  :alt="file.name"
                  class="h-8 w-8 object-cover rounded-md shadow-inner"
              />
              <span
                  v-else
                  class="flex-shrink-0 text-zinc-500 text-sm italic"
              >
                {{ file.name }}
              </span>
            </div>
          </template>

          <!-- Placeholder text when no files are selected -->
          <span
              v-else
              class="block text-base font-normal text-zinc-500"
          >
            {{ multiple ? 'Choose files...' : 'Choose a file...' }}
          </span>
        </div>

        <!-- Clear button for selected files -->
        <button
            v-if="modelValue.length > 0 && !disabled"
            class="absolute right-0 top-1/2 -translate-y-1/2 p-2 mr-2 text-zinc-500 hover:text-red-500 transition-colors duration-200"
            @click.stop="clearFiles"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>

      <!-- Hidden file input element -->
      <input
          :id="id"
          ref="fileInputRef"
          type="file"
          class="hidden"
          :multiple="multiple"
          :required="required"
          :disabled="disabled"
          @change="handleFileChange"
      />
    </div>

    <!-- Error message -->
    <p v-if="error" class="ml-6 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: File[];
  label?: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  error?: string;
}>(), {
  modelValue: () => [],
  required: false,
  disabled: false,
  multiple: false,
  error: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void;
  (e: 'clear'): void;
}>();

// Reference to the hidden file input element
const fileInputRef = ref<HTMLInputElement | null>(null);

const baseClasses = computed(() => `
  w-full px-6 py-3 h-[48px] flex items-center justify-between
  rounded-full border border-zinc-200
  text-zinc-800
  bg-white dark:bg-zinc-900
  shadow-secondary-sm focus:ring-0 focus:outline-none
`);

// Creates temporary object URLs for image files
const imagePreviews = computed(() => {
  return props.modelValue
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
});

// Determines if a file is an image
const isImage = (file: File) => file.type.startsWith('image/');

// Triggers the hidden file input's click event
const triggerFilePicker = () => {
  fileInputRef.value?.click();
};

// Handles the change event from the file input
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    // Revoke any previous object URLs before creating new ones to prevent memory leaks
    imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
    emit('update:modelValue', Array.from(files));
  }
};

// Clears the selected files and resets the input
const clearFiles = () => {
  // Revoke object URLs when clearing files
  imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  emit('update:modelValue', []);
  emit('clear');
};

// Cleanup: Revoke object URLs when the component is unmounted
onUnmounted(() => {
  imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
});
</script>

<style scoped>
/*
 * We can use scoped styles to ensure these only apply to this component.
 * This hides the default file input button and other browser-specific styles.
 */
input[type="file"] {
  display: none;
}
</style>
