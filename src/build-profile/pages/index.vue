<template>
  <div class="flex flex-col items-center relative pt-20 px-8 grow">
    <div class="flex flex-col items-center gap-4">
      <span class="text-zinc-400 font-bold">Start your travels in</span>
      <img class="w-48" src="/images/logo-agdayo-lg.png" alt="">
      <span class="baybayin text-[.5rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="activeInput" class="gap-8 pt-20 flex flex-col items-center justify-center">
        <template v-if="activeInput === 'fullName'">
          <span class="text-4xl font-extrabold">
            Tell us your Name
          </span>
          <div class="flex flex-col sm:w-72 w-full gap-4">
            <Input
              id="fullName"
              v-model="fullName"
              prefixIcon="ph ph-user"
              placeholder="Enter your Full Name"
              @enter="validateFullNameAndGoToHomeProvince"
            />
            <Button @click="validateFullNameAndGoToHomeProvince">Next</Button>
          </div>
        </template>
        <template v-if="activeInput === 'homeProvince'">
          <span class="text-4xl font-extrabold">
            Tell us your home province
          </span>
          <div class="flex flex-col sm:w-72 w-full gap-4">
            <Select
                label="Please enter your home province"
                prefix-icon="ph ph-island"
                placeholder="Select your Home Province"
                optionLabel="name"
                optionValue="name"
                id="province"
                v-model="homeProvince"
                :options="provinces"
            />
            <Button @click="validateHomeProvinceAndGoToExperience">Next</Button>
          </div>

        </template>

        <template v-if="activeInput === 'experience'">
          <span class="text-4xl font-extrabold">
            Do you have traveling experience?
          </span>
          <div class="flex flex-col sm:w-72 w-full gap-4">
            <div class="flex flex-row gap-8 items-center justify-center">
              <SquareButton @click="hasExperience = true" v-model="hasExperience" :value="true" size="lg" icon="ph ph-thumbs-up" label="Yes" variant="secondary"/>
              <SquareButton @click="hasExperience = false" v-model="hasExperience" :value="false" size="lg" icon="ph ph-thumbs-down" label="No" variant="secondary"/>
            </div>
            <Button @click="validateExperienceAndGoToVacations">Next</Button>
          </div>
          <Anchor href="javascript:void('')" @click="setActiveInput('homeProvince')">Back</Anchor>
        </template>

        <template v-if="activeInput === 'vacations'">
          <span class="text-4xl font-extrabold text-center">
            Where do you usually spend your vacations?
          </span>
          <div class="grid grid-cols-3 gap-6">
            <SquareButton @click="addSpentVacation('beaches')" v-model="spentVacations" value="beaches" size="lg" icon="ph ph-tree-palm" label="Beaches" variant="secondary"/>
            <SquareButton @click="addSpentVacation('mountains')" v-model="spentVacations" value="mountains" size="lg" icon="ph ph-mountains" label="Mountains" variant="secondary"/>
            <SquareButton @click="addSpentVacation('parks')" v-model="spentVacations" value="parks" size="lg" icon="ph ph-park" label="Theme Parks" variant="secondary"/>
            <SquareButton @click="addSpentVacation('cities')" v-model="spentVacations" value="cities" size="lg" icon="ph ph-city" label="Cities" variant="secondary"/>
            <SquareButton @click="addSpentVacation('province')" v-model="spentVacations" value="province" size="lg" icon="ph ph-farm" label="Province" variant="secondary"/>
            <SquareButton @click="addSpentVacation('others')" v-model="spentVacations" value="others" size="lg" label="Others" variant="secondary"/>
          </div>
          <Button @click="validateVacationsAndGoToHear">Next</Button>
          <Anchor href="javascript:void('')" @click="setActiveInput('experience')">Back</Anchor>
        </template>


        <template v-if="activeInput === 'hear'">
          <span class="text-4xl font-extrabold text-center">
            Where did you hear about us?
          </span>
          <div class="grid grid-cols-3 gap-6">
            <SquareButton @click="heardUs = 'socialMedia'" v-model="heardUs" value="socialMedia" size="lg" icon="ph ph-device-mobile" label="Social Media" variant="secondary"/>
            <SquareButton @click="heardUs = 'friends'" v-model="heardUs" value="friends" size="lg" icon="ph ph-person" label="Friends" variant="secondary"/>
            <SquareButton @click="heardUs = 'others'" v-model="heardUs" value="others" size="lg" label="Others" variant="secondary"/>
          </div>
          <Button @click="validateHearAndBuildProfile">Build Profile</Button>
          <Anchor href="javascript:void('')" @click="setActiveInput('vacations')">Back</Anchor>
        </template>

      </div>
    </transition>

    <Anchor class="pt-8" href="/">Skip All</Anchor>
  </div>

  <!--TOAST-->
  <ToastContainer>
    <Toast
        :variant="'error'"
        ref="dangerToast"
        :message="dangerToast.message"
    />
  </ToastContainer>
</template>

<script>
import Input from "@/shared/components/UI/Input.vue";
import Button from "@/shared/components/UI/Button.vue";
import Anchor from "@/shared/components/UI/Anchor.vue";
import SquareButton from "@/shared/components/UI/SquareButton.vue";
import { useRegisterStore, setFullName, setHomeProvince, setSpentVacation, setHeardUs, setHasExperience } from "@/core/stores/register.js";
import provinces from "philippines/provinces";
import Select from "@/shared/components/UI/Select.vue";
import ToastContainer from "@/shared/components/UI/ToastContainer.vue";
import Toast from "@/shared/components/UI/Toast.vue";
import { updateProfile } from "firebase/auth";
import { auth } from "@/core/lib/firebase/client.js";

export default {
  components: {
    Select,
    SquareButton,
    Anchor,
    Button,
    Input,
    ToastContainer,
    Toast,
  },
  data() {
    return {
      dangerToast: {
        message: '',
      },
      activeInput: 'fullName',
      fullName: '',
      homeProvince: '',
      hasExperience: false, // Changed to null for clearer "not selected" state
      spentVacations: [],
      heardUs: '',
      useRegister: useRegisterStore,
      provinces: provinces.sort((a,b)=>a.name.localeCompare(b.name)),
    }
  },

  methods: {
    setActiveInput(newInput) {
      this.activeInput = newInput;
      // You might want to clear previous step's errors here if you implement error messages
    },

    // --- Validation Method Templates ---

    validateFullNameAndGoToHomeProvince() {
      let isValid = true;
      if (!this.fullName) {
        isValid = false;
        // Display Error
        this.dangerToast.message = "Please Enter your Name"
        return
      }

      this.setActiveInput('homeProvince')
    },

    validateHomeProvinceAndGoToExperience() {
      // **Your Validation Logic for homeProvince here**
      let isValid = true;
      if (!this.homeProvince) {
        isValid = false;
        // Display error message for homeProvince (e.g., this.errors.homeProvince = 'Please select a province.')
        this.dangerToast.message = "Please Enter your Home Province"
        return
      }

      this.setActiveInput('experience');
    },

    validateExperienceAndGoToVacations() {
      // **Your Validation Logic for hasExperience here**
      let isValid = true;
      if (this.hasExperience === null) { // Check for null to ensure a choice was made
        isValid = false;
        // Display error message for experience (e.g., this.errors.experience = 'Please select an option.')
        this.dangerToast.message = 'Please indicate if you have traveling experience.'
        return
      }

      this.setActiveInput('vacations');
    },

    validateVacationsAndGoToHear() {
      // **Your Validation Logic for spentVacations here**
      let isValid = true;
      if (this.spentVacations.length === 0) {
        isValid = false;
        // Display error message for spentVacations (e.g., this.errors.vacations = 'Please select at least one.')
        this.dangerToast.message = 'Please select at least one type of vacation you usually spend.'
        return
      }

      this.setActiveInput('hear');
    },

    async validateHearAndBuildProfile() {
      // **Your Validation Logic for heardUs here**
      let isValid = true;
      if (!this.heardUs) {
        isValid = false;
        // Display error message for heardUs (e.g., this.errors.heardUs = 'Please tell us where you heard about us.')
        this.dangerToast.message = 'Please tell us where you heard about us.'
        return
      }

      await this.buildProfile();
    },

    // --- End Validation Method Templates ---

    async buildProfile() {
      // Your existing logic to set store values

      setFullName(this.fullName);
      setHomeProvince(this.homeProvince);
      setSpentVacation(this.spentVacations);
      setHeardUs(this.heardUs);
      setHasExperience(this.hasExperience);
      // Ensure useRegisterStore is called as a function if it's a Pinia store

      // -- SAVE DISPLAY NAME TO FIREBASE USER
      await updateProfile(auth.currentUser, {
        displayName: this.fullName
      })

      // Final navigation
      window.location.href = '/active-trip'
    },

    addSpentVacation(vacation) {
      if (vacation.length === 0) {
        return; // Should not happen with your buttons, but good check
      }

      const indexOf = this.spentVacations.indexOf(vacation);
      if (indexOf > -1) {
        this.spentVacations.splice(indexOf, 1);
      } else {
        this.spentVacations.push(vacation);
      }
    }
  },
  // You might want to add watchers here to clear individual errors
  // as the user types/selects, e.g.:
  // watch: {
  //   homeProvince() {
  //     // Clear error for homeProvince
  //   },
  //   hasExperience() {
  //     // Clear error for experience
  //   }
  // }
}
</script>

<style scoped>
/* Fade animation for content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Baybayin text styling - ensure your font is imported and available */
.baybayin {
  font-family: 'Baybayin Bato', sans-serif; /* Replace with your actual Baybayin font file import if needed */
}
</style>