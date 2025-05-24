<template>
  <AdvInput id="companions" label="Companions" icon="ph ph-users" summary="">
    <div class="flex flex-col p-1 gap-2">
      <div class="flex gap-2"> <Input
          id="add-companion"
          placeholder="Search or Enter Companion Name"
          prefixIcon="ph ph-user-plus"
          v-model="newCompanionName"
          @keyup.enter="addCompanion"
          class="flex-grow" />
        <Button
            @click="addCompanion"
            :disabled="newCompanionName.trim() === ''" customClass="px-4 py-2 text-sm" >
          Add
        </Button>
      </div>

      <span class="text-sm text-zinc-400">Add friends or family joining the trip.</span>

      <div v-if="companions.length > 0" class="py-2 flex flex-col gap-1">
        <span class="font-medium">Added Companions:</span>
        <div
            v-for="(companion, index) in companions"
            :key="index"
            class="flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-zinc-100"
        >
          <span class="font-medium flex items-center gap-2">
            <i class="ph ph-user text-zinc-500"></i>
            {{ companion }}
          </span>
          <button @click="removeCompanion(index)" class="text-red-500 hover:text-red-700 transition-colors duration-200">
            <i class="ph ph-x-circle text-lg"></i>
          </button>
        </div>
      </div>
      <div v-else class="py-2 flex flex-col gap-0">
        <span class="font-medium text-zinc-400">No companions added yet.</span>
        <span class="text-[12px] font-medium text-zinc-400">Start by typing a name above.</span>
      </div>

      <Button class="w-full" @click="saveCompanions">Confirm Companions</Button>
    </div>
  </AdvInput>
</template>

<script>
import AdvInput from "../../../UI/AdvInput.vue";
import Input from "../../../UI/Input.vue";
import Button from "../../../UI/Button.vue";

export default {
  components: {
    AdvInput,
    Input,
    Button,
  },
  data() {
    return {
      newCompanionName: '',
      companions: [],
    };
  },
  methods: {
    addCompanion() {
      if (this.newCompanionName.trim() !== '') {
        this.companions.push(this.newCompanionName.trim());
        this.newCompanionName = '';
      }
    },
    removeCompanion(index) {
      this.companions.splice(index, 1);
    },
    saveCompanions() {
      console.log('Companions:', this.companions);
      // Here you would typically emit an event or call an API to save the companions
    }
  }
};
</script>

<style scoped>
/* No specific styles needed if all styling is handled by Tailwind and UI components */
</style>