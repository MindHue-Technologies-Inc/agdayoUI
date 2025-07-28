<template>
  <Sheet :model-value="showSheet" @update:modelValue="closeSheet">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1">
      <div class="flex items-center justify-between w-full mb-6">
        <div class="flex gap-2 items-center justify-center text-3xl text-zinc-800">
          <i class="ph ph-wallet"></i> <span class="font-bold">Trip Budget</span>
          <Tag label="+ Add Category" mode="button" @click="addCategoryRow" />
        </div>
        <button @click="closeSheet" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div class="flex flex-col gap-4 w-full mb-6">
        <AdvInput :summary="totalBudgetSummary" label="Overall Budget" :icon="`${getCurrencySymbol(localBudget.currency)}`">
          <div class="flex flex-col gap-4 p-1">
            <Input :format-commas="true" id="totalBudget" v-model.number="localBudget.totalBudget" type="number" placeholder="Enter total trip budget" label="Amount" :prefix="localBudget.currency" min="0" />
            <Select
                v-model="localBudget.currency"
                id="budget-currency"
                label="Currency"
                optionLabel="label"
                optionValue="value"
                :options="currencyOptions()"
            />
          </div>
        </AdvInput>
      </div>

      <div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar">
        <div class="flex flex-row items-center justify-between">
          <h3 class="text-lg font-semibold text-zinc-700 mt-2 mb-2">Budget Breakdown </h3>
          <div class="font-normal! text-xs text-zinc-400 flex flex-col gap-0">
            <span>Total {{formatCurrency(totalBreakdown)}}</span>
            <div v-if="totalBreakdown - localBudget.totalBudget > 0">
              <span>{{formatCurrency(totalBreakdown - localBudget.totalBudget)}} over budget</span>
            </div>
            <div v-else>
              <span>{{formatCurrency(localBudget.totalBudget - totalBreakdown)}} below budget</span>
            </div>
          </div>
        </div>
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
            <Input :id="`category-amount-${index}`" v-model.number="category.amount" type="number" placeholder="Budget for this category" label="Amount" :prefix="localBudget.currency" />
            <div class="flex justify-end mt-2">
              <Button v-if="localBudget.categories.length > 1" @click="removeCategoryRow(category.tempId, category.id)" variant="ghost">
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
    showSheet: {
      type: Boolean,
      default: false,
    },

    // modelValue is expected to be an object controlling sheet visibility
    // and containing budget data: { showSheet: boolean, totalBudget: number, currency: string, categories: [] }
    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        totalBudget: null,
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
        totalBudget: null,
        currency: 'PHP',
        categories: [],
      },
    };
  },

  computed: {
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
    },

    totalBreakdown() {
      return this.localBudget.categories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount
      }, 0)
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
          totalBudget: newVal.totalBudget || null,
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
        tempId: this.generateUniqueId(),
        name: '',
        amount: 0,
      });
    },
    // Removes a budget category from the localBudget.categories array by ID
    async removeCategoryRow(tempId, id) {
      this.localBudget.categories = this.localBudget.categories.filter(category => {
        if (category.id) {
          return category.id !== id
        } else {
          return category.tempId !== tempId
        }
      });
      // Optional: if all removed, add a new blank row for convenience
      if (this.localBudget.categories.length === 0) {
        this.addCategoryRow();
      }

      // -- GET TRIP ID
      const pathname = window.location.pathname
      const tripId = pathname.split('/')[2]

      // -- API CALL TO DELETE THE BUDGET CATEGORY IN FIRESTORE
      const response = await fetch(`/api/v1/trip/budget?tripId=${tripId}&budgetId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`ERROR deleting budget: ${error.message}`)
      }
    },
    // Creates a summary string for the AdvInput component header
    getCategorySummary(category) {
      try {
        if (category.name && category.amount > 0) {
          const formatter = new Intl.NumberFormat(this.getLocale(), {
            style: 'currency',
            currency: this.localBudget.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          return `${formatter.format(category.amount)}`;
        } else if (category.name) {
          return category.name;
        }
        return 'New Category';
      } catch (e) {
        console.log(e)
      }
    },

    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat((this.getLocale(), {
        style: 'currency',
        currency: this.localBudget.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }))
      return `${this.getCurrencySymbol(this.localBudget.currency)} ${formatter.format(amount)}`;
    },

    getCurrencySymbol(currencyCode) {
      try {
        // Create a new NumberFormat object.
        // Use 'en-US' or any locale that supports a wide range of currencies.
        // 'currencyDisplay: "symbol"' ensures the currency symbol is returned.
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyCode,
          currencyDisplay: 'symbol',
        });

        // Format a dummy amount (e.g., 0) and then extract the symbol.
        // This is a common trick because there isn't a direct method like getSymbol().
        const formatted = formatter.format(0);

        // The symbol will usually be at the beginning or end of the formatted string.
        // We can use a regular expression to find it, or simply return the formatted string
        // which often just contains the symbol for a zero value.
        // A more robust way is to strip the digits and spaces.

        // A simpler approach for many currencies is to just return the formatted 0.
        // For example, formatter.format(0) for USD is "$0.00", for EUR is "€0.00".
        // We want to extract just the symbol.

        // Let's try to remove numbers, decimal separators, and group separators.
        return formatted.replace(/[0-9.,\s-]/g, '');

      } catch (error) {
        return currencyCode;
      }
    },

    // CURRENCY OPTIONS
    currencyOptions() {
      return [
        { label: 'AED', value: 'AED' },
        { label: 'AFN', value: 'AFN' },
        { label: 'ALL', value: 'ALL' },
        { label: 'AMD', value: 'AMD' },
        { label: 'ANG', value: 'ANG' },
        { label: 'AOA', value: 'AOA' },
        { label: 'ARS', value: 'ARS' },
        { label: 'AUD', value: 'AUD' },
        { label: 'AWG', value: 'AWG' },
        { label: 'AZN', value: 'AZN' },
        { label: 'BAM', value: 'BAM' },
        { label: 'BBD', value: 'BBD' },
        { label: 'BDT', value: 'BDT' },
        { label: 'BGN', value: 'BGN' },
        { label: 'BHD', value: 'BHD' },
        { label: 'BIF', value: 'BIF' },
        { label: 'BMD', value: 'BMD' },
        { label: 'BND', value: 'BND' },
        { label: 'BOB', value: 'BOB' },
        { label: 'BOV', value: 'BOV' },
        { label: 'BRL', value: 'BRL' },
        { label: 'BSD', value: 'BSD' },
        { label: 'BTN', value: 'BTN' },
        { label: 'BWP', value: 'BWP' },
        { label: 'BYN', value: 'BYN' },
        { label: 'BZD', value: 'BZD' },
        { label: 'CAD', value: 'CAD' },
        { label: 'CDF', value: 'CDF' },
        { label: 'CHE', value: 'CHE' },
        { label: 'CHF', value: 'CHF' },
        { label: 'CHW', value: 'CHW' },
        { label: 'CLF', value: 'CLF' },
        { label: 'CLP', value: 'CLP' },
        { label: 'CNY', value: 'CNY' },
        { label: 'COP', value: 'COP' },
        { label: 'COU', value: 'COU' },
        { label: 'CRC', value: 'CRC' },
        { label: 'CUC', value: 'CUC' },
        { label: 'CUP', value: 'CUP' },
        { label: 'CVE', value: 'CVE' },
        { label: 'CZK', value: 'CZK' },
        { label: 'DJF', value: 'DJF' },
        { label: 'DKK', value: 'DKK' },
        { label: 'DOP', value: 'DOP' },
        { label: 'DZD', value: 'DZD' },
        { label: 'EGP', value: 'EGP' },
        { label: 'ERN', value: 'ERN' },
        { label: 'ETB', value: 'ETB' },
        { label: 'EUR', value: 'EUR' },
        { label: 'FJD', value: 'FJD' },
        { label: 'FKP', value: 'FKP' },
        { label: 'GBP', value: 'GBP' },
        { label: 'GEL', value: 'GEL' },
        { label: 'GHS', value: 'GHS' },
        { label: 'GIP', value: 'GIP' },
        { label: 'GMD', value: 'GMD' },
        { label: 'GNF', value: 'GNF' },
        { label: 'GTQ', value: 'GTQ' },
        { label: 'GYD', value: 'GYD' },
        { label: 'HKD', value: 'HKD' },
        { label: 'HNL', value: 'HNL' },
        { label: 'HTG', value: 'HTG' },
        { label: 'HUF', value: 'HUF' },
        { label: 'IDR', value: 'IDR' },
        { label: 'ILS', value: 'ILS' },
        { label: 'INR', value: 'INR' },
        { label: 'IQD', value: 'IQD' },
        { label: 'IRR', value: 'IRR' },
        { label: 'ISK', value: 'ISK' },
        { label: 'JMD', value: 'JMD' },
        { label: 'JOD', value: 'JOD' },
        { label: 'JPY', value: 'JPY' },
        { label: 'KES', value: 'KES' },
        { label: 'KGS', value: 'KGS' },
        { label: 'KHR', value: 'KHR' },
        { label: 'KMF', value: 'KMF' },
        { label: 'KPW', value: 'KPW' },
        { label: 'KRW', value: 'KRW' },
        { label: 'KWD', value: 'KWD' },
        { label: 'KYD', value: 'KYD' },
        { label: 'KZT', value: 'KZT' },
        { label: 'LAK', value: 'LAK' },
        { label: 'LBP', value: 'LBP' },
        { label: 'LKR', value: 'LKR' },
        { label: 'LRD', value: 'LRD' },
        { label: 'LSL', value: 'LSL' },
        { label: 'LYD', value: 'LYD' },
        { label: 'MAD', value: 'MAD' },
        { label: 'MDL', value: 'MDL' },
        { label: 'MGA', value: 'MGA' },
        { label: 'MKD', value: 'MKD' },
        { label: 'MMK', value: 'MMK' },
        { label: 'MNT', value: 'MNT' },
        { label: 'MOP', value: 'MOP' },
        { label: 'MRU', value: 'MRU' },
        { label: 'MUR', value: 'MUR' },
        { label: 'MVR', value: 'MVR' },
        { label: 'MWK', value: 'MWK' },
        { label: 'MXN', value: 'MXN' },
        { label: 'MYR', value: 'MYR' },
        { label: 'MZN', value: 'MZN' },
        { label: 'NAD', value: 'NAD' },
        { label: 'NGN', value: 'NGN' },
        { label: 'NIO', value: 'NIO' },
        { label: 'NOK', value: 'NOK' },
        { label: 'NPR', value: 'NPR' },
        { label: 'NZD', value: 'NZD' },
        { label: 'OMR', value: 'OMR' },
        { label: 'PAB', value: 'PAB' },
        { label: 'PEN', value: 'PEN' },
        { label: 'PGK', value: 'PGK' },
        { label: 'PHP', value: 'PHP' },
        { label: 'PKR', value: 'PKR' },
        { label: 'PLN', value: 'PLN' },
        { label: 'PYG', value: 'PYG' },
        { label: 'QAR', value: 'QAR' },
        { label: 'RON', value: 'RON' },
        { label: 'RSD', value: 'RSD' },
        { label: 'RUB', value: 'RUB' },
        { label: 'RWF', value: 'RWF' },
        { label: 'SAR', value: 'SAR' },
        { label: 'SBD', value: 'SBD' },
        { label: 'SCR', value: 'SCR' },
        { label: 'SDG', value: 'SDG' },
        { label: 'SEK', value: 'SEK' },
        { label: 'SGD', value: 'SGD' },
        { label: 'SHP', value: 'SHP' },
        { label: 'SLE', value: 'SLE' },
        { label: 'SOS', value: 'SOS' },
        { label: 'SRD', value: 'SRD' },
        { label: 'SSP', value: 'SSP' },
        { label: 'STN', value: 'STN' },
        { label: 'SVC', value: 'SVC' },
        { label: 'SYP', value: 'SYP' },
        { label: 'SZL', value: 'SZL' },
        { label: 'THB', value: 'THB' },
        { label: 'TJS', value: 'TJS' },
        { label: 'TMT', value: 'TMT' },
        { label: 'TND', value: 'TND' },
        { label: 'TOP', value: 'TOP' },
        { label: 'TRY', value: 'TRY' },
        { label: 'TTD', value: 'TTD' },
        { label: 'TWD', value: 'TWD' },
        { label: 'TZS', value: 'TZS' },
        { label: 'UAH', value: 'UAH' },
        { label: 'UGX', value: 'UGX' },
        { label: 'USD', value: 'USD' },
        { label: 'UYU', value: 'UYU' },
        { label: 'UZS', value: 'UZS' },
        { label: 'VES', value: 'VES' },
        { label: 'VND', value: 'VND' },
        { label: 'VUV', value: 'VUV' },
        { label: 'WST', value: 'WST' },
        { label: 'XAF', value: 'XAF' },
        { label: 'XCD', value: 'XCD' },
        { label: 'XDR', value: 'XDR' },
        { label: 'XOF', value: 'XOF' },
        { label: 'XPF', value: 'XPF' },
        { label: 'YER', value: 'YER' },
        { label: 'ZAR', value: 'ZAR' },
        { label: 'ZMW', value: 'ZMW' },
        { label: 'ZWG', value: 'ZWG' }
      ]
    },

    // Emits the updated budget data back to the parent
    async saveBudget() {
      // Filter out any completely empty category rows before emitting
      const savedCategories = this.localBudget.categories.filter(c => c.name.trim() !== '' || c.amount > 0);

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet)
        totalBudget: this.localBudget.totalBudget,
        currency: this.localBudget.currency,
        categories: savedCategories, // Update the categories array
      });

      this.$emit('update:showSheet', false)

      // -- GET TRIP ID
      const pathname = window.location.pathname
      const tripId = pathname.split('/')[2]

      const response = await fetch ('/api/v1/trip/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: tripId,
          overallBudget: this.localBudget.totalBudget,
          budgetBreakdown: savedCategories,
        })
      })

      if (!response.ok) {
        console.error('ERROR saving budget')
      }
    },

    // Closes the sheet
    closeSheet() {
      this.$emit('update:showSheet', false);
    },
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