import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { u as useAuthStore, $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_Bu4tlUVe.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { defineComponent, useSSRContext, ref, onMounted, watch, mergeProps, reactive, computed, markRaw, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode } from 'vue';
import { T as Tag, S as Spinner } from '../chunks/Spinner_D3LiV7vU.mjs';
import { C as Card } from '../chunks/Card_DqSI8ctk.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
/* empty css                                 */
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { F as Friends } from '../chunks/Friends_DYxd2KFx.mjs';
import { I as Input, T as Toast, a as ToastContainer } from '../chunks/Toast_CUQC-hn-.mjs';
import { A as Anchor } from '../chunks/Anchor_C95N-aL4.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavigationMenu",
  props: {
    tabs: {},
    initialActiveTabId: {}
  },
  emits: ["tab-selected"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const activeTabId = ref(null);
    onMounted(() => {
      if (props.initialActiveTabId && props.tabs.some((tab) => tab.id === props.initialActiveTabId)) {
        activeTabId.value = props.initialActiveTabId;
      } else if (props.tabs.length > 0) {
        activeTabId.value = props.tabs[0].id;
      }
      if (activeTabId.value) {
        emit("tab-selected", activeTabId.value);
      }
    });
    watch(() => props.tabs, (newTabs) => {
      if (newTabs.length > 0 && (!activeTabId.value || !newTabs.some((tab) => tab.id === activeTabId.value))) {
        activeTabId.value = newTabs[0].id;
        emit("tab-selected", activeTabId.value);
      }
    }, { deep: true });
    const selectTab = (id) => {
      if (activeTabId.value !== id) {
        activeTabId.value = id;
        emit("tab-selected", id);
      }
    };
    const __returned__ = { props, emit, activeTabId, selectTab };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex border-b border-zinc-200 overflow-x-auto whitespace-nowrap -mx-4 px-4 md:-mx-6 md:px-6" }, _attrs))} data-v-24d0f5bc><!--[-->`);
  ssrRenderList($props.tabs, (tab) => {
    _push(`<button class="${ssrRenderClass([
      "py-3 px-4 text-center font-medium text-sm md:text-base",
      "transition-colors duration-200 ease-in-out",
      "relative group",
      // For the underline effect
      $setup.activeTabId === tab.id ? "text-peach-600 border-b-2 border-peach-500" : "text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 border-b-2 border-transparent"
      // Inactive state
    ])}" data-v-24d0f5bc>${ssrInterpolate(tab.label)} <span class="${ssrRenderClass([
      "absolute bottom-0 left-0 w-full h-0.5 bg-peach-500 transition-transform duration-200 ease-in-out",
      $setup.activeTabId === tab.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"
    ])}" data-v-24d0f5bc></span></button>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/shared/components/UI/NavigationMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NavigationMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-24d0f5bc"]]);

const DELAY_MS = 600;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "People",
  props: {
    pendingFriendships: {
      type: Array,
      default: []
    },
    acceptedFriendships: {
      type: Array,
      default: []
    }
  },
  emits: ["friendRequested", "friendRequestFailed"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const people = ref([]);
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    let timeoutId = null;
    const emit = __emit;
    const debounceInput = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        debouncedSearchQuery.value = searchQuery.value;
      }, DELAY_MS);
    };
    const sendFriendRequest = async (user) => {
      const response = await fetch("/api/v1/friendship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user2: user
        })
      });
      if (!response.ok) {
        emit("friendRequestFailed");
        return;
      }
      emit("friendRequested");
      return;
    };
    const fetchPeople = async (searchQuery2) => {
      const response = await fetch(`/api/v1/users?search=${searchQuery2}`);
      const { users } = await response.json();
      people.value = users;
    };
    watch(debouncedSearchQuery, async (newValue) => {
      if (newValue) {
        fetchPeople(newValue);
      }
    });
    const __returned__ = { props, people, searchQuery, debouncedSearchQuery, get timeoutId() {
      return timeoutId;
    }, set timeoutId(v) {
      timeoutId = v;
    }, DELAY_MS, emit, debounceInput, sendFriendRequest, fetchPeople, Input, Tag };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<template><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="text-2xl gap-2 font-bold flex items-center"><i class="ph ph-users"></i><span>Discover People</span></div>`);
  _push(ssrRenderComponent($setup["Input"], {
    id: "people-search",
    "prefix-icon": "ph ph-magnifying-glass",
    placeholder: "Search People",
    modelValue: $setup.searchQuery,
    "onUpdate:modelValue": ($event) => $setup.searchQuery = $event,
    onInput: $setup.debounceInput
  }, null, _parent));
  if ($setup.people.length > 0) {
    _push(`<!--[-->`);
    ssrRenderList($setup.people, (person, index) => {
      _push(`<div class="${ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])}"><div class="flex gap-3 self-start items-center justify-center"><div class="${ssrRenderClass([
        "text-xl transition rounded-full flex",
        "bg-none justify-center items-center",
        "bg-zinc-200 aspect-square border-2 border-zinc-300",
        "shadow-secondary-sm",
        "border-secondary-sm",
        "overflow-hidden h-12 w-12"
      ])}">`);
      if (person.photoURL) {
        _push(`<img${ssrRenderAttr("src", person.photoURL)} alt="">`);
      } else {
        _push(`<i class="ph ph-user"></i>`);
      }
      _push(`</div><div class="flex flex-col gap-0 grow">`);
      if (person.displayName) {
        _push(`<span class="font-semibold">${ssrInterpolate(person.displayName)}</span>`);
      } else if (person.email) {
        _push(`<span class="font-semibold">${ssrInterpolate(person.email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if ($props.pendingFriendships.filter((friend) => friend.user2Uid === person.uid).length > 0) {
        _push(`<span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold bg-zinc-100 text-zinc-500 border border-zinc-200"><i class="ph ph-hourglass-simple text-base"></i> Request Sent </span>`);
      } else if ($props.pendingFriendships.filter((friend) => friend.user1Uid === person.uid).length > 0) {
        _push(`<button class="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold bg-peach-500 text-white hover:bg-peach-600 transition-colors shadow-md shadow-peach-300 active:scale-95"><i class="ph ph-hand-waving text-base"></i> Accept Friend Request </button>`);
      } else {
        _push(ssrRenderComponent($setup["Tag"], {
          onClick: ($event) => $setup.sendFriendRequest(person),
          label: "Add Friend",
          mode: "button",
          icon: "ph-user-plus"
        }, null, _parent));
      }
      _push(`</div>`);
    });
    _push(`<!--]-->`);
  } else {
    _push(`<div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10"><i class="ph ph-users text-3xl"></i><span>No people found</span></div>`);
  }
  _push(`</div></template>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/domains/user-profile/components/People.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const People = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const isLoading = ref(true);
    const useAuth = ref(useAuthStore.get());
    const dangerToast = reactive({
      message: ""
    });
    const successToast = reactive({
      message: ""
    });
    const photoURL = computed(() => {
      return useAuth.value.user?.user?.photoURL;
    });
    const displayName = computed(() => {
      return useAuth.value.user?.user?.displayName;
    });
    const uid = computed(() => {
      return useAuth.value.user?.user?.id;
    });
    const email = computed(() => {
      return useAuth.value.user?.user?.email;
    });
    const user = ref({});
    const fetchUser = async () => {
      const response = await fetch("/api/v1/me");
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      }
      user.value = await response.json();
    };
    const formatDate = (datetime) => {
      if (!datetime) return "";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(datetime));
    };
    const tabs = markRaw([
      {
        id: "friends",
        label: "My Friends"
      },
      {
        id: "people",
        label: "Discover People"
      },
      {
        id: "trips",
        label: "My Trips"
      }
    ]);
    const activeTab = ref("");
    const getActiveTab = (id) => {
      activeTab.value = id;
    };
    const friendRequestFailed = () => {
      dangerToast.message = "Friend Request Failed";
    };
    const friendRequestSuccess = () => {
      successToast.message = "Sent Friend Request";
      fetchUser();
    };
    const friendAccepted = () => {
      successToast.message = "Friend request accepted";
      fetchUser();
    };
    const friendRequestCancelled = () => {
      fetchUser();
    };
    const logoutUser = async () => {
      try {
        const { auth } = await import('../chunks/client_rclekwYX.mjs');
        await auth.signOut();
        console.log("FIREBASE CLIENT-SIDE SIGN OUT SUCCESSFUL");
        const response = await fetch("/api/v1/auth/session-logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server-side logout failed.");
        }
        console.log("SERVER-SIDE SESSION CLEARED");
        localStorage.removeItem("auth");
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout Error:", error);
        alert("An error occurred during logout. Please try again.");
      }
    };
    onMounted(async () => {
      await fetchUser();
      isLoading.value = false;
    });
    const __returned__ = { isLoading, useAuth, dangerToast, successToast, photoURL, displayName, uid, email, user, fetchUser, formatDate, tabs, activeTab, getActiveTab, friendRequestFailed, friendRequestSuccess, friendAccepted, friendRequestCancelled, logoutUser, Spinner, Card, NavigationMenu, Friends, People, ToastContainer, Toast, Anchor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  if ($setup.isLoading) {
    _push(`<div class="flex items-center justify-center w-full h-[32rem]">`);
    _push(ssrRenderComponent($setup["Spinner"], { label: "Loading your profile" }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<template><div class="grow mt-8 md:mt-16 fadeIn">`);
    _push(ssrRenderComponent($setup["Card"], { customClass: "border-secondary-sm shadow-secondary-md relative max-w-4xl mx-auto overflow-hidden rounded-4xl bg-white flex flex-col gap-8 p-4 md:p-6!" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="absolute top-0 right-0 flex flex-row"${_scopeId}>`);
          _push2(ssrRenderComponent($setup["Anchor"], {
            href: "javascript:void(0)",
            onClick: $setup.logoutUser,
            class: "text-sm my-2 md:my-3 py-2 md:py-3"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Logout`);
              } else {
                return [
                  createTextVNode("Logout")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`<div class="m-2 md:m-3 p-2 md:p-3 flex items-center text-2xl hover:bg-zinc-100 transition rounded-full justify-center cursor-pointer"${_scopeId}><i class="ph ph-gear"${_scopeId}></i></div></div><div class="flex gap-4 flex-col sm:flex-row items-center sm:items-start"${_scopeId}><div class="${ssrRenderClass([
            "text-6xl transition rounded-full flex items-center justify-center",
            "bg-none hover:text-zinc-500 cursor-pointer",
            "bg-zinc-200 aspect-square border-2 border-zinc-300",
            "shadow-secondary-sm",
            "border-secondary-sm",
            "overflow-hidden h-24 w-24"
          ])}"${_scopeId}>`);
          if ($setup.photoURL) {
            _push2(`<img${ssrRenderAttr("src", $setup.photoURL)} alt=""${_scopeId}>`);
          } else {
            _push2(`<i class="ph ph-user"${_scopeId}></i>`);
          }
          _push2(`</div><div class="flex flex-col gap-4 items-start justify-center"${_scopeId}><div class="flex flex-col gap-1 items-start justify-center"${_scopeId}><span class="text-zinc-800 text-4xl font-extrabold text-shadow-secondary-md"${_scopeId}>${ssrInterpolate($setup.displayName)}</span><span class="text-zinc-400 text-xs"${_scopeId}>${ssrInterpolate($setup.email)}</span></div><div class="flex flex-wrap items-center gap-2 sm:gap-5 text-sm text-zinc-500"${_scopeId}><div class="flex items-center justify-center gap-1"${_scopeId}><i class="ph ph-calendar-dots"${_scopeId}></i><span${_scopeId}>Joined ${ssrInterpolate($setup.formatDate($setup.user.createdAt))}</span></div><div class="flex items-center justify-center gap-1"${_scopeId}><i class="ph ph-users"${_scopeId}></i><span${_scopeId}>${ssrInterpolate($setup.user.acceptedFriendships.length)} Friend${ssrInterpolate($setup.user.acceptedFriendships.length > 1 ? "s" : "")}</span></div><div class="flex items-center justify-center gap-1"${_scopeId}><i class="ph ph-island"${_scopeId}></i><span${_scopeId}>${ssrInterpolate($setup.user.tripCount)} Trips</span></div></div></div></div><div class="flex flex-col gap-6"${_scopeId}>`);
          _push2(ssrRenderComponent($setup["NavigationMenu"], {
            tabs: $setup.tabs,
            "initial-active-tab-id": "friends",
            onTabSelected: $setup.getActiveTab
          }, null, _parent2, _scopeId));
          if ($setup.activeTab === "friends") {
            _push2(ssrRenderComponent($setup["Friends"], {
              onFriendAccepted: $setup.friendAccepted,
              onFriendRequestCancelled: $setup.friendRequestCancelled,
              "accepted-friendships": $setup.user.acceptedFriendships,
              "pending-friendships": $setup.user.pendingFriendships,
              uid: $setup.user.uid
            }, null, _parent2, _scopeId));
          } else if ($setup.activeTab === "people") {
            _push2(ssrRenderComponent($setup["People"], {
              onFriendRequestFailed: $setup.friendRequestFailed,
              onFriendRequested: $setup.friendRequestSuccess,
              "accepted-friendships": $setup.user.acceptedFriendships,
              "pending-friendships": $setup.user.pendingFriendships
            }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          return [
            createVNode("div", { class: "absolute top-0 right-0 flex flex-row" }, [
              createVNode($setup["Anchor"], {
                href: "javascript:void(0)",
                onClick: $setup.logoutUser,
                class: "text-sm my-2 md:my-3 py-2 md:py-3"
              }, {
                default: withCtx(() => [
                  createTextVNode("Logout")
                ]),
                _: 1
              }),
              createVNode("div", { class: "m-2 md:m-3 p-2 md:p-3 flex items-center text-2xl hover:bg-zinc-100 transition rounded-full justify-center cursor-pointer" }, [
                createVNode("i", { class: "ph ph-gear" })
              ])
            ]),
            createVNode("div", { class: "flex gap-4 flex-col sm:flex-row items-center sm:items-start" }, [
              createVNode("div", { class: [
                "text-6xl transition rounded-full flex items-center justify-center",
                "bg-none hover:text-zinc-500 cursor-pointer",
                "bg-zinc-200 aspect-square border-2 border-zinc-300",
                "shadow-secondary-sm",
                "border-secondary-sm",
                "overflow-hidden h-24 w-24"
              ] }, [
                $setup.photoURL ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: $setup.photoURL,
                  alt: ""
                }, null, 8, ["src"])) : (openBlock(), createBlock("i", {
                  key: 1,
                  class: "ph ph-user"
                }))
              ]),
              createVNode("div", { class: "flex flex-col gap-4 items-start justify-center" }, [
                createVNode("div", { class: "flex flex-col gap-1 items-start justify-center" }, [
                  createVNode("span", { class: "text-zinc-800 text-4xl font-extrabold text-shadow-secondary-md" }, toDisplayString($setup.displayName), 1),
                  createVNode("span", { class: "text-zinc-400 text-xs" }, toDisplayString($setup.email), 1)
                ]),
                createVNode("div", { class: "flex flex-wrap items-center gap-2 sm:gap-5 text-sm text-zinc-500" }, [
                  createVNode("div", { class: "flex items-center justify-center gap-1" }, [
                    createVNode("i", { class: "ph ph-calendar-dots" }),
                    createVNode("span", null, "Joined " + toDisplayString($setup.formatDate($setup.user.createdAt)), 1)
                  ]),
                  createVNode("div", { class: "flex items-center justify-center gap-1" }, [
                    createVNode("i", { class: "ph ph-users" }),
                    createVNode("span", null, toDisplayString($setup.user.acceptedFriendships.length) + " Friend" + toDisplayString($setup.user.acceptedFriendships.length > 1 ? "s" : ""), 1)
                  ]),
                  createVNode("div", { class: "flex items-center justify-center gap-1" }, [
                    createVNode("i", { class: "ph ph-island" }),
                    createVNode("span", null, toDisplayString($setup.user.tripCount) + " Trips", 1)
                  ])
                ])
              ])
            ]),
            createVNode("div", { class: "flex flex-col gap-6" }, [
              createVNode($setup["NavigationMenu"], {
                tabs: $setup.tabs,
                "initial-active-tab-id": "friends",
                onTabSelected: $setup.getActiveTab
              }, null, 8, ["tabs"]),
              $setup.activeTab === "friends" ? (openBlock(), createBlock($setup["Friends"], {
                key: 0,
                onFriendAccepted: $setup.friendAccepted,
                onFriendRequestCancelled: $setup.friendRequestCancelled,
                "accepted-friendships": $setup.user.acceptedFriendships,
                "pending-friendships": $setup.user.pendingFriendships,
                uid: $setup.user.uid
              }, null, 8, ["accepted-friendships", "pending-friendships", "uid"])) : $setup.activeTab === "people" ? (openBlock(), createBlock($setup["People"], {
                key: 1,
                onFriendRequestFailed: $setup.friendRequestFailed,
                onFriendRequested: $setup.friendRequestSuccess,
                "accepted-friendships": $setup.user.acceptedFriendships,
                "pending-friendships": $setup.user.pendingFriendships
              }, null, 8, ["accepted-friendships", "pending-friendships"])) : createCommentVNode("", true)
            ])
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></template>`);
  }
  _push(ssrRenderComponent($setup["ToastContainer"], null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["Toast"], {
          variant: "error",
          message: $setup.dangerToast.message
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent($setup["Toast"], {
          variant: "success",
          message: $setup.successToast.message
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["Toast"], {
            variant: "error",
            message: $setup.dangerToast.message
          }, null, 8, ["message"]),
          createVNode($setup["Toast"], {
            variant: "success",
            message: $setup.successToast.message
          }, null, 8, ["message"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/domains/user-profile/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Profile", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "Profile", Profile, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/user-profile/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/user-profile/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/user-profile/index.astro";
const $$url = "/user-profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
