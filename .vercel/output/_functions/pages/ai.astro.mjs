import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate`             ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Agdayo AI", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "AI", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@/domains/AI/pages/index.vue", "client:component-export": "default" })} ` })} `, "head": ($$result2) => renderTemplate`<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Agdayo AI: Your Personalized Travel Itinerary Planner</title><meta name="description" content="Let Agdayo AI help you plan your next trip! Generate personalized itineraries, optimize routes, and discover hidden gems for your perfect adventure in minutes."><meta name="keywords" content="AI travel planner, AI itinerary generator, personalized travel, travel planning app, custom trip planner, Agdayo AI, Olongapo travel, Philippines travel AI, smart travel assistant"><link rel="canonical" href="https://agdayo.mindhue.tech/ai/"><meta property="og:title" content="Agdayo AI: Your Personalized Travel Itinerary Planner"><meta property="og:description" content="Let Agdayo AI help you plan your next trip! Generate personalized itineraries, optimize routes, and discover hidden gems for your perfect adventure in minutes."><meta property="og:type" content="website"><meta property="og:url" content="https://agdayo.mindhue.tech/ai/"><meta property="og:image" content="https://agdayo.mindhue.tech/images/agdayo-ai-social-share.jpg"><meta property="og:image:alt" content="Agdayo AI App creating a travel itinerary">` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/ai/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/ai/index.astro";
const $$url = "/ai";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
