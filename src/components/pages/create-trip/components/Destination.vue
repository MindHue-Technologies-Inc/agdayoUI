<template>
  <AdvInput
      id="b0ss"
      label="Destination"
      icon="ph ph-map-pin"
      :summary="selectedDestination ? selectedDestination.name : 'Select your destination'"
  >
    <div class="flex flex-col p-1 gap-2">
      <Input
          id="search"
          placeholder="Search for a City, Province, or Enter any Destination"
          prefixIcon="ph ph-magnifying-glass"
          v-model="searchQuery"
          @keyup.enter="searchDestination"
      />
      <span class="text-sm text-zinc-400">
        {{ searchQuery.trim() === '' ? 'Suggested Locations' : 'Search results for cities in the Philippines' }}
      </span>

      <Transition name="list-fade" mode="out-in">
        <div v-if="searchQuery.trim() === ''" :key="'suggestions-list'">
          <div
              v-for="(location, index) in suggestedLocations"
              :key="'suggested-' + index"
              class="py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150"
              @click="selectLocation(location)"
          >
            <span class="font-medium">{{ location.name }}</span>
            <span class="text-[12px] font-medium text-zinc-400">{{ location.description }}</span>
          </div>
        </div>
        <div v-else :key="'filtered-list'">
          <div v-if="filteredCities.length > 0" class="max-h-60 overflow-y-auto pr-2">
            <div
                v-for="(city, index) in filteredCities"
                :key="'city-' + city.name + '-' + city.province + '-' + index"
                class="py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150"
                @click="selectLocation(city)"
            >
              <span class="font-medium">{{ city.name }}</span>
              <span class="text-[12px] font-medium text-zinc-400">
                {{ city.province ? city.province : 'No Province Info' }}
                <span v-if="city.zip_code"> - {{ city.zip_code }}</span>
              </span>
            </div>
          </div>
          <div v-else class="py-2 text-center text-zinc-400">
            No cities found matching "{{ searchQuery }}". You can press Enter to add "{{ searchQuery }}" as a custom destination.
          </div>
        </div>
      </Transition>

      <Button class="w-full" @click="proceedNext" :disabled="!selectedDestination">Next</Button>
    </div>
  </AdvInput>
</template>

<script>
import cities from "philippines/cities";

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
      searchQuery: '',
      selectedDestination: null,
      allPhilippineCities: [],
      suggestedLocations: [
        { name: 'Baguio', description: 'For your summer vacation' },
        { name: 'Subic Bay', description: 'Hidden Gem' },
        { name: 'Makati', description: 'Taste great food from high-end restaurants' },
        { name: 'Angeles', description: 'Experience great night life' },
        { name: 'Palawan', description: 'Island paradise' },
      ],
    };
  },
  computed: {
    filteredCities() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return [];
      }

      const results = this.allPhilippineCities.filter(city =>
          city.name.toLowerCase().includes(query) ||
          (city.province && city.province.toLowerCase().includes(query))
      );
      return results.slice(0, 50);
    }
  },
  created() {
    this.allPhilippineCities = cities.map(city => ({
      name: city.name,
      province: city.province,
      zip_code: city.zip_code || null
    }));
  },
  methods: {
    selectLocation(item) {
      if (item.province) {
        this.selectedDestination = {
          name: item.name,
          description: item.province ? `${item.province}${item.zip_code ? ' - ' + item.zip_code : ''}` : item.zip_code,
          fullData: item
        };
      } else {
        this.selectedDestination = {
          name: item.name,
          description: item.description,
          fullData: item
        };
      }
      this.searchQuery = item.name;
      console.log('Selected destination:', this.selectedDestination.name);
    },

    searchDestination() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.selectedDestination = null;
        return;
      }

      let selectedItem = null;
      const exactCityMatch = this.filteredCities.find(city => city.name.toLowerCase() === query);
      if (exactCityMatch) {
        selectedItem = exactCityMatch;
      } else {
        const exactSuggestionMatch = this.suggestedLocations.find(loc => loc.name.toLowerCase() === query);
        if (exactSuggestionMatch) {
          selectedItem = exactSuggestionMatch;
        }
      }

      if (selectedItem) {
        this.selectLocation(selectedItem);
      } else {
        this.selectedDestination = {
          name: this.searchQuery,
          description: 'User entered custom destination',
          fullData: null
        };
        console.log('User entered custom destination:', this.selectedDestination.name);
      }
    },

    proceedNext() {
      if (this.selectedDestination) {
        console.log('Proceeding with final destination:', this.selectedDestination);
      } else {
        console.warn('Please select or enter a destination before proceeding.');
      }
    },
  },
};
</script>

<style scoped>
/* CSS for the fade transition */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.2s ease; /* Adjust duration and easing as desired */
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
}
</style>