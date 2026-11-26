// NusaStat data — every figure in this file carries its source and year.
// Figures are national statistics for Indonesia. Sources: Statistics Indonesia
// (BPS), the World Bank (World Development Indicators), UNDP and Bank Indonesia.
// Headline figures use the most recent release available in November 2026.

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'The archipelago in numbers',
  capital: 'Jakarta',
  capitalNote: 'Nusantara (East Kalimantan) is under construction as the new capital.',
  language: 'Indonesian (Bahasa Indonesia)',
  currency: 'Indonesian rupiah (IDR)',
  landAreaKm2: 1904569,
  landAreaSource: 'BPS, 2024',
  provinces: 38,
  provincesSource: 'BPS, 2024 — 38 provinces after the four new Papua provinces',
  islands: 17508,
  islandsSource: 'BPS, 2024',
  independence: '17 August 1945',
};

// Headline indicators shown on the overview dashboard.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Population',
    value: '281.6 million',
    detail: '4th largest in the world',
    year: 2024,
    source: 'BPS mid-year estimate 2024 (World Bank: 283.5 million)',
    route: '#/population',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: 'US$1.40 trillion',
    detail: '16th largest economy',
    year: 2024,
    source: 'World Bank, World Development Indicators 2024',
    route: '#/economy',
  },
  {
    id: 'growth',
    label: 'GDP growth',
    value: '5.03%',
    detail: 'year on year, steady since 2022',
    year: 2024,
    source: 'BPS, 2024',
    route: '#/economy',
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.57%',
    detail: '24.06 million people',
    year: 'Sep 2024',
    source: 'BPS, September 2024',
    route: '#/society',
  },
  {
    id: 'unemployment',
    label: 'Unemployment',
    value: '4.91%',
    detail: 'of the labour force',
    year: 'Aug 2024',
    source: 'BPS (Sakernas), August 2024',
    route: '#/society',
  },
  {
    id: 'life',
    label: 'Life expectancy',
    value: '71.3 years',
    detail: '73.4 women · 69.2 men',
    year: 2024,
    source: 'World Bank WDI 2024',
    route: '#/society',
  },
];

// Population (millions), BPS census and intercensal estimates, 2010–2024.
export const POPULATION_SERIES = [
  { year: 2010, value: 237.6, note: 'census' },
  { year: 2011, value: 241.0 },
  { year: 2012, value: 244.2 },
  { year: 2013, value: 247.4 },
  { year: 2014, value: 250.8 },
  { year: 2015, value: 255.2 },
  { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 },
  { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 },
  { year: 2020, value: 270.2, note: 'census' },
  { year: 2021, value: 273.0 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];
export const POPULATION_SOURCE = 'BPS — Population Census 2010 & 2020, intercensal and mid-year estimates';

// Age structure, 2024 (World Bank WDI).
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 24.6, people: '69.3 million' },
  { group: '15–64 years', share: 68.1, people: '191.8 million' },
  { group: '65+ years', share: 7.3, people: '20.6 million' },
];
export const AGE_SOURCE = 'World Bank, World Development Indicators 2024';

// Religion and largest ethnic groups (BPS Population Census 2010/2020).
export const COMPOSITION = {
  religion: [
    { name: 'Muslim', share: 86.7 },
    { name: 'Christian', share: 10.7 },
    { name: 'Hindu', share: 1.7 },
    { name: 'Buddhist', share: 0.7 },
    { name: 'Confucian and other', share: 0.2 },
  ],
  religionSource: 'BPS Population Census 2020',
  ethnic: [
    { name: 'Javanese', share: 40.1 },
    { name: 'Sundanese', share: 15.5 },
    { name: 'Malay', share: 3.7 },
    { name: 'Batak', share: 3.6 },
    { name: 'Madurese', share: 3.0 },
    { name: 'Other (1,300+ groups)', share: 34.1 },
  ],
  ethnicSource: 'BPS Population Census 2010',
};

// Provinces by population, 2024 (BPS mid-year estimates, millions).
export const PROVINCES = [
  { name: 'West Java', pop: 50.35, capital: 'Bandung', density: 1425 },
  { name: 'East Java', pop: 41.81, capital: 'Surabaya', density: 873 },
  { name: 'Central Java', pop: 37.89, capital: 'Semarang', density: 1117 },
  { name: 'North Sumatra', pop: 15.59, capital: 'Medan', density: 214 },
  { name: 'Banten', pop: 12.43, capital: 'Serang', density: 1287 },
  { name: 'Jakarta', pop: 10.56, capital: 'Jakarta', density: 15927 },
  { name: 'South Sulawesi', pop: 9.46, capital: 'Makassar', density: 203 },
  { name: 'Lampung', pop: 9.29, capital: 'Bandar Lampung', density: 269 },
  { name: 'South Sumatra', pop: 8.94, capital: 'Palembang', density: 98 },
  { name: 'Riau', pop: 6.99, capital: 'Pekanbaru', density: 80 },
  { name: 'West Sumatra', pop: 5.76, capital: 'Padang', density: 137 },
  { name: 'East Kalimantan', pop: 3.93, capital: 'Samarinda', density: 31 },
  { name: 'West Kalimantan', pop: 5.70, capital: 'Pontianak', density: 39 },
  { name: 'South Kalimantan', pop: 4.23, capital: 'Banjarmasin', density: 109 },
  { name: 'Central Kalimantan', pop: 2.81, capital: 'Palangka Raya', density: 18 },
  { name: 'Aceh', pop: 5.55, capital: 'Banda Aceh', density: 95 },
  { name: 'Yogyakarta', pop: 3.77, capital: 'Yogyakarta', density: 1206 },
  { name: 'Bali', pop: 4.34, capital: 'Denpasar', density: 752 },
  { name: 'East Nusa Tenggara', pop: 5.66, capital: 'Kupang', density: 117 },
  { name: 'West Nusa Tenggara', pop: 5.55, capital: 'Mataram', density: 299 },
];
export const PROVINCES_SOURCE = 'BPS mid-year population estimates 2024 (top 20 of 38 provinces)';

// Real GDP growth, % year on year (BPS).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];
export const GDP_GROWTH_SOURCE = 'BPS, national accounts 2019–2024';

// GDP by sector, share of GDP 2024 (BPS).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.98 },
  { name: 'Wholesale & retail trade', share: 12.93 },
  { name: 'Agriculture, forestry & fishing', share: 12.06 },
  { name: 'Mining & quarrying', share: 9.92 },
  { name: 'Construction', share: 9.71 },
  { name: 'Transport & storage', share: 3.91 },
  { name: 'Information & communication', share: 4.17 },
  { name: 'Financial & insurance', share: 4.30 },
  { name: 'Public administration', share: 6.70 },
  { name: 'All other services', share: 17.32 },
];
export const SECTORS_SOURCE = 'BPS, GDP by industry 2024';

// Employment by broad sector, 2024 (ILOSTAT / BPS Sakernas).
export const EMPLOYMENT = [
  { name: 'Services', share: 49.8 },
  { name: 'Agriculture', share: 28.0 },
  { name: 'Industry', share: 22.3 },
];
export const EMPLOYMENT_SOURCE = 'ILOSTAT / BPS Sakernas 2024 (shares sum to 100.1% by rounding)';

// Trade and external sector (BPS, Bank Indonesia, World Bank).
export const TRADE = [
  { label: 'Exports of goods', value: 'US$264.7 bn', year: 2024, source: 'BPS' },
  { label: 'Imports of goods', value: 'US$233.7 bn', year: 2024, source: 'BPS' },
  { label: 'Trade balance', value: 'US$31.0 bn surplus', year: 2024, source: 'BPS' },
  { label: 'Top exports', value: 'Coal, palm oil, iron & steel', year: 2024, source: 'BPS' },
  { label: 'FDI inflows', value: 'US$24.2 bn', year: 2024, source: 'World Bank' },
  { label: 'Inflation (CPI, annual avg.)', value: '2.18%', year: 2024, source: 'World Bank / BPS' },
  { label: 'Exchange rate (avg.)', value: 'IDR 15,855 / US$', year: 2024, source: 'World Bank' },
  { label: 'Government debt', value: '40.8% of GDP', year: 2025, source: 'IMF / World Bank' },
];

// Poverty rate, % of population (BPS, March/September releases).
export const POVERTY_SERIES = [
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];
export const POVERTY_SOURCE = 'BPS, September releases 2019–2024 (2024: 24.06 million people)';

// Society indicators.
export const SOCIETY = [
  { label: 'Human Development Index', value: '0.728', note: 'High human development, rank 113 of 193', year: 2023, source: 'UNDP Human Development Report' },
  { label: 'Mean years of schooling', value: '9.13 years', note: 'Expected years of schooling 13.21', year: 2024, source: 'BPS' },
  { label: 'Gini coefficient', value: '0.379', note: 'September 2024; urban 0.402, rural 0.315', year: 2024, source: 'BPS' },
  { label: 'Infant mortality', value: '15.2 per 1,000', note: 'Live births', year: 2024, source: 'World Bank WDI' },
  { label: 'Maternal mortality', value: '140 per 100,000', note: 'Live births', year: 2023, source: 'World Bank WDI' },
  { label: 'Health spending', value: '2.7% of GDP', note: 'Current health expenditure', year: 2023, source: 'World Bank WDI' },
  { label: 'Internet users', value: '72.8% of people', note: '206 million users', year: 2024, source: 'World Bank WDI' },
  { label: 'Mobile subscriptions', value: '122.5 per 100 people', note: 'More subscriptions than people', year: 2024, source: 'World Bank WDI' },
  { label: 'Urban population', value: '58.8%', note: '165.8 million people live in cities', year: 2024, source: 'World Bank WDI' },
  { label: 'Labour force participation', value: '67.0%', note: 'Women 53.6%, men 82.3%', year: 2024, source: 'World Bank / ILO' },
  { label: 'Youth unemployment (15–24)', value: '13.1%', note: 'Versus 4.91% overall (BPS)', year: 2024, source: 'World Bank / BPS' },
  { label: 'Fertility rate', value: '2.1 children', note: 'Per woman, replacement level', year: 2023, source: 'World Bank WDI' },
];

// Sources page: every source the site cites, with what it covers.
export const SOURCES = [
  { name: 'Statistics Indonesia (BPS)', short: 'BPS', covers: 'Population, GDP growth, poverty, unemployment, Gini, schooling, provincial data', url: 'bps.go.id' },
  { name: 'World Bank — World Development Indicators', short: 'World Bank WDI', covers: 'GDP, GDP per capita, life expectancy, internet use, trade ratios, FDI', url: 'data.worldbank.org' },
  { name: 'Bank Indonesia', short: 'BI', covers: 'Exchange rate, inflation, balance of payments', url: 'bi.go.id' },
  { name: 'UNDP — Human Development Report', short: 'UNDP', covers: 'Human Development Index 2023', url: 'hdr.undp.org' },
  { name: 'International Labour Organization (ILOSTAT)', short: 'ILO', covers: 'Employment by sector, labour force participation', url: 'ilostat.ilo.org' },
  { name: 'International Monetary Fund', short: 'IMF', covers: 'Government debt, 2025 estimates', url: 'imf.org' },
];

export const SITE_META = {
  updated: '27 November 2026',
  note: 'NusaStat is an independent, unofficial statistics portal. Figures are cited to their publishers; always check the primary source before quoting a number in official work.',
};
