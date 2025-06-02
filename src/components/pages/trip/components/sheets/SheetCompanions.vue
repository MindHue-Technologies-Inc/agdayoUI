<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-users"></i> <span class="font-bold">Trip Companions</span>
          <Tag label="+ Add More" mode="button" @click="addCompanionRow" />
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <AdvInput
            v-for="(companion, index) in localCompanions"
            :key="companion.id"
            :summary="getCompanionSummary(companion)"
            :label="`Companion ${index + 1}`"
            icon="ph-user-circle"
        >
          <div class="flex flex-col gap-4 p-1">
            <Input :id="`role-${index}`" v-model="companion.name" placeholder="Enter companion's name" label="Name" />
            <div class="grid grid-cols-2 gap-4">
              <Select
                  v-model="companion.role"
                  id="companion-role"
                  label="Role"
                  :options="[
                  { label: 'Family', value: 'Family' },
                  { label: 'Friend', value: 'Friend' },
                  { label: 'Partner', value: 'Partner' },
                  { label: 'Colleague', value: 'Colleague' },
                  { label: 'Other', value: 'Other' }
                ]"
              />
              <Input :id="`age-${index}`" v-model="companion.age" type="number" placeholder="Age (optional)" label="Age" min="0" />
            </div>

            <div class="flex justify-end gap-2 mt-2">
              <Button
                  v-if="index === localCompanions.length - 1 && localCompanions.length > 0"
                  @click="addCompanionRow"
                  variant="primary"
                  class="grow"
              >
                Add Another
              </Button>
              <Button
                  v-if="localCompanions.length > 1"
                  @click="removeCompanionRow(companion.id)"
                  variant="ghost"
                  class="grow"
              >
              Delete Companion
              </Button>
            </div>
          </div>
        </AdvInput>

        <div v-if="localCompanions.length === 0" class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg">
          <i class="ph ph-users-three text-4xl mb-2"></i>
          <p class="text-center">No companions added yet. Click '+ Add More' to begin!</p>
          <Button class="mt-4" @click="addCompanionRow">Add First Companion</Button>
        </div>
      </div>

      <div class="w-full mt-6">
        <Button class="w-full" @click="saveCompanions">Save Companions</Button>
      </div>

    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue";

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, companions: [] }),
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      localCompanions: [],
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
  },

  watch: {
    'modelValue.companions': {
      immediate: true,
      handler(newCompanions) {
        this.localCompanions = newCompanions ? newCompanions.map(c => ({ ...c })) : [];
        if (this.localCompanions.length === 0) {
          this.addCompanionRow();
        }
      }
    },
    showSheet(newVal) {
      if (newVal && this.localCompanions.length === 0) {
        this.addCompanionRow();
      }
    }
  },

  methods: {
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    addCompanionRow() {
      this.localCompanions.push({
        id: this.generateUniqueId(),
        name: '',
        role: 'Friend',
        age: null,
      });
    },
    removeCompanionRow(id) {
      // Filter out the companion to remove
      this.localCompanions = this.localCompanions.filter(companion => companion.id !== id);
      // If no companions left, add a fresh row for user convenience
      if (this.localCompanions.length === 0) {
        this.addCompanionRow();
      }
    },
    getCompanionSummary(companion) {
      if (companion.name) {
        let summary = companion.name;
        if (companion.role && companion.role !== 'Other') {
          summary += ` (${companion.role})`;
        }
        if (companion.age) {
          summary += `, ${companion.age} y.o.`;
        }
        return summary;
      }
      return 'New Companion';
    },
    saveCompanions() {
      const savedCompanions = this.localCompanions.filter(c => c.name.trim() !== '');

      this.$emit('update:modelValue', {
        ...this.modelValue,
        companions: savedCompanions,
        showSheet: false,
      });
    }
  },
  mounted() {
    if (this.localCompanions.length === 0) {
      this.addCompanionRow();
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