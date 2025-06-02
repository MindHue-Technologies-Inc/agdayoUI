<template>
  <Sheet :model-value="showSheet" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-wallet"></i> <span class="font-bold">Trip Budget</span>
          <Tag label="+ Add Category" mode="button" @click="addCategoryRow" />
        </div>
        <button @click="$emit('update:modelValue', { ...modelValue, showSheet: false })" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex flex-col gap-4 w-full mb-6">
        <AdvInput :summary="totalBudgetSummary" label="Overall Budget" icon="ph-currency-dollar">
          <div class="flex flex-col gap-4 p-1">
            <Input id="totalBudget" v-model.number="localBudget.totalBudget" type="number" placeholder="Enter total trip budget" label="Amount" prefix="₱" min="0" />
            <Select
                v-model="localBudget.currency"
                id="budget-currency"
                label="Currency"
                :options="[
                { label: 'PHP (₱)', value: 'PHP' },
                { label: 'USD ($)', value: 'USD' },
                { label: 'EUR (€)', value: 'EUR' }
              ]"
            />
            <Button>Set Budget</Button>
          </div>
        </AdvInput>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <h3 class="text-lg font-semibold text-zinc-700 mt-2 mb-2">Budget Breakdown</h3>
        <AdvInput
            v-for="(category, index) in localBudget.categories"
            :key="category.id"
            :summary="getCategorySummary(category)"
            :label="`${category.name || 'New Category'}`"
            icon="ph-tag"
            @remove="removeCategoryRow(category.id)"
            removable
        >
          <div class="flex flex-col gap-4 p-1">
            <Input :id="`category-name-${index}`" v-model="category.name" placeholder="e.g., Flights, Food, Activities" label="Category Name" />
            <Input :id="`category-amount-${index}`" v-model.number="category.amount" type="number" placeholder="Budget for this category" label="Amount" :prefix="localBudget.currency === 'PHP' ? '₱' : localBudget.currency === 'USD' ? '$' : '€'" min="0" />
            <div class="flex justify-end mt-2">
              <Button v-if="localBudget.categories.length > 1" @click="removeCategoryRow(category.id)" variant="danger">
                Delete Category
              </Button>
            </div>
          </div>
        </AdvInput>

        <div v-if="localBudget.categories.length === 0" class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg">
          <i class="ph ph-tag-simple text-4xl mb-2"></i>
          <p class="text-center">No budget categories added yet. Click '+ Add Category' to start categorizing your spending!</p>
          <Button class="mt-4" @click="addCategoryRow">Add First Category</Button>
        </div>
      </div>

      <div class="w-full mt-6">
        <Button class="w-full" @click="saveBudget">Save Budget</Button>
      </div>

    </div>
  </Sheet>
</template>

<script>
import Sheet from "../../../../UI/Sheet.vue";
import Tag from "../../../../UI/Tag.vue";
import Button from "../../../../UI/Button.vue";
import Input from "../../../../UI/Input.vue";
import Select from "../../../../UI/Select.vue";
import AdvInput from "../../../../UI/AdvInput.vue"; // Ensure AdvInput has removable prop and emits 'remove'

export default {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
  },

  props: {
    // modelValue is expected to be an object controlling sheet visibility
    // and containing budget data: { showSheet: boolean, totalBudget: number, currency: string, categories: [] }
    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        totalBudget: 0,
        currency: 'PHP', // Default currency
        categories: []
      }),
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      // Create a local copy of the budget data to allow direct manipulation
      localBudget: {
        totalBudget: 0,
        currency: 'PHP',
        categories: [],
      },
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // Computed summary for the total budget AdvInput
    totalBudgetSummary() {
      if (this.localBudget.totalBudget > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localBudget.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(this.localBudget.totalBudget);
      }
      return 'Set your overall trip budget';
    }
  },

  watch: {
    // Watch the prop and initialize localBudget when it changes
    // This handles initial load and external updates to modelValue.budget
    'modelValue': {
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Watch nested properties of modelValue
      handler(newVal) {
        // Deep copy to avoid mutating the prop directly
        this.localBudget = {
          totalBudget: newVal.totalBudget || 0,
          currency: newVal.currency || 'PHP',
          categories: newVal.categories ? newVal.categories.map(c => ({ ...c })) : [],
        };
        // Add a default category row if the sheet opens and no categories exist
        if (this.showSheet && this.localBudget.categories.length === 0) {
          this.addCategoryRow();
        }
      }
    },
    // Watch showSheet to add a new category row if the sheet is opened and there are no categories
    showSheet(newVal) {
      if (newVal && this.localBudget.categories.length === 0) {
        this.addCategoryRow();
      }
    }
  },

  methods: {
    // Helper to get locale for currency formatting (adjust if needed)
    getLocale() {
      // Example: return 'en-US' or dynamically based on user settings
      return navigator.language || 'en-US';
    },
    // Generates a unique ID for new budget category rows
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    // Adds a new blank budget category object to the localBudget.categories array
    addCategoryRow() {
      this.localBudget.categories.push({
        id: this.generateUniqueId(),
        name: '',
        amount: 0,
      });
    },
    // Removes a budget category from the localBudget.categories array by ID
    removeCategoryRow(id) {
      this.localBudget.categories = this.localBudget.categories.filter(category => category.id !== id);
      // Optional: if all removed, add a new blank row for convenience
      if (this.localBudget.categories.length === 0) {
        this.addCategoryRow();
      }
    },
    // Creates a summary string for the AdvInput component header
    getCategorySummary(category) {
      if (category.name && category.amount > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localBudget.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `${category.name}: ${formatter.format(category.amount)}`;
      } else if (category.name) {
        return category.name;
      }
      return 'New Category';
    },
    // Emits the updated budget data back to the parent
    saveBudget() {
      // Filter out any completely empty category rows before emitting
      const savedCategories = this.localBudget.categories.filter(c => c.name.trim() !== '' || c.amount > 0);

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet)
        totalBudget: this.localBudget.totalBudget,
        currency: this.localBudget.currency,
        categories: savedCategories, // Update the categories array
        showSheet: false, // Close the sheet
      });
    }
  },
  mounted() {
    // Initialize with one category if none exist on mount and sheet is visible
    if (this.showSheet && this.localBudget.categories.length === 0) {
      this.addCategoryRow();
    }
  }
};
</script>

<style scoped>
/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>