# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current lotus demo homepage with a professional bilingual one-page portfolio for a full-stack Software Engineer focused on AI tooling and freelance/project services.

**Architecture:** Keep the existing Vinext/Next TypeScript app. Put bilingual content in a typed data module, compose the page from focused React components, and use a lightweight client-only Three.js hero scene with a CSS fallback.

**Tech Stack:** Next/Vinext, React 19, TypeScript strict mode, Tailwind entry CSS with custom global CSS, Three.js, ESLint, Vinext build.

---

## File Structure

- Modify `.gitignore`: ignore `.superpowers/` visual-companion artifacts.
- Create `app/content/portfolio.ts`: typed bilingual copy and replaceable contact URLs.
- Create `app/components/LanguageToggle.tsx`: accessible EN/VI segmented control.
- Create `app/components/SectionHeader.tsx`: reusable section eyebrow/title/description block.
- Create `app/components/ContactLinks.tsx`: direct Email, GitHub, LinkedIn links.
- Create `app/components/ServiceCard.tsx`: service/expertise card.
- Create `app/components/ProjectCard.tsx`: representative work card.
- Create `app/components/HeroScene.tsx`: client-only Three.js abstract system scene and fallback.
- Create `app/components/PortfolioPage.tsx`: page composition and language state.
- Modify `app/page.tsx`: render `PortfolioPage`.
- Modify `app/layout.tsx`: update metadata and default document language.
- Replace `app/globals.css`: remove lotus styles and add portfolio styles.
- Delete `app/components/LotusScene.tsx`: remove unused lotus demo component after the page no longer imports it.

Note: this repository currently has many starter files still untracked. Each commit command below stages only the files touched by that task.

## Task 1: Content Model And Repository Hygiene

**Files:**
- Modify: `.gitignore`
- Create: `app/content/portfolio.ts`

- [ ] **Step 1: Add visual-companion artifacts to git ignore**

Add this line near the miscellaneous section in `.gitignore`:

```gitignore
.superpowers/
```

- [ ] **Step 2: Create typed bilingual content**

Create `app/content/portfolio.ts` with this content:

```ts
export type Language = "en" | "vi";

export type ContactLink = {
  label: string;
  href: string;
  description: string;
};

export type Service = {
  title: string;
  body: string;
  tags: string[];
};

export type Project = {
  title: string;
  category: string;
  body: string;
  outcomes: string[];
};

export type PortfolioCopy = {
  nav: {
    name: string;
    links: Array<{ label: string; href: string }>;
  };
  languageToggle: Record<Language, string>;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    availability: string;
  };
  contactLinks: ContactLink[];
  expertise: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  work: {
    eyebrow: string;
    title: string;
    body: string;
    items: Project[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    principles: string[];
    stack: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "Replace with your primary work email.",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-github",
    description: "Replace with your GitHub profile.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-linkedin",
    description: "Replace with your LinkedIn profile.",
  },
];

export const portfolioContent: Record<Language, PortfolioCopy> = {
  en: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Expertise", href: "#expertise" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Contact", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    hero: {
      eyebrow: "Full-stack Software Engineer / AI Tooling",
      title: "I build reliable products and practical AI workflows.",
      body: "I help teams turn product ideas into stable web apps, internal tools, and automation systems that are clear to maintain and ready to ship.",
      availability: "Available for software engineering roles, freelance builds, and project-based collaboration.",
    },
    contactLinks,
    expertise: {
      eyebrow: "Expertise",
      title: "Engineering range with product judgment.",
      body: "A focused mix of full-stack delivery, AI workflow design, and cloud-aware implementation.",
      items: [
        {
          title: "Full-stack product delivery",
          body: "Design and build web apps from interface to API, with clear state, data, and deployment boundaries.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "AI tooling and automation",
          body: "Create workflows that reduce repetitive work, connect tools, and make AI useful inside real product operations.",
          tags: ["AI workflows", "Automation", "Internal tools"],
        },
        {
          title: "Cloud-ready systems",
          body: "Ship practical systems with a bias for reliability, maintainability, and simple operational handoff.",
          tags: ["Cloudflare", "Databases", "Deployment"],
        },
      ],
    },
    services: {
      eyebrow: "Freelance services",
      title: "Focused project help from idea to launch.",
      body: "Small, well-scoped engagements for teams that need senior execution without unnecessary process.",
      items: [
        {
          title: "MVP web app build",
          body: "Turn a validated idea into a polished first release with product structure, UI, and deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "AI workflow integration",
          body: "Add AI-assisted flows to existing products, dashboards, support processes, or knowledge work.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
        {
          title: "Modernization sprint",
          body: "Refactor brittle UI, improve developer experience, and prepare an app for safer iteration.",
          tags: ["React", "DX", "Performance"],
        },
      ],
    },
    work: {
      eyebrow: "Selected work areas",
      title: "Project cards ready for real case studies.",
      body: "These cards describe representative work areas and can be replaced with named projects when details are available.",
      items: [
        {
          title: "AI operations assistant",
          category: "Automation / AI tooling",
          body: "A workflow concept for summarizing requests, drafting responses, and routing tasks with human review.",
          outcomes: ["Reduced repetitive review", "Clear audit trail", "Human-in-the-loop checks"],
        },
        {
          title: "Client project dashboard",
          category: "Full-stack web app",
          body: "A product dashboard concept for tracking project health, deliverables, and client communication.",
          outcomes: ["Role-based views", "Status clarity", "Reusable component system"],
        },
        {
          title: "Legacy UI modernization",
          category: "Frontend / product quality",
          body: "A modernization concept for improving a dated interface while preserving core product behavior.",
          outcomes: ["Cleaner navigation", "Responsive layouts", "Lower maintenance cost"],
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Calm execution, clear systems, practical AI.",
      body: "I enjoy building software that people can understand, use, and keep improving. My strongest work sits between product thinking, full-stack implementation, and useful automation.",
      principles: ["Keep scope sharp", "Make interfaces obvious", "Prefer maintainable systems", "Use AI where it creates real leverage"],
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cloudflare", "Drizzle", "Postgres", "Three.js", "AI tooling"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Have a role, project, or workflow to discuss?",
      body: "Reach out directly by email or connect through GitHub and LinkedIn.",
    },
  },
  vi: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Năng lực", href: "#expertise" },
        { label: "Dịch vụ", href: "#services" },
        { label: "Dự án", href: "#work" },
        { label: "Liên hệ", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    hero: {
      eyebrow: "Full-stack Software Engineer / AI Tooling",
      title: "Tôi xây dựng sản phẩm ổn định và workflow AI thực dụng.",
      body: "Tôi giúp đội ngũ biến ý tưởng sản phẩm thành web app, internal tool và hệ thống automation rõ ràng, dễ bảo trì, sẵn sàng triển khai.",
      availability: "Sẵn sàng cho vị trí software engineer, freelance build và hợp tác theo project.",
    },
    contactLinks,
    expertise: {
      eyebrow: "Năng lực",
      title: "Kỹ thuật full-stack với tư duy sản phẩm.",
      body: "Tập trung vào delivery full-stack, thiết kế workflow AI và triển khai hệ thống dễ vận hành.",
      items: [
        {
          title: "Full-stack product delivery",
          body: "Thiết kế và xây dựng web app từ giao diện tới API, với ranh giới rõ cho state, data và deployment.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "AI tooling và automation",
          body: "Tạo workflow giảm việc lặp lại, kết nối công cụ và đưa AI vào vận hành sản phẩm một cách hữu ích.",
          tags: ["AI workflows", "Automation", "Internal tools"],
        },
        {
          title: "Hệ thống sẵn sàng triển khai",
          body: "Xây dựng hệ thống thực tế, ưu tiên độ ổn định, khả năng bảo trì và bàn giao đơn giản.",
          tags: ["Cloudflare", "Databases", "Deployment"],
        },
      ],
    },
    services: {
      eyebrow: "Dịch vụ freelance",
      title: "Hỗ trợ project từ ý tưởng tới bản chạy được.",
      body: "Các gói hợp tác gọn, rõ phạm vi, phù hợp với đội ngũ cần tốc độ và chất lượng kỹ thuật.",
      items: [
        {
          title: "Xây dựng MVP web app",
          body: "Biến ý tưởng đã được kiểm chứng thành bản release đầu tiên với UI, cấu trúc sản phẩm và deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Tích hợp workflow AI",
          body: "Thêm luồng AI-assisted vào sản phẩm, dashboard, quy trình hỗ trợ hoặc công việc tri thức.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
        {
          title: "Modernization sprint",
          body: "Cải thiện UI cũ, developer experience và chuẩn bị app để phát triển an toàn hơn.",
          tags: ["React", "DX", "Performance"],
        },
      ],
    },
    work: {
      eyebrow: "Nhóm dự án tiêu biểu",
      title: "Card dự án sẵn sàng để thay bằng case study thật.",
      body: "Các card này mô tả nhóm công việc đại diện và có thể thay bằng dự án cụ thể khi có nội dung.",
      items: [
        {
          title: "AI operations assistant",
          category: "Automation / AI tooling",
          body: "Concept workflow để tóm tắt yêu cầu, soạn phản hồi và điều phối task với bước review của con người.",
          outcomes: ["Giảm việc review lặp lại", "Có dấu vết xử lý rõ", "Kiểm tra bởi con người"],
        },
        {
          title: "Client project dashboard",
          category: "Full-stack web app",
          body: "Concept dashboard theo dõi tình trạng project, deliverable và giao tiếp với khách hàng.",
          outcomes: ["Giao diện theo vai trò", "Trạng thái rõ ràng", "Component system tái sử dụng"],
        },
        {
          title: "Legacy UI modernization",
          category: "Frontend / product quality",
          body: "Concept cải thiện giao diện cũ trong khi giữ nguyên hành vi cốt lõi của sản phẩm.",
          outcomes: ["Điều hướng sạch hơn", "Responsive layouts", "Giảm chi phí bảo trì"],
        },
      ],
    },
    about: {
      eyebrow: "Giới thiệu",
      title: "Làm việc điềm tĩnh, hệ thống rõ ràng, AI thực dụng.",
      body: "Tôi thích xây dựng phần mềm dễ hiểu, dễ dùng và dễ tiếp tục cải thiện. Điểm mạnh của tôi nằm ở giao điểm giữa tư duy sản phẩm, full-stack implementation và automation hữu ích.",
      principles: ["Giữ scope sắc nét", "Làm giao diện dễ hiểu", "Ưu tiên hệ thống dễ bảo trì", "Dùng AI khi tạo ra leverage thật"],
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cloudflare", "Drizzle", "Postgres", "Three.js", "AI tooling"],
    },
    contact: {
      eyebrow: "Liên hệ",
      title: "Bạn có role, project hoặc workflow muốn trao đổi?",
      body: "Liên hệ trực tiếp qua email hoặc kết nối qua GitHub và LinkedIn.",
    },
  },
};
```

- [ ] **Step 3: Verify the content module**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: ESLint completes without TypeScript import or syntax errors in `app/content/portfolio.ts`.

- [ ] **Step 4: Commit the content task**

```bash
git add .gitignore app/content/portfolio.ts
git commit -m "Add bilingual portfolio content"
```

## Task 2: Shared Portfolio Components

**Files:**
- Create: `app/components/LanguageToggle.tsx`
- Create: `app/components/SectionHeader.tsx`
- Create: `app/components/ContactLinks.tsx`
- Create: `app/components/ServiceCard.tsx`
- Create: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Create the language toggle**

Create `app/components/LanguageToggle.tsx`:

```tsx
import type { Language } from "../content/portfolio";

type LanguageToggleProps = {
  labels: Record<Language, string>;
  value: Language;
  onChange: (language: Language) => void;
};

const languages: Language[] = ["en", "vi"];

export default function LanguageToggle({
  labels,
  value,
  onChange,
}: LanguageToggleProps) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      {languages.map((language) => (
        <button
          aria-pressed={value === language}
          className={value === language ? "is-active" : ""}
          key={language}
          onClick={() => onChange(language)}
          type="button"
        >
          {labels[language]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create the section header**

Create `app/components/SectionHeader.tsx`:

```tsx
type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create contact links**

Create `app/components/ContactLinks.tsx`:

```tsx
import type { ContactLink } from "../content/portfolio";

type ContactLinksProps = {
  links: ContactLink[];
  variant?: "hero" | "footer";
};

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function ContactLinks({
  links,
  variant = "hero",
}: ContactLinksProps) {
  return (
    <div className={`contact-links contact-links-${variant}`}>
      {links.map((link) => (
        <a
          href={link.href}
          key={link.label}
          rel={isExternalLink(link.href) ? "noreferrer" : undefined}
          target={isExternalLink(link.href) ? "_blank" : undefined}
          title={link.description}
        >
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create service cards**

Create `app/components/ServiceCard.tsx`:

```tsx
import type { Service } from "../content/portfolio";

type ServiceCardProps = {
  item: Service;
  index: number;
};

export default function ServiceCard({ item, index }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <ul aria-label={`${item.title} tags`}>
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 5: Create project cards**

Create `app/components/ProjectCard.tsx`:

```tsx
import type { Project } from "../content/portfolio";

type ProjectCardProps = {
  item: Project;
};

export default function ProjectCard({ item }: ProjectCardProps) {
  return (
    <article className="project-card">
      <p className="project-category">{item.category}</p>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <ul>
        {item.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 6: Verify shared components**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: PASS with no component import, JSX, or accessibility lint errors.

- [ ] **Step 7: Commit shared components**

```bash
git add app/components/LanguageToggle.tsx app/components/SectionHeader.tsx app/components/ContactLinks.tsx app/components/ServiceCard.tsx app/components/ProjectCard.tsx
git commit -m "Add portfolio presentation components"
```

## Task 3: Three.js Hero Scene

**Files:**
- Create: `app/components/HeroScene.tsx`

- [ ] **Step 1: Create the client-only hero scene**

Create `app/components/HeroScene.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const nodePositions = [
  new THREE.Vector3(-1.8, 0.8, 0),
  new THREE.Vector3(-0.6, 1.25, 0.35),
  new THREE.Vector3(0.8, 0.9, -0.15),
  new THREE.Vector3(1.75, 0.1, 0.25),
  new THREE.Vector3(0.55, -0.95, 0),
  new THREE.Vector3(-1.25, -0.6, -0.2),
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 4],
  [0, 3],
];

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.WebGLRenderingContext) {
      setShowFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setShowFallback(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    const keyLight = new THREE.DirectionalLight(0xbdebdc, 2);
    keyLight.position.set(2.5, 2, 4);
    scene.add(ambientLight, keyLight);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.13, 2);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x16766a,
      metalness: 0.08,
      roughness: 0.42,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0e7490,
      emissiveIntensity: 0.18,
      metalness: 0.06,
      roughness: 0.35,
    });

    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(
        nodeGeometry,
        index % 3 === 0 ? accentMaterial : nodeMaterial,
      );
      node.position.copy(position);
      group.add(node);
    });

    const linePoints: number[] = [];
    edges.forEach(([from, to]) => {
      linePoints.push(...nodePositions[from].toArray(), ...nodePositions[to].toArray());
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7bb9ad,
      opacity: 0.62,
      transparent: true,
    });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const panelGeometry = new THREE.PlaneGeometry(1.1, 0.56);
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.58,
      side: THREE.DoubleSide,
      transparent: true,
    });

    [
      { position: new THREE.Vector3(-1.55, -1.25, -0.08), rotation: 0.18 },
      { position: new THREE.Vector3(1.35, 1.25, -0.12), rotation: -0.16 },
    ].forEach((panel) => {
      const mesh = new THREE.Mesh(panelGeometry, panelMaterial);
      mesh.position.copy(panel.position);
      mesh.rotation.z = panel.rotation;
      group.add(mesh);
    });

    const pointer = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

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
      if (!reducedMotion) {
        group.rotation.y += 0.003;
        group.rotation.x += (pointer.y * 0.08 - group.rotation.x) * 0.035;
        group.position.x += (pointer.x * 0.12 - group.position.x) * 0.035;
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      accentMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      panelGeometry.dispose();
      panelMaterial.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-scene" ref={mountRef}>
      {showFallback ? (
        <div className="hero-scene-fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify the scene compiles**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: PASS with no unused variables, hook dependency errors, or Three.js type errors.

- [ ] **Step 3: Commit the hero scene**

```bash
git add app/components/HeroScene.tsx
git commit -m "Add abstract portfolio hero scene"
```

## Task 4: Page Composition And Metadata

**Files:**
- Create: `app/components/PortfolioPage.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the portfolio page component**

Create `app/components/PortfolioPage.tsx`:

```tsx
"use client";

import { useState } from "react";
import { portfolioContent, type Language } from "../content/portfolio";
import ContactLinks from "./ContactLinks";
import HeroScene from "./HeroScene";
import LanguageToggle from "./LanguageToggle";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";

export default function PortfolioPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = portfolioContent[language];

  return (
    <main className="portfolio-shell">
      <header className="site-nav">
        <a className="site-mark" href="#top" aria-label={copy.nav.name}>
          {copy.nav.name}
        </a>
        <nav aria-label="Primary navigation">
          {copy.nav.links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <LanguageToggle
          labels={copy.languageToggle}
          onChange={setLanguage}
          value={language}
        />
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="hero-lede">{copy.hero.body}</p>
          <p className="hero-availability">{copy.hero.availability}</p>
          <ContactLinks links={copy.contactLinks} />
        </div>
        <HeroScene />
      </section>

      <section className="content-section" id="expertise">
        <SectionHeader {...copy.expertise} />
        <div className="card-grid three-columns">
          {copy.expertise.items.map((item, index) => (
            <ServiceCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </section>

      <section className="content-section section-band" id="services">
        <SectionHeader {...copy.services} />
        <div className="card-grid three-columns">
          {copy.services.items.map((item, index) => (
            <ServiceCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </section>

      <section className="content-section" id="work">
        <SectionHeader {...copy.work} />
        <div className="card-grid three-columns">
          {copy.work.items.map((item) => (
            <ProjectCard item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className="content-section about-section" id="about">
        <div>
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
          <p>{copy.about.body}</p>
        </div>
        <div className="about-lists">
          <div>
            <h3>Principles</h3>
            <ul>
              {copy.about.principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul className="stack-list">
              {copy.about.stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
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

- [ ] **Step 2: Render the portfolio from the app route**

Replace `app/page.tsx` with:

```tsx
import PortfolioPage from "./components/PortfolioPage";

export default function Home() {
  return <PortfolioPage />;
}
```

- [ ] **Step 3: Update page metadata**

Replace the metadata block and document language in `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tai Pham | Software Engineer",
  description:
    "Full-stack software engineer focused on reliable web products, AI tooling, and freelance project delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify page composition**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: PASS with no import or client/server component errors.

- [ ] **Step 5: Commit page composition**

```bash
git add app/components/PortfolioPage.tsx app/page.tsx app/layout.tsx
git commit -m "Compose bilingual portfolio page"
```

## Task 5: Portfolio Styling

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace lotus styles with portfolio styles**

Replace `app/globals.css` with:

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

.portfolio-shell {
  min-height: 100svh;
  overflow: hidden;
}

.site-nav {
  align-items: center;
  background: rgba(247, 248, 243, 0.9);
  border-bottom: 1px solid rgba(216, 225, 217, 0.82);
  display: grid;
  gap: 18px;
  grid-template-columns: auto 1fr auto;
  left: 0;
  padding: 16px 40px;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 20;
}

@supports (backdrop-filter: blur(18px)) {
  .site-nav {
    backdrop-filter: blur(18px);
  }
}

.site-mark {
  font-size: 0.96rem;
  font-weight: 800;
}

.site-nav nav {
  display: flex;
  gap: 18px;
  justify-content: center;
}

.site-nav nav a {
  color: var(--muted);
  font-size: 0.92rem;
}

.site-nav nav a:hover {
  color: var(--accent-strong);
}

.language-toggle {
  background: #e9f0eb;
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  gap: 4px;
  padding: 4px;
}

.language-toggle button {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--muted);
  cursor: pointer;
  min-height: 32px;
  min-width: 42px;
}

.language-toggle button.is-active {
  background: var(--foreground);
  color: #ffffff;
}

.hero-section {
  align-items: center;
  display: grid;
  gap: 42px;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  min-height: calc(100svh - 73px);
  padding: 72px 40px 80px;
}

.hero-copy {
  max-width: 720px;
}

.eyebrow {
  color: var(--accent-strong);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1.4;
  margin: 0 0 12px;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: 4.3rem;
  font-weight: 850;
  letter-spacing: 0;
  line-height: 0.98;
  margin-bottom: 22px;
}

h2 {
  font-size: 2.25rem;
  font-weight: 820;
  letter-spacing: 0;
  line-height: 1.08;
  margin-bottom: 14px;
}

h3 {
  font-size: 1.08rem;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1.25;
  margin-bottom: 10px;
}

.hero-lede,
.section-header p,
.about-section p,
.contact-section p {
  color: var(--muted);
  font-size: 1.04rem;
  line-height: 1.7;
}

.hero-availability {
  border-left: 3px solid var(--accent-warm);
  color: #38443c;
  line-height: 1.6;
  margin: 22px 0;
  max-width: 620px;
  padding-left: 14px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.contact-links a {
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  display: inline-flex;
  min-height: 42px;
  padding: 0 16px;
}

.contact-links-hero a:first-child,
.contact-links-footer a:first-child {
  background: var(--foreground);
  border-color: var(--foreground);
  color: #ffffff;
}

.contact-links a:hover {
  border-color: var(--accent);
  color: var(--accent-strong);
}

.hero-scene {
  min-height: 460px;
  position: relative;
}

.hero-scene canvas {
  display: block;
  height: 100%;
  width: 100%;
}

.hero-scene::before {
  background:
    linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(20, 122, 112, 0.14)),
    repeating-linear-gradient(90deg, rgba(23, 32, 27, 0.08) 0 1px, transparent 1px 28px);
  border-radius: 8px;
  content: "";
  inset: 9% 4%;
  position: absolute;
  z-index: -1;
}

.hero-scene-fallback {
  align-items: center;
  display: flex;
  gap: 18px;
  height: 100%;
  justify-content: center;
  min-height: 460px;
}

.hero-scene-fallback span {
  background: var(--accent);
  border-radius: 50%;
  display: block;
  height: 26px;
  width: 26px;
}

.content-section {
  padding: 86px 40px;
}

.section-band {
  background: #eef4ef;
}

.section-header {
  max-width: 720px;
  padding-bottom: 30px;
}

.card-grid {
  display: grid;
  gap: 16px;
}

.three-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.service-card,
.project-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  min-height: 100%;
  padding: 22px;
}

.card-index,
.project-category {
  color: var(--accent-strong);
  font-size: 0.78rem;
  font-weight: 800;
  margin-bottom: 18px;
}

.service-card p,
.project-card p {
  color: var(--muted);
  line-height: 1.65;
}

.service-card ul,
.project-card ul,
.about-lists ul {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
}

.service-card ul,
.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-card li,
.stack-list li {
  background: var(--panel-soft);
  border: 1px solid rgba(20, 122, 112, 0.14);
  border-radius: 999px;
  color: #355147;
  font-size: 0.82rem;
  padding: 7px 10px;
}

.project-card li,
.about-lists > div:first-child li {
  border-top: 1px solid var(--line);
  color: #38443c;
  line-height: 1.55;
  padding: 10px 0;
}

.about-section {
  display: grid;
  gap: 40px;
  grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1fr);
}

.about-lists {
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 1fr;
}

.contact-section {
  background: var(--foreground);
  color: #ffffff;
}

.contact-section .eyebrow,
.contact-section p {
  color: #b8d9ce;
}

.contact-section h2 {
  max-width: 680px;
}

.contact-links-footer a {
  border-color: rgba(255, 255, 255, 0.24);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

@media (max-width: 960px) {
  .site-nav {
    grid-template-columns: 1fr auto;
    padding: 14px 20px;
  }

  .site-nav nav {
    display: none;
  }

  .hero-section,
  .about-section {
    grid-template-columns: 1fr;
  }

  .hero-section {
    padding: 54px 20px 66px;
  }

  h1 {
    font-size: 3rem;
  }

  .three-columns,
  .about-lists {
    grid-template-columns: 1fr;
  }

  .content-section {
    padding: 66px 20px;
  }
}

@media (max-width: 520px) {
  .site-nav {
    gap: 10px;
  }

  .site-mark {
    font-size: 0.9rem;
  }

  h1 {
    font-size: 2.3rem;
    line-height: 1.04;
  }

  h2 {
    font-size: 1.72rem;
  }

  .hero-scene,
  .hero-scene-fallback {
    min-height: 320px;
  }
}
```

- [ ] **Step 2: Verify CSS syntax through lint**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: PASS. ESLint should not report JSX class names missing because CSS class names are global.

- [ ] **Step 3: Commit styling**

```bash
git add app/globals.css
git commit -m "Style portfolio landing page"
```

## Task 6: Remove Legacy Lotus Demo

**Files:**
- Delete: `app/components/LotusScene.tsx`

- [ ] **Step 1: Delete the old component**

Remove `app/components/LotusScene.tsx` because `app/page.tsx` now renders `PortfolioPage`.

- [ ] **Step 2: Confirm no lotus references remain**

Run:

```bash
rg "LotusScene|lotus-" app
```

Expected: no matches.

- [ ] **Step 3: Verify the app still builds**

Run:

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run build
```

Expected: Vinext production build completes successfully.

- [ ] **Step 4: Commit legacy cleanup**

```bash
git add app/components/LotusScene.tsx app/page.tsx app/globals.css
git commit -m "Remove lotus demo homepage"
```

## Task 7: Browser Verification And Final Polish

**Files:**
- Modify only files from earlier tasks if verification reveals a concrete issue.

- [ ] **Step 1: Run final lint**

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run lint
```

Expected: PASS.

- [ ] **Step 2: Run final build**

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run build
```

Expected: PASS.

- [ ] **Step 3: Start the local dev server**

```bash
/Users/taiph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/npm run dev
```

Expected: Vinext prints a local URL. Open that URL in the browser.

- [ ] **Step 4: Verify desktop layout**

At a desktop viewport, confirm:

- Hero text is readable and not covered by the Three.js scene.
- Email, GitHub, and LinkedIn links are visible in the hero.
- The hero scene renders visible nodes, lines, and panels.
- Sections appear in this order: hero, expertise, services, work, about, contact.
- Cards have even spacing and no nested card appearance.

- [ ] **Step 5: Verify mobile layout**

At a mobile viewport, confirm:

- Navigation collapses to mark plus language toggle.
- Hero text wraps cleanly.
- The Three.js scene stays below the hero text and does not overlap content.
- Cards stack in one column.
- Contact links wrap without text overflow.

- [ ] **Step 6: Verify language switching**

Click `VI`, then `EN`. Expected:

- Hero, nav, sections, cards, about, and contact copy switch languages.
- Contact URLs stay the same across languages.
- Active language button has `aria-pressed="true"`.

- [ ] **Step 7: Verify reduced motion behavior**

Temporarily enable reduced motion in the browser or OS. Expected:

- The page remains readable.
- The hero scene renders without continuous animated spin.
- CSS smooth scrolling is disabled by the reduced-motion media rule.

- [ ] **Step 8: Commit final fixes if any files changed**

If verification required edits, commit them:

```bash
git add app .gitignore
git commit -m "Polish portfolio verification issues"
```

If no files changed, do not create an empty commit.
