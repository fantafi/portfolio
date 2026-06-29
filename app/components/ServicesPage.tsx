"use client";

import { type MouseEvent, useEffect, useState } from "react";
import { servicesPageContent, type Language } from "../content/portfolio";
import ContactLinks from "./ContactLinks";
import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";
import ServiceOrbitScene from "./ServiceOrbitScene";
import SiteNav from "./SiteNav";

function scrollToHashTarget() {
  const id = window.location.hash.slice(1);
  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({
    behavior: "auto",
    top: Math.max(top, 0),
  });
}

export default function ServicesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = servicesPageContent[language];

  useEffect(() => {
    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  const handleHashLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
    scrollToHashTarget();
  };

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
            <a className="primary-action" href="#contact" onClick={handleHashLinkClick}>
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
