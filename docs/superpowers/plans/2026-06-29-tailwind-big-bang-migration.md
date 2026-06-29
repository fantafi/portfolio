# Tailwind Big-Bang Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio and services site from semantic global CSS to Tailwind utility classes while preserving the current UI and behavior.

**Architecture:** Keep the current Vinext/Next route and component structure. Move layout, typography, spacing, colors, borders, states, and responsive behavior into component `className` values, then reduce `app/globals.css` to Tailwind import, tokens, base document styles, and reduced-motion behavior. Use Tailwind arbitrary values for the existing palette and exact layout measurements so the migration is visual-preserving rather than a redesign.

**Tech Stack:** Vinext/Next app router, React 19, TypeScript, Tailwind CSS v4 via `@import "tailwindcss"` and `@tailwindcss/postcss`, Three.js, existing `node --run lint` and `node --run build` verification.

---

## File Structure

- Modify: `app/globals.css`
  - Keep only Tailwind import, CSS variables, `@theme`, base document rules, and reduced-motion scroll behavior.
  - Remove semantic component selectors after their JSX is migrated.
- Modify: `app/components/SiteNav.tsx`
  - Move sticky nav grid, mobile two-row layout, link states, and focus rings into Tailwind classes.
- Modify: `app/components/LanguageToggle.tsx`
  - Move segmented control styling into Tailwind classes and remove dependence on `.is-active`.
- Modify: `app/components/ContactLinks.tsx`
  - Move hero/footer link styling into variant-aware Tailwind classes.
- Modify: `app/components/SectionHeader.tsx`
  - Move section header spacing, eyebrow, title, and body typography into Tailwind classes.
- Modify: `app/components/ServiceCard.tsx`
  - Move card shell, index, body, and tag pill styling into Tailwind classes.
- Modify: `app/components/ProjectCard.tsx`
  - Move project card shell, category, body, and outcome list styling into Tailwind classes.
- Modify: `app/components/PortfolioPage.tsx`
  - Move shell, hero, content sections, teaser, about, stack, and contact layout into Tailwind classes.
- Modify: `app/components/ServicesPage.tsx`
  - Move shell, services hero, CTA buttons, grids, process, fit, and contact layout into Tailwind classes.
- Modify: `app/components/HeroScene.tsx`
  - Move wrapper, pseudo background, canvas sizing, and fallback dot styling into Tailwind classes.
- Modify: `app/components/ServiceOrbitScene.tsx`
  - Move wrapper, pseudo background, labels, fallback labels, and canvas sizing into Tailwind classes. Replace CSS `:has()` and `nth-child()` label positioning with JSX conditional rendering and explicit label position classes.

## Shared Class Targets

Use these exact class patterns when migrating equivalent elements:

```ts
const focusRing =
  "focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]";

const eyebrowClass =
  "mb-3 text-[0.78rem] font-extrabold uppercase leading-[1.4] tracking-[0] text-[var(--accent-strong)]";

const h1Class =
  "mb-[22px] text-[4.3rem] font-[850] leading-[0.98] tracking-[0] max-[960px]:text-5xl max-[520px]:text-[2.3rem] max-[520px]:leading-[1.04]";

const h2Class =
  "mb-3.5 text-[2.25rem] font-[820] leading-[1.08] tracking-[0] max-[520px]:text-[1.72rem]";

const h3Class =
  "mb-2.5 text-[1.08rem] font-extrabold leading-[1.25] tracking-[0]";

const mutedParagraphClass =
  "text-[1.04rem] leading-[1.7] text-[var(--muted)]";

const contentSectionClass =
  "px-10 py-[86px] max-[960px]:px-5 max-[960px]:py-[66px]";

const threeColumnGridClass =
  "grid gap-4 min-[961px]:grid-cols-3";
```

Do not create a shared styles file unless class duplication becomes a readability blocker during execution. Prefer local constants inside a component when a class string is reused within that file.

## Task 1: Establish Baseline and Failing Migration Guard

**Files:**
- Read: `app/globals.css`
- Read: `app/components/*.tsx`

- [ ] **Step 1: Confirm clean working tree**

Run:

```bash
git status --short
```

Expected: no output.

- [ ] **Step 2: Run baseline verification**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
```

Expected: both commands exit `0`. The build may still print existing Vinext/Vite warnings about chunk size and route classification.

- [ ] **Step 3: Run a source guard that must fail before migration**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node -e 'const fs=require("fs"); const css=fs.readFileSync("app/globals.css","utf8"); const files=fs.readdirSync("app/components").filter((file)=>file.endsWith(".tsx")); const oldClasses=["portfolio-shell","site-nav","language-toggle","hero-section","content-section","service-card","project-card","contact-links","hero-scene","service-orbit-scene","process-list","fit-list"]; const jsxHits=[]; for(const file of files){ const text=fs.readFileSync(`app/components/${file}`,"utf8"); for(const cls of oldClasses){ if(text.includes(`"${cls}`)||text.includes(` ${cls}`)||text.includes(`${cls} `)) jsxHits.push(`${file}:${cls}`); } } const cssTooLarge=css.split("\\n").length>140; if(jsxHits.length||cssTooLarge){ console.error(JSON.stringify({jsxHits, cssLines: css.split("\\n").length}, null, 2)); process.exit(1); }'
```

Expected: FAIL with old semantic class hits and `cssLines` greater than `140`. This proves the guard catches the current pre-migration state.

- [ ] **Step 4: Commit nothing**

No files should change in this task.

## Task 2: Migrate Shared UI Components

**Files:**
- Modify: `app/components/SiteNav.tsx`
- Modify: `app/components/LanguageToggle.tsx`
- Modify: `app/components/ContactLinks.tsx`
- Modify: `app/components/SectionHeader.tsx`
- Modify: `app/components/ServiceCard.tsx`
- Modify: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Update `SiteNav.tsx`**

Replace the returned JSX classes with Tailwind utilities equivalent to:

```tsx
<header className="sticky inset-x-0 top-0 z-20 grid grid-cols-[auto_1fr_auto] items-center gap-[18px] border-b border-[rgba(216,225,217,0.82)] bg-[rgba(247,248,243,0.9)] px-10 py-4 backdrop-blur-[18px] max-[960px]:grid-cols-[1fr_auto] max-[960px]:px-5 max-[960px]:py-3.5 max-[520px]:gap-2.5">
  <a
    className="text-[0.96rem] font-extrabold max-[960px]:col-start-1 max-[960px]:row-start-1 max-[520px]:text-[0.9rem] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]"
    href="/"
    aria-label={name}
  >
    {name}
  </a>
  <nav
    className="flex justify-center gap-[18px] max-[960px]:col-span-2 max-[960px]:row-start-2 max-[960px]:flex-wrap max-[960px]:justify-start max-[960px]:gap-x-4 max-[960px]:gap-y-2.5"
    aria-label={ariaLabel}
  >
    {links.map((link) => (
      <a
        className="text-[0.92rem] text-[var(--muted)] hover:text-[var(--accent-strong)] max-[960px]:text-[0.88rem] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]"
        href={link.href}
        key={link.href}
      >
        {link.label}
      </a>
    ))}
  </nav>
  <LanguageToggle
    ariaLabel={languageSelectorLabel}
    labels={languageLabels}
    onChange={onLanguageChange}
    value={language}
  />
</header>
```

Keep the existing props and `LanguageToggle` call unchanged except for formatting.

- [ ] **Step 2: Update `LanguageToggle.tsx`**

Remove the `"is-active"` class usage. Use a computed class string for each button:

```tsx
const buttonClass =
  "min-h-8 min-w-[42px] cursor-pointer rounded-md border-0 px-2 text-[var(--muted)] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]";
const activeButtonClass = "bg-[var(--foreground)] text-white";
```

The wrapper should be:

```tsx
<div
  className="flex gap-1 rounded-lg border border-[var(--line)] bg-[#e9f0eb] p-1 max-[960px]:col-start-2 max-[960px]:row-start-1 max-[960px]:justify-self-end"
  aria-label={ariaLabel}
  role="group"
>
```

Each button should use:

```tsx
className={`${buttonClass} ${value === language ? activeButtonClass : ""}`}
```

- [ ] **Step 3: Update `ContactLinks.tsx`**

Keep `isExternalLink()`. Add local class constants:

```tsx
const baseLinkClass =
  "inline-flex min-h-[42px] items-center rounded-lg border px-4 focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]";
const heroLinkClass =
  "border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)]";
const heroPrimaryClass =
  "border-[var(--foreground)] bg-[var(--foreground)] text-white hover:border-[var(--accent-strong)] hover:bg-[var(--accent-strong)] hover:text-white";
const footerLinkClass =
  "border-white/25 text-white hover:border-white/60 hover:text-white";
const footerPrimaryClass =
  "border-white bg-white text-[var(--foreground)] hover:border-white hover:bg-white hover:text-[var(--foreground)]";
```

Render the wrapper with:

```tsx
<div className="flex flex-wrap gap-2.5">
```

Choose the anchor class by `variant` and `index === 0`:

```tsx
const variantClass =
  variant === "footer"
    ? index === 0
      ? footerPrimaryClass
      : footerLinkClass
    : index === 0
      ? heroPrimaryClass
      : heroLinkClass;
```

- [ ] **Step 4: Update `SectionHeader.tsx`**

Use:

```tsx
<div className="max-w-[720px] pb-[30px]">
  <p className="mb-3 text-[0.78rem] font-extrabold uppercase leading-[1.4] tracking-[0] text-[var(--accent-strong)]">{eyebrow}</p>
  <h2 className="mb-3.5 text-[2.25rem] font-[820] leading-[1.08] tracking-[0] max-[520px]:text-[1.72rem]">{title}</h2>
  <p className="text-[1.04rem] leading-[1.7] text-[var(--muted)]">{body}</p>
</div>
```

- [ ] **Step 5: Update `ServiceCard.tsx`**

Use:

```tsx
<article className="min-h-full rounded-lg border border-[var(--line)] bg-[var(--panel)] p-[22px]">
  <div className="mb-[18px] text-[0.78rem] font-extrabold text-[var(--accent-strong)]">{String(index + 1).padStart(2, "0")}</div>
  <h3 className="mb-2.5 text-[1.08rem] font-extrabold leading-[1.25] tracking-[0]">{item.title}</h3>
  <p className="leading-[1.65] text-[var(--muted)]">{item.body}</p>
  <ul className="mt-[18px] flex list-none flex-wrap gap-2 p-0" aria-label={`${tagListLabel} ${item.title}`}>
    {item.tags.map((tag) => (
      <li className="rounded-full border border-[rgba(20,122,112,0.14)] bg-[var(--panel-soft)] px-2.5 py-[7px] text-[0.82rem] text-[#355147]" key={tag}>
        {tag}
      </li>
    ))}
  </ul>
</article>
```

- [ ] **Step 6: Update `ProjectCard.tsx`**

Use:

```tsx
<article className="min-h-full rounded-lg border border-[var(--line)] bg-[var(--panel)] p-[22px]">
  <p className="mb-[18px] text-[0.78rem] font-extrabold text-[var(--accent-strong)]">{item.category}</p>
  <h3 className="mb-2.5 text-[1.08rem] font-extrabold leading-[1.25] tracking-[0]">{item.title}</h3>
  <p className="leading-[1.65] text-[var(--muted)]">{item.body}</p>
  <ul className="mt-[18px] list-none p-0">
    {item.outcomes.map((outcome) => (
      <li className="border-t border-[var(--line)] py-2.5 leading-[1.55] text-[#38443c]" key={outcome}>
        {outcome}
      </li>
    ))}
  </ul>
</article>
```

- [ ] **Step 7: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: PASS.

- [ ] **Step 8: Commit shared component migration**

Run:

```bash
git add app/components/SiteNav.tsx app/components/LanguageToggle.tsx app/components/ContactLinks.tsx app/components/SectionHeader.tsx app/components/ServiceCard.tsx app/components/ProjectCard.tsx
git commit -m "Migrate shared components to Tailwind"
```

## Task 3: Migrate Homepage Layout and Hero Scene

**Files:**
- Modify: `app/components/PortfolioPage.tsx`
- Modify: `app/components/HeroScene.tsx`

- [ ] **Step 1: Update `PortfolioPage.tsx` shell and hero**

Change the main and hero classes to:

```tsx
<main className="min-h-svh overflow-x-clip" lang={language}>
<section
  className="grid min-h-[calc(100svh-73px)] items-center gap-[42px] px-10 pb-20 pt-[72px] [grid-template-columns:minmax(0,1.05fr)_minmax(320px,0.95fr)] max-[960px]:grid-cols-1 max-[960px]:px-5 max-[960px]:pb-[66px] max-[960px]:pt-[54px]"
  id="top"
>
  <div className="max-w-[720px]">
    <p className="mb-3 text-[0.78rem] font-extrabold uppercase leading-[1.4] tracking-[0] text-[var(--accent-strong)]">{copy.hero.eyebrow}</p>
    <h1 className="mb-[22px] text-[4.3rem] font-[850] leading-[0.98] tracking-[0] max-[960px]:text-5xl max-[520px]:text-[2.3rem] max-[520px]:leading-[1.04]">{copy.hero.title}</h1>
    <p className="text-[1.04rem] leading-[1.7] text-[var(--muted)]">{copy.hero.body}</p>
    <p className="my-[22px] max-w-[620px] border-l-[3px] border-[var(--accent-warm)] pl-3.5 leading-[1.6] text-[#38443c]">{copy.hero.availability}</p>
```

- [ ] **Step 2: Update homepage content sections**

Use this pattern for standard sections:

```tsx
<section className="px-10 py-[86px] max-[960px]:px-5 max-[960px]:py-[66px]" id="expertise">
  <SectionHeader
    eyebrow={copy.expertise.eyebrow}
    title={copy.expertise.title}
    body={copy.expertise.body}
  />
  <div className="grid gap-4 min-[961px]:grid-cols-3">
```

Use this pattern for the services teaser:

```tsx
<section className="bg-[#eef4ef] px-10 py-[86px] max-[960px]:px-5 max-[960px]:py-[66px]" id="services">
  <div className="[&>div]:pb-[18px]">
    <SectionHeader
      eyebrow={copy.services.eyebrow}
      title={copy.services.title}
      body={copy.services.body}
    />
  </div>
  <a className="inline-flex min-h-11 items-center rounded-lg border border-[var(--accent)] px-[18px] font-extrabold text-[var(--accent-strong)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]" href="/services">
```

Use this pattern for the about section:

```tsx
<section className="grid gap-10 px-10 py-[86px] [grid-template-columns:minmax(0,0.8fr)_minmax(320px,1fr)] max-[960px]:grid-cols-1 max-[960px]:px-5 max-[960px]:py-[66px]" id="about">
```

Inside the first about column, use the standard eyebrow, h2, and muted paragraph classes. For the two lists, use:

```tsx
<div className="grid gap-[18px] min-[961px]:grid-cols-2">
<ul className="mt-[18px] list-none p-0">
  <li className="border-t border-[var(--line)] py-2.5 leading-[1.55] text-[#38443c]">
<ul className="mt-[18px] flex list-none flex-wrap gap-2 p-0">
  <li className="rounded-full border border-[rgba(20,122,112,0.14)] bg-[var(--panel-soft)] px-2.5 py-[7px] text-[0.82rem] text-[#355147]">
```

Use this pattern for the contact footer:

```tsx
<footer className="bg-[var(--foreground)] px-10 py-[86px] text-white max-[960px]:px-5 max-[960px]:py-[66px]" id="contact">
  <p className="mb-3 text-[0.78rem] font-extrabold uppercase leading-[1.4] tracking-[0] text-[#b8d9ce]">{copy.contact.eyebrow}</p>
  <h2 className="mb-3.5 max-w-[680px] text-[2.25rem] font-[820] leading-[1.08] tracking-[0] max-[520px]:text-[1.72rem]">{copy.contact.title}</h2>
  <p className="text-[1.04rem] leading-[1.7] text-[#b8d9ce]">{copy.contact.body}</p>
```

- [ ] **Step 3: Update `HeroScene.tsx` wrapper and fallback classes**

After creating the renderer, add:

```ts
renderer.domElement.className = "block h-full w-full";
```

Change the returned JSX to:

```tsx
<div
  className="relative isolate min-h-[460px] before:absolute before:inset-[9%_4%] before:-z-10 before:rounded-lg before:bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(20,122,112,0.14)),repeating-linear-gradient(90deg,rgba(23,32,27,0.08)_0_1px,transparent_1px_28px)] before:content-[''] max-[520px]:min-h-80"
  ref={mountRef}
>
  {showFallback ? (
    <div className="flex min-h-[460px] items-center justify-center gap-[18px] max-[520px]:min-h-80" aria-hidden="true">
      <span className="block size-[26px] rounded-full bg-[var(--accent)]" />
      <span className="block size-[26px] rounded-full bg-[var(--accent)]" />
      <span className="block size-[26px] rounded-full bg-[var(--accent)]" />
    </div>
  ) : null}
</div>
```

Do not change the Three.js scene logic in this task.

- [ ] **Step 4: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: PASS.

- [ ] **Step 5: Commit homepage migration**

Run:

```bash
git add app/components/PortfolioPage.tsx app/components/HeroScene.tsx
git commit -m "Migrate homepage layout to Tailwind"
```

## Task 4: Migrate Services Layout and Orbit Scene

**Files:**
- Modify: `app/components/ServicesPage.tsx`
- Modify: `app/components/ServiceOrbitScene.tsx`

- [ ] **Step 1: Update `ServicesPage.tsx` shell and hero**

Use:

```tsx
<main className="min-h-svh overflow-x-clip" lang={language}>
<section
  className="grid min-h-[calc(100svh-73px)] items-center gap-[42px] px-10 pb-20 pt-[72px] [grid-template-columns:minmax(0,1fr)_minmax(320px,0.92fr)] max-[960px]:grid-cols-1 max-[960px]:px-5 max-[960px]:pb-[66px] max-[960px]:pt-[54px]"
  id="top"
>
```

Use the same eyebrow, h1, and muted paragraph classes from Task 3. Replace CTA classes with:

```tsx
<div className="mt-[26px] flex flex-wrap gap-2.5">
  <a className="inline-flex min-h-11 items-center rounded-lg border border-[var(--foreground)] bg-[var(--foreground)] px-[18px] font-extrabold text-white hover:border-[var(--accent-strong)] hover:bg-[var(--accent-strong)] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]" href="#contact" onClick={handleHashLinkClick}>
    {copy.hero.cta}
  </a>
  <a className="inline-flex min-h-11 items-center rounded-lg border border-[var(--line)] px-[18px] font-extrabold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[rgba(20,122,112,0.32)]" href="/#work">
    {copy.hero.secondaryCta}
  </a>
```

Keep `handleHashLinkClick` behavior unchanged.

- [ ] **Step 2: Update services sections**

Standard service card grids should use:

```tsx
<section className="px-10 py-[86px] max-[960px]:px-5 max-[960px]:py-[66px]" id="pillars">
  <SectionHeader
    eyebrow={copy.pillars.eyebrow}
    title={copy.pillars.title}
    body={copy.pillars.body}
  />
  <div className="grid gap-4 min-[961px]:grid-cols-3">
```

Band sections should add `bg-[#eef4ef]`.

Process section list should use:

```tsx
<ol className="grid list-none gap-3.5 p-0">
  <li className="grid grid-cols-[auto_1fr] items-start gap-[18px] rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5">
    <span className="text-[0.78rem] font-extrabold text-[var(--accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
    <div>
      <h3 className="mb-2.5 text-[1.08rem] font-extrabold leading-[1.25] tracking-[0]">{step.title}</h3>
      <p className="leading-[1.65] text-[var(--muted)]">{step.body}</p>
```

Fit section should use:

```tsx
<section className="grid gap-[34px] bg-[#eef4ef] px-10 py-[86px] [grid-template-columns:minmax(0,0.82fr)_minmax(320px,1fr)] max-[960px]:grid-cols-1 max-[960px]:px-5 max-[960px]:py-[66px]" id="fit">
<ul className="grid list-none gap-3 p-0">
  <li className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-[18px] py-4 leading-[1.65] text-[var(--muted)]">
```

Use the same contact footer classes from Task 3.

- [ ] **Step 3: Update `ServiceOrbitScene.tsx` canvas and label styling**

After creating the renderer, add:

```ts
renderer.domElement.className = "block h-full w-full";
```

Add label position classes near `orbitNodes`:

```ts
const labelPositions = [
  "left-[8%] top-[18%]",
  "right-[8%] top-[38%]",
  "bottom-[18%] left-[32%]",
];

const labelClass =
  "absolute rounded-full border border-[rgba(20,122,112,0.18)] bg-white/80 px-[11px] py-2 text-[0.82rem] font-extrabold text-[var(--accent-strong)]";
```

Change the outer wrapper and label rendering to:

```tsx
<div
  className="relative isolate min-h-[460px] before:absolute before:inset-[9%_4%] before:-z-10 before:rounded-lg before:border before:border-[rgba(20,122,112,0.14)] before:bg-[linear-gradient(145deg,rgba(20,122,112,0.12),rgba(242,184,75,0.12)),repeating-linear-gradient(0deg,rgba(23,32,27,0.08)_0_1px,transparent_1px_30px)] before:content-[''] max-[520px]:min-h-80"
  ref={mountRef}
  role="img"
  aria-label={ariaLabel}
>
  {!showFallback ? (
    <div className="pointer-events-none absolute inset-[14%_8%]" aria-hidden="true">
      {orbitNodes.map((node, index) => (
        <span className={`${labelClass} ${labelPositions[index]}`} key={node.color}>
          {labels[index]}
        </span>
      ))}
    </div>
  ) : null}
  {showFallback ? (
    <div className="flex min-h-[460px] items-center justify-center gap-3 max-[520px]:min-h-80" aria-hidden="true">
      {orbitNodes.map((node, index) => (
        <span className="rounded-full border border-[rgba(20,122,112,0.18)] bg-white/80 px-[11px] py-2 text-[0.82rem] font-extrabold text-[var(--accent-strong)]" key={node.color}>
          {labels[index]}
        </span>
      ))}
    </div>
  ) : null}
</div>
```

Keep reduced-motion render behavior unchanged.

- [ ] **Step 4: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: PASS.

- [ ] **Step 5: Commit services migration**

Run:

```bash
git add app/components/ServicesPage.tsx app/components/ServiceOrbitScene.tsx
git commit -m "Migrate services page to Tailwind"
```

## Task 5: Trim Global CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with foundation-only CSS**

Replace the file with:

```css
@import "tailwindcss";

:root {
  --background: #f7f8f3;
  --foreground: #17201b;
  --muted: #5c695f;
  --line: #d8e1d9;
  --panel: #ffffff;
  --panel-soft: #edf4ef;
  --accent: #147a70;
  --accent-strong: #0f5f59;
  --accent-cool: #38bdf8;
  --accent-warm: #f2b84b;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: Arial, Helvetica, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

* {
  box-sizing: border-box;
}

html {
  scroll-padding-top: 88px;
  scroll-behavior: smooth;
}

html,
body {
  min-height: 100%;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Run the migration guard and verify it passes**

Run the same source guard from Task 1:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node -e 'const fs=require("fs"); const css=fs.readFileSync("app/globals.css","utf8"); const files=fs.readdirSync("app/components").filter((file)=>file.endsWith(".tsx")); const oldClasses=["portfolio-shell","site-nav","language-toggle","hero-section","content-section","service-card","project-card","contact-links","hero-scene","service-orbit-scene","process-list","fit-list"]; const jsxHits=[]; for(const file of files){ const text=fs.readFileSync(`app/components/${file}`,"utf8"); for(const cls of oldClasses){ if(text.includes(`"${cls}`)||text.includes(` ${cls}`)||text.includes(`${cls} `)) jsxHits.push(`${file}:${cls}`); } } const cssTooLarge=css.split("\\n").length>140; if(jsxHits.length||cssTooLarge){ console.error(JSON.stringify({jsxHits, cssLines: css.split("\\n").length}, null, 2)); process.exit(1); }'
```

Expected: PASS with no output.

- [ ] **Step 3: Run lint and build**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
```

Expected: both commands exit `0`. Existing Vinext/Vite warnings are acceptable if unchanged.

- [ ] **Step 4: Commit global CSS cleanup**

Run:

```bash
git add app/globals.css
git commit -m "Trim global CSS after Tailwind migration"
```

## Task 6: Browser QA and Final Fixes

**Files:**
- Modify only files touched above if QA finds regressions.

- [ ] **Step 1: Start or reuse the local dev server**

If no server is running, start one:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run dev
```

Expected: Vinext dev server starts and prints a localhost URL. If an existing server is already running for this repo, reuse it.

- [ ] **Step 2: QA `/` at desktop and mobile**

In the in-app browser, verify:

- `/` loads without an error overlay.
- hero, 3D scene, expertise cards, services teaser, work cards, about, and contact render.
- desktop width around `1280x720` has no horizontal overflow.
- mobile width around `390x844` has no horizontal overflow.
- mobile nav keeps mark and language toggle in row 1 and links in row 2.
- language toggle switches visible copy.

- [ ] **Step 3: QA `/services` at desktop and mobile**

In the in-app browser, verify:

- `/services` loads without an error overlay.
- services hero, orbit visual, pillars, packages, process, fit checklist, and contact render.
- desktop width around `1280x720` has no horizontal overflow.
- mobile width around `390x844` has no horizontal overflow.
- language toggle switches visible copy and orbit labels.
- primary CTA updates URL to `/services#contact` and scrolls contact into view.

- [ ] **Step 4: Check fresh browser logs**

After a clean reload of each page, inspect console/dev logs.

Expected: no fresh `error`, `warning`, or `warn` entries caused by the migration. Existing dev-only informational messages, such as Vite connection logs or React DevTools suggestions, are acceptable.

- [ ] **Step 5: Fix QA regressions one at a time**

For each regression:

1. Reproduce the issue in browser or with a source check.
2. Patch the smallest affected component.
3. Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

4. Re-check the failing browser case.

- [ ] **Step 6: Run final verification**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
git status --short
```

Expected: lint/build pass and `git status --short` is empty after the final commit.

- [ ] **Step 7: Commit QA fixes if any files changed**

Run:

```bash
git add app/components app/globals.css
git commit -m "Polish Tailwind migration QA"
```

Skip this commit only if Task 6 makes no file changes.

## Self-Review Notes

- Spec coverage: the plan migrates all app-facing components named in the spec, keeps Tailwind v4 setup, preserves routes/data, trims global CSS, and includes required lint/build/browser verification.
- Placeholder scan: no incomplete markers or open-ended deferred-work steps are present.
- Type consistency: no content model or route signatures are changed. `ContactLinks` keeps its existing `variant` prop. `ServiceOrbitScene` keeps `ariaLabel` and `labels`.
