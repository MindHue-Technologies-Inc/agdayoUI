<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 place-content-center text-3xl text-zinc-800">
          <i class="ph ph-note-pencil"></i>
          <span class="font-bold">Day Note for {{ formattedDate }}</span>
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">

        <AdvInput :summary="localNote.title || 'Enter a title for this day\'s note'" label="Note Title" icon="ph-bookmark-simple">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localNote.title" placeholder="e.g., Important Reminders, Day 3 Summary" label="Title"/>
          </div>
        </AdvInput>

        <AdvInput :summary="localNote.content ? localNote.content.substring(0, 50) + '...' : 'Add details for this note'" label="Note Details" icon="ph-notepad">
          <div class="flex flex-col gap-4 p-1">
            <Input v-model="localNote.content" type="textarea" rows="8" placeholder="Write down anything important for this day: reminders, observations, things to remember, etc."/>
          </div>
        </AdvInput>

        <div class="flex justify-end mt-4">
          <Button
              v-if="modelValue.note && modelValue.note.id"
              @click="deleteNote"
              variant="ghost"
          >
            Delete Note
          </Button>
        </div>

      </div>

      <div class="w-full mt-6 flex gap-4">
        <Button @click="cancelNote" variant="secondary" class="flex-1">
          Cancel
        </Button>
        <Button @click="saveNote" :disabled="!localNote.title.trim()" class="flex-1">
          Save Note
        </Button>
      </div>

    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import AdvInput from "../../../../UI/AdvInput.vue"; // Ensure AdvInput is available

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    AdvInput,
  },

  props: {
    // modelValue is an object: { showSheet: boolean, day: string (e.g., '2025-05-14'), note: object|null }
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, day: '', note: null }),
      required: true,
    }
  },

  emits: ['update:modelValue', 'note-saved', 'note-deleted'],

  data() {
    return {
      localNote: this.getInitialNoteState(),
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // Formatted date for the header display
    formattedDate() {
      if (this.modelValue.day) {
        try {
          const date = new Date(this.modelValue.day + 'T00:00:00'); // Add T00:00:00 to avoid timezone issues
          return date.toLocaleDateString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch (error) {
          console.error("Error formatting date:", error);
          return this.modelValue.day; // Fallback to raw date string
        }
      }
      return 'N/A';
    },
  },

  watch: {
    // Watch modelValue.showSheet to reset form or load data when sheet opens/closes
    'modelValue.showSheet': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // If a specific note is passed for editing, load it
          if (this.modelValue.note) {
            this.localNote = { ...this.modelValue.note };
          } else {
            // Otherwise, reset to initial state for a new note
            this.localNote = this.getInitialNoteState();
          }
        }
      }
    }
  },

  methods: {
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialNoteState() {
      return {
        id: this.generateUniqueId(),
        day: this.modelValue.day, // Associate the note with the day
        title: '',
        content: '',
      };
    },
    cancelNote() {
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false });
    },
    saveNote() {
      if (!this.localNote.title.trim()) {
        alert('Note title is required!');
        return;
      }
      // Ensure the note is associated with the correct day
      this.localNote.day = this.modelValue.day;

      this.$emit('note-saved', this.localNote); // Emit the full note object
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false }); // Close the sheet
    },
    deleteNote() {
      if (confirm('Are you sure you want to delete this note?')) {
        this.$emit('note-deleted', this.localNote.id); // Emit the ID of the note to be deleted
        this.$emit('update:modelValue', { ...this.modelValue, showSheet: false }); // Close the sheet
      }
    }
  }
};
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