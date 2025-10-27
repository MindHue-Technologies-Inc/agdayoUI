import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
import { C as Card } from '../chunks/Card_DqSI8ctk.mjs';
import { T as TripCard } from '../chunks/TripCard_tX_OmQSg.mjs';
import { T as Tag, S as Spinner } from '../chunks/Spinner_D3LiV7vU.mjs';
import { B as Button } from '../chunks/Button_W6bUmV4x.mjs';
import { A as Anchor } from '../chunks/Anchor_C95N-aL4.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
/* empty css                                 */
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  components: {
    Anchor,
    Spinner,
    Card,
    Tag,
    Button,
    TripCard
  },

  data() {
    return {
      trips: [],
      isLoading: true,
    }
  },

  computed: {
    sortedTrips() {
      return this.trips.toSorted((a, b) => {
        return a.date.start.localeCompare(b.date.start)
      })
    },

  },

  methods: {
    async fetchTrips() {
      try {
        const response = await fetch('/api/v1/trips');
        if (!response.ok) {
          const error = await response.json();
          console.error('Something went wrong', error.message);
          throw new Error(`Something went wrong: ${error.message}`)
        }

        this.trips = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    redirect(address) {
      window.location.href = address;
    },
  },

  async mounted() {
    await this.fetchTrips();
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_TripCard = resolveComponent("TripCard");
  const _component_Spinner = resolveComponent("Spinner");

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fadeIn grow mt-8 md:mt-16" }, _attrs))} data-v-4bfcd935><div class="max-w-4xl" data-v-4bfcd935><div class="flex items-center justify-between mb-8" data-v-4bfcd935><h1 class="font-extrabold text-4xl sm:text-5xl text-zinc-800 tracking-tight outfit leading-tight" data-v-4bfcd935> My Trips </h1>`);
  _push(ssrRenderComponent(_component_Button, {
    variant: "primary",
    onClick: $event => ($options.redirect('/create-trip'))
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<i class="ph ph-plus text-lg mr-1" data-v-4bfcd935${_scopeId}></i> New Trip `);
      } else {
        return [
          createVNode("i", { class: "ph ph-plus text-lg mr-1" }),
          createTextVNode(" New Trip ")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="flex flex-col gap-6" data-v-4bfcd935>`);
  if ($data.trips.length > 0) {
    _push(ssrRenderComponent(_component_TripCard, { trips: $options.sortedTrips }, null, _parent));
  } else if ($data.isLoading) {
    _push(`<div class="flex items-center justify-center w-full h-[32rem]" data-v-4bfcd935>`);
    _push(ssrRenderComponent(_component_Spinner, { label: "Loading your trips" }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div class="flex flex-col grow items-center justify-center gap-2 h-[32rem]" data-v-4bfcd935><i class="ph ph-island text-5xl text-zinc-400" data-v-4bfcd935></i><span class="font-medium text-zinc-400" data-v-4bfcd935>No Trips</span></div>`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-management/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TripsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-4bfcd935"]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Trips", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "TripsPage", TripsPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/trip-management/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/trips/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/trips/index.astro";
const $$url = "/trips";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
