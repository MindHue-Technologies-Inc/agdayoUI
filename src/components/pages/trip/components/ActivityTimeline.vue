<template>
  <div class="flex flex-col gap-0 p-4 md:p-6 sm:p-8">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-3xl sm:text-4xl text-zinc-800 outfit">Day Plan</h3>
      <Button @click="$emit('show-add-activity')">+ Add Activity</Button>
    </div>

    <div>
      <template v-if="groupedActivities.length <= 0">
        <div class="py-8 text-center flex flex-col items-center justify-center">
          <i class="ph ph-note-pencil text-4xl text-zinc-300 mb-2"></i> <span class="text-zinc-500 font-medium text-lg">No Activities Yet</span>
          <p class="text-zinc-400 text-sm mt-1">Start by adding your first activity.</p>
        </div>
      </template>
      <template v-else v-for="(item, index) in groupedActivities" :key="index">
        <div :class="[
            'fadeIn',
            `fadeIn-${index}`
        ]">
          <div :key="'top-' + index" class="flex items-center justify-between">
            <button
                @click="$emit('show-day-note')"
                class="flex items-center gap-2 text-left p-2 -ml-2 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-peach-500"
            >
              <span v-if="item.type === 'day'" class="font-semibold text-2xl text-zinc-800 my-4">Day {{days.indexOf(item.iso) + 1}} - {{ item.label }}</span>
            </button>
            <Tag v-if="item.type === 'day'" @click="$emit('show-day-note')" label="+ Add Note" mode="button"/>
          </div>

          <div :key="'mid' + index" v-if="item.type === 'tag'" class="relative flex items-center justify-center">
            <div class="absolute w-full border-t border-dashed border-zinc-300"></div>
            <span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">{{ item.label }}</span>
          </div>

          <div
              :key="'bot' + index"
              v-else-if="item.type === 'activity'"
              class="flex flex-row gap-2 md:gap-4"
          >
            <TimelineDot :time="formatIsoDateToTime(item.data.datetime)" :isLast="false" />
            <CardActivity
                @click="showViewActivitySheet(item.data)"
                :iconName="item.data.iconName"
                :title="item.data.title"
                :location="item.data.location"
                :cost="item.data.cost"
                :costNote="item.data.costNote"
                :currency="item.data.costCurrency"
            />
          </div>
        </div>
      </template>
    </div>
    <div class="w-full text-center mt-8">
      <Button @click="$emit('show-add-activity')" variant="secondary" class="border border-zinc-200 hover:border-peach-400 w-full">
        <i class="ph ph-plus text-lg mr-1"></i> Add Activity
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "../../../UI/Button.vue";
import Tag from "../../../UI/Tag.vue";
import CardActivity from "../components/timeline/CardActivity.vue";
import TimelineDot from "../components/timeline/TimelineDot.vue";

export default {
  name: 'ActivityTimeline',
  components: {
    Button,
    Tag,
    CardActivity,
    TimelineDot,
  },
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
    tripConfig: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'show-add-activity',
    'show-day-note',
    'show-view-activity',
    'edit-activity',
    'delete-activity',
    'add-new-activity',
    'update-activity',
  ],
  computed: {
    days() {
      const dates = [];
      const startDate = new Date(this.tripConfig.date.start);
      const endDate = new Date(this.tripConfig.date.end);
      const locale = navigator.language || 'en-US';

      console.log(startDate)

      let currentDate = new Date(this.tripConfig.date.start);

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`
        const day = currentDate.getDate()
        const isoDate = `${year}-${month}-${day}`;
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push(isoDate);

        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    },
    groupedActivities() {
      const result = [];
      let currentDay = null;
      let hasMorning = false;
      let hasNoon = false;
      let hasAfternoon = false;
      let hasEvening = false;
      let hasDay = false;

      this.activities?.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);
        return dateA - dateB;
      })
          .forEach((activity, index) => {
        const activityDate = new Date(activity.datetime)
        const activityDay = activity.datetime.split('T')[0]
        const activityHour = activityDate.getHours();

        if(activityDay !== currentDay) {
          currentDay = activityDay;
          hasMorning = false;
          hasNoon = false;
          hasAfternoon = false;
          hasEvening = false;
          hasDay = false;
        }

        if (!hasDay) {
          hasDay = true;
          result.push({type: 'day', label: this.formatIsoDateToDate(activityDate), iso: activity.datetime.split('T')[0]})
        }

        if (activityHour >= 0 && activityHour < 12 && !hasMorning) {
          result.push({ type: 'tag', label: 'Morning' });
          hasMorning = true;
        } else if (activityHour >= 12 && activityHour < 13 && !hasNoon) {
          result.push({ type: 'tag', label: 'Noon' });
          hasNoon = true;
        } else if (activityHour >= 13 && activityHour < 18 && !hasAfternoon) {
          result.push({ type: 'tag', label: 'Afternoon' });
          hasAfternoon = true;
        } else if (activityHour >= 18 && activityHour < 23 && !hasEvening) { // Evening from 8 PM to 5 AM next day
          result.push({ type: 'tag', label: 'Evening' });
          hasEvening = true;
        }
        result.push({ type: 'activity', data: activity });
      })
      return result
    },
  },
  methods: {
    showViewActivitySheet(activity) {
      this.$emit('show-view-activity', activity);
    },
    addNewActivity(activity) {
      this.$emit('add-new-activity', activity);
    },
    updateActivity(activity) {
      this.$emit('update-activity', activity);
    },
    editSelectedActivity(activity) {
      this.$emit('edit-activity', activity);
    },
    deleteActivity(id) {
      this.$emit('delete-activity', id);
    },
    formatIsoDateToTime(value){
      let date = new Date(value)

      let hours = date.getHours()
      const minutes = date.getMinutes()

      const ampm = hours >= 12 ? 'PM' : 'AM'

      hours = hours % 12;
      hours = hours ? hours : 12

      const formattedMinutes = minutes < 10 ? '0' + minutes: minutes;

      return `${hours}:${formattedMinutes} ${ampm}`;
    },

    formatIsoDateToDate(value) {
      const date = new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },
  },
};
</script>
