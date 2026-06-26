# Services Page Split Design

## Goal

Split the current single-page portfolio into two focused pages:

- `/`: a portfolio homepage for software engineering positioning.
- `/services`: a dedicated service landing page for freelance/project work.

The site should keep a professional, modern style, preserve the existing bilingual `EN/VI` experience, and make the service offering clearer for web app, mobile app, and AI tooling projects.

## Decisions Confirmed

- Direction: dedicated service landing page.
- Positioning: hybrid personal/studio. The site is still owned by Tai Pham, but the service page should feel polished enough for client project evaluation.
- Primary CTA: `Discuss your idea`.
- Service structure: hybrid. Lead with three service pillars, then explain engagement packages and process.
- Visual direction: service hero with a 3D orbit motif for `Web App`, `Mobile App`, and `AI Tooling`.
- Language: full English and Vietnamese copy for both pages.

## Routes and Navigation

`app/page.tsx` remains the homepage route and renders `PortfolioPage`.

Add `app/services/page.tsx` for the service landing page. Navigation should be shared across both routes and include `Home`, `Services`, `Work`, `Contact`, plus the language toggle. Links to `Work` and `Contact` should point to homepage anchors when the visitor is on `/services`.

The homepage should reduce the current services section into a teaser that links to `/services`, keeping the portfolio narrative clear.

## Homepage Content

The homepage keeps the current portfolio structure:

- Hero with personal software engineer positioning, contact links, and existing 3D scene.
- Expertise cards for full-stack delivery, AI tooling, and cloud-ready systems.
- Short services teaser with a link to `/services`.
- Selected work cards.
- About and contact sections.

## Services Page Content

The services page should include:

- Hero: a strong headline about building web apps, mobile apps, and AI tools that are ready to ship.
- Primary CTA: `Discuss your idea`, leading to the existing contact links with email as the primary action.
- `ServiceOrbitScene`: animated/3D visual with three orbiting service nodes.
- Service pillars: `Web App Development`, `Mobile App Development`, `AI Tooling & Automation`.
- Engagement packages: `MVP/Product Build`, `Modernization Sprint`, `AI Workflow Integration`.
- Process: `Discover -> Design -> Build -> Launch`.
- Fit checklist: clear signals for when a visitor should reach out.
- Final CTA and contact links.

## Components and Data

Create shared navigation so both pages do not duplicate header markup. Keep the existing language state model: each page owns its local `language` state and renders copy from typed content objects.

Reuse current components where practical:

- `LanguageToggle`
- `ContactLinks`
- `SectionHeader`
- `ServiceCard`
- `ProjectCard`
- `HeroScene`

Add only the components needed for the split:

- `SiteNav`
- `ServicesPage`
- `ServiceOrbitScene`

Content can stay in `app/content/portfolio.ts` if it remains readable. If the file becomes too large, split service copy into a nearby content module.

## Styling and Animation

Keep the existing brand palette and global CSS foundation so both pages feel related. Make `/services` more landing-page oriented through stronger hero hierarchy, clearer CTA treatment, service-card contrast, and generous spacing.

`ServiceOrbitScene` should be responsive, lightweight, and non-blocking. It should render clearly on desktop and mobile, with a fallback state if canvas/WebGL is unavailable. Animation should support the page rather than competing with the content.

## Verification

Before implementation is considered complete:

- Run `npm run lint`.
- Run `npm run build`.
- Verify `/` and `/services` locally in the browser.
- Check that each page is not blank, has no framework error overlay, has no relevant console errors, and that nav/CTA links work.
- Check desktop and mobile-sized viewports for text overlap, clipped content, broken canvas rendering, and unreadable controls.
