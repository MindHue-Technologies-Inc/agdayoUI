import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, e as renderComponent, f as renderTemplate } from './astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
/* empty css                         */
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><link rel="apple-touch-icon" href="/favicon.png"><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"><title>Agdayo Traveling App</title>${renderHead()}</head> <body class="outfit text-zinc-900 flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@/shared/components/UI/Footer.vue", "client:component-export": "default" })} </body></html>`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/shared/layouts/Layout.astro", void 0);

export { $$Layout as $ };
