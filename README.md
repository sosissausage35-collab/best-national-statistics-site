# NusaStat — Indonesia in Numbers

An independent, unofficial national statistics site for **Indonesia** — population,
economy, work and daily life — built for the make.fun bounty
[“Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
(`best-national-statistics-site-20261126-0539`).

Every figure carries its source and year: Statistics Indonesia (BPS), the World
Bank (World Development Indicators), UNDP, ILO and Bank Indonesia.

## What it is

- **Overview** — hero, six key indicators (population, GDP, growth, poverty,
  unemployment, life expectancy), population and GDP-growth charts, largest
  provinces, poverty trend.
- **Population** — 2010–2024 series with line/bar toggle and year-range switch,
  age structure, religion and ethnic composition, and a sortable, searchable
  table of the 20 largest provinces.
- **Economy** — GDP growth 2019–2024 (the 2020 pandemic dip in red), sector
  mix as a donut with a GDP/jobs toggle, and a trade & money table.
- **People & Society** — poverty trend with range switch, and twelve health,
  education and work indicators.
- **Sources & Methods** — every publisher the site cites, plus notes on how to
  read figures where sources differ.

All charts are hand-drawn SVG from the site's own code — no libraries, no
network requests. The site is plain static files under `app/` and works fully
offline, on desktop and on a phone.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to
the output directory and writes `dossier.json` with `buildDossier` from
`vendor/makefun-frontend.ts`. Two runs produce byte-identical output.

## License

MIT — see `LICENSE`.
