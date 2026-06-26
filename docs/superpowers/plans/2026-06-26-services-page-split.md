# Services Page Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the current portfolio into a focused homepage and a dedicated `/services` landing page for web app, mobile app, and AI tooling services.

**Architecture:** Keep the existing Vinext/Next app-router structure and local per-page language state. Extract the shared navigation into a reusable client component, add typed bilingual services content, and create a new services route with a lightweight Three.js orbit scene. Reuse the existing card, contact, section, and language components wherever practical.

**Tech Stack:** Vinext/Next app router, React 19, TypeScript, Three.js, global CSS, existing lint and build scripts run through the bundled Node runtime.

---

## File Structure

- Modify: `app/content/portfolio.ts`
  - Keep shared types and current portfolio copy.
  - Add navigation href support for cross-route links.
  - Add typed bilingual services landing copy.
- Create: `app/components/SiteNav.tsx`
  - Shared sticky nav for `/` and `/services`.
  - Owns no language state; receives copy and callbacks.
- Modify: `app/components/PortfolioPage.tsx`
  - Use `SiteNav`.
  - Replace the full services grid with a compact services teaser that links to `/services`.
- Create: `app/components/ServicesPage.tsx`
  - Client page component with local language state and full services landing layout.
- Create: `app/components/ServiceOrbitScene.tsx`
  - Three.js animated orbit visual with responsive fallback.
- Create: `app/services/page.tsx`
  - Route entry point for `/services`.
- Modify: `app/globals.css`
  - Add shared nav state styles, homepage teaser styles, services landing sections, service orbit, process, checklist, and responsive adjustments.

## Task 1: Extend Typed Content for Shared Nav and Services

**Files:**
- Modify: `app/content/portfolio.ts`

- [ ] **Step 1: Inspect existing content types**

Run:

```bash
sed -n '1,120p' app/content/portfolio.ts
```

Expected: `Language`, `ContactLink`, `Service`, `Project`, and `PortfolioCopy` are defined, and `PortfolioCopy.nav.links` uses `{ label: string; href: string }`.

- [ ] **Step 2: Add reusable nav and services landing types**

In `app/content/portfolio.ts`, add these types near the existing type declarations:

```ts
export type NavLink = {
  label: string;
  href: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ServicesPageCopy = {
  nav: {
    name: string;
    links: NavLink[];
  };
  languageToggle: Record<Language, string>;
  accessibility: {
    primaryNavigation: string;
    languageSelector: string;
    serviceTagsLabel: string;
    orbitLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    secondaryCta: string;
  };
  contactLinks: ContactLink[];
  pillars: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  packages: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  process: {
    eyebrow: string;
    title: string;
    body: string;
    steps: ProcessStep[];
  };
  fit: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
  };
};
```

Then update `PortfolioCopy.nav.links` to use `NavLink[]`:

```ts
nav: {
  name: string;
  links: NavLink[];
};
```

- [ ] **Step 3: Update homepage nav links**

For English homepage copy, replace the current `nav.links` with:

```ts
links: [
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
],
```

For Vietnamese homepage copy, replace the current `nav.links` with:

```ts
links: [
  { label: "Năng lực", href: "#expertise" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Dự án", href: "#work" },
  { label: "Liên hệ", href: "#contact" },
],
```

- [ ] **Step 4: Add services page content**

At the end of `app/content/portfolio.ts`, after the existing `export const portfolioContent: Record<Language, PortfolioCopy> = { ... };` declaration, add:

```ts
export const servicesPageContent: Record<Language, ServicesPageCopy> = {
  en: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Work", href: "/#work" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Primary navigation",
      languageSelector: "Language selector",
      serviceTagsLabel: "Tags for",
      orbitLabel: "Service orbit showing web app, mobile app, and AI tooling",
    },
    hero: {
      eyebrow: "Freelance product development",
      title: "Build web apps, mobile apps, and AI tools that are ready to ship.",
      body: "I partner with founders and teams to turn clear ideas into usable products, practical automation, and maintainable software systems.",
      cta: "Discuss your idea",
      secondaryCta: "View portfolio",
    },
    contactLinks,
    pillars: {
      eyebrow: "Services",
      title: "Three ways I help teams move faster.",
      body: "Each engagement is scoped around a concrete outcome, a maintainable codebase, and a clean handoff.",
      items: [
        {
          title: "Web app development",
          body: "Design and build responsive web apps, dashboards, portals, and internal tools with reliable frontend and API foundations.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "Mobile app development",
          body: "Create mobile-first product experiences, companion apps, and cross-platform flows that feel focused and practical.",
          tags: ["Mobile UX", "Product flows", "Launch support"],
        },
        {
          title: "AI tooling and automation",
          body: "Add AI-assisted workflows, internal assistants, and review loops that reduce repetitive work without hiding control.",
          tags: ["AI workflows", "Automation", "Human review"],
        },
      ],
    },
    packages: {
      eyebrow: "Engagement models",
      title: "Focused packages for common project needs.",
      body: "Choose a shape that matches where your product is today.",
      items: [
        {
          title: "MVP / Product build",
          body: "Take a validated concept from scope to a polished first release with UI, product structure, and deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Modernization sprint",
          body: "Improve brittle screens, refactor risky frontend areas, and make the app easier to extend safely.",
          tags: ["UX cleanup", "Refactor", "Performance"],
        },
        {
          title: "AI workflow integration",
          body: "Introduce AI into support, operations, dashboards, or knowledge workflows with clear review boundaries.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "A clear path from idea to shipped product.",
      body: "The process stays lightweight, but every phase has a concrete output.",
      steps: [
        {
          title: "Discover",
          body: "Clarify the goal, users, constraints, success signals, and the smallest useful release.",
        },
        {
          title: "Design",
          body: "Shape the core flows, information architecture, data boundaries, and implementation plan.",
        },
        {
          title: "Build",
          body: "Implement the product in focused iterations with regular checkpoints and working previews.",
        },
        {
          title: "Launch",
          body: "Prepare deployment, polish the handoff, and leave the codebase ready for the next iteration.",
        },
      ],
    },
    fit: {
      eyebrow: "Good fit",
      title: "Reach out when the project needs senior execution without heavy process.",
      body: "The best projects have a clear business goal, an owner who can give feedback, and room to make pragmatic product decisions.",
      items: [
        "You need a web app, mobile app, or AI workflow built from a defined idea.",
        "You have an existing product that needs modernization or clearer UX.",
        "You want AI automation that still keeps human review and operational clarity.",
        "You value maintainable code and a clean handoff as much as the first launch.",
      ],
    },
    contact: {
      eyebrow: "Start",
      title: "Have an idea worth turning into a real product?",
      body: "Send a short note about the goal, timeline, and current state. I will help shape the next practical step.",
    },
  },
  vi: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ", href: "/services" },
        { label: "Dự án", href: "/#work" },
        { label: "Liên hệ", href: "/#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Điều hướng chính",
      languageSelector: "Chọn ngôn ngữ",
      serviceTagsLabel: "Nhãn cho",
      orbitLabel: "Mô hình orbit cho web app, mobile app và AI tooling",
    },
    hero: {
      eyebrow: "Freelance product development",
      title: "Xây dựng web app, mobile app và AI tool sẵn sàng triển khai.",
      body: "Tôi đồng hành với founder và team để biến ý tưởng rõ ràng thành sản phẩm dùng được, automation thực tế và hệ thống phần mềm dễ bảo trì.",
      cta: "Trao đổi ý tưởng",
      secondaryCta: "Xem portfolio",
    },
    contactLinks,
    pillars: {
      eyebrow: "Dịch vụ",
      title: "Ba cách tôi giúp team đi nhanh hơn.",
      body: "Mỗi engagement được scope quanh một outcome rõ, codebase dễ bảo trì và bàn giao gọn.",
      items: [
        {
          title: "Phát triển web app",
          body: "Thiết kế và xây dựng web app, dashboard, portal và internal tool với frontend và API foundation ổn định.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "Phát triển mobile app",
          body: "Tạo trải nghiệm mobile-first, companion app và flow cross-platform tập trung vào tính thực dụng.",
          tags: ["Mobile UX", "Product flows", "Launch support"],
        },
        {
          title: "AI tooling và automation",
          body: "Thêm workflow AI-assisted, internal assistant và review loop để giảm việc lặp lại mà vẫn giữ quyền kiểm soát.",
          tags: ["AI workflows", "Automation", "Human review"],
        },
      ],
    },
    packages: {
      eyebrow: "Mô hình hợp tác",
      title: "Các gói tập trung cho nhu cầu project phổ biến.",
      body: "Chọn hình thức phù hợp với trạng thái hiện tại của sản phẩm.",
      items: [
        {
          title: "MVP / Product build",
          body: "Đưa concept đã rõ scope thành bản release đầu tiên với UI, cấu trúc sản phẩm và deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Modernization sprint",
          body: "Cải thiện màn hình cũ, refactor vùng frontend rủi ro và giúp app dễ mở rộng an toàn hơn.",
          tags: ["UX cleanup", "Refactor", "Performance"],
        },
        {
          title: "Tích hợp workflow AI",
          body: "Đưa AI vào support, operations, dashboard hoặc knowledge workflow với ranh giới review rõ ràng.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
      ],
    },
    process: {
      eyebrow: "Quy trình",
      title: "Đường đi rõ từ ý tưởng tới sản phẩm chạy thật.",
      body: "Quy trình gọn nhẹ, nhưng mỗi giai đoạn đều có đầu ra cụ thể.",
      steps: [
        {
          title: "Discover",
          body: "Làm rõ mục tiêu, người dùng, ràng buộc, tín hiệu thành công và bản release nhỏ nhất có giá trị.",
        },
        {
          title: "Design",
          body: "Định hình flow chính, kiến trúc thông tin, ranh giới dữ liệu và kế hoạch triển khai.",
        },
        {
          title: "Build",
          body: "Xây dựng theo các vòng lặp tập trung, có checkpoint đều và bản preview chạy được.",
        },
        {
          title: "Launch",
          body: "Chuẩn bị deployment, hoàn thiện bàn giao và để lại codebase sẵn sàng cho vòng tiếp theo.",
        },
      ],
    },
    fit: {
      eyebrow: "Phù hợp",
      title: "Liên hệ khi project cần senior execution nhưng không muốn quy trình nặng.",
      body: "Project phù hợp nhất khi có mục tiêu kinh doanh rõ, người phụ trách feedback và không gian cho quyết định sản phẩm thực dụng.",
      items: [
        "Bạn cần xây web app, mobile app hoặc AI workflow từ một ý tưởng đã rõ.",
        "Bạn có sản phẩm hiện tại cần modernization hoặc UX rõ ràng hơn.",
        "Bạn muốn AI automation nhưng vẫn giữ review của con người và vận hành minh bạch.",
        "Bạn coi trọng code dễ bảo trì và bàn giao gọn ngang với bản launch đầu tiên.",
      ],
    },
    contact: {
      eyebrow: "Bắt đầu",
      title: "Bạn có ý tưởng đáng để biến thành sản phẩm thật?",
      body: "Gửi vài dòng về mục tiêu, timeline và trạng thái hiện tại. Tôi sẽ giúp xác định bước thực tế tiếp theo.",
    },
  },
};
```

- [ ] **Step 5: Run type-aware build check later**

Do not run the build command yet unless this task is implemented. The first build check happens after the page component imports this content in Task 4.

## Task 2: Create Shared SiteNav Component

**Files:**
- Create: `app/components/SiteNav.tsx`
- Modify later: `app/components/PortfolioPage.tsx`
- Modify later: `app/components/ServicesPage.tsx`

- [ ] **Step 1: Create `SiteNav.tsx`**

Add:

```tsx
import type { Language, NavLink } from "../content/portfolio";
import LanguageToggle from "./LanguageToggle";

type SiteNavProps = {
  ariaLabel: string;
  language: Language;
  languageLabels: Record<Language, string>;
  languageSelectorLabel: string;
  links: NavLink[];
  name: string;
  onLanguageChange: (language: Language) => void;
};

export default function SiteNav({
  ariaLabel,
  language,
  languageLabels,
  languageSelectorLabel,
  links,
  name,
  onLanguageChange,
}: SiteNavProps) {
  return (
    <header className="site-nav">
      <a className="site-mark" href="/" aria-label={name}>
        {name}
      </a>
      <nav aria-label={ariaLabel}>
        {links.map((link) => (
          <a href={link.href} key={`${link.label}-${link.href}`}>
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
  );
}
```

- [ ] **Step 2: Run lint for the new component**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: ESLint completes with no new errors. Existing warnings are acceptable only if they were already present before this task.

- [ ] **Step 3: Commit**

Run:

```bash
git add app/components/SiteNav.tsx
git commit -m "Add shared site navigation"
```

Expected: one commit containing only `SiteNav.tsx`.

## Task 3: Update Homepage to Use Shared Nav and Services Teaser

**Files:**
- Modify: `app/components/PortfolioPage.tsx`
- Modify: `app/content/portfolio.ts`

- [ ] **Step 1: Update imports in `PortfolioPage.tsx`**

Replace the `LanguageToggle` import with `SiteNav`:

```tsx
import SiteNav from "./SiteNav";
```

Remove:

```tsx
import LanguageToggle from "./LanguageToggle";
```

- [ ] **Step 2: Replace inline header markup**

Replace the current `<header className="site-nav">...</header>` block with:

```tsx
<SiteNav
  ariaLabel={copy.accessibility.primaryNavigation}
  language={language}
  languageLabels={copy.languageToggle}
  languageSelectorLabel={copy.accessibility.languageSelector}
  links={copy.nav.links}
  name={copy.nav.name}
  onLanguageChange={setLanguage}
/>
```

- [ ] **Step 3: Add teaser labels to `PortfolioCopy.services`**

In `PortfolioCopy`, extend `services`:

```ts
services: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  items: Service[];
};
```

In English `services`, add:

```ts
cta: "Explore services",
```

In Vietnamese `services`, add:

```ts
cta: "Xem dịch vụ",
```

- [ ] **Step 4: Replace homepage services grid with teaser**

In `PortfolioPage.tsx`, replace the services section with:

```tsx
<section className="content-section section-band services-teaser" id="services">
  <SectionHeader
    eyebrow={copy.services.eyebrow}
    title={copy.services.title}
    body={copy.services.body}
  />
  <a className="text-link" href="/services">
    {copy.services.cta}
  </a>
</section>
```

- [ ] **Step 5: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: no TypeScript-aware ESLint errors for `PortfolioPage.tsx` or `portfolio.ts`.

- [ ] **Step 6: Commit**

Run:

```bash
git add app/components/PortfolioPage.tsx app/content/portfolio.ts
git commit -m "Refine homepage services teaser"
```

Expected: one commit containing the homepage teaser and content typing change.

## Task 4: Create Services Page Layout

**Files:**
- Create: `app/components/ServicesPage.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create `ServicesPage.tsx`**

Add:

```tsx
"use client";

import { useState } from "react";
import { servicesPageContent, type Language } from "../content/portfolio";
import ContactLinks from "./ContactLinks";
import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";
import ServiceOrbitScene from "./ServiceOrbitScene";
import SiteNav from "./SiteNav";

export default function ServicesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = servicesPageContent[language];

  return (
    <main className="portfolio-shell services-shell" lang={language}>
      <SiteNav
        ariaLabel={copy.accessibility.primaryNavigation}
        language={language}
        languageLabels={copy.languageToggle}
        languageSelectorLabel={copy.accessibility.languageSelector}
        links={copy.nav.links}
        name={copy.nav.name}
        onLanguageChange={setLanguage}
      />

      <section className="services-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="hero-lede">{copy.hero.body}</p>
          <div className="services-hero-actions">
            <a className="primary-action" href="#contact">
              {copy.hero.cta}
            </a>
            <a className="secondary-action" href="/#work">
              {copy.hero.secondaryCta}
            </a>
          </div>
        </div>
        <ServiceOrbitScene ariaLabel={copy.accessibility.orbitLabel} />
      </section>

      <section className="content-section" id="pillars">
        <SectionHeader {...copy.pillars} />
        <div className="card-grid three-columns">
          {copy.pillars.items.map((item, index) => (
            <ServiceCard
              item={item}
              index={index}
              key={item.title}
              tagListLabel={copy.accessibility.serviceTagsLabel}
            />
          ))}
        </div>
      </section>

      <section className="content-section section-band" id="packages">
        <SectionHeader {...copy.packages} />
        <div className="card-grid three-columns">
          {copy.packages.items.map((item, index) => (
            <ServiceCard
              item={item}
              index={index}
              key={item.title}
              tagListLabel={copy.accessibility.serviceTagsLabel}
            />
          ))}
        </div>
      </section>

      <section className="content-section process-section" id="process">
        <SectionHeader {...copy.process} />
        <ol className="process-list">
          {copy.process.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section fit-section section-band" id="fit">
        <div>
          <p className="eyebrow">{copy.fit.eyebrow}</p>
          <h2>{copy.fit.title}</h2>
          <p>{copy.fit.body}</p>
        </div>
        <ul className="fit-list">
          {copy.fit.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <footer className="content-section contact-section" id="contact">
        <p className="eyebrow">{copy.contact.eyebrow}</p>
        <h2>{copy.contact.title}</h2>
        <p>{copy.contact.body}</p>
        <ContactLinks links={copy.contactLinks} variant="footer" />
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Create route entry**

Create `app/services/page.tsx`:

```tsx
import ServicesPage from "../components/ServicesPage";

export default function Services() {
  return <ServicesPage />;
}
```

- [ ] **Step 3: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: if `ServiceOrbitScene` does not exist yet, the import error is expected. Do not commit until Task 5 creates `ServiceOrbitScene`.

## Task 5: Add ServiceOrbitScene

**Files:**
- Create: `app/components/ServiceOrbitScene.tsx`

- [ ] **Step 1: Create `ServiceOrbitScene.tsx`**

Add:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ServiceOrbitSceneProps = {
  ariaLabel: string;
};

const orbitNodes = [
  { label: "Web App", color: 0x147a70, angle: 0 },
  { label: "Mobile App", color: 0x38bdf8, angle: (Math.PI * 2) / 3 },
  { label: "AI Tooling", color: 0xf2b84b, angle: (Math.PI * 4) / 3 },
];

export default function ServiceOrbitScene({ ariaLabel }: ServiceOrbitSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const showFallbackOnNextFrame = () => {
      const fallbackFrameId = window.requestAnimationFrame(() => {
        setShowFallback(true);
      });

      return () => {
        window.cancelAnimationFrame(fallbackFrameId);
      };
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.WebGLRenderingContext) {
      return showFallbackOnNextFrame();
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return showFallbackOnNextFrame();
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    const keyLight = new THREE.DirectionalLight(0xe4fff8, 2.2);
    keyLight.position.set(3, 2.4, 4);
    scene.add(ambientLight, keyLight);

    const ringGeometry = new THREE.TorusGeometry(1.72, 0.01, 16, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x9ecdc2,
      opacity: 0.5,
      transparent: true,
    });

    [0, 0.55, -0.55].forEach((rotation) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = 1.15;
      ring.rotation.y = rotation;
      group.add(ring);
    });

    const coreGeometry = new THREE.IcosahedronGeometry(0.34, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x147a70,
      emissiveIntensity: 0.1,
      metalness: 0.08,
      roughness: 0.28,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.18, 2);
    const nodeMeshes = orbitNodes.map((node) => {
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.08,
        metalness: 0.06,
        roughness: 0.34,
      });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      group.add(mesh);
      return { ...node, material, mesh };
    });

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let frameId = 0;
    const render = () => {
      const elapsed = performance.now() * 0.001;
      nodeMeshes.forEach((node, index) => {
        const angle = node.angle + (reducedMotion ? 0 : elapsed * 0.42);
        const radius = 1.72;
        node.mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle + index * 0.45) * 0.38,
          Math.sin(angle) * radius * 0.38,
        );
      });

      if (!reducedMotion) {
        group.rotation.y += 0.003;
        core.rotation.x += 0.006;
        core.rotation.y += 0.004;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMeshes.forEach((node) => node.material.dispose());
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="service-orbit-scene" ref={mountRef} role="img" aria-label={ariaLabel}>
      <div className="service-orbit-labels" aria-hidden="true">
        {orbitNodes.map((node) => (
          <span key={node.label}>{node.label}</span>
        ))}
      </div>
      {showFallback ? (
        <div className="service-orbit-fallback" aria-hidden="true">
          {orbitNodes.map((node) => (
            <span key={node.label}>{node.label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
```

Expected: no missing import for `ServiceOrbitScene`, and no lint errors in the new component.

- [ ] **Step 3: Commit page and orbit files together**

Run:

```bash
git add app/components/ServicesPage.tsx app/components/ServiceOrbitScene.tsx app/services/page.tsx
git commit -m "Add services landing page"
```

Expected: one commit containing the new route, page, and orbit scene.

## Task 6: Add Styling for Services Page and Teaser

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add action link styles after contact link styles**

Add these rules after `.contact-links-hero a:first-child:hover`:

```css
.text-link,
.primary-action,
.secondary-action {
  align-items: center;
  border-radius: 8px;
  display: inline-flex;
  font-weight: 800;
  min-height: 44px;
  padding: 0 18px;
}

.text-link {
  border: 1px solid var(--accent);
  color: var(--accent-strong);
}

.text-link:hover {
  background: var(--foreground);
  border-color: var(--foreground);
  color: #ffffff;
}

.primary-action {
  background: var(--foreground);
  border: 1px solid var(--foreground);
  color: #ffffff;
}

.primary-action:hover {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
}

.secondary-action {
  border: 1px solid var(--line);
  color: var(--foreground);
}

.secondary-action:hover {
  border-color: var(--accent);
  color: var(--accent-strong);
}
```

- [ ] **Step 2: Add services layout styles before `.content-section`**

Add:

```css
.services-hero {
  align-items: center;
  display: grid;
  gap: 42px;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.92fr);
  min-height: calc(100svh - 73px);
  padding: 72px 40px 80px;
}

.services-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.services-teaser .section-header {
  padding-bottom: 18px;
}

.service-orbit-scene {
  isolation: isolate;
  min-height: 460px;
  position: relative;
}

.service-orbit-scene canvas {
  display: block;
  height: 100%;
  width: 100%;
}

.service-orbit-scene::before {
  background:
    linear-gradient(145deg, rgba(20, 122, 112, 0.12), rgba(242, 184, 75, 0.12)),
    repeating-linear-gradient(0deg, rgba(23, 32, 27, 0.08) 0 1px, transparent 1px 30px);
  border: 1px solid rgba(20, 122, 112, 0.14);
  border-radius: 8px;
  content: "";
  inset: 9% 4%;
  position: absolute;
  z-index: -1;
}

.service-orbit-labels {
  inset: 14% 8%;
  pointer-events: none;
  position: absolute;
}

.service-orbit-labels span,
.service-orbit-fallback span {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(20, 122, 112, 0.18);
  border-radius: 999px;
  color: var(--accent-strong);
  font-size: 0.82rem;
  font-weight: 800;
  padding: 8px 11px;
  position: absolute;
}

.service-orbit-labels span:nth-child(1) {
  left: 8%;
  top: 18%;
}

.service-orbit-labels span:nth-child(2) {
  right: 8%;
  top: 38%;
}

.service-orbit-labels span:nth-child(3) {
  bottom: 18%;
  left: 32%;
}

.service-orbit-fallback {
  align-items: center;
  display: flex;
  gap: 12px;
  height: 100%;
  justify-content: center;
  min-height: 460px;
}

.service-orbit-fallback span {
  position: static;
}
```

- [ ] **Step 3: Add process and fit styles near existing card/list styles**

Add after `.project-card li, .about-lists > div:first-child li`:

```css
.process-list,
.fit-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.process-list {
  display: grid;
  gap: 14px;
}

.process-list li {
  align-items: flex-start;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  display: grid;
  gap: 18px;
  grid-template-columns: auto 1fr;
  padding: 20px;
}

.process-list span {
  color: var(--accent-strong);
  font-size: 0.78rem;
  font-weight: 800;
}

.process-list p,
.fit-section p,
.fit-list li {
  color: var(--muted);
  line-height: 1.65;
}

.fit-section {
  display: grid;
  gap: 34px;
  grid-template-columns: minmax(0, 0.82fr) minmax(320px, 1fr);
}

.fit-list {
  display: grid;
  gap: 12px;
}

.fit-list li {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px 18px;
}
```

- [ ] **Step 4: Extend responsive rules**

Inside `@media (max-width: 960px)`, add `.services-hero` and `.fit-section` to the single-column rules:

```css
.hero-section,
.services-hero,
.about-section,
.fit-section {
  grid-template-columns: 1fr;
}
```

Also add:

```css
.services-hero {
  padding: 54px 20px 66px;
}
```

Inside `@media (max-width: 520px)`, update the scene min-height rule to:

```css
.hero-scene,
.hero-scene-fallback,
.service-orbit-scene,
.service-orbit-fallback {
  min-height: 320px;
}
```

- [ ] **Step 5: Run lint and build**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
```

Expected: both commands complete successfully. If build warnings appear but exit code is `0`, record them in the task notes and continue.

- [ ] **Step 6: Commit styles**

Run:

```bash
git add app/globals.css
git commit -m "Style services landing page"
```

Expected: one commit containing only CSS changes.

## Task 7: Browser QA and Final Polish

**Files:**
- Modify only files with verified visual bugs from QA.

- [ ] **Step 1: Start local dev server**

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node_modules/.bin/vinext dev --host 127.0.0.1
```

Expected: Vinext prints a local URL such as `http://localhost:3002/`. Use the exact printed URL.

- [ ] **Step 2: Verify homepage**

Open `/` in the in-app browser. Check:

```text
Page identity: title contains "Tai Pham | Software Engineer"
Not blank: hero headline and portfolio sections render
Nav: Services link navigates to /services
CTA/contact links: visible and clickable
Console: no relevant error or warning entries
```

- [ ] **Step 3: Verify services page**

Open `/services`. Check:

```text
Page identity: URL ends with /services
Not blank: services hero, orbit visual, service pillars, packages, process, fit, and final CTA render
3D/canvas: orbit canvas or fallback is visible
Nav: Home returns to /, Work opens /#work, Contact opens /#contact
Language toggle: EN and VI switch page copy without layout breakage
Console: no relevant error or warning entries
```

- [ ] **Step 4: Verify responsive layout**

Use desktop viewport and one mobile-sized viewport around `390x844`. Check:

```text
No text overlaps nav, cards, CTA buttons, orbit labels, process cards, or footer links.
No horizontal scroll.
Service orbit remains visible and framed.
Buttons wrap cleanly on mobile.
```

- [ ] **Step 5: Apply minimal visual fixes if needed**

If QA finds a concrete issue, patch only the affected file. Example for button wrapping:

```css
@media (max-width: 520px) {
  .services-hero-actions a {
    justify-content: center;
    width: 100%;
  }
}
```

Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
```

Expected: both pass after any fix.

- [ ] **Step 6: Commit QA fixes**

If files changed during QA, run:

```bash
git add app
git commit -m "Polish services page responsive QA"
```

If no files changed, record:

```text
No QA fix commit needed.
```

## Final Verification

- [ ] Run:

```bash
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run lint
PATH=/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/bin:/usr/bin:$PATH node --run build
git status --short
```

Expected:

```text
lint command exits 0
build command exits 0
git status --short is empty unless intentional uncommitted notes remain
```

- [ ] Final response should include:

```text
Summary of the page split
Local preview URL
Verification commands and result
Any remaining known limitations
```
