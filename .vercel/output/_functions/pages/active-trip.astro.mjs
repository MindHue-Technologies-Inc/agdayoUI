import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
import { resolveComponent, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext, mergeProps, defineComponent, ref, computed, onMounted, createTextVNode } from 'vue';
import { A as Anchor } from '../chunks/Anchor_C95N-aL4.mjs';
import '../chunks/TripCard_tX_OmQSg.mjs';
import { C as Card } from '../chunks/Card_DqSI8ctk.mjs';
import { T as Tag, S as Spinner } from '../chunks/Spinner_D3LiV7vU.mjs';
import { ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main$4 = {
  components: {
    Spinner,
    Card,
    Tag,
  },

  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isLoading: false,
    }
  },

  watch: {
    trips() {
      if (this.trips) this.isLoading = false;
    }
  },

  methods: {
    formattedCost(cost, currency) {
      if (typeof cost === 'number') {
        // Format as currency if it's a number
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: currency }).format(cost);
      }
      return cost; // Return as is if it's a string (e.g., "Included")
    },
    days(trip) {
      const dates = [];
      new Date(trip.date.start);
      const endDate = new Date(trip.date.end);
      const locale = navigator.language || 'en-US';

      let currentDate = new Date(trip.date.start);

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`;
        const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
        const isoDate = `${year}-${month}-${day}`;
        new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push(isoDate);

        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    },

    getDay(datetime) {
      const date = new Date(datetime);
      const days = [
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT'
      ];
      return days[date.getDay()]
    },

    formatTime(time) {
      if (!time) return

      const x = time.split(':');

      // HOUR
      let hour = Number(x[0]);
      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;

      // MINUTE
      let minute = x[1];

      let ampm = Number(x[0]) >= 12 ? 'PM': 'AM';

      return `${hour}:${minute} ${ampm}`
    },

    currentActivity(trip) {
      const x = trip.activities?.filter(act => {
        return act.datetime <= this.getLocalIsoStringWithOffset(new Date())
      });

      if (!x) return x

      return x.sort((a,b)=>b.datetime.localeCompare(a.datetime))[0]
    },

    nextActivity(trip) {
      const x = trip.activities?.filter(act => {
        return act.datetime >= this.getLocalIsoStringWithOffset(new Date())
      });

      if (!x) return x

      return x.sort((a,b)=>a.datetime.localeCompare(b.datetime))[0]
    },

    getLocalIsoStringWithOffset(date) {
      const pad = (num) => num < 10 ? '0' + num : num;

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      // Get timezone offset in minutes and convert to HH:mm format
      date.getTimezoneOffset(); // Returns difference in minutes between UTC and local time

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },

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

      if ( currentDate < startDate) return 'Upcoming'
      if ( startDate <= currentDate && currentDate <= endDate ) return 'Active'
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

    dateClass(theme) {
      switch (theme) {
        case 'peach':
          return 'bg-peach-100 text-peach-600';
        case 'blue':
          return 'bg-sky-100 text-sky-600';
        case 'amber':
          return 'bg-amber-100 text-amber-600';
        case 'emerald':
          return 'bg-emerald-100 text-emerald-600';
        case 'purple':
          return '!text-purple-700 bg-purple-200';
        default:
          return 'bg-peach-100 text-peach-600';
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
        case 'purple':
          return '!text-purple-500';
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

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_Spinner = resolveComponent("Spinner");

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
            ssrRenderClass(['flex flex-col gap-3 p-6 sm:p-6 md:p-8', $options.headerClass(trip.theme)])
          }"${
            _scopeId
          }><div${
            _scopeId
          }><h3 class="font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate"${
            _scopeId
          }>${
            ssrInterpolate(trip.name)
          }</h3></div><div class="flex gap-1 items-center"${
            _scopeId
          }><i class="${
            ssrRenderClass([$options.textClass(trip.theme), "ph ph-map-pin text-base"])
          }"${
            _scopeId
          }></i><span${
            _scopeId
          }>${
            ssrInterpolate(trip.location)
          }</span></div><div class="flex flex-row gap-2 items-center"${
            _scopeId
          }><div class="${
            ssrRenderClass([[$options.dateClass(trip.theme)], "text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm"])
          }"${
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
          }</span></div></div><div class="${
            ssrRenderClass([[$options.dateClass('purple')], "text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm"])
          }"${
            _scopeId
          }><div class="flex gap-1 items-center"${
            _scopeId
          }><i class="${
            ssrRenderClass([$options.textClass('purple'), "ph ph-users text-base"])
          }"${
            _scopeId
          }></i><span${
            _scopeId
          }>${
            ssrInterpolate(trip.companionsUids.length)
          } Companion${
            ssrInterpolate(trip.companionsUids.length > 1 ? 's' : '')
          }</span></div></div></div></div><div class="flex flex-col gap-3 p-6 sm:p-6 md:p-8 pt-2!"${
            _scopeId
          }><span class="text-lg text-zinc-800 font-semibold"${
            _scopeId
          }>Current Activity</span>`);
          if ($options.currentActivity(trip)) {
            _push(ssrRenderComponent(_component_Card, { class: "fadeIn md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex-row!" }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  _push(`<div class="flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200"${
                    _scopeId
                  }><span class="text-peach-500 border-b text-lg mb-2"${
                    _scopeId
                  }>Day ${
                    ssrInterpolate($options.days(trip).indexOf($options.currentActivity(trip)?.date) + 1)
                  }</span><span class="text-xs text-zinc-500 mt-0.5"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.getDay($options.currentActivity(trip)?.datetime))
                  }</span><span class="font-bold text-lg text-zinc-800 whitespace-nowrap"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.formatTime($options.currentActivity(trip)?.time))
                  }</span></div><div class="flex flex-col gap-2 pl-2 w-full justify-center"${
                    _scopeId
                  }><div class="flex items-center justify-between w-full gap-1"${
                    _scopeId
                  }><div class="flex items-center gap-1"${
                    _scopeId
                  }><i class="${
                    ssrRenderClass([$options.currentActivity(trip)?.iconName, "ph text-xl text-peach-400"])
                  }"${
                    _scopeId
                  }></i><span class="text-lg font-medium"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.currentActivity(trip)?.title)
                  }</span></div></div><div class="flex items-center gap-1 text-sm text-zinc-500 mt-1"${
                    _scopeId
                  }><i class="ph ph-map-pin text-peach-400 flex-shrink-0"${
                    _scopeId
                  }></i><span${
                    _scopeId
                  }>${
                    ssrInterpolate($options.currentActivity(trip)?.location.split(',')[0])
                  }</span></div>`);
                  if ($options.currentActivity(trip)?.costNote || $options.currentActivity(trip)?.cost) {
                    _push(`<div class="flex items-center gap-1 text-sm text-zinc-500 mt-1"${_scopeId}>`);
                    if ($options.currentActivity(trip)?.cost) {
                      _push(`<i class="ph ph-wallet text-peach-400 flex-shrink-0"${_scopeId}></i>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if ($options.currentActivity(trip)?.cost) {
                      _push(`<span class="font-semibold text-zinc-600"${
                        _scopeId
                      }>${
                        ssrInterpolate($options.formattedCost($options.currentActivity(trip)?.cost, $options.currentActivity(trip)?.costCurrency))
                      }</span>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if ($options.currentActivity(trip)?.costNote) {
                      _push(`<span class="text-zinc-400"${
                        _scopeId
                      }>${
                        ssrInterpolate($options.currentActivity(trip)?.costNote)
                      }</span>`);
                    } else {
                      _push(`<!---->`);
                    }
                    _push(`</div>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200" }, [
                      createVNode("span", { class: "text-peach-500 border-b text-lg mb-2" }, "Day " + toDisplayString($options.days(trip).indexOf($options.currentActivity(trip)?.date) + 1), 1),
                      createVNode("span", { class: "text-xs text-zinc-500 mt-0.5" }, toDisplayString($options.getDay($options.currentActivity(trip)?.datetime)), 1),
                      createVNode("span", { class: "font-bold text-lg text-zinc-800 whitespace-nowrap" }, toDisplayString($options.formatTime($options.currentActivity(trip)?.time)), 1)
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2 pl-2 w-full justify-center" }, [
                      createVNode("div", { class: "flex items-center justify-between w-full gap-1" }, [
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          createVNode("i", {
                            class: ["ph text-xl text-peach-400", $options.currentActivity(trip)?.iconName]
                          }, null, 2),
                          createVNode("span", { class: "text-lg font-medium" }, toDisplayString($options.currentActivity(trip)?.title), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 text-sm text-zinc-500 mt-1" }, [
                        createVNode("i", { class: "ph ph-map-pin text-peach-400 flex-shrink-0" }),
                        createVNode("span", null, toDisplayString($options.currentActivity(trip)?.location.split(',')[0]), 1)
                      ]),
                      ($options.currentActivity(trip)?.costNote || $options.currentActivity(trip)?.cost)
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
                          }, [
                            ($options.currentActivity(trip)?.cost)
                              ? (openBlock(), createBlock("i", {
                                  key: 0,
                                  class: "ph ph-wallet text-peach-400 flex-shrink-0"
                                }))
                              : createCommentVNode("", true),
                            ($options.currentActivity(trip)?.cost)
                              ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "font-semibold text-zinc-600"
                                }, toDisplayString($options.formattedCost($options.currentActivity(trip)?.cost, $options.currentActivity(trip)?.costCurrency)), 1))
                              : createCommentVNode("", true),
                            ($options.currentActivity(trip)?.costNote)
                              ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-zinc-400"
                                }, toDisplayString($options.currentActivity(trip)?.costNote), 1))
                              : createCommentVNode("", true)
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ]
                }
              }),
              _: 2
            }, _parent, _scopeId));
          } else if ($data.isLoading && !$options.currentActivity(trip)) {
            _push(`<div class="flex flex-col items-center justify-center"${_scopeId}>`);
            _push(ssrRenderComponent(_component_Spinner, null, null, _parent, _scopeId));
            _push(`<span class="text-zinc-400"${_scopeId}>Loading Activity</span></div>`);
          } else {
            _push(`<div class="flex items-center justify-center"${_scopeId}> No Activities </div>`);
          }
          if ($options.nextActivity(trip)) {
            _push(`<span class="text-lg text-zinc-800 font-semibold"${_scopeId}>Next Activity</span>`);
          } else {
            _push(`<!---->`);
          }
          if ($options.nextActivity(trip)) {
            _push(ssrRenderComponent(_component_Card, { class: "fadeIn fadeIn-1 md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex-row!" }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  _push(`<div class="flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200"${
                    _scopeId
                  }><span class="text-peach-500 border-b text-lg mb-2"${
                    _scopeId
                  }>Day ${
                    ssrInterpolate($options.days(trip).indexOf($options.nextActivity(trip)?.date) + 1)
                  }</span><span class="text-xs text-zinc-500 mt-0.5"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.getDay($options.nextActivity(trip)?.datetime))
                  }</span><span class="font-bold text-lg text-zinc-800 whitespace-nowrap"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.formatTime($options.nextActivity(trip)?.time))
                  }</span></div><div class="flex flex-col gap-2 pl-2 w-full justify-center"${
                    _scopeId
                  }><div class="flex items-center justify-between w-full gap-1"${
                    _scopeId
                  }><div class="flex items-center gap-1"${
                    _scopeId
                  }><i class="${
                    ssrRenderClass([$options.nextActivity(trip)?.iconName, "ph text-xl text-peach-400"])
                  }"${
                    _scopeId
                  }></i><span class="text-lg font-medium"${
                    _scopeId
                  }>${
                    ssrInterpolate($options.nextActivity(trip)?.title)
                  }</span></div></div><div class="flex items-center gap-1 text-sm text-zinc-500 mt-1"${
                    _scopeId
                  }><i class="ph ph-map-pin text-peach-400 flex-shrink-0"${
                    _scopeId
                  }></i><span${
                    _scopeId
                  }>${
                    ssrInterpolate($options.nextActivity(trip)?.location.split(',')[0])
                  }</span></div>`);
                  if ($options.nextActivity(trip)?.costNote || $options.nextActivity(trip)?.cost) {
                    _push(`<div class="flex items-center gap-1 text-sm text-zinc-500 mt-1"${_scopeId}>`);
                    if ($options.nextActivity(trip)?.cost) {
                      _push(`<i class="ph ph-wallet text-peach-400 flex-shrink-0"${_scopeId}></i>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if ($options.nextActivity(trip)?.cost) {
                      _push(`<span class="font-semibold text-zinc-600"${
                        _scopeId
                      }>${
                        ssrInterpolate($options.formattedCost($options.nextActivity(trip)?.cost, $options.nextActivity(trip)?.costCurrency))
                      }</span>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if ($options.nextActivity(trip)?.costNote) {
                      _push(`<span class="text-zinc-400"${
                        _scopeId
                      }>${
                        ssrInterpolate($options.nextActivity(trip)?.costNote)
                      }</span>`);
                    } else {
                      _push(`<!---->`);
                    }
                    _push(`</div>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200" }, [
                      createVNode("span", { class: "text-peach-500 border-b text-lg mb-2" }, "Day " + toDisplayString($options.days(trip).indexOf($options.nextActivity(trip)?.date) + 1), 1),
                      createVNode("span", { class: "text-xs text-zinc-500 mt-0.5" }, toDisplayString($options.getDay($options.nextActivity(trip)?.datetime)), 1),
                      createVNode("span", { class: "font-bold text-lg text-zinc-800 whitespace-nowrap" }, toDisplayString($options.formatTime($options.nextActivity(trip)?.time)), 1)
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2 pl-2 w-full justify-center" }, [
                      createVNode("div", { class: "flex items-center justify-between w-full gap-1" }, [
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          createVNode("i", {
                            class: ["ph text-xl text-peach-400", $options.nextActivity(trip)?.iconName]
                          }, null, 2),
                          createVNode("span", { class: "text-lg font-medium" }, toDisplayString($options.nextActivity(trip)?.title), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 text-sm text-zinc-500 mt-1" }, [
                        createVNode("i", { class: "ph ph-map-pin text-peach-400 flex-shrink-0" }),
                        createVNode("span", null, toDisplayString($options.nextActivity(trip)?.location.split(',')[0]), 1)
                      ]),
                      ($options.nextActivity(trip)?.costNote || $options.nextActivity(trip)?.cost)
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
                          }, [
                            ($options.nextActivity(trip)?.cost)
                              ? (openBlock(), createBlock("i", {
                                  key: 0,
                                  class: "ph ph-wallet text-peach-400 flex-shrink-0"
                                }))
                              : createCommentVNode("", true),
                            ($options.nextActivity(trip)?.cost)
                              ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "font-semibold text-zinc-600"
                                }, toDisplayString($options.formattedCost($options.nextActivity(trip)?.cost, $options.nextActivity(trip)?.costCurrency)), 1))
                              : createCommentVNode("", true),
                            ($options.nextActivity(trip)?.costNote)
                              ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-zinc-400"
                                }, toDisplayString($options.nextActivity(trip)?.costNote), 1))
                              : createCommentVNode("", true)
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ]
                }
              }),
              _: 2
            }, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></a>`);
        } else {
          return [
            createVNode("a", {
              href: `/trips/${trip.id}`,
              class: "block"
            }, [
              createVNode("div", {
                class: ['flex flex-col gap-3 p-6 sm:p-6 md:p-8', $options.headerClass(trip.theme)]
              }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "font-extrabold text-2xl sm:text-3xl text-zinc-800 tracking-tight outfit leading-tight truncate" }, toDisplayString(trip.name), 1)
                ]),
                createVNode("div", { class: "flex gap-1 items-center" }, [
                  createVNode("i", {
                    class: [$options.textClass(trip.theme), "ph ph-map-pin text-base"]
                  }, null, 2),
                  createVNode("span", null, toDisplayString(trip.location), 1)
                ]),
                createVNode("div", { class: "flex flex-row gap-2 items-center" }, [
                  createVNode("div", {
                    class: ["text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm", [$options.dateClass(trip.theme)]]
                  }, [
                    createVNode("div", { class: "flex gap-1 items-center" }, [
                      createVNode("i", {
                        class: [$options.textClass(trip.theme), "ph ph-calendar-dots text-base"]
                      }, null, 2),
                      createVNode("span", { id: "date-range" }, toDisplayString($options.formatDateRange(trip.date.start, trip.date.end)), 1)
                    ])
                  ], 2),
                  createVNode("div", {
                    class: ["text-xs px-2 py-1 rounded-md flex flex-row flex-wrap items-center font-medium text-sm", [$options.dateClass('purple')]]
                  }, [
                    createVNode("div", { class: "flex gap-1 items-center" }, [
                      createVNode("i", {
                        class: [$options.textClass('purple'), "ph ph-users text-base"]
                      }, null, 2),
                      createVNode("span", null, toDisplayString(trip.companionsUids.length) + " Companion" + toDisplayString(trip.companionsUids.length > 1 ? 's' : ''), 1)
                    ])
                  ], 2)
                ])
              ], 2),
              createVNode("div", { class: "flex flex-col gap-3 p-6 sm:p-6 md:p-8 pt-2!" }, [
                createVNode("span", { class: "text-lg text-zinc-800 font-semibold" }, "Current Activity"),
                ($options.currentActivity(trip))
                  ? (openBlock(), createBlock(_component_Card, {
                      key: 0,
                      class: "fadeIn md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex-row!"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200" }, [
                          createVNode("span", { class: "text-peach-500 border-b text-lg mb-2" }, "Day " + toDisplayString($options.days(trip).indexOf($options.currentActivity(trip)?.date) + 1), 1),
                          createVNode("span", { class: "text-xs text-zinc-500 mt-0.5" }, toDisplayString($options.getDay($options.currentActivity(trip)?.datetime)), 1),
                          createVNode("span", { class: "font-bold text-lg text-zinc-800 whitespace-nowrap" }, toDisplayString($options.formatTime($options.currentActivity(trip)?.time)), 1)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2 pl-2 w-full justify-center" }, [
                          createVNode("div", { class: "flex items-center justify-between w-full gap-1" }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode("i", {
                                class: ["ph text-xl text-peach-400", $options.currentActivity(trip)?.iconName]
                              }, null, 2),
                              createVNode("span", { class: "text-lg font-medium" }, toDisplayString($options.currentActivity(trip)?.title), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 text-sm text-zinc-500 mt-1" }, [
                            createVNode("i", { class: "ph ph-map-pin text-peach-400 flex-shrink-0" }),
                            createVNode("span", null, toDisplayString($options.currentActivity(trip)?.location.split(',')[0]), 1)
                          ]),
                          ($options.currentActivity(trip)?.costNote || $options.currentActivity(trip)?.cost)
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
                              }, [
                                ($options.currentActivity(trip)?.cost)
                                  ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "ph ph-wallet text-peach-400 flex-shrink-0"
                                    }))
                                  : createCommentVNode("", true),
                                ($options.currentActivity(trip)?.cost)
                                  ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "font-semibold text-zinc-600"
                                    }, toDisplayString($options.formattedCost($options.currentActivity(trip)?.cost, $options.currentActivity(trip)?.costCurrency)), 1))
                                  : createCommentVNode("", true),
                                ($options.currentActivity(trip)?.costNote)
                                  ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      class: "text-zinc-400"
                                    }, toDisplayString($options.currentActivity(trip)?.costNote), 1))
                                  : createCommentVNode("", true)
                              ]))
                            : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024))
                  : ($data.isLoading && !$options.currentActivity(trip))
                    ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center justify-center"
                      }, [
                        createVNode(_component_Spinner),
                        createVNode("span", { class: "text-zinc-400" }, "Loading Activity")
                      ]))
                    : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center justify-center"
                      }, " No Activities ")),
                ($options.nextActivity(trip))
                  ? (openBlock(), createBlock("span", {
                      key: 3,
                      class: "text-lg text-zinc-800 font-semibold"
                    }, "Next Activity"))
                  : createCommentVNode("", true),
                ($options.nextActivity(trip))
                  ? (openBlock(), createBlock(_component_Card, {
                      key: 4,
                      class: "fadeIn fadeIn-1 md:!p-6 !p-3 gap-2 grow rounded-[1.2rem] border border-peach-400 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex-row!"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center justify-start pt-1 pr-3 md:pr-6 border-r border-zinc-200" }, [
                          createVNode("span", { class: "text-peach-500 border-b text-lg mb-2" }, "Day " + toDisplayString($options.days(trip).indexOf($options.nextActivity(trip)?.date) + 1), 1),
                          createVNode("span", { class: "text-xs text-zinc-500 mt-0.5" }, toDisplayString($options.getDay($options.nextActivity(trip)?.datetime)), 1),
                          createVNode("span", { class: "font-bold text-lg text-zinc-800 whitespace-nowrap" }, toDisplayString($options.formatTime($options.nextActivity(trip)?.time)), 1)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2 pl-2 w-full justify-center" }, [
                          createVNode("div", { class: "flex items-center justify-between w-full gap-1" }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode("i", {
                                class: ["ph text-xl text-peach-400", $options.nextActivity(trip)?.iconName]
                              }, null, 2),
                              createVNode("span", { class: "text-lg font-medium" }, toDisplayString($options.nextActivity(trip)?.title), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 text-sm text-zinc-500 mt-1" }, [
                            createVNode("i", { class: "ph ph-map-pin text-peach-400 flex-shrink-0" }),
                            createVNode("span", null, toDisplayString($options.nextActivity(trip)?.location.split(',')[0]), 1)
                          ]),
                          ($options.nextActivity(trip)?.costNote || $options.nextActivity(trip)?.cost)
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
                              }, [
                                ($options.nextActivity(trip)?.cost)
                                  ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "ph ph-wallet text-peach-400 flex-shrink-0"
                                    }))
                                  : createCommentVNode("", true),
                                ($options.nextActivity(trip)?.cost)
                                  ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "font-semibold text-zinc-600"
                                    }, toDisplayString($options.formattedCost($options.nextActivity(trip)?.cost, $options.nextActivity(trip)?.costCurrency)), 1))
                                  : createCommentVNode("", true),
                                ($options.nextActivity(trip)?.costNote)
                                  ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      class: "text-zinc-400"
                                    }, toDisplayString($options.nextActivity(trip)?.costNote), 1))
                                  : createCommentVNode("", true)
                              ]))
                            : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024))
                  : createCommentVNode("", true)
              ])
            ], 8, ["href"])
          ]
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/ActiveTripCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};
const ActiveTripCard = /*#__PURE__*/_export_sfc(_sfc_main$4, [['ssrRender',_sfc_ssrRender$3]]);

const _sfc_main$3 = {
  name: 'Card',
  props: {
    variant: {
      type: String,
      default: 'default', // other options: 'transparent', 'subtle', etc.
    },
    size: {
      type: String,
      default: 'default',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'asdf':
          return '';
        default:
          return '  '
      }
    },

    backgroundClass() {
      switch (this.variant) {
        case 'transparent':
          return 'bg-transparent';
        case 'subtle':
          return 'bg-zinc-100 dark:bg-zinc-900';
        case 'dotted':
          return 'dotted-bg';
        default:
          return 'bg-white rounded-4xl';
      }
    },
    borderClass() {
      return 'border-secondary-xs';
    },
  },
};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["card-container", [
      'p-4 md:p-6 flex flex-col gap-2 transition-colors',
      'w-full overflow-hidden rounded-2xl',
      'border-secondary-xs shadow-secondary-sm',
      $options.backgroundClass,
      $props.customClass
    ]]
  }, _attrs))} data-v-1cf50826>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/AgdayoCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const AgdayoCard = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$2],['__scopeId',"data-v-1cf50826"]]);

const _sfc_main$2 = {
  name: 'Button',
  emits: ['addPhotos'],
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'submit', 'reset'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'danger', 'ghost', 'google'].includes(val),
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    baseClasses() {
      return 'relative px-8 font-bold duration-100 transition cursor-pointer overflow-hidden group active:scale-95 rounded-full';
    },

    sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'text-sm px-3 py-2';
        case 'lg':
          return 'text-lg px-6 py-4';
        default: // 'md'
          return 'text-base px-4 py-3';
      }
    },

    variantClasses() {
      switch (this.variant) {
        case 'primary':
          // Branded peach action
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          // Neutral modern tone (grayish)
          return 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-secondary-sm border-secondary-xs';
        case 'danger':
          // Softer red tone, not too loud
          return 'bg-rose-500 text-white hover:bg-rose-600 shadow-danger-sm border-danger-xs';
        case 'ghost':
          // Peach outline/ghost style
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        case 'google':
          // DARK BUTTON
          return 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        default:
          return '';
      }
    }
  },
  methods: {
    triggerFilePicker() {
      this.$refs.fileInputRef.click();
    },

    handleFileChange(event) {
      const target = event.target;
      const files = target.files;
      this.$emit('addPhotos', Array.from(files));
    }
  }
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><button type="button" class="${
    ssrRenderClass([
      $options.baseClasses,
      $options.sizeClasses,
      $options.variantClasses,
      $props.disabled ? 'opacity-50 cursor-not-allowed' : '',
      $props.customClass,
      $props.disabled || $props.loading ? 'active:scale-100' : '',
    ])
  }"${
    (ssrIncludeBooleanAttr($props.disabled || $props.loading)) ? " disabled" : ""
  }> + Add Photos </button><input type="file" class="hidden" accept="image/*"${
    (ssrIncludeBooleanAttr(true)) ? " multiple" : ""
  }><!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/ButtonFile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const ButtonFile = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PhotoUI",
  setup(__props, { expose: __expose }) {
    __expose();
    const files = ref([]);
    const addPhotos = (e) => {
      files.value = [...files.value, ...e];
    };
    const imagePreviews = computed(() => {
      return files.value.filter((file) => file.type.startsWith("image/")).map((file) => URL.createObjectURL(file));
    });
    const removePhoto = (file, index) => {
      const url = JSON.parse(JSON.stringify(imagePreviews.value[index]));
      files.value.splice(index, 1);
      URL.revokeObjectURL(url);
    };
    const __returned__ = { files, addPhotos, imagePreviews, removePhoto, ButtonFile };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/shared/components/UI/PhotoUI.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ActiveTrips"
  },
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const trips = ref([]);
    const isLoading = ref(true);
    const activeTrips = computed(() => {
      return trips.value.filter((trip) => {
        return checkUpcoming(trip.date.start, trip.date.end) === "Active";
      });
    });
    const upcomingTrips = computed(() => {
      return trips.value.filter((trip) => {
        return checkUpcoming(trip.date.start, trip.date.end) === "Upcoming";
      });
    });
    const companions = computed(() => {
      return [...new Set(activeTrips.value.map((trip) => trip.companionsUids).flat())];
    });
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/v1/active-trips");
        if (!response.ok) {
          console.error(`Failed to fetch trips. Status: ${response.status}`);
          throw new Error(`Failed to fetch trips: ${response.statusText}`);
        }
        isLoading.value = false;
        return await response.json();
      } catch (error) {
        console.error("Error fetching trips:", error);
        isLoading.value = false;
        return null;
      }
    };
    function getLocalIsoStringWithOffset(date) {
      const pad = (num) => num < 10 ? "0" + num : num;
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      date.getTimezoneOffset();
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    function checkUpcoming(dateStart, dateEnd) {
      const currentDate = /* @__PURE__ */ new Date();
      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);
      endDate.setDate(endDate.getDate() + 1);
      if (currentDate < startDate) return "Upcoming";
      if (startDate <= currentDate && currentDate < endDate) return "Active";
      if (endDate < currentDate) return "Completed";
    }
    onMounted(async () => {
      trips.value = await fetchTrips();
    });
    const __returned__ = { trips, isLoading, activeTrips, upcomingTrips, companions, fetchTrips, getLocalIsoStringWithOffset, checkUpcoming, Anchor, ActiveTripCard, Spinner, AgdayoCard };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.activeTrips.length <= 0) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col grow items-center justify-center gap-4" }, _attrs))}>`);
    if ($setup.isLoading) {
      _push(`<div class="flex items-center justify-center w-full h-[32rem]">`);
      _push(ssrRenderComponent($setup["Spinner"], { label: "Loading your trips" }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<template><div class="flex flex-col grow items-center justify-center gap-4"><i class="ph ph-island text-8xl text-zinc-400"></i><span class="font-medium text-zinc-400">No Active or Upcoming Trip</span><div class="flex flex-col gap-1 items-center justify-center">`);
      _push(ssrRenderComponent($setup["Anchor"], {
        href: "/create-trip",
        class: "text-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Start Planning your Trip`);
          } else {
            return [
              createTextVNode("Start Planning your Trip")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>or</span><span class="text-xl">Use <a href="/ai" class="p-1 rounded-lg bg-white transition border border-zinc-200 scale-100 active:scale-95 hover:scale-105"><span class="font-medium" style="${ssrRenderStyle({ "background-image": "linear-gradient(to right, #eea092, #eabf67)", "color": "transparent", "background-clip": "text" })}">Agdayo AI</span></a> to help you plan your Trip!</span></div></div></template>`);
    }
    _push(`</div>`);
  } else {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-8 mt-12" }, _attrs))}><div class="flex flex-nowrap gap-2 md:gap-4">`);
    _push(ssrRenderComponent($setup["AgdayoCard"], {
      class: "fadeIn fadeIn-0",
      "custom-class": "flex flex-col items-start justify-between relative"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="flex flex-col items-start justify-between"${_scopeId}><span class="font-medium text-normal md:text-lg text-zinc-700"${_scopeId}>Active Trips</span><span class="font-bold text-4xl md:text-6xl"${_scopeId}>${ssrInterpolate($setup.activeTrips.length)}</span></div><span class="text-xs text-zinc-400 mt-4"${_scopeId}>With 4 upcoming activities</span><i class="ph ph-airplane-tilt text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"${_scopeId}></i>`);
        } else {
          return [
            createVNode("div", { class: "flex flex-col items-start justify-between" }, [
              createVNode("span", { class: "font-medium text-normal md:text-lg text-zinc-700" }, "Active Trips"),
              createVNode("span", { class: "font-bold text-4xl md:text-6xl" }, toDisplayString($setup.activeTrips.length), 1)
            ]),
            createVNode("span", { class: "text-xs text-zinc-400 mt-4" }, "With 4 upcoming activities"),
            createVNode("i", { class: "ph ph-airplane-tilt text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent($setup["AgdayoCard"], {
      class: "fadeIn fadeIn-1",
      "custom-class": "flex flex-col items-start justify-between relative"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="flex flex-col items-start justify-between"${_scopeId}><span class="font-medium text-normal md:text-lg text-zinc-700"${_scopeId}>Upcoming Trips</span><span class="font-bold text-4xl md:text-6xl"${_scopeId}>${ssrInterpolate($setup.upcomingTrips.length)}</span></div><span class="text-xs text-zinc-400 mt-4"${_scopeId}>Planned Adventures</span><i class="ph ph-calendar-dots text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"${_scopeId}></i>`);
        } else {
          return [
            createVNode("div", { class: "flex flex-col items-start justify-between" }, [
              createVNode("span", { class: "font-medium text-normal md:text-lg text-zinc-700" }, "Upcoming Trips"),
              createVNode("span", { class: "font-bold text-4xl md:text-6xl" }, toDisplayString($setup.upcomingTrips.length), 1)
            ]),
            createVNode("span", { class: "text-xs text-zinc-400 mt-4" }, "Planned Adventures"),
            createVNode("i", { class: "ph ph-calendar-dots text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent($setup["AgdayoCard"], {
      class: "fadeIn fadeIn-2 hidden md:flex",
      "custom-class": "flex flex-col items-start justify-between relative"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="flex flex-col items-start justify-between"${_scopeId}><span class="font-medium text-normal md:text-lg text-zinc-700"${_scopeId}>Companions</span><span class="font-bold text-4xl md:text-6xl"${_scopeId}>${ssrInterpolate($setup.companions.length)}</span></div><span class="text-xs text-zinc-400 mt-4"${_scopeId}>Currently on active trips</span><i class="ph ph-users text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10"${_scopeId}></i>`);
        } else {
          return [
            createVNode("div", { class: "flex flex-col items-start justify-between" }, [
              createVNode("span", { class: "font-medium text-normal md:text-lg text-zinc-700" }, "Companions"),
              createVNode("span", { class: "font-bold text-4xl md:text-6xl" }, toDisplayString($setup.companions.length), 1)
            ]),
            createVNode("span", { class: "text-xs text-zinc-400 mt-4" }, "Currently on active trips"),
            createVNode("i", { class: "ph ph-users text-zinc-100 absolute -bottom-20 -right-20 text-[16rem] -z-10" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div><span class="font-bold text-4xl fadeIn">Active Trips</span>`);
    _push(ssrRenderComponent($setup["ActiveTripCard"], { trips: $setup.activeTrips }, null, _parent));
    _push(`</div>`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/domains/trip-execution/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ActiveTrips = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Active Trips", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "ActiveTrips", ActiveTrips, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/trip-execution/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/active-trip/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/active-trip/index.astro";
const $$url = "/active-trip";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
