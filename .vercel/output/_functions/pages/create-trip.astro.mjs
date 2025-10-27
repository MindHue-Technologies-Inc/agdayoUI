import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
import { C as Card } from '../chunks/Card_DqSI8ctk.mjs';
import { A as AdvInput, I as InputTitle, D as Destination, a as Dates, u as useDbStore } from '../chunks/db_BwfrwfFb.mjs';
import { I as Input, T as Toast, a as ToastContainer } from '../chunks/Toast_CUQC-hn-.mjs';
import { B as Button } from '../chunks/Button_W6bUmV4x.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, createBlock, withKeys, openBlock, Fragment, renderList, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
/* empty css                                 */
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main$2 = {
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

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "budget",
    label: "Budget",
    icon: "ph ph-wallet",
    summary: $options.formatCurrency($data.totalBudget)
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-4" data-v-3f302c43${_scopeId}>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "total-budget",
          placeholder: "Enter your estimated total budget",
          prefixIcon: "ph ph-currency-dollar",
          type: "number",
          formatCommas: true,
          modelValue: $data.totalBudget,
          "onUpdate:modelValue": $event => (($data.totalBudget) = $event)
        }, null, _parent, _scopeId));
        _push(`<span class="text-sm text-zinc-400" data-v-3f302c43${_scopeId}>This is your overall budget for the entire trip.</span>`);
        _push(ssrRenderComponent(_component_Button, { class: "w-full" }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Set Budget`);
            } else {
              return [
                createTextVNode("Set Budget")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-4" }, [
            createVNode(_component_Input, {
              id: "total-budget",
              placeholder: "Enter your estimated total budget",
              prefixIcon: "ph ph-currency-dollar",
              type: "number",
              formatCommas: true,
              modelValue: $data.totalBudget,
              "onUpdate:modelValue": $event => (($data.totalBudget) = $event)
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode("span", { class: "text-sm text-zinc-400" }, "This is your overall budget for the entire trip."),
            createVNode(_component_Button, { class: "w-full" }, {
              default: withCtx(() => [
                createTextVNode("Set Budget")
              ]),
              _: 1
            })
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/Budget.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const Budget = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2],['__scopeId',"data-v-3f302c43"]]);

const _sfc_main$1 = {
  components: {
    AdvInput,
    Input,
    Button,
  },
  data() {
    return {
      newCompanionName: '',
      companions: [],
    };
  },
  methods: {
    addCompanion() {
      if (this.newCompanionName.trim() !== '') {
        this.companions.push(this.newCompanionName.trim());
        this.newCompanionName = '';
      }
    },
    removeCompanion(index) {
      this.companions.splice(index, 1);
    },
    saveCompanions() {
      console.log('Companions:', this.companions);
      // Here you would typically emit an event or call an API to save the companions
    }
  }
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "companions",
    label: "Companions",
    icon: "ph ph-users",
    summary: ""
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-2" data-v-8b027c81${
          _scopeId
        }><div class="flex gap-2" data-v-8b027c81${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "add-companion",
          placeholder: "Search or Enter Companion Name",
          prefixIcon: "ph ph-user-plus",
          modelValue: $data.newCompanionName,
          "onUpdate:modelValue": $event => (($data.newCompanionName) = $event),
          onKeyup: $options.addCompanion,
          class: "flex-grow"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          onClick: $options.addCompanion,
          disabled: $data.newCompanionName.trim() === '',
          customClass: "px-4 py-2 text-sm"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Add `);
            } else {
              return [
                createTextVNode(" Add ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div><span class="text-sm text-zinc-400" data-v-8b027c81${_scopeId}>Add friends or family joining the trip.</span>`);
        if ($data.companions.length > 0) {
          _push(`<div class="py-2 flex flex-col gap-1" data-v-8b027c81${
            _scopeId
          }><span class="font-medium" data-v-8b027c81${
            _scopeId
          }>Added Companions:</span><!--[-->`);
          ssrRenderList($data.companions, (companion, index) => {
            _push(`<div class="flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-zinc-100" data-v-8b027c81${
              _scopeId
            }><span class="font-medium flex items-center gap-2" data-v-8b027c81${
              _scopeId
            }><i class="ph ph-user text-zinc-500" data-v-8b027c81${
              _scopeId
            }></i> ${
              ssrInterpolate(companion)
            }</span><button class="text-red-500 hover:text-red-700 transition-colors duration-200" data-v-8b027c81${
              _scopeId
            }><i class="ph ph-x-circle text-lg" data-v-8b027c81${
              _scopeId
            }></i></button></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="py-2 flex flex-col gap-0" data-v-8b027c81${
            _scopeId
          }><span class="font-medium text-zinc-400" data-v-8b027c81${
            _scopeId
          }>No companions added yet.</span><span class="text-[12px] font-medium text-zinc-400" data-v-8b027c81${
            _scopeId
          }>Start by typing a name above.</span></div>`);
        }
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveCompanions
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Confirm Companions`);
            } else {
              return [
                createTextVNode("Confirm Companions")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-2" }, [
            createVNode("div", { class: "flex gap-2" }, [
              createVNode(_component_Input, {
                id: "add-companion",
                placeholder: "Search or Enter Companion Name",
                prefixIcon: "ph ph-user-plus",
                modelValue: $data.newCompanionName,
                "onUpdate:modelValue": $event => (($data.newCompanionName) = $event),
                onKeyup: withKeys($options.addCompanion, ["enter"]),
                class: "flex-grow"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
              createVNode(_component_Button, {
                onClick: $options.addCompanion,
                disabled: $data.newCompanionName.trim() === '',
                customClass: "px-4 py-2 text-sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Add ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ]),
            createVNode("span", { class: "text-sm text-zinc-400" }, "Add friends or family joining the trip."),
            ($data.companions.length > 0)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "py-2 flex flex-col gap-1"
                }, [
                  createVNode("span", { class: "font-medium" }, "Added Companions:"),
                  (openBlock(true), createBlock(Fragment, null, renderList($data.companions, (companion, index) => {
                    return (openBlock(), createBlock("div", {
                      key: index,
                      class: "flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-zinc-100"
                    }, [
                      createVNode("span", { class: "font-medium flex items-center gap-2" }, [
                        createVNode("i", { class: "ph ph-user text-zinc-500" }),
                        createTextVNode(" " + toDisplayString(companion), 1)
                      ]),
                      createVNode("button", {
                        onClick: $event => ($options.removeCompanion(index)),
                        class: "text-red-500 hover:text-red-700 transition-colors duration-200"
                      }, [
                        createVNode("i", { class: "ph ph-x-circle text-lg" })
                      ], 8, ["onClick"])
                    ]))
                  }), 128))
                ]))
              : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "py-2 flex flex-col gap-0"
                }, [
                  createVNode("span", { class: "font-medium text-zinc-400" }, "No companions added yet."),
                  createVNode("span", { class: "text-[12px] font-medium text-zinc-400" }, "Start by typing a name above.")
                ])),
            createVNode(_component_Button, {
              class: "w-full",
              onClick: $options.saveCompanions
            }, {
              default: withCtx(() => [
                createTextVNode("Confirm Companions")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/InviteCompanions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const InviteCompanions = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-8b027c81"]]);

const _sfc_main = {
  components: {
    Dates,
    Destination,
    Button,
    Card,
    Input,
    InputTitle,
    AdvInput,
    Budget,
    InviteCompanions,
    ToastContainer,
    Toast,
  },

  data() {
    return {
      // 1. Create a data property to hold the store's state reactively
      useDb: useDbStore.get(), // Initialize with the current state
      dangerToast: {
        message: '',
      },
      warningToast: {
        message: '',
      },
      name: '',
      date: {
        start: null,
        end: null,
      },
      location: '',
      btnLoading: false,
      unsubscribeFromDbStore: null, // 2. Property to hold the unsubscribe function
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.warningToast.message = "Please Enter the Trip Name";
        this.$refs.advInputName.expand();
        return false;
      }

      return true;
    },

    validateLocation() {
      if (!this.location) {
        this.warningToast.message = "Please Enter a Location";
        this.$refs.destination.expand();
        return false;
      }

      return true
    },
    validateDate() {
      if (!this.date.start && !this.date.end) {
        this.warningToast.message = 'Please Enter a Date Range';
        this.$refs.dates.expand();
        return false;
      }

      return true;
    },

    proceedNext(current) {
      if (current === 'destination') {
        this.$refs.destination.collapse();
        this.$refs.dates.expand();
      } else if (current === 'dates') {
        this.$refs.dates.collapse();
      }
    },

    async saveTrip() {

      // -- 1. VALIDATE INPUTS
      if (!this.validateName()) return;
      if (!this.validateLocation()) return;
      if (!this.validateDate()) return;

      try {
        this.btnLoading = true;
        // -- 1.5 CONSTRUCT TRIP PAYLOAD
        const payload = {
          name: this.name,
          date: this.date,
          location: this.location,
        };

        // -- 2. CALL POST API
        const response = await fetch('/api/v1/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        // -- 3. CHECK IF RESPONSE IS NOT GOOD
        if (!response.ok) {
          const error = await response.json();
          console.error('Something went wrong', error.message);
          throw new Error(error.message)
        }

        // -- 4. GET THE ID OF THE NEWLY CREATED TRIP
        const {tripId, tripData} = await response.json();

        console.log(tripId, tripData);

        window.location.href = `/trips/${tripId}`;

      } catch (error) {
        console.error(error);
      }
    }
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_InputTitle = resolveComponent("InputTitle");
  const _component_Destination = resolveComponent("Destination");
  const _component_Dates = resolveComponent("Dates");
  const _component_Button = resolveComponent("Button");
  const _component_ToastContainer = resolveComponent("ToastContainer");
  const _component_Toast = resolveComponent("Toast");

  _push(`<!--[--><div class="flex flex-col grow place-content-center"><h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit"> Plan Your Next Adventure </h1>`);
  _push(ssrRenderComponent(_component_Card, {
    class: "fadeIn fadeIn-1",
    customClass: "rounded-4xl border-secondary-xs shadow-secondary-lg"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_AdvInput, {
          label: "Trip Name",
          icon: "ph-paper-plane-tilt",
          ref: "advInputName"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="p-1"${_scopeId}>`);
              _push(ssrRenderComponent(_component_InputTitle, {
                modelValue: $data.name,
                "onUpdate:modelValue": $event => (($data.name) = $event),
                placeholder: "e.g., Island Hopping Palawan",
                id: "name",
                class: "w-full text-2xl font-bold text-zinc-800"
              }, null, _parent, _scopeId));
              _push(`<span class="text-sm text-zinc-500 mt-2 block"${_scopeId}> You can add preparations, activities, and routes after creating the trip. </span></div>`);
            } else {
              return [
                createVNode("div", { class: "p-1" }, [
                  createVNode(_component_InputTitle, {
                    modelValue: $data.name,
                    "onUpdate:modelValue": $event => (($data.name) = $event),
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
          ref: "destination",
          modelValue: $data.location,
          "onUpdate:modelValue": $event => (($data.location) = $event),
          onNext: $event => ($options.proceedNext('destination'))
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Dates, {
          ref: "dates",
          modelValue: $data.date,
          "onUpdate:modelValue": $event => (($data.date) = $event),
          onNext: $event => ($options.proceedNext('dates'))
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          loading: $data.btnLoading,
          ref: "submit",
          onClick: $options.saveTrip
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Start Planning`);
            } else {
              return [
                createTextVNode("Start Planning")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_AdvInput, {
            label: "Trip Name",
            icon: "ph-paper-plane-tilt",
            ref: "advInputName"
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "p-1" }, [
                createVNode(_component_InputTitle, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": $event => (($data.name) = $event),
                  placeholder: "e.g., Island Hopping Palawan",
                  id: "name",
                  class: "w-full text-2xl font-bold text-zinc-800"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("span", { class: "text-sm text-zinc-500 mt-2 block" }, " You can add preparations, activities, and routes after creating the trip. ")
              ])
            ]),
            _: 1
          }, 512),
          createVNode(_component_Destination, {
            ref: "destination",
            modelValue: $data.location,
            "onUpdate:modelValue": $event => (($data.location) = $event),
            onNext: $event => ($options.proceedNext('destination'))
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onNext"]),
          createVNode(_component_Dates, {
            ref: "dates",
            modelValue: $data.date,
            "onUpdate:modelValue": $event => (($data.date) = $event),
            onNext: $event => ($options.proceedNext('dates'))
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onNext"]),
          createVNode(_component_Button, {
            loading: $data.btnLoading,
            ref: "submit",
            onClick: $options.saveTrip
          }, {
            default: withCtx(() => [
              createTextVNode("Start Planning")
            ]),
            _: 1
          }, 8, ["loading", "onClick"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ToastContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'error',
          ref: "dangerToast",
          message: $data.dangerToast.message
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'warning',
          ref: "warningToast",
          message: $data.warningToast.message
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_Toast, {
            variant: 'error',
            ref: "dangerToast",
            message: $data.dangerToast.message
          }, null, 8, ["message"]),
          createVNode(_component_Toast, {
            variant: 'warning',
            ref: "warningToast",
            message: $data.warningToast.message
          }, null, 8, ["message"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const CreateTrip = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Create Trips", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "CreateTrip", CreateTrip, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/trip-planning/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/create-trip/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/create-trip/index.astro";
const $$url = "/create-trip";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
