<template>
  <transition name="fade" appear>
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
      />

      <!--LIST OF FRIENDS-->
      <span v-if="pendingFriendships.length > 0">Friend Requests</span>
      <template v-if="pendingFriendships.length > 0" v-for="(person, index) in pendingFriendships">
        <div
            :key="`${person.user1Uid}-${index}`"
            v-if="person.user1Uid != uid"
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
            <img v-if="person.user1PhotoURL" :src="person.user1PhotoURL" alt="">
            <i v-else class="ph ph-user"></i>
          </div>
          <div class="flex flex-col gap-0 grow">
            <span v-if="person.user1DisplayName" class="font-semibold">{{ person.user1DisplayName }}</span>
            <span v-else-if="person.user1Email" class="font-semibold">{{ person.user1Email }}</span>
            <span class="text-zinc-400 text-xs">@{{ person.user1Uid }}</span>
          </div>

          <button
              @click="acceptFriendRequest(person.id)"
              class="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold
             bg-peach-500 text-white hover:bg-peach-600 transition-colors
             shadow-md shadow-peach-300 active:scale-95"
          >
            <i class="ph ph-hand-waving text-base"></i>
            Accept Friend Request
          </button>
        </div>

        <div
            v-else
            class="fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"
            :class="`fadeIn-${index}`"
        >
          <div class="flex gap-3 self-start items-center justify-items-start">
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
          <div class="flex self-end md:self-auto items-center justify-center gap-2">
            <Anchor @click="cancelFriendRequest(person.id)" href="javascript:void(0)">Cancel</Anchor>
            <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold
                          bg-zinc-100 text-zinc-500 border border-zinc-200">
              <i class="ph ph-hourglass-simple text-base"></i>
              Request Sent
            </span>
          </div>
        </div>
      </template>

      <span>Your Friends</span>

      <!--YOUR ACCEPTED FRIENDS-->
      <template v-if="acceptedFriendships.length > 0" v-for="(person, index) in acceptedFriendships">
        <div
            v-if="person.user1Uid != uid"
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
          <Anchor href="">View Profile</Anchor>
        </div>

        <div
            v-else
            class="fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"
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
            <img v-if="person.user2PhotoURL" :src="person.user2PhotoURL" alt="">
            <i v-else class="ph ph-user"></i>
          </div>
          <div class="flex flex-col gap-0 grow">
            <span v-if="person.user2DisplayName" class="font-semibold">{{ person.user2DisplayName }}</span>
            <span v-else-if="person.user2Email" class="font-semibold">{{ person.user2Email }}</span>
            <!--<span class="text-zinc-400 text-xs">@{{ person.user2Uid }}</span>-->
          </div>
          <Anchor href="">View Profile</Anchor>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10">
          <i class="ph ph-users text-3xl"></i>
          <span>You have no friends</span>
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Input from "../../../UI/Input.vue";
import Button from "../../../UI/Button.vue";
import {ref, defineProps, computed} from 'vue'
import Tag from "../../../UI/Tag.vue";
import Anchor from "../../../UI/Anchor.vue";

const props = defineProps({
  pendingFriendships: {
    type: Array,
    default: [],
  },

  acceptedFriendships: {
    type: Array,
    default: [],
  },

  uid: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['friendAccepted', 'friendRequestCancelled'])

// -- ACCEPT THE FRIENDSHIP
const acceptFriendRequest = async (id) => {
  const response = await fetch('/api/v1/friendship', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      friendshipId: id,
      status: 'accepted'
    })
  })

  if (!response.ok) return

  emit("friendAccepted")
}

// CANCEL THE FRIENDSHIP
const cancelFriendRequest = async (id) => {
  const response = await fetch(`/api/v1/friendship?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) return

  emit('friendRequestCancelled')
}
</script>