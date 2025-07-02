<template>
  <transition name="fade" appear>
    <div class="grow mt-8 md:mt-16">
      <div class="max-w-4xl ">
        <div class="flex items-center justify-between mb-8">
          <h1 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">
            My Trips
          </h1>
          <Button variant="primary" @click="redirect('/create-trip')">
            <i class="ph ph-plus text-lg mr-1"></i> New Trip
          </Button>
        </div>

        <div class="flex flex-col gap-6">

          <Card class="fadeIn" customClass="w-full p-0! overflow-hidden rounded-4xl border-primary-light-sm shadow-primary-light-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <a href="/trips/1" class="block">
              <div class="flex flex-col gap-3 bg-peach-50 p-4 sm:p-6 md:p-8">
                <div class="flex flex-row items-center justify-between">
                  <Tag label="Upcoming" class="bg-white border-primary-light-xs"/>
                  <button class="text-xl text-zinc-600 transition hover:text-peach-500 active:text-peach-600 focus:outline-none focus:ring-2 focus:ring-peach-300 rounded-full p-1">
                    <i class="ph ph-dots-three-outline-vertical"></i>
                  </button>
                </div>

                <div>
                  <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">Summer in Baguio City</h3>
                </div>

                <div class="mt-2">
                  <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>
                  <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">
                    <div class="bg-peach-500 h-2 rounded-full" style="width: 75%;"></div>
                  </div>
                  <span class="text-xs text-zinc-500 mt-1 block">3/4 Sections Complete</span>
                </div>

                <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">
                  <div class="flex gap-1 items-center">
                    <i class="ph ph-calendar-dots text-peach-500 text-base"></i>
                    <span>Jun 6 - 9, 2025</span>
                  </div>

                  <div class="flex gap-1 items-center">
                    <i class="ph ph-map-pin text-peach-500 text-base"></i>
                    <span>Baguio City</span>
                  </div>
                </div>
              </div>
            </a>
          </Card>

          <Card class="fadeIn fadeIn-1" customClass="w-full p-0! overflow-hidden rounded-4xl border-info-light-sm shadow-info-light-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <a href="/trip/cebu-island-hopping" class="block">
              <div class="flex flex-col gap-3 bg-blue-50 p-4 sm:p-6 md:p-8">
                <div class="flex flex-row items-center justify-between">
                  <Tag label="Completed" class="bg-white border-primary-light-xs"/>
                  <button class="text-xl text-zinc-600 transition hover:text-blue-500 active:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1">
                    <i class="ph ph-dots-three-outline-vertical"></i>
                  </button>
                </div>

                <div>
                  <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">Cebu Island Hopping Adventure</h3>
                </div>

                <div class="mt-2">
                  <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>
                  <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 100%;"></div>
                  </div>
                  <span class="text-xs text-zinc-500 mt-1 block">All Sections Complete</span>
                </div>

                <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">
                  <div class="flex gap-1 items-center">
                    <i class="ph ph-calendar-dots text-blue-500 text-base"></i>
                    <span>April 1 - 5, 2024</span>
                  </div>

                  <div class="flex gap-1 items-center">
                    <i class="ph ph-map-pin text-blue-500 text-base"></i>
                    <span>Cebu, PH</span>
                  </div>
                </div>
              </div>
            </a>
          </Card>

          <Card class="fadeIn fadeIn-2" customClass="w-full p-0! overflow-hidden rounded-4xl border-warning-light-sm shadow-warning-light-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <a href="/trip/batanes-exploration" class="block">
              <div class="flex flex-col gap-3 bg-yellow-50 p-4 sm:p-6 md:p-8">
                <div class="flex flex-row items-center justify-between">
                  <Tag label="Draft" class="bg-white border-primary-light-xs"/>
                  <button class="text-xl text-zinc-600 transition hover:text-yellow-500 active:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-full p-1">
                    <i class="ph ph-dots-three-outline-vertical"></i>
                  </button>
                </div>

                <div>
                  <h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate">Batanes Island Exploration</h3>
                </div>

                <div class="mt-2">
                  <span class="text-zinc-600 font-semibold text-sm">Planning Progress:</span>
                  <div class="w-full bg-zinc-200 rounded-full h-2 mt-1">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 20%;"></div>
                  </div>
                  <span class="text-xs text-zinc-500 mt-1 block">1/5 Sections Complete</span>
                </div>

                <div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2">
                  <div class="flex gap-1 items-center">
                    <i class="ph ph-calendar-dots text-yellow-500 text-base"></i>
                    <span>August 1 - 7, 2025</span>
                  </div>

                  <div class="flex gap-1 items-center">
                    <i class="ph ph-map-pin text-yellow-500 text-base"></i>
                    <span>Batanes, PH</span>
                  </div>
                </div>
              </div>
            </a>
          </Card>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import Card from "../../UI/Card.vue";
import Tag from "../../UI/Tag.vue";
import Button from "../../UI/Button.vue";

export default {
  components: {
    Card,
    Tag,
    Button
  },

  methods: {
    redirect(address){
      window.location.href=address
    }
  }
}
</script>

<style scoped>
/* Outfit font import and usage for titles (ensure it's globally available or imported here if needed) */
.outfit {
  font-family: 'Outfit', sans-serif;
}
/* Ensure your custom-scrollbar class is defined elsewhere for overflow-x-auto styling */
</style>