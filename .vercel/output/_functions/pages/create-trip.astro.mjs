import { c as createComponent, a as createAstro, e as renderComponent, f as renderTemplate } from '../chunks/astro/server_BDZuUS1O.mjs';
import 'kleur/colors';
import { $ as $$LayoutWSidebar } from '../chunks/LayoutWSidebar_2E1FEmW9.mjs';
import { M as Main } from '../chunks/Main_DSKONqVp.mjs';
import { T as Topbar } from '../chunks/Topbar_BfLjpeWR.mjs';
import { C as Card } from '../chunks/Card_BZn4KDPy.mjs';
import { useSSRContext, mergeProps, resolveComponent, withCtx, createTextVNode, createVNode, withKeys, toDisplayString, Transition, createBlock, openBlock, Fragment, renderList, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { I as Input, T as Toast, a as ToastContainer } from '../chunks/Toast_Lfe3ES13.mjs';
/* empty css                                 */
import { B as Button } from '../chunks/Button_W6bUmV4x.mjs';
import { atom } from 'nanostores';
export { renderers } from '../renderers.mjs';

const _sfc_main$7 = {
  name: 'NewInput',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
};

function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}>`);
  if ($props.label) {
    _push(`<label${
      ssrRenderAttr("for", $props.id)
    } class="text-zinc-900 text-sm font-medium">${
      ssrInterpolate($props.label)
    }</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<textarea${
    ssrRenderAttr("id", $props.id)
  }${
    ssrRenderAttr("type", $props.type)
  }${
    ssrRenderAttr("placeholder", $props.placeholder)
  }${
    (ssrIncludeBooleanAttr($props.disabled)) ? " disabled" : ""
  }${
    (ssrIncludeBooleanAttr($props.required)) ? " required" : ""
  }${
    ssrRenderAttr("autocomplete", false)
  } class="w-full text-[2rem] bg-transparent font-medium outline-none focus:outline-none text-zinc-800 disabled:text-zinc-400">${
    ssrInterpolate($props.modelValue)
  }</textarea>`);
  if ($props.error) {
    _push(`<p class="text-sm text-red-500">${ssrInterpolate($props.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/InputTitle.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : undefined
};
const InputTitle = /*#__PURE__*/_export_sfc(_sfc_main$7, [['ssrRender',_sfc_ssrRender$7]]);

const _sfc_main$6 = {
  name: "AdvInput",
  data() {
    return {
      isExpanded: false,
    };
  },

  props: {
    summary: {
      type: String,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    }
  },

  computed: {
    baseClass() {
      return 'rounded-[1.5rem] md:rounded-[2rem] border-secondary-xs shadow-secondary-md px-3 py-4 md:p-6 bg-white transition duration-150 ease-in-out';
    },
    hoverClass() {
      return 'hover:bg-zinc-100';
    }
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
    expand(){
      this.isExpanded = true;
    },
    collapse(){
      this.isExpanded = false;
    },
    beforeEnter(el) {
      el.style.height = '0';
      el.style.opacity = '0';
    },
    enter(el) {
      el.style.height = '0';
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.transition = 'height 0.3s ease, opacity 0.5s ease';
        el.style.height = el.scrollHeight + 'px';
        el.style.opacity = '1';
      });
    },
    afterEnter(el) {
      el.style.height = 'auto'; // clear height after animation
    },
    leave(el) {
      el.style.transition = 'height 0.3s ease, opacity 0.1s ease';
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = '1';

      // Force reflow before collapsing
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.height = '0';
        el.style.opacity = '0';
      });
    },
    afterLeave(el) {
      el.style.height = '';
    }
  }
};

function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({
      class: [$options.baseClass]
    }, _attrs))
  } data-v-b1534086><div class="cursor-pointer" data-v-b1534086><div class="flex items-center gap-4 justify-between" data-v-b1534086><div class="${
    ssrRenderClass(['flex items-center gap-2 text-zinc-900 font-medium header-text', { expanded: $data.isExpanded }])
  }" data-v-b1534086>`);
  if ($props.icon.includes('ph')) {
    _push(`<i class="${ssrRenderClass(['ph', $props.icon])}" data-v-b1534086></i>`);
  } else {
    _push(`<span data-v-b1534086>${ssrInterpolate($props.icon)}</span>`);
  }
  _push(`<span data-v-b1534086>${ssrInterpolate($props.label)}</span></div>`);
  if (!$data.isExpanded) {
    _push(`<div class="text-end md:block hidden" data-v-b1534086>${ssrInterpolate($props.summary)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div style="${ssrRenderStyle(($data.isExpanded) ? null : { display: "none" })}" class="" data-v-b1534086><div class="" data-v-b1534086><div class="w-full" id="slot" data-v-b1534086>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/AdvInput.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined
};
const AdvInput = /*#__PURE__*/_export_sfc(_sfc_main$6, [['ssrRender',_sfc_ssrRender$6],['__scopeId',"data-v-b1534086"]]);

const cities = /* #__PURE__ */ JSON.parse("[{\"name\":\"Caloocan\",\"province\":\"MM\",\"city\":true},{\"name\":\"Las Piñas\",\"province\":\"MM\",\"city\":true},{\"name\":\"Makati\",\"province\":\"MM\",\"city\":true},{\"name\":\"Malabon\",\"province\":\"MM\",\"city\":true},{\"name\":\"Mandaluyong\",\"province\":\"MM\",\"city\":true},{\"name\":\"Manila\",\"province\":\"MM\",\"city\":true},{\"name\":\"Marikina\",\"province\":\"MM\",\"city\":true},{\"name\":\"Muntinlupa\",\"province\":\"MM\",\"city\":true},{\"name\":\"Navotas\",\"province\":\"MM\",\"city\":true},{\"name\":\"Parañaque\",\"province\":\"MM\",\"city\":true},{\"name\":\"Pasay\",\"province\":\"MM\",\"city\":true},{\"name\":\"Pasig\",\"province\":\"MM\",\"city\":true},{\"name\":\"Pateros\",\"province\":\"MM\"},{\"name\":\"Quezon\",\"province\":\"MM\",\"city\":true},{\"name\":\"San Juan\",\"province\":\"MM\",\"city\":true},{\"name\":\"Taguig\",\"province\":\"MM\",\"city\":true},{\"name\":\"Valenzuela\",\"province\":\"MM\",\"city\":true},{\"name\":\"Bangued\",\"province\":\"ABR\"},{\"name\":\"Boliney\",\"province\":\"ABR\"},{\"name\":\"Bucay\",\"province\":\"ABR\"},{\"name\":\"Bucloc\",\"province\":\"ABR\"},{\"name\":\"Daguioman\",\"province\":\"ABR\"},{\"name\":\"Danglas\",\"province\":\"ABR\"},{\"name\":\"Dolores\",\"province\":\"ABR\"},{\"name\":\"La Paz\",\"province\":\"ABR\"},{\"name\":\"Lacub\",\"province\":\"ABR\"},{\"name\":\"Lagangilang\",\"province\":\"ABR\"},{\"name\":\"Lagayan\",\"province\":\"ABR\"},{\"name\":\"Langiden\",\"province\":\"ABR\"},{\"name\":\"Licuan-Baay\",\"province\":\"ABR\"},{\"name\":\"Luba\",\"province\":\"ABR\"},{\"name\":\"Malibcong\",\"province\":\"ABR\"},{\"name\":\"Manabo\",\"province\":\"ABR\"},{\"name\":\"Peñarrubia\",\"province\":\"ABR\"},{\"name\":\"Pidigan\",\"province\":\"ABR\"},{\"name\":\"Pilar\",\"province\":\"ABR\"},{\"name\":\"Sallapadan\",\"province\":\"ABR\"},{\"name\":\"San Isidro\",\"province\":\"ABR\"},{\"name\":\"San Juan\",\"province\":\"ABR\"},{\"name\":\"San Quintin\",\"province\":\"ABR\"},{\"name\":\"Tayum\",\"province\":\"ABR\"},{\"name\":\"Tineg\",\"province\":\"ABR\"},{\"name\":\"Tubo\",\"province\":\"ABR\"},{\"name\":\"Villaviciosa\",\"province\":\"ABR\"},{\"name\":\"Calanasan\",\"province\":\"APA\"},{\"name\":\"Conner\",\"province\":\"APA\"},{\"name\":\"Flora\",\"province\":\"APA\"},{\"name\":\"Kabugao\",\"province\":\"APA\"},{\"name\":\"Luna\",\"province\":\"APA\"},{\"name\":\"Pudtol\",\"province\":\"APA\"},{\"name\":\"Santa Marcela\",\"province\":\"APA\"},{\"name\":\"Atok\",\"province\":\"BEN\"},{\"name\":\"Baguio\",\"province\":\"BEN\",\"city\":true},{\"name\":\"Bakun\",\"province\":\"BEN\"},{\"name\":\"Bokod\",\"province\":\"BEN\"},{\"name\":\"Buguias\",\"province\":\"BEN\"},{\"name\":\"Itogon\",\"province\":\"BEN\"},{\"name\":\"Kabayan\",\"province\":\"BEN\"},{\"name\":\"Kapangan\",\"province\":\"BEN\"},{\"name\":\"Kibungan\",\"province\":\"BEN\"},{\"name\":\"La Trinidad\",\"province\":\"BEN\"},{\"name\":\"Mankayan\",\"province\":\"BEN\"},{\"name\":\"Sablan\",\"province\":\"BEN\"},{\"name\":\"Tuba\",\"province\":\"BEN\"},{\"name\":\"Tublay\",\"province\":\"BEN\"},{\"name\":\"Aguinaldo\",\"province\":\"IFU\"},{\"name\":\"Alfonso Lista\",\"province\":\"IFU\"},{\"name\":\"Asipulo\",\"province\":\"IFU\"},{\"name\":\"Banaue\",\"province\":\"IFU\"},{\"name\":\"Hingyon\",\"province\":\"IFU\"},{\"name\":\"Hungduan\",\"province\":\"IFU\"},{\"name\":\"Kiangan\",\"province\":\"IFU\"},{\"name\":\"Lagawe\",\"province\":\"IFU\"},{\"name\":\"Lamut\",\"province\":\"IFU\"},{\"name\":\"Mayoyao\",\"province\":\"IFU\"},{\"name\":\"Tinoc\",\"province\":\"IFU\"},{\"name\":\"Balbalan\",\"province\":\"KAL\"},{\"name\":\"Lubuagan\",\"province\":\"KAL\"},{\"name\":\"Pasil\",\"province\":\"KAL\"},{\"name\":\"Pinukpuk\",\"province\":\"KAL\"},{\"name\":\"Rizal\",\"province\":\"KAL\"},{\"name\":\"Tabuk\",\"province\":\"KAL\",\"city\":true},{\"name\":\"Tanudan\",\"province\":\"KAL\"},{\"name\":\"Tinglayan\",\"province\":\"KAL\"},{\"name\":\"Barlig\",\"province\":\"MOU\"},{\"name\":\"Bauko\",\"province\":\"MOU\"},{\"name\":\"Besao\",\"province\":\"MOU\"},{\"name\":\"Bontoc\",\"province\":\"MOU\"},{\"name\":\"Natonin\",\"province\":\"MOU\"},{\"name\":\"Paracelis\",\"province\":\"MOU\"},{\"name\":\"Sabangan\",\"province\":\"MOU\"},{\"name\":\"Sadanga\",\"province\":\"MOU\"},{\"name\":\"Sagada\",\"province\":\"MOU\"},{\"name\":\"Tadian\",\"province\":\"MOU\"},{\"name\":\"Adams\",\"province\":\"ILN\"},{\"name\":\"Bacarra\",\"province\":\"ILN\"},{\"name\":\"Badoc\",\"province\":\"ILN\"},{\"name\":\"Bangui\",\"province\":\"ILN\"},{\"name\":\"Banna\",\"province\":\"ILN\"},{\"name\":\"Batac\",\"province\":\"ILN\",\"city\":true},{\"name\":\"Burgos\",\"province\":\"ILN\"},{\"name\":\"Carasi\",\"province\":\"ILN\"},{\"name\":\"Currimao\",\"province\":\"ILN\"},{\"name\":\"Dingras\",\"province\":\"ILN\"},{\"name\":\"Dumalneg\",\"province\":\"ILN\"},{\"name\":\"Laoag\",\"province\":\"ILN\",\"city\":true},{\"name\":\"Marcos\",\"province\":\"ILN\"},{\"name\":\"Nueva Era\",\"province\":\"ILN\"},{\"name\":\"Pagudpud\",\"province\":\"ILN\"},{\"name\":\"Paoay\",\"province\":\"ILN\"},{\"name\":\"Pasuquin\",\"province\":\"ILN\"},{\"name\":\"Piddig\",\"province\":\"ILN\"},{\"name\":\"Pinili\",\"province\":\"ILN\"},{\"name\":\"San Nicolas\",\"province\":\"ILN\"},{\"name\":\"Sarrat\",\"province\":\"ILN\"},{\"name\":\"Solsona\",\"province\":\"ILN\"},{\"name\":\"Vintar\",\"province\":\"ILN\"},{\"name\":\"Alilem\",\"province\":\"ILS\"},{\"name\":\"Banayoyo\",\"province\":\"ILS\"},{\"name\":\"Bantay\",\"province\":\"ILS\"},{\"name\":\"Burgos\",\"province\":\"ILS\"},{\"name\":\"Cabugao\",\"province\":\"ILS\"},{\"name\":\"Candon\",\"province\":\"ILS\",\"city\":true},{\"name\":\"Caoayan\",\"province\":\"ILS\"},{\"name\":\"Cervantes\",\"province\":\"ILS\"},{\"name\":\"Galimuyod\",\"province\":\"ILS\"},{\"name\":\"Gregorio Del Pilar\",\"province\":\"ILS\"},{\"name\":\"Lidlidda\",\"province\":\"ILS\"},{\"name\":\"Magsingal\",\"province\":\"ILS\"},{\"name\":\"Nagbukel\",\"province\":\"ILS\"},{\"name\":\"Narvacan\",\"province\":\"ILS\"},{\"name\":\"Quirino\",\"province\":\"ILS\"},{\"name\":\"Salcedo\",\"province\":\"ILS\"},{\"name\":\"San Emilio\",\"province\":\"ILS\"},{\"name\":\"San Esteban\",\"province\":\"ILS\"},{\"name\":\"San Ildefonso\",\"province\":\"ILS\"},{\"name\":\"San Juan\",\"province\":\"ILS\"},{\"name\":\"San Vicente\",\"province\":\"ILS\"},{\"name\":\"Santa\",\"province\":\"ILS\"},{\"name\":\"Santa Catalina\",\"province\":\"ILS\"},{\"name\":\"Santa Cruz\",\"province\":\"ILS\"},{\"name\":\"Santa Lucia\",\"province\":\"ILS\"},{\"name\":\"Santa Maria\",\"province\":\"ILS\"},{\"name\":\"Santiago\",\"province\":\"ILS\"},{\"name\":\"Santo Domingo\",\"province\":\"ILS\"},{\"name\":\"Sigay\",\"province\":\"ILS\"},{\"name\":\"Sinait\",\"province\":\"ILS\"},{\"name\":\"Sugpon\",\"province\":\"ILS\"},{\"name\":\"Suyo\",\"province\":\"ILS\"},{\"name\":\"Tagudin\",\"province\":\"ILS\"},{\"name\":\"Vigan\",\"province\":\"ILS\",\"city\":true},{\"name\":\"Agoo\",\"province\":\"LUN\"},{\"name\":\"Aringay\",\"province\":\"LUN\"},{\"name\":\"Bacnotan\",\"province\":\"LUN\"},{\"name\":\"Bagulin\",\"province\":\"LUN\"},{\"name\":\"Balaoan\",\"province\":\"LUN\"},{\"name\":\"Bangar\",\"province\":\"LUN\"},{\"name\":\"Bauang\",\"province\":\"LUN\"},{\"name\":\"Burgos\",\"province\":\"LUN\"},{\"name\":\"Caba\",\"province\":\"LUN\"},{\"name\":\"Luna\",\"province\":\"LUN\"},{\"name\":\"Naguilian\",\"province\":\"LUN\"},{\"name\":\"Pugo\",\"province\":\"LUN\"},{\"name\":\"Rosario\",\"province\":\"LUN\"},{\"name\":\"San Fernando\",\"province\":\"LUN\",\"city\":true},{\"name\":\"San Gabriel\",\"province\":\"LUN\"},{\"name\":\"San Juan\",\"province\":\"LUN\"},{\"name\":\"Santo Tomas\",\"province\":\"LUN\"},{\"name\":\"Santol\",\"province\":\"LUN\"},{\"name\":\"Sudipen\",\"province\":\"LUN\"},{\"name\":\"Tubao\",\"province\":\"LUN\"},{\"name\":\"Agno\",\"province\":\"PAN\"},{\"name\":\"Aguilar\",\"province\":\"PAN\"},{\"name\":\"Alaminos\",\"province\":\"PAN\",\"city\":true},{\"name\":\"Alcala\",\"province\":\"PAN\"},{\"name\":\"Anda\",\"province\":\"PAN\"},{\"name\":\"Asingan\",\"province\":\"PAN\"},{\"name\":\"Balungao\",\"province\":\"PAN\"},{\"name\":\"Bani\",\"province\":\"PAN\"},{\"name\":\"Basista\",\"province\":\"PAN\"},{\"name\":\"Bautista\",\"province\":\"PAN\"},{\"name\":\"Bayambang\",\"province\":\"PAN\"},{\"name\":\"Binalonan\",\"province\":\"PAN\"},{\"name\":\"Binmaley\",\"province\":\"PAN\"},{\"name\":\"Bolinao\",\"province\":\"PAN\"},{\"name\":\"Bugallon\",\"province\":\"PAN\"},{\"name\":\"Burgos\",\"province\":\"PAN\"},{\"name\":\"Calasiao\",\"province\":\"PAN\"},{\"name\":\"Dagupan\",\"province\":\"PAN\",\"city\":true},{\"name\":\"Dasol\",\"province\":\"PAN\"},{\"name\":\"Infanta\",\"province\":\"PAN\"},{\"name\":\"Labrador\",\"province\":\"PAN\"},{\"name\":\"Laoac\",\"province\":\"PAN\"},{\"name\":\"Lingayen\",\"province\":\"PAN\"},{\"name\":\"Mabini\",\"province\":\"PAN\"},{\"name\":\"Malasiqui\",\"province\":\"PAN\"},{\"name\":\"Manaoag\",\"province\":\"PAN\"},{\"name\":\"Mangaldan\",\"province\":\"PAN\"},{\"name\":\"Mangatarem\",\"province\":\"PAN\"},{\"name\":\"Mapandan\",\"province\":\"PAN\"},{\"name\":\"Natividad\",\"province\":\"PAN\"},{\"name\":\"Pozzorubio\",\"province\":\"PAN\"},{\"name\":\"Rosales\",\"province\":\"PAN\"},{\"name\":\"San Carlos\",\"province\":\"PAN\",\"city\":true},{\"name\":\"San Fabian\",\"province\":\"PAN\"},{\"name\":\"San Jacinto\",\"province\":\"PAN\"},{\"name\":\"San Manuel\",\"province\":\"PAN\"},{\"name\":\"San Nicolas\",\"province\":\"PAN\"},{\"name\":\"San Quintin\",\"province\":\"PAN\"},{\"name\":\"Santa Barbara\",\"province\":\"PAN\"},{\"name\":\"Santa Maria\",\"province\":\"PAN\"},{\"name\":\"Santo Tomas\",\"province\":\"PAN\"},{\"name\":\"Sison\",\"province\":\"PAN\"},{\"name\":\"Sual\",\"province\":\"PAN\"},{\"name\":\"Tayug\",\"province\":\"PAN\"},{\"name\":\"Umingan\",\"province\":\"PAN\"},{\"name\":\"Urdaneta\",\"province\":\"PAN\",\"city\":true},{\"name\":\"Urbiztondo\",\"province\":\"PAN\"},{\"name\":\"Villasis\",\"province\":\"PAN\"},{\"name\":\"Basco\",\"province\":\"BTN\"},{\"name\":\"Itbayat\",\"province\":\"BTN\"},{\"name\":\"Ivana\",\"province\":\"BTN\"},{\"name\":\"Mahatao\",\"province\":\"BTN\"},{\"name\":\"Sabtang\",\"province\":\"BTN\"},{\"name\":\"Uyugan\",\"province\":\"BTN\"},{\"name\":\"Abulug\",\"province\":\"CAG\"},{\"name\":\"Alcala\",\"province\":\"CAG\"},{\"name\":\"Allacapan\",\"province\":\"CAG\"},{\"name\":\"Amulung\",\"province\":\"CAG\"},{\"name\":\"Aparri\",\"province\":\"CAG\"},{\"name\":\"Baggao\",\"province\":\"CAG\"},{\"name\":\"Ballesteros\",\"province\":\"CAG\"},{\"name\":\"Buguey\",\"province\":\"CAG\"},{\"name\":\"Calayan\",\"province\":\"CAG\"},{\"name\":\"Camalaniugan\",\"province\":\"CAG\"},{\"name\":\"Claveria\",\"province\":\"CAG\"},{\"name\":\"Enrile\",\"province\":\"CAG\"},{\"name\":\"Gattaran\",\"province\":\"CAG\"},{\"name\":\"Gonzaga\",\"province\":\"CAG\"},{\"name\":\"Iguig\",\"province\":\"CAG\"},{\"name\":\"Lal-lo\",\"province\":\"CAG\"},{\"name\":\"Lasam\",\"province\":\"CAG\"},{\"name\":\"Pamplona\",\"province\":\"CAG\"},{\"name\":\"Peñablanca\",\"province\":\"CAG\"},{\"name\":\"Piat\",\"province\":\"CAG\"},{\"name\":\"Rizal\",\"province\":\"CAG\"},{\"name\":\"Sanchez-Mira\",\"province\":\"CAG\"},{\"name\":\"Santa Ana\",\"province\":\"CAG\"},{\"name\":\"Santa Praxedes\",\"province\":\"CAG\"},{\"name\":\"Santa Teresita\",\"province\":\"CAG\"},{\"name\":\"Santo Niño\",\"province\":\"CAG\"},{\"name\":\"Solana\",\"province\":\"CAG\"},{\"name\":\"Tuao\",\"province\":\"CAG\"},{\"name\":\"Tuguegarao\",\"province\":\"CAG\",\"city\":true},{\"name\":\"Alicia\",\"province\":\"ISA\"},{\"name\":\"Angadanan\",\"province\":\"ISA\"},{\"name\":\"Aurora\",\"province\":\"ISA\"},{\"name\":\"Benito Soliven\",\"province\":\"ISA\"},{\"name\":\"Burgos\",\"province\":\"ISA\"},{\"name\":\"Cabagan\",\"province\":\"ISA\"},{\"name\":\"Cabatuan\",\"province\":\"ISA\"},{\"name\":\"Cauayan\",\"province\":\"ISA\",\"city\":true},{\"name\":\"Cordon\",\"province\":\"ISA\"},{\"name\":\"Delfin Albano\",\"province\":\"ISA\"},{\"name\":\"Dinapigue\",\"province\":\"ISA\"},{\"name\":\"Divilacan\",\"province\":\"ISA\"},{\"name\":\"Echague\",\"province\":\"ISA\"},{\"name\":\"Gamu\",\"province\":\"ISA\"},{\"name\":\"Ilagan\",\"province\":\"ISA\",\"city\":true},{\"name\":\"Jones\",\"province\":\"ISA\"},{\"name\":\"Luna\",\"province\":\"ISA\"},{\"name\":\"Maconacon\",\"province\":\"ISA\"},{\"name\":\"Mallig\",\"province\":\"ISA\"},{\"name\":\"Naguilian\",\"province\":\"ISA\"},{\"name\":\"Palanan\",\"province\":\"ISA\"},{\"name\":\"Quezon\",\"province\":\"ISA\"},{\"name\":\"Quirino\",\"province\":\"ISA\"},{\"name\":\"Ramon\",\"province\":\"ISA\"},{\"name\":\"Reina Mercedes\",\"province\":\"ISA\"},{\"name\":\"Roxas\",\"province\":\"ISA\"},{\"name\":\"San Agustin\",\"province\":\"ISA\"},{\"name\":\"San Guillermo\",\"province\":\"ISA\"},{\"name\":\"San Isidro\",\"province\":\"ISA\"},{\"name\":\"San Manuel\",\"province\":\"ISA\"},{\"name\":\"San Mariano\",\"province\":\"ISA\"},{\"name\":\"San Mateo\",\"province\":\"ISA\"},{\"name\":\"San Pablo\",\"province\":\"ISA\"},{\"name\":\"Santa Maria\",\"province\":\"ISA\"},{\"name\":\"Santiago\",\"province\":\"ISA\",\"city\":true},{\"name\":\"Santo Tomas\",\"province\":\"ISA\"},{\"name\":\"Tumauini\",\"province\":\"ISA\"},{\"name\":\"Alfonso Castaneda\",\"province\":\"NUV\"},{\"name\":\"Ambaguio\",\"province\":\"NUV\"},{\"name\":\"Aritao\",\"province\":\"NUV\"},{\"name\":\"Bagabag\",\"province\":\"NUV\"},{\"name\":\"Bambang\",\"province\":\"NUV\"},{\"name\":\"Bayombong\",\"province\":\"NUV\"},{\"name\":\"Diadi\",\"province\":\"NUV\"},{\"name\":\"Dupax del Norte\",\"province\":\"NUV\"},{\"name\":\"Dupax del Sur\",\"province\":\"NUV\"},{\"name\":\"Kasibu\",\"province\":\"NUV\"},{\"name\":\"Kayapa\",\"province\":\"NUV\"},{\"name\":\"Quezon\",\"province\":\"NUV\"},{\"name\":\"Santa Fe\",\"province\":\"NUV\"},{\"name\":\"Solano\",\"province\":\"NUV\"},{\"name\":\"Villaverde\",\"province\":\"NUV\"},{\"name\":\"Aglipay\",\"province\":\"QUI\"},{\"name\":\"Cabarroguis\",\"province\":\"QUI\"},{\"name\":\"Diffun\",\"province\":\"QUI\"},{\"name\":\"Maddela\",\"province\":\"QUI\"},{\"name\":\"Nagtipunan\",\"province\":\"QUI\"},{\"name\":\"Saguday\",\"province\":\"QUI\"},{\"name\":\"Baler\",\"province\":\"AUR\"},{\"name\":\"Casiguran\",\"province\":\"AUR\"},{\"name\":\"Dilasag\",\"province\":\"AUR\"},{\"name\":\"Dinalungan\",\"province\":\"AUR\"},{\"name\":\"Dingalan\",\"province\":\"AUR\"},{\"name\":\"Dipaculao\",\"province\":\"AUR\"},{\"name\":\"Maria Aurora\",\"province\":\"AUR\"},{\"name\":\"San Luis\",\"province\":\"AUR\"},{\"name\":\"Abucay\",\"province\":\"BAN\"},{\"name\":\"Bagac\",\"province\":\"BAN\"},{\"name\":\"Balanga\",\"province\":\"BAN\",\"city\":true},{\"name\":\"Dinalupihan\",\"province\":\"BAN\"},{\"name\":\"Hermosa\",\"province\":\"BAN\"},{\"name\":\"Limay\",\"province\":\"BAN\"},{\"name\":\"Mariveles\",\"province\":\"BAN\"},{\"name\":\"Morong\",\"province\":\"BAN\"},{\"name\":\"Orani\",\"province\":\"BAN\"},{\"name\":\"Orion\",\"province\":\"BAN\"},{\"name\":\"Pilar\",\"province\":\"BAN\"},{\"name\":\"Samal\",\"province\":\"BAN\"},{\"name\":\"Angat\",\"province\":\"BUL\"},{\"name\":\"Balagtas\",\"province\":\"BUL\"},{\"name\":\"Baliuag\",\"province\":\"BUL\"},{\"name\":\"Bocaue\",\"province\":\"BUL\"},{\"name\":\"Bulakan\",\"province\":\"BUL\"},{\"name\":\"Bustos\",\"province\":\"BUL\"},{\"name\":\"Calumpit\",\"province\":\"BUL\"},{\"name\":\"Doña Remedios Trinidad\",\"province\":\"BUL\"},{\"name\":\"Guiguinto\",\"province\":\"BUL\"},{\"name\":\"Hagonoy\",\"province\":\"BUL\"},{\"name\":\"Malolos\",\"province\":\"BUL\",\"city\":true},{\"name\":\"Marilao\",\"province\":\"BUL\"},{\"name\":\"Meycauayan\",\"province\":\"BUL\",\"city\":true},{\"name\":\"Norzagaray\",\"province\":\"BUL\"},{\"name\":\"Obando\",\"province\":\"BUL\"},{\"name\":\"Pandi\",\"province\":\"BUL\"},{\"name\":\"Paombong\",\"province\":\"BUL\"},{\"name\":\"Plaridel\",\"province\":\"BUL\"},{\"name\":\"Pulilan\",\"province\":\"BUL\"},{\"name\":\"San Ildefonso\",\"province\":\"BUL\"},{\"name\":\"San Jose del Monte\",\"province\":\"BUL\",\"city\":true},{\"name\":\"San Miguel\",\"province\":\"BUL\"},{\"name\":\"San Rafael\",\"province\":\"BUL\"},{\"name\":\"Santa Maria\",\"province\":\"BUL\"},{\"name\":\"Aliaga\",\"province\":\"NUE\"},{\"name\":\"Bongabon\",\"province\":\"NUE\"},{\"name\":\"Cabanatuan\",\"province\":\"NUE\",\"city\":true},{\"name\":\"Cabiao\",\"province\":\"NUE\"},{\"name\":\"Carranglan\",\"province\":\"NUE\"},{\"name\":\"Cuyapo\",\"province\":\"NUE\"},{\"name\":\"Gabaldon\",\"province\":\"NUE\"},{\"name\":\"Gapan\",\"province\":\"NUE\",\"city\":true},{\"name\":\"General Mamerto Natividad\",\"province\":\"NUE\"},{\"name\":\"General Tinio\",\"province\":\"NUE\"},{\"name\":\"Guimba\",\"province\":\"NUE\"},{\"name\":\"Jaen\",\"province\":\"NUE\"},{\"name\":\"Laur\",\"province\":\"NUE\"},{\"name\":\"Licab\",\"province\":\"NUE\"},{\"name\":\"Llanera\",\"province\":\"NUE\"},{\"name\":\"Lupao\",\"province\":\"NUE\"},{\"name\":\"Muñoz\",\"province\":\"NUE\",\"city\":true},{\"name\":\"Nampicuan\",\"province\":\"NUE\"},{\"name\":\"Palayan\",\"province\":\"NUE\",\"city\":true},{\"name\":\"Pantabangan\",\"province\":\"NUE\"},{\"name\":\"Peñaranda\",\"province\":\"NUE\"},{\"name\":\"Quezon\",\"province\":\"NUE\"},{\"name\":\"Rizal\",\"province\":\"NUE\"},{\"name\":\"San Antonio\",\"province\":\"NUE\"},{\"name\":\"San Isidro\",\"province\":\"NUE\"},{\"name\":\"San Jose\",\"province\":\"NUE\",\"city\":true},{\"name\":\"San Leonardo\",\"province\":\"NUE\"},{\"name\":\"Santa Rosa\",\"province\":\"NUE\"},{\"name\":\"Santo Domingo\",\"province\":\"NUE\"},{\"name\":\"Talavera\",\"province\":\"NUE\"},{\"name\":\"Talugtug\",\"province\":\"NUE\"},{\"name\":\"Zaragoza\",\"province\":\"NUE\"},{\"name\":\"Angeles\",\"province\":\"PAM\",\"city\":true},{\"name\":\"Apalit\",\"province\":\"PAM\"},{\"name\":\"Arayat\",\"province\":\"PAM\"},{\"name\":\"Bacolor\",\"province\":\"PAM\"},{\"name\":\"Candaba\",\"province\":\"PAM\"},{\"name\":\"Floridablanca\",\"province\":\"PAM\"},{\"name\":\"Guagua\",\"province\":\"PAM\"},{\"name\":\"Lubao\",\"province\":\"PAM\"},{\"name\":\"Mabalacat\",\"province\":\"PAM\",\"city\":true},{\"name\":\"Macabebe\",\"province\":\"PAM\"},{\"name\":\"Magalang\",\"province\":\"PAM\"},{\"name\":\"Masantol\",\"province\":\"PAM\"},{\"name\":\"Mexico\",\"province\":\"PAM\"},{\"name\":\"Minalin\",\"province\":\"PAM\"},{\"name\":\"Porac\",\"province\":\"PAM\"},{\"name\":\"San Fernando\",\"province\":\"PAM\",\"city\":true},{\"name\":\"San Luis\",\"province\":\"PAM\"},{\"name\":\"San Simon\",\"province\":\"PAM\"},{\"name\":\"Santa Ana\",\"province\":\"PAM\"},{\"name\":\"Santa Rita\",\"province\":\"PAM\"},{\"name\":\"Santo Tomas\",\"province\":\"PAM\"},{\"name\":\"Sasmuan\",\"province\":\"PAM\"},{\"name\":\"Anao\",\"province\":\"TAR\"},{\"name\":\"Bamban\",\"province\":\"TAR\"},{\"name\":\"Camiling\",\"province\":\"TAR\"},{\"name\":\"Capas\",\"province\":\"TAR\"},{\"name\":\"Concepcion\",\"province\":\"TAR\"},{\"name\":\"Gerona\",\"province\":\"TAR\"},{\"name\":\"La Paz\",\"province\":\"TAR\"},{\"name\":\"Mayantoc\",\"province\":\"TAR\"},{\"name\":\"Moncada\",\"province\":\"TAR\"},{\"name\":\"Paniqui\",\"province\":\"TAR\"},{\"name\":\"Pura\",\"province\":\"TAR\"},{\"name\":\"Ramos\",\"province\":\"TAR\"},{\"name\":\"San Clemente\",\"province\":\"TAR\"},{\"name\":\"San Jose\",\"province\":\"TAR\"},{\"name\":\"San Manuel\",\"province\":\"TAR\"},{\"name\":\"Santa Ignacia\",\"province\":\"TAR\"},{\"name\":\"Tarlac\",\"province\":\"TAR\",\"city\":true},{\"name\":\"Victoria\",\"province\":\"TAR\"},{\"name\":\"Botolan\",\"province\":\"ZMB\"},{\"name\":\"Cabangan\",\"province\":\"ZMB\"},{\"name\":\"Candelaria\",\"province\":\"ZMB\"},{\"name\":\"Castillejos\",\"province\":\"ZMB\"},{\"name\":\"Iba\",\"province\":\"ZMB\"},{\"name\":\"Masinloc\",\"province\":\"ZMB\"},{\"name\":\"Olongapo\",\"province\":\"ZMB\",\"city\":true},{\"name\":\"Palauig\",\"province\":\"ZMB\"},{\"name\":\"San Antonio\",\"province\":\"ZMB\"},{\"name\":\"San Felipe\",\"province\":\"ZMB\"},{\"name\":\"San Marcelino\",\"province\":\"ZMB\"},{\"name\":\"San Narciso\",\"province\":\"ZMB\"},{\"name\":\"Santa Cruz\",\"province\":\"ZMB\"},{\"name\":\"Subic\",\"province\":\"ZMB\"},{\"name\":\"Agoncillo\",\"province\":\"BTG\"},{\"name\":\"Alitagtag\",\"province\":\"BTG\"},{\"name\":\"Balayan\",\"province\":\"BTG\"},{\"name\":\"Balete\",\"province\":\"BTG\"},{\"name\":\"Batangas\",\"province\":\"BTG\",\"city\":true},{\"name\":\"Bauan\",\"province\":\"BTG\"},{\"name\":\"Calaca\",\"province\":\"BTG\"},{\"name\":\"Calatagan\",\"province\":\"BTG\"},{\"name\":\"Cuenca\",\"province\":\"BTG\"},{\"name\":\"Ibaan\",\"province\":\"BTG\"},{\"name\":\"Laurel\",\"province\":\"BTG\"},{\"name\":\"Lemery\",\"province\":\"BTG\"},{\"name\":\"Lian\",\"province\":\"BTG\"},{\"name\":\"Lipa\",\"province\":\"BTG\",\"city\":true},{\"name\":\"Lobo\",\"province\":\"BTG\"},{\"name\":\"Mabini\",\"province\":\"BTG\"},{\"name\":\"Malvar\",\"province\":\"BTG\"},{\"name\":\"Mataasnakahoy\",\"province\":\"BTG\"},{\"name\":\"Nasugbu\",\"province\":\"BTG\"},{\"name\":\"Padre Garcia\",\"province\":\"BTG\"},{\"name\":\"Rosario\",\"province\":\"BTG\"},{\"name\":\"San Jose\",\"province\":\"BTG\"},{\"name\":\"San Juan\",\"province\":\"BTG\"},{\"name\":\"San Luis\",\"province\":\"BTG\"},{\"name\":\"San Nicolas\",\"province\":\"BTG\"},{\"name\":\"San Pascual\",\"province\":\"BTG\"},{\"name\":\"Santa Teresita\",\"province\":\"BTG\"},{\"name\":\"Santo Tomas\",\"province\":\"BTG\"},{\"name\":\"Taal\",\"province\":\"BTG\"},{\"name\":\"Talisay\",\"province\":\"BTG\"},{\"name\":\"Tanauan\",\"province\":\"BTG\",\"city\":true},{\"name\":\"Taysan\",\"province\":\"BTG\"},{\"name\":\"Tingloy\",\"province\":\"BTG\"},{\"name\":\"Tuy\",\"province\":\"BTG\"},{\"name\":\"Alfonso\",\"province\":\"CAV\"},{\"name\":\"Amadeo\",\"province\":\"CAV\"},{\"name\":\"Bacoor\",\"province\":\"CAV\",\"city\":true},{\"name\":\"Carmona\",\"province\":\"CAV\"},{\"name\":\"Cavite\",\"province\":\"CAV\",\"city\":true},{\"name\":\"Dasmariñas\",\"province\":\"CAV\",\"city\":true},{\"name\":\"General Mariano Alvarez\",\"province\":\"CAV\"},{\"name\":\"General Emilio Aguinaldo\",\"province\":\"CAV\"},{\"name\":\"General Trias\",\"province\":\"CAV\"},{\"name\":\"Imus\",\"province\":\"CAV\",\"city\":true},{\"name\":\"Indang\",\"province\":\"CAV\"},{\"name\":\"Kawit\",\"province\":\"CAV\"},{\"name\":\"Magallanes\",\"province\":\"CAV\"},{\"name\":\"Maragondon\",\"province\":\"CAV\"},{\"name\":\"Mendez\",\"province\":\"CAV\"},{\"name\":\"Naic\",\"province\":\"CAV\"},{\"name\":\"Noveleta\",\"province\":\"CAV\"},{\"name\":\"Rosario\",\"province\":\"CAV\"},{\"name\":\"Silang\",\"province\":\"CAV\"},{\"name\":\"Tagaytay\",\"province\":\"CAV\",\"city\":true},{\"name\":\"Tanza\",\"province\":\"CAV\"},{\"name\":\"Ternate\",\"province\":\"CAV\"},{\"name\":\"Trece Martires\",\"province\":\"CAV\",\"city\":true},{\"name\":\"Alaminos\",\"province\":\"LAG\"},{\"name\":\"Bay\",\"province\":\"LAG\"},{\"name\":\"Biñan\",\"province\":\"LAG\",\"city\":true},{\"name\":\"Cabuyao\",\"province\":\"LAG\",\"city\":true},{\"name\":\"Calamba\",\"province\":\"LAG\",\"city\":true},{\"name\":\"Calauan\",\"province\":\"LAG\"},{\"name\":\"Cavinti\",\"province\":\"LAG\"},{\"name\":\"Famy\",\"province\":\"LAG\"},{\"name\":\"Kalayaan\",\"province\":\"LAG\"},{\"name\":\"Liliw\",\"province\":\"LAG\"},{\"name\":\"Los Baños\",\"province\":\"LAG\"},{\"name\":\"Luisiana\",\"province\":\"LAG\"},{\"name\":\"Lumban\",\"province\":\"LAG\"},{\"name\":\"Mabitac\",\"province\":\"LAG\"},{\"name\":\"Magdalena\",\"province\":\"LAG\"},{\"name\":\"Majayjay\",\"province\":\"LAG\"},{\"name\":\"Nagcarlan\",\"province\":\"LAG\"},{\"name\":\"Paete\",\"province\":\"LAG\"},{\"name\":\"Pagsanjan\",\"province\":\"LAG\"},{\"name\":\"Pakil\",\"province\":\"LAG\"},{\"name\":\"Pangil\",\"province\":\"LAG\"},{\"name\":\"Pila\",\"province\":\"LAG\"},{\"name\":\"Rizal\",\"province\":\"LAG\"},{\"name\":\"San Pablo\",\"province\":\"LAG\",\"city\":true},{\"name\":\"San Pedro\",\"province\":\"LAG\",\"city\":true},{\"name\":\"Santa Cruz\",\"province\":\"LAG\"},{\"name\":\"Santa Maria\",\"province\":\"LAG\"},{\"name\":\"Santa Rosa\",\"province\":\"LAG\",\"city\":true},{\"name\":\"Siniloan\",\"province\":\"LAG\"},{\"name\":\"Victoria\",\"province\":\"LAG\"},{\"name\":\"Agdangan\",\"province\":\"QUE\"},{\"name\":\"Alabat\",\"province\":\"QUE\"},{\"name\":\"Atimonan\",\"province\":\"QUE\"},{\"name\":\"Buenavista\",\"province\":\"QUE\"},{\"name\":\"Burdeos\",\"province\":\"QUE\"},{\"name\":\"Calauag\",\"province\":\"QUE\"},{\"name\":\"Candelaria\",\"province\":\"QUE\"},{\"name\":\"Catanauan\",\"province\":\"QUE\"},{\"name\":\"Dolores\",\"province\":\"QUE\"},{\"name\":\"General Luna\",\"province\":\"QUE\"},{\"name\":\"General Nakar\",\"province\":\"QUE\"},{\"name\":\"Guinayangan\",\"province\":\"QUE\"},{\"name\":\"Gumaca\",\"province\":\"QUE\"},{\"name\":\"Infanta\",\"province\":\"QUE\"},{\"name\":\"Jomalig\",\"province\":\"QUE\"},{\"name\":\"Lopez\",\"province\":\"QUE\"},{\"name\":\"Lucban\",\"province\":\"QUE\"},{\"name\":\"Lucena\",\"province\":\"QUE\",\"city\":true},{\"name\":\"Macalelon\",\"province\":\"QUE\"},{\"name\":\"Mauban\",\"province\":\"QUE\"},{\"name\":\"Mulanay\",\"province\":\"QUE\"},{\"name\":\"Padre Burgos\",\"province\":\"QUE\"},{\"name\":\"Pagbilao\",\"province\":\"QUE\"},{\"name\":\"Panukulan\",\"province\":\"QUE\"},{\"name\":\"Patnanungan\",\"province\":\"QUE\"},{\"name\":\"Perez\",\"province\":\"QUE\"},{\"name\":\"Pitogo\",\"province\":\"QUE\"},{\"name\":\"Plaridel\",\"province\":\"QUE\"},{\"name\":\"Polillo\",\"province\":\"QUE\"},{\"name\":\"Quezon\",\"province\":\"QUE\"},{\"name\":\"Real\",\"province\":\"QUE\"},{\"name\":\"Sampaloc\",\"province\":\"QUE\"},{\"name\":\"San Andres\",\"province\":\"QUE\"},{\"name\":\"San Antonio\",\"province\":\"QUE\"},{\"name\":\"San Francisco\",\"province\":\"QUE\"},{\"name\":\"San Narciso\",\"province\":\"QUE\"},{\"name\":\"Sariaya\",\"province\":\"QUE\"},{\"name\":\"Tagkawayan\",\"province\":\"QUE\"},{\"name\":\"Tayabas\",\"province\":\"QUE\",\"city\":true},{\"name\":\"Tiaong\",\"province\":\"QUE\"},{\"name\":\"Unisan\",\"province\":\"QUE\"},{\"name\":\"Angono\",\"province\":\"RIZ\"},{\"name\":\"Antipolo\",\"province\":\"RIZ\",\"city\":true},{\"name\":\"Baras\",\"province\":\"RIZ\"},{\"name\":\"Binangonan\",\"province\":\"RIZ\"},{\"name\":\"Cainta\",\"province\":\"RIZ\"},{\"name\":\"Cardona\",\"province\":\"RIZ\"},{\"name\":\"Jalajala\",\"province\":\"RIZ\"},{\"name\":\"Morong\",\"province\":\"RIZ\"},{\"name\":\"Pililla\",\"province\":\"RIZ\"},{\"name\":\"Rodriguez\",\"province\":\"RIZ\"},{\"name\":\"San Mateo\",\"province\":\"RIZ\"},{\"name\":\"Tanay\",\"province\":\"RIZ\"},{\"name\":\"Taytay\",\"province\":\"RIZ\"},{\"name\":\"Teresa\",\"province\":\"RIZ\"},{\"name\":\"Boac\",\"province\":\"MAD\"},{\"name\":\"Buenavista\",\"province\":\"MAD\"},{\"name\":\"Gasan\",\"province\":\"MAD\"},{\"name\":\"Mogpog\",\"province\":\"MAD\"},{\"name\":\"Santa Cruz\",\"province\":\"MAD\"},{\"name\":\"Torrijos\",\"province\":\"MAD\"},{\"name\":\"Abra de Ilog\",\"province\":\"MDC\"},{\"name\":\"Calintaan\",\"province\":\"MDC\"},{\"name\":\"Looc\",\"province\":\"MDC\"},{\"name\":\"Lubang\",\"province\":\"MDC\"},{\"name\":\"Magsaysay\",\"province\":\"MDC\"},{\"name\":\"Mamburao\",\"province\":\"MDC\"},{\"name\":\"Paluan\",\"province\":\"MDC\"},{\"name\":\"Rizal\",\"province\":\"MDC\"},{\"name\":\"Sablayan\",\"province\":\"MDC\"},{\"name\":\"San Jose\",\"province\":\"MDC\"},{\"name\":\"Santa Cruz\",\"province\":\"MDC\"},{\"name\":\"Baco\",\"province\":\"MDR\"},{\"name\":\"Bansud\",\"province\":\"MDR\"},{\"name\":\"Bongabong\",\"province\":\"MDR\"},{\"name\":\"Bulalacao\",\"province\":\"MDR\"},{\"name\":\"Calapan\",\"province\":\"MDR\",\"city\":true},{\"name\":\"Gloria\",\"province\":\"MDR\"},{\"name\":\"Mansalay\",\"province\":\"MDR\"},{\"name\":\"Naujan\",\"province\":\"MDR\"},{\"name\":\"Pinamalayan\",\"province\":\"MDR\"},{\"name\":\"Pola\",\"province\":\"MDR\"},{\"name\":\"Puerto Galera\",\"province\":\"MDR\"},{\"name\":\"Roxas\",\"province\":\"MDR\"},{\"name\":\"San Teodoro\",\"province\":\"MDR\"},{\"name\":\"Socorro\",\"province\":\"MDR\"},{\"name\":\"Victoria\",\"province\":\"MDR\"},{\"name\":\"Aborlan\",\"province\":\"PLW\"},{\"name\":\"Agutaya\",\"province\":\"PLW\"},{\"name\":\"Araceli\",\"province\":\"PLW\"},{\"name\":\"Balabac\",\"province\":\"PLW\"},{\"name\":\"Bataraza\",\"province\":\"PLW\"},{\"name\":\"Brooke's Point\",\"province\":\"PLW\"},{\"name\":\"Busuanga\",\"province\":\"PLW\"},{\"name\":\"Cagayancillo\",\"province\":\"PLW\"},{\"name\":\"Coron\",\"province\":\"PLW\"},{\"name\":\"Culion\",\"province\":\"PLW\"},{\"name\":\"Cuyo\",\"province\":\"PLW\"},{\"name\":\"Dumaran\",\"province\":\"PLW\"},{\"name\":\"El Nido\",\"province\":\"PLW\"},{\"name\":\"Kalayaan\",\"province\":\"PLW\"},{\"name\":\"Linapacan\",\"province\":\"PLW\"},{\"name\":\"Magsaysay\",\"province\":\"PLW\"},{\"name\":\"Narra\",\"province\":\"PLW\"},{\"name\":\"Puerto Princesa\",\"province\":\"PLW\",\"city\":true},{\"name\":\"Quezon\",\"province\":\"PLW\"},{\"name\":\"Rizal\",\"province\":\"PLW\"},{\"name\":\"Roxas\",\"province\":\"PLW\"},{\"name\":\"San Vicente\",\"province\":\"PLW\"},{\"name\":\"Sofronio Española\",\"province\":\"PLW\"},{\"name\":\"Taytay\",\"province\":\"PLW\"},{\"name\":\"Alcantara\",\"province\":\"ROM\"},{\"name\":\"Banton\",\"province\":\"ROM\"},{\"name\":\"Cajidiocan\",\"province\":\"ROM\"},{\"name\":\"Calatrava\",\"province\":\"ROM\"},{\"name\":\"Concepcion\",\"province\":\"ROM\"},{\"name\":\"Corcuera\",\"province\":\"ROM\"},{\"name\":\"Ferrol\",\"province\":\"ROM\"},{\"name\":\"Looc\",\"province\":\"ROM\"},{\"name\":\"Magdiwang\",\"province\":\"ROM\"},{\"name\":\"Odiongan\",\"province\":\"ROM\"},{\"name\":\"Romblon\",\"province\":\"ROM\"},{\"name\":\"San Agustin\",\"province\":\"ROM\"},{\"name\":\"San Andres\",\"province\":\"ROM\"},{\"name\":\"San Fernando\",\"province\":\"ROM\"},{\"name\":\"San Jose\",\"province\":\"ROM\"},{\"name\":\"Santa Fe\",\"province\":\"ROM\"},{\"name\":\"Santa Maria\",\"province\":\"ROM\"},{\"name\":\"Bacacay\",\"province\":\"ALB\"},{\"name\":\"Camalig\",\"province\":\"ALB\"},{\"name\":\"Daraga\",\"province\":\"ALB\"},{\"name\":\"Guinobatan\",\"province\":\"ALB\"},{\"name\":\"Jovellar\",\"province\":\"ALB\"},{\"name\":\"Legazpi\",\"province\":\"ALB\",\"city\":true},{\"name\":\"Libon\",\"province\":\"ALB\"},{\"name\":\"Ligao\",\"province\":\"ALB\",\"city\":true},{\"name\":\"Malilipot\",\"province\":\"ALB\"},{\"name\":\"Malinao\",\"province\":\"ALB\"},{\"name\":\"Manito\",\"province\":\"ALB\"},{\"name\":\"Oas\",\"province\":\"ALB\"},{\"name\":\"Pio Duran\",\"province\":\"ALB\"},{\"name\":\"Polangui\",\"province\":\"ALB\"},{\"name\":\"Rapu-Rapu\",\"province\":\"ALB\"},{\"name\":\"Santo Domingo\",\"province\":\"ALB\"},{\"name\":\"Tabaco\",\"province\":\"ALB\",\"city\":true},{\"name\":\"Tiwi\",\"province\":\"ALB\"},{\"name\":\"Basud\",\"province\":\"CAN\"},{\"name\":\"Capalonga\",\"province\":\"CAN\"},{\"name\":\"Daet\",\"province\":\"CAN\"},{\"name\":\"Jose Panganiban\",\"province\":\"CAN\"},{\"name\":\"Labo\",\"province\":\"CAN\"},{\"name\":\"Mercedes\",\"province\":\"CAN\"},{\"name\":\"Paracale\",\"province\":\"CAN\"},{\"name\":\"San Lorenzo Ruiz\",\"province\":\"CAN\"},{\"name\":\"San Vicente\",\"province\":\"CAN\"},{\"name\":\"Santa Elena\",\"province\":\"CAN\"},{\"name\":\"Talisay\",\"province\":\"CAN\"},{\"name\":\"Vinzons\",\"province\":\"CAN\"},{\"name\":\"Baao\",\"province\":\"CAS\"},{\"name\":\"Balatan\",\"province\":\"CAS\"},{\"name\":\"Bato\",\"province\":\"CAS\"},{\"name\":\"Bombon\",\"province\":\"CAS\"},{\"name\":\"Buhi\",\"province\":\"CAS\"},{\"name\":\"Bula\",\"province\":\"CAS\"},{\"name\":\"Cabusao\",\"province\":\"CAS\"},{\"name\":\"Calabanga\",\"province\":\"CAS\"},{\"name\":\"Camaligan\",\"province\":\"CAS\"},{\"name\":\"Canaman\",\"province\":\"CAS\"},{\"name\":\"Caramoan\",\"province\":\"CAS\"},{\"name\":\"Del Gallego\",\"province\":\"CAS\"},{\"name\":\"Gainza\",\"province\":\"CAS\"},{\"name\":\"Garchitorena\",\"province\":\"CAS\"},{\"name\":\"Goa\",\"province\":\"CAS\"},{\"name\":\"Iriga\",\"province\":\"CAS\",\"city\":true},{\"name\":\"Lagonoy\",\"province\":\"CAS\"},{\"name\":\"Libmanan\",\"province\":\"CAS\"},{\"name\":\"Lupi\",\"province\":\"CAS\"},{\"name\":\"Magarao\",\"province\":\"CAS\"},{\"name\":\"Milaor\",\"province\":\"CAS\"},{\"name\":\"Minalabac\",\"province\":\"CAS\"},{\"name\":\"Nabua\",\"province\":\"CAS\"},{\"name\":\"Naga\",\"province\":\"CAS\",\"city\":true},{\"name\":\"Ocampo\",\"province\":\"CAS\"},{\"name\":\"Pamplona\",\"province\":\"CAS\"},{\"name\":\"Pasacao\",\"province\":\"CAS\"},{\"name\":\"Pili\",\"province\":\"CAS\"},{\"name\":\"Presentacion\",\"province\":\"CAS\"},{\"name\":\"Ragay\",\"province\":\"CAS\"},{\"name\":\"Sagñay\",\"province\":\"CAS\"},{\"name\":\"San Fernando\",\"province\":\"CAS\"},{\"name\":\"San Jose\",\"province\":\"CAS\"},{\"name\":\"Sipocot\",\"province\":\"CAS\"},{\"name\":\"Siruma\",\"province\":\"CAS\"},{\"name\":\"Tigaon\",\"province\":\"CAS\"},{\"name\":\"Tinambac\",\"province\":\"CAS\"},{\"name\":\"Bagamanoc\",\"province\":\"CAT\"},{\"name\":\"Baras\",\"province\":\"CAT\"},{\"name\":\"Bato\",\"province\":\"CAT\"},{\"name\":\"Caramoran\",\"province\":\"CAT\"},{\"name\":\"Gigmoto\",\"province\":\"CAT\"},{\"name\":\"Pandan\",\"province\":\"CAT\"},{\"name\":\"Panganiban\",\"province\":\"CAT\"},{\"name\":\"San Andres\",\"province\":\"CAT\"},{\"name\":\"San Miguel\",\"province\":\"CAT\"},{\"name\":\"Viga\",\"province\":\"CAT\"},{\"name\":\"Virac\",\"province\":\"CAT\"},{\"name\":\"Aroroy\",\"province\":\"MAS\"},{\"name\":\"Baleno\",\"province\":\"MAS\"},{\"name\":\"Balud\",\"province\":\"MAS\"},{\"name\":\"Batuan\",\"province\":\"MAS\"},{\"name\":\"Cataingan\",\"province\":\"MAS\"},{\"name\":\"Cawayan\",\"province\":\"MAS\"},{\"name\":\"Claveria\",\"province\":\"MAS\"},{\"name\":\"Dimasalang\",\"province\":\"MAS\"},{\"name\":\"Esperanza\",\"province\":\"MAS\"},{\"name\":\"Mandaon\",\"province\":\"MAS\"},{\"name\":\"Masbate\",\"province\":\"MAS\",\"city\":true},{\"name\":\"Milagros\",\"province\":\"MAS\"},{\"name\":\"Mobo\",\"province\":\"MAS\"},{\"name\":\"Monreal\",\"province\":\"MAS\"},{\"name\":\"Palanas\",\"province\":\"MAS\"},{\"name\":\"Pio V. Corpuz\",\"province\":\"MAS\"},{\"name\":\"Placer\",\"province\":\"MAS\"},{\"name\":\"San Fernando\",\"province\":\"MAS\"},{\"name\":\"San Jacinto\",\"province\":\"MAS\"},{\"name\":\"San Pascual\",\"province\":\"MAS\"},{\"name\":\"Uson\",\"province\":\"MAS\"},{\"name\":\"Barcelona\",\"province\":\"SOR\"},{\"name\":\"Bulan\",\"province\":\"SOR\"},{\"name\":\"Bulusan\",\"province\":\"SOR\"},{\"name\":\"Casiguran\",\"province\":\"SOR\"},{\"name\":\"Castilla\",\"province\":\"SOR\"},{\"name\":\"Donsol\",\"province\":\"SOR\"},{\"name\":\"Gubat\",\"province\":\"SOR\"},{\"name\":\"Irosin\",\"province\":\"SOR\"},{\"name\":\"Juban\",\"province\":\"SOR\"},{\"name\":\"Magallanes\",\"province\":\"SOR\"},{\"name\":\"Matnog\",\"province\":\"SOR\"},{\"name\":\"Pilar\",\"province\":\"SOR\"},{\"name\":\"Prieto Diaz\",\"province\":\"SOR\"},{\"name\":\"Santa Magdalena\",\"province\":\"SOR\"},{\"name\":\"Sorsogon\",\"province\":\"SOR\",\"city\":true},{\"name\":\"Altavas\",\"province\":\"AKL\"},{\"name\":\"Balete\",\"province\":\"AKL\"},{\"name\":\"Banga\",\"province\":\"AKL\"},{\"name\":\"Batan\",\"province\":\"AKL\"},{\"name\":\"Buruanga\",\"province\":\"AKL\"},{\"name\":\"Ibajay\",\"province\":\"AKL\"},{\"name\":\"Kalibo\",\"province\":\"AKL\"},{\"name\":\"Lezo\",\"province\":\"AKL\"},{\"name\":\"Libacao\",\"province\":\"AKL\"},{\"name\":\"Madalag\",\"province\":\"AKL\"},{\"name\":\"Makato\",\"province\":\"AKL\"},{\"name\":\"Malay\",\"province\":\"AKL\"},{\"name\":\"Malinao\",\"province\":\"AKL\"},{\"name\":\"Nabas\",\"province\":\"AKL\"},{\"name\":\"New Washington\",\"province\":\"AKL\"},{\"name\":\"Numancia\",\"province\":\"AKL\"},{\"name\":\"Tangalan\",\"province\":\"AKL\"},{\"name\":\"Anini-y\",\"province\":\"ANT\"},{\"name\":\"Barbaza\",\"province\":\"ANT\"},{\"name\":\"Belison\",\"province\":\"ANT\"},{\"name\":\"Bugasong\",\"province\":\"ANT\"},{\"name\":\"Caluya\",\"province\":\"ANT\"},{\"name\":\"Culasi\",\"province\":\"ANT\"},{\"name\":\"Hamtic\",\"province\":\"ANT\"},{\"name\":\"Laua-an\",\"province\":\"ANT\"},{\"name\":\"Libertad\",\"province\":\"ANT\"},{\"name\":\"Pandan\",\"province\":\"ANT\"},{\"name\":\"Patnongon\",\"province\":\"ANT\"},{\"name\":\"San Jose\",\"province\":\"ANT\"},{\"name\":\"San Remigio\",\"province\":\"ANT\"},{\"name\":\"Sebaste\",\"province\":\"ANT\"},{\"name\":\"Sibalom\",\"province\":\"ANT\"},{\"name\":\"Tibiao\",\"province\":\"ANT\"},{\"name\":\"Tobias Fornier\",\"province\":\"ANT\"},{\"name\":\"Valderrama\",\"province\":\"ANT\"},{\"name\":\"Cuartero\",\"province\":\"CAP\"},{\"name\":\"Dao\",\"province\":\"CAP\"},{\"name\":\"Dumalag\",\"province\":\"CAP\"},{\"name\":\"Dumarao\",\"province\":\"CAP\"},{\"name\":\"Ivisan\",\"province\":\"CAP\"},{\"name\":\"Jamindan\",\"province\":\"CAP\"},{\"name\":\"Maayon\",\"province\":\"CAP\"},{\"name\":\"Mambusao\",\"province\":\"CAP\"},{\"name\":\"Panay\",\"province\":\"CAP\"},{\"name\":\"Panitan\",\"province\":\"CAP\"},{\"name\":\"Pilar\",\"province\":\"CAP\"},{\"name\":\"Pontevedra\",\"province\":\"CAP\"},{\"name\":\"President Roxas\",\"province\":\"CAP\"},{\"name\":\"Roxas\",\"province\":\"CAP\",\"city\":true},{\"name\":\"Sapian\",\"province\":\"CAP\"},{\"name\":\"Sigma\",\"province\":\"CAP\"},{\"name\":\"Tapaz\",\"province\":\"CAP\"},{\"name\":\"Buenavista\",\"province\":\"GUI\"},{\"name\":\"Jordan\",\"province\":\"GUI\"},{\"name\":\"Nueva Valencia\",\"province\":\"GUI\"},{\"name\":\"San Lorenzo\",\"province\":\"GUI\"},{\"name\":\"Sibunag\",\"province\":\"GUI\"},{\"name\":\"Ajuy\",\"province\":\"ILI\"},{\"name\":\"Alimodian\",\"province\":\"ILI\"},{\"name\":\"Anilao\",\"province\":\"ILI\"},{\"name\":\"Badiangan\",\"province\":\"ILI\"},{\"name\":\"Balasan\",\"province\":\"ILI\"},{\"name\":\"Banate\",\"province\":\"ILI\"},{\"name\":\"Barotac Nuevo\",\"province\":\"ILI\"},{\"name\":\"Barotac Viejo\",\"province\":\"ILI\"},{\"name\":\"Batad\",\"province\":\"ILI\"},{\"name\":\"Bingawan\",\"province\":\"ILI\"},{\"name\":\"Cabatuan\",\"province\":\"ILI\"},{\"name\":\"Calinog\",\"province\":\"ILI\"},{\"name\":\"Carles\",\"province\":\"ILI\"},{\"name\":\"Concepcion\",\"province\":\"ILI\"},{\"name\":\"Dingle\",\"province\":\"ILI\"},{\"name\":\"Dueñas\",\"province\":\"ILI\"},{\"name\":\"Dumangas\",\"province\":\"ILI\"},{\"name\":\"Estancia\",\"province\":\"ILI\"},{\"name\":\"Guimbal\",\"province\":\"ILI\"},{\"name\":\"Igbaras\",\"province\":\"ILI\"},{\"name\":\"Iloilo\",\"province\":\"ILI\",\"city\":true},{\"name\":\"Janiuay\",\"province\":\"ILI\"},{\"name\":\"Lambunao\",\"province\":\"ILI\"},{\"name\":\"Leganes\",\"province\":\"ILI\"},{\"name\":\"Lemery\",\"province\":\"ILI\"},{\"name\":\"Leon\",\"province\":\"ILI\"},{\"name\":\"Maasin\",\"province\":\"ILI\"},{\"name\":\"Miagao\",\"province\":\"ILI\"},{\"name\":\"Mina\",\"province\":\"ILI\"},{\"name\":\"New Lucena\",\"province\":\"ILI\"},{\"name\":\"Oton\",\"province\":\"ILI\"},{\"name\":\"Passi\",\"province\":\"ILI\",\"city\":true},{\"name\":\"Pavia\",\"province\":\"ILI\"},{\"name\":\"Pototan\",\"province\":\"ILI\"},{\"name\":\"San Dionisio\",\"province\":\"ILI\"},{\"name\":\"San Enrique\",\"province\":\"ILI\"},{\"name\":\"San Joaquin\",\"province\":\"ILI\"},{\"name\":\"San Miguel\",\"province\":\"ILI\"},{\"name\":\"San Rafael\",\"province\":\"ILI\"},{\"name\":\"Santa Barbara\",\"province\":\"ILI\"},{\"name\":\"Sara\",\"province\":\"ILI\"},{\"name\":\"Tigbauan\",\"province\":\"ILI\"},{\"name\":\"Tubungan\",\"province\":\"ILI\"},{\"name\":\"Zarraga\",\"province\":\"ILI\"},{\"name\":\"Bacolod\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Bago\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Binalbagan\",\"province\":\"NEC\"},{\"name\":\"Cadiz\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Calatrava\",\"province\":\"NEC\"},{\"name\":\"Candoni\",\"province\":\"NEC\"},{\"name\":\"Cauayan\",\"province\":\"NEC\"},{\"name\":\"Enrique B. Magalona\",\"province\":\"NEC\"},{\"name\":\"Escalante\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Himamaylan\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Hinigaran\",\"province\":\"NEC\"},{\"name\":\"Hinoba-an\",\"province\":\"NEC\"},{\"name\":\"Ilog\",\"province\":\"NEC\"},{\"name\":\"Isabela\",\"province\":\"NEC\"},{\"name\":\"Kabankalan\",\"province\":\"NEC\",\"city\":true},{\"name\":\"La Carlota\",\"province\":\"NEC\",\"city\":true},{\"name\":\"La Castellana\",\"province\":\"NEC\"},{\"name\":\"Manapla\",\"province\":\"NEC\"},{\"name\":\"Moises Padilla\",\"province\":\"NEC\"},{\"name\":\"Murcia\",\"province\":\"NEC\"},{\"name\":\"Pontevedra\",\"province\":\"NEC\"},{\"name\":\"Pulupandan\",\"province\":\"NEC\"},{\"name\":\"Sagay\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Salvador Benedicto\",\"province\":\"NEC\"},{\"name\":\"San Carlos\",\"province\":\"NEC\",\"city\":true},{\"name\":\"San Enrique\",\"province\":\"NEC\"},{\"name\":\"Silay\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Sipalay\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Talisay\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Toboso\",\"province\":\"NEC\"},{\"name\":\"Valladolid\",\"province\":\"NEC\"},{\"name\":\"Victorias\",\"province\":\"NEC\",\"city\":true},{\"name\":\"Alburquerque\",\"province\":\"BOH\"},{\"name\":\"Alicia\",\"province\":\"BOH\"},{\"name\":\"Anda\",\"province\":\"BOH\"},{\"name\":\"Antequera\",\"province\":\"BOH\"},{\"name\":\"Baclayon\",\"province\":\"BOH\"},{\"name\":\"Balilihan\",\"province\":\"BOH\"},{\"name\":\"Batuan\",\"province\":\"BOH\"},{\"name\":\"Bien Unido\",\"province\":\"BOH\"},{\"name\":\"Bilar\",\"province\":\"BOH\"},{\"name\":\"Buenavista\",\"province\":\"BOH\"},{\"name\":\"Calape\",\"province\":\"BOH\"},{\"name\":\"Candijay\",\"province\":\"BOH\"},{\"name\":\"Carmen\",\"province\":\"BOH\"},{\"name\":\"Catigbian\",\"province\":\"BOH\"},{\"name\":\"Clarin\",\"province\":\"BOH\"},{\"name\":\"Corella\",\"province\":\"BOH\"},{\"name\":\"Cortes\",\"province\":\"BOH\"},{\"name\":\"Dagohoy\",\"province\":\"BOH\"},{\"name\":\"Danao\",\"province\":\"BOH\"},{\"name\":\"Dauis\",\"province\":\"BOH\"},{\"name\":\"Dimiao\",\"province\":\"BOH\"},{\"name\":\"Duero\",\"province\":\"BOH\"},{\"name\":\"Garcia Hernandez\",\"province\":\"BOH\"},{\"name\":\"Getafe\",\"province\":\"BOH\"},{\"name\":\"Guindulman\",\"province\":\"BOH\"},{\"name\":\"Inabanga\",\"province\":\"BOH\"},{\"name\":\"Jagna\",\"province\":\"BOH\"},{\"name\":\"Lila\",\"province\":\"BOH\"},{\"name\":\"Loay\",\"province\":\"BOH\"},{\"name\":\"Loboc\",\"province\":\"BOH\"},{\"name\":\"Loon\",\"province\":\"BOH\"},{\"name\":\"Mabini\",\"province\":\"BOH\"},{\"name\":\"Maribojoc\",\"province\":\"BOH\"},{\"name\":\"Panglao\",\"province\":\"BOH\"},{\"name\":\"Pilar\",\"province\":\"BOH\"},{\"name\":\"President Carlos P. Garcia\",\"province\":\"BOH\"},{\"name\":\"Sagbayan\",\"province\":\"BOH\"},{\"name\":\"San Isidro\",\"province\":\"BOH\"},{\"name\":\"San Miguel\",\"province\":\"BOH\"},{\"name\":\"Sevilla\",\"province\":\"BOH\"},{\"name\":\"Sierra Bullones\",\"province\":\"BOH\"},{\"name\":\"Sikatuna\",\"province\":\"BOH\"},{\"name\":\"Tagbilaran\",\"province\":\"BOH\",\"city\":true},{\"name\":\"Talibon\",\"province\":\"BOH\"},{\"name\":\"Trinidad\",\"province\":\"BOH\"},{\"name\":\"Tubigon\",\"province\":\"BOH\"},{\"name\":\"Ubay\",\"province\":\"BOH\"},{\"name\":\"Valencia\",\"province\":\"BOH\"},{\"name\":\"Alcantara\",\"province\":\"CEB\"},{\"name\":\"Alcoy\",\"province\":\"CEB\"},{\"name\":\"Alegria\",\"province\":\"CEB\"},{\"name\":\"Aloguinsan\",\"province\":\"CEB\"},{\"name\":\"Argao\",\"province\":\"CEB\"},{\"name\":\"Asturias\",\"province\":\"CEB\"},{\"name\":\"Badian\",\"province\":\"CEB\"},{\"name\":\"Balamban\",\"province\":\"CEB\"},{\"name\":\"Bantayan\",\"province\":\"CEB\"},{\"name\":\"Barili\",\"province\":\"CEB\"},{\"name\":\"Bogo\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Boljoon\",\"province\":\"CEB\"},{\"name\":\"Borbon\",\"province\":\"CEB\"},{\"name\":\"Carcar\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Carmen\",\"province\":\"CEB\"},{\"name\":\"Catmon\",\"province\":\"CEB\"},{\"name\":\"Cebu\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Compostela\",\"province\":\"CEB\"},{\"name\":\"Consolacion\",\"province\":\"CEB\"},{\"name\":\"Cordoba\",\"province\":\"CEB\"},{\"name\":\"Daanbantayan\",\"province\":\"CEB\"},{\"name\":\"Dalaguete\",\"province\":\"CEB\"},{\"name\":\"Danao\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Dumanjug\",\"province\":\"CEB\"},{\"name\":\"Ginatilan\",\"province\":\"CEB\"},{\"name\":\"Lapu-Lapu\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Liloan\",\"province\":\"CEB\"},{\"name\":\"Madridejos\",\"province\":\"CEB\"},{\"name\":\"Malabuyoc\",\"province\":\"CEB\"},{\"name\":\"Mandaue\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Medellin\",\"province\":\"CEB\"},{\"name\":\"Minglanilla\",\"province\":\"CEB\"},{\"name\":\"Moalboal\",\"province\":\"CEB\"},{\"name\":\"Naga\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Oslob\",\"province\":\"CEB\"},{\"name\":\"Pilar\",\"province\":\"CEB\"},{\"name\":\"Pinamungajan\",\"province\":\"CEB\"},{\"name\":\"Poro\",\"province\":\"CEB\"},{\"name\":\"Ronda\",\"province\":\"CEB\"},{\"name\":\"Samboan\",\"province\":\"CEB\"},{\"name\":\"San Fernando\",\"province\":\"CEB\"},{\"name\":\"San Francisco\",\"province\":\"CEB\"},{\"name\":\"San Remigio\",\"province\":\"CEB\"},{\"name\":\"Santa Fe\",\"province\":\"CEB\"},{\"name\":\"Santander\",\"province\":\"CEB\"},{\"name\":\"Sibonga\",\"province\":\"CEB\"},{\"name\":\"Sogod\",\"province\":\"CEB\"},{\"name\":\"Tabogon\",\"province\":\"CEB\"},{\"name\":\"Tabuelan\",\"province\":\"CEB\"},{\"name\":\"Talisay\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Toledo\",\"province\":\"CEB\",\"city\":true},{\"name\":\"Tuburan\",\"province\":\"CEB\"},{\"name\":\"Tudela\",\"province\":\"CEB\"},{\"name\":\"Amlan\",\"province\":\"NER\"},{\"name\":\"Ayungon\",\"province\":\"NER\"},{\"name\":\"Bacong\",\"province\":\"NER\"},{\"name\":\"Bais\",\"province\":\"NER\",\"city\":true},{\"name\":\"Basay\",\"province\":\"NER\"},{\"name\":\"Bayawan\",\"province\":\"NER\",\"city\":true},{\"name\":\"Bindoy\",\"province\":\"NER\"},{\"name\":\"Canlaon\",\"province\":\"NER\",\"city\":true},{\"name\":\"Dauin\",\"province\":\"NER\"},{\"name\":\"Dumaguete\",\"province\":\"NER\",\"city\":true},{\"name\":\"Guihulngan\",\"province\":\"NER\",\"city\":true},{\"name\":\"Jimalalud\",\"province\":\"NER\"},{\"name\":\"La Libertad\",\"province\":\"NER\"},{\"name\":\"Mabinay\",\"province\":\"NER\"},{\"name\":\"Manjuyod\",\"province\":\"NER\"},{\"name\":\"Pamplona\",\"province\":\"NER\"},{\"name\":\"San Jose\",\"province\":\"NER\"},{\"name\":\"Santa Catalina\",\"province\":\"NER\"},{\"name\":\"Siaton\",\"province\":\"NER\"},{\"name\":\"Sibulan\",\"province\":\"NER\"},{\"name\":\"Tanjay\",\"province\":\"NER\",\"city\":true},{\"name\":\"Tayasan\",\"province\":\"NER\"},{\"name\":\"Valencia\",\"province\":\"NER\"},{\"name\":\"Vallehermoso\",\"province\":\"NER\"},{\"name\":\"Zamboanguita\",\"province\":\"NER\"},{\"name\":\"Enrique Villanueva\",\"province\":\"SIG\"},{\"name\":\"Larena\",\"province\":\"SIG\"},{\"name\":\"Lazi\",\"province\":\"SIG\"},{\"name\":\"Maria\",\"province\":\"SIG\"},{\"name\":\"San Juan\",\"province\":\"SIG\"},{\"name\":\"Siquijor\",\"province\":\"SIG\"},{\"name\":\"Almeria\",\"province\":\"BIL\"},{\"name\":\"Biliran\",\"province\":\"BIL\"},{\"name\":\"Cabucgayan\",\"province\":\"BIL\"},{\"name\":\"Caibiran\",\"province\":\"BIL\"},{\"name\":\"Culaba\",\"province\":\"BIL\"},{\"name\":\"Kawayan\",\"province\":\"BIL\"},{\"name\":\"Maripipi\",\"province\":\"BIL\"},{\"name\":\"Naval\",\"province\":\"BIL\"},{\"name\":\"Arteche\",\"province\":\"EAS\"},{\"name\":\"Balangiga\",\"province\":\"EAS\"},{\"name\":\"Balangkayan\",\"province\":\"EAS\"},{\"name\":\"Borongan\",\"province\":\"EAS\",\"city\":true},{\"name\":\"Can-avid\",\"province\":\"EAS\"},{\"name\":\"Dolores\",\"province\":\"EAS\"},{\"name\":\"General MacArthur\",\"province\":\"EAS\"},{\"name\":\"Giporlos\",\"province\":\"EAS\"},{\"name\":\"Guiuan\",\"province\":\"EAS\"},{\"name\":\"Hernani\",\"province\":\"EAS\"},{\"name\":\"Jipapad\",\"province\":\"EAS\"},{\"name\":\"Lawaan\",\"province\":\"EAS\"},{\"name\":\"Llorente\",\"province\":\"EAS\"},{\"name\":\"Maslog\",\"province\":\"EAS\"},{\"name\":\"Maydolong\",\"province\":\"EAS\"},{\"name\":\"Mercedes\",\"province\":\"EAS\"},{\"name\":\"Oras\",\"province\":\"EAS\"},{\"name\":\"Quinapondan\",\"province\":\"EAS\"},{\"name\":\"Salcedo\",\"province\":\"EAS\"},{\"name\":\"San Julian\",\"province\":\"EAS\"},{\"name\":\"San Policarpo\",\"province\":\"EAS\"},{\"name\":\"Sulat\",\"province\":\"EAS\"},{\"name\":\"Taft\",\"province\":\"EAS\"},{\"name\":\"Abuyog\",\"province\":\"LEY\"},{\"name\":\"Alangalang\",\"province\":\"LEY\"},{\"name\":\"Albuera\",\"province\":\"LEY\"},{\"name\":\"Babatngon\",\"province\":\"LEY\"},{\"name\":\"Barugo\",\"province\":\"LEY\"},{\"name\":\"Bato\",\"province\":\"LEY\"},{\"name\":\"Baybay\",\"province\":\"LEY\",\"city\":true},{\"name\":\"Burauen\",\"province\":\"LEY\"},{\"name\":\"Calubian\",\"province\":\"LEY\"},{\"name\":\"Capoocan\",\"province\":\"LEY\"},{\"name\":\"Carigara\",\"province\":\"LEY\"},{\"name\":\"Dagami\",\"province\":\"LEY\"},{\"name\":\"Dulag\",\"province\":\"LEY\"},{\"name\":\"Hilongos\",\"province\":\"LEY\"},{\"name\":\"Hindang\",\"province\":\"LEY\"},{\"name\":\"Inopacan\",\"province\":\"LEY\"},{\"name\":\"Isabel\",\"province\":\"LEY\"},{\"name\":\"Jaro\",\"province\":\"LEY\"},{\"name\":\"Javier\",\"province\":\"LEY\"},{\"name\":\"Julita\",\"province\":\"LEY\"},{\"name\":\"Kananga\",\"province\":\"LEY\"},{\"name\":\"La Paz\",\"province\":\"LEY\"},{\"name\":\"Leyte\",\"province\":\"LEY\"},{\"name\":\"MacArthur\",\"province\":\"LEY\"},{\"name\":\"Mahaplag\",\"province\":\"LEY\"},{\"name\":\"Matag-ob\",\"province\":\"LEY\"},{\"name\":\"Matalom\",\"province\":\"LEY\"},{\"name\":\"Mayorga\",\"province\":\"LEY\"},{\"name\":\"Merida\",\"province\":\"LEY\"},{\"name\":\"Ormoc\",\"province\":\"LEY\",\"city\":true},{\"name\":\"Palo\",\"province\":\"LEY\"},{\"name\":\"Palompon\",\"province\":\"LEY\"},{\"name\":\"Pastrana\",\"province\":\"LEY\"},{\"name\":\"San Isidro\",\"province\":\"LEY\"},{\"name\":\"San Miguel\",\"province\":\"LEY\"},{\"name\":\"Santa Fe\",\"province\":\"LEY\"},{\"name\":\"Tabango\",\"province\":\"LEY\"},{\"name\":\"Tabontabon\",\"province\":\"LEY\"},{\"name\":\"Tacloban\",\"province\":\"LEY\",\"city\":true},{\"name\":\"Tanauan\",\"province\":\"LEY\"},{\"name\":\"Tolosa\",\"province\":\"LEY\"},{\"name\":\"Tunga\",\"province\":\"LEY\"},{\"name\":\"Villaba\",\"province\":\"LEY\"},{\"name\":\"Allen\",\"province\":\"NSA\"},{\"name\":\"Biri\",\"province\":\"NSA\"},{\"name\":\"Bobon\",\"province\":\"NSA\"},{\"name\":\"Capul\",\"province\":\"NSA\"},{\"name\":\"Catarman\",\"province\":\"NSA\"},{\"name\":\"Catubig\",\"province\":\"NSA\"},{\"name\":\"Gamay\",\"province\":\"NSA\"},{\"name\":\"Laoang\",\"province\":\"NSA\"},{\"name\":\"Lapinig\",\"province\":\"NSA\"},{\"name\":\"Las Navas\",\"province\":\"NSA\"},{\"name\":\"Lavezares\",\"province\":\"NSA\"},{\"name\":\"Lope de Vega\",\"province\":\"NSA\"},{\"name\":\"Mapanas\",\"province\":\"NSA\"},{\"name\":\"Mondragon\",\"province\":\"NSA\"},{\"name\":\"Palapag\",\"province\":\"NSA\"},{\"name\":\"Pambujan\",\"province\":\"NSA\"},{\"name\":\"Rosario\",\"province\":\"NSA\"},{\"name\":\"San Antonio\",\"province\":\"NSA\"},{\"name\":\"San Isidro\",\"province\":\"NSA\"},{\"name\":\"San Jose\",\"province\":\"NSA\"},{\"name\":\"San Roque\",\"province\":\"NSA\"},{\"name\":\"San Vicente\",\"province\":\"NSA\"},{\"name\":\"Silvino Lobos\",\"province\":\"NSA\"},{\"name\":\"Victoria\",\"province\":\"NSA\"},{\"name\":\"Almagro\",\"province\":\"WSA\"},{\"name\":\"Basey\",\"province\":\"WSA\"},{\"name\":\"Calbayog\",\"province\":\"WSA\",\"city\":true},{\"name\":\"Calbiga\",\"province\":\"WSA\"},{\"name\":\"Catbalogan\",\"province\":\"WSA\",\"city\":true},{\"name\":\"Daram\",\"province\":\"WSA\"},{\"name\":\"Gandara\",\"province\":\"WSA\"},{\"name\":\"Hinabangan\",\"province\":\"WSA\"},{\"name\":\"Jiabong\",\"province\":\"WSA\"},{\"name\":\"Marabut\",\"province\":\"WSA\"},{\"name\":\"Matuguinao\",\"province\":\"WSA\"},{\"name\":\"Motiong\",\"province\":\"WSA\"},{\"name\":\"Pagsanghan\",\"province\":\"WSA\"},{\"name\":\"Paranas\",\"province\":\"WSA\"},{\"name\":\"Pinabacdao\",\"province\":\"WSA\"},{\"name\":\"San Jorge\",\"province\":\"WSA\"},{\"name\":\"San Jose de Buan\",\"province\":\"WSA\"},{\"name\":\"San Sebastian\",\"province\":\"WSA\"},{\"name\":\"Santa Margarita\",\"province\":\"WSA\"},{\"name\":\"Santa Rita\",\"province\":\"WSA\"},{\"name\":\"Santo Niño\",\"province\":\"WSA\"},{\"name\":\"Tagapul-an\",\"province\":\"WSA\"},{\"name\":\"Talalora\",\"province\":\"WSA\"},{\"name\":\"Tarangnan\",\"province\":\"WSA\"},{\"name\":\"Villareal\",\"province\":\"WSA\"},{\"name\":\"Zumarraga\",\"province\":\"WSA\"},{\"name\":\"Anahawan\",\"province\":\"SLE\"},{\"name\":\"Bontoc\",\"province\":\"SLE\"},{\"name\":\"Hinunangan\",\"province\":\"SLE\"},{\"name\":\"Hinundayan\",\"province\":\"SLE\"},{\"name\":\"Libagon\",\"province\":\"SLE\"},{\"name\":\"Liloan\",\"province\":\"SLE\"},{\"name\":\"Limasawa\",\"province\":\"SLE\"},{\"name\":\"Maasin\",\"province\":\"SLE\",\"city\":true},{\"name\":\"Macrohon\",\"province\":\"SLE\"},{\"name\":\"Malitbog\",\"province\":\"SLE\"},{\"name\":\"Padre Burgos\",\"province\":\"SLE\"},{\"name\":\"Pintuyan\",\"province\":\"SLE\"},{\"name\":\"Saint Bernard\",\"province\":\"SLE\"},{\"name\":\"San Francisco\",\"province\":\"SLE\"},{\"name\":\"San Juan\",\"province\":\"SLE\"},{\"name\":\"San Ricardo\",\"province\":\"SLE\"},{\"name\":\"Silago\",\"province\":\"SLE\"},{\"name\":\"Sogod\",\"province\":\"SLE\"},{\"name\":\"Tomas Oppus\",\"province\":\"SLE\"},{\"name\":\"Baliguian\",\"province\":\"ZAN\"},{\"name\":\"Dapitan\",\"province\":\"ZAN\",\"city\":true},{\"name\":\"Dipolog\",\"province\":\"ZAN\",\"city\":true},{\"name\":\"Godod\",\"province\":\"ZAN\"},{\"name\":\"Gutalac\",\"province\":\"ZAN\"},{\"name\":\"Jose Dalman\",\"province\":\"ZAN\"},{\"name\":\"Kalawit\",\"province\":\"ZAN\"},{\"name\":\"Katipunan\",\"province\":\"ZAN\"},{\"name\":\"La Libertad\",\"province\":\"ZAN\"},{\"name\":\"Labason\",\"province\":\"ZAN\"},{\"name\":\"Leon B. Postigo\",\"province\":\"ZAN\"},{\"name\":\"Liloy\",\"province\":\"ZAN\"},{\"name\":\"Manukan\",\"province\":\"ZAN\"},{\"name\":\"Mutia\",\"province\":\"ZAN\"},{\"name\":\"Piñan\",\"province\":\"ZAN\"},{\"name\":\"Polanco\",\"province\":\"ZAN\"},{\"name\":\"President Manuel A. Roxas\",\"province\":\"ZAN\"},{\"name\":\"Rizal\",\"province\":\"ZAN\"},{\"name\":\"Salug\",\"province\":\"ZAN\"},{\"name\":\"Sergio Osmeña Sr.\",\"province\":\"ZAN\"},{\"name\":\"Siayan\",\"province\":\"ZAN\"},{\"name\":\"Sibuco\",\"province\":\"ZAN\"},{\"name\":\"Sibutad\",\"province\":\"ZAN\"},{\"name\":\"Sindangan\",\"province\":\"ZAN\"},{\"name\":\"Siocon\",\"province\":\"ZAN\"},{\"name\":\"Sirawai\",\"province\":\"ZAN\"},{\"name\":\"Tampilisan\",\"province\":\"ZAN\"},{\"name\":\"Aurora\",\"province\":\"ZAS\"},{\"name\":\"Bayog\",\"province\":\"ZAS\"},{\"name\":\"Dimataling\",\"province\":\"ZAS\"},{\"name\":\"Dinas\",\"province\":\"ZAS\"},{\"name\":\"Dumalinao\",\"province\":\"ZAS\"},{\"name\":\"Dumingag\",\"province\":\"ZAS\"},{\"name\":\"Guipos\",\"province\":\"ZAS\"},{\"name\":\"Josefina\",\"province\":\"ZAS\"},{\"name\":\"Kumalarang\",\"province\":\"ZAS\"},{\"name\":\"Labangan\",\"province\":\"ZAS\"},{\"name\":\"Lakewood\",\"province\":\"ZAS\"},{\"name\":\"Lapuyan\",\"province\":\"ZAS\"},{\"name\":\"Mahayag\",\"province\":\"ZAS\"},{\"name\":\"Margosatubig\",\"province\":\"ZAS\"},{\"name\":\"Midsalip\",\"province\":\"ZAS\"},{\"name\":\"Molave\",\"province\":\"ZAS\"},{\"name\":\"Pagadian\",\"province\":\"ZAS\",\"city\":true},{\"name\":\"Pitogo\",\"province\":\"ZAS\"},{\"name\":\"Ramon Magsaysay\",\"province\":\"ZAS\"},{\"name\":\"San Miguel\",\"province\":\"ZAS\"},{\"name\":\"San Pablo\",\"province\":\"ZAS\"},{\"name\":\"Sominot\",\"province\":\"ZAS\"},{\"name\":\"Tabina\",\"province\":\"ZAS\"},{\"name\":\"Tambulig\",\"province\":\"ZAS\"},{\"name\":\"Tigbao\",\"province\":\"ZAS\"},{\"name\":\"Tukuran\",\"province\":\"ZAS\"},{\"name\":\"Vincenzo A. Sagun\",\"province\":\"ZAS\"},{\"name\":\"Zamboanga\",\"province\":\"ZAS\",\"city\":true},{\"name\":\"Alicia\",\"province\":\"ZSI\"},{\"name\":\"Buug\",\"province\":\"ZSI\"},{\"name\":\"Diplahan\",\"province\":\"ZSI\"},{\"name\":\"Imelda\",\"province\":\"ZSI\"},{\"name\":\"Ipil\",\"province\":\"ZSI\"},{\"name\":\"Kabasalan\",\"province\":\"ZSI\"},{\"name\":\"Mabuhay\",\"province\":\"ZSI\"},{\"name\":\"Malangas\",\"province\":\"ZSI\"},{\"name\":\"Naga\",\"province\":\"ZSI\"},{\"name\":\"Olutanga\",\"province\":\"ZSI\"},{\"name\":\"Payao\",\"province\":\"ZSI\"},{\"name\":\"Roseller Lim\",\"province\":\"ZSI\"},{\"name\":\"Siay\",\"province\":\"ZSI\"},{\"name\":\"Talusan\",\"province\":\"ZSI\"},{\"name\":\"Titay\",\"province\":\"ZSI\"},{\"name\":\"Tungawan\",\"province\":\"ZSI\"},{\"name\":\"Baungon\",\"province\":\"BUK\"},{\"name\":\"Cabanglasan\",\"province\":\"BUK\"},{\"name\":\"Damulog\",\"province\":\"BUK\"},{\"name\":\"Dangcagan\",\"province\":\"BUK\"},{\"name\":\"Don Carlos\",\"province\":\"BUK\"},{\"name\":\"Impasugong\",\"province\":\"BUK\"},{\"name\":\"Kadingilan\",\"province\":\"BUK\"},{\"name\":\"Kalilangan\",\"province\":\"BUK\"},{\"name\":\"Kibawe\",\"province\":\"BUK\"},{\"name\":\"Kitaotao\",\"province\":\"BUK\"},{\"name\":\"Lantapan\",\"province\":\"BUK\"},{\"name\":\"Libona\",\"province\":\"BUK\"},{\"name\":\"Malaybalay\",\"province\":\"BUK\",\"city\":true},{\"name\":\"Malitbog\",\"province\":\"BUK\"},{\"name\":\"Manolo Fortich\",\"province\":\"BUK\"},{\"name\":\"Maramag\",\"province\":\"BUK\"},{\"name\":\"Pangantucan\",\"province\":\"BUK\"},{\"name\":\"Quezon\",\"province\":\"BUK\"},{\"name\":\"San Fernando\",\"province\":\"BUK\"},{\"name\":\"Sumilao\",\"province\":\"BUK\"},{\"name\":\"Talakag\",\"province\":\"BUK\"},{\"name\":\"Valencia\",\"province\":\"BUK\",\"city\":true},{\"name\":\"Catarman\",\"province\":\"CAM\"},{\"name\":\"Guinsiliban\",\"province\":\"CAM\"},{\"name\":\"Mahinog\",\"province\":\"CAM\"},{\"name\":\"Mambajao\",\"province\":\"CAM\"},{\"name\":\"Sagay\",\"province\":\"CAM\"},{\"name\":\"Bacolod\",\"province\":\"LAN\"},{\"name\":\"Baloi\",\"province\":\"LAN\"},{\"name\":\"Baroy\",\"province\":\"LAN\"},{\"name\":\"Iligan\",\"province\":\"LAN\",\"city\":true},{\"name\":\"Kapatagan\",\"province\":\"LAN\"},{\"name\":\"Kauswagan\",\"province\":\"LAN\"},{\"name\":\"Kolambugan\",\"province\":\"LAN\"},{\"name\":\"Lala\",\"province\":\"LAN\"},{\"name\":\"Linamon\",\"province\":\"LAN\"},{\"name\":\"Magsaysay\",\"province\":\"LAN\"},{\"name\":\"Maigo\",\"province\":\"LAN\"},{\"name\":\"Matungao\",\"province\":\"LAN\"},{\"name\":\"Munai\",\"province\":\"LAN\"},{\"name\":\"Nunungan\",\"province\":\"LAN\"},{\"name\":\"Pantao Ragat\",\"province\":\"LAN\"},{\"name\":\"Pantar\",\"province\":\"LAN\"},{\"name\":\"Poona Piagapo\",\"province\":\"LAN\"},{\"name\":\"Salvador\",\"province\":\"LAN\"},{\"name\":\"Sapad\",\"province\":\"LAN\"},{\"name\":\"Sultan Naga Dimaporo\",\"province\":\"LAN\"},{\"name\":\"Tagoloan\",\"province\":\"LAN\"},{\"name\":\"Tangcal\",\"province\":\"LAN\"},{\"name\":\"Tubod\",\"province\":\"LAN\"},{\"name\":\"Aloran\",\"province\":\"MSC\"},{\"name\":\"Baliangao\",\"province\":\"MSC\"},{\"name\":\"Bonifacio\",\"province\":\"MSC\"},{\"name\":\"Calamba\",\"province\":\"MSC\"},{\"name\":\"Clarin\",\"province\":\"MSC\"},{\"name\":\"Concepcion\",\"province\":\"MSC\"},{\"name\":\"Don Victoriano Chiongbian\",\"province\":\"MSC\"},{\"name\":\"Jimenez\",\"province\":\"MSC\"},{\"name\":\"Lopez Jaena\",\"province\":\"MSC\"},{\"name\":\"Oroquieta\",\"province\":\"MSC\",\"city\":true},{\"name\":\"Ozamiz\",\"province\":\"MSC\",\"city\":true},{\"name\":\"Panaon\",\"province\":\"MSC\"},{\"name\":\"Plaridel\",\"province\":\"MSC\"},{\"name\":\"Sapang Dalaga\",\"province\":\"MSC\"},{\"name\":\"Sinacaban\",\"province\":\"MSC\"},{\"name\":\"Tangub\",\"province\":\"MSC\",\"city\":true},{\"name\":\"Tudela\",\"province\":\"MSC\"},{\"name\":\"Alubijid\",\"province\":\"MSR\"},{\"name\":\"Balingasag\",\"province\":\"MSR\"},{\"name\":\"Balingoan\",\"province\":\"MSR\"},{\"name\":\"Binuangan\",\"province\":\"MSR\"},{\"name\":\"Cagayan de Oro\",\"province\":\"MSR\",\"city\":true},{\"name\":\"Claveria\",\"province\":\"MSR\"},{\"name\":\"El Salvador\",\"province\":\"MSR\",\"city\":true},{\"name\":\"Gingoog\",\"province\":\"MSR\",\"city\":true},{\"name\":\"Gitagum\",\"province\":\"MSR\"},{\"name\":\"Initao\",\"province\":\"MSR\"},{\"name\":\"Jasaan\",\"province\":\"MSR\"},{\"name\":\"Kinoguitan\",\"province\":\"MSR\"},{\"name\":\"Lagonglong\",\"province\":\"MSR\"},{\"name\":\"Laguindingan\",\"province\":\"MSR\"},{\"name\":\"Libertad\",\"province\":\"MSR\"},{\"name\":\"Lugait\",\"province\":\"MSR\"},{\"name\":\"Magsaysay\",\"province\":\"MSR\"},{\"name\":\"Manticao\",\"province\":\"MSR\"},{\"name\":\"Medina\",\"province\":\"MSR\"},{\"name\":\"Naawan\",\"province\":\"MSR\"},{\"name\":\"Opol\",\"province\":\"MSR\"},{\"name\":\"Salay\",\"province\":\"MSR\"},{\"name\":\"Sugbongcogon\",\"province\":\"MSR\"},{\"name\":\"Tagoloan\",\"province\":\"MSR\"},{\"name\":\"Talisayan\",\"province\":\"MSR\"},{\"name\":\"Villanueva\",\"province\":\"MSR\"},{\"name\":\"Compostela\",\"province\":\"COM\"},{\"name\":\"Laak\",\"province\":\"COM\"},{\"name\":\"Mabini\",\"province\":\"COM\"},{\"name\":\"Maco\",\"province\":\"COM\"},{\"name\":\"Maragusan\",\"province\":\"COM\"},{\"name\":\"Mawab\",\"province\":\"COM\"},{\"name\":\"Monkayo\",\"province\":\"COM\"},{\"name\":\"Montevista\",\"province\":\"COM\"},{\"name\":\"Nabunturan\",\"province\":\"COM\"},{\"name\":\"New Bataan\",\"province\":\"COM\"},{\"name\":\"Pantukan\",\"province\":\"COM\"},{\"name\":\"Asuncion\",\"province\":\"DAV\"},{\"name\":\"Braulio E. Dujali\",\"province\":\"DAV\"},{\"name\":\"Carmen\",\"province\":\"DAV\"},{\"name\":\"Kapalong\",\"province\":\"DAV\"},{\"name\":\"New Corella\",\"province\":\"DAV\"},{\"name\":\"Panabo\",\"province\":\"DAV\",\"city\":true},{\"name\":\"Samal\",\"province\":\"DAV\",\"city\":true},{\"name\":\"San Isidro\",\"province\":\"DAV\"},{\"name\":\"Santo Tomas\",\"province\":\"DAV\"},{\"name\":\"Tagum\",\"province\":\"DAV\",\"city\":true},{\"name\":\"Talaingod\",\"province\":\"DAV\"},{\"name\":\"Bansalan\",\"province\":\"DAS\"},{\"name\":\"Davao\",\"province\":\"DAS\",\"city\":true},{\"name\":\"Digos\",\"province\":\"DAS\",\"city\":true},{\"name\":\"Hagonoy\",\"province\":\"DAS\"},{\"name\":\"Kiblawan\",\"province\":\"DAS\"},{\"name\":\"Magsaysay\",\"province\":\"DAS\"},{\"name\":\"Malalag\",\"province\":\"DAS\"},{\"name\":\"Matanao\",\"province\":\"DAS\"},{\"name\":\"Padada\",\"province\":\"DAS\"},{\"name\":\"Santa Cruz\",\"province\":\"DAS\"},{\"name\":\"Sulop\",\"province\":\"DAS\"},{\"name\":\"Don Marcelino\",\"province\":\"DAC\"},{\"name\":\"Jose Abad Santos\",\"province\":\"DAC\"},{\"name\":\"Malita\",\"province\":\"DAC\"},{\"name\":\"Santa Maria\",\"province\":\"DAC\"},{\"name\":\"Sarangani\",\"province\":\"DAC\"},{\"name\":\"Baganga\",\"province\":\"DAO\"},{\"name\":\"Banaybanay\",\"province\":\"DAO\"},{\"name\":\"Boston\",\"province\":\"DAO\"},{\"name\":\"Caraga\",\"province\":\"DAO\"},{\"name\":\"Cateel\",\"province\":\"DAO\"},{\"name\":\"Governor Generoso\",\"province\":\"DAO\"},{\"name\":\"Lupon\",\"province\":\"DAO\"},{\"name\":\"Manay\",\"province\":\"DAO\"},{\"name\":\"Mati\",\"province\":\"DAO\",\"city\":true},{\"name\":\"San Isidro\",\"province\":\"DAO\"},{\"name\":\"Tarragona\",\"province\":\"DAO\"},{\"name\":\"Alamada\",\"province\":\"NCO\"},{\"name\":\"Aleosan\",\"province\":\"NCO\"},{\"name\":\"Antipas\",\"province\":\"NCO\"},{\"name\":\"Arakan\",\"province\":\"NCO\"},{\"name\":\"Banisilan\",\"province\":\"NCO\"},{\"name\":\"Carmen\",\"province\":\"NCO\"},{\"name\":\"Kabacan\",\"province\":\"NCO\"},{\"name\":\"Kidapawan\",\"province\":\"NCO\",\"city\":true},{\"name\":\"Libungan\",\"province\":\"NCO\"},{\"name\":\"M'lang\",\"province\":\"NCO\"},{\"name\":\"Magpet\",\"province\":\"NCO\"},{\"name\":\"Makilala\",\"province\":\"NCO\"},{\"name\":\"Matalam\",\"province\":\"NCO\"},{\"name\":\"Midsayap\",\"province\":\"NCO\"},{\"name\":\"Pigcawayan\",\"province\":\"NCO\"},{\"name\":\"Pikit\",\"province\":\"NCO\"},{\"name\":\"President Roxas\",\"province\":\"NCO\"},{\"name\":\"Tulunan\",\"province\":\"NCO\"},{\"name\":\"Alabel\",\"province\":\"SAR\"},{\"name\":\"Glan\",\"province\":\"SAR\"},{\"name\":\"Kiamba\",\"province\":\"SAR\"},{\"name\":\"Maasim\",\"province\":\"SAR\"},{\"name\":\"Maitum\",\"province\":\"SAR\"},{\"name\":\"Malapatan\",\"province\":\"SAR\"},{\"name\":\"Malungon\",\"province\":\"SAR\"},{\"name\":\"Banga\",\"province\":\"SCO\"},{\"name\":\"General Santos\",\"province\":\"SCO\",\"city\":true},{\"name\":\"Koronadal\",\"province\":\"SCO\",\"city\":true},{\"name\":\"Lake Sebu\",\"province\":\"SCO\"},{\"name\":\"Norala\",\"province\":\"SCO\"},{\"name\":\"Polomolok\",\"province\":\"SCO\"},{\"name\":\"Santo Niño\",\"province\":\"SCO\"},{\"name\":\"Surallah\",\"province\":\"SCO\"},{\"name\":\"T'boli\",\"province\":\"SCO\"},{\"name\":\"Tampakan\",\"province\":\"SCO\"},{\"name\":\"Tantangan\",\"province\":\"SCO\"},{\"name\":\"Tupi\",\"province\":\"SCO\"},{\"name\":\"Bagumbayan\",\"province\":\"SUK\"},{\"name\":\"Columbio\",\"province\":\"SUK\"},{\"name\":\"Esperanza\",\"province\":\"SUK\"},{\"name\":\"Isulan\",\"province\":\"SUK\"},{\"name\":\"Kalamansig\",\"province\":\"SUK\"},{\"name\":\"Lambayong\",\"province\":\"SUK\"},{\"name\":\"Lebak\",\"province\":\"SUK\"},{\"name\":\"Lutayan\",\"province\":\"SUK\"},{\"name\":\"Palimbang\",\"province\":\"SUK\"},{\"name\":\"President Quirino\",\"province\":\"SUK\"},{\"name\":\"Senator Ninoy Aquino\",\"province\":\"SUK\"},{\"name\":\"Tacurong\",\"province\":\"SUK\",\"city\":true},{\"name\":\"Buenavista\",\"province\":\"AGN\"},{\"name\":\"Butuan\",\"province\":\"AGN\",\"city\":true},{\"name\":\"Cabadbaran\",\"province\":\"AGN\",\"city\":true},{\"name\":\"Carmen\",\"province\":\"AGN\"},{\"name\":\"Jabonga\",\"province\":\"AGN\"},{\"name\":\"Kitcharao\",\"province\":\"AGN\"},{\"name\":\"Las Nieves\",\"province\":\"AGN\"},{\"name\":\"Magallanes\",\"province\":\"AGN\"},{\"name\":\"Nasipit\",\"province\":\"AGN\"},{\"name\":\"Remedios T. Romualdez\",\"province\":\"AGN\"},{\"name\":\"Santiago\",\"province\":\"AGN\"},{\"name\":\"Tubay\",\"province\":\"AGN\"},{\"name\":\"Bayugan\",\"province\":\"AGS\",\"city\":true},{\"name\":\"Bunawan\",\"province\":\"AGS\"},{\"name\":\"Esperanza\",\"province\":\"AGS\"},{\"name\":\"La Paz\",\"province\":\"AGS\"},{\"name\":\"Loreto\",\"province\":\"AGS\"},{\"name\":\"Prosperidad\",\"province\":\"AGS\"},{\"name\":\"Rosario\",\"province\":\"AGS\"},{\"name\":\"San Francisco\",\"province\":\"AGS\"},{\"name\":\"San Luis\",\"province\":\"AGS\"},{\"name\":\"Santa Josefa\",\"province\":\"AGS\"},{\"name\":\"Sibagat\",\"province\":\"AGS\"},{\"name\":\"Talacogon\",\"province\":\"AGS\"},{\"name\":\"Trento\",\"province\":\"AGS\"},{\"name\":\"Veruela\",\"province\":\"AGS\"},{\"name\":\"Basilisa\",\"province\":\"DIN\"},{\"name\":\"Cagdianao\",\"province\":\"DIN\"},{\"name\":\"Dinagat\",\"province\":\"DIN\"},{\"name\":\"Libjo\",\"province\":\"DIN\"},{\"name\":\"Loreto\",\"province\":\"DIN\"},{\"name\":\"San Jose\",\"province\":\"DIN\"},{\"name\":\"Tubajon\",\"province\":\"DIN\"},{\"name\":\"Alegria\",\"province\":\"SUN\"},{\"name\":\"Bacuag\",\"province\":\"SUN\"},{\"name\":\"Burgos\",\"province\":\"SUN\"},{\"name\":\"Claver\",\"province\":\"SUN\"},{\"name\":\"Dapa\",\"province\":\"SUN\"},{\"name\":\"Del Carmen\",\"province\":\"SUN\"},{\"name\":\"General Luna\",\"province\":\"SUN\"},{\"name\":\"Gigaquit\",\"province\":\"SUN\"},{\"name\":\"Mainit\",\"province\":\"SUN\"},{\"name\":\"Malimono\",\"province\":\"SUN\"},{\"name\":\"Pilar\",\"province\":\"SUN\"},{\"name\":\"Placer\",\"province\":\"SUN\"},{\"name\":\"San Benito\",\"province\":\"SUN\"},{\"name\":\"San Francisco\",\"province\":\"SUN\"},{\"name\":\"San Isidro\",\"province\":\"SUN\"},{\"name\":\"Santa Monica\",\"province\":\"SUN\"},{\"name\":\"Sison\",\"province\":\"SUN\"},{\"name\":\"Socorro\",\"province\":\"SUN\"},{\"name\":\"Surigao\",\"province\":\"SUN\",\"city\":true},{\"name\":\"Tagana-an\",\"province\":\"SUN\"},{\"name\":\"Tubod\",\"province\":\"SUN\"},{\"name\":\"Barobo\",\"province\":\"SUR\"},{\"name\":\"Bayabas\",\"province\":\"SUR\"},{\"name\":\"Bislig\",\"province\":\"SUR\",\"city\":true},{\"name\":\"Cagwait\",\"province\":\"SUR\"},{\"name\":\"Cantilan\",\"province\":\"SUR\"},{\"name\":\"Carmen\",\"province\":\"SUR\"},{\"name\":\"Carrascal\",\"province\":\"SUR\"},{\"name\":\"Cortes\",\"province\":\"SUR\"},{\"name\":\"Hinatuan\",\"province\":\"SUR\"},{\"name\":\"Lanuza\",\"province\":\"SUR\"},{\"name\":\"Lianga\",\"province\":\"SUR\"},{\"name\":\"Lingig\",\"province\":\"SUR\"},{\"name\":\"Madrid\",\"province\":\"SUR\"},{\"name\":\"Marihatag\",\"province\":\"SUR\"},{\"name\":\"San Agustin\",\"province\":\"SUR\"},{\"name\":\"San Miguel\",\"province\":\"SUR\"},{\"name\":\"Tagbina\",\"province\":\"SUR\"},{\"name\":\"Tago\",\"province\":\"SUR\"},{\"name\":\"Tandag\",\"province\":\"SUR\",\"city\":true},{\"name\":\"Akbar\",\"province\":\"BAS\"},{\"name\":\"Al-Barka\",\"province\":\"BAS\"},{\"name\":\"Hadji Mohammad Ajul\",\"province\":\"BAS\"},{\"name\":\"Hadji Muhtamad\",\"province\":\"BAS\"},{\"name\":\"Isabela\",\"province\":\"BAS\",\"city\":true},{\"name\":\"Lamitan\",\"province\":\"BAS\",\"city\":true},{\"name\":\"Lantawan\",\"province\":\"BAS\"},{\"name\":\"Maluso\",\"province\":\"BAS\"},{\"name\":\"Sumisip\",\"province\":\"BAS\"},{\"name\":\"Tabuan-Lasa\",\"province\":\"BAS\"},{\"name\":\"Tipo-Tipo\",\"province\":\"BAS\"},{\"name\":\"Tuburan\",\"province\":\"BAS\"},{\"name\":\"Ungkaya Pukan\",\"province\":\"BAS\"},{\"name\":\"Bacolod-Kalawi\",\"province\":\"LAS\"},{\"name\":\"Balabagan\",\"province\":\"LAS\"},{\"name\":\"Balindong\",\"province\":\"LAS\"},{\"name\":\"Bayang\",\"province\":\"LAS\"},{\"name\":\"Binidayan\",\"province\":\"LAS\"},{\"name\":\"Buadiposo-Buntong\",\"province\":\"LAS\"},{\"name\":\"Bubong\",\"province\":\"LAS\"},{\"name\":\"Bumbaran\",\"province\":\"LAS\"},{\"name\":\"Butig\",\"province\":\"LAS\"},{\"name\":\"Calanogas\",\"province\":\"LAS\"},{\"name\":\"Ditsaan-Ramain\",\"province\":\"LAS\"},{\"name\":\"Ganassi\",\"province\":\"LAS\"},{\"name\":\"Kapai\",\"province\":\"LAS\"},{\"name\":\"Kapatagan\",\"province\":\"LAS\"},{\"name\":\"Lumba-Bayabao\",\"province\":\"LAS\"},{\"name\":\"Lumbaca-Unayan\",\"province\":\"LAS\"},{\"name\":\"Lumbatan\",\"province\":\"LAS\"},{\"name\":\"Lumbayanague\",\"province\":\"LAS\"},{\"name\":\"Madalum\",\"province\":\"LAS\"},{\"name\":\"Madamba\",\"province\":\"LAS\"},{\"name\":\"Maguing\",\"province\":\"LAS\"},{\"name\":\"Malabang\",\"province\":\"LAS\"},{\"name\":\"Marantao\",\"province\":\"LAS\"},{\"name\":\"Marawi\",\"province\":\"LAS\",\"city\":true},{\"name\":\"Marogong\",\"province\":\"LAS\"},{\"name\":\"Masiu\",\"province\":\"LAS\"},{\"name\":\"Mulondo\",\"province\":\"LAS\"},{\"name\":\"Pagayawan\",\"province\":\"LAS\"},{\"name\":\"Piagapo\",\"province\":\"LAS\"},{\"name\":\"Poona Bayabao\",\"province\":\"LAS\"},{\"name\":\"Pualas\",\"province\":\"LAS\"},{\"name\":\"Saguiaran\",\"province\":\"LAS\"},{\"name\":\"Sultan Dumalondong\",\"province\":\"LAS\"},{\"name\":\"Picong\",\"province\":\"LAS\"},{\"name\":\"Tagoloan II\",\"province\":\"LAS\"},{\"name\":\"Tamparan\",\"province\":\"LAS\"},{\"name\":\"Taraka\",\"province\":\"LAS\"},{\"name\":\"Tubaran\",\"province\":\"LAS\"},{\"name\":\"Tugaya\",\"province\":\"LAS\"},{\"name\":\"Wao\",\"province\":\"LAS\"},{\"name\":\"Ampatuan\",\"province\":\"MAG\"},{\"name\":\"Barira\",\"province\":\"MAG\"},{\"name\":\"Buldon\",\"province\":\"MAG\"},{\"name\":\"Buluan\",\"province\":\"MAG\"},{\"name\":\"Cotabato\",\"province\":\"MAG\",\"city\":true},{\"name\":\"Datu Abdullah Sangki\",\"province\":\"MAG\"},{\"name\":\"Datu Anggal Midtimbang\",\"province\":\"MAG\"},{\"name\":\"Datu Blah T. Sinsuat\",\"province\":\"MAG\"},{\"name\":\"Datu Hoffer Ampatuan\",\"province\":\"MAG\"},{\"name\":\"Datu Montawal\",\"province\":\"MAG\"},{\"name\":\"Datu Odin Sinsuat\",\"province\":\"MAG\"},{\"name\":\"Datu Paglas\",\"province\":\"MAG\"},{\"name\":\"Datu Piang\",\"province\":\"MAG\"},{\"name\":\"Datu Salibo\",\"province\":\"MAG\"},{\"name\":\"Datu Saudi-Ampatuan\",\"province\":\"MAG\"},{\"name\":\"Datu Unsay\",\"province\":\"MAG\"},{\"name\":\"General Salipada K. Pendatun\",\"province\":\"MAG\"},{\"name\":\"Guindulungan\",\"province\":\"MAG\"},{\"name\":\"Kabuntalan\",\"province\":\"MAG\"},{\"name\":\"Mamasapano\",\"province\":\"MAG\"},{\"name\":\"Mangudadatu\",\"province\":\"MAG\"},{\"name\":\"Matanog\",\"province\":\"MAG\"},{\"name\":\"Northern Kabuntalan\",\"province\":\"MAG\"},{\"name\":\"Pagalungan\",\"province\":\"MAG\"},{\"name\":\"Paglat\",\"province\":\"MAG\"},{\"name\":\"Pandag\",\"province\":\"MAG\"},{\"name\":\"Parang\",\"province\":\"MAG\"},{\"name\":\"Rajah Buayan\",\"province\":\"MAG\"},{\"name\":\"Shariff Aguak\",\"province\":\"MAG\"},{\"name\":\"Shariff Saydona Mustapha\",\"province\":\"MAG\"},{\"name\":\"South Upi\",\"province\":\"MAG\"},{\"name\":\"Sultan Kudarat\",\"province\":\"MAG\"},{\"name\":\"Sultan Mastura\",\"province\":\"MAG\"},{\"name\":\"Sultan sa Barongis\",\"province\":\"MAG\"},{\"name\":\"Sultan Sumagka\",\"province\":\"MAG\"},{\"name\":\"Talayan\",\"province\":\"MAG\"},{\"name\":\"Upi\",\"province\":\"MAG\"},{\"name\":\"Banguingui\",\"province\":\"SLU\"},{\"name\":\"Hadji Panglima Tahil\",\"province\":\"SLU\"},{\"name\":\"Indanan\",\"province\":\"SLU\"},{\"name\":\"Jolo\",\"province\":\"SLU\"},{\"name\":\"Kalingalan Caluang\",\"province\":\"SLU\"},{\"name\":\"Lugus\",\"province\":\"SLU\"},{\"name\":\"Luuk\",\"province\":\"SLU\"},{\"name\":\"Maimbung\",\"province\":\"SLU\"},{\"name\":\"Old Panamao\",\"province\":\"SLU\"},{\"name\":\"Omar\",\"province\":\"SLU\"},{\"name\":\"Pandami\",\"province\":\"SLU\"},{\"name\":\"Panglima Estino\",\"province\":\"SLU\"},{\"name\":\"Pangutaran\",\"province\":\"SLU\"},{\"name\":\"Parang\",\"province\":\"SLU\"},{\"name\":\"Pata\",\"province\":\"SLU\"},{\"name\":\"Patikul\",\"province\":\"SLU\"},{\"name\":\"Siasi\",\"province\":\"SLU\"},{\"name\":\"Talipao\",\"province\":\"SLU\"},{\"name\":\"Tapul\",\"province\":\"SLU\"},{\"name\":\"Bongao\",\"province\":\"TAW\"},{\"name\":\"Languyan\",\"province\":\"TAW\"},{\"name\":\"Mapun\",\"province\":\"TAW\"},{\"name\":\"Panglima Sugala\",\"province\":\"TAW\"},{\"name\":\"Sapa-Sapa\",\"province\":\"TAW\"},{\"name\":\"Sibutu\",\"province\":\"TAW\"},{\"name\":\"Simunul\",\"province\":\"TAW\"},{\"name\":\"Sitangkai\",\"province\":\"TAW\"},{\"name\":\"South Ubian\",\"province\":\"TAW\"},{\"name\":\"Tandubas\",\"province\":\"TAW\"},{\"name\":\"Turtle Islands\",\"province\":\"TAW\"}]");

const _sfc_main$5 = {
  components: {
    AdvInput,
    Input,
    Button,
  },
  props: {
    modelValue: {
      type: String,
      require: true,
    }
  },

  data() {
    return {
      searchQuery: '',
      selectedDestination: null,
      allPhilippineCities: [],
      suggestedLocations: [
        { name: 'Baguio', description: 'For your summer vacation' },
        { name: 'Subic Bay', description: 'Hidden Gem' },
        { name: 'Makati', description: 'Taste great food from high-end restaurants' },
        { name: 'Angeles', description: 'Experience great night life' },
        { name: 'Palawan', description: 'Island paradise' },
      ],
    };
  },
  computed: {
    filteredCities() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return [];
      }

      const results = this.allPhilippineCities.filter(city =>
          city.name.toLowerCase().includes(query) ||
          (city.province && city.province.toLowerCase().includes(query))
      );
      return results.slice(0, 50);
    }
  },
  created() {
    this.allPhilippineCities = cities.map(city => ({
      name: city.name,
      province: city.province,
      zip_code: city.zip_code || null
    }));
  },
  methods: {
    selectLocation(item) {
      this.selectedDestination = item.name;
      this.searchQuery = item.name;
      this.$emit('update:modelValue', this.selectedDestination);
    },

    searchDestination() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.selectedDestination = null;
        return;
      }

      let selectedItem = null;
      const exactCityMatch = this.filteredCities.find(city => city.name.toLowerCase() === query);
      if (exactCityMatch) {
        selectedItem = exactCityMatch;
      } else {
        const exactSuggestionMatch = this.suggestedLocations.find(loc => loc.name.toLowerCase() === query);
        if (exactSuggestionMatch) {
          selectedItem = exactSuggestionMatch;
        }
      }

      if (selectedItem) {
        this.selectLocation(selectedItem);
      } else {
        this.selectedDestination = {
          name: this.searchQuery,
          description: 'User entered custom destination',
          fullData: null
        };
        console.log('User entered custom destination:', this.selectedDestination.name);
      }
    },

    proceedNext() {
      this.selectedDestination = this.searchQuery;
      if (this.selectedDestination) {
        this.$emit('next');
      } else {
        console.warn('Please select or enter a destination before proceeding.');
      }
    },

    expand() {
      this.$refs.advInput.expand();
    },

    collapse() {
      this.$refs.advInput.collapse();
    }
  },
};

function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "b0ss",
    label: "Destination",
    icon: "ph ph-map-pin",
    ref: "advInput",
    summary: $data.selectedDestination ? $data.selectedDestination.name : 'Select your destination'
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-2" data-v-18b0a23b${_scopeId}>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "search",
          placeholder: "Search for a City, Province, or Enter any Destination",
          prefixIcon: "ph ph-magnifying-glass",
          modelValue: $data.searchQuery,
          "onUpdate:modelValue": $event => (($data.searchQuery) = $event),
          onKeyup: $options.searchDestination,
          onInput: $event => (_ctx.$emit('update:modelValue', $data.searchQuery))
        }, null, _parent, _scopeId));
        _push(`<span class="text-sm text-zinc-400" data-v-18b0a23b${
          _scopeId
        }>${
          ssrInterpolate($data.searchQuery.trim() === '' ? 'Suggested Locations' : 'Search results for cities in the Philippines')
        }</span>`);
        if ($data.searchQuery.trim() === '') {
          _push(`<div data-v-18b0a23b${_scopeId}><!--[-->`);
          ssrRenderList($data.suggestedLocations, (location, index) => {
            _push(`<div class="py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150" data-v-18b0a23b${
              _scopeId
            }><span class="font-medium" data-v-18b0a23b${
              _scopeId
            }>${
              ssrInterpolate(location.name)
            }</span><span class="text-[12px] font-medium text-zinc-400" data-v-18b0a23b${
              _scopeId
            }>${
              ssrInterpolate(location.description)
            }</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div data-v-18b0a23b${_scopeId}>`);
          if ($options.filteredCities.length > 0) {
            _push(`<div class="max-h-60 overflow-y-auto pr-2" data-v-18b0a23b${_scopeId}><!--[-->`);
            ssrRenderList($options.filteredCities, (city, index) => {
              _push(`<div class="py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150" data-v-18b0a23b${
                _scopeId
              }><span class="font-medium" data-v-18b0a23b${
                _scopeId
              }>${
                ssrInterpolate(city.name)
              }</span><span class="text-[12px] font-medium text-zinc-400" data-v-18b0a23b${
                _scopeId
              }>${
                ssrInterpolate(city.province ? city.province : 'No Province Info')
              } `);
              if (city.zip_code) {
                _push(`<span data-v-18b0a23b${
                  _scopeId
                }> - ${
                  ssrInterpolate(city.zip_code)
                }</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</span></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.proceedNext,
          disabled: !$data.selectedDestination && !$data.searchQuery
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Next`);
            } else {
              return [
                createTextVNode("Next")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-2" }, [
            createVNode(_component_Input, {
              id: "search",
              placeholder: "Search for a City, Province, or Enter any Destination",
              prefixIcon: "ph ph-magnifying-glass",
              modelValue: $data.searchQuery,
              "onUpdate:modelValue": $event => (($data.searchQuery) = $event),
              onKeyup: withKeys($options.searchDestination, ["enter"]),
              onInput: $event => (_ctx.$emit('update:modelValue', $data.searchQuery))
            }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup", "onInput"]),
            createVNode("span", { class: "text-sm text-zinc-400" }, toDisplayString($data.searchQuery.trim() === '' ? 'Suggested Locations' : 'Search results for cities in the Philippines'), 1),
            createVNode(Transition, {
              name: "list-fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ($data.searchQuery.trim() === '')
                  ? (openBlock(), createBlock("div", { key: 'suggestions-list' }, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.suggestedLocations, (location, index) => {
                        return (openBlock(), createBlock("div", {
                          key: 'suggested-' + index,
                          class: "py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150",
                          onClick: $event => ($options.selectLocation(location))
                        }, [
                          createVNode("span", { class: "font-medium" }, toDisplayString(location.name), 1),
                          createVNode("span", { class: "text-[12px] font-medium text-zinc-400" }, toDisplayString(location.description), 1)
                        ], 8, ["onClick"]))
                      }), 128))
                    ]))
                  : (openBlock(), createBlock("div", { key: 'filtered-list' }, [
                      ($options.filteredCities.length > 0)
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "max-h-60 overflow-y-auto pr-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList($options.filteredCities, (city, index) => {
                              return (openBlock(), createBlock("div", {
                                key: 'city-' + city.name + '-' + city.province + '-' + index,
                                class: "py-1 flex flex-col gap-0 cursor-pointer hover:bg-zinc-50 rounded-md p-2 -mx-2 transition-colors duration-150",
                                onClick: $event => ($options.selectLocation(city))
                              }, [
                                createVNode("span", { class: "font-medium" }, toDisplayString(city.name), 1),
                                createVNode("span", { class: "text-[12px] font-medium text-zinc-400" }, [
                                  createTextVNode(toDisplayString(city.province ? city.province : 'No Province Info') + " ", 1),
                                  (city.zip_code)
                                    ? (openBlock(), createBlock("span", { key: 0 }, " - " + toDisplayString(city.zip_code), 1))
                                    : createCommentVNode("", true)
                                ])
                              ], 8, ["onClick"]))
                            }), 128))
                          ]))
                        : createCommentVNode("", true)
                    ]))
              ]),
              _: 1
            }),
            createVNode(_component_Button, {
              class: "w-full",
              onClick: $options.proceedNext,
              disabled: !$data.selectedDestination && !$data.searchQuery
            }, {
              default: withCtx(() => [
                createTextVNode("Next")
              ]),
              _: 1
            }, 8, ["onClick", "disabled"])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/Destination.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};
const Destination = /*#__PURE__*/_export_sfc(_sfc_main$5, [['ssrRender',_sfc_ssrRender$5],['__scopeId',"data-v-18b0a23b"]]);

const _sfc_main$4 = {
  name: "DateRangePicker",
  emits: ["update:range"],
  props: {
    range: { // Changed from modelValue to range to match v-model:range usage
      type: Object,
      default: () => ({ start: null, end: null }),
    },
  },
  data() {
    const today = new Date();
    return {
      today,
      // Initialize selected month/year to today's month/year
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      startDate: null,
      endDate: null,
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
    };
  },
  watch: {
    // Watch for external changes to the 'range' prop to update internal state
    range: {
      handler(newRange) {
        this.startDate = newRange.start;
        this.endDate = newRange.end;
        // Optionally, update the displayed month/year to show the start date if provided
        if (newRange.start) {
          this.selectedMonth = newRange.start.getMonth();
          this.selectedYear = newRange.start.getFullYear();
        }
      },
      immediate: true, // Run handler immediately on component mount
      deep: true,      // Watch for nested changes in the range object
    },
    // Emit changes whenever startDate or endDate are updated internally
    startDate() { this.emitRange(); },
    endDate() { this.emitRange(); },
  },
  computed: {
    paddedDays() {
      const days = [];
      // Use local date methods for current month/year display
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
      const dayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

      // Add leading nulls for padding
      for (let i = 0; i < dayOfWeek; i++) {
        days.push(null);
      }

      // Add actual days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        const utcDate = Date.UTC(this.selectedYear, this.selectedMonth, i);
        days.push(new Date(utcDate));
      }

      return days;
    },
    yearRange() {
      const currentYear = new Date().getFullYear();
      // Provide a reasonable range, e.g., 10 years back, 10 years forward
      return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
    },
  },
  methods: {
    /**
     * Updates the calendar view when month or year selection changes.
     */
    updateCalendar() {
      // selectedMonth and selectedYear are already updated by v-model
      // No explicit currentMonth variable needed.
    },
    /**
     * Changes the displayed month.
     * @param {number} offset - -1 for previous month, 1 for next month.
     */
    changeMonth(offset) {
      const newDate = new Date(this.selectedYear, this.selectedMonth + offset, 1);
      this.selectedMonth = newDate.getMonth();
      this.selectedYear = newDate.getFullYear();
    },
    /**
     * Handles selection of a date. Implements range selection logic.
     * @param {Date|null} date - The date object clicked, or null for padding.
     */
    selectDate(date) {
      if (!date) return;

      // Reset selection if both start and end are already chosen
      if (this.startDate && this.endDate) {
        this.startDate = date;
        this.endDate = null;
      }
      // If only start date is chosen, set end date
      else if (this.startDate) {
        if (date >= this.startDate) {
          this.endDate = date;
        } else { // If selected date is before startDate, swap them
          this.endDate = this.startDate;
          this.startDate = date;
        }
      }
      // If no date is chosen, set start date
      else {
        this.startDate = date;
      }
    },
    /**
     * Emits the current start and end dates.
     * This is called by watchers on startDate and endDate.
     */
    emitRange() {
      this.$emit("update:range", {
        start: this.startDate,
        end: this.endDate,
      });
    },
    /**
     * Checks if two Date objects represent the same day.
     * @param {Date} d1 - First date.
     * @param {Date} d2 - Second date.
     * @returns {boolean} True if they are the same day, false otherwise.
     */
    isSameDay(d1, d2) {
      return (
          d1 instanceof Date &&
          d2 instanceof Date &&
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
      );
    },
    /**
     * Checks if a date falls within the selected range (exclusive of start/end).
     * @param {Date} date - The date to check.
     * @returns {boolean} True if within range, false otherwise.
     */
    isInRange(date) {
      // Ensure date is a Date object before comparison
      if (!(date instanceof Date) || !this.startDate || !this.endDate) return false;

      // Normalize dates for accurate comparison if needed, but direct comparison usually works
      const start = this.startDate.getTime();
      const end = this.endDate.getTime();
      const current = date.getTime();

      return current > start && current < end;
    },
    /**
     * Determines CSS classes for a calendar day based on its selection state.
     * @param {Date|null} day - The date object for the calendar cell.
     * @returns {Object} An object mapping CSS classes to boolean values.
     */
    getDayClass(day) {
      if (!day) return "";

      const isStart = this.isSameDay(day, this.startDate);
      const isEnd = this.isSameDay(day, this.endDate);
      const inRange = this.isInRange(day);
      const isToday = this.isSameDay(day, this.today);

      return {
        // Highlight today's date if not part of selection
        "border border-blue-400": isToday && !isStart && !isEnd && !inRange,
        "text-blue-600 font-semibold": isToday && !isStart && !isEnd && !inRange,

        // Range selection styling
        "bg-peach-400 text-white": isStart || isEnd, // Start or End date
        "bg-peach-100": inRange, // Dates within the range

        // Hover effect for non-selected, non-range dates
        "hover:bg-zinc-100": !isStart && !isEnd && !inRange,

        // Text color for dates not in current month (if you decide to show them)
        // "text-zinc-300": day.getMonth() !== this.selectedMonth,
      };
    },
  },
};

function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))} data-v-fe90f960><div class="flex justify-between items-center mt-4 gap-2" data-v-fe90f960><button class="px-2 py-1 rounded-md hover:bg-zinc-100 transition" data-v-fe90f960><i class="ph ph-caret-left" data-v-fe90f960></i></button><div class="flex gap-2" data-v-fe90f960><select class="border px-2 py-1 rounded text-sm bg-white cursor-pointer" data-v-fe90f960><!--[-->`);
  ssrRenderList($data.months, (month, i) => {
    _push(`<option${
      ssrRenderAttr("value", i)
    } data-v-fe90f960${
      (ssrIncludeBooleanAttr((Array.isArray($data.selectedMonth))
        ? ssrLooseContain($data.selectedMonth, i)
        : ssrLooseEqual($data.selectedMonth, i))) ? " selected" : ""
    }>${
      ssrInterpolate(month)
    }</option>`);
  });
  _push(`<!--]--></select><select class="border px-2 py-1 rounded text-sm bg-white cursor-pointer" data-v-fe90f960><!--[-->`);
  ssrRenderList($options.yearRange, (year) => {
    _push(`<option${
      ssrRenderAttr("value", year)
    } data-v-fe90f960${
      (ssrIncludeBooleanAttr((Array.isArray($data.selectedYear))
        ? ssrLooseContain($data.selectedYear, year)
        : ssrLooseEqual($data.selectedYear, year))) ? " selected" : ""
    }>${
      ssrInterpolate(year)
    }</option>`);
  });
  _push(`<!--]--></select></div><button class="px-2 py-1 rounded-md hover:bg-zinc-100 transition" data-v-fe90f960><i class="ph ph-caret-right" data-v-fe90f960></i></button></div><div class="grid grid-cols-7 gap-1 text-center text-sm font-medium text-zinc-500" data-v-fe90f960><!--[-->`);
  ssrRenderList($data.weekdays, (day) => {
    _push(`<div data-v-fe90f960>${ssrInterpolate(day)}</div>`);
  });
  _push(`<!--]--></div><div class="grid grid-cols-7 gap-1 items-center text-center justify-center" data-v-fe90f960><!--[-->`);
  ssrRenderList($options.paddedDays, (day, index) => {
    _push(`<div class="flex items-center justify-center" data-v-fe90f960><div class="${
      ssrRenderClass([$options.getDayClass(day), "aspect-square rounded-full w-12 flex items-center justify-center cursor-pointer transition-all duration-200"])
    }" data-v-fe90f960>${
      ssrInterpolate(day ? day.getDate() : '')
    }</div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/shared/components/UI/DateRange.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};
const DateRangePicker = /*#__PURE__*/_export_sfc(_sfc_main$4, [['ssrRender',_sfc_ssrRender$4],['__scopeId',"data-v-fe90f960"]]);

const _sfc_main$3 = {
  components: {
    DateRangePicker,
    AdvInput,
    Button,
  },
  props: {
    summary: {
      type: String,
    },

    disableButton: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Object,
      default: () => ({
        range: {
          start: '',
          end: '',
        }
      })
    }
  },
  data() {
    return {
      range: { ...this.modelValue },
    };
  },

  watch: {
    range: {
      handler(newRange) {
        this.$emit('update:modelValue', newRange);
      }
    }
  },

  computed: {
    /**
     * Formats the selected date range for the AdvInput summary.
     * Displays "Select your travel dates" if no range is selected.
     */
    formattedDateRange() {
      if (this.range.start && this.range.end) {
        const options = { month: 'short', day: 'numeric' };
        const start = this.range.start.toLocaleDateString('en-US', options);
        const end = this.range.end.toLocaleDateString('en-US', options);
        return `${start} - ${end}`;
      }
      return this.summary;
    },
  },
  methods: {
    /**
     * Handles the "Next" button click.
     * Here you would typically emit the selected date range or navigate.
     */
    proceedNext() {
      if (this.range.start && this.range.end) {
        this.$emit('next');
      }
    },

    expand() {
      this.$refs.advInput.expand();
    },

    collapse() {
      this.$refs.advInput.collapse();
    }
  },
};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_DateRangePicker = resolveComponent("DateRangePicker");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "travel-dates",
    label: "Dates",
    icon: "ph ph-calendar",
    summary: $props.summary,
    ref: "advInput"
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-2"${_scopeId}>`);
        _push(ssrRenderComponent(_component_DateRangePicker, {
          range: $data.range,
          "onUpdate:range": $event => (($data.range) = $event)
        }, null, _parent, _scopeId));
        if (!$props.disableButton) {
          _push(ssrRenderComponent(_component_Button, {
            class: "w-full",
            onClick: $options.proceedNext,
            disabled: !$data.range.start || !$data.range.end
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`Next`);
              } else {
                return [
                  createTextVNode("Next")
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-2" }, [
            createVNode(_component_DateRangePicker, {
              range: $data.range,
              "onUpdate:range": $event => (($data.range) = $event)
            }, null, 8, ["range", "onUpdate:range"]),
            (!$props.disableButton)
              ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "w-full",
                  onClick: $options.proceedNext,
                  disabled: !$data.range.start || !$data.range.end
                }, {
                  default: withCtx(() => [
                    createTextVNode("Next")
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"]))
              : createCommentVNode("", true)
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/Dates.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const Dates = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3]]);

const _sfc_main$2 = {
  components: {
    AdvInput,
    Input,
    Button,
  },
  data() {
    return {
      totalBudget: null, // Binds to the budget input
    };
  },
  methods: {
    // You could add a method here to save or process the budget
    setBudget() {
      console.log('Total Budget:', this.totalBudget);
      // Emit an event or call a store action to save the budget
    },

    formatCurrency(amount, locale = 'en-US', currency = 'PHP', currencyDisplay = 'symbol') {
      try {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          currencyDisplay: currencyDisplay,
          minimumFractionDigits: 0, // Ensure no decimal places for your budget input
          maximumFractionDigits: 0
        });
        return formatter.format(amount);
      } catch (error) {
        console.error("Error formatting currency:", error);
        return String(amount);
      }
    },
  }
};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "budget",
    label: "Budget",
    icon: "ph ph-wallet",
    summary: $options.formatCurrency($data.totalBudget)
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-4" data-v-3f302c43${_scopeId}>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "total-budget",
          placeholder: "Enter your estimated total budget",
          prefixIcon: "ph ph-currency-dollar",
          type: "number",
          formatCommas: true,
          modelValue: $data.totalBudget,
          "onUpdate:modelValue": $event => (($data.totalBudget) = $event)
        }, null, _parent, _scopeId));
        _push(`<span class="text-sm text-zinc-400" data-v-3f302c43${_scopeId}>This is your overall budget for the entire trip.</span>`);
        _push(ssrRenderComponent(_component_Button, { class: "w-full" }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Set Budget`);
            } else {
              return [
                createTextVNode("Set Budget")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-4" }, [
            createVNode(_component_Input, {
              id: "total-budget",
              placeholder: "Enter your estimated total budget",
              prefixIcon: "ph ph-currency-dollar",
              type: "number",
              formatCommas: true,
              modelValue: $data.totalBudget,
              "onUpdate:modelValue": $event => (($data.totalBudget) = $event)
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode("span", { class: "text-sm text-zinc-400" }, "This is your overall budget for the entire trip."),
            createVNode(_component_Button, { class: "w-full" }, {
              default: withCtx(() => [
                createTextVNode("Set Budget")
              ]),
              _: 1
            })
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/Budget.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const Budget = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2],['__scopeId',"data-v-3f302c43"]]);

const _sfc_main$1 = {
  components: {
    AdvInput,
    Input,
    Button,
  },
  data() {
    return {
      newCompanionName: '',
      companions: [],
    };
  },
  methods: {
    addCompanion() {
      if (this.newCompanionName.trim() !== '') {
        this.companions.push(this.newCompanionName.trim());
        this.newCompanionName = '';
      }
    },
    removeCompanion(index) {
      this.companions.splice(index, 1);
    },
    saveCompanions() {
      console.log('Companions:', this.companions);
      // Here you would typically emit an event or call an API to save the companions
    }
  }
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");

  _push(ssrRenderComponent(_component_AdvInput, mergeProps({
    id: "companions",
    label: "Companions",
    icon: "ph ph-users",
    summary: ""
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col p-1 gap-2" data-v-8b027c81${
          _scopeId
        }><div class="flex gap-2" data-v-8b027c81${
          _scopeId
        }>`);
        _push(ssrRenderComponent(_component_Input, {
          id: "add-companion",
          placeholder: "Search or Enter Companion Name",
          prefixIcon: "ph ph-user-plus",
          modelValue: $data.newCompanionName,
          "onUpdate:modelValue": $event => (($data.newCompanionName) = $event),
          onKeyup: $options.addCompanion,
          class: "flex-grow"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          onClick: $options.addCompanion,
          disabled: $data.newCompanionName.trim() === '',
          customClass: "px-4 py-2 text-sm"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(` Add `);
            } else {
              return [
                createTextVNode(" Add ")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div><span class="text-sm text-zinc-400" data-v-8b027c81${_scopeId}>Add friends or family joining the trip.</span>`);
        if ($data.companions.length > 0) {
          _push(`<div class="py-2 flex flex-col gap-1" data-v-8b027c81${
            _scopeId
          }><span class="font-medium" data-v-8b027c81${
            _scopeId
          }>Added Companions:</span><!--[-->`);
          ssrRenderList($data.companions, (companion, index) => {
            _push(`<div class="flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-zinc-100" data-v-8b027c81${
              _scopeId
            }><span class="font-medium flex items-center gap-2" data-v-8b027c81${
              _scopeId
            }><i class="ph ph-user text-zinc-500" data-v-8b027c81${
              _scopeId
            }></i> ${
              ssrInterpolate(companion)
            }</span><button class="text-red-500 hover:text-red-700 transition-colors duration-200" data-v-8b027c81${
              _scopeId
            }><i class="ph ph-x-circle text-lg" data-v-8b027c81${
              _scopeId
            }></i></button></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="py-2 flex flex-col gap-0" data-v-8b027c81${
            _scopeId
          }><span class="font-medium text-zinc-400" data-v-8b027c81${
            _scopeId
          }>No companions added yet.</span><span class="text-[12px] font-medium text-zinc-400" data-v-8b027c81${
            _scopeId
          }>Start by typing a name above.</span></div>`);
        }
        _push(ssrRenderComponent(_component_Button, {
          class: "w-full",
          onClick: $options.saveCompanions
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Confirm Companions`);
            } else {
              return [
                createTextVNode("Confirm Companions")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col p-1 gap-2" }, [
            createVNode("div", { class: "flex gap-2" }, [
              createVNode(_component_Input, {
                id: "add-companion",
                placeholder: "Search or Enter Companion Name",
                prefixIcon: "ph ph-user-plus",
                modelValue: $data.newCompanionName,
                "onUpdate:modelValue": $event => (($data.newCompanionName) = $event),
                onKeyup: withKeys($options.addCompanion, ["enter"]),
                class: "flex-grow"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
              createVNode(_component_Button, {
                onClick: $options.addCompanion,
                disabled: $data.newCompanionName.trim() === '',
                customClass: "px-4 py-2 text-sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Add ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
            ]),
            createVNode("span", { class: "text-sm text-zinc-400" }, "Add friends or family joining the trip."),
            ($data.companions.length > 0)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "py-2 flex flex-col gap-1"
                }, [
                  createVNode("span", { class: "font-medium" }, "Added Companions:"),
                  (openBlock(true), createBlock(Fragment, null, renderList($data.companions, (companion, index) => {
                    return (openBlock(), createBlock("div", {
                      key: index,
                      class: "flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-zinc-100"
                    }, [
                      createVNode("span", { class: "font-medium flex items-center gap-2" }, [
                        createVNode("i", { class: "ph ph-user text-zinc-500" }),
                        createTextVNode(" " + toDisplayString(companion), 1)
                      ]),
                      createVNode("button", {
                        onClick: $event => ($options.removeCompanion(index)),
                        class: "text-red-500 hover:text-red-700 transition-colors duration-200"
                      }, [
                        createVNode("i", { class: "ph ph-x-circle text-lg" })
                      ], 8, ["onClick"])
                    ]))
                  }), 128))
                ]))
              : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "py-2 flex flex-col gap-0"
                }, [
                  createVNode("span", { class: "font-medium text-zinc-400" }, "No companions added yet."),
                  createVNode("span", { class: "text-[12px] font-medium text-zinc-400" }, "Start by typing a name above.")
                ])),
            createVNode(_component_Button, {
              class: "w-full",
              onClick: $options.saveCompanions
            }, {
              default: withCtx(() => [
                createTextVNode("Confirm Companions")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/components/InviteCompanions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const InviteCompanions = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-8b027c81"]]);

// KEY FOR LOCALSTORAGE
const STORAGE_KEY = 'db';

// HELPER FUNCTION TO CHECK IF WE ARE IN A BROWSER ENVIRONMENT
const isBrowser = typeof window !== 'undefined';

// HELPER FUNCTION TO GET INITIAL STATE FROM LOCALSTORAGE

const getInitialState = () => {
  if (isBrowser) {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (e) {
      console.error('Failed to parse stored data from localStorage, clearing:', e);
      localStorage.remove(STORAGE_KEY);
    }
  }

// DEFAULT INITIAL STATE IF NOT IN BROWSER OR NO STORED DATA/ERROR
  return {
    trips: []
  }
};

// INITIALIZE THE STORE WITH DATA FROM LOCALSTORAGE
const useDbStore = atom(getInitialState());

// SUBSCRIBE TO STORE CHANGES AND SAVE TO LOCALSTORAGE (ONLY IN BROWSER)
if (isBrowser) {
  useDbStore.listen(value => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));;
    } catch (e) {
      console.error("Failed to save data to localStorage:", e);
    }
  });
}

const _sfc_main = {
  components: {
    Dates,
    Destination,
    Button,
    Card,
    Input,
    InputTitle,
    AdvInput,
    Budget,
    InviteCompanions,
    ToastContainer,
    Toast,
  },

  data() {
    return {
      // 1. Create a data property to hold the store's state reactively
      useDb: useDbStore.get(), // Initialize with the current state
      dangerToast: {
        message: '',
      },
      warningToast: {
        message: '',
      },
      name: '',
      date: {
        start: null,
        end: null,
      },
      location: '',
      btnLoading: false,
      unsubscribeFromDbStore: null, // 2. Property to hold the unsubscribe function
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.warningToast.message = "Please Enter the Trip Name";
        this.$refs.advInputName.expand();
        return false;
      }

      return true;
    },

    validateLocation() {
      if (!this.location) {
        this.warningToast.message = "Please Enter a Location";
        this.$refs.destination.expand();
        return false;
      }

      return true
    },
    validateDate() {
      if (!this.date.start && !this.date.end) {
        this.warningToast.message = 'Please Enter a Date Range';
        this.$refs.dates.expand();
        return false;
      }

      return true;
    },

    proceedNext(current) {
      if (current === 'destination') {
        this.$refs.destination.collapse();
        this.$refs.dates.expand();
      } else if (current === 'dates') {
        this.$refs.dates.collapse();
      }
    },

    async saveTrip() {

      // -- 1. VALIDATE INPUTS
      if (!this.validateName()) return;
      if (!this.validateLocation()) return;
      if (!this.validateDate()) return;

      try {
        this.btnLoading = true;
        // -- 1.5 CONSTRUCT TRIP PAYLOAD
        const payload = {
          name: this.name,
          date: this.date,
          location: this.location,
        };

        // -- 2. CALL POST API
        const response = await fetch('/api/v1/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        // -- 3. CHECK IF RESPONSE IS NOT GOOD
        if (!response.ok) {
          const error = await response.json();
          console.error('Something went wrong', error.message);
          throw new Error(error.message)
        }

        // -- 4. GET THE ID OF THE NEWLY CREATED TRIP
        const {tripId, tripData} = await response.json();

        console.log(tripId, tripData);

        window.location.href = `/trips/${tripId}`;

      } catch (error) {
        console.error(error);
      }
    }
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_AdvInput = resolveComponent("AdvInput");
  const _component_InputTitle = resolveComponent("InputTitle");
  const _component_Destination = resolveComponent("Destination");
  const _component_Dates = resolveComponent("Dates");
  const _component_Button = resolveComponent("Button");
  const _component_ToastContainer = resolveComponent("ToastContainer");
  const _component_Toast = resolveComponent("Toast");

  _push(`<!--[--><div class="flex flex-col grow place-content-center"><h1 class="fadeIn text-4xl sm:text-5xl font-extrabold text-zinc-800 mb-8 sm:mb-12 text-center tracking-tight outfit"> Plan Your Next Adventure </h1>`);
  _push(ssrRenderComponent(_component_Card, {
    class: "fadeIn fadeIn-1",
    customClass: "rounded-4xl border-secondary-xs shadow-secondary-lg"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_AdvInput, {
          label: "Trip Name",
          icon: "ph-paper-plane-tilt",
          ref: "advInputName"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<div class="p-1"${_scopeId}>`);
              _push(ssrRenderComponent(_component_InputTitle, {
                modelValue: $data.name,
                "onUpdate:modelValue": $event => (($data.name) = $event),
                placeholder: "e.g., Island Hopping Palawan",
                id: "name",
                class: "w-full text-2xl font-bold text-zinc-800"
              }, null, _parent, _scopeId));
              _push(`<span class="text-sm text-zinc-500 mt-2 block"${_scopeId}> You can add preparations, activities, and routes after creating the trip. </span></div>`);
            } else {
              return [
                createVNode("div", { class: "p-1" }, [
                  createVNode(_component_InputTitle, {
                    modelValue: $data.name,
                    "onUpdate:modelValue": $event => (($data.name) = $event),
                    placeholder: "e.g., Island Hopping Palawan",
                    id: "name",
                    class: "w-full text-2xl font-bold text-zinc-800"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", { class: "text-sm text-zinc-500 mt-2 block" }, " You can add preparations, activities, and routes after creating the trip. ")
                ])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Destination, {
          ref: "destination",
          modelValue: $data.location,
          "onUpdate:modelValue": $event => (($data.location) = $event),
          onNext: $event => ($options.proceedNext('destination'))
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Dates, {
          ref: "dates",
          modelValue: $data.date,
          "onUpdate:modelValue": $event => (($data.date) = $event),
          onNext: $event => ($options.proceedNext('dates'))
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Button, {
          loading: $data.btnLoading,
          ref: "submit",
          onClick: $options.saveTrip
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`Start Planning`);
            } else {
              return [
                createTextVNode("Start Planning")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_AdvInput, {
            label: "Trip Name",
            icon: "ph-paper-plane-tilt",
            ref: "advInputName"
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "p-1" }, [
                createVNode(_component_InputTitle, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": $event => (($data.name) = $event),
                  placeholder: "e.g., Island Hopping Palawan",
                  id: "name",
                  class: "w-full text-2xl font-bold text-zinc-800"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("span", { class: "text-sm text-zinc-500 mt-2 block" }, " You can add preparations, activities, and routes after creating the trip. ")
              ])
            ]),
            _: 1
          }, 512),
          createVNode(_component_Destination, {
            ref: "destination",
            modelValue: $data.location,
            "onUpdate:modelValue": $event => (($data.location) = $event),
            onNext: $event => ($options.proceedNext('destination'))
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onNext"]),
          createVNode(_component_Dates, {
            ref: "dates",
            modelValue: $data.date,
            "onUpdate:modelValue": $event => (($data.date) = $event),
            onNext: $event => ($options.proceedNext('dates'))
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onNext"]),
          createVNode(_component_Button, {
            loading: $data.btnLoading,
            ref: "submit",
            onClick: $options.saveTrip
          }, {
            default: withCtx(() => [
              createTextVNode("Start Planning")
            ]),
            _: 1
          }, 8, ["loading", "onClick"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ToastContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'error',
          ref: "dangerToast",
          message: $data.dangerToast.message
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_component_Toast, {
          variant: 'warning',
          ref: "warningToast",
          message: $data.warningToast.message
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_Toast, {
            variant: 'error',
            ref: "dangerToast",
            message: $data.dangerToast.message
          }, null, 8, ["message"]),
          createVNode(_component_Toast, {
            variant: 'warning',
            ref: "warningToast",
            message: $data.warningToast.message
          }, null, 8, ["message"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/domains/trip-planning/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const CreateTrip = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const userPhotoURL = user?.photoURL || null;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutWSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Topbar", Topbar, { "title": "Create Trips", "photoURL": userPhotoURL, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/components/UI/Topbar.vue", "client:component-export": "default" })} ${renderComponent($$result3, "CreateTrip", CreateTrip, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/domains/trip-planning/pages/index.vue", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/create-trip/index.astro", void 0);

const $$file = "/Users/albertsobreo/Documents/Programming/agdayoUI/src/pages/create-trip/index.astro";
const $$url = "/create-trip";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
