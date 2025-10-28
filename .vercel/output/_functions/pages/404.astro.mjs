import { c as createComponent, e as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_2E1FEmW9.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { B as Button } from '../chunks/Button_W6bUmV4x.mjs';
import { A as Anchor } from '../chunks/Anchor_C95N-aL4.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-theme(spacing.20))] px-4 py-16 text-center"> <h1 class="fadeIn fadeIn-1 text-9xl font-extrabold text-zinc-300 dark:text-zinc-700 select-none">
404
</h1> <h2 class="fadeIn fadeIn-2 text-4xl font-bold text-zinc-800 dark:text-zinc-100 mt-4 mb-6">
Page Not Found
</h2> <p class="fadeIn fadeIn-3 text-lg text-zinc-600 dark:text-zinc-300 max-w-prose mb-8">
Oops! It looks like the page you're looking for doesn't exist. It might have been moved or deleted.
</p> <div class="fadeIn fadeIn-4 flex flex-col sm:flex-row gap-4 items-center"> ${renderComponent($$result3, "Button", Button, { "onclick": "window.history.back()", "variant": "primary" }, { "default": ($$result4) => renderTemplate`
Go Back
` })} ${renderComponent($$result3, "Anchor", Anchor, { "href": "/active-trip", "variant": "secondary" }, { "default": ($$result4) => renderTemplate`
Go to Homepage
` })} </div> </div> ` })} ` })} `;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/404.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
