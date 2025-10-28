import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../../chunks/LayoutWSidebar_2E1FEmW9.mjs';
import { M as Main } from '../../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../../chunks/Topbar_BfLjpeWR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$trip = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$trip;
  const { trip } = Astro2.params;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Trip", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "TripPage", null, { "trip-id": trip, "client:only": true, "client:component-hydration": "only", "client:component-path": "@/domains/trip-details/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
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
