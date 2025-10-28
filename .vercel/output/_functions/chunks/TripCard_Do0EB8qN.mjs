import { C as Card } from './Card_BZn4KDPy.mjs';
import { T as Tag } from './Spinner_BXGqOP8H.mjs';
import { useSSRContext, resolveComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
  components: {
    Card,
    Tag
  },

  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  methods: {
    progressOfPlanning(trip) {
      const conditions = [
        trip.activityIds?.length > 0,
        trip.budgetIds?.length > 0,
        trip.companionsUids?.length > 1,
        trip.taskIds?.length > 0,
        !!trip.accommodationIds?.length > 0,
        // Add other conditions here
      ];

      const completed = conditions.filter(Boolean).length;

      return completed
    },

    checkUpcoming(dateStart, dateEnd) {
      const currentDate = new Date();
      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);
      endDate.setDate(endDate.getDate() + 1);

      if ( currentDate < startDate) return 'Upcoming'
      if ( startDate <= currentDate && currentDate < endDate ) return 'Active'
      if ( endDate < currentDate ) return 'Completed'
    },

    cardClass(theme) {
      switch (theme) {
        case 'peach':
          return 'border-primary-light-sm shadow-primary-light-md';
        case 'blue':
          return 'border-info-light-sm shadow-info-light-md';
        case 'amber':
          return 'border-warning-light-sm shadow-warning-light-md';
        case 'emerald':
          return 'border-success-light-sm shadow-success-light-md';
        default:
          return 'border-primary-light-sm shadow-primary-light-md';
      }
    },

    headerClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-50';
        case 'blue':
          return 'bg-sky-50';
        case 'amber':
          return 'bg-amber-50';
        case 'emerald':
          return 'bg-emerald-50';
        default:
          return 'bg-peach-50';
      }
    },

    progressClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-500';
        case 'blue':
          return 'bg-sky-500';
        case 'amber':
          return 'bg-amber-500';
        case 'emerald':
          return 'bg-emerald-500';
        default:
          return 'bg-peach-500';
      }
    },

    progressBgClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-200'
        case 'blue':
          return 'bg-sky-200';
        case 'amber':
          return 'bg-amber-200';
        case 'emerald':
          return 'bg-emerald-200';
        default:
          return 'bg-peach-200';
      }
    },

    textClass(theme) {
      switch (theme) {
        case 'peach':
          return 'text-peach-500';
        case 'blue':
          return 'text-sky-500';
        case 'amber':
          return 'text-amber-500';
        case 'emerald':
          return 'text-emerald-500';
        default:
          return 'text-peach-500';
      }
    },

    formatDateRange(startDateIso, endDateIso) {
      if (!startDateIso || !endDateIso) return '';

      const start = new Date(startDateIso);
      const end = new Date(endDateIso);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid date string(s) for range: Start "${startDateIso}", End "${endDateIso}"`);
        return '';
      }

      // Options for consistent short month and numeric day
      const monthDayOptions = { month: 'short', day: 'numeric' };
      const yearOptions = { year: 'numeric' };

      const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(end);
      const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

      // If it's a single-day trip
      if (startDateIso === endDateIso) {
        return `${startMonthDay}, ${year}`;
      }

      // If it's a multi-day trip within the same month and year
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        // Example: "May 14 - 16, 2025"
        return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start)} - ${endDay}, ${year}`;
      }

      // If it spans different months or years, show full start date and end date
      // Example: "Dec 25 - Jan 5, 2026" or "Dec 25, 2025 - Jan 5, 2026"
      const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

      if (start.getFullYear() === end.getFullYear()) {
        return `${startFull} - ${endFull}, ${year}`;
      } else {
        // If years are different, include year for both
        const startFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(start);
        const endFullYear = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(end);
        return `${startFullYear} - ${endFullYear}`;
      }
    },
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_Tag = resolveComponent("Tag");

  _push(`<!--[-->`);
  ssrRenderList($props.trips, (trip, index) => {
    _push(ssrRenderComponent(_component_Card, {
      class: ["fadeIn", `fadeIn-${index}`],
      customClass: $options.cardClass(trip.theme) + 'w-full p-0! overflow-hidden rounded-4xl hover:shadow-lg transition-shadow duration-200 cursor-pointer'
    }, {
      default: withCtx((_, _push, _parent, _scopeId) => {
        if (_push) {
          _push(`<a${
            ssrRenderAttr("href", `/trips/${trip.id}`)
          } class="block"${
            _scopeId
          }><div class="${
            ssrRenderClass(['flex flex-col gap-3 p-4 sm:p-6 md:p-8', $options.headerClass(trip.theme)])
          }"${
            _scopeId
          }><div class="flex flex-row items-center justify-between" id="status"${
            _scopeId
          }>`);
          if ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Upcoming') {
            _push(ssrRenderComponent(_component_Tag, {
              label: "Upcoming",
              class: "bg-white border-primary-light-xs"
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          if ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Active') {
            _push(ssrRenderComponent(_component_Tag, {
              label: "Active",
              variant: "yellow"
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          if ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Completed') {
            _push(ssrRenderComponent(_component_Tag, {
              label: "Completed",
              variant: "green"
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div${
            _scopeId
          }><h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate"${
            _scopeId
          }>${
            ssrInterpolate(trip.name)
          }</h3></div><div class="mt-2"${
            _scopeId
          }><span class="text-zinc-600 font-semibold text-sm"${
            _scopeId
          }>Planning Progress:</span><div class="${
            ssrRenderClass([$options.progressBgClass(trip.theme), "w-full rounded-full h-2 mt-1"])
          }"${
            _scopeId
          }><div class="${
            ssrRenderClass([$options.progressClass(trip.theme), "h-2 rounded-full"])
          }" style="${
            ssrRenderStyle({ width: `${($options.progressOfPlanning(trip)  / trip.planningProgress.total) * 100}%` })
          }"${
            _scopeId
          }></div></div><span class="text-xs text-zinc-500 mt-1 block"${
            _scopeId
          }><span class="text-sm text-zinc-500 mt-1 block"${
            _scopeId
          }>${
            ssrInterpolate($options.progressOfPlanning(trip))
          }/${
            ssrInterpolate(trip.planningProgress?.total)
          } Sections Complete</span></span></div><div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2"${
            _scopeId
          }><div class="flex gap-1 items-center"${
            _scopeId
          }><i class="${
            ssrRenderClass([$options.textClass(trip.theme), "ph ph-calendar-dots text-base"])
          }"${
            _scopeId
          }></i><span id="date-range"${
            _scopeId
          }>${
            ssrInterpolate($options.formatDateRange(trip.date.start, trip.date.end))
          }</span></div><div class="flex gap-1 items-center"${
            _scopeId
          }><i class="${
            ssrRenderClass([$options.textClass(trip.theme), "ph ph-map-pin text-base"])
          }"${
            _scopeId
          }></i><span${
            _scopeId
          }>${
            ssrInterpolate(trip.location)
          }</span></div></div></div></a>`);
        } else {
          return [
            createVNode("a", {
              href: `/trips/${trip.id}`,
              class: "block"
            }, [
              createVNode("div", {
                class: ['flex flex-col gap-3 p-4 sm:p-6 md:p-8', $options.headerClass(trip.theme)]
              }, [
                createVNode("div", {
                  class: "flex flex-row items-center justify-between",
                  id: "status"
                }, [
                  ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Upcoming')
                    ? (openBlock(), createBlock(_component_Tag, {
                        key: 0,
                        label: "Upcoming",
                        class: "bg-white border-primary-light-xs"
                      }))
                    : createCommentVNode("", true),
                  ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Active')
                    ? (openBlock(), createBlock(_component_Tag, {
                        key: 1,
                        label: "Active",
                        variant: "yellow"
                      }))
                    : createCommentVNode("", true),
                  ($options.checkUpcoming(trip.date.start, trip.date.end) === 'Completed')
                    ? (openBlock(), createBlock(_component_Tag, {
                        key: 2,
                        label: "Completed",
                        variant: "green"
                      }))
                    : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate" }, toDisplayString(trip.name), 1)
                ]),
                createVNode("div", { class: "mt-2" }, [
                  createVNode("span", { class: "text-zinc-600 font-semibold text-sm" }, "Planning Progress:"),
                  createVNode("div", {
                    class: [$options.progressBgClass(trip.theme), "w-full rounded-full h-2 mt-1"]
                  }, [
                    createVNode("div", {
                      class: ["h-2 rounded-full", $options.progressClass(trip.theme)],
                      style: { width: `${($options.progressOfPlanning(trip)  / trip.planningProgress.total) * 100}%` }
                    }, null, 6)
                  ], 2),
                  createVNode("span", { class: "text-xs text-zinc-500 mt-1 block" }, [
                    createVNode("span", { class: "text-sm text-zinc-500 mt-1 block" }, toDisplayString($options.progressOfPlanning(trip)) + "/" + toDisplayString(trip.planningProgress?.total) + " Sections Complete", 1)
                  ])
                ]),
                createVNode("div", { class: "flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-zinc-600 font-medium text-sm mt-2" }, [
                  createVNode("div", { class: "flex gap-1 items-center" }, [
                    createVNode("i", {
                      class: [$options.textClass(trip.theme), "ph ph-calendar-dots text-base"]
                    }, null, 2),
                    createVNode("span", { id: "date-range" }, toDisplayString($options.formatDateRange(trip.date.start, trip.date.end)), 1)
                  ]),
                  createVNode("div", { class: "flex gap-1 items-center" }, [
                    createVNode("i", {
                      class: [$options.textClass(trip.theme), "ph ph-map-pin text-base"]
                    }, null, 2),
                    createVNode("span", null, toDisplayString(trip.location), 1)
                  ])
                ])
              ], 2)
            ], 8, ["href"])
          ]
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/TripCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TripCard = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { TripCard as T };
