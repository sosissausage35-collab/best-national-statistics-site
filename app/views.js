// NusaStat views — one function per page. Each page is built from the data in
// data.js and the charts in charts.js, and every control on a page works:
// toggles re-draw their chart, table headers sort, the search box filters.

import {
  AGE_SOURCE, AGE_STRUCTURE, COMPOSITION, COUNTRY, EMPLOYMENT,
  EMPLOYMENT_SOURCE, GDP_GROWTH, GDP_GROWTH_SOURCE, HEADLINES,
  POPULATION_SERIES, POPULATION_SOURCE, POVERTY_SERIES, POVERTY_SOURCE,
  PROVINCES, PROVINCES_SOURCE, SECTORS, SECTORS_SOURCE, SITE_META,
  SOCIETY, SOURCES, TRADE,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart, sparkline } from './charts.js';

function sourceLine(source) {
  return `<p class="source">Source: ${source}</p>`;
}

function cardLink(headline) {
  return `<a class="stat-card" href="${headline.route}">
    <span class="stat-label">${headline.label}</span>
    <span class="stat-value">${headline.value}</span>
    <span class="stat-detail">${headline.detail}</span>
    <span class="stat-year">${headline.year} · ${headline.source}</span>
  </a>`;
}

function overviewPage() {
  const pop = POPULATION_SERIES.map((d) => ({ x: String(d.year), y: d.value }));
  const growth = GDP_GROWTH.map((d) => ({ x: String(d.year), y: d.value }));
  const topProvinces = [...PROVINCES].slice(0, 6).map((p) => ({ x: p.name, y: p.pop }));
  return `<section class="hero">
    <p class="eyebrow">Indonesia · Official statistics, plainly presented</p>
    <h1>${COUNTRY.name} in numbers</h1>
    <p class="lede">One country, 17,508 islands, 281.6 million people. NusaStat gathers
    Indonesia's key national statistics — population, economy, work and daily life —
    from the publishers themselves, each figure with its source and year.</p>
    <div class="hero-facts">
      <span><strong>${COUNTRY.landAreaKm2.toLocaleString('en-US')} km²</strong> land area</span>
      <span><strong>${COUNTRY.provinces}</strong> provinces</span>
      <span><strong>${COUNTRY.capital}</strong> capital</span>
      <span><strong>${COUNTRY.language}</strong> official language</span>
    </div>
  </section>

  <section aria-label="Key indicators">
    <h2>Key indicators</h2>
    <div class="stat-grid">${HEADLINES.map(cardLink).join('')}</div>
  </section>

  <section class="panel-grid">
    <article class="panel">
      <h2>Population, 2010–2024</h2>
      <p class="panel-note">Millions of people. The 2010 and 2020 points are censuses.</p>
      ${lineChart(pop, { aria: 'Population of Indonesia, 2010 to 2024', yLabel: 'million', decimals: 1 })}
      ${sourceLine(POPULATION_SOURCE)}
      <p><a class="more" href="#/population">Explore population →</a></p>
    </article>
    <article class="panel">
      <h2>GDP growth, 2019–2024</h2>
      <p class="panel-note">Real GDP change, % year on year. The 2020 dip is the pandemic recession.</p>
      ${barChart(growth, { aria: 'Real GDP growth of Indonesia, 2019 to 2024', decimals: 2, unit: '%' })}
      ${sourceLine(GDP_GROWTH_SOURCE)}
      <p><a class="more" href="#/economy">Explore the economy →</a></p>
    </article>
  </section>

  <section class="panel-grid">
    <article class="panel">
      <h2>Largest provinces</h2>
      <p class="panel-note">Population in millions, 2024. Java holds more than half the country.</p>
      ${hbarChart(topProvinces, { aria: 'Six largest provinces by population', unit: ' million', decimals: 1 })}
      ${sourceLine(PROVINCES_SOURCE)}
      <p><a class="more" href="#/population">All 20 largest provinces →</a></p>
    </article>
    <article class="panel">
      <h2>Poverty is falling</h2>
      <p class="panel-note">Share of the population below the national poverty line, %.</p>
      ${sparkline(POVERTY_SERIES.map((d) => d.value), {})}
      <p class="big-number">8.57% <span>September 2024 — down from 10.19% in 2020</span></p>
      ${sourceLine(POVERTY_SOURCE)}
      <p><a class="more" href="#/society">People &amp; society →</a></p>
    </article>
  </section>

  <section class="panel">
    <h2>At a glance</h2>
    <dl class="facts">
      <div><dt>Currency</dt><dd>${COUNTRY.currency} — about IDR 15,855 per US$ in 2024 (World Bank)</dd></div>
      <div><dt>Independence</dt><dd>${COUNTRY.independence}</dd></div>
      <div><dt>Islands</dt><dd>${COUNTRY.islands.toLocaleString('en-US')} named islands (BPS, 2024)</dd></div>
      <div><dt>Capital note</dt><dd>${COUNTRY.capitalNote}</dd></div>
      <div><dt>Urban share</dt><dd>58.8% of people live in cities (World Bank, 2024)</dd></div>
      <div><dt>Internet users</dt><dd>72.8% of the population (World Bank, 2024)</dd></div>
    </dl>
    <p class="updated">Figures last checked ${SITE_META.updated}. ${SITE_META.note}</p>
  </section>`;
}

let popChartMode = 'line';
let popRange = 'all';

function populationPage() {
  const series = popRange === 'recent'
    ? POPULATION_SERIES.filter((d) => d.year >= 2019)
    : POPULATION_SERIES;
  const chartData = series.map((d) => ({ x: String(d.year), y: d.value }));
  const chart = popChartMode === 'bar'
    ? barChart(chartData, { aria: 'Population of Indonesia by year', decimals: 1, unit: ' million' })
    : lineChart(chartData, { aria: 'Population of Indonesia by year', yLabel: 'million', decimals: 1 });
  return `<section class="page-head">
    <p class="eyebrow">People</p>
    <h1>Population</h1>
    <p class="lede">Indonesia is the world's fourth most populous country. Growth has slowed
    to about 0.8% a year, and the population is ageing: 7.3% are now 65 or older.</p>
  </section>

  <section class="panel">
    <div class="panel-head">
      <h2>Population growth</h2>
      <div class="controls" role="group" aria-label="Chart controls">
        <button type="button" data-pop-mode="line" class="${popChartMode === 'line' ? 'active' : ''}">Line</button>
        <button type="button" data-pop-mode="bar" class="${popChartMode === 'bar' ? 'active' : ''}">Bars</button>
        <span class="sep" aria-hidden="true"></span>
        <button type="button" data-pop-range="all" class="${popRange === 'all' ? 'active' : ''}">2010–2024</button>
        <button type="button" data-pop-range="recent" class="${popRange === 'recent' ? 'active' : ''}">2019–2024</button>
      </div>
    </div>
    ${chart}
    ${sourceLine(POPULATION_SOURCE)}
  </section>

  <section class="panel-grid">
    <article class="panel">
      <h2>Age structure, 2024</h2>
      ${hbarChart(AGE_STRUCTURE.map((a) => ({ x: a.group, y: a.share })), { aria: 'Age structure of Indonesia, 2024', unit: '%', decimals: 1, labelWidth: 120 })}
      <ul class="plain-list">
        ${AGE_STRUCTURE.map((a) => `<li><strong>${a.group}:</strong> ${a.share}% — ${a.people}</li>`).join('')}
      </ul>
      ${sourceLine(AGE_SOURCE)}
    </article>
    <article class="panel">
      <h2>Who lives here</h2>
      <h3>Religion</h3>
      <ul class="plain-list">
        ${COMPOSITION.religion.map((r) => `<li><strong>${r.name}:</strong> ${r.share}%</li>`).join('')}
      </ul>
      ${sourceLine(COMPOSITION.religionSource)}
      <h3>Largest ethnic groups</h3>
      <ul class="plain-list">
        ${COMPOSITION.ethnic.map((e) => `<li><strong>${e.name}:</strong> ${e.share}%</li>`).join('')}
      </ul>
      ${sourceLine(COMPOSITION.ethnicSource)}
    </article>
  </section>

  <section class="panel">
    <div class="panel-head">
      <h2>Provinces by population</h2>
      <label class="search">Search <input id="province-search" type="search" placeholder="Type a province…" aria-label="Search provinces"></label>
    </div>
    <p class="panel-note">Click a column heading to sort. Population in millions, density in people per km², 2024.</p>
    <div class="table-wrap"><table id="province-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Province</button></th>
        <th><button type="button" data-sort="capital">Capital</button></th>
        <th class="num"><button type="button" data-sort="pop">Population ↓</button></th>
        <th class="num"><button type="button" data-sort="density">Density</button></th>
      </tr></thead>
      <tbody></tbody>
    </table></div>
    <p id="province-count" class="panel-note" aria-live="polite"></p>
    ${sourceLine(PROVINCES_SOURCE)}
  </section>`;
}

let sectorMode = 'gdp';

function economyPage() {
  const growth = GDP_GROWTH.map((d) => ({ x: String(d.year), y: d.value }));
  const sectorData = (sectorMode === 'gdp' ? SECTORS : EMPLOYMENT)
    .map((s) => ({ x: s.name, y: s.share }));
  const sectorLabel = sectorMode === 'gdp' ? 'Share of GDP, 2024' : 'Share of employment, 2024';
  return `<section class="page-head">
    <p class="eyebrow">Economy</p>
    <h1>The economy</h1>
    <p class="lede">A US$1.40 trillion economy that has grown about 5% a year since 2022 —
    driven by manufacturing, trade and agriculture, and by a commodity export boom.</p>
  </section>

  <section class="panel">
    <h2>Real GDP growth</h2>
    <p class="panel-note">% change year on year. 2020 is the only contraction in the series.</p>
    ${barChart(growth, { aria: 'Real GDP growth, 2019 to 2024', decimals: 2, unit: '%' })}
    ${sourceLine(GDP_GROWTH_SOURCE)}
  </section>

  <section class="panel-grid">
    <article class="panel">
      <div class="panel-head">
        <h2>What the economy is made of</h2>
        <div class="controls" role="group" aria-label="Sector view">
          <button type="button" data-sector="gdp" class="${sectorMode === 'gdp' ? 'active' : ''}">Share of GDP</button>
          <button type="button" data-sector="jobs" class="${sectorMode === 'jobs' ? 'active' : ''}">Share of jobs</button>
        </div>
      </div>
      <p class="panel-note">${sectorLabel}. Manufacturing leads GDP; services lead jobs.</p>
      <div class="donut-wrap">
        ${donutChart(sectorData, { aria: sectorLabel, centre: sectorMode === 'gdp' ? 'GDP' : 'Jobs', centreSub: '2024' })}
        <ul class="legend">
          ${sectorData.map((s, i) => `<li><span class="swatch" style="background:${['#0e6b6b', '#2a9d8f', '#e9a13b', '#d95d39', '#7a9e7e', '#4a7fa5', '#8a6d9b', '#c97b4a', '#5f7370', '#b7c9c4'][i % 10]}"></span>${s.x} — <strong>${s.y}%</strong></li>`).join('')}
        </ul>
      </div>
      ${sourceLine(sectorMode === 'gdp' ? SECTORS_SOURCE : EMPLOYMENT_SOURCE)}
    </article>
    <article class="panel">
      <h2>Trade &amp; money</h2>
      <dl class="facts">
        ${TRADE.map((t) => `<div><dt>${t.label}</dt><dd>${t.value} <span class="fact-year">${t.year} · ${t.source}</span></dd></div>`).join('')}
      </dl>
      <p class="panel-note">Indonesia ran a goods trade surplus every year from 2020 to 2024,
      helped by coal and palm-oil exports. GDP per capita reached US$4,925 in 2024
      (World Bank) — upper-middle income.</p>
    </article>
  </section>`;
}

let povertyMode = 'all';

function societyPage() {
  const series = povertyMode === 'recent'
    ? POVERTY_SERIES.filter((d) => d.year >= 2021)
    : POVERTY_SERIES;
  const chartData = series.map((d) => ({ x: String(d.year), y: d.value }));
  return `<section class="page-head">
    <p class="eyebrow">People &amp; society</p>
    <h1>Daily life</h1>
    <p class="lede">Poverty has fallen by more than half since 2000, schooling has lengthened,
    and most Indonesians are now online — but youth unemployment and inequality
    remain the hard problems.</p>
  </section>

  <section class="panel">
    <div class="panel-head">
      <h2>Poverty rate</h2>
      <div class="controls" role="group" aria-label="Poverty chart range">
        <button type="button" data-poverty-range="all" class="${povertyMode === 'all' ? 'active' : ''}">2019–2024</button>
        <button type="button" data-poverty-range="recent" class="${povertyMode === 'recent' ? 'active' : ''}">2021–2024</button>
      </div>
    </div>
    <p class="panel-note">% of the population below the national poverty line. The 2020 spike is the pandemic.</p>
    ${lineChart(chartData, { aria: 'Poverty rate of Indonesia', yLabel: '%', decimals: 2, unit: '%' })}
    ${sourceLine(POVERTY_SOURCE)}
  </section>

  <section aria-label="Society indicators">
    <h2>Health, education &amp; work</h2>
    <div class="society-grid">
      ${SOCIETY.map((s) => `<article class="society-card">
        <h3>${s.label}</h3>
        <p class="society-value">${s.value}</p>
        <p class="society-note">${s.note}</p>
        <p class="stat-year">${s.year} · ${s.source}</p>
      </article>`).join('')}
    </div>
  </section>`;
}

function sourcesPage() {
  return `<section class="page-head">
    <p class="eyebrow">About this site</p>
    <h1>Sources &amp; methods</h1>
    <p class="lede">Every figure on NusaStat names its publisher and year. Figures are shown
    as published; nothing here is modelled, forecast or estimated by this site.</p>
  </section>

  <section class="panel">
    <h2>Where the numbers come from</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Publisher</th><th>What it covers here</th><th>Site</th></tr></thead>
      <tbody>
        ${SOURCES.map((s) => `<tr><td><strong>${s.name}</strong></td><td>${s.covers}</td><td>${s.url}</td></tr>`).join('')}
      </tbody>
    </table></div>
  </section>

  <section class="panel-grid">
    <article class="panel">
      <h2>How to read the figures</h2>
      <ul class="plain-list">
        <li><strong>BPS vs World Bank:</strong> BPS is Indonesia's national statistics office; its population figure (281.6m, 2024) is a mid-year estimate, while the World Bank's (283.5m) follows UN estimates. Both are shown where they differ.</li>
        <li><strong>Unemployment:</strong> BPS reports 4.91% (Aug 2024, national definition); the ILO-modelled World Bank figure is 3.3%. The two measure different things.</li>
        <li><strong>Poverty:</strong> the national poverty line is set by BPS from the cost of a basic basket; it is not the World Bank's $2.15-a-day line (4–5% of Indonesians).</li>
        <li><strong>Rounding:</strong> shares may sum to 99.9% or 100.1% after rounding.</li>
      </ul>
    </article>
    <article class="panel">
      <h2>About NusaStat</h2>
      <p>NusaStat is an independent, unofficial portal built to make Indonesia's
      national statistics easy to explore. It is not affiliated with BPS, the World
      Bank or any government body. All charts are drawn from the figures on this
      page — no data is fetched from the network; the site works fully offline.</p>
      <p class="updated">${SITE_META.note}</p>
      <p><a class="more" href="#/">Back to the overview →</a></p>
    </article>
  </section>`;
}

export const PAGES = {
  '/': overviewPage,
  '/population': populationPage,
  '/economy': economyPage,
  '/society': societyPage,
  '/sources': sourcesPage,
};

// Wire up the controls of the page that was just rendered.
export function bindPageControls(route) {
  if (route === '/population') {
    document.querySelectorAll('[data-pop-mode]').forEach((b) => b.addEventListener('click', () => {
      popChartMode = b.dataset.popMode;
      render();
    }));
    document.querySelectorAll('[data-pop-range]').forEach((b) => b.addEventListener('click', () => {
      popRange = b.dataset.popRange;
      render();
    }));
    bindProvinceTable();
  }
  if (route === '/economy') {
    document.querySelectorAll('[data-sector]').forEach((b) => b.addEventListener('click', () => {
      sectorMode = b.dataset.sector === 'gdp' ? 'gdp' : 'jobs';
      render();
    }));
  }
  if (route === '/society') {
    document.querySelectorAll('[data-poverty-range]').forEach((b) => b.addEventListener('click', () => {
      povertyMode = b.dataset.povertyRange;
      render();
    }));
  }
}

let provinceSort = { key: 'pop', dir: -1 };
let provinceQuery = '';

function bindProvinceTable() {
  const tbody = document.querySelector('#province-table tbody');
  const count = document.querySelector('#province-count');
  const search = document.querySelector('#province-search');
  const draw = () => {
    const q = provinceQuery.trim().toLowerCase();
    const rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
    const sorted = [...rows].sort((a, b) => {
      const k = provinceSort.key;
      const av = a[k];
      const bv = b[k];
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return provinceSort.dir * cmp;
    });
    tbody.innerHTML = sorted.map((p) => `<tr>
      <td><strong>${p.name}</strong></td><td>${p.capital}</td>
      <td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.density.toLocaleString('en-US')}</td>
    </tr>`).join('') || '<tr><td colspan="4">No province matches that search.</td></tr>';
    count.textContent = `Showing ${sorted.length} of ${PROVINCES.length} provinces listed (top 20 of 38).`;
    document.querySelectorAll('#province-table [data-sort]').forEach((b) => {
      const k = b.dataset.sort;
      const arrow = provinceSort.key === k ? (provinceSort.dir === -1 ? ' ↓' : ' ↑') : '';
      b.textContent = b.textContent.replace(/ [↑↓]$/, '') + arrow;
    });
  };
  document.querySelectorAll('#province-table [data-sort]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.sort;
    if (provinceSort.key === k) provinceSort.dir *= -1;
    else provinceSort = { key: k, dir: k === 'name' || k === 'capital' ? 1 : -1 };
    draw();
  }));
  search.addEventListener('input', () => { provinceQuery = search.value; draw(); });
  draw();
}

// render() is defined in main.js and imported lazily to avoid a cycle.
import { render } from './main.js';
