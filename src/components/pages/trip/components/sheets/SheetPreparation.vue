<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:showSheet', false);">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-suitcase"></i> <span class="font-bold">Preparations Checklist</span>
          <div class="flex items-center justify-center">
          </div>
        </div>
        <button @click="$emit('update:showSheet', false);" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex gap-2 mb-6 flex-wrap items-center w-full">
        <Tag label="All Tasks" mode="button" :variant="activeTab === 'all' ? 'peach' : 'gray'" @click="activeTab = 'all'" />
        <Tag label="Completed" mode="button" :variant="activeTab === 'Completed' ? 'peach' : 'gray'" @click="activeTab = 'Completed'" />
        <Tag label="Not Completed" mode="button" :variant="activeTab === 'Not Completed' ? 'peach' : 'gray'" @click="activeTab = 'Not Completed'" />
        <Tag v-for="(category, index) in categories" :label="category" :key="index" mode="button" :variant="activeTab === `${category}` ? 'peach' : 'gray'" @click="activeTab = `${category}`"/>

        <div class="ml-auto text-2xl flex place-content-center">
          <Tag @click="toggleEditMode" :label="'Edit ' + `${editMode ? 'On' : 'Off'}`" mode="button" :variant="'blue'"/>
        </div>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <Card v-for="(item, index) in filteredChecklist" :key="item.id"
              class="shadow-secondary-sm border-secondary-xs flex-row!"
        >
          <Checkbox :id="`task-${item.id}`"
                    v-model="item.completed"
                    :label="item.task"
                    labelClass="!text-base font-medium"

          />
          <div class="ml-auto flex items-center justify-center gap-2">
            <span v-if="item.notes" class="text-sm text-zinc-400">{{ item.notes }}</span>
            <div
                @click="deleteTask(item)"
                v-if="editMode"
                class="ml-auto flex"
            >
              <i class="ph ph-trash cursor-pointer"></i>
            </div>
          </div>
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
    showSheet: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      default: {
        preparationsChecklist: [],
      },
      required: true,
    }
  },

  data() {
    return {
      editMode: false,
      activeTab: 'all',

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

      preparationsChecklist: [...this.modelValue.preparationsChecklist],
    }
  },
  computed: {
    filteredChecklist() {
      if (this.activeTab === 'all') {
        return this.modelValue.preparationsChecklist;
      }
      if (this.activeTab === 'Not Completed') {
        return this.modelValue.preparationsChecklist.filter(task=>!task.completed)
      }
      if (this.activeTab === 'Completed') {
        return this.modelValue.preparationsChecklist.filter(task=>task.completed)
      }
      return this.modelValue.preparationsChecklist.filter(item => item.category === this.activeTab);
    },

    categories() {
      return [...new Set(this.modelValue.preparationsChecklist.map(item=>item.category))]
    },
  },
  watch: {
    preparationsChecklist: {
      handler(newInput){
        this.$emit('update:modelValue', { ...this.modelValue, preparationsChecklist: this.preparationsChecklist })
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    b0ss(item) {
      this.newTask.category = item
    },
    toggleEditMode(){
      this.editMode = !this.editMode
    },

    deleteTask(item){
      const index = this.modelValue.preparationsChecklist.indexOf(item)
      this.modelValue.preparationsChecklist.splice(index, 1)
    },

    addTask() {
      // Ensure task name is not empty
      if (this.newTask.name.trim() === '') return;

      this.modelValue.preparationsChecklist.push({
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
      // this.$emit('update:modelValue', { ...this.modelValue, preparationsChecklist: this.preparationsChecklist })
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