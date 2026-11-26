// NusaStat boot — hash router. Routes are plain links: #/ , #/population,
// #/economy, #/society, #/sources. The router renders the page, marks the
// active nav link, scrolls to the top and wires the page's controls.

import { PAGES, bindPageControls } from './views.js';

const NAV = [
  { route: '/', label: 'Overview' },
  { route: '/population', label: 'Population' },
  { route: '/economy', label: 'Economy' },
  { route: '/society', label: 'People & Society' },
  { route: '/sources', label: 'Sources' },
];

const app = document.querySelector('#app');
const nav = document.querySelector('#nav');

nav.innerHTML = NAV.map((n) => `<a href="#${n.route}" data-route="${n.route}">${n.label}</a>`).join('');

export function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return PAGES[hash] ? hash : '/';
}

export function render() {
  const route = currentRoute();
  app.innerHTML = PAGES[route]();
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
    if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  bindPageControls(route);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
