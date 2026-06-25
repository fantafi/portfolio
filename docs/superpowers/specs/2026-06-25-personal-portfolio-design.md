# Personal Portfolio Website Design

## Goal

Build a professional one-page bilingual portfolio website for a Software Engineer who also accepts freelance and project work. The site should balance hiring credibility with service clarity: recruiters can quickly understand engineering fit, while clients can see what project outcomes are available.

## Audience And Positioning

The primary audience is split between hiring teams and freelance/project clients. The site will default to English and include a Vietnamese language toggle. The positioning is: full-stack software engineer with a strong focus on AI tooling, product delivery, and reliable web systems.

## Visual Direction

Use a clean product portfolio style: light off-white or soft green background, dark charcoal text, restrained teal/cyan accents, crisp spacing, and small-radius cards. The design should feel modern, calm, and trustworthy rather than decorative or marketing-heavy. Typography should support fast scanning and clear hierarchy.

## Page Structure

The page will use a single-scroll structure:

1. Hero with headline, short value statement, and direct links for Email, GitHub, and LinkedIn.
2. Expertise section covering full-stack product delivery, AI tooling/automation, and cloud-ready systems.
3. Services section for freelance/project offerings such as MVP builds, internal tools, modernization, and AI workflow integration.
4. Work placeholders with three polished project cards ready for future real case studies.
5. About section with a concise personal intro, work principles, and tech stack.
6. Contact section with minimal direct links only.

## Interaction And Motion

Replace the current lotus-focused homepage with a portfolio experience. The hero should include a lightweight Three.js abstract scene, such as connected nodes, system panels, or code/product surfaces. Motion should be slow and professional, with subtle pointer responsiveness. Scroll animation should be limited to lightweight fade or slide transitions. For reduced motion, mobile constraints, or missing WebGL support, provide a static fallback so the hero never appears blank.

## Architecture

Keep the existing Vinext/Next TypeScript app. `app/page.tsx` should render a portfolio page composed from smaller components in `app/components/`, such as `PortfolioPage`, `HeroScene`, `LanguageToggle`, `SectionHeader`, `ServiceCard`, `ProjectCard`, and `ContactLinks`.

Place bilingual copy in a dedicated module such as `app/content/portfolio.ts`. Language state should live in `PortfolioPage`, select the active copy object, and pass content down to sections. No backend, database, API route, contact form, calendar, D1, or Drizzle changes are needed for the first version.

## Content Rules

Use polished placeholder project content, clearly written as representative work areas rather than fake client claims. Avoid unverifiable metrics or company names. CTA labels should stay direct and minimal: Email, GitHub, and LinkedIn. If real contact URLs are not available during implementation, use clearly replaceable placeholder URLs.

## Verification

Before completion, run:

- `npm run lint`
- `npm run build`

Also verify the page in a browser at desktop and mobile widths. Confirm that the 3D hero renders or falls back cleanly, text does not overlap, language switching updates visible copy, reduced-motion behavior is acceptable, and all contact links are valid placeholders or real URLs.
