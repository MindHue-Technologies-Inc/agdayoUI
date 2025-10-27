import { defineComponent, useSSRContext, ref, computed, mergeProps, withCtx, createTextVNode } from 'vue';
import { I as Input } from './Toast_CUQC-hn-.mjs';
import './Button_W6bUmV4x.mjs';
import './Spinner_D3LiV7vU.mjs';
import { A as Anchor } from './Anchor_C95N-aL4.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const DELAY_MS = 600;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Friends",
  props: {
    pendingFriendships: {
      type: Array,
      default: []
    },
    acceptedFriendships: {
      type: Array,
      default: []
    },
    uid: {
      type: String,
      default: ""
    }
  },
  emits: ["friendAccepted", "friendRequestCancelled"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    let timeoutId = null;
    const debounceInput = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        debouncedSearchQuery.value = searchQuery.value;
      }, DELAY_MS);
    };
    const filteredAcceptedFriendships = computed(() => {
      if (!debouncedSearchQuery) return props.acceptedFriendships;
      return props.acceptedFriendships.filter((f) => f.user2DisplayName.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()));
    });
    const emit = __emit;
    const acceptFriendRequest = async (id) => {
      const response = await fetch("/api/v1/friendship", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          friendshipId: id,
          status: "accepted"
        })
      });
      if (!response.ok) return;
      emit("friendAccepted");
    };
    const cancelFriendRequest = async (id) => {
      const response = await fetch(`/api/v1/friendship?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) return;
      emit("friendRequestCancelled");
    };
    const __returned__ = { props, searchQuery, debouncedSearchQuery, get timeoutId() {
      return timeoutId;
    }, set timeoutId(v) {
      timeoutId = v;
    }, DELAY_MS, debounceInput, filteredAcceptedFriendships, emit, acceptFriendRequest, cancelFriendRequest, Input, Anchor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<template><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="text-2xl gap-2 font-bold flex items-center"><i class="ph ph-users"></i><span>My Friends</span></div>`);
  _push(ssrRenderComponent($setup["Input"], {
    id: "friends-search",
    "prefix-icon": "ph ph-magnifying-glass",
    placeholder: "Search friends",
    modelValue: $setup.searchQuery,
    "onUpdate:modelValue": ($event) => $setup.searchQuery = $event,
    onInput: $setup.debounceInput
  }, null, _parent));
  if ($props.pendingFriendships.length > 0) {
    _push(`<span>Friend Requests</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.pendingFriendships.length > 0) {
    _push(`<!--[-->`);
    ssrRenderList($props.pendingFriendships, (person, index) => {
      _push(`<!--[-->`);
      if (person.user1Uid != $props.uid) {
        _push(`<div class="${ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-row items-center justify-start"])}"><div class="${ssrRenderClass([
          "text-xl transition rounded-full flex",
          "bg-none justify-center items-center",
          "bg-zinc-200 aspect-square border-2 border-zinc-300",
          "shadow-secondary-sm",
          "border-secondary-sm",
          "overflow-hidden h-12 w-12"
        ])}">`);
        if (person.user1PhotoURL) {
          _push(`<img${ssrRenderAttr("src", person.user1PhotoURL)} alt="">`);
        } else {
          _push(`<i class="ph ph-user"></i>`);
        }
        _push(`</div><div class="flex flex-col gap-0 grow">`);
        if (person.user1DisplayName) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user1DisplayName)}</span>`);
        } else if (person.user1Email) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user1Email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold bg-peach-500 text-white hover:bg-peach-600 transition-colors shadow-md shadow-peach-300 active:scale-95"><i class="ph ph-hand-waving text-base"></i> Accept Friend Request </button></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])}"><div class="flex gap-3 self-start items-center justify-items-start"><div class="${ssrRenderClass([
          "text-xl transition rounded-full flex",
          "bg-none justify-center items-center",
          "bg-zinc-200 aspect-square border-2 border-zinc-300",
          "shadow-secondary-sm",
          "border-secondary-sm",
          "overflow-hidden h-12 w-12"
        ])}">`);
        if (person.user2PhotoURL) {
          _push(`<img${ssrRenderAttr("src", person.user2PhotoURL)} alt="">`);
        } else {
          _push(`<i class="ph ph-user"></i>`);
        }
        _push(`</div><div class="flex flex-col gap-0 grow">`);
        if (person.user2DisplayName) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user2DisplayName)}</span>`);
        } else if (person.user2Email) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user2Email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex self-end md:self-auto items-center justify-center gap-2">`);
        _push(ssrRenderComponent($setup["Anchor"], {
          onClick: ($event) => $setup.cancelFriendRequest(person.id),
          href: "javascript:void(0)"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold bg-zinc-100 text-zinc-500 border border-zinc-200"><i class="ph ph-hourglass-simple text-base"></i> Request Sent </span></div></div>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`<span>Your Friends</span>`);
  if ($setup.filteredAcceptedFriendships.length > 0) {
    _push(`<!--[-->`);
    ssrRenderList($setup.filteredAcceptedFriendships, (person, index) => {
      _push(`<!--[-->`);
      if (person.user1Uid != $props.uid) {
        _push(`<div class="${ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])}"><div class="flex gap-3 self-start items-center justify-start"><div class="${ssrRenderClass([
          "text-xl transition rounded-full flex",
          "bg-none justify-center items-center",
          "bg-zinc-200 aspect-square border-2 border-zinc-300",
          "shadow-secondary-sm",
          "border-secondary-sm",
          "overflow-hidden h-12 w-12"
        ])}">`);
        if (person.user1PhotoURL) {
          _push(`<img${ssrRenderAttr("src", person.user1PhotoURL)} alt="">`);
        } else {
          _push(`<i class="ph ph-user"></i>`);
        }
        _push(`</div><div class="flex flex-col gap-0 grow">`);
        if (person.user1DisplayName) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user1DisplayName)}</span>`);
        } else if (person.user1Email) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user1Email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent($setup["Anchor"], { href: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View Profile`);
            } else {
              return [
                createTextVNode("View Profile")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="${ssrRenderClass([`fadeIn-${index}`, "fadeIn p-3 rounded-3xl gap-3 shadow-secondary-md border-secondary-xs flex flex-col md:flex-row items-center justify-start md:justify-between"])}"><div class="${ssrRenderClass([
          "text-xl transition rounded-full flex",
          "bg-none justify-center items-center",
          "bg-zinc-200 aspect-square border-2 border-zinc-300",
          "shadow-secondary-sm",
          "border-secondary-sm",
          "overflow-hidden h-12 w-12"
        ])}">`);
        if (person.user2PhotoURL) {
          _push(`<img${ssrRenderAttr("src", person.user2PhotoURL)} alt="">`);
        } else {
          _push(`<i class="ph ph-user"></i>`);
        }
        _push(`</div><div class="flex flex-col gap-0 grow">`);
        if (person.user2DisplayName) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user2DisplayName)}</span>`);
        } else if (person.user2Email) {
          _push(`<span class="font-semibold">${ssrInterpolate(person.user2Email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent($setup["Anchor"], { href: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View Profile`);
            } else {
              return [
                createTextVNode("View Profile")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]-->`);
  } else {
    _push(`<div class="flex flex-col items-center justify-center gap-1 text-zinc-500 py-10"><i class="ph ph-users text-3xl"></i><span>You have no friends</span></div>`);
  }
  _push(`</div></template>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/domains/user-profile/components/Friends.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Friends = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Friends as F };
