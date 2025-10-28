import { c as createComponent, a as createAstro, b as addAttribute, g as renderScript, f as renderTemplate, d as renderSlot, e as renderComponent, r as renderHead } from './astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
/* empty css                         */
import { A as Anchor } from './Anchor_C95N-aL4.mjs';
import { atom } from 'nanostores';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                         */
import 'clsx';
/* empty css                         */

const isBrowser = typeof window !== 'undefined';

// Load from localStorage if available (only in browser)
const savedAuth = isBrowser ? localStorage.getItem('auth') : null;
const initialAuth = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: {
        id: "01JS51EW7Q52ASMDGPXP39FZAE"
      },
      token: null,
      isAuthenticated: false,
      loading: false,
    };

const useAuthStore = atom(initialAuth);

// Save to localStorage on any change
if (isBrowser) {
  useAuthStore.subscribe((value) => {
    localStorage.setItem('auth', JSON.stringify(value));
  });
}

const _sfc_main$1 = {
  name: "AppFooter",
  components: {
    Anchor
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },

  methods: {
    async logoutUser() {
      try {
        const { auth } = await import('./client_By8w0Agp.mjs');
        // -- 1. SIGN OUT FROM FIREBASE CLIENT SDK
        await auth.signOut();
        console.log('FIREBASE CLIENT-SIDE SIGN OUT SUCCESSFUL');

        // -- 2. SEND REQUEST TO YOUR SERVER-SIDE LOGOUT API TO CLEAR THE HTTPONLY COOKIE
        const response = await fetch('/api/v1/auth/session-logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Server-side logout failed.');
        }

        console.log('SERVER-SIDE SESSION CLEARED');

        // -- 3. CLEAR NANOSTORES
        localStorage.removeItem('auth');

        // -- 4. REDIRECT TO LOGIN
        window.location.href = '/login';
      } catch (error) {
        console.error("Logout Error:", error);
        alert(`An error occurred during logout. Please try again. ${error}`);
      }
    }
  }
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<footer${
    ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-10 bottom-0 w-full text-center text-sm text-zinc-500 py-4" }, _attrs))
  }><p> © ${
    ssrInterpolate($data.currentYear)
  } MindHue Technologies Inc. All rights reserved. </p></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Footer = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  data() {
    return {
      showMenu: false,
      pathname: '',
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async logoutUser() {
      try {
        const { auth } = await import('./client_By8w0Agp.mjs');
        // -- 1. SIGN OUT FROM FIREBASE CLIENT SDK
        await auth.signOut();
        console.log('FIREBASE CLIENT-SIDE SIGN OUT SUCCESSFUL');

        // -- 2. SEND REQUEST TO YOUR SERVER-SIDE LOGOUT API TO CLEAR THE HTTPONLY COOKIE
        const response = await fetch('/api/v1/auth/session-logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Server-side logout failed.');
        }

        console.log('SERVER-SIDE SESSION CLEARED');

        // -- 3. CLEAR NANOSTORES
        localStorage.removeItem('auth');


        // -- 4. REDIRECT TO LOGIN
        window.location.href = '/login';

      } catch (error) {
        console.error("Logout Error:", error);
        alert("An error occurred during logout. Please try again.");
      }
    }
  },
  mounted() {
    this.pathname = window.location.pathname;
  }
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "flex lg:flex-col p-4 lg:py-4 py-8 items-center lg:justify-between justify-center lg:bg-transparent bg-zinc-100 fixed text-white lg:fixed lg:inset-0 lg:w-fit lg:h-full bottom-0 h-12 w-full z-50" }, _attrs))
  } data-v-5aa5a950><div class="hidden lg:flex flex-col items-center justify-center gap-2 mb-4" data-v-5aa5a950><div class="flex flex-col" data-v-5aa5a950><img src="/images/logo-agdayo-sm.png" width="48" alt="Logo" data-v-5aa5a950></div></div><div class="flex lg:flex-col gap-4 lg:justify-center justify-around lg:w-fit w-full items-center text-2xl" data-v-5aa5a950><a href="/active-trip" class="${
    ssrRenderClass([{'text-peach-500!': $data.pathname.includes('active-trip')}, "sidebar-buttons"])
  }" data-v-5aa5a950><i class="ph ph-house" data-v-5aa5a950></i></a><a href="/trips" class="${
    ssrRenderClass([{'text-peach-500!': $data.pathname.includes('trips')}, "sidebar-buttons"])
  }" data-v-5aa5a950><i class="ph ph-island" data-v-5aa5a950></i></a><a href="/create-trip" class="${
    ssrRenderClass([{'text-peach-500!': $data.pathname.includes('create-trip')}, "sidebar-buttons bg-white h-8 w-8 flex items-center justify-center rounded-xl"])
  }" data-v-5aa5a950><i class="ph ph-plus" data-v-5aa5a950></i></a><a href="/expenses" class="${
    ssrRenderClass([{'text-peach-500!': $data.pathname.includes('expenses')}, "sidebar-buttons"])
  }" data-v-5aa5a950><i class="ph ph-coins" data-v-5aa5a950></i></a><a href="/ai" class="${
    ssrRenderClass([{'text-peach-500!': $data.pathname.includes('profile')}, "sidebar-buttons"])
  }" data-v-5aa5a950><span style="${
    ssrRenderStyle({"background-image":"linear-gradient(to right, #eea092, #eabf67)","color":"transparent","background-clip":"text"})
  }" class="font-medium" data-v-5aa5a950>AI</span></a></div><div class="hidden lg:flex flex-col gap-2 mt-4 items-center" data-v-5aa5a950><a class="sidebar-buttons" id="logoutBtn" data-v-5aa5a950><i class="ph ph-sign-out" data-v-5aa5a950></i></a></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/Sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Sidebar = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-5aa5a950"]]);

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/albertsobreo/Documents/Programming/agdayoUI/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/node_modules/astro/components/ClientRouter.astro", void 0);

const cache = /* @__PURE__ */ new Map();
function getCache(url, ttl = 3e5) {
  const cachedItem = cache.get(url);
  if (!cachedItem) {
    return null;
  }
  const isExpired = Date.now() - cachedItem.timestamp > ttl;
  if (isExpired) {
    console.log(`[Cache] Expired page for URL: ${url}`);
    cache.delete(url);
    return null;
  }
  console.log(`[Cache] Serving from cache for URL: ${url}`);
  return cachedItem.content;
}

const $$Astro = createAstro();
const $$LayoutWSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LayoutWSidebar;
  const currentUrl = Astro2.url.pathname;
  let cachedContent = getCache(currentUrl);
  if (cachedContent) {
    return new Response(cachedContent, {
      headers: {
        "Content-Type": "text/html",
        "X-Cache-Status": "HIT"
        // A custom header to indicate a cache hit
      }
    });
  }
  return renderTemplate`<html lang="en"> <head><link rel="apple-touch-icon" href="/favicon.png"><meta name="google-site-verification" content="dGOrBniNsY0dn6m2QE6j8LNB7LXqm5CZ2_ZR0nnxXPE"><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"><title>Agdayo Traveling App</title>${renderSlot($$result, $$slots["head"])}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <!-- BODY --> <body class="outfit relative text-zinc-900 flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"> ${renderComponent($$result, "Sidebar", Sidebar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Sidebar.vue", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, { "class": "pb-16 lg:pb-4" })} </body></html>`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/shared/layouts/LayoutWSidebar.astro", void 0);

export { $$LayoutWSidebar as $, useAuthStore as u };
