<template>
  <div class="flex flex-row gap-4 py-4 sm:py-6 px-4 md:px-6 overflow-x-auto custom-scrollbar bg-zinc-50 border-t border-b border-zinc-100">
    <AdvSquareCard
        iconName="ph-suitcase"
        cardName="Preparations"
        :tagName="`${preparation.preparationsChecklist.length} Tasks`"
        tagVariant="blue"
        @card-click="$emit('show-preparation')" />
    <AdvSquareCard
        iconName="ph-bed"
        cardName="Accommodations"
        :tagName="`${accommodation?.numberOfRooms} ${accommodation?.numberOfRooms > 1 ? 'Rooms' : 'Room'}`"
        tagVariant="orange"
        @card-click="$emit('show-accommodation')"
    />
    <AdvSquareCard
        iconName="ph-wallet"
        cardName="Budget"
        :tagName="`${formatCurrency(budget.totalBudget)} Budget`"
        tagVariant="red"
        @card-click="$emit('show-budget')"
    />
    <AdvSquareCard
        iconName="ph-users"
        cardName="Companions"
        :tagName="`${companions.length} Travelers`"
        tagVariant="purple"
        @card-click="$emit('show-companions')"
    />
    <!--<AdvSquareCard-->
    <!--    iconName="ph-bus"-->
    <!--    cardName="Transportation"-->
    <!--    tagName="3 Pending"-->
    <!--    tagVariant="blue"-->
    <!--    @card-click="$emit('show-transportation')"-->
    <!--/>-->
    <!--<AdvSquareCard-->
    <!--    iconName="ph-hand-palm"-->
    <!--    cardName="Roles"-->
    <!--    tagName="4 Roles"-->
    <!--    tagVariant="primary"-->
    <!--    @card-click="$emit('show-roles')"-->
    <!--/>-->
  </div>
</template>

<script>
import AdvSquareCard from "../../../UI/AdvSquareCard.vue";

export default {
  name: 'TripSections',
  components: {
    AdvSquareCard,
  },
  props: {
    preparation: {
      type: Object,
      required: true,
    },
    accommodation: {
      type: Object,
      required: true,
    },
    budget: {
      type: Object,
      required: true,
    },
    companions: {
      type: Object,
      required: true,
    },
    transportation: {
      type: Object,
      required: true,
    },
    roles: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'show-preparation',
    'show-accommodation',
    'show-budget',
    'show-companions',
    'show-transportation',
    'show-roles',
  ],
  methods: {
    formatCurrency(cost) {
      const formatter = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: this.budget.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatter.format(cost);
    },
  },
};
</script>
