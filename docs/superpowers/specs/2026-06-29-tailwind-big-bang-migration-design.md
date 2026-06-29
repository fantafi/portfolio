# Tailwind Big-Bang Migration Design

## Goal

Migrate the portfolio and services site from semantic global CSS classes to Tailwind utility classes in JSX. The migration should keep the current visual design, routes, bilingual behavior, responsive layout, and 3D scenes intact while making future styling changes happen primarily inside components.

## Decisions Confirmed

- Approach: big-bang migration.
- Tailwind setup: reuse the existing Tailwind v4 setup already present in `package.json`, `postcss.config.mjs`, and `app/globals.css`.
- Visual target: preserve the current UI as closely as possible before making any new redesign choices.
- Scope: migrate all app-facing components in one pass, then verify both pages through lint, build, and browser QA.

## Styling Architecture

Most layout, spacing, typography, color, border, and responsive behavior should move into `className` utilities in component JSX. Tailwind arbitrary values may be used for project-specific colors, shadows, grid tracks, and gradients when they avoid introducing extra configuration.

`app/globals.css` should remain small and focused on foundation styles:

- `@import "tailwindcss";`
- CSS variables for shared colors and theme values.
- base `html`, `body`, `button`, and `a` rules.
- global scroll and reduced-motion behavior.
- narrow selectors that are awkward or impossible to express safely in JSX, such as canvas sizing and fallback state selectors for the 3D scenes.

The migration should not add new runtime dependencies or introduce a separate Tailwind config unless a concrete need appears during implementation.

## Component Scope

Migrate these components to Tailwind-first markup:

- `app/components/SiteNav.tsx`
- `app/components/LanguageToggle.tsx`
- `app/components/PortfolioPage.tsx`
- `app/components/ServicesPage.tsx`
- `app/components/SectionHeader.tsx`
- `app/components/ServiceCard.tsx`
- `app/components/ProjectCard.tsx`
- `app/components/ContactLinks.tsx`
- `app/components/HeroScene.tsx`
- `app/components/ServiceOrbitScene.tsx`

The page structure and data model in `app/content/portfolio.ts` should stay unchanged. The route files `app/page.tsx` and `app/services/page.tsx` should not need behavioral changes.

## Interaction and Responsiveness

The shared navigation must keep deterministic mobile placement: mark and language toggle on the first row, links on the second row. `/services` hash scrolling must continue to bring the contact section into view. The language toggle must still switch all visible copy, including service orbit labels.

Both 3D scenes must remain responsive and support fallback behavior. Reduced-motion users should not get continuous animation loops where the current implementation intentionally avoids them.

## Migration Strategy

Perform the migration in one implementation branch, but keep edits organized by component. Replace semantic class usage with Tailwind classes, then remove unused global CSS rules. If a rule cannot be expressed cleanly in JSX without harming readability or correctness, leave it in `globals.css` and document why in the implementation notes.

Because this is a big-bang change, verification should happen after the full migration and after any cleanup pass.

## Verification

Required checks before completion:

- Run `node --run lint`.
- Run `node --run build`.
- Verify `/` and `/services` in the browser.
- Check desktop and mobile viewports for overflow, overlap, clipped text, broken nav layout, and blank or mis-sized 3D canvases.
- Confirm language toggle behavior on both pages.
- Confirm `/services` primary CTA hash scroll still works.
- Confirm there are no fresh browser error or warning logs after a clean reload.
