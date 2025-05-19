<template>
  <div class="flex flex-col justify-between lg:p-9 p-2 grow relative">
    <!-- BACKGROUND IMAGE with fade -->
    <transition-group name="bg-fade" tag="div" class="absolute inset-0 z-0">
      <div
        v-for="(item, index) in [config[counter]]"
        :key="item.bg"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :style="{ backgroundImage: `url('${item.bg}')` }"
      >
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
    </transition-group>

    <!-- HEADER -->
    <Header class="z-10" />

    <!-- TITLE -->
    <transition name="fade" mode="out-in">
      <div :key="config[counter].title" class="z-10 flex grow w-full items-center justify-center">
        <Elnido v-if="config[counter].title === 'Elnido'" />
        <Baguio v-if="config[counter].title === 'Baguio'" />
        <Makati v-if="config[counter].title === 'Makati'" />
        <Subic v-if="config[counter].title === 'Subic'" />
        <!-- Add other title components if needed -->
      </div>
    </transition>

    <!-- FOOTER -->
    <transition name="fade" mode="out-in">
      <Footer class="z-10" :key="config[counter].credits" :credits="config[counter].credits" />
    </transition>

  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Elnido from "./components/Title/Elnido.vue"
import Baguio from "./components/Title/Baguio.vue"
import Makati from "./components/Title/Makati.vue"
import Subic from "./components/Title/Subic.vue"
import Footer from "./components/Footer.vue"

export default {
  components: {
    Header,
    Elnido,
    Footer,
    Baguio,
    Makati,
    Subic,
  },
  data() {
    return {
      counter: 0,
      config: [
        {
          bg: '/images/elnido.jpg',
          title: 'Elnido',
          credits: 'El Nido, Palawan. Photo by Eibner Saliba'
        },
        {
          bg: '/images/baguio.jpg',
          title: 'Baguio',
          credits: 'Baguio, Benguet. Photo by Gian Paul Guinto'
        },
        {
          bg: '/images/makati.jpg',
          title: 'Makati',
          credits: 'Makati, Metro Manila. Photo by JC Gellidon'
        },
        {
          bg: '/images/subic.jpg',
          title: 'Subic',
          credits: 'Subic, Zambales. Photo by pixmike'
        }
      ]
    }
  },

  mounted() {
    setInterval(() => {
      this.counter = (this.counter + 1) % this.config.length
    }, 10000)
  }
}
</script>

<style scoped>
/* Fade animation for content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Background fade */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease;
}
.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
</style>
