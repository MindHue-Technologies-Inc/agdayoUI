<template>
  <Sheet :model-value="showSheet" @update:modelValue="handleSheetClose">
    <div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2">
      <div class="flex items-center justify-between w-full mb-6 pb-2 border-b border-zinc-100">
        <div class="flex gap-3 items-center text-3xl text-zinc-800 max-w-full">
          <i :class="[activity.iconName || 'ph-question', 'text-peach-500 text-3xl','ph']"></i>
          <span class="font-bold">{{ activity.title || 'Activity Details' }}</span>
        </div>
        <button @click="handleSheetClose" class="text-zinc-500 hover:text-zinc-700 transition">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <div v-if="activity && activity.id" class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar">

        <div v-if="activity.time || activity.date" class="flex flex-col">
          <span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Time & Date</span>
          <div class="flex items-center gap-2 text-zinc-700">
            <i class="ph ph-calendar-blank text-peach-500 text-lg"></i> <span class="text-base">{{ activityDateTimeDisplay }}</span>
          </div>
        </div>

        <div v-if="activity.location" class="flex flex-col">
          <span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Location</span>
          <div class="flex items-center gap-2 text-zinc-700">
            <i class="ph ph-map-pin text-peach-500 text-lg"></i>
            <span class="text-base">{{ activity.location }}</span>
          </div>
        </div>

        <div v-if="activity.cost > 0 || (activity.costNote && activity.costNote !== '')" class="flex flex-col">
          <span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Budget</span>
          <div class="flex items-center gap-2 text-zinc-700">
            <i class="ph ph-currency-circle-dollar text-peach-500 text-lg"></i>
            <span class="text-base font-semibold">{{ formattedBudget }}</span>
            <span v-if="activity.costNote" class="text-zinc-500 text-sm opacity-80">({{ activity.costNote }})</span>
          </div>
        </div>

        <div v-if="activity.description" class="flex flex-col">
          <span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Description</span>
          <p class="text-zinc-700 text-base leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-100">{{ activity.description }}</p>
        </div>

      </div>

      <div v-else class="flex flex-col items-center justify-center h-full w-full text-zinc-500 py-12">
        <i class="ph ph-info text-5xl mb-4 text-zinc-300"></i>
        <p class="text-lg text-zinc-600 font-medium">No activity selected to view.</p>
        <p class="text-sm text-zinc-400 mt-2">Try clicking on an activity card.</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-6 w-full border-t border-zinc-100 mt-auto">
        <Button class="w-full" @click="handleEditClick" variant="secondary" :disabled="!activity || !activity.id">
          <i class="ph ph-pencil-simple text-base mr-2"></i> Edit Activity
        </Button>
        <Button class="w-full" @click="handleDeleteClick" variant="ghost" :disabled="!activity || !activity.id">
          <i class="ph ph-trash text-base mr-2"></i> Delete Activity
        </Button>
      </div>
    </div>
  </Sheet>
</template>

<script>
import Sheet from "@/shared/components/UI/Sheet.vue";
import Button from "@/shared/components/UI/Button.vue";

export default {
  components: {
    Sheet,
    Button,
  },

  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true,
    }
  },

  computed: {
    // The activity object to display. Default to empty if null to avoid errors.
    activity() {
      return this.modelValue.activity || {};
    },
    activityDateTimeDisplay() {
      const parts = [];
      if (this.activity.date) {
        try {
          const date = new Date(this.activity.date + 'T00:00:00');
          parts.push(date.toLocaleDateString(this.getLocale(), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }));
        } catch (e) {
          console.error("Error parsing date:", this.activity.date, e);
          parts.push(this.activity.date);
        }
      }
      if (this.activity.time) {
        try {
          const dummyDate = new Date(`2000-01-01T${this.activity.time}:00`);
          parts.push(dummyDate.toLocaleTimeString(this.getLocale(), {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }));
        } catch (e) {
          console.error("Error parsing time:", this.activity.time, e);
          parts.push(this.activity.time);
        }
      }
      return parts.length > 0 ? parts.join(' at ') : 'Time & Date not set';
    },
    formattedBudget() {
      // Adjusted condition to show "No estimated cost" only if budget is 0 AND no notes
      if (this.activity.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.activity.costCurrency || 'PHP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(this.activity.cost);
      } else if (this.activity.costNote && this.activity.costNote.trim() !== '') {
        return 'Not specified'; // Or 'N/A' if you prefer
      }
      return 'No estimated cost';
    }
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    handleSheetClose() {
      this.$emit('update:showSheet', false);
    },
    handleEditClick() {
      this.$emit('edit-activity', this.activity);
      this.handleSheetClose();
    },
    handleDeleteClick() {
      if (confirm(`Are you sure you want to delete "${this.activity.title}"? This action cannot be undone.`)) {
        this.$emit('delete-activity', this.activity.id);
        this.handleSheetClose();
      }
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