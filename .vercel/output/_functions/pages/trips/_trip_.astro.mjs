import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { M as Main } from '../../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../../chunks/Topbar_BfLjpeWR.mjs';
import { T as Tag, S as Spinner } from '../../chunks/Spinner_D3LiV7vU.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Fragment, renderList, defineComponent, ref, computed, watch, onBeforeUnmount } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
/* empty css                                     */
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { C as Card } from '../../chunks/Card_DqSI8ctk.mjs';
import { B as Button } from '../../chunks/Button_W6bUmV4x.mjs';
import { P as PaymentButton } from '../../chunks/PaymentButton_Bbz0lJNb.mjs';
import { I as Input, T as Toast, a as ToastContainer } from '../../chunks/Toast_CUQC-hn-.mjs';
import { A as AdvInput, I as InputTitle, a as Dates, D as Destination, u as useDbStore } from '../../chunks/db_BwfrwfFb.mjs';
import { F as Friends } from '../../chunks/Friends_DYxd2KFx.mjs';
import { A as Anchor } from '../../chunks/Anchor_C95N-aL4.mjs';
export { renderers } from '../../renderers.mjs';

const _sfc_main$n = {
  components: {
    Tag,
  },
  props: {
    // Icon name from Phosphor Icons (e.g., 'ph-map-pin', 'ph-calendar')
    iconName: {
      type: String,
      required: true,
    },
    // Color variant for the icon (e.g., 'peach', 'blue', 'green')
    iconColorVariant: {
      type: String,
      validator: (value) =>
          ['peach', 'blue', 'green', 'red', 'gray', 'purple', 'yellow'].includes(value),
    },
    // The main name/title for the card (e.g., 'Destination', 'Budget')
    cardName: {
      type: String,
      required: true,
    },
    // The label for the AppTag component (e.g., 'Trip Basics')
    tagName: {
      type: String,
      required: true,
    },
    // The variant for the AppTag component (e.g., 'peach', 'blue')
    tagVariant: {
      type: String,
      default: 'peach',
    },
  },
  computed: {
    baseClasses() {
      return "flex flex-col justify-between items-start " +
          "bg-white rounded-4xl shadow-secondary-md border-secondary-xs " +
          "min-h-40 min-w-40 overflow-hidden p-4 cursor-pointer " +
          "transition-all duration-200 hover:shadow-lg hover:border-peach-400"
    },

    // Dynamically determines the Tailwind class for the icon color
    iconColorClass() {
      switch (this.iconColorVariant) {
        case 'peach':
          return 'text-peach-500';
        case 'blue':
          return 'text-blue-500';
        case 'green':
          return 'text-green-500';
        case 'red':
          return 'text-red-500';
        case 'gray':
          return 'text-gray-500';
        case 'purple':
          return 'text-purple-500';
        case 'yellow':
          return 'text-yellow-500';
        default:
          return 'text-zinc-900';
      }
    },
  },
  methods: {
    // Emits a custom 'card-click' event when the card is clicked
    handleClick() {
      this.$emit('card-click', this.cardName); // Emit the card's name for identification
    },
  },
};

function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Tag = resolveComponent("Tag");

  _push(`<div${
    ssrRenderAttrs(mergeProps({
      class: [
          $options.baseClasses
      ]
    }, _attrs))
  } data-v-f3de752e><div class="flex-shrink-0" data-v-f3de752e><i class="${
    ssrRenderClass(['ph', $props.iconName, 'text-5xl', $options.iconColorClass])
  }" data-v-f3de752e></i></div><div class="flex flex-col items-start mt-auto" data-v-f3de752e>`);
  _push(ssrRenderComponent(_component_Tag, {
    label: $props.tagName,
    variant: $props.tagVariant,
    class: "mb-1"
  }, null, _parent));
  _push(`<span class="text-base font-semibold text-zinc-800" data-v-f3de752e>${ssrInterpolate($props.cardName)}</span></div></div>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/AdvSquareCard.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : undefined
};
const AdvSquareCard = /*#__PURE__*/_export_sfc(_sfc_main$n, [['ssrRender',_sfc_ssrRender$n],['__scopeId',"data-v-f3de752e"]]);

const _sfc_main$m = {
  name: 'TripDetailsHeader',
  components: {
    Card,
    Tag,
  },
  props: {
    tripConfig: {
      type: Object,
      required: true,
    },
    planningProgress: {
      type: Object,
      required: true,
    },
    onlineCompanions: {
      type: Array,
      default: [],
    }
  },
  emits: ['show-settings', 'showMap', 'copyToClipboard'],
  computed: {
    fadeIn() {
      return this.tripConfig.name ? true : false
    },

    cardClass() {
      switch (this.tripConfig.theme) {
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
    headerClass() {
      switch (this.tripConfig.theme) {
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
    progressClass() {
      switch (this.tripConfig.theme) {
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
    progressBgClass() {
      switch (this.tripConfig.theme) {
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
    textClass() {
      switch (this.tripConfig.theme) {
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
    }
  },
  methods: {
    formatDateRange(startDate, endDate) {
      if (!startDate || !endDate) return '';

      const start = startDate;
      const end = endDate;

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid date string(s) for range: Start "${startDate}", End "${endDate}"`);
        return '';
      }

      const monthDayOptions = {month: 'short', day: 'numeric'};
      const yearOptions = {year: 'numeric'};

      const startMonthDay = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endDay = new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(end);
      const year = new Intl.DateTimeFormat('en-US', yearOptions).format(end);

      if (startDate === endDate) {
        return `${startMonthDay}, ${year}`;
      }

      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startMonthDay.split(' ')[0]} ${new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(start)} - ${endDay}, ${year}`;
      }

      const startFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(start);
      const endFull = new Intl.DateTimeFormat('en-US', monthDayOptions).format(end);

      if (start.getFullYear() === end.getFullYear()) {
        return `${startFull} - ${endFull}, ${year}`;
      } else {
        const startFullYear = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(start);
        const endFullYear = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(end);
        return `${startFullYear} - ${endFullYear}`;
      }
    },

    copyToClipboard() {
      this.$emit('copyToClipboard');
    }
  },
};

function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Tag = resolveComponent("Tag");

  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ['flex flex-col gap-3 p-4 md:p-6 sm:p-8', $options.headerClass]
  }, _attrs))}><div class="fadeIn flex flex-row items-center justify-between"><div class="flex flex-row gap-2 items-center">`);
  _push(ssrRenderComponent(_component_Tag, {
    label: "View on Map",
    onClick: $event => (_ctx.$emit('showMap', true)),
    variant: "green",
    mode: "button",
    icon: "ph-map-trifold"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Tag, {
    onClick: $options.copyToClipboard,
    label: "Share",
    variant: "peach",
    mode: "button",
    icon: "ph-share-fat"
  }, null, _parent));
  _push(`</div><button class="flex justify-center items-center text-2xl text-zinc-600 cursor-pointer transition hover:text-peach-500 active:text-peach-600 focus:outline-none focus:ring-2 focus:ring-peach-300 rounded-full p-1 -mr-1"><i class="ph ph-gear-six"></i></button></div><div class="fadeIn fadeIn-1"><h2 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight">${
    ssrInterpolate($props.tripConfig.name)
  }</h2></div><div class="fadeIn mt-2 fadeIn-2"><span class="text-zinc-600 font-semibold">Planning Progress:</span><div class="${
    ssrRenderClass([$options.progressBgClass, "w-full rounded-full h-2 mt-1"])
  }"><div class="${
    ssrRenderClass(['h-2 rounded-full transition-all ease', $options.progressClass])
  }" style="${
    ssrRenderStyle({ width: `${($props.planningProgress.completed / $props.planningProgress.total) * 100}%` })
  }"></div></div><span class="text-sm text-zinc-500 mt-1 block">${
    ssrInterpolate($props.planningProgress.completed)
  }/${
    ssrInterpolate($props.planningProgress.total)
  } Sections Complete</span></div><div class="fadeIn fadeIn-3 flex flex-row items-center gap-6 text-zinc-600 font-medium mt-2"><div class="flex gap-2 items-center"><i class="${
    ssrRenderClass(['ph ph-calendar-dots text-xl', $options.textClass])
  }"></i><span>${
    ssrInterpolate($options.formatDateRange($props.tripConfig.date.start, $props.tripConfig.date.end))
  }</span></div><div class="flex gap-2 items-center"><i class="${
    ssrRenderClass(['ph ph-map-pin text-xl', $options.textClass])
  }"></i><span>${
    ssrInterpolate($props.tripConfig.location)
  }</span></div></div><div class="flex flex-row gap-1"><!--[-->`);
  ssrRenderList($props.onlineCompanions, (companion, index) => {
    _push(`<div>`);
    if (companion.photoURL) {
      _push(`<img${
        ssrRenderAttr("src", companion.photoURL)
      } class="${
        ssrRenderClass(`h-8 w-8 rounded-full fadeIn fadeIn-${index}`)
      }"${
        ssrRenderAttr("title", companion.name)
      } alt="">`);
    } else {
      _push(`<div${
        ssrRenderAttr("title", companion.name)
      } class="${
        ssrRenderClass(['flex items-center justify-center ',
                         'text-xl rounded-full ',
                         'bg-none',
                         'bg-zinc-200 aspect-square border-2 border-zinc-300',
                         'overflow-hidden h-8 w-8',
                         `fadeIn fadeIn-${index}`])
      }"><i class="ph ph-user"></i></div>`);
    }
    _push(`</div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/TripDetailsHeader.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : undefined
};
const TripDetailsHeader = /*#__PURE__*/_export_sfc(_sfc_main$m, [['ssrRender',_sfc_ssrRender$m]]);

const _sfc_main$l = {
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

function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvSquareCard = resolveComponent("AdvSquareCard");

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row gap-4 py-4 sm:py-6 px-4 md:px-6 overflow-x-auto custom-scrollbar bg-zinc-50 border-t border-b border-zinc-100" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AdvSquareCard, {
    iconName: "ph-users",
    cardName: "Companions",
    tagName: `${$props.companions.length} Travelers`,
    tagVariant: "purple",
    onCardClick: $event => (_ctx.$emit('show-companions'))
  }, null, _parent));
  _push(ssrRenderComponent(_component_AdvSquareCard, {
    iconName: "ph-wallet",
    cardName: "Budget",
    tagName: `${$options.formatCurrency($props.budget.totalBudget)} Budget`,
    tagVariant: "red",
    onCardClick: $event => (_ctx.$emit('show-budget'))
  }, null, _parent));
  _push(ssrRenderComponent(_component_AdvSquareCard, {
    iconName: "ph-suitcase",
    cardName: "Preparations",
    tagName: `${$props.preparation.preparationsChecklist.length} Tasks`,
    tagVariant: "blue",
    onCardClick: $event => (_ctx.$emit('show-preparation'))
  }, null, _parent));
  _push(ssrRenderComponent(_component_AdvSquareCard, {
    iconName: "ph-bed",
    cardName: "Accommodations",
    tagName: `${$props.accommodation?.numberOfRooms} ${$props.accommodation?.numberOfRooms > 1 ? 'Rooms' : 'Room'}`,
    tagVariant: "orange",
    onCardClick: $event => (_ctx.$emit('show-accommodation'))
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/TripSections.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : undefined
};
const TripSections = /*#__PURE__*/_export_sfc(_sfc_main$l, [['ssrRender',_sfc_ssrRender$l]]);

const _sfc_main$k = {
  name: 'ActivityCard', // Good practice to name your components
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Unnamed Activity' // Sensible default
    },
    iconName: { // Phosphor icon class name, e.g., "ph-pizza"
      type: String,
      required: true,
      default: 'ph-question' // Default icon if none provided
    },
    location: {
      type: String,
      default: '' // Location is optional
    },
    cost: {
      type: [Number, String], // Can be a number or a string like "Included"
      default: 0 // Default to 0 or empty string if no cost
    },
    currency: {
      type: String,
      default: 'PHP'
    },
    costNote: {
      type: String,
      default: '' // e.g., "/ Person Ticket", "(Est.)"
    },
    // Optional: If you want to pass an entire activity object
    // activity: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  computed: {
    // Dynamically generates the full icon class
    iconClass() {
      return `ph ${this.iconName}`;
    },
    // Formats the cost based on type
    formattedCost() {
      if (typeof this.cost === 'number') {
        // Format as currency if it's a number
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: this.currency }).format(this.cost);
      }
      return this.cost; // Return as is if it's a string (e.g., "Included")
    }
  },
  methods: {
    handleClick() {
      // Emit an event when the card is clicked, useful for opening sheets, etc.
      this.$emit('card-click');
    }
  }
};

function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");

  _push(ssrRenderComponent(_component_Card, mergeProps({
    class: "md:!p-6 !p-4 gap-2 grow rounded-2xl border border-zinc-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-peach-400 cursor-pointer",
    onClick: $options.handleClick
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex items-center gap-2 font-semibold text-zinc-800 text-lg" data-v-041b38ea${
          _scopeId
        }><i class="${
          ssrRenderClass([$options.iconClass, 'text-peach-500 text-xl flex-shrink-0'])
        }" data-v-041b38ea${
          _scopeId
        }></i><span data-v-041b38ea${
          _scopeId
        }>${
          ssrInterpolate($props.title)
        }</span></div>`);
        if ($props.location) {
          _push(`<div class="flex items-center gap-1 text-sm text-zinc-500 mt-1" data-v-041b38ea${
            _scopeId
          }><i class="ph ph-map-pin text-peach-400 flex-shrink-0" data-v-041b38ea${
            _scopeId
          }></i><span data-v-041b38ea${
            _scopeId
          }>${
            ssrInterpolate($props.location)
          }</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if ($props.cost) {
          _push(`<div class="flex items-center gap-1 text-sm text-zinc-500 mt-1" data-v-041b38ea${
            _scopeId
          }><i class="ph ph-wallet text-peach-400 flex-shrink-0" data-v-041b38ea${
            _scopeId
          }></i><span class="font-semibold text-zinc-600" data-v-041b38ea${
            _scopeId
          }>${
            ssrInterpolate($options.formattedCost)
          }</span>`);
          if ($props.costNote) {
            _push(`<span class="text-zinc-400" data-v-041b38ea${
              _scopeId
            }>${
              ssrInterpolate($props.costNote)
            }</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("div", { class: "flex items-center gap-2 font-semibold text-zinc-800 text-lg" }, [
            createVNode("i", {
              class: [$options.iconClass, 'text-peach-500 text-xl flex-shrink-0']
            }, null, 2),
            createVNode("span", null, toDisplayString($props.title), 1)
          ]),
          ($props.location)
            ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
              }, [
                createVNode("i", { class: "ph ph-map-pin text-peach-400 flex-shrink-0" }),
                createVNode("span", null, toDisplayString($props.location), 1)
              ]))
            : createCommentVNode("", true),
          ($props.cost)
            ? (openBlock(), createBlock("div", {
                key: 1,
                class: "flex items-center gap-1 text-sm text-zinc-500 mt-1"
              }, [
                createVNode("i", { class: "ph ph-wallet text-peach-400 flex-shrink-0" }),
                createVNode("span", { class: "font-semibold text-zinc-600" }, toDisplayString($options.formattedCost), 1),
                ($props.costNote)
                  ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-zinc-400"
                    }, toDisplayString($props.costNote), 1))
                  : createCommentVNode("", true)
              ]))
            : createCommentVNode("", true)
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/timeline/CardActivity.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : undefined
};
const CardActivity = /*#__PURE__*/_export_sfc(_sfc_main$k, [['ssrRender',_sfc_ssrRender$k],['__scopeId',"data-v-041b38ea"]]);

const _sfc_main$j = {
  name: 'TimelineDot',
  props: {
    time: {
      type: String,
      required: true,
      default: 'HH:MM AM/PM' // Default time display
    },
    isLast: {
      type: Boolean,
      default: false // By default, assume there are more items, so show the line
    }
  }
};

function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-start gap-2" }, _attrs))
  } data-v-3fa365eb><span class="font-medium text-zinc-700 whitespace-nowrap" data-v-3fa365eb>${
    ssrInterpolate($props.time)
  }</span><div class="w-3.5 h-3.5 bg-peach-500 rounded-full flex-shrink-0 relative z-[1] border-2 border-peach-300 shadow-sm" data-v-3fa365eb></div>`);
  if (!$props.isLast) {
    _push(`<div class="grow border-l-2 border-peach-200 -mt-1 w-0.5" data-v-3fa365eb></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/timeline/TimelineDot.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : undefined
};
const TimelineDot = /*#__PURE__*/_export_sfc(_sfc_main$j, [['ssrRender',_sfc_ssrRender$j],['__scopeId',"data-v-3fa365eb"]]);

const _sfc_main$i = {
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

      console.log(startDate);

      let currentDate = new Date(this.tripConfig.date.start);

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
        const activityDate = new Date(activity.datetime);
        const activityDay = activity.datetime.split('T')[0];
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
          result.push({type: 'day', label: this.formatIsoDateToDate(activityDate), iso: activity.datetime.split('T')[0]});
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
      });
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
      let date = new Date(value);

      let hours = date.getHours();
      const minutes = date.getMinutes();

      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;

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

function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_Tag = resolveComponent("Tag");
  const _component_TimelineDot = resolveComponent("TimelineDot");
  const _component_CardActivity = resolveComponent("CardActivity");

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-0 p-4 md:p-6 sm:p-8" }, _attrs))}><div class="flex items-center justify-between"><h3 class="font-bold text-3xl sm:text-4xl text-zinc-800 outfit">Day Plan</h3>`);
  _push(ssrRenderComponent(_component_Button, {
    onClick: $event => (_ctx.$emit('show-add-activity'))
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`+ Add Activity`);
      } else {
        return [
          createTextVNode("+ Add Activity")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div>`);
  if ($options.groupedActivities.length <= 0) {
    _push(`<div class="py-8 text-center flex flex-col items-center justify-center"><i class="ph ph-note-pencil text-4xl text-zinc-300 mb-2"></i> <span class="text-zinc-500 font-medium text-lg">No Activities Yet</span><p class="text-zinc-400 text-sm mt-1">Start by adding your first activity.</p></div>`);
  } else {
    _push(`<!--[-->`);
    ssrRenderList($options.groupedActivities, (item, index) => {
      _push(`<div class="${ssrRenderClass([
            'fadeIn',
            `fadeIn-${index}`
        ])}"><div class="flex items-center justify-between"><button class="flex items-center gap-2 text-left p-2 -ml-2 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-peach-500">`);
      if (item.type === 'day') {
        _push(`<span class="font-semibold text-2xl text-zinc-800 my-4">Day ${
          ssrInterpolate($options.days.indexOf(item.iso) + 1)
        } - ${
          ssrInterpolate(item.label)
        }</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (item.type === 'day') {
        _push(ssrRenderComponent(_component_Tag, {
          onClick: $event => (_ctx.$emit('show-day-note')),
          label: "+ Add Note",
          mode: "button"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (item.type === 'tag') {
        _push(`<div class="relative flex items-center justify-center"><div class="absolute w-full border-t border-dashed border-zinc-300"></div><span class="relative z-10 px-4 bg-white text-zinc-500 text-sm font-semibold uppercase">${ssrInterpolate(item.label)}</span></div>`);
      } else if (item.type === 'activity') {
        _push(`<div class="flex flex-row gap-2 md:gap-4">`);
        _push(ssrRenderComponent(_component_TimelineDot, {
          time: $options.formatIsoDateToTime(item.data.datetime),
          isLast: false
        }, null, _parent));
        _push(ssrRenderComponent(_component_CardActivity, {
          onClick: $event => ($options.showViewActivitySheet(item.data)),
          iconName: item.data.iconName,
          title: item.data.title,
          location: item.data.location,
          cost: item.data.cost,
          costNote: item.data.costNote,
          currency: item.data.costCurrency
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    });
    _push(`<!--]-->`);
  }
  _push(`</div><div class="w-full text-center mt-8">`);
  _push(ssrRenderComponent(_component_Button, {
    onClick: $event => (_ctx.$emit('show-add-activity')),
    variant: "secondary",
    class: "border border-zinc-200 hover:border-peach-400 w-full"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<i class="ph ph-plus text-lg mr-1"${_scopeId}></i> Add Activity `);
      } else {
        return [
          createVNode("i", { class: "ph ph-plus text-lg mr-1" }),
          createTextVNode(" Add Activity ")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/ActivityTimeline.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : undefined
};
const ActivityTimeline = /*#__PURE__*/_export_sfc(_sfc_main$i, [['ssrRender',_sfc_ssrRender$i]]);

const _sfc_main$h = {
  name: 'IOSSheet',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: String,
      default: '90vh'
    },
    showHandle: {
      type: Boolean,
      default: true
    },
    paddingOn: {
      type: Boolean,
      default: true,
    },
    // Threshold (in px) for how far down the sheet needs to be dragged to close
    dragThreshold: {
      type: Number,
      default: 100 // Drag down 100px to dismiss
    }
  },
  emits: ['update:modelValue'],

  data() {
    return {
      isDragging: false,
      startY: 0, // Y-coordinate where drag started
      dragOffsetY: 0, // Current Y-offset during drag
      initialSheetY: 0, // Initial Y-position of the sheet when drag starts
    };
  },

  watch: {
    // Reset drag state when sheet closes or opens
    modelValue(newVal) {
      if (!newVal) {
        this.resetDragState();
      }
    }
  },

  methods: {
    closeSheet() {
      if (this.closeOnClickOutside) {
        this.$emit('update:modelValue', {showSheet: false});
      }
    },
    startDrag(event) {
      // Only allow drag if sheet is fully open (not during initial slide-up animation)
      if (!this.modelValue) return;

      this.isDragging = true;
      this.startY = event.touches ? event.touches[0].clientY : event.clientY;

      // Get the current Y position of the sheet content element
      // This ensures smooth drag from its current rendered position
      const sheetRect = this.$refs.sheetContent.getBoundingClientRect();
      this.initialSheetY = sheetRect.y;

      // Add event listeners for moving and ending the drag
      window.addEventListener('touchmove', this.doDrag, { passive: false }); // passive: false for preventDefault
      window.addEventListener('touchend', this.endDrag);
      window.addEventListener('mousemove', this.doDrag);
      window.addEventListener('mouseup', this.endDrag);
    },
    doDrag(event) {
      if (!this.isDragging) return;

      const currentY = event.touches ? event.touches[0].clientY : event.clientY;
      let newOffset = currentY - this.startY;

      // Prevent dragging upwards beyond the initial position
      if (newOffset < 0) {
        newOffset = 0;
      }

      this.dragOffsetY = newOffset;

      // Prevent default to stop scrolling the background
      if (event.cancelable) {
        event.preventDefault();
      }
    },
    endDrag() {
      if (!this.isDragging) return;

      this.isDragging = false;
      window.removeEventListener('touchmove', this.doDrag);
      window.removeEventListener('touchend', this.endDrag);
      window.removeEventListener('mousemove', this.doDrag);
      window.removeEventListener('mouseup', this.endDrag);

      // Check if the sheet has been dragged down enough to dismiss
      if (this.dragOffsetY > this.dragThreshold) {
        this.$emit('update:modelValue', {showSheet: false});
      }

      // Reset the offset for the next time it opens, or if it didn't dismiss
      this.resetDragState();
    },
    resetDragState() {
      this.startY = 0;
      this.dragOffsetY = 0;
      this.initialSheetY = 0;
    }
  }
};

function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.modelValue) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-2 pb-0 sheet-container fixed inset-0 z-[999] flex items-end justify-center" }, _attrs))} data-v-fa8158de>`);
    if ($props.modelValue) {
      _push(`<div class="${
        ssrRenderClass([{'px-2': $props.paddingOn}, "bg-white rounded-t-3xl border-secondary-sm shadow-secondary-md md:min-w-[48rem] min-w-full max-w-lg min-h-[90%] max-h-[90%] flex flex-col"])
      }" style="${
        ssrRenderStyle({
              'max-height': $props.maxHeight,
              transform: `translateY(${$data.dragOffsetY}px)`,
              transition: $data.isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            })
      }" data-v-fa8158de><div class="w-full py-2 flex items-center justify-center flex-shrink-0" data-v-fa8158de>`);
      if ($props.showHandle) {
        _push(`<div class="w-10 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 mb-2 cursor-grab" data-v-fa8158de></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="overflow-y-auto grow h-full flex flex-col" data-v-fa8158de>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Sheet.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : undefined
};
const Sheet = /*#__PURE__*/_export_sfc(_sfc_main$h, [['ssrRender',_sfc_ssrRender$h],['__scopeId',"data-v-fa8158de"]]);

const _sfc_main$g = {
  name: 'TripSettingsSheet',
  components: {
    Destination,
    Dates,
    InputTitle,
    Sheet,
    AdvInput, // Changed component registration to AdvInput
    Button,
  },
  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        trip: {
          name: '',
          date: {},
          location: '',
          theme: 'peach',
        }
      }),
      required: true,
    }
  },

  data() {
    return {
      internalTrip: { ...this.modelValue.trip },
    };
  },
  watch: {
    'modelValue.trip': {
      handler(newTrip) {
        this.internalTrip = { ...newTrip };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closeSheet() {
      this.$emit('update:showSheet', false);
    },
    saveSettings() {
      this.$emit('save', this.internalTrip);
      this.closeSheet();
    },
  }
};

function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_InputTitle = resolveComponent("InputTitle");
  const _component_Destination = resolveComponent("Destination");
  const _component_Dates = resolveComponent("Dates");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.closeSheet
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-4 py-6" data-v-bcaeddd4${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-bcaeddd4${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-bcaeddd4${
          _scopeId
        }><i class="ph ph-gear-six" data-v-bcaeddd4${
          _scopeId
        }></i> <span class="font-bold" data-v-bcaeddd4${
          _scopeId
        }>Trip Settings</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-bcaeddd4${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-bcaeddd4${
          _scopeId
        }></i></button></div><div class="flex flex-col gap-6 w-full overflow-y-auto pr-2" data-v-bcaeddd4${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_AdvInput, {
          label: "Trip Name",
          icon: "ph-paper-plane-tilt"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="p-1" data-v-bcaeddd4${_scopeId}>`);
              _push(ssrRenderComponent(_component_InputTitle, {
                modelValue: $data.internalTrip.name,
                "onUpdate:modelValue": $event => (($data.internalTrip.name) = $event),
                placeholder: "e.g., Island Hopping Palawan",
                id: "name",
                class: "w-full text-2xl font-bold text-zinc-800"
              }, null, _parent, _scopeId));
              _push(`<span class="text-sm text-zinc-500 mt-2 block" data-v-bcaeddd4${_scopeId}> You can add preparations, activities, and routes after creating the trip. </span></div>`);
            } else {
              return [
                createVNode("div", { class: "p-1" }, [
                  createVNode(_component_InputTitle, {
                    modelValue: $data.internalTrip.name,
                    "onUpdate:modelValue": $event => (($data.internalTrip.name) = $event),
                    placeholder: "e.g., Island Hopping Palawan",
                    id: "name",
                    class: "w-full text-2xl font-bold text-zinc-800"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", { class: "text-sm text-zinc-500 mt-2 block" }, " You can add preparations, activities, and routes after creating the trip. ")
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Destination, {
          modelValue: $data.internalTrip.location,
          "onUpdate:modelValue": $event => (($data.internalTrip.location) = $event),
          summary: $data.internalTrip.location
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Dates, {
          modelValue: $data.internalTrip.date,
          "onUpdate:modelValue": $event => (($data.internalTrip.date) = $event)
        }, null, _parent, _scopeId));
        _push(`<div data-v-bcaeddd4${
          _scopeId
        }><label class="ml-6 text-sm font-medium text-zinc-900 mb-2 block" data-v-bcaeddd4${
          _scopeId
        }>Color Theme</label><div class="flex flex-wrap gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200" data-v-bcaeddd4${
          _scopeId
        }><button class="${
          ssrRenderClass([{
                'bg-peach-500 border-peach-600 ring-peach-300': $data.internalTrip.theme === 'peach',
                'bg-peach-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'peach'
              }, "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"])
        }" title="Peach Theme" data-v-bcaeddd4${
          _scopeId
        }></button><button class="${
          ssrRenderClass([{
                'bg-blue-500 border-blue-600 ring-blue-300': $data.internalTrip.theme === 'blue',
                'bg-blue-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'blue'
              }, "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"])
        }" title="Blue Theme" data-v-bcaeddd4${
          _scopeId
        }></button><button class="${
          ssrRenderClass([{
                'bg-emerald-500 border-emerald-600 ring-emerald-300': $data.internalTrip.theme === 'emerald',
                'bg-emerald-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'emerald'
              }, "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"])
        }" title="Emerald Theme" data-v-bcaeddd4${
          _scopeId
        }></button><button class="${
          ssrRenderClass([{
                'bg-amber-500 border-amber-600 ring-amber-300': $data.internalTrip.theme === 'amber',
                'bg-amber-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'amber'
              }, "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150"])
        }" title="Amber Theme" data-v-bcaeddd4${
          _scopeId
        }></button></div></div></div><div class="flex items-start justify-between w-full pt-6 flex-col lg:flex-row gap-5" data-v-bcaeddd4${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "ghost",
          onClick: $event => (_ctx.$emit('delete'))
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Delete`);
            } else {
              return [
                createTextVNode("Delete")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`<div class="flex gap-3 w-full lg:w-fit" data-v-bcaeddd4${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full lg:w-fit",
          variant: "secondary",
          onClick: $options.closeSheet
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full lg:w-fit",
          variant: "primary",
          onClick: $options.saveSettings
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Save Changes`);
            } else {
              return [
                createTextVNode("Save Changes")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-4 py-6" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-gear-six" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Trip Settings")
              ]),
              createVNode("button", {
                onClick: $options.closeSheet,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex flex-col gap-6 w-full overflow-y-auto pr-2" }, [
              createVNode(_component_AdvInput, {
                label: "Trip Name",
                icon: "ph-paper-plane-tilt"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-1" }, [
                    createVNode(_component_InputTitle, {
                      modelValue: $data.internalTrip.name,
                      "onUpdate:modelValue": $event => (($data.internalTrip.name) = $event),
                      placeholder: "e.g., Island Hopping Palawan",
                      id: "name",
                      class: "w-full text-2xl font-bold text-zinc-800"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", { class: "text-sm text-zinc-500 mt-2 block" }, " You can add preparations, activities, and routes after creating the trip. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_Destination, {
                modelValue: $data.internalTrip.location,
                "onUpdate:modelValue": $event => (($data.internalTrip.location) = $event),
                summary: $data.internalTrip.location
              }, null, 8, ["modelValue", "onUpdate:modelValue", "summary"]),
              createVNode(_component_Dates, {
                modelValue: $data.internalTrip.date,
                "onUpdate:modelValue": $event => (($data.internalTrip.date) = $event)
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", null, [
                createVNode("label", { class: "ml-6 text-sm font-medium text-zinc-900 mb-2 block" }, "Color Theme"),
                createVNode("div", { class: "flex flex-wrap gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200" }, [
                  createVNode("button", {
                    class: ["w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150", {
                'bg-peach-500 border-peach-600 ring-peach-300': $data.internalTrip.theme === 'peach',
                'bg-peach-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'peach'
              }],
                    onClick: $event => ($data.internalTrip.theme = 'peach'),
                    title: "Peach Theme"
                  }, null, 10, ["onClick"]),
                  createVNode("button", {
                    class: ["w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150", {
                'bg-blue-500 border-blue-600 ring-blue-300': $data.internalTrip.theme === 'blue',
                'bg-blue-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'blue'
              }],
                    onClick: $event => ($data.internalTrip.theme = 'blue'),
                    title: "Blue Theme"
                  }, null, 10, ["onClick"]),
                  createVNode("button", {
                    class: ["w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150", {
                'bg-emerald-500 border-emerald-600 ring-emerald-300': $data.internalTrip.theme === 'emerald',
                'bg-emerald-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'emerald'
              }],
                    onClick: $event => ($data.internalTrip.theme = 'emerald'),
                    title: "Emerald Theme"
                  }, null, 10, ["onClick"]),
                  createVNode("button", {
                    class: ["w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150", {
                'bg-amber-500 border-amber-600 ring-amber-300': $data.internalTrip.theme === 'amber',
                'bg-amber-300 border-transparent ring-zinc-300': $data.internalTrip.theme !== 'amber'
              }],
                    onClick: $event => ($data.internalTrip.theme = 'amber'),
                    title: "Amber Theme"
                  }, null, 10, ["onClick"])
                ])
              ])
            ]),
            createVNode("div", { class: "flex items-start justify-between w-full pt-6 flex-col lg:flex-row gap-5" }, [
              createVNode(_component_Button, {
                variant: "ghost",
                onClick: $event => (_ctx.$emit('delete'))
              }, {
                default: withCtx(() => [
                  createTextVNode("Delete")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("div", { class: "flex gap-3 w-full lg:w-fit" }, [
                createVNode(_component_Button, {
                  class: "w-full lg:w-fit",
                  variant: "secondary",
                  onClick: $options.closeSheet
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_Button, {
                  class: "w-full lg:w-fit",
                  variant: "primary",
                  onClick: $options.saveSettings
                }, {
                  default: withCtx(() => [
                    createTextVNode("Save Changes")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetTripSettings.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : undefined
};
const SheetTripSettings = /*#__PURE__*/_export_sfc(_sfc_main$g, [['ssrRender',_sfc_ssrRender$g],['__scopeId',"data-v-bcaeddd4"]]);

const _sfc_main$f = {
  name: 'CheckboxInput',
  props: {
    // v-model support
    modelValue: {
      type: Boolean,
      default: false,
    },
    // ID is required for input-label association
    id: {
      type: String,
      required: true,
    },
    // Optional label text beside checkbox
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: ''
    },
    // Whether the checkbox is disabled
    disabled: {
      type: Boolean,
      default: false,
    },
    // Whether the checkbox is required
    required: {
      type: Boolean,
      default: false,
    },
    // Optional custom class for styling the checkbox
    customClass: {
      type: String,
      default: '',
    },
  },
};

function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))
  } data-v-271cb3d9><input${
    ssrRenderAttr("id", $props.id)
  } type="checkbox"${
    (ssrIncludeBooleanAttr($props.modelValue)) ? " checked" : ""
  }${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  }${
    (ssrIncludeBooleanAttr($props.required)) ? " required" : ""
  } class="${
    ssrRenderClass([
        'rounded-md border-secondary-xs text-primary shadow-secondary-sm',
        'focus:ring-0 focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        $props.customClass
      ])
  }" data-v-271cb3d9>`);
  if ($props.label) {
    _push(`<label${
      ssrRenderAttr("for", $props.id)
    } class="${
      ssrRenderClass([$props.labelClass, "text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"])
    }" data-v-271cb3d9>${
      ssrInterpolate($props.label)
    }</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Checkbox.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : undefined
};
const Checkbox = /*#__PURE__*/_export_sfc(_sfc_main$f, [['ssrRender',_sfc_ssrRender$f],['__scopeId',"data-v-271cb3d9"]]);

const _sfc_main$e = {
  name: 'Dropdown',
  props: {
    items: {
      type: Array,
      required: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'ghost'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    handleSelect(item) {
      this.$emit('select', item);
      this.open = false;
    },
  },
  computed: {
    baseClasses() {
      return 'font-medium transition-colors duration-200 cursor-pointer overflow-hidden rounded-full';
    },
    sizeClasses() {
      switch (this.size) {
        case 'sm': return 'text-sm px-3 py-1.5';
        case 'lg': return 'text-lg pl-10 pr-8 py-3';
        default:   return 'text-base pl-8 pr-6 py-3';
      }
    },
    variantClasses() {
      switch (this.variant) {
        case 'primary':
          // Branded peach action
          return 'bg-peach-500 text-white hover:bg-peach-600 shadow-primary-sm border-primary-xs';
        case 'secondary':
          // Neutral modern tone (grayish)
          return 'bg-zinc-700 text-white hover:bg-zinc-600';
        case 'danger':
          // Softer red tone, not too loud
          return 'bg-rose-500 text-white hover:bg-rose-600';
        case 'ghost':
          // Peach outline/ghost style
          return 'text-peach-700 border border-peach-500 bg-transparent hover:bg-peach-50';
        default:
          return '';
      }
    }
  },
};

function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "relative inline-block text-left" }, _attrs))
  } data-v-7c351288><button class="${
    ssrRenderClass([
        $options.baseClasses,
        $options.sizeClasses,
        $options.variantClasses,
        $props.disabled ? 'opacity-50 cursor-not-allowed' : '',
        'group relative w-full flex items-center justify-between',
        $props.customClass
      ])
  }"${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  } data-v-7c351288><span data-v-7c351288>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`Dropdown`);
  }, _push, _parent);
  _push(`</span><svg class="${ssrRenderClass([{ 'rotate-180': $data.open }, "ml-2 h-4 w-4 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-7c351288><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-7c351288></path></svg></button>`);
  if ($data.open) {
    _push(`<div class="absolute mt-2 z-20 w-full shadow-secondary-md border-secondary-xs overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700" data-v-7c351288><ul class="py-1 text-sm text-zinc-700 dark:text-zinc-200" data-v-7c351288><!--[-->`);
    ssrRenderList($props.items, (item, index) => {
      _push(`<li class="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer" data-v-7c351288>${ssrInterpolate(item)}</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Dropdown.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : undefined
};
const Dropdown = /*#__PURE__*/_export_sfc(_sfc_main$e, [['ssrRender',_sfc_ssrRender$e],['__scopeId',"data-v-7c351288"]]);

const _sfc_main$d = {
  name: 'Select', // Renaming this to Combobox or Autocomplete would be more accurate now!
  props: {
    modelValue: {
      type: [String, Number, null], // Allow null for initial empty state
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    label: String,
    placeholder: String,
    options: {
      type: Array,
      required: true, // Format: [{ label: 'Option', value: 'value' }]
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchTerm: '',
      showOptions: false,
      filteredOptions: [],
      highlightedIndex: -1, // For keyboard navigation
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full py-3 text-base rounded-full border-secondary-xs
        text-zinc-800
        bg-white!
        shadow-secondary-sm focus:ring-0 focus:outline-none
      `;
    },
    suffixIcon() {
      return 'caret-down'; // Keeps the dropdown arrow icon
    },
  },
  watch: {
    // When modelValue changes from outside, update searchTerm to reflect the selected option's label
    modelValue: {
      immediate: true, // Run on component mount
      handler(newValue) {
        if (newValue !== null && newValue !== undefined) {
          const selectedOption = this.options.find(
              option => option[this.optionValue] === newValue
          );
          if (selectedOption) {
            this.searchTerm = selectedOption[this.optionValue];
          }
        } else {
          this.searchTerm = ''; // Clear search term if modelValue is null/undefined
        }
      }
    },
    // When options change, refilter them
    options: {
      handler() {
        this.filterOptions();
      },
      immediate: true, // Also run on component mount
    },
    // Watch showOptions to reset highlightedIndex when dropdown closes
    showOptions(newVal) {
      if (!newVal) {
        this.highlightedIndex = -1;
      }
    }
  },
  methods: {
    filterOptions() {
      this.highlightedIndex = -1; // Reset highlight on new input
      if (this.searchTerm.trim() === '') {
        this.filteredOptions = this.options;
      } else {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredOptions = this.options.filter(option =>
            option[this.optionLabel].toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      this.$emit('update:modelValue', this.searchTerm);
    },
    selectOption(option) {
      this.searchTerm = option[this.optionLabel];
      this.$emit('update:modelValue', option[this.optionValue]);
      this.showOptions = false;
    },
    handleBlur() {
      // Delay closing to allow click on option
      setTimeout(() => {
        this.showOptions = false;
        // If the current search term doesn't match an existing option, clear the modelValue
        const matchedOption = this.options.find(
            option => option[this.optionLabel] === this.searchTerm
        );
        if (!matchedOption) {
          this.$emit('update:modelValue', this.searchTerm); // Or '' depending on preferred empty state
        }
      }, 150); // Small delay
    },
    highlightPrevious() {
      if (!this.showOptions) {
        this.showOptions = true;
        this.highlightedIndex = this.filteredOptions.length - 1; // Start from last if closed
      } else if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      } else {
        this.highlightedIndex = this.filteredOptions.length - 1; // Wrap around
      }
      // this.scrollIntoView();
    },
    highlightNext() {
      if (!this.showOptions) {
        this.showOptions = true;
        this.highlightedIndex = 0; // Start from first if closed
      } else if (this.highlightedIndex < this.filteredOptions.length - 1) {
        this.highlightedIndex++;
      } else {
        this.highlightedIndex = 0; // Wrap around
      }
      // this.scrollIntoView();
    },
    selectHighlighted() {
      if (this.highlightedIndex !== -1 && this.filteredOptions[this.highlightedIndex]) {
        this.selectOption(this.filteredOptions[this.highlightedIndex]);
      } else if (this.searchTerm.trim() !== '' && this.filteredOptions.length === 1) {
        // If only one option left and user presses enter, select it
        this.selectOption(this.filteredOptions[0]);
      }
    },
    scrollIntoView() {
      this.$nextTick(() => {
        const highlighted = this.$el.querySelector('.bg-peach-100');
        if (highlighted) {
          highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }
  },
  mounted() {
    this.filterOptions(); // Initial filtering on mount
  }
};

function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))} data-v-c125cf9c>`);
  if ($props.label) {
    _push(`<label${
      ssrRenderAttr("for", $props.id)
    } class="ml-6 text-sm font-medium text-zinc-900" data-v-c125cf9c>${
      ssrInterpolate($props.label)
    }</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="relative" data-v-c125cf9c>`);
  if ($props.prefix) {
    _push(`<div class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10" data-v-c125cf9c>${ssrInterpolate($props.prefix)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.prefixIcon) {
    _push(`<div class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10" data-v-c125cf9c><i class="${ssrRenderClass($props.prefixIcon)}" data-v-c125cf9c></i></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<input${
    ssrRenderAttr("id", $props.id)
  } type="text"${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  }${
    ssrRenderAttr("placeholder", $props.placeholder)
  } autocomplete="off" class="${
    ssrRenderClass([
            $options.baseClasses,
            $props.prefix || $props.prefixIcon ? 'pl-12' : 'pl-6',
            $props.suffix || $options.suffixIcon ? 'pr-12' : 'pr-6',
            $props.disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
            $props.customClass
          ])
  }"${
    ssrRenderAttr("value", $data.searchTerm)
  } data-v-c125cf9c>`);
  if ($data.showOptions && $data.filteredOptions.length > 0) {
    _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto" data-v-c125cf9c><ul role="listbox" data-v-c125cf9c><!--[-->`);
    ssrRenderList($data.filteredOptions, (option, index) => {
      _push(`<li class="${
        ssrRenderClass([
              'px-4 py-2 cursor-pointer hover:bg-peach-100',
              {'bg-peach-100': index === $data.highlightedIndex}
            ])
      }" data-v-c125cf9c>${
        ssrInterpolate(option[$props.optionLabel])
      }</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else if ($data.showOptions && $data.searchTerm && $data.filteredOptions.length === 0) {
    _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 p-4 text-zinc-500 text-center" data-v-c125cf9c> No results found for &quot;${ssrInterpolate($data.searchTerm)}&quot; </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="absolute right-0 top-0 pr-3 flex items-center h-full text-zinc-500 dark:text-zinc-400 pointer-events-none z-10" data-v-c125cf9c>`);
  if ($props.suffix) {
    _push(`<span data-v-c125cf9c>${ssrInterpolate($props.suffix)}</span>`);
  } else {
    _push(`<i class="${ssrRenderClass(`ph ph-${$options.suffixIcon}`)}" data-v-c125cf9c></i>`);
  }
  _push(`</div></div>`);
  if ($props.error) {
    _push(`<p class="text-sm text-red-500" data-v-c125cf9c>${ssrInterpolate($props.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Select.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : undefined
};
const Select = /*#__PURE__*/_export_sfc(_sfc_main$d, [['ssrRender',_sfc_ssrRender$d],['__scopeId',"data-v-c125cf9c"]]);

const _sfc_main$c = {
  components: {
    Sheet,
    Tag,
    Button,
    Checkbox,
    Card,
    Input,
    Dropdown,
    Select,
  },

  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      default: {
        preparationsChecklist: [],
      },
      required: true,
    }
  },

  data() {
    return {
      editMode: false,
      activeTab: 'all',

      newTask: {
        name: '',
        category: '',
        notes: ''
      },

      categoriesOptions: [
        { label: 'Documents', value: 'Documents' },
        { label: 'Packing', value: 'Packing' },
        { label: 'Essentials', value: 'Essentials' },
      ],

      preparationsChecklist: [...this.modelValue.preparationsChecklist],
    }
  },
  computed: {
    filteredChecklist() {
      if (this.activeTab === 'all') {
        return this.modelValue.preparationsChecklist;
      }
      if (this.activeTab === 'Not Completed') {
        return this.modelValue.preparationsChecklist.filter(task=>!task.completed)
      }
      if (this.activeTab === 'Completed') {
        return this.modelValue.preparationsChecklist.filter(task=>task.completed)
      }
      return this.modelValue.preparationsChecklist.filter(item => item.category === this.activeTab);
    },

    categories() {
      return [...new Set(this.modelValue.preparationsChecklist.map(item=>item.category))]
    },
  },
  watch: {
    preparationsChecklist: {
      handler(newInput){
        this.$emit('update:modelValue', { ...this.modelValue, preparationsChecklist: this.preparationsChecklist });
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    b0ss(item) {
      this.newTask.category = item;
    },

    async taskChecked(task, e){
      console.log(task);
      await fetch('/api/v1/trip/task', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskId: task.id, taskData: task})
      });
    },

    toggleEditMode(){
      this.editMode = !this.editMode;
    },

    async deleteTask(item){
      try {
        const index = this.modelValue.preparationsChecklist.indexOf(item);
        this.modelValue.preparationsChecklist.splice(index, 1);

        const response = await fetch(`/api/v1/trip/task?tripId=${item.tripId}&taskId=${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Error deleting task: ${error.message}`)
        }
      } catch (error) {
        console.error(error);
      }
    },

    async addTask() {
      // Ensure task name is not empty
      if (this.newTask.name.trim() === '') return;

      try {
        // -- GET TRIP ID FROM URL
        const pathname = window.location.pathname;
        const tripId = pathname.split('/')[2];

        // -- USE THIS FOR UPDATING THE DATA ON FRONT END
        const newLength = this.modelValue.preparationsChecklist.push({...this.newTask, task: this.newTask.name});
        const indexOfNewTask = newLength - 1;

        // -- CALL THE API FOR ADDING TASK
        const response = await fetch('/api/v1/trip/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({task: this.newTask, tripId: tripId})
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Error creating task: ${error.message}`)
        }

        const { createdTask, taskId } = await response.json();

        this.modelValue.preparationsChecklist[indexOfNewTask] = createdTask;

        // Reset the new task object for the next entry
        this.newTask = {
          name: '',
          category: '', // Reset to default
          notes: ''
        };
      } catch (error) {
        console.error(error);
      }
      // this.$emit('update:modelValue', { ...this.modelValue, preparationsChecklist: this.preparationsChecklist })
    }
  }
};

function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Tag = resolveComponent("Tag");
  const _component_Card = resolveComponent("Card");
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Input = resolveComponent("Input");
  const _component_Select = resolveComponent("Select");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $event => {_ctx.$emit('update:showSheet', false);}
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" data-v-86331946${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-86331946${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-86331946${
          _scopeId
        }><i class="ph ph-suitcase" data-v-86331946${
          _scopeId
        }></i> <span class="font-bold" data-v-86331946${
          _scopeId
        }>Preparations Checklist</span><div class="flex items-center justify-center" data-v-86331946${
          _scopeId
        }></div></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-86331946${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-86331946${
          _scopeId
        }></i></button></div><div class="flex gap-2 mb-6 flex-wrap items-center w-full" data-v-86331946${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Tag, {
          label: "All Tasks",
          mode: "button",
          variant: $data.activeTab === 'all' ? 'peach' : 'gray',
          onClick: $event => ($data.activeTab = 'all')
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Tag, {
          label: "Completed",
          mode: "button",
          variant: $data.activeTab === 'Completed' ? 'peach' : 'gray',
          onClick: $event => ($data.activeTab = 'Completed')
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Tag, {
          label: "Not Completed",
          mode: "button",
          variant: $data.activeTab === 'Not Completed' ? 'peach' : 'gray',
          onClick: $event => ($data.activeTab = 'Not Completed')
        }, null, _parent, _scopeId));
        _push(`<!--[-->`);
        ssrRenderList($options.categories, (category, index) => {
          _push(ssrRenderComponent(_component_Tag, {
            label: category,
            key: index,
            mode: "button",
            variant: $data.activeTab === `${category}` ? 'peach' : 'gray',
            onClick: $event => ($data.activeTab = `${category}`)
          }, null, _parent, _scopeId));
        });
        _push(`<!--]--><div class="ml-auto text-2xl flex place-content-center" data-v-86331946${_scopeId}>`);
        _push(ssrRenderComponent(_component_Tag, {
          onClick: $options.toggleEditMode,
          label: 'Edit ' + `${$data.editMode ? 'On' : 'Off'}`,
          mode: "button",
          variant: 'blue'
        }, null, _parent, _scopeId));
        _push(`</div></div><div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" data-v-86331946${_scopeId}><!--[-->`);
        ssrRenderList($options.filteredChecklist, (item, index) => {
          _push(ssrRenderComponent(_component_Card, {
            key: item.id,
            class: "shadow-secondary-sm border-secondary-xs flex-row!"
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_component_Checkbox, {
                  id: `task-${item.id}`,
                  modelValue: item.completed,
                  "onUpdate:modelValue": $event => ((item.completed) = $event),
                  onChange: $event => ($options.taskChecked(item, $event)),
                  label: item.task,
                  labelClass: "!text-base font-medium"
                }, null, _parent, _scopeId));
                _push(`<div class="ml-auto flex items-center justify-center gap-2" data-v-86331946${_scopeId}>`);
                if (item.notes) {
                  _push(`<span class="text-sm text-zinc-400" data-v-86331946${
                    _scopeId
                  }>${
                    ssrInterpolate(item.notes)
                  }</span>`);
                } else {
                  _push(`<!---->`);
                }
                if ($data.editMode) {
                  _push(`<div class="ml-auto flex" data-v-86331946${
                    _scopeId
                  }><i class="ph ph-trash cursor-pointer" data-v-86331946${
                    _scopeId
                  }></i></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              } else {
                return [
                  createVNode(_component_Checkbox, {
                    id: `task-${item.id}`,
                    modelValue: item.completed,
                    "onUpdate:modelValue": $event => ((item.completed) = $event),
                    onChange: $event => ($options.taskChecked(item, $event)),
                    label: item.task,
                    labelClass: "!text-base font-medium"
                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "onChange", "label"]),
                  createVNode("div", { class: "ml-auto flex items-center justify-center gap-2" }, [
                    (item.notes)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-sm text-zinc-400"
                        }, toDisplayString(item.notes), 1))
                      : createCommentVNode("", true),
                    ($data.editMode)
                      ? (openBlock(), createBlock("div", {
                          key: 1,
                          onClick: $event => ($options.deleteTask(item)),
                          class: "ml-auto flex"
                        }, [
                          createVNode("i", { class: "ph ph-trash cursor-pointer" })
                        ], 8, ["onClick"]))
                      : createCommentVNode("", true)
                  ])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
        if ($options.filteredChecklist.length === 0) {
          _push(`<div class="text-center text-zinc-500 p-8" data-v-86331946${_scopeId}> No tasks in this category. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full flex flex-col gap-2 p-4 rounded-4xl shadow-secondary-sm border-secondary-xs mt-6" data-v-86331946${_scopeId}>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "newTaskNameInput",
          type: "text",
          modelValue: $data.newTask.name,
          "onUpdate:modelValue": $event => (($data.newTask.name) = $event),
          placeholder: "Add a new preparation task...",
          class: "mb-2",
          label: "Task"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Select, {
          id: "bro",
          options: $data.categoriesOptions,
          modelValue: $data.newTask.category,
          "onUpdate:modelValue": $event => (($data.newTask.category) = $event),
          placeholder: "Select or Enter a Category",
          label: "Category"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Input, {
          id: "newTaskNotesInput",
          type: "text",
          modelValue: $data.newTask.notes,
          "onUpdate:modelValue": $event => (($data.newTask.notes) = $event),
          placeholder: "Optional notes for this task...",
          class: "mb-2",
          label: "Notes"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          onClick: $options.addTask,
          class: "w-full mt-2"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Add Task `);
            } else {
              return [
                createTextVNode(" Add Task ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-suitcase" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Preparations Checklist"),
                createVNode("div", { class: "flex items-center justify-center" })
              ]),
              createVNode("button", {
                onClick: $event => {_ctx.$emit('update:showSheet', false);},
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex gap-2 mb-6 flex-wrap items-center w-full" }, [
              createVNode(_component_Tag, {
                label: "All Tasks",
                mode: "button",
                variant: $data.activeTab === 'all' ? 'peach' : 'gray',
                onClick: $event => ($data.activeTab = 'all')
              }, null, 8, ["variant", "onClick"]),
              createVNode(_component_Tag, {
                label: "Completed",
                mode: "button",
                variant: $data.activeTab === 'Completed' ? 'peach' : 'gray',
                onClick: $event => ($data.activeTab = 'Completed')
              }, null, 8, ["variant", "onClick"]),
              createVNode(_component_Tag, {
                label: "Not Completed",
                mode: "button",
                variant: $data.activeTab === 'Not Completed' ? 'peach' : 'gray',
                onClick: $event => ($data.activeTab = 'Not Completed')
              }, null, 8, ["variant", "onClick"]),
              (openBlock(true), createBlock(Fragment, null, renderList($options.categories, (category, index) => {
                return (openBlock(), createBlock(_component_Tag, {
                  label: category,
                  key: index,
                  mode: "button",
                  variant: $data.activeTab === `${category}` ? 'peach' : 'gray',
                  onClick: $event => ($data.activeTab = `${category}`)
                }, null, 8, ["label", "variant", "onClick"]))
              }), 128)),
              createVNode("div", { class: "ml-auto text-2xl flex place-content-center" }, [
                createVNode(_component_Tag, {
                  onClick: $options.toggleEditMode,
                  label: 'Edit ' + `${$data.editMode ? 'On' : 'Off'}`,
                  mode: "button",
                  variant: 'blue'
                }, null, 8, ["onClick", "label"])
              ])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" }, [
              (openBlock(true), createBlock(Fragment, null, renderList($options.filteredChecklist, (item, index) => {
                return (openBlock(), createBlock(_component_Card, {
                  key: item.id,
                  class: "shadow-secondary-sm border-secondary-xs flex-row!"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Checkbox, {
                      id: `task-${item.id}`,
                      modelValue: item.completed,
                      "onUpdate:modelValue": $event => ((item.completed) = $event),
                      onChange: $event => ($options.taskChecked(item, $event)),
                      label: item.task,
                      labelClass: "!text-base font-medium"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "onChange", "label"]),
                    createVNode("div", { class: "ml-auto flex items-center justify-center gap-2" }, [
                      (item.notes)
                        ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-sm text-zinc-400"
                          }, toDisplayString(item.notes), 1))
                        : createCommentVNode("", true),
                      ($data.editMode)
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            onClick: $event => ($options.deleteTask(item)),
                            class: "ml-auto flex"
                          }, [
                            createVNode("i", { class: "ph ph-trash cursor-pointer" })
                          ], 8, ["onClick"]))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1024))
              }), 128)),
              ($options.filteredChecklist.length === 0)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center text-zinc-500 p-8"
                  }, " No tasks in this category. "))
                : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "w-full flex flex-col gap-2 p-4 rounded-4xl shadow-secondary-sm border-secondary-xs mt-6" }, [
              createVNode(_component_Input, {
                id: "newTaskNameInput",
                type: "text",
                modelValue: $data.newTask.name,
                "onUpdate:modelValue": $event => (($data.newTask.name) = $event),
                placeholder: "Add a new preparation task...",
                class: "mb-2",
                label: "Task"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_Select, {
                id: "bro",
                options: $data.categoriesOptions,
                modelValue: $data.newTask.category,
                "onUpdate:modelValue": $event => (($data.newTask.category) = $event),
                placeholder: "Select or Enter a Category",
                label: "Category"
              }, null, 8, ["options", "modelValue", "onUpdate:modelValue"]),
              createVNode(_component_Input, {
                id: "newTaskNotesInput",
                type: "text",
                modelValue: $data.newTask.notes,
                "onUpdate:modelValue": $event => (($data.newTask.notes) = $event),
                placeholder: "Optional notes for this task...",
                class: "mb-2",
                label: "Notes"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_Button, {
                onClick: $options.addTask,
                class: "w-full mt-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Add Task ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetPreparation.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : undefined
};
const SheetPreparation = /*#__PURE__*/_export_sfc(_sfc_main$c, [['ssrRender',_sfc_ssrRender$c],['__scopeId',"data-v-86331946"]]);

const currencyData = [
	{
		label: "AED",
		value: "AED"
	},
	{
		label: "AFN",
		value: "AFN"
	},
	{
		label: "ALL",
		value: "ALL"
	},
	{
		label: "AMD",
		value: "AMD"
	},
	{
		label: "ANG",
		value: "ANG"
	},
	{
		label: "AOA",
		value: "AOA"
	},
	{
		label: "ARS",
		value: "ARS"
	},
	{
		label: "AUD",
		value: "AUD"
	},
	{
		label: "AWG",
		value: "AWG"
	},
	{
		label: "AZN",
		value: "AZN"
	},
	{
		label: "BAM",
		value: "BAM"
	},
	{
		label: "BBD",
		value: "BBD"
	},
	{
		label: "BDT",
		value: "BDT"
	},
	{
		label: "BGN",
		value: "BGN"
	},
	{
		label: "BHD",
		value: "BHD"
	},
	{
		label: "BIF",
		value: "BIF"
	},
	{
		label: "BMD",
		value: "BMD"
	},
	{
		label: "BND",
		value: "BND"
	},
	{
		label: "BOB",
		value: "BOB"
	},
	{
		label: "BOV",
		value: "BOV"
	},
	{
		label: "BRL",
		value: "BRL"
	},
	{
		label: "BSD",
		value: "BSD"
	},
	{
		label: "BTN",
		value: "BTN"
	},
	{
		label: "BWP",
		value: "BWP"
	},
	{
		label: "BYN",
		value: "BYN"
	},
	{
		label: "BZD",
		value: "BZD"
	},
	{
		label: "CAD",
		value: "CAD"
	},
	{
		label: "CDF",
		value: "CDF"
	},
	{
		label: "CHE",
		value: "CHE"
	},
	{
		label: "CHF",
		value: "CHF"
	},
	{
		label: "CHW",
		value: "CHW"
	},
	{
		label: "CLF",
		value: "CLF"
	},
	{
		label: "CLP",
		value: "CLP"
	},
	{
		label: "CNY",
		value: "CNY"
	},
	{
		label: "COP",
		value: "COP"
	},
	{
		label: "COU",
		value: "COU"
	},
	{
		label: "CRC",
		value: "CRC"
	},
	{
		label: "CUC",
		value: "CUC"
	},
	{
		label: "CUP",
		value: "CUP"
	},
	{
		label: "CVE",
		value: "CVE"
	},
	{
		label: "CZK",
		value: "CZK"
	},
	{
		label: "DJF",
		value: "DJF"
	},
	{
		label: "DKK",
		value: "DKK"
	},
	{
		label: "DOP",
		value: "DOP"
	},
	{
		label: "DZD",
		value: "DZD"
	},
	{
		label: "EGP",
		value: "EGP"
	},
	{
		label: "ERN",
		value: "ERN"
	},
	{
		label: "ETB",
		value: "ETB"
	},
	{
		label: "EUR",
		value: "EUR"
	},
	{
		label: "FJD",
		value: "FJD"
	},
	{
		label: "FKP",
		value: "FKP"
	},
	{
		label: "GBP",
		value: "GBP"
	},
	{
		label: "GEL",
		value: "GEL"
	},
	{
		label: "GHS",
		value: "GHS"
	},
	{
		label: "GIP",
		value: "GIP"
	},
	{
		label: "GMD",
		value: "GMD"
	},
	{
		label: "GNF",
		value: "GNF"
	},
	{
		label: "GTQ",
		value: "GTQ"
	},
	{
		label: "GYD",
		value: "GYD"
	},
	{
		label: "HKD",
		value: "HKD"
	},
	{
		label: "HNL",
		value: "HNL"
	},
	{
		label: "HTG",
		value: "HTG"
	},
	{
		label: "HUF",
		value: "HUF"
	},
	{
		label: "IDR",
		value: "IDR"
	},
	{
		label: "ILS",
		value: "ILS"
	},
	{
		label: "INR",
		value: "INR"
	},
	{
		label: "IQD",
		value: "IQD"
	},
	{
		label: "IRR",
		value: "IRR"
	},
	{
		label: "ISK",
		value: "ISK"
	},
	{
		label: "JMD",
		value: "JMD"
	},
	{
		label: "JOD",
		value: "JOD"
	},
	{
		label: "JPY",
		value: "JPY"
	},
	{
		label: "KES",
		value: "KES"
	},
	{
		label: "KGS",
		value: "KGS"
	},
	{
		label: "KHR",
		value: "KHR"
	},
	{
		label: "KMF",
		value: "KMF"
	},
	{
		label: "KPW",
		value: "KPW"
	},
	{
		label: "KRW",
		value: "KRW"
	},
	{
		label: "KWD",
		value: "KWD"
	},
	{
		label: "KYD",
		value: "KYD"
	},
	{
		label: "KZT",
		value: "KZT"
	},
	{
		label: "LAK",
		value: "LAK"
	},
	{
		label: "LBP",
		value: "LBP"
	},
	{
		label: "LKR",
		value: "LKR"
	},
	{
		label: "LRD",
		value: "LRD"
	},
	{
		label: "LSL",
		value: "LSL"
	},
	{
		label: "LYD",
		value: "LYD"
	},
	{
		label: "MAD",
		value: "MAD"
	},
	{
		label: "MDL",
		value: "MDL"
	},
	{
		label: "MGA",
		value: "MGA"
	},
	{
		label: "MKD",
		value: "MKD"
	},
	{
		label: "MMK",
		value: "MMK"
	},
	{
		label: "MNT",
		value: "MNT"
	},
	{
		label: "MOP",
		value: "MOP"
	},
	{
		label: "MRU",
		value: "MRU"
	},
	{
		label: "MUR",
		value: "MUR"
	},
	{
		label: "MVR",
		value: "MVR"
	},
	{
		label: "MWK",
		value: "MWK"
	},
	{
		label: "MXN",
		value: "MXN"
	},
	{
		label: "MYR",
		value: "MYR"
	},
	{
		label: "MZN",
		value: "MZN"
	},
	{
		label: "NAD",
		value: "NAD"
	},
	{
		label: "NGN",
		value: "NGN"
	},
	{
		label: "NIO",
		value: "NIO"
	},
	{
		label: "NOK",
		value: "NOK"
	},
	{
		label: "NPR",
		value: "NPR"
	},
	{
		label: "NZD",
		value: "NZD"
	},
	{
		label: "OMR",
		value: "OMR"
	},
	{
		label: "PAB",
		value: "PAB"
	},
	{
		label: "PEN",
		value: "PEN"
	},
	{
		label: "PGK",
		value: "PGK"
	},
	{
		label: "PHP",
		value: "PHP"
	},
	{
		label: "PKR",
		value: "PKR"
	},
	{
		label: "PLN",
		value: "PLN"
	},
	{
		label: "PYG",
		value: "PYG"
	},
	{
		label: "QAR",
		value: "QAR"
	},
	{
		label: "RON",
		value: "RON"
	},
	{
		label: "RSD",
		value: "RSD"
	},
	{
		label: "RUB",
		value: "RUB"
	},
	{
		label: "RWF",
		value: "RWF"
	},
	{
		label: "SAR",
		value: "SAR"
	},
	{
		label: "SBD",
		value: "SBD"
	},
	{
		label: "SCR",
		value: "SCR"
	},
	{
		label: "SDG",
		value: "SDG"
	},
	{
		label: "SEK",
		value: "SEK"
	},
	{
		label: "SGD",
		value: "SGD"
	},
	{
		label: "SHP",
		value: "SHP"
	},
	{
		label: "SLE",
		value: "SLE"
	},
	{
		label: "SOS",
		value: "SOS"
	},
	{
		label: "SRD",
		value: "SRD"
	},
	{
		label: "SSP",
		value: "SSP"
	},
	{
		label: "STN",
		value: "STN"
	},
	{
		label: "SVC",
		value: "SVC"
	},
	{
		label: "SYP",
		value: "SYP"
	},
	{
		label: "SZL",
		value: "SZL"
	},
	{
		label: "THB",
		value: "THB"
	},
	{
		label: "TJS",
		value: "TJS"
	},
	{
		label: "TMT",
		value: "TMT"
	},
	{
		label: "TND",
		value: "TND"
	},
	{
		label: "TOP",
		value: "TOP"
	},
	{
		label: "TRY",
		value: "TRY"
	},
	{
		label: "TTD",
		value: "TTD"
	},
	{
		label: "TWD",
		value: "TWD"
	},
	{
		label: "TZS",
		value: "TZS"
	},
	{
		label: "UAH",
		value: "UAH"
	},
	{
		label: "UGX",
		value: "UGX"
	},
	{
		label: "USD",
		value: "USD"
	},
	{
		label: "UYU",
		value: "UYU"
	},
	{
		label: "UZS",
		value: "UZS"
	},
	{
		label: "VES",
		value: "VES"
	},
	{
		label: "VND",
		value: "VND"
	},
	{
		label: "VUV",
		value: "VUV"
	},
	{
		label: "WST",
		value: "WST"
	},
	{
		label: "XAF",
		value: "XAF"
	},
	{
		label: "XCD",
		value: "XCD"
	},
	{
		label: "XDR",
		value: "XDR"
	},
	{
		label: "XOF",
		value: "XOF"
	},
	{
		label: "XPF",
		value: "XPF"
	},
	{
		label: "YER",
		value: "YER"
	},
	{
		label: "ZAR",
		value: "ZAR"
	},
	{
		label: "ZMW",
		value: "ZMW"
	},
	{
		label: "ZWG",
		value: "ZWG"
	}
];

const _sfc_main$b = {
  name: 'Select2',
  props: {
    modelValue: {
      type: [String, Number, null], // The currently selected value
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    label: String,
    placeholder: {
      type: String,
      default: 'Select an option',
    },
    options: {
      type: Array,
      required: true, // Format: [{ label: 'Option Display', value: 'option_value' }]
    },
    optionLabel: {
      type: String,
      default: 'label' // Key for the display text of an option
    },
    optionValue: {
      type: String,
      default: 'value' // Key for the actual value of an option
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '', // Not typically used for a pure select, but kept for consistency
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showOptions: false,
    };
  },
  computed: {
    baseClasses() {
      return `
        w-full py-3 text-base rounded-full border-secondary-xs
        text-zinc-800 text-left
        bg-white!
        shadow-secondary-sm focus:ring-0 focus:outline-none
        relative flex items-center
      `;
    },
    suffixIcon() {
      // Rotate caret-down based on showOptions state for visual feedback
      return this.showOptions ? 'caret-up' : 'caret-down';
    },
    displayValue() {
      // Find the selected option based on modelValue and return its label
      const selectedOption = this.options.find(
          option => option[this.optionValue] === this.modelValue
      );
      return selectedOption ? selectedOption[this.optionLabel] : null;
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.$emit('update:modelValue', option[this.optionValue]);
      this.showOptions = false; // Close dropdown after selection
    },
    handleBlur() {
      // Delay closing to allow click on option
      setTimeout(() => {
        this.showOptions = false;
      }, 150);
    },
  },
};

function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))} data-v-d35d8fd5>`);
  if ($props.label) {
    _push(`<label${
      ssrRenderAttr("for", $props.id)
    } class="ml-6 text-sm font-medium text-zinc-900" data-v-d35d8fd5>${
      ssrInterpolate($props.label)
    }</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="relative" data-v-d35d8fd5><button${
    ssrRenderAttr("id", $props.id)
  } type="button"${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  } class="${
    ssrRenderClass([
            $options.baseClasses,
            $props.prefix || $props.prefixIcon ? 'pl-12' : 'pl-6',
            $props.suffix || $options.suffixIcon ? 'pr-12' : 'pr-6',
            $props.disabled ? 'bg-zinc-100 cursor-not-allowed' : '',
            $props.customClass
          ])
  }" data-v-d35d8fd5>`);
  if ($props.prefix) {
    _push(`<div class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10" data-v-d35d8fd5>${ssrInterpolate($props.prefix)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.prefixIcon) {
    _push(`<div class="absolute left-0 pl-6 flex items-center h-full pointer-events-none text-zinc-500 dark:text-zinc-400 z-10" data-v-d35d8fd5><i class="${ssrRenderClass($props.prefixIcon)}" data-v-d35d8fd5></i></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<span class="${
    ssrRenderClass({ 'text-zinc-500': !$options.displayValue })
  }" data-v-d35d8fd5>${
    ssrInterpolate($options.displayValue || $props.placeholder)
  }</span><div class="absolute right-0 top-0 pr-3 flex items-center h-full text-zinc-500 dark:text-zinc-400 pointer-events-none z-10" data-v-d35d8fd5>`);
  if ($props.suffix) {
    _push(`<span data-v-d35d8fd5>${ssrInterpolate($props.suffix)}</span>`);
  } else {
    _push(`<i class="${ssrRenderClass(`ph ph-${$options.suffixIcon}`)}" data-v-d35d8fd5></i>`);
  }
  _push(`</div></button>`);
  if ($data.showOptions && $props.options.length > 0) {
    _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto" data-v-d35d8fd5><ul role="listbox" data-v-d35d8fd5><!--[-->`);
    ssrRenderList($props.options, (option, index) => {
      _push(`<li class="${
        ssrRenderClass([
                'px-4 py-2 cursor-pointer hover:bg-peach-100',
                {'bg-peach-100': option[$props.optionValue] === $props.modelValue} // Highlight selected
              ])
      }" data-v-d35d8fd5>${
        ssrInterpolate(option[$props.optionLabel])
      }</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else if ($data.showOptions && $props.options.length === 0 && !$props.disabled) {
    _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 p-4 text-zinc-500 text-center" data-v-d35d8fd5> No options available </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($props.error) {
    _push(`<p class="text-sm text-red-500" data-v-d35d8fd5>${ssrInterpolate($props.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/SelectSimple.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : undefined
};
const Select2 = /*#__PURE__*/_export_sfc(_sfc_main$b, [['ssrRender',_sfc_ssrRender$b],['__scopeId',"data-v-d35d8fd5"]]);

const _sfc_main$a = {
  components: {
    Select2,
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

    dateRange: {
      type: Object,
      required: true,
    },

    // modelValue now expects an object: { showSheet: boolean, activity: object | null }
    // If activity is an object, it's edit mode. If null, it's add mode.
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true,
    }
  },

  data() {
    return {
      b0ss: null,
      error: '',
      suggestions: [],
      searchTimeout: null,
      // localActivity will be either a new empty object or a copy of the activity being edited
      currencies: currencyData,
      localActivity: this.getInitialActivityState(),
      activityIcons: [
        'ph-bus', 'ph-coffee', 'ph-tree', 'ph-bowl-food', 'ph-palette', 'ph-bed',
        'ph-pizza', 'ph-airplane', 'ph-car', 'ph-train', 'ph-bicycle', 'ph-camera',
        'ph-map-pin', 'ph-shopping-bag', 'ph-storefront', 'ph-swimming-pool',
        'ph-mountains', 'ph-tent', 'ph-binoculars', 'ph-campfire', 'ph-first-aid',
        'ph-currency-circle-dollar', 'ph-calendar', 'ph-sparkle', 'ph-sun', 'ph-moon',
        'ph-globe-hemisphere-east', 'ph-gift', 'ph-ticket', 'ph-book-open',
        'ph-microphone-stage', 'ph-park', 'ph-compass', 'ph-cloud-sun',
        'ph-cloud-rain', 'ph-wifi-high', 'ph-device-mobile', 'ph-user-list',
        'ph-cookie', 'ph-question',
      ]
    };
  },

  computed: {
    // Determines if the component is in "edit" mode
    isEditing() {
      // An activity exists and has an ID (meaning it's not a fresh, unsaved activity)
      return this.modelValue.activity && this.modelValue.activity.id;
    },
    activityDateTimeSummary() {
      const parts = [];
      if (this.localActivity.time) {
        parts.push(`at ${this.localActivity.time}`);
      }
      if (this.localActivity.date) {
        parts.push(`on ${this.localActivity.date}`);
      }
      return parts.length > 0 ? parts.join(' ') : 'Set time & date';
    },
    activityBudgetSummary() {
      if (this.localActivity.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localActivity.costCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        let summary = formatter.format(this.localActivity.cost);
        if (this.localActivity.costNote) {
          summary += ` (${this.localActivity.costNote})`;
        }
        return summary;
      }
      return 'Enter estimated cost';
    },
    localActivityFormat() {
      return {...this.localActivity, datetime:`${this.localActivity.date}T${this.localActivity.time}:00`}
    },
    days() {
      const dates = [];
      new Date(this.dateRange.start);
      const endDate = new Date(this.dateRange.end);
      const locale = this.getLocale();

      let currentDate = new Date(this.dateRange.start);
      let dayCounter = 1;

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`;
        const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
        const isoDate = `${year}-${month}-${day}`;
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push({ value: isoDate, label: `Day ${dayCounter} (${formattedDate})` });

        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
      }
      console.log(dates);
      return dates;
    },
    selectedIconSummary() {
      // Replaces 'ph-' prefix for cleaner summary
      const iconText = this.localActivity.iconName ? this.localActivity.iconName.replace('ph-', '').replace('-', ' ') : 'Choose an icon';
      // Capitalize first letter of each word
      return iconText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  },

  watch: {
    // Watch modelValue.showSheet to reset form or load data when sheet opens/closes
    'modelValue.showSheet': {
      immediate: true, // Run immediately on component mount
      handler(newVal) {
        if (newVal) {
          // If a specific activity object is passed, create a DEEP copy to avoid direct mutation
          if (this.modelValue.activity) {
            this.localActivity = JSON.parse(JSON.stringify(this.modelValue.activity));
          } else {
            // Otherwise, reset to initial state for a new activity
            this.localActivity = this.getInitialActivityState();
          }
        }
      }
    },

    'localActivity.title': {
      immediate: true,
      handler(newVal) {
        this.localActivity.name = newVal;
      }
    }
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    getInitialActivityState() {
      // Returns a fresh, empty activity object for adding a new one
      return {
        name: '',
        time: '',
        date: '',
        location: '',
        cost: 0,
        costCurrency: 'PHP',
        costNote: '',
        description: '',
        iconName: '', // Selected icon class, e.g., 'ph-bus'
      };
    },
    selectIcon(iconClass) {
      this.localActivity.iconName = iconClass;
    },
    handleSheetClose() {
      // Emits the update to close the sheet. Also resets localActivity on close.
      this.$emit('update:showSheet', false);
      this.localActivity = this.getInitialActivityState(); // Reset form on close
    },
    cancelActivity() {
      this.handleSheetClose(); // Simply close and reset
    },
    saveActivity() {
      if (!this.localActivity.title.trim()) {
        this.error = 'Activity name is required!'; // Basic validation
        return;
      }
      if (!this.localActivity.time || !this.localActivity.date) {
        this.error = 'Please select date and time';
        return;
      }
      // Emit the *modified* localActivity object
      this.$emit('activity-saved', this.localActivityFormat);
      this.handleSheetClose(); // Close the sheet after saving
    },

    async searchLocations(e) {
      const query = e.target.value.trim();
      clearTimeout(this.searchTimeout);

      if (!query) {
        this.suggestions = [];
        return;
      }

      // debounce requests to avoid API spam
      this.searchTimeout = setTimeout(async () => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
        try {
          const res = await fetch(url, {
            headers: { 'User-Agent': 'YourAppName/1.0' }, // Nominatim requires this
          });
          const data = await res.json();
          this.suggestions = data;
        } catch (err) {
          console.error('Failed to fetch location suggestions', err);
        }
      }, 300);
    },

    selectSuggestion(item) {
      this.localActivity.location = item.display_name;
      this.localActivity.coordinates = {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      };
      this.suggestions = [];
    },
  }
};

function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Input = resolveComponent("Input");
  const _component_Select2 = resolveComponent("Select2");
  const _component_Select = resolveComponent("Select");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.handleSheetClose
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-2acfb85f${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-2acfb85f${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-2acfb85f${
          _scopeId
        }><i class="${
          ssrRenderClass($options.isEditing ? 'ph ph-pencil-simple' : 'ph ph-plus-circle')
        }" data-v-2acfb85f${
          _scopeId
        }></i><span class="font-bold" data-v-2acfb85f${
          _scopeId
        }>${
          ssrInterpolate($options.isEditing ? `Edit Activity: ${$data.localActivity.title || '(Unnamed)'}` : 'Add New Activity')
        }</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-2acfb85f${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-2acfb85f${
          _scopeId
        }></i></button></div><div class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar" data-v-2acfb85f${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityName",
          modelValue: $data.localActivity.title,
          "onUpdate:modelValue": $event => (($data.localActivity.title) = $event),
          placeholder: "e.g., Explore Mines View Park",
          label: "Activity Name (Required)",
          icon: "ph-article"
        }, null, _parent, _scopeId));
        _push(`<div class="flex flex-col gap-4" data-v-2acfb85f${
          _scopeId
        }><label for="addActivityDate" class="ml-6 text-sm font-medium text-zinc-900" data-v-2acfb85f${
          _scopeId
        }> Date &amp; Time </label><div class="grid grid-cols-2 gap-4" data-v-2acfb85f${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Select2, {
          class: "w-full",
          modelValue: $data.localActivity.date,
          "onUpdate:modelValue": $event => (($data.localActivity.date) = $event),
          id: "addActivityDate",
          label: "Date (Required)",
          options: $options.days,
          placeholder: $options.isEditing ? ($data.localActivity.date ? new Intl.DateTimeFormat($options.getLocale(), { month: 'short', day: 'numeric' }).format(new Date($data.localActivity.date + 'T00:00:000')) : 'Select Date') : 'Select Date',
          icon: "ph-calendar"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityTime",
          modelValue: $data.localActivity.time,
          "onUpdate:modelValue": $event => (($data.localActivity.time) = $event),
          type: "time",
          label: "Time (Required)",
          icon: "ph-clock"
        }, null, _parent, _scopeId));
        _push(`</div></div><div class="relative" data-v-2acfb85f${_scopeId}>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityLocation",
          modelValue: $data.localActivity.location,
          "onUpdate:modelValue": $event => (($data.localActivity.location) = $event),
          placeholder: "e.g., Mines View Park, Baguio City",
          label: "Location",
          icon: "ph-map-pin",
          onInput: $options.searchLocations
        }, null, _parent, _scopeId));
        if ($data.suggestions.length > 0) {
          _push(`<ul class="absolute z-30 bg-white border border-zinc-200 rounded-md shadow-md w-full mt-1 max-h-48 overflow-y-auto" data-v-2acfb85f${_scopeId}><!--[-->`);
          ssrRenderList($data.suggestions, (item, idx) => {
            _push(`<li class="px-3 py-2 hover:bg-zinc-100 cursor-pointer text-sm" data-v-2acfb85f${
              _scopeId
            }>${
              ssrInterpolate(item.display_name)
            }</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col gap-4" data-v-2acfb85f${
          _scopeId
        }><label for="addActivityBudget" class="ml-6 text-sm font-medium text-zinc-900" data-v-2acfb85f${
          _scopeId
        }> Budget </label><div class="grid grid-cols-2 gap-4" data-v-2acfb85f${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityBudget",
          modelValue: $data.localActivity.cost,
          "onUpdate:modelValue": $event => (($data.localActivity.cost) = $event),
          modelModifiers: { number: true },
          type: "number",
          placeholder: "e.g., 150.00",
          label: "Amount",
          prefix: "₱",
          min: "0",
          step: 0.01,
          icon: "ph-currency-circle-dollar"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Select, {
          modelValue: $data.localActivity.costCurrency,
          "onUpdate:modelValue": $event => (($data.localActivity.costCurrency) = $event),
          id: "activity-budget-currency",
          label: "Currency",
          options: $data.currencies,
          icon: "ph-wallet"
        }, null, _parent, _scopeId));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityCostNote",
          modelValue: $data.localActivity.costNote,
          "onUpdate:modelValue": $event => (($data.localActivity.costNote) = $event),
          placeholder: "e.g., per person, entrance fee",
          label: "Budget Notes",
          icon: "ph-note"
        }, null, _parent, _scopeId));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "addActivityDescription",
          modelValue: $data.localActivity.description,
          "onUpdate:modelValue": $event => (($data.localActivity.description) = $event),
          type: "textarea",
          rows: "3",
          placeholder: "Add more details about this activity...",
          label: "Description",
          icon: "ph-notepad"
        }, null, _parent, _scopeId));
        _push(`<div class="flex flex-col gap-4" data-v-2acfb85f${
          _scopeId
        }><label class="ml-6 text-sm font-medium text-zinc-900" data-v-2acfb85f${
          _scopeId
        }> Activity Type Icon </label><div class="flex flex-wrap justify-center gap-3 p-1" data-v-2acfb85f${
          _scopeId
        }><!--[-->`);
        ssrRenderList($data.activityIcons, (iconClass) => {
          _push(`<button class="${
            ssrRenderClass([
                  'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                  $data.localActivity.iconName === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                ])
          }" data-v-2acfb85f${
            _scopeId
          }><i class="${
            ssrRenderClass([iconClass, "ph"])
          }" data-v-2acfb85f${
            _scopeId
          }></i></button>`);
        });
        _push(`<!--]--></div></div></div><div class="py-2" data-v-2acfb85f${
          _scopeId
        }><span class="text-rose-500" data-v-2acfb85f${
          _scopeId
        }>${
          ssrInterpolate($data.error)
        }</span></div><div class="flex flex-col sm:flex-row gap-4 pt-6 grow w-full" data-v-2acfb85f${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.cancelActivity,
          variant: "secondary"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveActivity,
          disabled: !$data.localActivity.title && !$data.localActivity.date && !$data.localActivity.time
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`${ssrInterpolate($options.isEditing ? 'Save Changes' : 'Add Activity')}`);
            } else {
              return [
                createTextVNode(toDisplayString($options.isEditing ? 'Save Changes' : 'Add Activity'), 1)
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", {
                  class: $options.isEditing ? 'ph ph-pencil-simple' : 'ph ph-plus-circle'
                }, null, 2),
                createVNode("span", { class: "font-bold" }, toDisplayString($options.isEditing ? `Edit Activity: ${$data.localActivity.title || '(Unnamed)'}` : 'Add New Activity'), 1)
              ]),
              createVNode("button", {
                onClick: $options.handleSheetClose,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar" }, [
              createVNode(_component_Input, {
                id: "addActivityName",
                modelValue: $data.localActivity.title,
                "onUpdate:modelValue": $event => (($data.localActivity.title) = $event),
                placeholder: "e.g., Explore Mines View Park",
                label: "Activity Name (Required)",
                icon: "ph-article"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", {
                  for: "addActivityDate",
                  class: "ml-6 text-sm font-medium text-zinc-900"
                }, " Date & Time "),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode(_component_Select2, {
                    class: "w-full",
                    modelValue: $data.localActivity.date,
                    "onUpdate:modelValue": $event => (($data.localActivity.date) = $event),
                    id: "addActivityDate",
                    label: "Date (Required)",
                    options: $options.days,
                    placeholder: $options.isEditing ? ($data.localActivity.date ? new Intl.DateTimeFormat($options.getLocale(), { month: 'short', day: 'numeric' }).format(new Date($data.localActivity.date + 'T00:00:000')) : 'Select Date') : 'Select Date',
                    icon: "ph-calendar"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"]),
                  createVNode(_component_Input, {
                    id: "addActivityTime",
                    modelValue: $data.localActivity.time,
                    "onUpdate:modelValue": $event => (($data.localActivity.time) = $event),
                    type: "time",
                    label: "Time (Required)",
                    icon: "ph-clock"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "relative" }, [
                createVNode(_component_Input, {
                  id: "addActivityLocation",
                  modelValue: $data.localActivity.location,
                  "onUpdate:modelValue": $event => (($data.localActivity.location) = $event),
                  placeholder: "e.g., Mines View Park, Baguio City",
                  label: "Location",
                  icon: "ph-map-pin",
                  onInput: $options.searchLocations
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"]),
                ($data.suggestions.length > 0)
                  ? (openBlock(), createBlock("ul", {
                      key: 0,
                      class: "absolute z-30 bg-white border border-zinc-200 rounded-md shadow-md w-full mt-1 max-h-48 overflow-y-auto"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.suggestions, (item, idx) => {
                        return (openBlock(), createBlock("li", {
                          key: idx,
                          onClick: $event => ($options.selectSuggestion(item)),
                          class: "px-3 py-2 hover:bg-zinc-100 cursor-pointer text-sm"
                        }, toDisplayString(item.display_name), 9, ["onClick"]))
                      }), 128))
                    ]))
                  : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", {
                  for: "addActivityBudget",
                  class: "ml-6 text-sm font-medium text-zinc-900"
                }, " Budget "),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode(_component_Input, {
                    id: "addActivityBudget",
                    modelValue: $data.localActivity.cost,
                    "onUpdate:modelValue": $event => (($data.localActivity.cost) = $event),
                    modelModifiers: { number: true },
                    type: "number",
                    placeholder: "e.g., 150.00",
                    label: "Amount",
                    prefix: "₱",
                    min: "0",
                    step: 0.01,
                    icon: "ph-currency-circle-dollar"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_Select, {
                    modelValue: $data.localActivity.costCurrency,
                    "onUpdate:modelValue": $event => (($data.localActivity.costCurrency) = $event),
                    id: "activity-budget-currency",
                    label: "Currency",
                    options: $data.currencies,
                    icon: "ph-wallet"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode(_component_Input, {
                  id: "addActivityCostNote",
                  modelValue: $data.localActivity.costNote,
                  "onUpdate:modelValue": $event => (($data.localActivity.costNote) = $event),
                  placeholder: "e.g., per person, entrance fee",
                  label: "Budget Notes",
                  icon: "ph-note"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_Input, {
                id: "addActivityDescription",
                modelValue: $data.localActivity.description,
                "onUpdate:modelValue": $event => (($data.localActivity.description) = $event),
                type: "textarea",
                rows: "3",
                placeholder: "Add more details about this activity...",
                label: "Description",
                icon: "ph-notepad"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", { class: "ml-6 text-sm font-medium text-zinc-900" }, " Activity Type Icon "),
                createVNode("div", { class: "flex flex-wrap justify-center gap-3 p-1" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList($data.activityIcons, (iconClass) => {
                    return (openBlock(), createBlock("button", {
                      key: iconClass,
                      onClick: $event => ($options.selectIcon(iconClass)),
                      class: [
                  'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                  $data.localActivity.iconName === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                ]
                    }, [
                      createVNode("i", {
                        class: ["ph", iconClass]
                      }, null, 2)
                    ], 10, ["onClick"]))
                  }), 128))
                ])
              ])
            ]),
            createVNode("div", { class: "py-2" }, [
              createVNode("span", { class: "text-rose-500" }, toDisplayString($data.error), 1)
            ]),
            createVNode("div", { class: "flex flex-col sm:flex-row gap-4 pt-6 grow w-full" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.cancelActivity,
                variant: "secondary"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.saveActivity,
                disabled: !$data.localActivity.title && !$data.localActivity.date && !$data.localActivity.time
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($options.isEditing ? 'Save Changes' : 'Add Activity'), 1)
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetAddActivity.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : undefined
};
const SheetAddActivity = /*#__PURE__*/_export_sfc(_sfc_main$a, [['ssrRender',_sfc_ssrRender$a],['__scopeId',"data-v-2acfb85f"]]);

const _sfc_main$9 = {
  components: {
    Select2,
    Sheet,
    Button,
    Input,
    Select,
  },

  props: {
    showSheet: {
      type: Boolean,
      default: false,
    },
    dateRange: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, activity: null }),
      required: true, // Should always be required as it defines the sheet's state
    }
  },

  data() {
    return {
      localActivity: this.getInitialActivityState(),
      currencies: currencyData.map(c => ({
        label: `${c.label} (${c.value})`, // e.g., "Philippine Peso (PHP)"
        value: c.value
      })),
      activityIcons: [
        'ph-bus', 'ph-coffee', 'ph-tree', 'ph-bowl-food', 'ph-palette', 'ph-bed',
        'ph-pizza', 'ph-airplane', 'ph-car', 'ph-train', 'ph-bicycle', 'ph-camera',
        'ph-map-pin', 'ph-shopping-bag', 'ph-storefront', 'ph-swimming-pool',
        'ph-mountains', 'ph-tent', 'ph-binoculars', 'ph-campfire', 'ph-first-aid',
        'ph-currency-circle-dollar', 'ph-calendar', 'ph-sparkle', 'ph-sun', 'ph-moon',
        'ph-globe-hemisphere-east', 'ph-gift', 'ph-ticket', 'ph-book-open',
        'ph-microphone-stage', 'ph-park', 'ph-compass', 'ph-cloud-sun',
        'ph-cloud-rain', 'ph-wifi-high', 'ph-device-mobile', 'ph-user-list',
        'ph-cookie', 'ph-question',
      ],
      // Centralized object for all validation errors
      validationErrors: {
        title: '',
        date: '',
        time: '',
        dateTimeCombo: '', // For errors related to date/time combination
        location: '',
        cost: '',
        costCurrency: '',
        costNote: '',
        description: '',
        iconName: '',
      },
    };
  },

  computed: {
    localActivityFormat() {
      return {...this.localActivity, datetime:`${this.localActivity.date}T${this.localActivity.time}:00`}
    },
    isEditing() {
      // Check if activity exists and has an ID (meaning it's an existing activity)
      return this.modelValue.activity && this.modelValue.activity.id;
    },
    days() {
      const dates = [];
      // Use dateRange from props for trip start/end
      const startDate = new Date(this.dateRange.start);
      const endDate = new Date(this.dateRange.end);
      const locale = this.getLocale();

      let currentDate = new Date(startDate);
      let dayCounter = 1;

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`;
        const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
        const isoDate = `${year}-${month}-${day}`;
        const formattedDate = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(currentDate);

        dates.push({ value: isoDate, label: `Day ${dayCounter} (${formattedDate})` });

        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        dayCounter++;
      }
      return dates;
    },
    // This computed prop simplifies the Button's disabled state
    isFormValid() {
      // Basic check: title, date and time are required
      if (!this.localActivity.title.trim() && !this.localActivity.date && !this.localActivity.time) {
        return false;
      }
      // You can add more complex checks here if needed before attempting to save
      // E.g., if you want to disable the button until all errors are cleared
      const hasErrors = Object.values(this.validationErrors).some(err => err !== '');
      return !hasErrors;
    },
    // The following summary computed properties are now less critical since AdvInput is removed.
    // They are kept here as a reference but can be removed if not used elsewhere.
    activityDateTimeSummary() {
      const parts = [];
      if (this.localActivity.time) {
        parts.push(`at ${this.localActivity.time}`);
      }
      if (this.localActivity.date) {
        parts.push(`on ${this.localActivity.date}`);
      }
      return parts.length > 0 ? parts.join(' ') : 'Set time & date';
    },
    activityBudgetSummary() {
      if (this.localActivity.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: this.localActivity.costCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        let summary = formatter.format(this.localActivity.cost);
        if (this.localActivity.costNote) {
          summary += ` (${this.localActivity.costNote})`;
        }
        return summary;
      }
      return 'Enter estimated cost';
    },
    selectedIconSummary() {
      const iconText = this.localActivity.iconName ? this.localActivity.iconName.replace('ph-', '').replace(/-/g, ' ') : 'Choose an icon';
      return iconText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  },

  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.localActivity = newVal.activity;
      }
    },
    // You might want to watch individual fields to clear their specific error messages
    // as the user types/selects, e.g.:
    'localActivity.title'(newVal) {
      if (newVal.trim() !== '') {
        this.validationErrors.title = '';
      }
    },
    'localActivity.date'(newVal) {
      if (newVal) {
        this.validationErrors.date = '';
        this.validationErrors.dateTimeCombo = ''; // Clear combo error if date selected
      }
    },
    'localActivity.time'(newVal) {
      if (newVal) {
        this.validationErrors.time = '';
        this.validationErrors.dateTimeCombo = ''; // Clear combo error if time selected
      }
    },
  },

  methods: {
    getLocale() {
      return navigator.language || 'en-US';
    },
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialActivityState() {
      return {
        id: this.generateUniqueId(),
        title: '', // Changed from 'name' to 'title' for consistency
        time: '',
        date: '',
        location: '',
        cost: 0,
        costCurrency: 'PHP', // Default currency for Olongapo
        costNote: '',
        description: '',
        iconName: '', // Selected icon class, e.g., 'ph-bus'
      };
    },
    selectIcon(iconClass) {
      this.localActivity.iconName = iconClass;
    },
    // Resets all validation errors
    clearValidationErrors() {
      for (const key in this.validationErrors) {
        this.validationErrors[key] = '';
      }
    },
    handleSheetClose() {
      this.$emit('update:showSheet', false);
      this.localActivity = this.getInitialActivityState(); // Reset form state
      this.clearValidationErrors(); // Clear errors
    },
    cancelActivity() {
      this.handleSheetClose(); // Simply close and reset
    },
    saveActivity() {
      this.clearValidationErrors(); // Clear all errors at the start of validation

      let isValid = true; // Flag to track overall form validity

      // Validate Activity Name
      if (!this.localActivity.title.trim()) {
        this.validationErrors.title = 'Activity name is required.';
        isValid = false;
      }

      // Validate Date & Time relationship and range
      if (this.localActivity.time && !this.localActivity.date) {
        this.validationErrors.date = 'Date is required if time is set.';
        this.validationErrors.dateTimeCombo = 'A date must be selected if time is entered.'; // More general error
        isValid = false;
      }

      if (this.localActivity.date) {
        const selectedDate = new Date(this.localActivity.date); // Parse as UTC
        const tripStartDate = new Date(this.dateRange.start);
        tripStartDate.setHours(0,0,0,0);

        const tripEndDate = new Date(this.dateRange.end);
        tripEndDate.setHours(23,59,59,59);

        if (selectedDate <= tripStartDate || selectedDate >= tripEndDate) {
          this.validationErrors.date = `Date must be within the trip range ${selectedDate} (${tripStartDate} - ${tripEndDate}).`;
          isValid = false;
        }
      }

      // Add more specific validations for other fields if needed (e.g., cost > 0)
      if (this.localActivity.cost < 0) {
        this.validationErrors.cost = 'Cost cannot be negative.';
        isValid = false;
      }


      // If any validation failed, stop here
      if (!isValid) {
        return;
      }

      // All validations passed, proceed to save
      // The `activity-saved` event will carry the formatted activity data
      this.$emit('activity-saved', this.localActivityFormat);
      this.handleSheetClose(); // Close the sheet after saving
    }
  }
};

function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Input = resolveComponent("Input");
  const _component_Select2 = resolveComponent("Select2");
  const _component_Select = resolveComponent("Select");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.handleSheetClose
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-65455403${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-65455403${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-65455403${
          _scopeId
        }><i class="${
          ssrRenderClass($options.isEditing ? 'ph ph-pencil-simple' : 'ph ph-plus-circle')
        }" data-v-65455403${
          _scopeId
        }></i><span class="font-bold" data-v-65455403${
          _scopeId
        }>${
          ssrInterpolate($options.isEditing ? `Edit Activity: ${$data.localActivity.title || '(Unnamed)'}` : 'Add New Activity')
        }</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-65455403${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-65455403${
          _scopeId
        }></i></button></div><div class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar" data-v-65455403${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "activityTitle",
          modelValue: $data.localActivity.title,
          "onUpdate:modelValue": $event => (($data.localActivity.title) = $event),
          placeholder: "e.g., Explore Mines View Park",
          label: "Activity Name (Required)",
          icon: "ph-article",
          error: $data.validationErrors.title
        }, null, _parent, _scopeId));
        _push(`<div class="flex flex-col gap-4" data-v-65455403${
          _scopeId
        }><label for="activityDate" class="ml-6 text-sm font-medium text-zinc-900" data-v-65455403${
          _scopeId
        }> Date &amp; Time </label><div class="grid grid-cols-2 gap-4" data-v-65455403${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Select2, {
          class: "w-full",
          modelValue: $data.localActivity.date,
          "onUpdate:modelValue": $event => (($data.localActivity.date) = $event),
          id: "activityDate",
          label: "Date (Required)",
          options: $options.days,
          placeholder: $data.localActivity.date ? new Intl.DateTimeFormat($options.getLocale(), { month: 'short', day: 'numeric' }).format(new Date($data.localActivity.date + 'T00:00:00Z')) : 'Select Date',
          icon: "ph-calendar",
          error: $data.validationErrors.date
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Input, {
          id: "activityTime",
          modelValue: $data.localActivity.time,
          "onUpdate:modelValue": $event => (($data.localActivity.time) = $event),
          type: "time",
          label: "Time (Required)",
          icon: "ph-clock",
          error: $data.validationErrors.time
        }, null, _parent, _scopeId));
        _push(`</div>`);
        if ($data.validationErrors.dateTimeCombo) {
          _push(`<p class="text-sm text-red-500 ml-6 -mt-3" data-v-65455403${
            _scopeId
          }>${
            ssrInterpolate($data.validationErrors.dateTimeCombo)
          }</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "activityLocation",
          modelValue: $data.localActivity.location,
          "onUpdate:modelValue": $event => (($data.localActivity.location) = $event),
          placeholder: "e.g., Mines View Park, Baguio City",
          label: "Location",
          icon: "ph-map-pin",
          error: $data.validationErrors.location
        }, null, _parent, _scopeId));
        _push(`<div class="flex flex-col gap-4" data-v-65455403${
          _scopeId
        }><label for="activityCost" class="ml-6 text-sm font-medium text-zinc-900" data-v-65455403${
          _scopeId
        }> Budget </label><div class="grid grid-cols-2 gap-4" data-v-65455403${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "activityCost",
          modelValue: $data.localActivity.cost,
          "onUpdate:modelValue": $event => (($data.localActivity.cost) = $event),
          modelModifiers: { number: true },
          type: "number",
          placeholder: "e.g., 150.00",
          label: "Amount",
          prefix: "₱",
          min: "0",
          step: 0.01,
          icon: "ph-currency-circle-dollar",
          error: $data.validationErrors.cost
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Select, {
          modelValue: $data.localActivity.costCurrency,
          "onUpdate:modelValue": $event => (($data.localActivity.costCurrency) = $event),
          id: "activity-cost-currency",
          label: "Currency",
          options: $data.currencies,
          icon: "ph-wallet",
          error: $data.validationErrors.costCurrency
        }, null, _parent, _scopeId));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "activityCostNote",
          modelValue: $data.localActivity.costNote,
          "onUpdate:modelValue": $event => (($data.localActivity.costNote) = $event),
          placeholder: "e.g., per person, entrance fee",
          label: "Budget Notes",
          icon: "ph-note",
          error: $data.validationErrors.costNote
        }, null, _parent, _scopeId));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "activityDescription",
          modelValue: $data.localActivity.description,
          "onUpdate:modelValue": $event => (($data.localActivity.description) = $event),
          type: "textarea",
          rows: "3",
          placeholder: "Add more details about this activity...",
          label: "Description",
          icon: "ph-notepad",
          error: $data.validationErrors.description
        }, null, _parent, _scopeId));
        _push(`<div class="flex flex-col gap-4" data-v-65455403${
          _scopeId
        }><label class="ml-6 text-sm font-medium text-zinc-900" data-v-65455403${
          _scopeId
        }> Activity Type Icon </label><div class="flex flex-wrap justify-center gap-3 p-1" data-v-65455403${
          _scopeId
        }><!--[-->`);
        ssrRenderList($data.activityIcons, (iconClass) => {
          _push(`<button class="${
            ssrRenderClass([
                  'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                  $data.localActivity.iconName === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                ])
          }" data-v-65455403${
            _scopeId
          }><i class="${
            ssrRenderClass([iconClass, "ph"])
          }" data-v-65455403${
            _scopeId
          }></i></button>`);
        });
        _push(`<!--]--></div></div></div>`);
        if (Object.values($data.validationErrors).some(err => err)) {
          _push(`<div class="py-2" data-v-65455403${
            _scopeId
          }><span class="text-rose-500 text-sm" data-v-65455403${
            _scopeId
          }>Please fix the errors above to save.</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col sm:flex-row gap-4 pt-6 w-full" data-v-65455403${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.cancelActivity,
          variant: "secondary"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveActivity,
          disabled: !$options.isFormValid
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`${ssrInterpolate($options.isEditing ? 'Save Changes' : 'Add Activity')}`);
            } else {
              return [
                createTextVNode(toDisplayString($options.isEditing ? 'Save Changes' : 'Add Activity'), 1)
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", {
                  class: $options.isEditing ? 'ph ph-pencil-simple' : 'ph ph-plus-circle'
                }, null, 2),
                createVNode("span", { class: "font-bold" }, toDisplayString($options.isEditing ? `Edit Activity: ${$data.localActivity.title || '(Unnamed)'}` : 'Add New Activity'), 1)
              ]),
              createVNode("button", {
                onClick: $options.handleSheetClose,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar" }, [
              createVNode(_component_Input, {
                id: "activityTitle",
                modelValue: $data.localActivity.title,
                "onUpdate:modelValue": $event => (($data.localActivity.title) = $event),
                placeholder: "e.g., Explore Mines View Park",
                label: "Activity Name (Required)",
                icon: "ph-article",
                error: $data.validationErrors.title
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", {
                  for: "activityDate",
                  class: "ml-6 text-sm font-medium text-zinc-900"
                }, " Date & Time "),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode(_component_Select2, {
                    class: "w-full",
                    modelValue: $data.localActivity.date,
                    "onUpdate:modelValue": $event => (($data.localActivity.date) = $event),
                    id: "activityDate",
                    label: "Date (Required)",
                    options: $options.days,
                    placeholder: $data.localActivity.date ? new Intl.DateTimeFormat($options.getLocale(), { month: 'short', day: 'numeric' }).format(new Date($data.localActivity.date + 'T00:00:00Z')) : 'Select Date',
                    icon: "ph-calendar",
                    error: $data.validationErrors.date
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "error"]),
                  createVNode(_component_Input, {
                    id: "activityTime",
                    modelValue: $data.localActivity.time,
                    "onUpdate:modelValue": $event => (($data.localActivity.time) = $event),
                    type: "time",
                    label: "Time (Required)",
                    icon: "ph-clock",
                    error: $data.validationErrors.time
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                ]),
                ($data.validationErrors.dateTimeCombo)
                  ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-red-500 ml-6 -mt-3"
                    }, toDisplayString($data.validationErrors.dateTimeCombo), 1))
                  : createCommentVNode("", true)
              ]),
              createVNode(_component_Input, {
                id: "activityLocation",
                modelValue: $data.localActivity.location,
                "onUpdate:modelValue": $event => (($data.localActivity.location) = $event),
                placeholder: "e.g., Mines View Park, Baguio City",
                label: "Location",
                icon: "ph-map-pin",
                error: $data.validationErrors.location
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", {
                  for: "activityCost",
                  class: "ml-6 text-sm font-medium text-zinc-900"
                }, " Budget "),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode(_component_Input, {
                    id: "activityCost",
                    modelValue: $data.localActivity.cost,
                    "onUpdate:modelValue": $event => (($data.localActivity.cost) = $event),
                    modelModifiers: { number: true },
                    type: "number",
                    placeholder: "e.g., 150.00",
                    label: "Amount",
                    prefix: "₱",
                    min: "0",
                    step: 0.01,
                    icon: "ph-currency-circle-dollar",
                    error: $data.validationErrors.cost
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                  createVNode(_component_Select, {
                    modelValue: $data.localActivity.costCurrency,
                    "onUpdate:modelValue": $event => (($data.localActivity.costCurrency) = $event),
                    id: "activity-cost-currency",
                    label: "Currency",
                    options: $data.currencies,
                    icon: "ph-wallet",
                    error: $data.validationErrors.costCurrency
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "error"])
                ]),
                createVNode(_component_Input, {
                  id: "activityCostNote",
                  modelValue: $data.localActivity.costNote,
                  "onUpdate:modelValue": $event => (($data.localActivity.costNote) = $event),
                  placeholder: "e.g., per person, entrance fee",
                  label: "Budget Notes",
                  icon: "ph-note",
                  error: $data.validationErrors.costNote
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_component_Input, {
                id: "activityDescription",
                modelValue: $data.localActivity.description,
                "onUpdate:modelValue": $event => (($data.localActivity.description) = $event),
                type: "textarea",
                rows: "3",
                placeholder: "Add more details about this activity...",
                label: "Description",
                icon: "ph-notepad",
                error: $data.validationErrors.description
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("label", { class: "ml-6 text-sm font-medium text-zinc-900" }, " Activity Type Icon "),
                createVNode("div", { class: "flex flex-wrap justify-center gap-3 p-1" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList($data.activityIcons, (iconClass) => {
                    return (openBlock(), createBlock("button", {
                      key: iconClass,
                      onClick: $event => ($options.selectIcon(iconClass)),
                      class: [
                  'w-10 h-10 rounded-full border-2 transition-all duration-200 aspect-square flex items-center justify-center text-xl',
                  $data.localActivity.iconName === iconClass ? 'border-peach-500 text-peach-600 bg-peach-50' : 'border-zinc-200 text-zinc-500 hover:border-peach-300 hover:text-peach-500',
                ]
                    }, [
                      createVNode("i", {
                        class: ["ph", iconClass]
                      }, null, 2)
                    ], 10, ["onClick"]))
                  }), 128))
                ])
              ])
            ]),
            (Object.values($data.validationErrors).some(err => err))
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "py-2"
                }, [
                  createVNode("span", { class: "text-rose-500 text-sm" }, "Please fix the errors above to save.")
                ]))
              : createCommentVNode("", true),
            createVNode("div", { class: "flex flex-col sm:flex-row gap-4 pt-6 w-full" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.cancelActivity,
                variant: "secondary"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.saveActivity,
                disabled: !$options.isFormValid
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($options.isEditing ? 'Save Changes' : 'Add Activity'), 1)
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetEditActivity.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : undefined
};
const SheetEditActivity = /*#__PURE__*/_export_sfc(_sfc_main$9, [['ssrRender',_sfc_ssrRender$9],['__scopeId',"data-v-65455403"]]);

const _sfc_main$8 = {
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

function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.handleSheetClose
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-8d2b8bea${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6 pb-2 border-b border-zinc-100" data-v-8d2b8bea${
          _scopeId
        }><div class="flex gap-3 items-center text-3xl text-zinc-800 max-w-full" data-v-8d2b8bea${
          _scopeId
        }><i class="${
          ssrRenderClass([$options.activity.iconName || 'ph-question', 'text-peach-500 text-3xl','ph'])
        }" data-v-8d2b8bea${
          _scopeId
        }></i><span class="font-bold" data-v-8d2b8bea${
          _scopeId
        }>${
          ssrInterpolate($options.activity.title || 'Activity Details')
        }</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-8d2b8bea${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-8d2b8bea${
          _scopeId
        }></i></button></div>`);
        if ($options.activity && $options.activity.id) {
          _push(`<div class="flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar" data-v-8d2b8bea${_scopeId}>`);
          if ($options.activity.time || $options.activity.date) {
            _push(`<div class="flex flex-col" data-v-8d2b8bea${
              _scopeId
            }><span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" data-v-8d2b8bea${
              _scopeId
            }>Time &amp; Date</span><div class="flex items-center gap-2 text-zinc-700" data-v-8d2b8bea${
              _scopeId
            }><i class="ph ph-calendar-blank text-peach-500 text-lg" data-v-8d2b8bea${
              _scopeId
            }></i> <span class="text-base" data-v-8d2b8bea${
              _scopeId
            }>${
              ssrInterpolate($options.activityDateTimeDisplay)
            }</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if ($options.activity.location) {
            _push(`<div class="flex flex-col" data-v-8d2b8bea${
              _scopeId
            }><span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" data-v-8d2b8bea${
              _scopeId
            }>Location</span><div class="flex items-center gap-2 text-zinc-700" data-v-8d2b8bea${
              _scopeId
            }><i class="ph ph-map-pin text-peach-500 text-lg" data-v-8d2b8bea${
              _scopeId
            }></i><span class="text-base" data-v-8d2b8bea${
              _scopeId
            }>${
              ssrInterpolate($options.activity.location)
            }</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if ($options.activity.cost > 0 || ($options.activity.costNote && $options.activity.costNote !== '')) {
            _push(`<div class="flex flex-col" data-v-8d2b8bea${
              _scopeId
            }><span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" data-v-8d2b8bea${
              _scopeId
            }>Budget</span><div class="flex items-center gap-2 text-zinc-700" data-v-8d2b8bea${
              _scopeId
            }><i class="ph ph-currency-circle-dollar text-peach-500 text-lg" data-v-8d2b8bea${
              _scopeId
            }></i><span class="text-base font-semibold" data-v-8d2b8bea${
              _scopeId
            }>${
              ssrInterpolate($options.formattedBudget)
            }</span>`);
            if ($options.activity.costNote) {
              _push(`<span class="text-zinc-500 text-sm opacity-80" data-v-8d2b8bea${
                _scopeId
              }>(${
                ssrInterpolate($options.activity.costNote)
              })</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if ($options.activity.description) {
            _push(`<div class="flex flex-col" data-v-8d2b8bea${
              _scopeId
            }><span class="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" data-v-8d2b8bea${
              _scopeId
            }>Description</span><p class="text-zinc-700 text-base leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-100" data-v-8d2b8bea${
              _scopeId
            }>${
              ssrInterpolate($options.activity.description)
            }</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center h-full w-full text-zinc-500 py-12" data-v-8d2b8bea${
            _scopeId
          }><i class="ph ph-info text-5xl mb-4 text-zinc-300" data-v-8d2b8bea${
            _scopeId
          }></i><p class="text-lg text-zinc-600 font-medium" data-v-8d2b8bea${
            _scopeId
          }>No activity selected to view.</p><p class="text-sm text-zinc-400 mt-2" data-v-8d2b8bea${
            _scopeId
          }>Try clicking on an activity card.</p></div>`);
        }
        _push(`<div class="flex flex-col sm:flex-row gap-3 pt-6 w-full border-t border-zinc-100 mt-auto" data-v-8d2b8bea${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.handleEditClick,
          variant: "secondary",
          disabled: !$options.activity || !$options.activity.id
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<i class="ph ph-pencil-simple text-base mr-2" data-v-8d2b8bea${_scopeId}></i> Edit Activity `);
            } else {
              return [
                createVNode("i", { class: "ph ph-pencil-simple text-base mr-2" }),
                createTextVNode(" Edit Activity ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.handleDeleteClick,
          variant: "ghost",
          disabled: !$options.activity || !$options.activity.id
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<i class="ph ph-trash text-base mr-2" data-v-8d2b8bea${_scopeId}></i> Delete Activity `);
            } else {
              return [
                createVNode("i", { class: "ph ph-trash text-base mr-2" }),
                createTextVNode(" Delete Activity ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6 pb-2 border-b border-zinc-100" }, [
              createVNode("div", { class: "flex gap-3 items-center text-3xl text-zinc-800 max-w-full" }, [
                createVNode("i", {
                  class: [$options.activity.iconName || 'ph-question', 'text-peach-500 text-3xl','ph']
                }, null, 2),
                createVNode("span", { class: "font-bold" }, toDisplayString($options.activity.title || 'Activity Details'), 1)
              ]),
              createVNode("button", {
                onClick: $options.handleSheetClose,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            ($options.activity && $options.activity.id)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex-grow w-full pr-2 flex flex-col gap-6 custom-scrollbar"
                }, [
                  ($options.activity.time || $options.activity.date)
                    ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col"
                      }, [
                        createVNode("span", { class: "text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" }, "Time & Date"),
                        createVNode("div", { class: "flex items-center gap-2 text-zinc-700" }, [
                          createVNode("i", { class: "ph ph-calendar-blank text-peach-500 text-lg" }),
                          createTextVNode(),
                          createVNode("span", { class: "text-base" }, toDisplayString($options.activityDateTimeDisplay), 1)
                        ])
                      ]))
                    : createCommentVNode("", true),
                  ($options.activity.location)
                    ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col"
                      }, [
                        createVNode("span", { class: "text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" }, "Location"),
                        createVNode("div", { class: "flex items-center gap-2 text-zinc-700" }, [
                          createVNode("i", { class: "ph ph-map-pin text-peach-500 text-lg" }),
                          createVNode("span", { class: "text-base" }, toDisplayString($options.activity.location), 1)
                        ])
                      ]))
                    : createCommentVNode("", true),
                  ($options.activity.cost > 0 || ($options.activity.costNote && $options.activity.costNote !== ''))
                    ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex flex-col"
                      }, [
                        createVNode("span", { class: "text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" }, "Budget"),
                        createVNode("div", { class: "flex items-center gap-2 text-zinc-700" }, [
                          createVNode("i", { class: "ph ph-currency-circle-dollar text-peach-500 text-lg" }),
                          createVNode("span", { class: "text-base font-semibold" }, toDisplayString($options.formattedBudget), 1),
                          ($options.activity.costNote)
                            ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-zinc-500 text-sm opacity-80"
                              }, "(" + toDisplayString($options.activity.costNote) + ")", 1))
                            : createCommentVNode("", true)
                        ])
                      ]))
                    : createCommentVNode("", true),
                  ($options.activity.description)
                    ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex flex-col"
                      }, [
                        createVNode("span", { class: "text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1" }, "Description"),
                        createVNode("p", { class: "text-zinc-700 text-base leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-100" }, toDisplayString($options.activity.description), 1)
                      ]))
                    : createCommentVNode("", true)
                ]))
              : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex flex-col items-center justify-center h-full w-full text-zinc-500 py-12"
                }, [
                  createVNode("i", { class: "ph ph-info text-5xl mb-4 text-zinc-300" }),
                  createVNode("p", { class: "text-lg text-zinc-600 font-medium" }, "No activity selected to view."),
                  createVNode("p", { class: "text-sm text-zinc-400 mt-2" }, "Try clicking on an activity card.")
                ])),
            createVNode("div", { class: "flex flex-col sm:flex-row gap-3 pt-6 w-full border-t border-zinc-100 mt-auto" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.handleEditClick,
                variant: "secondary",
                disabled: !$options.activity || !$options.activity.id
              }, {
                default: withCtx(() => [
                  createVNode("i", { class: "ph ph-pencil-simple text-base mr-2" }),
                  createTextVNode(" Edit Activity ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"]),
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.handleDeleteClick,
                variant: "ghost",
                disabled: !$options.activity || !$options.activity.id
              }, {
                default: withCtx(() => [
                  createVNode("i", { class: "ph ph-trash text-base mr-2" }),
                  createTextVNode(" Delete Activity ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetViewActivity.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : undefined
};
const SheetViewActivity = /*#__PURE__*/_export_sfc(_sfc_main$8, [['ssrRender',_sfc_ssrRender$8],['__scopeId',"data-v-8d2b8bea"]]);

const _sfc_main$7 = {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
    Dates
  },

  props: {
    // This prop now directly controls the Sheet's visibility
    showSheet: {
      type: Boolean,
      default: false,
    },
    // modelValue now strictly represents the accommodation data
    modelValue: {
      type: Object,
      default: () => ({
        name: '',
        type: '',
        location: '',
        numberOfRooms: null,
        totalCost: null,
        checkInTime: '',
        checkOutTime: '',
        dates: {
          start: '',
          end: '',
        }
      }),
      required: true,
    }
  },

  data() {
    return {
      // Create a local copy of modelValue to allow internal modifications
      localConfig: {...this.modelValue},
    }
  },

  // No `showSheets` computed property needed if you're controlling it via `showSheet` prop.
  // computed: {
  //   showSheets: {
  //     get() {
  //       return this.showSheet
  //     },
  //     set(value) {
  //       this.showSheet = value
  //     }
  //   }
  // },

  watch: {
    // Watch for changes in the prop and update the local copy
    'modelValue': {
      handler(newValue) {
        // Use a more robust check for deep equality if needed,
        // or simply assign if you're sure updates won't cause loops.
        // For simple objects, `JSON.stringify` works, for complex, a deep-compare utility.
        if (JSON.stringify(newValue) !== JSON.stringify(this.localConfig)) {
          this.localConfig = {...newValue};
        }
      },
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Deep watch for nested property changes
    }
  },

  methods: {
    // Helper method to format date range for summary
    formatDateRange(startDateIso, endDateIso) {
      if (!startDateIso || !endDateIso) return '';
      const start = new Date(startDateIso);
      const end = new Date(endDateIso);
      const options = { month: 'short', day: 'numeric' };
      if (start.getFullYear() !== end.getFullYear()) {
        options.year = 'numeric';
      }
      console.log(startDateIso, endDateIso);
      try {
        return `${new Intl.DateTimeFormat('en-US', options).format(start)} - ${new Intl.DateTimeFormat('en-US', options).format(end)}`;
      } catch (error) {
        console.error(error);
      }
    },

    // Helper method to format cost for summary
    formatCost(cost) {
      if (cost === null || cost === undefined || isNaN(cost)) return 'Enter estimated cost';
      return `₱${new Intl.NumberFormat('en-US').format(cost)}`;
    },

    // Emits an event to tell the parent to close the sheet
    closeSheetViaProp() {
      this.$emit('update:showSheet', false);
    },

    async save() {
      // -- Emit the localConfig (updated data) and then signal to close the sheet
      this.$emit('update:modelValue', this.localConfig); // Emit updated data
      this.$emit('update:showSheet', false); // Signal to close the sheet

      // -- GET TRIP ID FIRST
      const pathname = window.location.pathname;
      const tripId = pathname.split('/')[2];

      // -- SAVE to FIRESTORE
      const response = await fetch('/api/v1/trip/accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: tripId,
          accommodationData: this.localConfig
        })
      });

      // -- PRINT RESPONSE
      console.log(await response.json());
    }
  },
};

function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Select = resolveComponent("Select");
  const _component_Dates = resolveComponent("Dates");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.closeSheetViaProp
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" data-v-2f972fe3${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-2f972fe3${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-2f972fe3${
          _scopeId
        }><i class="ph ph-suitcase" data-v-2f972fe3${
          _scopeId
        }></i> <span class="font-bold" data-v-2f972fe3${
          _scopeId
        }>Accommodations</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-2f972fe3${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-2f972fe3${
          _scopeId
        }></i></button></div><div class="flex flex-col gap-4 w-full" data-v-2f972fe3${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $data.localConfig.name,
          label: "Accommodation Name",
          icon: "ph-article"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-2f972fe3${
                _scopeId
              }><div class="grid grid-cols-4 gap-4" data-v-2f972fe3${
                _scopeId
              }>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.name,
                "onUpdate:modelValue": $event => (($data.localConfig.name) = $event),
                id: "accommodation-name",
                class: "col-span-3",
                placeholder: "Enter the name of Accommodation",
                label: "Name"
              }, null, _parent, _scopeId));
              _push(ssrRenderComponent(_component_Select, {
                modelValue: $data.localConfig.type,
                "onUpdate:modelValue": $event => (($data.localConfig.type) = $event),
                id: "accommodation-type",
                label: "Type",
                options: [
                 { label: 'Hotel', value: 'Hotel' },
                 { label: 'AirBnb', value: 'AirBnb' },
                 { label: 'Transient', value: 'Transient' },
                 { label: 'Other', value: 'Other' }
               ]
              }, null, _parent, _scopeId));
              _push(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode("div", { class: "grid grid-cols-4 gap-4" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.name,
                      "onUpdate:modelValue": $event => (($data.localConfig.name) = $event),
                      id: "accommodation-name",
                      class: "col-span-3",
                      placeholder: "Enter the name of Accommodation",
                      label: "Name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_Select, {
                      modelValue: $data.localConfig.type,
                      "onUpdate:modelValue": $event => (($data.localConfig.type) = $event),
                      id: "accommodation-type",
                      label: "Type",
                      options: [
                 { label: 'Hotel', value: 'Hotel' },
                 { label: 'AirBnb', value: 'AirBnb' },
                 { label: 'Transient', value: 'Transient' },
                 { label: 'Other', value: 'Other' }
               ]
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $data.localConfig.location,
          label: "Location",
          icon: "ph-map-pin"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-2f972fe3${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.location,
                "onUpdate:modelValue": $event => (($data.localConfig.location) = $event),
                id: "accommodation-location",
                placeholder: "Enter name of location",
                label: "Name"
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localConfig.location,
                    "onUpdate:modelValue": $event => (($data.localConfig.location) = $event),
                    id: "accommodation-location",
                    placeholder: "Enter name of location",
                    label: "Name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Dates, {
          "disable-button": true,
          modelValue: $data.localConfig.dates,
          "onUpdate:modelValue": $event => (($data.localConfig.dates) = $event),
          summary: $options.formatDateRange($data.localConfig.dates.start, $data.localConfig.dates.end)
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: `${$data.localConfig.numberOfRooms} Room(s)` || 'Add details for rooms & guests',
          label: "Rooms & Guests",
          icon: "ph-users"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-2f972fe3${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.numberOfRooms,
                "onUpdate:modelValue": $event => (($data.localConfig.numberOfRooms) = $event),
                id: "number-numbers",
                type: "number",
                placeholder: "Number of Rooms",
                label: "Rooms",
                min: "1"
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localConfig.numberOfRooms,
                    "onUpdate:modelValue": $event => (($data.localConfig.numberOfRooms) = $event),
                    id: "number-numbers",
                    type: "number",
                    placeholder: "Number of Rooms",
                    label: "Rooms",
                    min: "1"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $options.formatCost($data.localConfig.totalCost),
          label: "Cost",
          icon: "₱"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-2f972fe3${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.totalCost,
                "onUpdate:modelValue": $event => (($data.localConfig.totalCost) = $event),
                id: "cost",
                type: "number",
                formatCommas: true,
                placeholder: "Estimated total cost",
                label: "Total Cost",
                prefix: "₱",
                min: "0"
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localConfig.totalCost,
                    "onUpdate:modelValue": $event => (($data.localConfig.totalCost) = $event),
                    id: "cost",
                    type: "number",
                    formatCommas: true,
                    placeholder: "Estimated total cost",
                    label: "Total Cost",
                    prefix: "₱",
                    min: "0"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: `${$data.localConfig.checkInTime} | ${$data.localConfig.checkOutTime}` || 'Set check-in/out times',
          label: "Check-in/out Times",
          icon: "ph-clock"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-2f972fe3${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.checkInTime,
                "onUpdate:modelValue": $event => (($data.localConfig.checkInTime) = $event),
                id: "check-in",
                type: "time",
                label: "Check-in Time"
              }, null, _parent, _scopeId));
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localConfig.checkOutTime,
                "onUpdate:modelValue": $event => (($data.localConfig.checkOutTime) = $event),
                id: "check-out",
                type: "time",
                label: "Check-out Time"
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localConfig.checkInTime,
                    "onUpdate:modelValue": $event => (($data.localConfig.checkInTime) = $event),
                    id: "check-in",
                    type: "time",
                    label: "Check-in Time"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_Input, {
                    modelValue: $data.localConfig.checkOutTime,
                    "onUpdate:modelValue": $event => (($data.localConfig.checkOutTime) = $event),
                    id: "check-out",
                    type: "time",
                    label: "Check-out Time"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, { onClick: $options.save }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Save Accommodations`);
            } else {
              return [
                createTextVNode("Save Accommodations")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-suitcase" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Accommodations")
              ]),
              createVNode("button", {
                onClick: $options.closeSheetViaProp,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex flex-col gap-4 w-full" }, [
              createVNode(_component_AdvInput, {
                summary: $data.localConfig.name,
                label: "Accommodation Name",
                icon: "ph-article"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode("div", { class: "grid grid-cols-4 gap-4" }, [
                      createVNode(_component_Input, {
                        modelValue: $data.localConfig.name,
                        "onUpdate:modelValue": $event => (($data.localConfig.name) = $event),
                        id: "accommodation-name",
                        class: "col-span-3",
                        placeholder: "Enter the name of Accommodation",
                        label: "Name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Select, {
                        modelValue: $data.localConfig.type,
                        "onUpdate:modelValue": $event => (($data.localConfig.type) = $event),
                        id: "accommodation-type",
                        label: "Type",
                        options: [
                 { label: 'Hotel', value: 'Hotel' },
                 { label: 'AirBnb', value: 'AirBnb' },
                 { label: 'Transient', value: 'Transient' },
                 { label: 'Other', value: 'Other' }
               ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_AdvInput, {
                summary: $data.localConfig.location,
                label: "Location",
                icon: "ph-map-pin"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.location,
                      "onUpdate:modelValue": $event => (($data.localConfig.location) = $event),
                      id: "accommodation-location",
                      placeholder: "Enter name of location",
                      label: "Name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_Dates, {
                "disable-button": true,
                modelValue: $data.localConfig.dates,
                "onUpdate:modelValue": $event => (($data.localConfig.dates) = $event),
                summary: $options.formatDateRange($data.localConfig.dates.start, $data.localConfig.dates.end)
              }, null, 8, ["modelValue", "onUpdate:modelValue", "summary"]),
              createVNode(_component_AdvInput, {
                summary: `${$data.localConfig.numberOfRooms} Room(s)` || 'Add details for rooms & guests',
                label: "Rooms & Guests",
                icon: "ph-users"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.numberOfRooms,
                      "onUpdate:modelValue": $event => (($data.localConfig.numberOfRooms) = $event),
                      id: "number-numbers",
                      type: "number",
                      placeholder: "Number of Rooms",
                      label: "Rooms",
                      min: "1"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_AdvInput, {
                summary: $options.formatCost($data.localConfig.totalCost),
                label: "Cost",
                icon: "₱"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.totalCost,
                      "onUpdate:modelValue": $event => (($data.localConfig.totalCost) = $event),
                      id: "cost",
                      type: "number",
                      formatCommas: true,
                      placeholder: "Estimated total cost",
                      label: "Total Cost",
                      prefix: "₱",
                      min: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_AdvInput, {
                summary: `${$data.localConfig.checkInTime} | ${$data.localConfig.checkOutTime}` || 'Set check-in/out times',
                label: "Check-in/out Times",
                icon: "ph-clock"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.checkInTime,
                      "onUpdate:modelValue": $event => (($data.localConfig.checkInTime) = $event),
                      id: "check-in",
                      type: "time",
                      label: "Check-in Time"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_Input, {
                      modelValue: $data.localConfig.checkOutTime,
                      "onUpdate:modelValue": $event => (($data.localConfig.checkOutTime) = $event),
                      id: "check-out",
                      type: "time",
                      label: "Check-out Time"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_Button, { onClick: $options.save }, {
                default: withCtx(() => [
                  createTextVNode("Save Accommodations")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetAccom.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : undefined
};
const SheetAccom = /*#__PURE__*/_export_sfc(_sfc_main$7, [['ssrRender',_sfc_ssrRender$7],['__scopeId',"data-v-2f972fe3"]]);

const _sfc_main$6 = {
  components: {
    Anchor,
    Friends,
    Sheet,
    Tag,
    Button,
    Input,
    Select,
    AdvInput,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, companions: [] }),
      required: true,
    },
    showSheet: {
      type: Boolean,
      default: false,
    },
    acceptedFriendships: {
      type: Array,
      default: [],
    },
    ownerUid: {
      type: String,
      default: '',
    },
    uid: {
      type: String,
      default: '',
    }
  },

  emits: ['update:modelValue', 'companionAdded', 'companionRemoved'],

  data() {
    return {
      localCompanions: [],
      searchQuery: '',
      debouncedSearchQuery: '',
      timeoutId: null,
    };
  },

  computed: {
    companions() {
      return [...this.modelValue]
    },

    filteredAcceptedFriendships() {
      if (!this.debouncedSearchQuery) return this.acceptedFriendships
      return this.acceptedFriendships.filter(f=>{
        return f.user2DisplayName.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase()) ||
            f.user1DisplayName.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase())
      })
    }
  },

  watch: {
    'modelValue.companions': {
      immediate: true,
      handler(newCompanions) {
        this.localCompanions = newCompanions ? newCompanions.map(c => ({ ...c })) : [];
        if (this.localCompanions.length === 0) {
          this.addCompanionRow();
        }
      }
    },
    showSheet(newVal) {
      if (newVal && this.localCompanions.length === 0) {
        this.addCompanionRow();
      }
    }
  },

  methods: {
    debounceInput() {
      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(()=>{
        this.debouncedSearchQuery = this.searchQuery;
      }, 600);
    },
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    addCompanionRow() {
      this.localCompanions.push({
        id: this.generateUniqueId(),
        name: '',
        role: 'Friend',
        age: null,
      });
    },
    async addCompanion(companion) {
      // -- GET TRIP ID
      const pathname = window.location.pathname;
      const tripId = pathname.split('/')[2];
      await fetch('/api/v1/trip/companions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companion: companion,
          tripId: tripId
        })
      });

      this.$emit('companionAdded');
    },

    async removeCompanion(companion) {
      // -- GET TRIP ID
      const pathname = window.location.pathname;
      const tripId = pathname.split('/')[2];
      const companionUid = companion.uid;
      await fetch(`/api/v1/trip/companions?tripId=${tripId}&companionUid=${companionUid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      this.$emit('companionRemoved');
    },

    removeCompanionRow(id) {
      // Filter out the companion to remove
      this.localCompanions = this.localCompanions.filter(companion => companion.id !== id);
      // If no companions left, add a fresh row for user convenience
      if (this.localCompanions.length === 0) {
        this.addCompanionRow();
      }
    },
    getCompanionSummary(companion) {
      if (companion.name) {
        let summary = companion.name;
        if (companion.role && companion.role !== 'Other') {
          summary += ` (${companion.role})`;
        }
        if (companion.age) {
          summary += `, ${companion.age} y.o.`;
        }
        return summary;
      }
      return 'New Companion';
    },
    saveCompanions() {
      const savedCompanions = this.localCompanions.filter(c => c.name.trim() !== '');

      this.$emit('update:modelValue', {
        ...this.modelValue,
        companions: savedCompanions,
        showSheet: false,
      });
    }
  },
  mounted() {
    if (this.localCompanions.length === 0) {
      this.addCompanionRow();
    }
  }
};

function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Tag = resolveComponent("Tag");
  const _component_Input = resolveComponent("Input");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $event => (_ctx.$emit('update:showSheet', false))
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" data-v-9aca97df${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-9aca97df${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-9aca97df${
          _scopeId
        }><i class="ph ph-users" data-v-9aca97df${
          _scopeId
        }></i> <span class="font-bold" data-v-9aca97df${
          _scopeId
        }>Trip Companions</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-9aca97df${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-9aca97df${
          _scopeId
        }></i></button></div><div class="flex flex-col w-full gap-10" data-v-9aca97df${
          _scopeId
        }><div class="flex flex-col gap-4 w-full" data-v-9aca97df${
          _scopeId
        }><span class="text-xl font-semibold" data-v-9aca97df${
          _scopeId
        }>Current Companions</span><div class="flex flex-col gap-2" data-v-9aca97df${
          _scopeId
        }><!--[-->`);
        ssrRenderList($options.companions, (companion, index) => {
          _push(`<div class="${
            ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-row items-center justify-start"])
          }" data-v-9aca97df${
            _scopeId
          }><div class="${
            ssrRenderClass([
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ])
          }" data-v-9aca97df${
            _scopeId
          }>`);
          if (companion.photoURL) {
            _push(`<img${
              ssrRenderAttr("src", companion.photoURL)
            } alt="" data-v-9aca97df${
              _scopeId
            }>`);
          } else {
            _push(`<i class="ph ph-user" data-v-9aca97df${_scopeId}></i>`);
          }
          _push(`</div><div class="flex flex-col gap-0 grow" data-v-9aca97df${_scopeId}>`);
          if (companion.displayName) {
            _push(`<span class="font-semibold" data-v-9aca97df${
              _scopeId
            }>${
              ssrInterpolate(companion.displayName)
            }</span>`);
          } else if (companion.email) {
            _push(`<span class="font-semibold" data-v-9aca97df${
              _scopeId
            }>${
              ssrInterpolate(companion.email)
            }</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if ($props.ownerUid !== companion.uid && ($props.uid === $props.ownerUid || $props.uid === companion.uid)) {
            _push(ssrRenderComponent(_component_Tag, {
              onClick: $event => ($options.removeCompanion(companion)),
              mode: "button",
              label: "Remove",
              icon: "ph ph-x"
            }, null, _parent, _scopeId));
          } else if ($props.ownerUid === companion.uid) {
            _push(ssrRenderComponent(_component_Tag, {
              label: "Organizer",
              icon: "ph ph-crown",
              variant: "yellow"
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div><div class="flex flex-col gap-4" data-v-9aca97df${
          _scopeId
        }><div class="text-2xl gap-2 font-bold flex items-center" data-v-9aca97df${
          _scopeId
        }><i class="ph ph-users" data-v-9aca97df${
          _scopeId
        }></i><span data-v-9aca97df${
          _scopeId
        }>My Friends</span></div>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "friends-search",
          "prefix-icon": "ph ph-magnifying-glass",
          placeholder: "Search friends",
          modelValue: $data.searchQuery,
          "onUpdate:modelValue": $event => (($data.searchQuery) = $event),
          onInput: $options.debounceInput
        }, null, _parent, _scopeId));
        _push(`<span data-v-9aca97df${_scopeId}>Your Friends</span>`);
        if ($options.filteredAcceptedFriendships.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList($options.filteredAcceptedFriendships, (person, index) => {
            _push(`<!--[-->`);
            if (person.user1Uid !== $props.uid) {
              _push(`<div class="${
                ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])
              }" data-v-9aca97df${
                _scopeId
              }><div class="flex gap-3 self-start items-center justify-start" data-v-9aca97df${
                _scopeId
              }><div class="${
                ssrRenderClass([
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ])
              }" data-v-9aca97df${
                _scopeId
              }>`);
              if (person.user1PhotoURL) {
                _push(`<img${
                  ssrRenderAttr("src", person.user1PhotoURL)
                } alt="" data-v-9aca97df${
                  _scopeId
                }>`);
              } else {
                _push(`<i class="ph ph-user" data-v-9aca97df${_scopeId}></i>`);
              }
              _push(`</div><div class="flex flex-col gap-0 grow" data-v-9aca97df${_scopeId}>`);
              if (person.user1DisplayName) {
                _push(`<span class="font-semibold" data-v-9aca97df${
                  _scopeId
                }>${
                  ssrInterpolate(person.user1DisplayName)
                }</span>`);
              } else if (person.user1Email) {
                _push(`<span class="font-semibold" data-v-9aca97df${
                  _scopeId
                }>${
                  ssrInterpolate(person.user1Email)
                }</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
              if ($options.companions.map(c=>c.uid).includes(person.user1Uid)) {
                _push(`<span class="text-sm" data-v-9aca97df${_scopeId}>Already Added</span>`);
              } else {
                _push(ssrRenderComponent(_component_Tag, {
                  onClick: $event => ($options.addCompanion({
                    uid: person.user1Uid,
                    displayName: person.user1DisplayName,
                    email: person.user1Email,
                    photoURL: person.user1PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })),
                  mode: "button",
                  label: "Add Companion",
                  icon: "ph ph-user-plus"
                }, null, _parent, _scopeId));
              }
              _push(`</div>`);
            } else {
              _push(`<div class="${
                ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])
              }" data-v-9aca97df${
                _scopeId
              }><div class="flex gap-3 self-start items-center justify-start" data-v-9aca97df${
                _scopeId
              }><div class="${
                ssrRenderClass([
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ])
              }" data-v-9aca97df${
                _scopeId
              }>`);
              if (person.user2PhotoURL) {
                _push(`<img${
                  ssrRenderAttr("src", person.user2PhotoURL)
                } alt="" data-v-9aca97df${
                  _scopeId
                }>`);
              } else {
                _push(`<i class="ph ph-user" data-v-9aca97df${_scopeId}></i>`);
              }
              _push(`</div><div class="flex flex-col gap-0 grow" data-v-9aca97df${_scopeId}>`);
              if (person.user2DisplayName) {
                _push(`<span class="font-semibold" data-v-9aca97df${
                  _scopeId
                }>${
                  ssrInterpolate(person.user2DisplayName)
                }</span>`);
              } else if (person.user2Email) {
                _push(`<span class="font-semibold" data-v-9aca97df${
                  _scopeId
                }>${
                  ssrInterpolate(person.user2Email)
                }</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
              if ($options.companions.map(c=>c.uid).includes(person.user2Uid)) {
                _push(`<span class="text-sm" data-v-9aca97df${_scopeId}>Already Added</span>`);
              } else {
                _push(ssrRenderComponent(_component_Tag, {
                  onClick: $event => ($options.addCompanion({
                    uid: person.user2Uid,
                    displayName: person.user2DisplayName,
                    email: person.user2Email,
                    photoURL: person.user2PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })),
                  mode: "button",
                  label: "Add Companion",
                  icon: "ph ph-user-plus"
                }, null, _parent, _scopeId));
              }
              _push(`</div>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10" data-v-9aca97df${
            _scopeId
          }><i class="ph ph-users text-3xl" data-v-9aca97df${
            _scopeId
          }></i><span data-v-9aca97df${
            _scopeId
          }>You have no friends</span></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-users" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Trip Companions")
              ]),
              createVNode("button", {
                onClick: $event => (_ctx.$emit('update:showSheet', false)),
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex flex-col w-full gap-10" }, [
              createVNode("div", { class: "flex flex-col gap-4 w-full" }, [
                createVNode("span", { class: "text-xl font-semibold" }, "Current Companions"),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList($options.companions, (companion, index) => {
                    return (openBlock(), createBlock("div", {
                      class: ["fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-row items-center justify-start", `fadeIn-${index}`]
                    }, [
                      createVNode("div", { class: [
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ] }, [
                        (companion.photoURL)
                          ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: companion.photoURL,
                              alt: ""
                            }, null, 8, ["src"]))
                          : (openBlock(), createBlock("i", {
                              key: 1,
                              class: "ph ph-user"
                            }))
                      ]),
                      createVNode("div", { class: "flex flex-col gap-0 grow" }, [
                        (companion.displayName)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-semibold"
                            }, toDisplayString(companion.displayName), 1))
                          : (companion.email)
                            ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "font-semibold"
                              }, toDisplayString(companion.email), 1))
                            : createCommentVNode("", true)
                      ]),
                      ($props.ownerUid !== companion.uid && ($props.uid === $props.ownerUid || $props.uid === companion.uid))
                        ? (openBlock(), createBlock(_component_Tag, {
                            key: 0,
                            onClick: $event => ($options.removeCompanion(companion)),
                            mode: "button",
                            label: "Remove",
                            icon: "ph ph-x"
                          }, null, 8, ["onClick"]))
                        : ($props.ownerUid === companion.uid)
                          ? (openBlock(), createBlock(_component_Tag, {
                              key: 1,
                              label: "Organizer",
                              icon: "ph ph-crown",
                              variant: "yellow"
                            }))
                          : createCommentVNode("", true)
                    ], 2))
                  }), 256))
                ])
              ]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("div", { class: "text-2xl gap-2 font-bold flex items-center" }, [
                  createVNode("i", { class: "ph ph-users" }),
                  createVNode("span", null, "My Friends")
                ]),
                createVNode(_component_Input, {
                  id: "friends-search",
                  "prefix-icon": "ph ph-magnifying-glass",
                  placeholder: "Search friends",
                  modelValue: $data.searchQuery,
                  "onUpdate:modelValue": $event => (($data.searchQuery) = $event),
                  onInput: $options.debounceInput
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"]),
                createVNode("span", null, "Your Friends"),
                ($options.filteredAcceptedFriendships.length > 0)
                  ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList($options.filteredAcceptedFriendships, (person, index) => {
                      return (openBlock(), createBlock(Fragment, null, [
                        (person.user1Uid !== $props.uid)
                          ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ["fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between", `fadeIn-${index}`]
                            }, [
                              createVNode("div", { class: "flex gap-3 self-start items-center justify-start" }, [
                                createVNode("div", { class: [
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ] }, [
                                  (person.user1PhotoURL)
                                    ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: person.user1PhotoURL,
                                        alt: ""
                                      }, null, 8, ["src"]))
                                    : (openBlock(), createBlock("i", {
                                        key: 1,
                                        class: "ph ph-user"
                                      }))
                                ]),
                                createVNode("div", { class: "flex flex-col gap-0 grow" }, [
                                  (person.user1DisplayName)
                                    ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "font-semibold"
                                      }, toDisplayString(person.user1DisplayName), 1))
                                    : (person.user1Email)
                                      ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "font-semibold"
                                        }, toDisplayString(person.user1Email), 1))
                                      : createCommentVNode("", true)
                                ])
                              ]),
                              ($options.companions.map(c=>c.uid).includes(person.user1Uid))
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-sm"
                                  }, "Already Added"))
                                : (openBlock(), createBlock(_component_Tag, {
                                    key: 1,
                                    onClick: $event => ($options.addCompanion({
                    uid: person.user1Uid,
                    displayName: person.user1DisplayName,
                    email: person.user1Email,
                    photoURL: person.user1PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })),
                                    mode: "button",
                                    label: "Add Companion",
                                    icon: "ph ph-user-plus"
                                  }, null, 8, ["onClick"]))
                            ], 2))
                          : (openBlock(), createBlock("div", {
                              key: 1,
                              class: ["fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between", `fadeIn-${index}`]
                            }, [
                              createVNode("div", { class: "flex gap-3 self-start items-center justify-start" }, [
                                createVNode("div", { class: [
              'text-xl transition rounded-full flex',
              'bg-none justify-center items-center',
              'bg-zinc-200 aspect-square border-2 border-zinc-300',
              'shadow-secondary-sm',
              'border-secondary-sm',
              'overflow-hidden h-12 w-12'
            ] }, [
                                  (person.user2PhotoURL)
                                    ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: person.user2PhotoURL,
                                        alt: ""
                                      }, null, 8, ["src"]))
                                    : (openBlock(), createBlock("i", {
                                        key: 1,
                                        class: "ph ph-user"
                                      }))
                                ]),
                                createVNode("div", { class: "flex flex-col gap-0 grow" }, [
                                  (person.user2DisplayName)
                                    ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "font-semibold"
                                      }, toDisplayString(person.user2DisplayName), 1))
                                    : (person.user2Email)
                                      ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "font-semibold"
                                        }, toDisplayString(person.user2Email), 1))
                                      : createCommentVNode("", true)
                                ])
                              ]),
                              ($options.companions.map(c=>c.uid).includes(person.user2Uid))
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-sm"
                                  }, "Already Added"))
                                : (openBlock(), createBlock(_component_Tag, {
                                    key: 1,
                                    onClick: $event => ($options.addCompanion({
                    uid: person.user2Uid,
                    displayName: person.user2DisplayName,
                    email: person.user2Email,
                    photoURL: person.user2PhotoURL,
                    role: 'guest',
                    status: 'accepted'
                  })),
                                    mode: "button",
                                    label: "Add Companion",
                                    icon: "ph ph-user-plus"
                                  }, null, 8, ["onClick"]))
                            ], 2))
                      ], 64))
                    }), 256))
                  : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-center justify-center gap-1 text-zinc-500 py-10"
                    }, [
                      createVNode("i", { class: "ph ph-users text-3xl" }),
                      createVNode("span", null, "You have no friends")
                    ]))
              ])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetCompanions.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined
};
const SheetCompanions = /*#__PURE__*/_export_sfc(_sfc_main$6, [['ssrRender',_sfc_ssrRender$6],['__scopeId',"data-v-9aca97df"]]);

const _sfc_main$5 = {
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
      const pathname = window.location.pathname;
      const tripId = pathname.split('/')[2];

      // -- API CALL TO DELETE THE BUDGET CATEGORY IN FIRESTORE
      const response = await fetch(`/api/v1/trip/budget?tripId=${tripId}&budgetId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(`ERROR deleting budget: ${error.message}`);
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
        console.log(e);
      }
    },

    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat((this.getLocale(), {
        style: 'currency',
        currency: this.localBudget.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }));
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

      this.$emit('update:showSheet', false);

      // -- GET TRIP ID
      const pathname = window.location.pathname;
      const tripId = pathname.split('/')[2];

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
      });

      if (!response.ok) {
        console.error('ERROR saving budget');
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

function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Tag = resolveComponent("Tag");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Select = resolveComponent("Select");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $options.closeSheet
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" data-v-72142413${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-72142413${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-72142413${
          _scopeId
        }><i class="ph ph-wallet" data-v-72142413${
          _scopeId
        }></i> <span class="font-bold" data-v-72142413${
          _scopeId
        }>Trip Budget</span>`);
        _push(ssrRenderComponent(_component_Tag, {
          label: "+ Add Category",
          mode: "button",
          onClick: $options.addCategoryRow
        }, null, _parent, _scopeId));
        _push(`</div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-72142413${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-72142413${
          _scopeId
        }></i></button></div><div class="flex flex-col gap-4 w-full mb-6" data-v-72142413${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $options.totalBudgetSummary,
          label: "Overall Budget",
          icon: `${$options.getCurrencySymbol($data.localBudget.currency)}`
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-72142413${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                "format-commas": true,
                id: "totalBudget",
                modelValue: $data.localBudget.totalBudget,
                "onUpdate:modelValue": $event => (($data.localBudget.totalBudget) = $event),
                modelModifiers: { number: true },
                type: "number",
                placeholder: "Enter total trip budget",
                label: "Amount",
                prefix: $data.localBudget.currency,
                min: "0"
              }, null, _parent, _scopeId));
              _push(ssrRenderComponent(_component_Select, {
                modelValue: $data.localBudget.currency,
                "onUpdate:modelValue": $event => (($data.localBudget.currency) = $event),
                id: "budget-currency",
                label: "Currency",
                optionLabel: "label",
                optionValue: "value",
                options: $options.currencyOptions()
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    "format-commas": true,
                    id: "totalBudget",
                    modelValue: $data.localBudget.totalBudget,
                    "onUpdate:modelValue": $event => (($data.localBudget.totalBudget) = $event),
                    modelModifiers: { number: true },
                    type: "number",
                    placeholder: "Enter total trip budget",
                    label: "Amount",
                    prefix: $data.localBudget.currency,
                    min: "0"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix"]),
                  createVNode(_component_Select, {
                    modelValue: $data.localBudget.currency,
                    "onUpdate:modelValue": $event => (($data.localBudget.currency) = $event),
                    id: "budget-currency",
                    label: "Currency",
                    optionLabel: "label",
                    optionValue: "value",
                    options: $options.currencyOptions()
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div><div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" data-v-72142413${
          _scopeId
        }><div class="flex flex-row items-center justify-between" data-v-72142413${
          _scopeId
        }><h3 class="text-lg font-semibold text-zinc-700 mt-2 mb-2" data-v-72142413${
          _scopeId
        }>Budget Breakdown </h3><div class="font-normal! text-xs text-zinc-400 flex flex-col gap-0" data-v-72142413${
          _scopeId
        }><span data-v-72142413${
          _scopeId
        }>Total ${
          ssrInterpolate($options.formatCurrency($options.totalBreakdown))
        }</span>`);
        if ($options.totalBreakdown - $data.localBudget.totalBudget > 0) {
          _push(`<div data-v-72142413${
            _scopeId
          }><span data-v-72142413${
            _scopeId
          }>${
            ssrInterpolate($options.formatCurrency($options.totalBreakdown - $data.localBudget.totalBudget))
          } over budget</span></div>`);
        } else {
          _push(`<div data-v-72142413${
            _scopeId
          }><span data-v-72142413${
            _scopeId
          }>${
            ssrInterpolate($options.formatCurrency($data.localBudget.totalBudget - $options.totalBreakdown))
          } below budget</span></div>`);
        }
        _push(`</div></div><!--[-->`);
        ssrRenderList($data.localBudget.categories, (category, index) => {
          _push(ssrRenderComponent(_component_AdvInput, {
            key: category.id,
            summary: $options.getCategorySummary(category),
            label: `${category.name || 'New Category'}`,
            icon: "ph-tag",
            onRemove: $event => ($options.removeCategoryRow(category.id)),
            removable: ""
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<div class="flex flex-col gap-4 p-1" data-v-72142413${_scopeId}>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: `category-name-${index}`,
                  modelValue: category.name,
                  "onUpdate:modelValue": $event => ((category.name) = $event),
                  placeholder: "e.g., Flights, Food, Activities",
                  label: "Category Name"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: `category-amount-${index}`,
                  modelValue: category.amount,
                  "onUpdate:modelValue": $event => ((category.amount) = $event),
                  modelModifiers: { number: true },
                  type: "number",
                  placeholder: "Budget for this category",
                  label: "Amount",
                  prefix: $data.localBudget.currency
                }, null, _parent, _scopeId));
                _push(`<div class="flex justify-end mt-2" data-v-72142413${_scopeId}>`);
                if ($data.localBudget.categories.length > 1) {
                  _push(ssrRenderComponent(_component_Button, {
                    onClick: $event => ($options.removeCategoryRow(category.tempId, category.id)),
                    variant: "ghost"
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        _push(` Delete Category `);
                      } else {
                        return [
                          createTextVNode(" Delete Category ")
                        ]
                      }
                    }),
                    _: 2
                  }, _parent, _scopeId));
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      id: `category-name-${index}`,
                      modelValue: category.name,
                      "onUpdate:modelValue": $event => ((category.name) = $event),
                      placeholder: "e.g., Flights, Food, Activities",
                      label: "Category Name"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_Input, {
                      id: `category-amount-${index}`,
                      modelValue: category.amount,
                      "onUpdate:modelValue": $event => ((category.amount) = $event),
                      modelModifiers: { number: true },
                      type: "number",
                      placeholder: "Budget for this category",
                      label: "Amount",
                      prefix: $data.localBudget.currency
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "prefix"]),
                    createVNode("div", { class: "flex justify-end mt-2" }, [
                      ($data.localBudget.categories.length > 1)
                        ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            onClick: $event => ($options.removeCategoryRow(category.tempId, category.id)),
                            variant: "ghost"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete Category ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
        if ($data.localBudget.categories.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg" data-v-72142413${
            _scopeId
          }><i class="ph ph-tag-simple text-4xl mb-2" data-v-72142413${
            _scopeId
          }></i><p class="text-center" data-v-72142413${
            _scopeId
          }>No budget categories added yet. Click &#39;+ Add Category&#39; to start categorizing your spending!</p>`);
          _push(ssrRenderComponent(_component_Button, {
            class: "mt-4",
            onClick: $options.addCategoryRow
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`Add First Category`);
              } else {
                return [
                  createTextVNode("Add First Category")
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full mt-6" data-v-72142413${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveBudget
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Save Budget`);
            } else {
              return [
                createTextVNode("Save Budget")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-2 py-1" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-wallet" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Trip Budget"),
                createVNode(_component_Tag, {
                  label: "+ Add Category",
                  mode: "button",
                  onClick: $options.addCategoryRow
                }, null, 8, ["onClick"])
              ]),
              createVNode("button", {
                onClick: $options.closeSheet,
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex flex-col gap-4 w-full mb-6" }, [
              createVNode(_component_AdvInput, {
                summary: $options.totalBudgetSummary,
                label: "Overall Budget",
                icon: `${$options.getCurrencySymbol($data.localBudget.currency)}`
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      "format-commas": true,
                      id: "totalBudget",
                      modelValue: $data.localBudget.totalBudget,
                      "onUpdate:modelValue": $event => (($data.localBudget.totalBudget) = $event),
                      modelModifiers: { number: true },
                      type: "number",
                      placeholder: "Enter total trip budget",
                      label: "Amount",
                      prefix: $data.localBudget.currency,
                      min: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix"]),
                    createVNode(_component_Select, {
                      modelValue: $data.localBudget.currency,
                      "onUpdate:modelValue": $event => (($data.localBudget.currency) = $event),
                      id: "budget-currency",
                      label: "Currency",
                      optionLabel: "label",
                      optionValue: "value",
                      options: $options.currencyOptions()
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                _: 1
              }, 8, ["summary", "icon"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" }, [
              createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold text-zinc-700 mt-2 mb-2" }, "Budget Breakdown "),
                createVNode("div", { class: "font-normal! text-xs text-zinc-400 flex flex-col gap-0" }, [
                  createVNode("span", null, "Total " + toDisplayString($options.formatCurrency($options.totalBreakdown)), 1),
                  ($options.totalBreakdown - $data.localBudget.totalBudget > 0)
                    ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("span", null, toDisplayString($options.formatCurrency($options.totalBreakdown - $data.localBudget.totalBudget)) + " over budget", 1)
                      ]))
                    : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("span", null, toDisplayString($options.formatCurrency($data.localBudget.totalBudget - $options.totalBreakdown)) + " below budget", 1)
                      ]))
                ])
              ]),
              (openBlock(true), createBlock(Fragment, null, renderList($data.localBudget.categories, (category, index) => {
                return (openBlock(), createBlock(_component_AdvInput, {
                  key: category.id,
                  summary: $options.getCategorySummary(category),
                  label: `${category.name || 'New Category'}`,
                  icon: "ph-tag",
                  onRemove: $event => ($options.removeCategoryRow(category.id)),
                  removable: ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                      createVNode(_component_Input, {
                        id: `category-name-${index}`,
                        modelValue: category.name,
                        "onUpdate:modelValue": $event => ((category.name) = $event),
                        placeholder: "e.g., Flights, Food, Activities",
                        label: "Category Name"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Input, {
                        id: `category-amount-${index}`,
                        modelValue: category.amount,
                        "onUpdate:modelValue": $event => ((category.amount) = $event),
                        modelModifiers: { number: true },
                        type: "number",
                        placeholder: "Budget for this category",
                        label: "Amount",
                        prefix: $data.localBudget.currency
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "prefix"]),
                      createVNode("div", { class: "flex justify-end mt-2" }, [
                        ($data.localBudget.categories.length > 1)
                          ? (openBlock(), createBlock(_component_Button, {
                              key: 0,
                              onClick: $event => ($options.removeCategoryRow(category.tempId, category.id)),
                              variant: "ghost"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete Category ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"]))
                          : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["summary", "label", "onRemove"]))
              }), 128)),
              ($data.localBudget.categories.length === 0)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg"
                  }, [
                    createVNode("i", { class: "ph ph-tag-simple text-4xl mb-2" }),
                    createVNode("p", { class: "text-center" }, "No budget categories added yet. Click '+ Add Category' to start categorizing your spending!"),
                    createVNode(_component_Button, {
                      class: "mt-4",
                      onClick: $options.addCategoryRow
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Add First Category")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]))
                : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "w-full mt-6" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.saveBudget
              }, {
                default: withCtx(() => [
                  createTextVNode("Save Budget")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetBudget.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};
const SheetBudget = /*#__PURE__*/_export_sfc(_sfc_main$5, [['ssrRender',_sfc_ssrRender$5],['__scopeId',"data-v-72142413"]]);

const _sfc_main$4 = {
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
    // and containing an array of transportation segments.
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, transports: [] }), // Default with an empty transports array
      required: true,
    },

    showSheet: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'update:showSheet'],

  data() {
    return {
      // Create a local copy of transportation segments to allow direct manipulation
      localTransports: [],
      // Map modes to specific Phosphor Icons for AdvInput
      modeIcons: {
        'Flight': 'ph-airplane',
        'Bus': 'ph-bus',
        'Train': 'ph-train-simple',
        'Car': 'ph-car',
        'Ferry': 'ph-boat',
        'Taxi/Ride-share': 'ph-taxi',
        'Other': 'ph-question',
      }
    };
  },

  watch: {
    // Watch the prop and initialize localTransports when it changes
    // This handles initial load and external updates to modelValue.transports
    'modelValue.transports': {
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Watch nested properties of modelValue.transports
      handler(newTransports) {
        // Deep copy to avoid mutating the prop directly
        this.localTransports = newTransports ? newTransports.map(t => ({ ...t })) : [];
        // Add a default row if no transports exist and sheet is being opened
        if (this.showSheet && this.localTransports.length === 0) {
          this.addTransportRow();
        }
      }
    },
    // Watch showSheet to add a new transport row if the sheet is opened and there are no transports
    showSheet(newVal) {
      if (newVal && this.localTransports.length === 0) {
        this.addTransportRow();
      }
    }
  },

  methods: {
    // Helper to get locale for currency formatting (adjust if needed)
    getLocale() {
      return navigator.language || 'en-US';
    },
    // Generates a unique ID for new transport segments
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    // Adds a new blank transport segment object to the localTransports array
    addTransportRow() {
      this.localTransports.push({
        id: this.generateUniqueId(),
        mode: '', // Default mode
        departureLocation: '',
        departureDate: '',
        departureTime: '',
        arrivalLocation: '',
        arrivalDate: '',
        arrivalTime: '',
        bookingRef: '',
        seatNumber: '',
        cost: 0,
        currency: 'PHP', // Default currency
        notes: '',
      });
    },
    // Removes a transport segment from the localTransports array by ID
    removeTransportRow(id) {
      this.localTransports = this.localTransports.filter(transport => transport.id !== id);
      // Optional: if all removed, add a new blank row for convenience
      if (this.localTransports.length === 0) {
        this.addTransportRow();
      }
    },
    // Creates a summary string for the AdvInput component header
    getTransportSummary(transport) {
      const parts = [];
      if (transport.mode) {
        parts.push(transport.mode);
      }
      if (transport.departureLocation) {
        parts.push(`from ${transport.departureLocation}`);
      }
      if (transport.arrivalLocation) {
        parts.push(`to ${transport.arrivalLocation}`);
      }
      if (transport.departureDate) {
        parts.push(`on ${transport.departureDate}`);
      }
      if (transport.cost > 0) {
        const formatter = new Intl.NumberFormat(this.getLocale(), {
          style: 'currency',
          currency: transport.currency,
          minimumFractionDigits: 0, // No decimals for summary
          maximumFractionDigits: 0,
        });
        parts.push(`(${formatter.format(transport.cost)})`);
      }

      return parts.length > 0 ? parts.join(' ') : 'New Transportation Segment';
    },
    // Gets the appropriate icon based on the transport mode
    getTransportIcon(mode) {
      return this.modeIcons[mode] || 'ph-question';
    },
    // Emits the updated transportation data back to the parent
    saveTransports() {
      // Filter out any completely empty transport rows before emitting
      const savedTransports = this.localTransports.filter(t =>
          t.mode || t.departureLocation.trim() !== '' || t.arrivalLocation.trim() !== '' || t.cost > 0
      );

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet)
        transports: savedTransports, // Update the transports array
        showSheet: false, // Close the sheet
      });
    }
  },
  mounted() {
    // Initialize with one segment if none exist on mount and sheet is visible
    if (this.showSheet && this.localTransports.length === 0) {
      this.addTransportRow();
    }
  }
};

function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Tag = resolveComponent("Tag");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Select = resolveComponent("Select");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $props.showSheet,
    "onUpdate:modelValue": $event => (_ctx.$emit('update:showSheet', false))
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-76ca35d2${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-76ca35d2${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-76ca35d2${
          _scopeId
        }><i class="ph ph-bus" data-v-76ca35d2${
          _scopeId
        }></i> <span class="font-bold" data-v-76ca35d2${
          _scopeId
        }>Transportation</span>`);
        _push(ssrRenderComponent(_component_Tag, {
          label: "+ Add Segment",
          mode: "button",
          onClick: $options.addTransportRow
        }, null, _parent, _scopeId));
        _push(`</div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-76ca35d2${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-76ca35d2${
          _scopeId
        }></i></button></div><div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" data-v-76ca35d2${
          _scopeId
        }><!--[-->`);
        ssrRenderList($data.localTransports, (transport, index) => {
          _push(ssrRenderComponent(_component_AdvInput, {
            key: transport.id,
            summary: $options.getTransportSummary(transport),
            label: `Segment ${index + 1}`,
            icon: $options.getTransportIcon(transport.mode),
            onRemove: $event => ($options.removeTransportRow(transport.id)),
            removable: ""
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<div class="flex flex-col gap-4 p-1" data-v-76ca35d2${_scopeId}>`);
                _push(ssrRenderComponent(_component_Select, {
                  modelValue: transport.mode,
                  "onUpdate:modelValue": $event => ((transport.mode) = $event),
                  id: `transport-mode-${transport.id}`,
                  label: "Mode of Transport",
                  placeholder: "Enter/Select Mode",
                  options: [
                { label: 'Flight', value: 'Flight' },
                { label: 'Bus', value: 'Bus' },
                { label: 'Train', value: 'Train' },
                { label: 'Car', value: 'Car' },
                { label: 'Ferry', value: 'Ferry' },
                { label: 'Taxi/Ride-share', value: 'Taxi/Ride-share' },
                { label: 'Other', value: 'Other' }
              ]
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'location-departure',
                  modelValue: transport.departureLocation,
                  "onUpdate:modelValue": $event => ((transport.departureLocation) = $event),
                  placeholder: "e.g., NAIA Terminal 3",
                  label: "Departure Location"
                }, null, _parent, _scopeId));
                _push(`<div class="grid grid-cols-2 gap-4" data-v-76ca35d2${_scopeId}>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'date-departure',
                  modelValue: transport.departureDate,
                  "onUpdate:modelValue": $event => ((transport.departureDate) = $event),
                  type: "date",
                  label: "Departure Date"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'time-departure',
                  modelValue: transport.departureTime,
                  "onUpdate:modelValue": $event => ((transport.departureTime) = $event),
                  type: "time",
                  label: "Departure Time"
                }, null, _parent, _scopeId));
                _push(`</div>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'location-arrival',
                  modelValue: transport.arrivalLocation,
                  "onUpdate:modelValue": $event => ((transport.arrivalLocation) = $event),
                  placeholder: "e.g., Baguio City Terminal",
                  label: "Arrival Location"
                }, null, _parent, _scopeId));
                _push(`<div class="grid grid-cols-2 gap-4" data-v-76ca35d2${_scopeId}>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'date-arrival',
                  modelValue: transport.arrivalDate,
                  "onUpdate:modelValue": $event => ((transport.arrivalDate) = $event),
                  type: "date",
                  label: "Arrival Date (Optional)"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'time-arrival',
                  modelValue: transport.arrivalTime,
                  "onUpdate:modelValue": $event => ((transport.arrivalTime) = $event),
                  type: "time",
                  label: "Arrival Time (Optional)"
                }, null, _parent, _scopeId));
                _push(`</div>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'booking-reference',
                  modelValue: transport.bookingRef,
                  "onUpdate:modelValue": $event => ((transport.bookingRef) = $event),
                  placeholder: "e.g., ABC123DEF",
                  label: "Booking Reference (Optional)"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'seat-number',
                  modelValue: transport.seatNumber,
                  "onUpdate:modelValue": $event => ((transport.seatNumber) = $event),
                  placeholder: "e.g., 12A",
                  label: "Seat/Vehicle Number (Optional)"
                }, null, _parent, _scopeId));
                _push(`<div class="grid grid-cols-2 gap-4" data-v-76ca35d2${_scopeId}>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'cost',
                  modelValue: transport.cost,
                  "onUpdate:modelValue": $event => ((transport.cost) = $event),
                  modelModifiers: { number: true },
                  type: "number",
                  placeholder: "Cost",
                  label: "Cost",
                  prefix: "₱",
                  min: "0"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Select, {
                  modelValue: transport.currency,
                  "onUpdate:modelValue": $event => ((transport.currency) = $event),
                  id: `transport-currency-${transport.id}`,
                  label: "Currency",
                  options: [
                  { label: 'PHP', value: 'PHP' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' }
                ]
                }, null, _parent, _scopeId));
                _push(`</div>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'notes',
                  modelValue: transport.notes,
                  "onUpdate:modelValue": $event => ((transport.notes) = $event),
                  placeholder: "Any specific notes for this segment...",
                  label: "Notes (Optional)"
                }, null, _parent, _scopeId));
                _push(`<div class="flex justify-end mt-2" data-v-76ca35d2${_scopeId}>`);
                if ($data.localTransports.length > 1) {
                  _push(ssrRenderComponent(_component_Button, {
                    onClick: $event => ($options.removeTransportRow(transport.id)),
                    variant: "ghost"
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        _push(` Delete Segment `);
                      } else {
                        return [
                          createTextVNode(" Delete Segment ")
                        ]
                      }
                    }),
                    _: 2
                  }, _parent, _scopeId));
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Select, {
                      modelValue: transport.mode,
                      "onUpdate:modelValue": $event => ((transport.mode) = $event),
                      id: `transport-mode-${transport.id}`,
                      label: "Mode of Transport",
                      placeholder: "Enter/Select Mode",
                      options: [
                { label: 'Flight', value: 'Flight' },
                { label: 'Bus', value: 'Bus' },
                { label: 'Train', value: 'Train' },
                { label: 'Car', value: 'Car' },
                { label: 'Ferry', value: 'Ferry' },
                { label: 'Taxi/Ride-share', value: 'Taxi/Ride-share' },
                { label: 'Other', value: 'Other' }
              ]
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "id"]),
                    createVNode(_component_Input, {
                      id: index + 'location-departure',
                      modelValue: transport.departureLocation,
                      "onUpdate:modelValue": $event => ((transport.departureLocation) = $event),
                      placeholder: "e.g., NAIA Terminal 3",
                      label: "Departure Location"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_Input, {
                        id: index + 'date-departure',
                        modelValue: transport.departureDate,
                        "onUpdate:modelValue": $event => ((transport.departureDate) = $event),
                        type: "date",
                        label: "Departure Date"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Input, {
                        id: index + 'time-departure',
                        modelValue: transport.departureTime,
                        "onUpdate:modelValue": $event => ((transport.departureTime) = $event),
                        type: "time",
                        label: "Departure Time"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_Input, {
                      id: index + 'location-arrival',
                      modelValue: transport.arrivalLocation,
                      "onUpdate:modelValue": $event => ((transport.arrivalLocation) = $event),
                      placeholder: "e.g., Baguio City Terminal",
                      label: "Arrival Location"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_Input, {
                        id: index + 'date-arrival',
                        modelValue: transport.arrivalDate,
                        "onUpdate:modelValue": $event => ((transport.arrivalDate) = $event),
                        type: "date",
                        label: "Arrival Date (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Input, {
                        id: index + 'time-arrival',
                        modelValue: transport.arrivalTime,
                        "onUpdate:modelValue": $event => ((transport.arrivalTime) = $event),
                        type: "time",
                        label: "Arrival Time (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_Input, {
                      id: index + 'booking-reference',
                      modelValue: transport.bookingRef,
                      "onUpdate:modelValue": $event => ((transport.bookingRef) = $event),
                      placeholder: "e.g., ABC123DEF",
                      label: "Booking Reference (Optional)"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_Input, {
                      id: index + 'seat-number',
                      modelValue: transport.seatNumber,
                      "onUpdate:modelValue": $event => ((transport.seatNumber) = $event),
                      placeholder: "e.g., 12A",
                      label: "Seat/Vehicle Number (Optional)"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_Input, {
                        id: index + 'cost',
                        modelValue: transport.cost,
                        "onUpdate:modelValue": $event => ((transport.cost) = $event),
                        modelModifiers: { number: true },
                        type: "number",
                        placeholder: "Cost",
                        label: "Cost",
                        prefix: "₱",
                        min: "0"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Select, {
                        modelValue: transport.currency,
                        "onUpdate:modelValue": $event => ((transport.currency) = $event),
                        id: `transport-currency-${transport.id}`,
                        label: "Currency",
                        options: [
                  { label: 'PHP', value: 'PHP' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' }
                ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "id"])
                    ]),
                    createVNode(_component_Input, {
                      id: index + 'notes',
                      modelValue: transport.notes,
                      "onUpdate:modelValue": $event => ((transport.notes) = $event),
                      placeholder: "Any specific notes for this segment...",
                      label: "Notes (Optional)"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "flex justify-end mt-2" }, [
                      ($data.localTransports.length > 1)
                        ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            onClick: $event => ($options.removeTransportRow(transport.id)),
                            variant: "ghost"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete Segment ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
        if ($data.localTransports.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg" data-v-76ca35d2${
            _scopeId
          }><i class="ph ph-train-simple text-4xl mb-2" data-v-76ca35d2${
            _scopeId
          }></i><p class="text-center" data-v-76ca35d2${
            _scopeId
          }>No transportation segments added yet. Click &#39;+ Add Segment&#39; to plan your journey!</p>`);
          _push(ssrRenderComponent(_component_Button, {
            class: "mt-4",
            onClick: $options.addTransportRow
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`Add First Segment`);
              } else {
                return [
                  createTextVNode("Add First Segment")
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full mt-6" data-v-76ca35d2${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveTransports
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Save Transportation`);
            } else {
              return [
                createTextVNode("Save Transportation")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-bus" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Transportation"),
                createVNode(_component_Tag, {
                  label: "+ Add Segment",
                  mode: "button",
                  onClick: $options.addTransportRow
                }, null, 8, ["onClick"])
              ]),
              createVNode("button", {
                onClick: $event => (_ctx.$emit('update:showSheet', false)),
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" }, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.localTransports, (transport, index) => {
                return (openBlock(), createBlock(_component_AdvInput, {
                  key: transport.id,
                  summary: $options.getTransportSummary(transport),
                  label: `Segment ${index + 1}`,
                  icon: $options.getTransportIcon(transport.mode),
                  onRemove: $event => ($options.removeTransportRow(transport.id)),
                  removable: ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                      createVNode(_component_Select, {
                        modelValue: transport.mode,
                        "onUpdate:modelValue": $event => ((transport.mode) = $event),
                        id: `transport-mode-${transport.id}`,
                        label: "Mode of Transport",
                        placeholder: "Enter/Select Mode",
                        options: [
                { label: 'Flight', value: 'Flight' },
                { label: 'Bus', value: 'Bus' },
                { label: 'Train', value: 'Train' },
                { label: 'Car', value: 'Car' },
                { label: 'Ferry', value: 'Ferry' },
                { label: 'Taxi/Ride-share', value: 'Taxi/Ride-share' },
                { label: 'Other', value: 'Other' }
              ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "id"]),
                      createVNode(_component_Input, {
                        id: index + 'location-departure',
                        modelValue: transport.departureLocation,
                        "onUpdate:modelValue": $event => ((transport.departureLocation) = $event),
                        placeholder: "e.g., NAIA Terminal 3",
                        label: "Departure Location"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode(_component_Input, {
                          id: index + 'date-departure',
                          modelValue: transport.departureDate,
                          "onUpdate:modelValue": $event => ((transport.departureDate) = $event),
                          type: "date",
                          label: "Departure Date"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_Input, {
                          id: index + 'time-departure',
                          modelValue: transport.departureTime,
                          "onUpdate:modelValue": $event => ((transport.departureTime) = $event),
                          type: "time",
                          label: "Departure Time"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_Input, {
                        id: index + 'location-arrival',
                        modelValue: transport.arrivalLocation,
                        "onUpdate:modelValue": $event => ((transport.arrivalLocation) = $event),
                        placeholder: "e.g., Baguio City Terminal",
                        label: "Arrival Location"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode(_component_Input, {
                          id: index + 'date-arrival',
                          modelValue: transport.arrivalDate,
                          "onUpdate:modelValue": $event => ((transport.arrivalDate) = $event),
                          type: "date",
                          label: "Arrival Date (Optional)"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_Input, {
                          id: index + 'time-arrival',
                          modelValue: transport.arrivalTime,
                          "onUpdate:modelValue": $event => ((transport.arrivalTime) = $event),
                          type: "time",
                          label: "Arrival Time (Optional)"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_Input, {
                        id: index + 'booking-reference',
                        modelValue: transport.bookingRef,
                        "onUpdate:modelValue": $event => ((transport.bookingRef) = $event),
                        placeholder: "e.g., ABC123DEF",
                        label: "Booking Reference (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Input, {
                        id: index + 'seat-number',
                        modelValue: transport.seatNumber,
                        "onUpdate:modelValue": $event => ((transport.seatNumber) = $event),
                        placeholder: "e.g., 12A",
                        label: "Seat/Vehicle Number (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode(_component_Input, {
                          id: index + 'cost',
                          modelValue: transport.cost,
                          "onUpdate:modelValue": $event => ((transport.cost) = $event),
                          modelModifiers: { number: true },
                          type: "number",
                          placeholder: "Cost",
                          label: "Cost",
                          prefix: "₱",
                          min: "0"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_Select, {
                          modelValue: transport.currency,
                          "onUpdate:modelValue": $event => ((transport.currency) = $event),
                          id: `transport-currency-${transport.id}`,
                          label: "Currency",
                          options: [
                  { label: 'PHP', value: 'PHP' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' }
                ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "id"])
                      ]),
                      createVNode(_component_Input, {
                        id: index + 'notes',
                        modelValue: transport.notes,
                        "onUpdate:modelValue": $event => ((transport.notes) = $event),
                        placeholder: "Any specific notes for this segment...",
                        label: "Notes (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "flex justify-end mt-2" }, [
                        ($data.localTransports.length > 1)
                          ? (openBlock(), createBlock(_component_Button, {
                              key: 0,
                              onClick: $event => ($options.removeTransportRow(transport.id)),
                              variant: "ghost"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete Segment ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"]))
                          : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["summary", "label", "icon", "onRemove"]))
              }), 128)),
              ($data.localTransports.length === 0)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg"
                  }, [
                    createVNode("i", { class: "ph ph-train-simple text-4xl mb-2" }),
                    createVNode("p", { class: "text-center" }, "No transportation segments added yet. Click '+ Add Segment' to plan your journey!"),
                    createVNode(_component_Button, {
                      class: "mt-4",
                      onClick: $options.addTransportRow
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Add First Segment")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]))
                : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "w-full mt-6" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.saveTransports
              }, {
                default: withCtx(() => [
                  createTextVNode("Save Transportation")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetTransportation.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};
const SheetTransportation = /*#__PURE__*/_export_sfc(_sfc_main$4, [['ssrRender',_sfc_ssrRender$4],['__scopeId',"data-v-76ca35d2"]]);

const _sfc_main$3 = {
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
    // and containing an array of roles, plus a list of available companions.
    modelValue: {
      type: Object,
      default: () => ({
        showSheet: false,
        roles: [],
        companions: [], // This prop will be used to populate the assignee dropdown
        selfName: 'Me', // A default for the user themselves
      }),
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      // Create a local copy of roles to allow direct manipulation
      localRoles: [],
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // Generate options for the assignee dropdown
    assigneeOptions() {
      const options = [{ label: 'Unassigned', value: null }]; // Option for no one assigned
      // Add 'Me' option
      options.push({ label: this.modelValue.selfName || 'Me', value: 'self' });

      // Add companions from the modelValue prop
      if (this.modelValue.companions && Array.isArray(this.modelValue.companions)) {
        this.modelValue.companions.forEach(companion => {
          if (companion.id && companion.name) {
            options.push({ label: companion.name, value: companion.id });
          }
        });
      }
      return options;
    }
  },

  watch: {
    // Watch the prop and initialize localRoles when it changes
    'modelValue.roles': {
      immediate: true, // Run handler immediately on component creation
      deep: true,      // Watch nested properties of modelValue.roles
      handler(newRoles) {
        // Deep copy to avoid mutating the prop directly
        this.localRoles = newRoles ? newRoles.map(r => ({ ...r })) : [];
        // Add a default row if no roles exist and sheet is being opened
        if (this.showSheet && this.localRoles.length === 0) {
          this.addRoleRow();
        }
      }
    },
    // Watch showSheet to add a new role row if the sheet is opened and there are no roles
    showSheet(newVal) {
      if (newVal && this.localRoles.length === 0) {
        this.addRoleRow();
      }
    }
  },

  methods: {
    // Generates a unique ID for new role entries
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    // Adds a new blank role object to the localRoles array
    addRoleRow() {
      this.localRoles.push({
        id: this.generateUniqueId(),
        name: '',
        assigneeId: null, // Default to unassigned
        notes: '',
      });
    },
    // Removes a role entry from the localRoles array by ID
    removeRoleRow(id) {
      this.localRoles = this.localRoles.filter(role => role.id !== id);
      // Optional: if all removed, add a new blank row for convenience
      if (this.localRoles.length === 0) {
        this.addRoleRow();
      }
    },
    // Creates a summary string for the AdvInput component header
    getRoleSummary(role) {
      const assigneeName = this.assigneeOptions.find(option => option.value === role.assigneeId)?.label || 'Unassigned';
      if (role.name) {
        return `${role.name} (${assigneeName})`;
      }
      return `New Role (${assigneeName})`;
    },
    // Emits the updated roles data back to the parent
    saveRoles() {
      // Filter out any completely empty role rows before emitting (only name is required for roles)
      const savedRoles = this.localRoles.filter(r => r.name.trim() !== '');

      this.$emit('update:modelValue', {
        ...this.modelValue, // Keep existing modelValue properties (like showSheet, companions, selfName)
        roles: savedRoles, // Update the roles array
        showSheet: false, // Close the sheet
      });
    }
  },
  mounted() {
    // Initialize with one role if none exist on mount and sheet is visible
    if (this.showSheet && this.localRoles.length === 0) {
      this.addRoleRow();
    }
  }
};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_Tag = resolveComponent("Tag");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Select = resolveComponent("Select");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $options.showSheet,
    "onUpdate:modelValue": $event => (_ctx.$emit('update:modelValue', $event))
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-3e39ef05${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-3e39ef05${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-3e39ef05${
          _scopeId
        }><i class="ph ph-hand-palm" data-v-3e39ef05${
          _scopeId
        }></i> <span class="font-bold" data-v-3e39ef05${
          _scopeId
        }>Trip Roles</span>`);
        _push(ssrRenderComponent(_component_Tag, {
          label: "+ Add Role",
          mode: "button",
          onClick: $options.addRoleRow
        }, null, _parent, _scopeId));
        _push(`</div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-3e39ef05${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-3e39ef05${
          _scopeId
        }></i></button></div><div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" data-v-3e39ef05${
          _scopeId
        }><!--[-->`);
        ssrRenderList($data.localRoles, (role, index) => {
          _push(ssrRenderComponent(_component_AdvInput, {
            key: role.id,
            summary: $options.getRoleSummary(role),
            label: `Role ${index + 1}`,
            icon: "ph-user-list",
            onRemove: $event => ($options.removeRoleRow(role.id)),
            removable: ""
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<div class="flex flex-col gap-4 p-1" data-v-3e39ef05${_scopeId}>`);
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'name',
                  modelValue: role.name,
                  "onUpdate:modelValue": $event => ((role.name) = $event),
                  placeholder: "e.g., Driver, Photographer, Payer",
                  label: "Role Name"
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Select, {
                  modelValue: role.assigneeId,
                  "onUpdate:modelValue": $event => ((role.assigneeId) = $event),
                  id: `role-assignee-${role.id}`,
                  label: "Assigned To",
                  options: $options.assigneeOptions
                }, null, _parent, _scopeId));
                _push(ssrRenderComponent(_component_Input, {
                  id: index + 'notes',
                  modelValue: role.notes,
                  "onUpdate:modelValue": $event => ((role.notes) = $event),
                  placeholder: "e.g., responsible for navigation, handles all payments",
                  label: "Notes (Optional)"
                }, null, _parent, _scopeId));
                _push(`<div class="flex justify-end mt-2" data-v-3e39ef05${_scopeId}>`);
                if ($data.localRoles.length > 1) {
                  _push(ssrRenderComponent(_component_Button, {
                    onClick: $event => ($options.removeRoleRow(role.id)),
                    variant: "ghost"
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        _push(` Delete Role `);
                      } else {
                        return [
                          createTextVNode(" Delete Role ")
                        ]
                      }
                    }),
                    _: 2
                  }, _parent, _scopeId));
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      id: index + 'name',
                      modelValue: role.name,
                      "onUpdate:modelValue": $event => ((role.name) = $event),
                      placeholder: "e.g., Driver, Photographer, Payer",
                      label: "Role Name"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_Select, {
                      modelValue: role.assigneeId,
                      "onUpdate:modelValue": $event => ((role.assigneeId) = $event),
                      id: `role-assignee-${role.id}`,
                      label: "Assigned To",
                      options: $options.assigneeOptions
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "id", "options"]),
                    createVNode(_component_Input, {
                      id: index + 'notes',
                      modelValue: role.notes,
                      "onUpdate:modelValue": $event => ((role.notes) = $event),
                      placeholder: "e.g., responsible for navigation, handles all payments",
                      label: "Notes (Optional)"
                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "flex justify-end mt-2" }, [
                      ($data.localRoles.length > 1)
                        ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            onClick: $event => ($options.removeRoleRow(role.id)),
                            variant: "ghost"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete Role ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
        if ($data.localRoles.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg" data-v-3e39ef05${
            _scopeId
          }><i class="ph ph-users-three text-4xl mb-2" data-v-3e39ef05${
            _scopeId
          }></i><p class="text-center" data-v-3e39ef05${
            _scopeId
          }>No roles defined yet. Click &#39;+ Add Role&#39; to assign responsibilities!</p>`);
          _push(ssrRenderComponent(_component_Button, {
            class: "mt-4",
            onClick: $options.addRoleRow
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`Add First Role`);
              } else {
                return [
                  createTextVNode("Add First Role")
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full mt-6" data-v-3e39ef05${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveRoles
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Save Roles`);
            } else {
              return [
                createTextVNode("Save Roles")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-hand-palm" }),
                createTextVNode(),
                createVNode("span", { class: "font-bold" }, "Trip Roles"),
                createVNode(_component_Tag, {
                  label: "+ Add Role",
                  mode: "button",
                  onClick: $options.addRoleRow
                }, null, 8, ["onClick"])
              ]),
              createVNode("button", {
                onClick: $event => (_ctx.$emit('update:modelValue', { ...$props.modelValue, showSheet: false })),
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" }, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.localRoles, (role, index) => {
                return (openBlock(), createBlock(_component_AdvInput, {
                  key: role.id,
                  summary: $options.getRoleSummary(role),
                  label: `Role ${index + 1}`,
                  icon: "ph-user-list",
                  onRemove: $event => ($options.removeRoleRow(role.id)),
                  removable: ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                      createVNode(_component_Input, {
                        id: index + 'name',
                        modelValue: role.name,
                        "onUpdate:modelValue": $event => ((role.name) = $event),
                        placeholder: "e.g., Driver, Photographer, Payer",
                        label: "Role Name"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_Select, {
                        modelValue: role.assigneeId,
                        "onUpdate:modelValue": $event => ((role.assigneeId) = $event),
                        id: `role-assignee-${role.id}`,
                        label: "Assigned To",
                        options: $options.assigneeOptions
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "id", "options"]),
                      createVNode(_component_Input, {
                        id: index + 'notes',
                        modelValue: role.notes,
                        "onUpdate:modelValue": $event => ((role.notes) = $event),
                        placeholder: "e.g., responsible for navigation, handles all payments",
                        label: "Notes (Optional)"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "flex justify-end mt-2" }, [
                        ($data.localRoles.length > 1)
                          ? (openBlock(), createBlock(_component_Button, {
                              key: 0,
                              onClick: $event => ($options.removeRoleRow(role.id)),
                              variant: "ghost"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete Role ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"]))
                          : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["summary", "label", "onRemove"]))
              }), 128)),
              ($data.localRoles.length === 0)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center justify-center text-zinc-500 p-8 border border-zinc-200 rounded-lg"
                  }, [
                    createVNode("i", { class: "ph ph-users-three text-4xl mb-2" }),
                    createVNode("p", { class: "text-center" }, "No roles defined yet. Click '+ Add Role' to assign responsibilities!"),
                    createVNode(_component_Button, {
                      class: "mt-4",
                      onClick: $options.addRoleRow
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Add First Role")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]))
                : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "w-full mt-6" }, [
              createVNode(_component_Button, {
                class: "w-full",
                onClick: $options.saveRoles
              }, {
                default: withCtx(() => [
                  createTextVNode("Save Roles")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetRoles.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const SheetRoles = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3],['__scopeId',"data-v-3e39ef05"]]);

const _sfc_main$2 = {
  components: {
    Sheet,
    Tag,
    Button,
    Input,
    AdvInput,
  },

  props: {
    // modelValue is an object: { showSheet: boolean, day: string (e.g., '2025-05-14'), note: object|null }
    modelValue: {
      type: Object,
      default: () => ({ showSheet: false, day: '', note: null }),
      required: true,
    }
  },

  emits: ['update:modelValue', 'note-saved', 'note-deleted'],

  data() {
    return {
      localNote: this.getInitialNoteState(),
    };
  },

  computed: {
    showSheet() {
      return this.modelValue.showSheet;
    },
    // Formatted date for the header display
    formattedDate() {
      if (this.modelValue.day) {
        try {
          const date = new Date(this.modelValue.day + 'T00:00:00'); // Add T00:00:00 to avoid timezone issues
          return date.toLocaleDateString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch (error) {
          console.error("Error formatting date:", error);
          return this.modelValue.day; // Fallback to raw date string
        }
      }
      return 'N/A';
    },
  },

  watch: {
    // Watch modelValue.showSheet to reset form or load data when sheet opens/closes
    'modelValue.showSheet': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // If a specific note is passed for editing, load it
          if (this.modelValue.note) {
            this.localNote = { ...this.modelValue.note };
          } else {
            // Otherwise, reset to initial state for a new note
            this.localNote = this.getInitialNoteState();
          }
        }
      }
    }
  },

  methods: {
    generateUniqueId() {
      return Date.now() + Math.random().toString(36).substring(2, 9);
    },
    getInitialNoteState() {
      return {
        id: this.generateUniqueId(),
        day: this.modelValue.day, // Associate the note with the day
        title: '',
        content: '',
      };
    },
    cancelNote() {
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false });
    },
    saveNote() {
      if (!this.localNote.title.trim()) {
        alert('Note title is required!');
        return;
      }
      // Ensure the note is associated with the correct day
      this.localNote.day = this.modelValue.day;

      this.$emit('note-saved', this.localNote); // Emit the full note object
      this.$emit('update:modelValue', { ...this.modelValue, showSheet: false }); // Close the sheet
    },
    deleteNote() {
      if (confirm('Are you sure you want to delete this note?')) {
        this.$emit('note-deleted', this.localNote.id); // Emit the ID of the note to be deleted
        this.$emit('update:modelValue', { ...this.modelValue, showSheet: false }); // Close the sheet
      }
    }
  }
};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Sheet = resolveComponent("Sheet");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_Sheet, mergeProps({
    "model-value": $options.showSheet,
    "onUpdate:modelValue": $event => (_ctx.$emit('update:modelValue', $event))
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" data-v-b1f489ca${
          _scopeId
        }><div class="flex items-center justify-between w-full mb-6" data-v-b1f489ca${
          _scopeId
        }><div class="flex gap-2 items-center justify-center text-3xl text-zinc-800" data-v-b1f489ca${
          _scopeId
        }><i class="ph ph-note-pencil" data-v-b1f489ca${
          _scopeId
        }></i><span class="font-bold" data-v-b1f489ca${
          _scopeId
        }>Day Note for ${
          ssrInterpolate($options.formattedDate)
        }</span></div><button class="text-zinc-500 hover:text-zinc-700 transition" data-v-b1f489ca${
          _scopeId
        }><i class="ph ph-x text-2xl" data-v-b1f489ca${
          _scopeId
        }></i></button></div><div class="flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" data-v-b1f489ca${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $data.localNote.title || 'Enter a title for this day\'s note',
          label: "Note Title",
          icon: "ph-bookmark-simple"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-b1f489ca${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localNote.title,
                "onUpdate:modelValue": $event => (($data.localNote.title) = $event),
                placeholder: "e.g., Important Reminders, Day 3 Summary",
                label: "Title"
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localNote.title,
                    "onUpdate:modelValue": $event => (($data.localNote.title) = $event),
                    placeholder: "e.g., Important Reminders, Day 3 Summary",
                    label: "Title"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_AdvInput, {
          summary: $data.localNote.content ? $data.localNote.content.substring(0, 50) + '...' : 'Add details for this note',
          label: "Note Details",
          icon: "ph-notepad"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="flex flex-col gap-4 p-1" data-v-b1f489ca${_scopeId}>`);
              _push(ssrRenderComponent(_component_Input, {
                modelValue: $data.localNote.content,
                "onUpdate:modelValue": $event => (($data.localNote.content) = $event),
                type: "textarea",
                rows: "8",
                placeholder: "Write down anything important for this day: reminders, observations, things to remember, etc."
              }, null, _parent, _scopeId));
              _push(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                  createVNode(_component_Input, {
                    modelValue: $data.localNote.content,
                    "onUpdate:modelValue": $event => (($data.localNote.content) = $event),
                    type: "textarea",
                    rows: "8",
                    placeholder: "Write down anything important for this day: reminders, observations, things to remember, etc."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`<div class="flex justify-end mt-4" data-v-b1f489ca${_scopeId}>`);
        if ($props.modelValue.note && $props.modelValue.note.id) {
          _push(ssrRenderComponent(_component_Button, {
            onClick: $options.deleteNote,
            variant: "ghost"
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(` Delete Note `);
              } else {
                return [
                  createTextVNode(" Delete Note ")
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="w-full mt-6 flex gap-4" data-v-b1f489ca${_scopeId}>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: $options.cancelNote,
          variant: "secondary",
          class: "flex-1"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          onClick: $options.saveNote,
          disabled: !$data.localNote.title.trim(),
          class: "flex-1"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Save Note `);
            } else {
              return [
                createTextVNode(" Save Note ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start h-full md:px-6 md:py-8 px-1 py-2" }, [
            createVNode("div", { class: "flex items-center justify-between w-full mb-6" }, [
              createVNode("div", { class: "flex gap-2 items-center justify-center text-3xl text-zinc-800" }, [
                createVNode("i", { class: "ph ph-note-pencil" }),
                createVNode("span", { class: "font-bold" }, "Day Note for " + toDisplayString($options.formattedDate), 1)
              ]),
              createVNode("button", {
                onClick: $event => (_ctx.$emit('update:modelValue', { ...$props.modelValue, showSheet: false })),
                class: "text-zinc-500 hover:text-zinc-700 transition"
              }, [
                createVNode("i", { class: "ph ph-x text-2xl" })
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "flex-grow w-full pr-2 flex flex-col gap-3 custom-scrollbar" }, [
              createVNode(_component_AdvInput, {
                summary: $data.localNote.title || 'Enter a title for this day\'s note',
                label: "Note Title",
                icon: "ph-bookmark-simple"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localNote.title,
                      "onUpdate:modelValue": $event => (($data.localNote.title) = $event),
                      placeholder: "e.g., Important Reminders, Day 3 Summary",
                      label: "Title"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode(_component_AdvInput, {
                summary: $data.localNote.content ? $data.localNote.content.substring(0, 50) + '...' : 'Add details for this note',
                label: "Note Details",
                icon: "ph-notepad"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-4 p-1" }, [
                    createVNode(_component_Input, {
                      modelValue: $data.localNote.content,
                      "onUpdate:modelValue": $event => (($data.localNote.content) = $event),
                      type: "textarea",
                      rows: "8",
                      placeholder: "Write down anything important for this day: reminders, observations, things to remember, etc."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["summary"]),
              createVNode("div", { class: "flex justify-end mt-4" }, [
                ($props.modelValue.note && $props.modelValue.note.id)
                  ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      onClick: $options.deleteNote,
                      variant: "ghost"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delete Note ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]))
                  : createCommentVNode("", true)
              ])
            ]),
            createVNode("div", { class: "w-full mt-6 flex gap-4" }, [
              createVNode(_component_Button, {
                onClick: $options.cancelNote,
                variant: "secondary",
                class: "flex-1"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_Button, {
                onClick: $options.saveNote,
                disabled: !$data.localNote.title.trim(),
                class: "flex-1"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save Note ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/components/sheets/SheetDayNote.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const SheetDayNote = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2],['__scopeId',"data-v-b1f489ca"]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SheetMap",
  props: {
    showSheet: { type: Boolean, default: false },
    activities: { type: Array, required: true }
  },
  emits: ["update:showSheet"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const closeSheetViaProp = () => {
      emit("update:showSheet", false);
      clearMap();
    };
    let map = null;
    const markers = ref([]);
    const loadLeaflet = async () => {
      if (window.L) return window.L;
      await Promise.all([
        Promise.resolve({                               }).then(() => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }),
        import('leaflet')
      ]);
      if (!document.getElementById("leaflet-script")) {
        const script = document.createElement("script");
        script.id = "leaflet-script";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        document.head.appendChild(script);
        await new Promise((resolve) => script.onload = resolve);
      }
      return window.L;
    };
    const initMapAndMarkers = async () => {
      const L = await loadLeaflet();
      const activities = [...props.activities];
      let activitiesWithCoords = activities.filter(
        (a) => a.coordinates && a.coordinates.latitude && a.coordinates.longitude
      );
      const missingCoords = activities.filter((a) => !a.coordinates);
      if (missingCoords.length > 0) {
        for (const a of missingCoords) {
          const response = await fetch(`/api/v1/geo-location`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(a.location)
          });
          if (!response.ok) continue;
          a.coordinates = await response.json();
          activitiesWithCoords.push(a);
        }
      }
      if (activitiesWithCoords.length === 0) return clearMap();
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;
      if (!map) {
        map = L.map(mapContainer, {
          zoomControl: false,
          attributionControl: false
        });
      } else {
        clearMarkers();
      }
      const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "\xA9 OpenStreetMap"
      });
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
          attribution: "Tiles \xA9 Esri"
        }
      );
      const hybridLabels = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
          attribution: "\xA9 Esri"
        }
      );
      const hybridLayer = L.layerGroup([satelliteLayer, hybridLabels]);
      hybridLayer.addTo(map);
      L.control.layers(
        {
          Street: streetLayer,
          Satellite: satelliteLayer,
          Hybrid: hybridLayer
        },
        {},
        { position: "bottomright" }
      ).addTo(map);
      function getGoogleMapsLink(activity) {
        if (activity.coordinates) {
          const lat = activity.coordinates.latitude;
          const lng = activity.coordinates.longitude;
          return `https://www.google.com/maps/@${lat},${lng},19z`;
        }
        return "#";
      }
      markers.value = activitiesWithCoords.map((activity) => {
        const lat = activity.coordinates.latitude;
        const lng = activity.coordinates.longitude;
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
      <div class="p-2">
        <strong>${activity.title}</strong><br>
        ${activity.location}<br>
        <a href="${getGoogleMapsLink(activity)}" target="_blank" style="color:#1a73e8;">
          View in Google Maps
        </a>
      </div>
    `);
        return { marker, activity };
      });
      const bounds = L.latLngBounds(markers.value.map((m) => m.marker.getLatLng()));
      map.fitBounds(bounds, { padding: [50, 50] });
    };
    const focusActivity = (activity) => {
      if (!map) return;
      console.log(markers.value);
      console.log(activity);
      const markerObj = markers.value.find((m) => m.activity.id === activity.id);
      console.log(markerObj);
      if (markerObj) {
        const { marker } = markerObj;
        const latLng = marker.getLatLng();
        map.setView(latLng, 16, { animate: true });
        marker.openPopup();
      }
    };
    const clearMap = () => {
      if (map) {
        map.remove();
        map = null;
      }
      markers.value = [];
    };
    const clearMarkers = () => {
      markers.value.forEach((m) => m.marker.remove());
      markers.value = [];
    };
    const showSheet = computed(() => props.showSheet);
    watch(showSheet, (status) => {
      if (status) initMapAndMarkers();
      else clearMap();
    });
    onBeforeUnmount(() => clearMap());
    const __returned__ = { props, emit, closeSheetViaProp, get map() {
      return map;
    }, set map(v) {
      map = v;
    }, markers, loadLeaflet, initMapAndMarkers, focusActivity, clearMap, clearMarkers, showSheet, Sheet };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["Sheet"], mergeProps({
    "padding-on": false,
    "model-value": $setup.showSheet,
    "onUpdate:modelValue": $setup.closeSheetViaProp
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="relative flex flex-col items-start grow h-full rounded-t-xl overflow-hidden" data-v-f32b9186${_scopeId}><div class="z-10 absolute top-5 left-5 flex gap-2 items-center justify-center text-3xl p-2 rounded-xl bg-white text-zinc-700" data-v-f32b9186${_scopeId}><i class="ph ph-globe-hemisphere-west" data-v-f32b9186${_scopeId}></i><span class="font-bold" data-v-f32b9186${_scopeId}>Map</span></div><button class="z-10 absolute top-5 right-5 cursor-pointer" data-v-f32b9186${_scopeId}><div class="h-10 w-10 rounded-full flex items-center justify-center bg-white" data-v-f32b9186${_scopeId}><i class="text-black ph ph-x text-2xl" data-v-f32b9186${_scopeId}></i></div></button><div class="w-full grow flex flex-col h-full top-0 z-0" data-v-f32b9186${_scopeId}><div id="map" class="h-full flex grow" data-v-f32b9186${_scopeId}></div></div><div class="p-3 w-full" data-v-f32b9186${_scopeId}><div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar" data-v-f32b9186${_scopeId}><!--[-->`);
        ssrRenderList($props.activities, (activity, index) => {
          _push2(`<div class="flex-shrink-0 w-60 p-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 cursor-pointer transition flex items-center gap-3" data-v-f32b9186${_scopeId}><span class="flex-shrink-0 text-zinc-500 text-3xl font-medium" data-v-f32b9186${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="flex flex-col min-w-0" data-v-f32b9186${_scopeId}><div class="font-semibold text-zinc-800 text-sm truncate" title="{{ activity.title }}" data-v-f32b9186${_scopeId}>${ssrInterpolate(activity.title)}</div><div class="text-xs text-zinc-500 truncate" title="{{ activity.location }}" data-v-f32b9186${_scopeId}>${ssrInterpolate(activity.location)}</div></div></div>`);
        });
        _push2(`<!--]--></div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "relative flex flex-col items-start grow h-full rounded-t-xl overflow-hidden" }, [
            createVNode("div", { class: "z-10 absolute top-5 left-5 flex gap-2 items-center justify-center text-3xl p-2 rounded-xl bg-white text-zinc-700" }, [
              createVNode("i", { class: "ph ph-globe-hemisphere-west" }),
              createVNode("span", { class: "font-bold" }, "Map")
            ]),
            createVNode("button", {
              onClick: $setup.closeSheetViaProp,
              class: "z-10 absolute top-5 right-5 cursor-pointer"
            }, [
              createVNode("div", { class: "h-10 w-10 rounded-full flex items-center justify-center bg-white" }, [
                createVNode("i", { class: "text-black ph ph-x text-2xl" })
              ])
            ]),
            createVNode("div", { class: "w-full grow flex flex-col h-full top-0 z-0" }, [
              createVNode("div", {
                id: "map",
                class: "h-full flex grow"
              })
            ]),
            createVNode("div", { class: "p-3 w-full" }, [
              createVNode("div", { class: "flex gap-3 overflow-x-auto pb-2 no-scrollbar" }, [
                (openBlock(true), createBlock(Fragment, null, renderList($props.activities, (activity, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "flex-shrink-0 w-60 p-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 cursor-pointer transition flex items-center gap-3",
                    onClick: ($event) => $setup.focusActivity(activity)
                  }, [
                    createVNode("span", { class: "flex-shrink-0 text-zinc-500 text-3xl font-medium" }, toDisplayString(index + 1), 1),
                    createVNode("div", { class: "flex flex-col min-w-0" }, [
                      createVNode("div", {
                        class: "font-semibold text-zinc-800 text-sm truncate",
                        title: "{{ activity.title }}"
                      }, toDisplayString(activity.title), 1),
                      createVNode("div", {
                        class: "text-xs text-zinc-500 truncate",
                        title: "{{ activity.location }}"
                      }, toDisplayString(activity.location), 1)
                    ])
                  ], 8, ["onClick"]);
                }), 128))
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/domains/trip-details/components/sheets/SheetMap.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SheetMap = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f32b9186"]]);

const _sfc_main = {
  components: {
    Spinner,
    AdvSquareCard,
    Card,
    Tag,
    Button,
    PaymentButton,
    SheetTripSettings,
    SheetPreparation,
    SheetAddActivity,
    SheetEditActivity,
    SheetViewActivity,
    SheetAccom,
    // Ensure all sheets are registered
    SheetCompanions,
    SheetBudget,
    SheetTransportation,
    SheetRoles,
    SheetDayNote,
    SheetMap,
    CardActivity,
    TimelineDot,
    ToastContainer,
    Toast,
    TripDetailsHeader,
    TripSections,
    ActivityTimeline
  },

  props: {
    tripId: {
      type: String,
      required: true
    }
  },

  watch: {
    anySheetOpen(isOpen) {
      if (isOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
  },

  data() {
    return {
      unsubscribeFromTripListener: null,
      user: {},
      dangerToast: {
        message: '',
      },
      successToast: {
        message: '',
      },
      isLoading: true,
      useDb: useDbStore.get(), // Initialize with the current state
      unsubscribeFromDbStore: null, // 2. Property to hold the unsubscribe function
      tripConfig: {
        name: '',
        location: '',
        theme: '',
        date: {
          start: new Date,
          end: new Date,
        },
      },
      settingsShowSheet: false,
      preparationShowSheet: false,
      accommodationShowSheet: false,
      companionsShowSheet: false,
      budgetShowSheet: false,
      transportationShowSheet: false,
      mapShowSheet: false,
      rolesShowSheet: false,
      dayNoteShowSheet: false,
      addActivityShowSheet: false,
      editActivityShowSheet: false,
      selectedActivityShowSheet: false,
      settings: {
        showSheet: false,
        trip: {
          name: 'Summer in Baguio City',
          location: "Baguio City",
          theme: 'peach',
          date: {
            start: new Date(),
            end: new Date(),
          },
        }
      },
      ownerUid: '',
      preparation: {
        showSheet: false,
        preparationsChecklist: [],
      },
      accommodation: {
        showSheet: false,
        name: '',
        type: '',

        location: '',
        numberOfRooms: 0,
        totalCost: 0,
        // currency: 'PHP', // If you plan to make currency selectable or dynamic

        checkInTime: '15:00', // Common default check-in time
        checkOutTime: '11:00', // Common default check-out time

        dates: {
          start: '',
          end: '',
        }

      },
      companions: {
        showSheet: false,
      },
      budget: {
        showSheet: false,
        totalBudget: null,
        currency: 'PHP', // Default currency
        categories: []
      },
      transportation: {
        showSheet: false,
      },
      roles: {
        showSheet: false,
      },
      dayNote: {
        showSheet: false,
      },
      addActivity: {
        showSheet: false,
      },
      activities: [],
      editActivity: {
        showSheet: false,
      },
      selectedActivity: {
        showSheet: false,
        activity: {
          id: 'act_foodie_002',
          name: 'Strawberry Picking at La Trinidad Farm',
          time: '08:30',
          date: '2025-06-16',
          location: 'Strawberry Farm, La Trinidad, Benguet',
          budget: 350.00,
          budgetCurrency: 'PHP',
          budgetNotes: 'Per basket (est.), transportation not included',
          description: 'Head early to the famous Strawberry Farm in La Trinidad, just outside Baguio, to pick fresh strawberries. Enjoy the cool morning air and local produce.',
          icon: 'ph-apple-bin',
        }
      },

      // Data for the progress bar
      planningProgress: {
        completed: 1, // Example: based on 4/7 sections complete
        total: 7,
      },

      onlineCompanions: [],
      unsubscribeFromPresenceListener: null,
    }
  },
  computed: {

    progressOfPlanning() {
      const conditions = [
        this.activities?.length > 0,
        this.budget.categories?.length > 0,
        this.companions?.length > 1,
        this.preparation?.preparationsChecklist.length > 0,
        !!this.accommodation?.name,
        // Add other conditions here
      ];

      const completed = conditions.filter(Boolean).length;

      return {
        completed: completed,
        total: 7
      };
    },

    cardClass() {
      switch (this.tripConfig.theme) {
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

    anySheetOpen() {
      return this.settingsShowSheet ||
          this.preparationShowSheet ||
          this.accommodationShowSheet ||
          this.companionsShowSheet ||
          this.budgetShowSheet ||
          // this.transportationShowSheet ||
          // this.rolesShowSheet ||
          // this.dayNoteShowSheet ||
          this.addActivityShowSheet ||
          this.editActivityShowSheet ||
          this.selectedActivityShowSheet ||
          this.mapShowSheet;
    },
  },
  methods: {
    copyUrlToClipboard() {
      try {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          this.successToast.message = 'URL copied to clipboard!';
        }).catch(err => {
          throw new Error(err);
        });
      } catch (err) {
        console.error('Failed to copy URL:', err);
        this.dangerToast.message = 'Failed to copy URL. Please try again.';
      }
    },

    showViewActivitySheet(activity) {
      this.selectedActivityShowSheet = true;
      this.selectedActivity.activity = activity;
    },

    async deleteTrip() {
      if (confirm("Do you want to delete this trip?")) {
        const response = await fetch(`/api/v1/trip?tripId=${this.tripId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.json();
          console.error(error.message);
          this.dangerToast.message = error.message;
          return
        }

        this.successToast.message = 'Trip Deleted!';

        // removeTrip(this.index)
        window.location.href = '/trips';
      }
    },

    async companionAdded() {
      await this.fetchTrip();
    },

    async companionRemoved() {
      await this.fetchTrip();
    },

    async updateActivity(activity) {
      try {
        const response = await fetch('/api/v1/activity', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activity)
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error updating an activity:', error.message);
          throw new Error(`Error updating an activity: ${error.message}`)
        }

        const jsonResponse = await response.json();

        // -- GET THE INDEX OF THE OLD ACTIVITY
        const indexOfOriginal = this.activities.findIndex(activity => {
          return activity.id === jsonResponse?.updatedActivity?.id
        });

        this.activities[indexOfOriginal] = jsonResponse.updatedActivity;

        this.successToast.message = jsonResponse.message;
      } catch (error) {
        console.error(error);
        this.dangerToast.message = error;
      }
    },

    editSelectedActivity(activity) {
      this.editActivityShowSheet = true;
      this.editActivity = {activity: activity};
    },

    async deleteActivity(id) {
      try {
        // -- SEND DELETE CALL TO BACKEND
        const response = await fetch(`/api/v1/activity?activityId=${id}&tripId=${this.tripId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Error delete activity: ${error.message}`)
        }

        const jsonResponse = await response.json();

        // -- SUCCESS TOAST
        this.successToast.message = jsonResponse.message;

        this.activities = this.activities.filter(activity => activity.id !== id);
      } catch (error) {
        console.error(error);
      }
    },

    async addNewActivity(activity) {
      try {
        const response = await fetch('/api/v1/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...activity, tripId: this.tripId})
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error saving activity:', error.message);
          throw new Error(`Error saving activity: ${error.message}`)
        }

        const jsonResponse = await response.json();

        // -- SAVE THE NEW ACTIVITY TO THE ACTIVITIES
        this.activities.push(jsonResponse.createdActivity);

        // -- SUCCESS TOAST
        this.successToast.message = jsonResponse.message;

      } catch (error) {
        console.error(error);
        this.dangerToast.message = error;
      }
      // try {
      //   this.activities.push(activity)
      //   this.successToast.message = 'Activity Added'
      //   setActivities(this.index, this.activities)
      // } catch (e) {
      //   this.dangerToast.message = `${e}`
      // }
    },

    hasPayload(payload) {
      return payload === null || typeof payload === 'undefined'
    },

    initTripConfig(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.tripConfig.name = payload.trip.name;
        this.tripConfig.location = payload.trip.location;
        this.tripConfig.date.start = payload.trip.start_date;
        this.tripConfig.date.end = payload.trip.end_date;
        this.tripConfig.theme = payload.trip.theme;
      } catch (err) {
        console.error(err);
      }
    },

    initBudget(payload) {
      try {
        this.budget = payload.trip.budget;
      } catch (err) {
        console.error(err);
      }
    },

    initAccommodation(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.accommodation = payload?.trip?.accommodation ? payload.trip.accommodation : this.accommodation;
        this.accommodation.location = payload.trip.location;
        this.accommodation.dates = {start: payload.trip.start_date, end: payload.trip.end_date};
      } catch (err) {
        console.error(err);
      }
    },

    initSettings(payload) {
      this.settings.trip.name = payload.trip.name;
      this.settings.trip.date = {start: payload.trip.start_date, end: payload.trip.end_date};
      this.settings.trip.theme = payload.trip.theme;
      this.settings.trip.location = payload.trip.location;
    },

    initPreparation(payload) {
      if (this.hasPayload(payload)) return;
      try {
        this.preparation = payload.trip.preparation;
      } catch (e) {
        console.error(e);
      }
    },

    initActivities(payload) {
      this.activities = payload.trip.activities;
    },

    async saveSettings(payload) {
      try {
        this.tripConfig.name = payload.name ?? this.tripConfig.name;
        this.tripConfig.location = payload.location ?? this.tripConfig.location;
        this.tripConfig.theme = payload.theme ?? this.tripConfig.theme;

        // More explicit update for date object, especially if it could be partial
        if (payload.date) { // Only update if payload.date is not null/undefined
          this.tripConfig.date.start = payload.date.start ?? this.tripConfig.date.start;
          this.tripConfig.date.end = payload.date.end ?? this.tripConfig.date.end;
        }

        const response = await fetch('/api/v1/trip', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({tripData: this.tripConfig, tripId: this.tripId})
        });
      } catch (err) {
        console.error('Error at Saving Settings', err);
        this.dangerToast.message = `Error at saving settings.`;
      }
    },

    async fetchUser() {
      const response = await fetch('/api/v1/me');

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      }

      this.user = await response.json();
    },

    setTripConfig(data) {
      this.tripConfig.name = data.name;
      this.tripConfig.location = data.location;
      this.tripConfig.theme = data.theme;
      this.tripConfig.date.start = new Date(data.date.start);
      this.tripConfig.date.end = new Date(data.date.end);
    },

    setTripSettings(data) {
      this.settings.trip = {...this.tripConfig};
    },

    setActivities(data) {
      this.activities = data.activities;
    },

    setPreparation(data) {
      this.preparation.preparationsChecklist = data.tasks;
    },

    setAccommodation(data) {
      try {
        const accommodation = data.accommodations.sort((a, b) => a.createdAt._seconds - b.createdAt._seconds)[data.accommodations.length - 1];
        this.accommodation = {
          ...accommodation,
          dates: {
            start: new Date(accommodation.dates.start),
            end: new Date(accommodation.dates.end)
          }
        };
      } catch (error) {
        console.log(error);
      }
    },

    setBudget(data) {
      this.budget.totalBudget = data.overallBudget;
      this.budget.categories = data.budget;
    },

    setCompanions(data) {
      this.companions = data.companions;
    },

    setOwnerUid(data) {
      this.ownerUid = data.ownerUid;
    },

    async fetchTrip() {
      const response = await fetch(`/api/v1/trip?tripId=${this.tripId}`, {
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      this.setTripConfig(data);
      this.setTripSettings(data);
      this.setActivities(data);
      this.setPreparation(data);
      this.setAccommodation(data);
      this.setBudget(data);
      this.setCompanions(data);
      this.setOwnerUid(data);
    },

    // === NEW METHODS FOR REAL-TIME PRESENCE ===
    /**
     * Creates or updates the user's presence document.
     * This indicates the user is online.
     * @async
     */
    async setPresence() {
      if (!this.user?.uid) return;
      const {doc} = await import('firebase/firestore');
      const {firestore} = await import('../../chunks/client_rclekwYX.mjs');
      const userDocRef = doc(firestore, `trips/${this.tripId}/onlineUsers`, this.user.uid);
      try {
        const {setDoc} = await import ('firebase/firestore');
        await setDoc(userDocRef, {
          uid: this.user.uid,
          name: this.user.displayName || this.user.email,
          photoURL: this.user.photoURL || null,
          lastActive: new Date().toISOString()
        });
      } catch (e) {
        console.error("Error setting presence:", e);
      }
    },
    /**
     * Deletes the user's presence document.
     * This should be called when the user navigates away.
     * @async
     */
    async removePresence() {
      if (!this.user?.uid) return;
      const {doc} = await import('firebase/firestore');
      const {firestore} = await import('../../chunks/client_rclekwYX.mjs');
      const userDocRef = doc(firestore, `trips/${this.tripId}/onlineUsers`, this.user.uid);
      try {

        const {deleteDoc} = await import('firebase/firestore');
        await deleteDoc(userDocRef);
      } catch (e) {
        console.error("Error removing presence:", e);
      }
    },
    /**
     * Sets up the real-time listener for the list of online users.
     */
    async setupPresenceListener() {
      if (!this.tripId) return;

      const {collection, onSnapshot} = await import('firebase/firestore');
      const {firestore} = await import('../../chunks/client_rclekwYX.mjs');
      const onlineUsersCollectionRef = collection(firestore, `trips/${this.tripId}/companions`);
      this.unsubscribeFromPresenceListener = onSnapshot(onlineUsersCollectionRef, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        this.onlineCompanions = users;
      }, (error) => {
        console.error("Error listening to online users:", error);
      });
    },
  },

  async mounted() {
    await this.fetchTrip();
    await this.fetchUser();
    this.isLoading = false;

    const {doc, onSnapshot, collection} = await import('firebase/firestore');
    const {firestore} = await import('../../chunks/client_rclekwYX.mjs');

    // -- SET UP REAL TIME LISTENER FOR THE TRIP DOCUMENT
    const tripRef = doc(firestore, 'trips', this.tripId);
    this.unsubscribeFromTripListener = onSnapshot(tripRef, async (docSnap) => {
      if (docSnap.exists()) {
        await this.fetchTrip();
      } else {
        console.log('Trip document does not exists');
      }
    }, (error) => {
      console.error("Error listening to trip document:", error);
      this.dangerToast.message = 'Error fetching real-time data.';
    });

    // Listener for Activities subcollection
    const activitiesRef = collection(firestore, `trips/${this.tripId}/activities`);
    this.unsubscribeFromActivitiesListener = onSnapshot(activitiesRef, async (querySnapshot) => {
      await this.fetchTrip();
    });

    // Listener for Preparation subcollection
    const preparationRef = collection(firestore, `trips/${this.tripId}/preparation`);
    this.unsubscribeFromPreparationListener = onSnapshot(preparationRef, async (querySnapshot) => {
      await this.fetchTrip();
    });

    // Listener for Accommodations subcollection
    const accommodationsRef = collection(firestore, `trips/${this.tripId}/accommodations`);
    this.unsubscribeFromAccommodationsListener = onSnapshot(accommodationsRef, async (querySnapshot) => {
      await this.fetchTrip();
    });

    // Listener for Budget subcollection
    const budgetRef = collection(firestore, `trips/${this.tripId}/budget`);
    this.unsubscribeFromBudgetListener = onSnapshot(budgetRef, async (querySnapshot) => {
      await this.fetchTrip();
    });

    // Listener for Companions subcollection
    const companionsRef = collection(firestore, `trips/${this.tripId}/companions`);
    this.unsubscribeFromCompanionsListener = onSnapshot(companionsRef, async (querySnapshot) => {
      await this.fetchTrip();
    });

    // === NEW: SETUP REAL-TIME PRESENCE ===
    if (this.user?.uid) {
      await this.setPresence();
      await this.setupPresenceListener();
      window.addEventListener('beforeunload', this.removePresence);
    }

    // Clean up by destroying instances and removing event listeners
    document.addEventListener('astro:before-swap', () => {
      // Clean up both listeners and remove the presence document
      if (this.unsubscribeFromTripListener) this.unsubscribeFromTripListener();
      if (this.unsubscribeFromActivitiesListener) this.unsubscribeFromActivitiesListener();
      if (this.unsubscribeFromPreparationListener) this.unsubscribeFromPreparationListener();
      if (this.unsubscribeFromAccommodationsListener) this.unsubscribeFromAccommodationsListener();
      if (this.unsubscribeFromBudgetListener) this.unsubscribeFromBudgetListener();
      if (this.unsubscribeFromCompanionsListener) this.unsubscribeFromCompanionsListener();
      if (this.unsubscribeFromPresenceListener) this.unsubscribeFromPresenceListener();
      this.removePresence();
      window.removeEventListener('beforeunload', this.removePresence);
    }, { once: true });
  },

  unmounted() {

  }
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_Card = resolveComponent("Card");
  const _component_TripDetailsHeader = resolveComponent("TripDetailsHeader");
  const _component_TripSections = resolveComponent("TripSections");
  const _component_ActivityTimeline = resolveComponent("ActivityTimeline");
  const _component_ToastContainer = resolveComponent("ToastContainer");
  const _component_Toast = resolveComponent("Toast");
  const _component_SheetTripSettings = resolveComponent("SheetTripSettings");
  const _component_SheetPreparation = resolveComponent("SheetPreparation");
  const _component_SheetAccom = resolveComponent("SheetAccom");
  const _component_SheetCompanions = resolveComponent("SheetCompanions");
  const _component_SheetBudget = resolveComponent("SheetBudget");
  const _component_SheetTransportation = resolveComponent("SheetTransportation");
  const _component_SheetRoles = resolveComponent("SheetRoles");
  const _component_SheetAddActivity = resolveComponent("SheetAddActivity");
  const _component_SheetEditActivity = resolveComponent("SheetEditActivity");
  const _component_SheetViewActivity = resolveComponent("SheetViewActivity");
  const _component_SheetDayNote = resolveComponent("SheetDayNote");
  const _component_SheetMap = resolveComponent("SheetMap");

  _push(`<!--[-->`);
  if ($data.isLoading) {
    _push(`<div class="flex items-center justify-center w-full h-[32rem]">`);
    _push(ssrRenderComponent(_component_Spinner, { label: "Loading your trips" }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!--[-->`);
    if ($data.tripConfig.name) {
      _push(`<div class="grow mt-8 md:mt-16 fadeIn">`);
      _push(ssrRenderComponent(_component_Card, {
        customClass: $options.cardClass + " max-w-4xl mx-auto p-0! overflow-hidden rounded-4xl bg-white"
      }, {
        default: withCtx((_, _push, _parent, _scopeId) => {
          if (_push) {
            _push(ssrRenderComponent(_component_TripDetailsHeader, {
              "online-companions": $data.onlineCompanions,
              "trip-config": $data.tripConfig,
              "planning-progress": $options.progressOfPlanning,
              onShowSettings: $event => ($data.settingsShowSheet = true),
              onShowMap: $event => ($data.mapShowSheet = true),
              onCopyToClipboard: $options.copyUrlToClipboard
            }, null, _parent, _scopeId));
            _push(ssrRenderComponent(_component_TripSections, {
              onShowAccommodation: $event => ($data.accommodationShowSheet=true),
              onShowBudget: $event => ($data.budgetShowSheet=true),
              onShowCompanions: $event => ($data.companionsShowSheet=true),
              onShowPreparation: $event => ($data.preparationShowSheet=true),
              onShowRoles: $event => ($data.rolesShowSheet=true),
              onShowTransportation: $event => ($data.transportationShowSheet=true),
              preparation: $data.preparation,
              budget: $data.budget,
              accommodation: $data.accommodation,
              companions: $data.companions,
              roles: $data.roles,
              transportation: $data.transportation
            }, null, _parent, _scopeId));
            _push(ssrRenderComponent(_component_ActivityTimeline, {
              "trip-config": $data.tripConfig,
              activities: $data.activities,
              onShowAddActivity: $event => ($data.addActivityShowSheet=true),
              onShowDayNote: $event => ($data.dayNoteShowSheet=true),
              onShowViewActivity: $options.showViewActivitySheet
            }, null, _parent, _scopeId));
          } else {
            return [
              createVNode(_component_TripDetailsHeader, {
                "online-companions": $data.onlineCompanions,
                "trip-config": $data.tripConfig,
                "planning-progress": $options.progressOfPlanning,
                onShowSettings: $event => ($data.settingsShowSheet = true),
                onShowMap: $event => ($data.mapShowSheet = true),
                onCopyToClipboard: $options.copyUrlToClipboard
              }, null, 8, ["online-companions", "trip-config", "planning-progress", "onShowSettings", "onShowMap", "onCopyToClipboard"]),
              createVNode(_component_TripSections, {
                onShowAccommodation: $event => ($data.accommodationShowSheet=true),
                onShowBudget: $event => ($data.budgetShowSheet=true),
                onShowCompanions: $event => ($data.companionsShowSheet=true),
                onShowPreparation: $event => ($data.preparationShowSheet=true),
                onShowRoles: $event => ($data.rolesShowSheet=true),
                onShowTransportation: $event => ($data.transportationShowSheet=true),
                preparation: $data.preparation,
                budget: $data.budget,
                accommodation: $data.accommodation,
                companions: $data.companions,
                roles: $data.roles,
                transportation: $data.transportation
              }, null, 8, ["onShowAccommodation", "onShowBudget", "onShowCompanions", "onShowPreparation", "onShowRoles", "onShowTransportation", "preparation", "budget", "accommodation", "companions", "roles", "transportation"]),
              createVNode(_component_ActivityTimeline, {
                "trip-config": $data.tripConfig,
                activities: $data.activities,
                onShowAddActivity: $event => ($data.addActivityShowSheet=true),
                onShowDayNote: $event => ($data.dayNoteShowSheet=true),
                onShowViewActivity: $options.showViewActivitySheet
              }, null, 8, ["trip-config", "activities", "onShowAddActivity", "onShowDayNote", "onShowViewActivity"])
            ]
          }
        }),
        _: 1
      }, _parent));
      _push(`<div id="fuck"></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  }
  _push(ssrRenderComponent(_component_ToastContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'error',
          ref: "dangerToast",
          message: $data.dangerToast.message
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'success',
          ref: "successToast",
          message: $data.successToast.message
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_Toast, {
            variant: 'error',
            ref: "dangerToast",
            message: $data.dangerToast.message
          }, null, 8, ["message"]),
          createVNode(_component_Toast, {
            variant: 'success',
            ref: "successToast",
            message: $data.successToast.message
          }, null, 8, ["message"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SheetTripSettings, {
    showSheet: $data.settingsShowSheet,
    "onUpdate:showSheet": $event => (($data.settingsShowSheet) = $event),
    modelValue: $data.settings,
    "onUpdate:modelValue": $event => (($data.settings) = $event),
    onSave: $options.saveSettings,
    onDelete: $options.deleteTrip
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetPreparation, {
    showSheet: $data.preparationShowSheet,
    "onUpdate:showSheet": $event => (($data.preparationShowSheet) = $event),
    modelValue: $data.preparation,
    "onUpdate:modelValue": $event => (($data.preparation) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetAccom, {
    showSheet: $data.accommodationShowSheet,
    "onUpdate:showSheet": [$event => (($data.accommodationShowSheet) = $event), $data.accommodationShowSheet],
    modelValue: $data.accommodation,
    "onUpdate:modelValue": $event => (($data.accommodation) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetCompanions, {
    onCompanionAdded: $options.companionAdded,
    onCompanionRemoved: $options.companionRemoved,
    uid: $data.user.uid,
    "accepted-friendships": $data.user.acceptedFriendships,
    ownerUid: $data.ownerUid,
    showSheet: $data.companionsShowSheet,
    "onUpdate:showSheet": $event => (($data.companionsShowSheet) = $event),
    modelValue: $data.companions,
    "onUpdate:modelValue": $event => (($data.companions) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetBudget, {
    showSheet: $data.budgetShowSheet,
    "onUpdate:showSheet": $event => (($data.budgetShowSheet) = $event),
    modelValue: $data.budget,
    "onUpdate:modelValue": $event => (($data.budget) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetTransportation, {
    showSheet: $data.transportationShowSheet,
    "onUpdate:showSheet": $event => (($data.transportationShowSheet) = $event),
    modelValue: $data.transportation,
    "onUpdate:modelValue": $event => (($data.transportation) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetRoles, {
    showSheet: $data.rolesShowSheet,
    "onUpdate:showSheet": $event => (($data.rolesShowSheet) = $event),
    modelValue: $data.roles,
    "onUpdate:modelValue": $event => (($data.roles) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetAddActivity, {
    showSheet: $data.addActivityShowSheet,
    "onUpdate:showSheet": $event => (($data.addActivityShowSheet) = $event),
    dateRange: $data.tripConfig.date,
    modelValue: $data.addActivity,
    "onUpdate:modelValue": $event => (($data.addActivity) = $event),
    onActivitySaved: $options.addNewActivity
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetEditActivity, {
    showSheet: $data.editActivityShowSheet,
    "onUpdate:showSheet": $event => (($data.editActivityShowSheet) = $event),
    dateRange: $data.tripConfig.date,
    modelValue: $data.editActivity,
    "onUpdate:modelValue": $event => (($data.editActivity) = $event),
    onActivitySaved: $options.updateActivity
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetViewActivity, {
    showSheet: $data.selectedActivityShowSheet,
    "onUpdate:showSheet": $event => (($data.selectedActivityShowSheet) = $event),
    modelValue: $data.selectedActivity,
    "onUpdate:modelValue": $event => (($data.selectedActivity) = $event),
    onEditActivity: $options.editSelectedActivity,
    onDeleteActivity: $options.deleteActivity
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetDayNote, {
    showSheet: $data.dayNoteShowSheet,
    "onUpdate:showSheet": $event => (($data.dayNoteShowSheet) = $event),
    modelValue: $data.dayNote,
    "onUpdate:modelValue": $event => (($data.dayNote) = $event)
  }, null, _parent));
  _push(ssrRenderComponent(_component_SheetMap, {
    activities: $data.activities,
    showSheet: $data.mapShowSheet,
    "onUpdate:showSheet": $event => (($data.mapShowSheet) = $event)
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-details/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TripPage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$trip = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$trip;
  const { trip } = Astro2.params;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Trip", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "TripPage", TripPage, { "trip-id": trip, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/trip-details/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/trips/[trip].astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/trips/[trip].astro";
const $$url = "/trips/[trip]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$trip,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
