<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Preparations Checklist</span>
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex gap-2 mb-6 flex-wrap">
        <Tag label="All Tasks" mode="button" :variant="activeTab === 'all' ? 'peach' : 'gray'" @click="activeTab = 'all'" />
        <Tag v-for="(category, index) in categories" :label="category" :key="index" mode="button" :variant="activeTab === `${category}` ? 'peach' : 'gray'" @click="activeTab = `${category}`"/>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <Card v-for="item in filteredChecklist" :key="item.id"
              class="shadow-secondary-sm border-secondary-xs flex-row!"
        >
          <Checkbox :id="`task-${item.id}`"
                    v-model="item.completed"
                    :label="item.task"
          />
          <span v-if="item.notes" class="ml-auto text-sm text-zinc-400">{{ item.notes }}</span>
        </Card>

        <div v-if="filteredChecklist.length === 0" class="text-center text-zinc-500 p-8">
          No tasks in this category.
        </div>
      </div>

      <div class="w-full flex flex-col gap-2 p-4 rounded-4xl shadow-secondary-sm border-secondary-xs mt-6">
        <Input
            id="newTaskNameInput"
            type="text"
            v-model="newTask.name"
            placeholder="Add a new preparation task..."
            class="mb-2"
            label="Task"
        />

        <Select
          id="bro"
          :options="categoriesOptions"
          v-model="newTask.category"
          placeholder="Select or Enter a Category"
          label="Category"

        />

        <Input
            id="newTaskNotesInput"
            type="text"
            v-model="newTask.notes"
            placeholder="Optional notes for this task..."
            class="mb-2"
            label="Notes"
        />

        <Button @click="addTask" class="w-full mt-2">
          Add Task
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Checkbox from "../../../../UI/Checkbox.vue";
import Card from "../../../../UI/Card.vue";
import Input from "../../../../UI/Input.vue";
import Dropdown from "../../../../UI/Dropdown.vue";
import Select from "../../../../UI/Select.vue"

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Checkbox,
    Card,
    Input,
    Dropdown,
    Select,
  },

  props: {
    modelValue: {
      type: Object,
      default: {showSheet: false},
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      activeTab: 'all',
      // newTask is now an object to hold all new task details
      newTask: {
        name: '',
        category: '',
        notes: ''
      },

      categoriesOptions: [
        { label: 'Documents', value: 'Documents' },
        { label: 'Packing', value: 'Packing' },
        { label: 'Essentials', value: 'Essentials' },
        { label: 'For Albert', value: 'For Albert' },
      ],

      preparationsChecklist: [
        { id: 1, task: 'Renew Passport', category: 'Documents', completed: false, notes: 'Expires Aug 2025' },
        { id: 2, task: 'Book Accommodation', category: 'Essentials', completed: true, notes: 'The Manor' },
        { id: 3, task: 'Buy Travel Insurance', category: 'Documents', completed: false },
        { id: 4, task: 'Pack Clothes for Cold Weather', category: 'Packing', completed: false },
        { id: 5, task: 'Prepare Itinerary for Day 1', category: 'Essentials', completed: false },
        { id: 6, task: 'Charge all devices', category: 'Packing', completed: true },
        { id: 7, task: 'Download offline maps', category: 'Essentials', completed: false },
        { id: 8, task: 'Jacket ni Albert', category: 'For Albert', completed: false }, // Fixed duplicate ID
      ],
    }
  },
  computed: {
    filteredChecklist() {
      if (this.activeTab === 'all') {
        return this.preparationsChecklist;
      }
      return this.preparationsChecklist.filter(item => item.category === this.activeTab);
    },

    categories() {
      return [...new Set(this.preparationsChecklist.map(item=>item.category))]
    },

    showSheet() {
      return this.modelValue.showSheet
    }
  },
  methods: {
    b0ss(item) {
      this.newTask.category = item
    },
    addTask() {
      // Ensure task name is not empty
      if (this.newTask.name.trim() === '') return;

      this.preparationsChecklist.push({
        id: Date.now(), // Simple unique ID
        task: this.newTask.name.trim(), // Use newTask.name
        category: this.newTask.category, // Use newTask.category
        completed: false,
        notes: this.newTask.notes.trim(), // Use newTask.notes
      });

      // Reset the new task object for the next entry
      this.newTask = {
        name: '',
        category: '', // Reset to default
        notes: ''
      };
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