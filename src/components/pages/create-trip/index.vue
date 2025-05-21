<template>
  <Transition name="fade" appear>
    <div class="flex flex-col grow py-16">
      <Card customClass="p-6 rounded-4xl shadow-secondary-lg">
        <InputTitle placeholder="Enter the Name of the Trip" id="name" />
        <span>You can add preparations, activities, and routes after creating the trip.</span>
        <AdvInput id="b0ss" label="Destination" icon="ph ph-map-pin" summary="HELP">
          <div class="flex flex-col p-1 gap-2">
            <Input id="search" placeholder="Search or Enter your Destination" prefixIcon="ph ph-magnifying-glass"/>
            <span class="text-sm text-zinc-400">Suggested Locations</span>
            <div class="py-1 flex flex-col gap-0">
              <span class="font-medium">Baguio City</span>
              <span class="text-[12px] font-medium text-zinc-400">For your summer vacation</span>
            </div>
            <div class="py-1 flex flex-col gap-0">
              <span class="font-medium">Subic Bay</span>
              <span class="text-[12px] font-medium text-zinc-400">Hidden Gem</span>
            </div>
            <div class="py-1 flex flex-col gap-0">
              <span class="font-medium">Makati City</span>
              <span class="text-[12px] font-medium text-zinc-400">Taste great food from high-end restaurants</span>
            </div>
            <div class="py-1 flex flex-col gap-0">
              <span class="font-medium">Angeles City</span>
              <span class="text-[12px] font-medium text-zinc-400">Experience great night life</span>
            </div>
            <Button class="w-full">Next</Button>
          </div>
        </AdvInput>
      </Card>
    </div>
  </Transition>
</template>

<script>
import Card from "../../UI/Card.vue"
import InputTitle from "../../UI/InputTitle.vue"
import Input from "../../UI/Input.vue";
import AdvInput from "../../UI/AdvInput.vue";
import Button from "../../UI/Button.vue";

export default {
  components: {
    Button,
    Card,
    Input,
    InputTitle,
    AdvInput,
  }
}
</script>