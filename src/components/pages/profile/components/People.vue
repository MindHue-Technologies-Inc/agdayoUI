<template>
  <transition name="fade" appear>
    <div class="flex flex-col gap-4">
      <!--TITLE-->
      <div class="text-2xl gap-2 font-bold flex items-center">
        <i class="ph ph-users"></i>
        <span>Discover People</span>
      </div>
      <!--SEARCH FIELD-->
      <Input
          id="people-search"
          prefix-icon="ph ph-magnifying-glass"
          placeholder="Search People"
          v-model="searchQuery"
          @input="debounceInput"
      />

      <!--LIST OF FRIENDS-->
      <template v-if="people.length > 0">
        <div
            v-for="(person, index) in people"
            class="p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-row items-center justify-start"
        >
          <div :class="[
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ]">
            <img v-if="person.photoURL" :src="person.photoURL" alt="">
            <i v-else class="ph ph-user"></i>
          </div>
          <div class="flex flex-col gap-0 grow">
            <span v-if="person.displayName" class="font-semibold">{{person.displayName}}</span>
            <span v-else-if="person.email" class="font-semibold">{{person.email}}</span>
            <span class="text-zinc-500">Something</span>
          </div>
          <template v-if="friendships.filter(friend=>friend.user2Uid===person.uid).length > 0">
            Friend Request Sent
          </template>
          <template v-else-if="friendships.filter(friend=>friend.user1Uid===person.uid).length > 0">
            Accept Friend Request
          </template>
          <template v-else>
            <Tag @click="sendFriendRequest(person.uid)" label="Add Friend" mode="button" icon="ph-user-plus"/>
          </template>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10">
          <i class="ph ph-users text-3xl"></i>
          <span>No people found</span>
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Input from "../../../UI/Input.vue";
import Button from "../../../UI/Button.vue";
import { ref, defineProps, watch, defineEmits } from 'vue'
import Tag from "../../../UI/Tag.vue"

// PROPS
const props = defineProps({
  friendships: {
    type: Array,
    default: [],
  }
})


// SOME STATES
const people = ref([])
const searchQuery = ref<string>('')
const debouncedSearchQuery = ref<string>('')
let timeoutId = null
const DELAY_MS = 600

// EMIT
const emit = defineEmits(['friendRequested', 'friendRequestFailed'])

// FUNCTION TO HANDLE DEBOUNCED
const debounceInput = () => {
  // Clear any existing timeout to reset the timer
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // SET NEW TIMEOUT
  timeoutId = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value
  }, DELAY_MS)
}

// FUNCTION FOR SENDING FRIEND REQUEST
const sendFriendRequest = async (userId) => {
  const response = await fetch('/api/v1/friendship', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user2Uid: userId
    })
  })

  if (!response.ok) {
    emit('friendRequestFailed')
    return
  }

  emit('friendRequested')
  return
}

watch(debouncedSearchQuery, async (newValue) => {
  if (newValue) {
    // call API
    const response = await fetch(`/api/v1/users?search=${newValue}`)
    const { users } = await response.json()
    people.value = users
  }
})


</script>