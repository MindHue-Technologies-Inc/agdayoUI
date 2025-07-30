<template>
  <template v-if="isLoading">
    <div class="flex items-center justify-center w-full h-[32rem]">
      <Spinner label="Loading your profile"/>
    </div>
  </template>
  <template v-else>
    <!-- TRANSITION FOR ALL CONTENT -->
    <transition name="fade" appear>

      <!-- BODY CONTAINER -->
      <div class="grow mt-8 md:mt-16 fadeIn">

        <!-- MAIN CARD; HOUSES PROFILE -->
        <Card :customClass='"border-secondary-sm shadow-secondary-md relative max-w-4xl mx-auto overflow-hidden rounded-4xl bg-white flex flex-col gap-8 p-4 md:p-6!"'>
          <!--SETTINGS BUTTON-->
          <div class="absolute top-0 right-0 m-2 md:m-3 p-2 md:p-3 flex items-center text-2xl hover:bg-zinc-100 transition rounded-full justify-center cursor-pointer">
            <i class="ph ph-gear"></i>
          </div>

          <!--HEADER-->
          <div class="flex gap-4 flex-col sm:flex-row items-center sm:items-start">
            <!--PHOTO-->
            <div :class="[
              'text-2xl transition rounded-full ',
              'bg-none hover:text-zinc-500 cursor-pointer',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-24 w-24'
            ]">
              <img v-if="photoURL" :src="photoURL" alt="">
              <i v-else class="ph ph-user"></i>
            </div>

            <!--USER INFO-->
            <div class="flex flex-col gap-4 items-start justify-center">
              <div class="flex flex-col gap-1 items-start justify-center">
                <span class="text-zinc-800 text-4xl font-extrabold text-shadow-secondary-md">{{displayName}}</span>
                <span class="text-zinc-400 text-xs">@{{uid}}</span>
              </div>

              <!--COUNT FOR FRIENDS TRIPS AND DATE JOINED-->
              <div class="flex flex-wrap items-center gap-2 sm:gap-5 text-sm text-zinc-500">
                <!--DATE JOINED-->
                <div class="flex items-center justify-center gap-1">
                  <i class="ph ph-calendar-dots"></i>
                  <span>Joined {{formatDate(user.createdAt)}}</span>
                </div>

                <!--FRIEND COUNT-->
                <div class="flex items-center justify-center gap-1">
                  <i class="ph ph-users"></i>
                  <span>5 Friends</span>
                </div>

                <!--NUMBER OF TRIPS-->
                <div class="flex items-center justify-center gap-1">
                  <i class="ph ph-island"></i>
                  <span>{{user.tripCount}} Trips</span>
                </div>
              </div>
            </div>
          </div>

          <!--FRIENDS AND PEOPLE-->
          <div class="flex flex-col gap-6">
            <!--TAB SELECTOR-->
            <NavigationMenu
                :tabs="tabs"
                initial-active-tab-id="friends"
                @tab-selected="getActiveTab"
            />

            <!--FRIENDS COMPONENT-->
            <Friends v-if="activeTab === 'friends'" />

            <!--PEOPLE COMPONENT-->
            <People
                @friend-request-failed="friendRequestFailed"
                @friend-requested="friendRequestSuccess"
                :friendships="user.friendships"
                v-else-if="activeTab === 'people'"/>
          </div>
        </Card>
      </div>
    </transition>
  </template>

  <!--TOAST-->
  <ToastContainer>
    <Toast
        :variant="'error'"
        :message="dangerToast.message"
    />
    <Toast
        :variant="'success'"
        :message="successToast.message"
    />
  </ToastContainer>
</template>

<script setup lang="ts">
import Spinner from "../../UI/Spinner.vue";
import { ref, onMounted, computed, markRaw, reactive } from 'vue'
import Card from "../../UI/Card.vue";
import { useAuthStore } from "../../../stores/auth";
import NavigationMenu from "../../UI/NavigationMenu.vue";
import Friends from "./components/Friends.vue";
import People from "./components/People.vue";
import ToastContainer from "../../UI/ToastContainer.vue";
import Toast from "../../UI/Toast.vue";


// -- some states
const isLoading = ref<boolean>(true)
const useAuth = ref<object>(useAuthStore.get())
const dangerToast = reactive({
  message: ''
})
const successToast = reactive({
  message: ''
})

// -- COMPUTED PHOTO URL
const photoURL = computed(()=>{
  return useAuth.value.user?.user?.photoURL
})


// -- COMPUTED FOR DISPLAY NAME
const displayName = computed(()=>{
  return useAuth.value.user?.user?.displayName
})


// -- COMPUTED FOR UID
const uid = computed(()=>{
  return useAuth.value.user?.user?.id
})

const user = ref({})

// -- FUNCTION TO FETCH USER
const fetchUser = async () => {
  const response = await fetch('/api/v1/me')

  if(!response.ok) {
    const error = await response.json()
    console.error(error)
  }

  user.value = await response.json()
}

// -- FUNCTION TO RETURN DATE FROM CREATED AT
const formatDate = (datetime) => {
  if (!datetime) return ''

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(datetime));

}

// ------------------------------ TABS, FRIENDS AND PEOPLE

const tabs = markRaw([
  {
    id: 'friends',
    label: 'My Friends',
  },
  {
    id: 'people',
    label: 'Discover People'
  },
  {
    id: 'trips',
    label: 'My Trips'
  },
])

const activeTab = ref<string>('')

// FUNCTION TO GET THE ACTIVE TAB
const getActiveTab = (id) => {
  activeTab.value = id
}

// --------------------------- TOAST TRIGGERS

const friendRequestFailed = () => {
  dangerToast.message = 'Friend Request Failed'
}

const friendRequestSuccess = () => {
  successToast.message = 'Sent Friend Request'
}


// -- MOUNTED HOOK
onMounted(async ()=>{
  // -- FETCH USER
  await fetchUser()
  isLoading.value = false
})
</script>
