import { c as createComponent, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BZIeH3Xc.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "loading": false }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", null, { "title": "Register", "client:only": true, "client:component-hydration": "only", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "Register", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@/domains/user-register/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/register/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/register/index.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
