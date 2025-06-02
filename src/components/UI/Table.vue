<template>
  <!-- FOR DESKTOP -->
  <table class="lg:table hidden min-w-full border-collapse">
    <thead>
      <tr class="bg-zinc-900 text-left text-sm text-zinc-600">
        <th class="w-0 min-w-0 px-2 py-1 text-start border-x-4 border-black">
          <div class="w-full h-full flex items-center justify-between">
            <span>#</span>
          </div>
        </th>
        <th @click="sortBy('account')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Account</span>
            <i v-if="currentSort == 'account' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'account' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th @click="sortBy('name')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Name</span>
            <i v-if="currentSort == 'name' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'name' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th @click="sortBy('type')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Type</span>
            <i v-if="currentSort == 'type' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'type' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th @click="sortBy('category')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Category</span>
            <i v-if="currentSort == 'category' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'category' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th @click="sortBy('cost')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Cost</span>
            <i v-if="currentSort == 'cost' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'cost' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th @click="sortBy('transaction_at')" class="px-2 py-1 text-start border-x-4 border-black transition cursor-pointer hover:bg-zinc-800">
          <div class="w-full h-full flex items-center justify-between">
            <span>Date</span>
            <i v-if="currentSort == 'transaction_at' && currentSortDir == 'asc'" class="ph ph-arrow-down"></i>
            <i  v-if="currentSort == 'transaction_at' && currentSortDir == 'desc'"class="ph ph-arrow-up"></i>
          </div>
        </th>
        <th v-if="editMode" class="w-0 min-w-0 px-2 py-1 text-start border-x-4 border-black">
          <span>Actions</span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(tr, index) in paginatedTransactions"
        :key="tr.id || index"
        class="bg-zinc-900"
      >
        <td class="w-0 min-w-0 px-2 py-1 border-4 border-black">{{ (index + 1) + 10 * (currentPage - 1)  }}</td>

        <td class="px-2 py-1 border-4 border-black">
          <span v-if="!editMode">{{ tr.balance.name }}</span> 
          <i v-if="!editMode && tr.transfer_to" class="ph ph-arrow-right"></i>
          <span v-if="!editMode && tr.transfer_to">{{ tr.transfer_to.name }}</span>
          <div v-if="editMode" class="-mx-2 -my-1 flex items-center">
            <Select class="w-full" placeholder="Select Source" :options="balanceOptions" v-model="tr.balance_source_id" :id="tr.id + '-source'" />
            <Select v-if="tr.type === 'transfer'" class="w-full" placeholder="Transfer to" :options="balanceOptions" v-model="tr.transfer_to_id" :id="tr.id + '-transfer'" />
          </div>
        </td>

        <td class="px-2 py-1 border-4 border-black">
          <span v-if="!editMode">{{ tr.name }}</span>
          <Input class="-mx-2 -my-1" v-else v-model="tr.name" :id="tr.id + '-name'" />
        </td>

        <td class="px-2 py-1 border-4 border-black capitalize">
          <span v-if="!editMode" :class="[{'text-rose-400': tr.type == 'expense'}, {'text-emerald-400': tr.type == 'income'}, {'text-amber-400': tr.type=='transfer'}]">{{ tr.type }}</span>
          <Select class="-mx-2 -my-1" customClass="!w-[8rem]" :options="type" v-else v-model="tr.type" :id="tr.id + '-type'" />
        </td>

        <td class="px-2 py-1 border-4 border-black">
          <span v-if="!editMode">{{ tr.category }}</span>
          <Input class="-mx-2 -my-1" v-else v-model="tr.category" :id="tr.id + '-category'" />
        </td>

        <td class="px-2 py-1 border-4 border-black">
          <span v-if="!editMode">{{ formatCurrency(tr.cost) }}</span>
          <Input class="-mx-2 -my-1"
            v-else
            v-model="tr.cost"
            type="number"
            formatCommas
            :id="tr.id + '-cost'"
          />
        </td>
        
        <td class="px-2 py-1 border-4 border-black">
          <span v-if="!editMode">{{ formatDate(tr.transaction_at) }}</span>
          <Input class="-mx-2 -my-1" v-else v-model="tr.transaction_at" type="date" :id="tr.id + '-transaction_at'" />
        </td>

        <td v-if="editMode" class="px-2 py-1 border-4 border-black">
          <div class="w-full h-full flex items-center justify-center">
            <Button
              @clicked="toDelete(tr.id)"
              size="sm"
              variant="secondary"
              :class="{'!bg-rose-500' : toBeDeleted.includes(tr.id)}"
              title="Mark for deletion"
            >
              <i class="ph ph-trash"></i>
            </Button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- FOR MOBILE -->
  <div class="flex flex-col gap-1 lg:hidden">
    <!-- Table Controls -->
    <div class="flex gap-1">
      <Select v-model="currentSort" class="grow" variant="sm" id="orderBySelect" placeholder="Order By" :options="orderByOptions"/>
      <Select v-model="currentSortDir" class="grow" variant="sm" id="orderByDirSelect" :options="sortDirOptions"/>
    </div>
    <template v-for="(tr, index) in paginatedTransactions"
      :key="tr.id || index">
      <div class="bg-zinc-900 shadow-sm border border-zinc-700">
        <div class="relative overflow-hidden">
          <!-- UNDERNEATH ACTIONS -->
          <div class="absolute inset-0 flex justify-end items-center pr-4">
            <Button
              class="z-0"
              @clicked="toDelete(tr.id)"
              variant="secondary"
              :class="{'!bg-rose-500' : toBeDeleted.includes(tr.id)}"
              title="Mark for deletion"
            >
              <i class="ph ph-trash"></i>
            </Button>
          </div>

          <div class="relative bg-zinc-900 px-4 py-3  transition-transform"
            :style="{ transform: `translateX(${swipeConfig[index]?.slideX}px)`, transitionDuration: swipeConfig[index]?.isTransitioning ? '300ms' : '300ms' }"
            @touchstart="handleTouchStart($event, index)"
            @touchmove="handleTouchMove($event, index)"
            @touchend="handleTouchEnd(index)"
            @click="handleClick(index)"
          >
            <!-- TOP -->
            <div class="flex justify-between items-start">
              <!-- LEFT -->
              <div class="flex flex-col gap-0.5">
                <span v-if="!editMode" class="text-base font-semibold text-white">{{ tr.name }}</span>
                <Input class="!w-[8rem]" v-else v-model="tr.name" :id="tr.id + '-name'" />
                <span v-if="!editMode" class="text-sm text-zinc-400">{{ formatCurrency(tr.cost) }}</span>
                <Input class="!w-[8rem]" 
                  v-else
                  v-model="tr.cost"
                  type="number"
                  formatCommas
                  prefix="P"
                  :id="tr.id + '-cost'"
                />
              </div>

              <!-- RIGHT -->
              <div class="flex flex-col items-end gap-0.5">
                <span v-if="!editMode"
                  class="capitalize text-sm font-medium"
                  :class="{
                    'text-rose-400': tr.type == 'expense',
                    'text-emerald-400': tr.type == 'income',
                    'text-amber-400': tr.type == 'transfer'
                  }"
                >
                  {{ tr.type }}
                </span>
                <Select class="!w-[8rem]" :options="type" v-else v-model="tr.type" :id="tr.id + '-type'" />
                <span v-if="!editMode" class="text-sm text-zinc-400">{{ tr.category }}</span>
                <Input class="!w-[8rem]" v-else v-model="tr.category" :id="tr.id + '-category'" />
              </div>
            </div>

            <!-- BOTTOM -->
            <div class="mt-3 flex items-center justify-between gap-1 text-sm text-zinc-300">
              <div class="flex items-center justify-between">
                <span v-if="!editMode">{{ tr.balance.name }}</span>
                <Select label="Source" v-else class="w-full" placeholder="Select Source" :options="balanceOptions" v-model="tr.balance_source_id" :id="tr.id + '-source'" />
                <i v-if="tr.transfer_to" class="ph ph-arrow-right" :class="{'mt-5': editMode}"></i>
                <span v-if="!editMode && tr.transfer_to">{{ tr.transfer_to.name }}</span>
                <Select label="Transfer To" v-else-if="editMode && tr.type === 'transfer'" class="w-full" placeholder="Transfer to" :options="balanceOptions" v-model="tr.transfer_to_id" :id="tr.id + '-transfer'" />
              </div>
              <span class="text-zinc-700">{{ (index + 1) + 10 * (currentPage - 1)  }}</span>
            </div>

            <!-- MORE BOTTOM -->
            <div class="mt-3 flex items-center justify-between gap-1 text-sm text-zinc-300">
              <span v-if="!editMode" class="text-zinc-400">{{ formatDate(tr.transaction_at) }}</span>
              <Input label="Transaction Date" class="w-full" v-else v-model="tr.transaction_at" type="date" :id="tr.id + '-transaction_at'" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>


  <div class="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm">
    <!-- Page Size Dropdown -->
    <div class="flex items-center gap-2">
      <label for="pageSize" class="text-zinc-400">Rows per page:</label>
      <select
        id="pageSize"
        v-model.number="pageSize"
        class="bg-zinc-900 text-white border border-zinc-700 rounded px-2 py-1"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <!-- Pagination Buttons -->
    <div class="flex items-center gap-2">
      <!-- First/Prev -->
      <Button
        variant="secondary"
        size="sm"
        @clicked="currentPage = 1"
        :disabled="currentPage === 1"
      >
        First
      </Button>

      <Button
        variant="secondary"
        size="sm"
        @clicked="currentPage = Math.max(1, currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Prev
      </Button>

      <!-- Page Numbers -->
      <Button
        v-for="page in visiblePages"
        :key="page"
        variant="secondary"
        size="sm"
        @clicked="currentPage = page"
        :class="{'!bg-emerald-500 !text-black': page === currentPage}"
      >
        {{ page }}
      </Button>

      <!-- Next/Last -->
      <Button
        variant="secondary"
        size="sm"
        @clicked="currentPage = Math.min(totalPages, currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </Button>

      <Button
        variant="secondary"
        size="sm"
        @clicked="currentPage = totalPages"
        :disabled="currentPage === totalPages"
      >
        Last
      </Button>
    </div>
  </div>
</template>

<script>
import Input from '../UI/Input.vue';
import Button from './Button.vue';
import Select from './Select.vue';
import { formatLongDate } from '../../utils/dateUtils.js';

export default {
  name: 'EditableTransactionTable',
  components: { Input, Select, Button },
  props: {
    balances: {
      type: Array,
      default: [],
    },
    transactions: {
      type: Array,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    toBeDeleted: {
      type: Array,
      default: [],
    }
  },

  emits: [
    'toDelete'
  ],

  data() {
    return {
      swipeConfig: [{
        touchStartX: 0,
        touchStartY: 0,
        slideX: 0,
        isTransitioning: false,
      }],
      touchStartX: 0,
      touchStartY: 0,
      slideX: 0,
      isScrolling: false,
      isTransitioning: false,
      type: [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
        { label: 'Transfer', value: 'transfer'}
      ],
      currentSort: '',
      currentSortDir: 'desc',
      currentPage: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50, 100],

      orderByOptions: [
        {label:"Account", value:"account"},
        {label:"Name", value:"name"},
        {label:"Type", value:"type"},
        {label:"Category", value:"category"},
        {label:"Cost", value:"cost"},
        {label:"Date", value:"transaction_at"},
      ],

      sortDirOptions: [
        {label:"Ascending", value:"asc"},
        {label:"Descending", value:"desc"},
      ]
    }
  },
  methods: {
    formatDate(date) {
      return formatLongDate(date)
    },

    handleTouchStart(e, index) {
      if (!this.editMode) return;
      this.swipeConfig[index].touchStartX = e.touches[0].clientX;
      this.swipeConfig[index].touchStartY = e.touches[0].clientY;
      this.isScrolling = false;
      this.swipeConfig[index].isTransitioning = false; // Remove transition while dragging
    },
    handleTouchMove(e, index) {
      if (!this.editMode) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const diffX = touchX - this.swipeConfig[index].touchStartX;
      const diffY = touchY - this.swipeConfig[index].touchStartY;

      if (Math.abs(diffY) > Math.abs(diffX)) {
        this.isScrolling = true;
        return;
      }

      if (!this.isScrolling) {
        e.preventDefault();
        this.swipeConfig[index].slideX = Math.min(0, diffX); // Only allow swipe to left
      }
    },
    handleTouchEnd(index) {
      if (!this.editMode) return;
      this.swipeConfig[index].isTransitioning = true; // Smooth transition after release
      if (this.isScrolling) {
        this.swipeConfig[index].slideX = 0;
        return;
      }

      if (this.swipeConfig[index].slideX < -50) {
        this.swipeConfig[index].slideX = -80; // Open
      } else {
        this.swipeConfig[index].slideX = 0; // Reset
      }
    },
    handleClick(index) {
      if (!this.editMode) return;
      this.swipeConfig[index].touchStartX = 0
      this.swipeConfig[index].slideX = 0
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
      }).format(value);
    },

    toDelete(id) {
      this.$emit('toDelete', id)
    },

    sortBy(field) {
      if (this.currentSort === field) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.currentSort = field;
        this.currentSortDir = 'asc';
      }
    },
  },

  computed: {
    balanceOptions() {
      return this.balances.map(b => ({ label: b.name, value: b.id }));
    },

    sortedTransactions() {
      if (!this.currentSort) {
        return this.transactions
      };
      
      return [...this.transactions].sort((a, b) => {
        let A, B;
        switch (this.currentSort) {
          case 'index': // fallback for index sort
            A = this.transactions.indexOf(a);
            B = this.transactions.indexOf(b);
            break;
          case 'account':
            A = (a.balance?.name || '').toLowerCase();
            B = (b.balance?.name || '').toLowerCase();
            break;
          case 'name':
            A = (a.name || '').toLowerCase();
            B = (b.name || '').toLowerCase();
            break;
          case 'type':
            A = (a.type || '').toLowerCase();
            B = (b.type || '').toLowerCase();
            break;
          case 'category':
            A = (a.category || '').toLowerCase();
            B = (b.category || '').toLowerCase();
            break;
          case 'cost':
            A = Number(a.cost) || 0;
            B = Number(b.cost) || 0;
            break;
          case 'transaction_at':
            A = a.transaction_at || '';
            B = b.transaction_at || '';
            break
          default:
            return 0;
        }
        if (A < B) return this.currentSortDir === 'asc' ? -1 : 1;
        if (A > B) return this.currentSortDir === 'asc' ? 1 : -1;
        return 0;
      });
    },

    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedTransactions.slice(start, end);
    },

    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      let delta = 1; // how many pages to show around current
      
      if (current == 1 || current == total) {
        delta = 2;
      };

      const start = Math.max(1, current - delta);
      const end = Math.min(total, current + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    totalPages() {
      return Math.ceil(this.transactions.length / this.pageSize) || 1;
    },
  },

  watch: {
    pageSize() {
      this.currentPage = 1;
    },

    currentSort() {
      this.sortBy(this.currentSort)
    },

    transactions() {
      const obj = {
        touchStartX: 0,
        touchStartY: 0,
        slideX: 0,
        isTransitioning: false,
      };

      const copies = Array.from({ length: this.transactions.length }, () => ({ ...obj }));
      this.swipeConfig = copies;
    }
  },
  
  mounted(){
    const obj = {
        touchStartX: 0,
        touchStartY: 0,
        slideX: 0,
        isTransitioning: false,
      };

      const copies = Array.from({ length: this.transactions.length }, () => ({ ...obj }));
      this.swipeConfig = copies;
  }
};
</script>
