<template>
  <div class="flex flex-col justify-between lg:p-9 p-2 grow relative">
    <transition-group name="bg-fade" tag="div" class="absolute inset-0 z-0">
      <div
          v-for="(item) in [config[counter]]"
          :key="item.bg"
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          :style="{ backgroundImage: `url('${item.bg}')` }"
      >
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
    </transition-group>

    <Header class="z-10" />

    <transition name="fade" mode="out-in">
      <div :key="config[counter].title" class="z-10 flex grow w-full items-center justify-between">
        <div class="w-32 cursor-pointer h-full" @click="previousImage()"></div>
        <Elnido v-if="config[counter].title === 'Elnido'" />
        <Manila v-if="config[counter].title === 'Manila'" />
        <Baguio v-if="config[counter].title === 'Baguio'" />
        <Makati v-if="config[counter].title === 'Makati'" />
        <Subic v-if="config[counter].title === 'Subic'" />
        <Cebu v-if="config[counter].title === 'Cebu'" />
        <Siargao v-if="config[counter].title === 'Siargao'" />
        <Batanes v-if="config[counter].title === 'Batanes'" />
        <div class="w-32 cursor-pointer h-full" @click="nextImage()"></div>
      </div>
    </transition>

    <transition name="fade" mode="out-in">
      <Footer class="z-10" :key="config[counter].credits" :credits="config[counter].credits" />
    </transition>

  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Elnido from "./components/Title/Elnido.vue"
import Manila from "./components/Title/Manila.vue";
import Baguio from "./components/Title/Baguio.vue"
import Makati from "./components/Title/Makati.vue"
import Subic from "./components/Title/Subic.vue"
import Cebu from "./components/Title/Cebu.vue"
import Siargao from "./components/Title/Siargao.vue"
import Batanes from "./components/Title/Batanes.vue"
import Footer from "./components/Footer.vue"
import {Random} from "random-js";

export default {
  components: {
    Header,
    Elnido,
    Footer,
    Baguio,
    Manila,
    Makati,
    Subic,
    Cebu,
    Siargao,
    Batanes,
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
          bg: '/images/manila.jpg',
          title: 'Manila',
          credits: 'Manila. Photo by Michael Buillerey'
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
        },
        {
          bg: '/images/cebu.jpg',
          title: 'Cebu',
          credits: 'Cebu City, Cebu. Photo by Angelyn Sanjorjo'
        },
        {
          bg: '/images/siargao.jpg',
          title: 'Siargao',
          credits: 'Guyam Island, Siargao. Photo by Rene Padillo'
        },
        {
          bg: '/images/batanes.jpg',
          title: 'Batanes',
          credits: 'Batanes. Photo by JR Padlan'
        }
      ],
      // Still good practice to keep the intervalId for cleanup
      intervalId: null
    }
  },

  methods: {
    nextImage() {
      if (this.counter == this.config.length) {
        this.counter = -1;
      }
      this.counter++
      this.stopInterval();
      this.generateInterval();
    },

    previousImage() {
      if (this.counter < 0) {
        this.counter = this.config.length + 1;
      }
      this.counter--
      this.stopInterval();
      this.generateInterval();
    },

    generateInterval() {
      // Set the interval to loop sequentially
      this.intervalId = setInterval(() => {
        const random = new Random()
        this.counter = (random.integer(0, this.config.length*100)) % this.config.length;
      }, 10000); // Change every 10 seconds
    },

    stopInterval() {
      // Clear the interval when the component is unmounted to prevent memory leaks
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  },

  mounted() {
    // Set the interval to loop sequentially
    this.generateInterval();
  },

  beforeUnmount() {
    // Clear the interval when the component is unmounted to prevent memory leaks
    this.stopInterval();
  },

  // Removed the methods section as changeSlideRandomly is no longer needed
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