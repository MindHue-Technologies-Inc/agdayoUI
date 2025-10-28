import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Cm7gyx6I.mjs';
import { manifest } from './manifest_BWmOEXdM.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/active-trip.astro.mjs');
const _page3 = () => import('./pages/ai.astro.mjs');
const _page4 = () => import('./pages/api/v1/active-trips.astro.mjs');
const _page5 = () => import('./pages/api/v1/activity.astro.mjs');
const _page6 = () => import('./pages/api/v1/auth/register.astro.mjs');
const _page7 = () => import('./pages/api/v1/auth/register-using-google.astro.mjs');
const _page8 = () => import('./pages/api/v1/auth/session-login.astro.mjs');
const _page9 = () => import('./pages/api/v1/auth/session-logout.astro.mjs');
const _page10 = () => import('./pages/api/v1/create-checkout-session.astro.mjs');
const _page11 = () => import('./pages/api/v1/friendship/accepted.astro.mjs');
const _page12 = () => import('./pages/api/v1/friendship/pending.astro.mjs');
const _page13 = () => import('./pages/api/v1/friendship.astro.mjs');
const _page14 = () => import('./pages/api/v1/generate-plans.astro.mjs');
const _page15 = () => import('./pages/api/v1/generate-trip.astro.mjs');
const _page16 = () => import('./pages/api/v1/geo-location.astro.mjs');
const _page17 = () => import('./pages/api/v1/get-user-status.astro.mjs');
const _page18 = () => import('./pages/api/v1/maps-places.astro.mjs');
const _page19 = () => import('./pages/api/v1/me.astro.mjs');
const _page20 = () => import('./pages/api/v1/trip/accommodations.astro.mjs');
const _page21 = () => import('./pages/api/v1/trip/budget.astro.mjs');
const _page22 = () => import('./pages/api/v1/trip/companions.astro.mjs');
const _page23 = () => import('./pages/api/v1/trip/task.astro.mjs');
const _page24 = () => import('./pages/api/v1/trip.astro.mjs');
const _page25 = () => import('./pages/api/v1/trips.astro.mjs');
const _page26 = () => import('./pages/api/v1/users.astro.mjs');
const _page27 = () => import('./pages/api/v2/generate-places.astro.mjs');
const _page28 = () => import('./pages/api/v2/maps-places.astro.mjs');
const _page29 = () => import('./pages/build-profile.astro.mjs');
const _page30 = () => import('./pages/create-trip.astro.mjs');
const _page31 = () => import('./pages/expenses.astro.mjs');
const _page32 = () => import('./pages/features.astro.mjs');
const _page33 = () => import('./pages/login.astro.mjs');
const _page34 = () => import('./pages/register/otp.astro.mjs');
const _page35 = () => import('./pages/register.astro.mjs');
const _page36 = () => import('./pages/subscribe.astro.mjs');
const _page37 = () => import('./pages/trips/_trip_.astro.mjs');
const _page38 = () => import('./pages/trips.astro.mjs');
const _page39 = () => import('./pages/user-profile.astro.mjs');
const _page40 = () => import('./pages/what-is-agdayo.astro.mjs');
const _page41 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/active-trip/index.astro", _page2],
    ["src/pages/ai/index.astro", _page3],
    ["src/pages/api/v1/active-trips/index.ts", _page4],
    ["src/pages/api/v1/activity/index.ts", _page5],
    ["src/pages/api/v1/auth/register.ts", _page6],
    ["src/pages/api/v1/auth/register-using-google.ts", _page7],
    ["src/pages/api/v1/auth/session-login.ts", _page8],
    ["src/pages/api/v1/auth/session-logout.ts", _page9],
    ["src/pages/api/v1/create-checkout-session.ts", _page10],
    ["src/pages/api/v1/friendship/accepted.ts", _page11],
    ["src/pages/api/v1/friendship/pending.ts", _page12],
    ["src/pages/api/v1/friendship/index.ts", _page13],
    ["src/pages/api/v1/generate-plans.ts", _page14],
    ["src/pages/api/v1/generate-trip.ts", _page15],
    ["src/pages/api/v1/geo-location.ts", _page16],
    ["src/pages/api/v1/get-user-status.ts", _page17],
    ["src/pages/api/v1/maps-places.ts", _page18],
    ["src/pages/api/v1/me/index.ts", _page19],
    ["src/pages/api/v1/trip/accommodations.ts", _page20],
    ["src/pages/api/v1/trip/budget.ts", _page21],
    ["src/pages/api/v1/trip/companions.ts", _page22],
    ["src/pages/api/v1/trip/task.ts", _page23],
    ["src/pages/api/v1/trip/index.ts", _page24],
    ["src/pages/api/v1/trips/index.ts", _page25],
    ["src/pages/api/v1/users/index.ts", _page26],
    ["src/pages/api/v2/generate-places.ts", _page27],
    ["src/pages/api/v2/maps-places.ts", _page28],
    ["src/pages/build-profile/index.astro", _page29],
    ["src/pages/create-trip/index.astro", _page30],
    ["src/pages/expenses/index.astro", _page31],
    ["src/pages/features/index.astro", _page32],
    ["src/pages/login.astro", _page33],
    ["src/pages/register/otp.astro", _page34],
    ["src/pages/register/index.astro", _page35],
    ["src/pages/subscribe/index.astro", _page36],
    ["src/pages/trips/[trip].astro", _page37],
    ["src/pages/trips/index.astro", _page38],
    ["src/pages/user-profile/index.astro", _page39],
    ["src/pages/what-is-agdayo/index.astro", _page40],
    ["src/pages/index.astro", _page41]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "a736e2b5-feb1-4133-9408-787be1fa41b5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
