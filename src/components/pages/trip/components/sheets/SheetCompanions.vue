<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:showSheet', false)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-users"></i> <span class="font-bold">Trip Companions</span>
          <Tag label="+ Add More" mode="button" @click="addCompanionRow" />
        </div>
        <button @click="$emit('update:showSheet', false)" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex flex-col w-full gap-10">
        <!-- CURRENT COMPANIONS -->
        <div class="flex flex-col gap-4 w-full">
          <!--TITLE-->
          <span class="text-xl font-semibold">Current Companions</span>

          <!--COMPANIONS-->
          <div class="flex flex-col gap-2">
            <div v-for="(companion, index) in companions"
                 class="fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-row items-center justify-start"
                 :class="`fadeIn-${index}`"
            >
              <div :class="[
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ]">
                <img v-if="companion.photoURL" :src="companion.photoURL" alt="">
                <i v-else class="ph ph-user"></i>
              </div>
              <div class="flex flex-col gap-0 grow">
                <span v-if="companion.displayName" class="font-semibold">{{ companion.displayName }}</span>
                <span v-else-if="companion.email" class="font-semibold">{{ companion.email }}</span>
              </div>
              <Tag v-if="ownerUid !== companion.uid" mode="button" label="Remove" icon="ph ph-x" />
              <Tag v-else label="Organizer" icon="ph ph-crown" variant="yellow" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <!--TITLE-->
          <div class="text-2xl gap-2 font-bold flex items-center">
            <i class="ph ph-users"></i>
            <span>My Friends</span>
          </div>
          <!--SEARCH FIELD-->
          <Input
              id="friends-search"
              prefix-icon="ph ph-magnifying-glass"
              placeholder="Search friends"
              v-model="searchQuery"
              @input="debounceInput"
          />

          <span>Your Friends</span>

          <!--YOUR ACCEPTED FRIENDS-->
          <template v-if="filteredAcceptedFriendships.length > 0" v-for="(person, index) in filteredAcceptedFriendships">
            <div
                v-if="person.user1Uid !== uid"
                class="fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"
                :class="`fadeIn-${index}`"
            >
              <div class="flex gap-3 self-start items-center justify-start">
                <div :class="[
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ]">
                  <img v-if="person.user1PhotoURL" :src="person.user1PhotoURL" alt="">
                  <i v-else class="ph ph-user"></i>
                </div>
                <div class="flex flex-col gap-0 grow">
                  <span v-if="person.user1DisplayName" class="font-semibold">{{ person.user1DisplayName }}</span>
                  <span v-else-if="person.user1Email" class="font-semibold">{{ person.user1Email }}</span>
                </div>
              </div>
              <span class="text-sm" v-if="companions.map(c=>c.uid).includes(person.user1Uid)">Already Added</span>
              <Tag
                  v-else
                  @click="addCompanion({
                    uid: person.user1Uid,
                    displayName: person.user1DisplayName,
                    email: person.user1Email,
                    photoURL: person.user1PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })"
                  mode="button"
                  label="Add Companion"
                  icon="ph ph-user-plus" />
            </div>

            <div
                v-else
                class="fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"
                :class="`fadeIn-${index}`"
            >
              <div class="flex gap-3 self-start items-center justify-start">
                <div :class="[
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ]">
                  <img v-if="person.user2PhotoURL" :src="person.user2PhotoURL" alt="">
                  <i v-else class="ph ph-user"></i>
                </div>
                <div class="flex flex-col gap-0 grow">
                  <span v-if="person.user2DisplayName" class="font-semibold">{{ person.user2DisplayName }}</span>
                  <span v-else-if="person.user2Email" class="font-semibold">{{ person.user2Email }}</span>
                </div>
              </div>
              <span class="text-sm" v-if="companions.map(c=>c.uid).includes(person.user2Uid)">Already Added</span>
              <Tag
                  v-else
                  @click="addCompanion({
                    uid: person.user2Uid,
                    displayName: person.user2DisplayName,
                    email: person.user2Email,
                    photoURL: person.user2PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })"
                  mode="button"
                  label="Add Companion"
                  icon="ph ph-user-plus" />
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10">
              <i class="ph ph-users text-3xl"></i>
              <span>You have no friends</span>
            </div>
          </template>
        </div>
      </div>

      <!--<div class="w-full mt-6">-->
      <!--  <Button class="w-full" @click="saveCompanions">Save Companions</Button>-->
      <!--</div>-->

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
import Friends from "../../../profile/components/Friends.vue";
import Anchor from "../../../../UI/Anchor.vue";
import {computed} from "vue";

export default {
  components: {
    Anchor,
    Friends,
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
    },
    showSheet: {
      type: Boolean,
      default: false,
    },
    acceptedFriendships: {
      type: Array,
      default: [],
    },
    ownerUid: {
      type: String,
      default: '',
    },
    uid: {
      type: String,
      default: '',
    }
  },

  emits: ['update:modelValue', 'companionAdded'],

  data() {
    return {
      localCompanions: [],
      searchQuery: '',
      debouncedSearchQuery: '',
      timeoutId: null,
    };
  },

  computed: {
    companions() {
      return [...this.modelValue]
    },

    filteredAcceptedFriendships() {
      if (!this.debouncedSearchQuery) return this.acceptedFriendships
      return this.acceptedFriendships.filter(f=>{
        return f.user2DisplayName.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase()) ||
            f.user1DisplayName.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase())
      })
    }
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
    debounceInput() {
      if (this.timeoutId) clearTimeout(this.timeoutId)

      this.timeoutId = setTimeout(()=>{
        this.debouncedSearchQuery = this.searchQuery
      }, 600)
    },
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
    async addCompanion(companion) {
      // -- GET TRIP ID
      const pathname = window.location.pathname
      const tripId = pathname.split('/')[2]
      const response = await fetch('/api/v1/trip/companions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companion: companion,
          tripId: tripId
        })
      })

      this.$emit('companionAdded')
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