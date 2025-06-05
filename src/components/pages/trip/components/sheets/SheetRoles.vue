<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-hand-palm"></i> <span class="font-bold">Trip Roles</span>
          <Tag label="+ Add Role" mode="button" @click="addRoleRow" />
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <AdvInput
            v-for="(role, index) in localRoles"
            :key="role.id"
            :summary="getRoleSummary(role)"
            :label="`Role ${index + 1}`"
            icon="ph-user-list"
            @remove="removeRoleRow(role.id)"
            removable
        >
          <div class="flex flex-col gap-4 p-1">
            <Input :id="index + 'name'" v-model="role.name" placeholder="e.g., Driver, Photographer, Payer" label="Role Name" />

            <Select
                v-model="role.assigneeId"
                :id="`role-assignee-${role.id}`"
                label="Assigned To"
                :options="assigneeOptions"
            />

            <Input :id="index + 'notes'" v-model="role.notes" placeholder="e.g., responsible for navigation, handles all payments" label="Notes (Optional)" />

            <div class="flex justify-end mt-2">
              <Button v-if="localRoles.length > 1" @click="removeRoleRow(role.id)" variant="ghost">
                Delete Role
              </Button>
            </div>
          </div>
        </AdvInput>

        <div v-if="localRoles.length === 0" class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg">
          <i class="ph ph-users-three text-4xl mb-2"></i>
          <p class="text-center">No roles defined yet. Click '+ Add Role' to assign responsibilities!</p>
          <Button class="mt-4" @click="addRoleRow">Add First Role</Button>
        </div>
      </div>

      <div class="w-full mt-6">
        <Button class="w-full" @click="saveRoles">Save Roles</Button>
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
import AdvInput from "../../../../UI/AdvInput.vue"; // Ensure AdvInput has removable prop and emits 'remove'

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
    // modelValue is expected to be an object controlling sheet visibility
    // and containing an array of roles, plus a list of available companions.
    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        roles: [],
        companions: [], // This prop will be used to populate the assignee dropdown
        selfName: 'Me', // A default for the user themselves
      }),
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      // Create a local copy of roles to allow direct manipulation
      localRoles: [],
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // Generate options for the assignee dropdown
    assigneeOptions() {
      const options = [{ label: 'Unassigned', value: null }]; // Option for no one assigned
      // Add 'Me' option
      options.push({ label: this.modelValue.selfName || 'Me', value: 'self' });

      // Add companions from the modelValue prop
      if (this.modelValue.companions && Array.isArray(this.modelValue.companions)) {
        this.modelValue.companions.forEach(companion => {
          if (companion.id && companion.name) {
            options.push({ label: companion.name, value: companion.id });
          }
        });
      }
      return options;
    }
  },

  watch: {
    // Watch the prop and initialize localRoles when it changes
    'modelValue.roles': {
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Watch nested properties of modelValue.roles
      handler(newRoles) {
        // Deep copy to avoid mutating the prop directly
        this.localRoles = newRoles ? newRoles.map(r => ({ ...r })) : [];
        // Add a default row if no roles exist and sheet is being opened
        if (this.showSheet && this.localRoles.length === 0) {
          this.addRoleRow();
        }
      }
    },
    // Watch showSheet to add a new role row if the sheet is opened and there are no roles
    showSheet(newVal) {
      if (newVal && this.localRoles.length === 0) {
        this.addRoleRow();
      }
    }
  },

  methods: {
    // Generates a unique ID for new role entries
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    // Adds a new blank role object to the localRoles array
    addRoleRow() {
      this.localRoles.push({
        id: this.generateUniqueId(),
        name: '',
        assigneeId: null, // Default to unassigned
        notes: '',
      });
    },
    // Removes a role entry from the localRoles array by ID
    removeRoleRow(id) {
      this.localRoles = this.localRoles.filter(role => role.id !== id);
      // Optional: if all removed, add a new blank row for convenience
      if (this.localRoles.length === 0) {
        this.addRoleRow();
      }
    },
    // Creates a summary string for the AdvInput component header
    getRoleSummary(role) {
      const assigneeName = this.assigneeOptions.find(option => option.value === role.assigneeId)?.label || 'Unassigned';
      if (role.name) {
        return `${role.name} (${assigneeName})`;
      }
      return `New Role (${assigneeName})`;
    },
    // Emits the updated roles data back to the parent
    saveRoles() {
      // Filter out any completely empty role rows before emitting (only name is required for roles)
      const savedRoles = this.localRoles.filter(r => r.name.trim() !== '');

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet, companions, selfName)
        roles: savedRoles, // Update the roles array
        showSheet: false, // Close the sheet
      });
    }
  },
  mounted() {
    // Initialize with one role if none exist on mount and sheet is visible
    if (this.showSheet && this.localRoles.length === 0) {
      this.addRoleRow();
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