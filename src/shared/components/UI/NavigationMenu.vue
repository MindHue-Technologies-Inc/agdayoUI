<template>
  <div class="flex border-b border-zinc-200 overflow-x-auto whitespace-nowrap -mx-4 px-4 md:-mx-6 md:px-6">
    <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="[
        'py-3 px-4 text-center font-medium text-sm md:text-base',
        'transition-colors duration-200 ease-in-out',
        'relative group', // For the underline effect
        activeTabId === tab.id
          ? 'text-peach-600 border-b-2 border-peach-500' // Active state
          : 'text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 border-b-2 border-transparent' // Inactive state
      ]"
    >
      {{ tab.label }}
      <!-- Optional: Animated underline for hover/active -->
      <span
          :class="[
          'absolute bottom-0 left-0 w-full h-0.5 bg-peach-500 transition-transform duration-200 ease-in-out',
          activeTabId === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'
        ]"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface TabItem {
  id: string;
  label: string;
}

const props = defineProps<{
  tabs: TabItem[];
  initialActiveTabId?: string; // Optional prop to set initial active tab
}>();

const emit = defineEmits(['tab-selected']);

const activeTabId = ref<string | null>(null);

// Set initial active tab
onMounted(() => {
  if (props.initialActiveTabId && props.tabs.some(tab => tab.id === props.initialActiveTabId)) {
    activeTabId.value = props.initialActiveTabId;
  } else if (props.tabs.length > 0) {
    activeTabId.value = props.tabs[0].id; // Default to the first tab
  }
  // Emit the initial active tab
  if (activeTabId.value) {
    emit('tab-selected', activeTabId.value);
  }
});

// Watch for changes in tabs prop (e.g., if tabs are loaded dynamically)
watch(() => props.tabs, (newTabs) => {
  if (newTabs.length > 0 && (!activeTabId.value || !newTabs.some(tab => tab.id === activeTabId.value))) {
    activeTabId.value = newTabs[0].id; // Reset to first tab if current active is gone or not set
    emit('tab-selected', activeTabId.value);
  }
}, { deep: true });


const selectTab = (id: string) => {
  if (activeTabId.value !== id) {
    activeTabId.value = id;
    emit('tab-selected', id);
  }
};
</script>

<style scoped>
/* No specific styles needed beyond Tailwind classes for this component */
</style>
