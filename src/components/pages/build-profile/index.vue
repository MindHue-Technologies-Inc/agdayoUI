<template>
  <div class="flex flex-col items-center relative pt-20 px-8 grow">
    <!--    LOGO-->
    <div class="flex flex-col items-center gap-4">
      <span class="text-zinc-400 font-bold">Start your travels in</span>
      <img class="w-48" src="/images/logo-agdayo-lg.png" alt="">
      <span class="baybayin text-[.5rem] text-zinc-400">agdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayoagdayo</span>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="activeInput" class="gap-8 pt-20 flex flex-col items-center justify-center">
<!--        HOME PROVINCE-->
        <template v-if="activeInput === 'homeProvince'">
          <span class="text-4xl font-bold">
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
            <Button @click="setActiveInput('experience')">Next</Button>
          </div>

        </template>

<!--        TRAVELING EXPERIENCE-->
        <template v-if="activeInput === 'experience'">
          <span class="text-4xl font-bold">
            Do you have traveling experience?
          </span>
          <div class="flex flex-col sm:w-72 w-full gap-4">
            <div class="flex flex-row gap-8 items-center justify-center">
              <SquareButton @click="hasExperience = true" v-model="hasExperience" :value="true" size="lg" icon="ph ph-thumbs-up" label="Yes" variant="secondary"/>
              <SquareButton @click="hasExperience = false" v-model="hasExperience" :value="false" size="lg" icon="ph ph-thumbs-down" label="No" variant="secondary"/>
            </div>
            <Button @click="setActiveInput('vacations')">Next</Button>
          </div>
          <Anchor href="javascript:void('')" @click="setActiveInput('homeProvince')">Back</Anchor>
        </template>

<!--        SPEND VACATIONS-->
        <template v-if="activeInput === 'vacations'">
          <span class="text-4xl font-bold">
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
          <Button @click="setActiveInput('hear')">Next</Button>
          <Anchor href="javascript:void('')" @click="setActiveInput('experience')">Back</Anchor>
        </template>


<!--        HEAR-->
        <template v-if="activeInput === 'hear'">
          <span class="text-4xl font-bold">
            Where did you hear about us?
          </span>
          <div class="grid grid-cols-3 gap-6">
            <SquareButton @click="heardUs = 'socialMedia'" v-model="heardUs" value="socialMedia" size="lg" icon="ph ph-device-mobile" label="Social Media" variant="secondary"/>
            <SquareButton @click="heardUs = 'friends'" v-model="heardUs" value="friends" size="lg" icon="ph ph-person" label="Friends" variant="secondary"/>
            <SquareButton @click="heardUs = 'others'" v-model="heardUs" value="others" size="lg" label="Others" variant="secondary"/>
          </div>
          <Button @click="buildProfile">Build Profile</Button>
          <Anchor href="javascript:void('')" @click="setActiveInput('vacations')">Back</Anchor>
        </template>

      </div>
    </transition>

    <Anchor class="pt-8" href="/">Skip All</Anchor>
  </div>
</template>

<script>
import Input from "../../UI/Input.vue";
import Button from "../../UI/Button.vue";
import Anchor from "../../UI/Anchor.vue";
import SquareButton from "../../UI/SquareButton.vue";
import { useRegisterStore, setHomeProvince, setSpentVacation, setHeardUs, setHasExperience } from "../../../stores/register.js";
import provinces from "philippines/provinces";
import Select from "../../UI/Select.vue";

export default {
  components: {Select, SquareButton, Anchor, Button, Input},
  data() {
    return {
      activeInput: 'homeProvince',
      homeProvince: '',
      hasExperience: false,
      spentVacations: [],
      heardUs: '',
      useRegister: useRegisterStore,
      provinces: provinces.sort((a,b)=>a.name.localeCompare(b.name)),
    }
  },

  methods: {
    setActiveInput(newInput) {
      this.activeInput = newInput;
    },

    buildProfile() {
      setHomeProvince(this.homeProvince);
      setSpentVacation(this.spentVacations);
      setHeardUs(this.heardUs);
      setHasExperience(this.hasExperience);
      this.useRegister = useRegisterStore;
      console.log(this.useRegister.value);
    },

    addSpentVacation(vacation) {
      if (vacation.length === 0) {
        return;
      }

      const indexOf = this.spentVacations.indexOf(vacation);
      if (indexOf > -1) {
        this.spentVacations.splice(indexOf, 1);
      } else {
        this.spentVacations.push(vacation);
      }
    }
  },
}
</script>