import * as pagefind from "/pagefind/pagefind.js";

window.__LIGHTNING_IT_PAGEFIND__ = pagefind;
window.dispatchEvent(new Event("lightning-it:pagefind-ready"));
