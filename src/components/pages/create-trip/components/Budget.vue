<template>
  <AdvInput id="budget" label="Budget" icon="ph ph-wallet" :summary="formatCurrency(totalBudget)">
    <div class="flex flex-col p-1 gap-4"> <Input
        id="total-budget"
        placeholder="Enter your estimated total budget"
        prefixIcon="ph ph-currency-dollar"
        type="number"
        :formatCommas="true"
        v-model="totalBudget"
    />
      <span class="text-sm text-zinc-400">This is your overall budget for the entire trip.</span>

<!--      <div class="py-2 flex flex-col gap-2">-->
<!--        <span class="font-medium">Budget Breakdown (Optional)</span>-->
<!--        <span class="text-[12px] font-medium text-zinc-400">You can categorize your expenses later.</span>-->
<!--      </div>-->

      <Button class="w-full">Set Budget</Button>
    </div>
  </AdvInput>
</template>

<script>
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
      totalBudget: null, // Binds to the budget input
    };
  },
  methods: {
    // You could add a method here to save or process the budget
    setBudget() {
      console.log('Total Budget:', this.totalBudget);
      // Emit an event or call a store action to save the budget
    },

    formatCurrency(amount, locale = 'en-US', currency = 'PHP', currencyDisplay = 'symbol') {
      try {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          currencyDisplay: currencyDisplay,
          minimumFractionDigits: 0, // Ensure no decimal places for your budget input
          maximumFractionDigits: 0
        });
        return formatter.format(amount);
      } catch (error) {
        console.error("Error formatting currency:", error);
        return String(amount);
      }
    },
  }
};
</script>

<style scoped>
/* No specific styles needed if all styling is handled by Tailwind and UI components */
</style>