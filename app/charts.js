// NusaStat charts — small, dependency-free SVG charts drawn by hand.
// Every function takes plain data and returns an SVG string. Colours come from
// the site palette (deep teal, warm amber, coral) defined in style.css.

const TEAL = '#0e6b6b';
const TEAL_LIGHT = '#2a9d8f';
const AMBER = '#e9a13b';
const CORAL = '#d95d39';
const INK = '#1d2b2b';
const GRID = '#dfe7e4';
const MUTED = '#5f7370';

function fmt(value, decimals = 1) {
  return value.toFixed(decimals);
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + s * 0.01; v += s) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Line chart with dots, value labels and a shaded area under the line.
// data: [{x: label, y: number}], opts: {height, yLabel, decimals, colour}
export function lineChart(data, opts = {}) {
  const w = 760;
  const h = opts.height ?? 300;
  const padL = 56;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const ys = data.map((d) => d.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  if (min > 0) min = Math.max(0, min - (max - min) * 0.25);
  if (min === max) { min -= 1; max += 1; }
  const ticks = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const x = (i) => padL + (i * (w - padL - padR)) / (data.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const colour = opts.colour ?? TEAL;
  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.y).toFixed(1)}`).join(' ');
  const area = `M ${x(0).toFixed(1)},${y(data[0].y).toFixed(1)} ` +
    data.map((d, i) => `L ${x(i).toFixed(1)},${y(d.y).toFixed(1)}`).join(' ') +
    ` L ${x(data.length - 1).toFixed(1)},${y(min).toFixed(1)} L ${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;
  const dec = opts.decimals ?? 1;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria ?? 'Line chart')}" class="chart-svg">
    <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colour}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${colour}" stop-opacity="0.01"/>
    </linearGradient></defs>
    ${ticks.map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
      <text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" class="chart-axis">${fmt(t, dec)}</text>`).join('')}
    <path d="${area}" fill="url(#areaFill)"/>
    <polyline points="${points}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${data.map((d, i) => {
      const anchor = i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? x(i) + 6 : i === data.length - 1 ? x(i) - 6 : x(i);
      return `<circle cx="${x(i)}" cy="${y(d.y)}" r="4" fill="#fff" stroke="${colour}" stroke-width="2.5">
        <title>${esc(d.x)}: ${fmt(d.y, dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</title></circle>
      <text x="${lx}" y="${y(d.y) - 10}" text-anchor="${anchor}" class="chart-value">${fmt(d.y, dec)}</text>`;
    }).join('')}
    ${data.map((d, i) => `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" class="chart-axis">${esc(d.x)}</text>`).join('')}
    ${opts.yLabel ? `<text x="${padL}" y="12" class="chart-axis">${esc(opts.yLabel)}</text>` : ''}
  </svg>`;
}

// Vertical bar chart. data: [{x: label, y: number}]
export function barChart(data, opts = {}) {
  const w = 760;
  const h = opts.height ?? 300;
  const padL = 56;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const ys = data.map((d) => d.y);
  const max = Math.max(...ys, 0) * 1.12;
  const min = Math.min(0, ...ys) * 1.15;
  const ticks = niceTicks(min, max, 4);
  const top = Math.max(max, ticks[ticks.length - 1]);
  const bottom = Math.min(min, ticks[0]);
  const y = (v) => padT + ((top - v) * (h - padT - padB)) / (top - bottom);
  const slot = (w - padL - padR) / data.length;
  const bw = Math.min(64, slot * 0.62);
  const dec = opts.decimals ?? 1;
  const colour = opts.colour ?? TEAL;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria ?? 'Bar chart')}" class="chart-svg">
    ${ticks.map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
      <text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" class="chart-axis">${fmt(t, dec)}</text>`).join('')}
    <line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1.2"/>
    ${data.map((d, i) => {
      const bx = padL + i * slot + (slot - bw) / 2;
      const by = d.y >= 0 ? y(d.y) : y(0);
      const bh = Math.abs(y(d.y) - y(0));
      const fill = d.y < 0 ? CORAL : colour;
      return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}">
          <title>${esc(d.x)}: ${fmt(d.y, dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</title></rect>
        <text x="${(bx + bw / 2).toFixed(1)}" y="${(d.y >= 0 ? by - 8 : by + bh + 16).toFixed(1)}" text-anchor="middle" class="chart-value">${fmt(d.y, dec)}</text>
        <text x="${(bx + bw / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" class="chart-axis">${esc(d.x)}</text>`;
    }).join('')}
  </svg>`;
}

// Horizontal bar chart, best for ranked lists such as provinces.
// data: [{x: label, y: number}]
export function hbarChart(data, opts = {}) {
  const rowH = opts.rowHeight ?? 34;
  const h = rowH * data.length + 30;
  const w = 760;
  const padL = opts.labelWidth ?? 150;
  const padR = 64;
  const padT = 8;
  const max = Math.max(...data.map((d) => d.y)) * 1.08;
  const dec = opts.decimals ?? 1;
  const colour = opts.colour ?? TEAL;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria ?? 'Horizontal bar chart')}" class="chart-svg">
    ${data.map((d, i) => {
      const cy = padT + i * rowH + rowH / 2;
      const bw = ((w - padL - padR) * d.y) / max;
      return `<text x="${padL - 10}" y="${cy + 4}" text-anchor="end" class="chart-label">${esc(d.x)}</text>
        <rect x="${padL}" y="${cy - 9}" width="${Math.max(bw, 2).toFixed(1)}" height="18" rx="4" fill="${i === 0 ? AMBER : colour}">
          <title>${esc(d.x)}: ${fmt(d.y, dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</title></rect>
        <text x="${padL + bw + 8}" y="${cy + 4}" class="chart-value">${fmt(d.y, dec)}</text>`;
    }).join('')}
  </svg>`;
}

// Donut chart with a centre label and a legend list beside it (built by the caller).
// data: [{x: label, y: number}]
export function donutChart(data, opts = {}) {
  const size = 260;
  const r = 96;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((s, d) => s + d.y, 0);
  const palette = [TEAL, TEAL_LIGHT, AMBER, CORAL, '#7a9e7e', '#4a7fa5', '#8a6d9b', '#c97b4a', '#5f7370', '#b7c9c4'];
  let angle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const frac = d.y / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const path = `M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
    return `<path d="${path}" fill="${palette[i % palette.length]}" stroke="#fff" stroke-width="2">
      <title>${esc(d.x)}: ${fmt(d.y, 2)}%</title></path>`;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.aria ?? 'Donut chart')}" class="chart-svg donut">
    ${slices}
    <circle cx="${cx}" cy="${cy}" r="58" fill="#fff"/>
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="donut-centre">${esc(opts.centre ?? '')}</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" class="chart-axis">${esc(opts.centreSub ?? '')}</text>
  </svg>`;
}

// Small sparkline for indicator cards. data: array of numbers.
export function sparkline(values, opts = {}) {
  const w = 160;
  const h = 44;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => 4 + (i * (w - 8)) / (values.length - 1);
  const y = (v) => 4 + ((max - v) * (h - 8)) / span;
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="spark" aria-hidden="true">
    <polyline points="${points}" fill="none" stroke="${opts.colour ?? TEAL}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="${x(values.length - 1)}" cy="${y(values[values.length - 1])}" r="3" fill="${opts.colour ?? TEAL}"/>
  </svg>`;
}
