import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, f as renderTemplate, e as renderComponent } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$LoginLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginLayout;
  return renderTemplate`<html lang="en"> <head><link rel="apple-touch-icon" href="/favicon.png"><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"><title>Agdayo Traveling App - Login</title><meta name="robots" content="noindex, follow">${renderHead()}</head> <body class="outfit text-zinc-900 flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/shared/layouts/LoginLayout.astro", void 0);

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$LoginLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginPage", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@/domains/login/pages/index.vue", "client:component-export": "default" })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/login.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
