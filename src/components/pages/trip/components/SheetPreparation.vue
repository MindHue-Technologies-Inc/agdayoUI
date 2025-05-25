<template>
  <Sheet :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full px-6 py-8">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Preparations Checklist</span>
        </div>
        <button @click="$emit('update:modelValue', false)" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex gap-4 mb-6 flex-wrap"> <Tag label="All Tasks" mode="button" :variant="activeTab === 'all' ? 'peach' : 'gray'" @click="activeTab = 'all'" />
        <Tag label="Documents" mode="button" :variant="activeTab === 'documents' ? 'peach' : 'gray'" @click="activeTab = 'documents'" />
        <Tag label="Packing" mode="button" :variant="activeTab === 'packing' ? 'peach' : 'gray'" @click="activeTab = 'packing'" />
        <Tag label="Essentials" mode="button" :variant="activeTab === 'essentials' ? 'peach' : 'gray'" @click="activeTab = 'essentials'" />
      </div>

      <div class="flex-grow w-full overflow-y-auto pr-2 custom-scrollbar">
        <div v-for="item in filteredChecklist" :key="item.id"
             class="flex items-center p-4 mb-3 rounded-xl bg-zinc-50 border border-zinc-200">
          <input
              type="checkbox"
              :id="`task-${item.id}`"
              v-model="item.completed"
              class="form-checkbox h-5 w-5 text-peach-500 rounded border-gray-300 focus:ring-peach-400 cursor-pointer"
          />
          <label :for="`task-${item.id}`"
                 :class="['ml-3 text-lg font-medium', item.completed ? 'text-zinc-500 line-through' : 'text-zinc-700']">
            {{ item.task }}
          </label>
          <span v-if="item.notes" class="ml-auto text-sm text-zinc-400">{{ item.notes }}</span>
        </div>

        <div v-if="filteredChecklist.length === 0" class="text-center text-zinc-500 p-8">
          No tasks in this category.
        </div>
      </div>

      <div class="w-full mt-6">
        <input
            type="text"
            v-model="newTask"
            @keyup.enter="addTask"
            placeholder="Add a new preparation task..."
            class="w-full p-3 border border-zinc-300 rounded-lg focus:ring-peach-500 focus:border-peach-500"
        />
        <Button @click="addTask" class="w-full mt-2">
          Add Task
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../UI/Sheet.vue";
import Tag from "../../../UI/Tag.vue";
import Button from "../../../UI/Button.vue";

export default {
  components: {
    Sheet,
    Tag,
    Button
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    }
  },

  // Declare the events this component can emit
  emits: ['update:modelValue'],

  data() {
    return {
      activeTab: 'all', // Controls the active category tab
      newTask: '', // Stores the input for a new task
      preparationsChecklist: [ // Your checklist data
        { id: 1, task: 'Renew Passport', category: 'documents', completed: false, notes: 'Expires Aug 2025' },
        { id: 2, task: 'Book Accommodation', category: 'essentials', completed: true, notes: 'The Manor' },
        { id: 3, task: 'Buy Travel Insurance', category: 'documents', completed: false },
        { id: 4, task: 'Pack Clothes for Cold Weather', category: 'packing', completed: false },
        { id: 5, task: 'Prepare Itinerary for Day 1', category: 'essentials', completed: false },
        { id: 6, task: 'Charge all devices', category: 'packing', completed: true },
        { id: 7, task: 'Download offline maps', category: 'essentials', completed: false },
      ],
    }
  },
  computed: {
    // Filters the checklist based on the active tab
    filteredChecklist() {
      if (this.activeTab === 'all') {
        return this.preparationsChecklist;
      }
      return this.preparationsChecklist.filter(item => item.category === this.activeTab);
    }
  },
  methods: {
    // Adds a new task to the checklist
    addTask() {
      if (this.newTask.trim() === '') return; // Prevent adding empty tasks
      this.preparationsChecklist.push({
        id: Date.now(), // Unique ID for the new task
        task: this.newTask.trim(),
        category: 'essentials', // Default category for new tasks
        completed: false,
        notes: '',
      });
      this.newTask = ''; // Clear the input field
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>