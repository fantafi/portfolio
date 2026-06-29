"use client";

import { useState } from "react";
import { portfolioContent, type Language } from "../content/portfolio";
import ContactLinks from "./ContactLinks";
import HeroScene from "./HeroScene";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";
import SiteNav from "./SiteNav";

export default function PortfolioPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = portfolioContent[language];

  return (
    <main className="portfolio-shell" lang={language}>
      <SiteNav
        ariaLabel={copy.accessibility.primaryNavigation}
        language={language}
        languageLabels={copy.languageToggle}
        languageSelectorLabel={copy.accessibility.languageSelector}
        links={copy.nav.links}
        name={copy.nav.name}
        onLanguageChange={setLanguage}
      />

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
            <ServiceCard
              item={item}
              index={index}
              key={item.title}
              tagListLabel={copy.accessibility.serviceTagsLabel}
            />
          ))}
        </div>
      </section>

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
            <h3>{copy.about.principlesTitle}</h3>
            <ul>
              {copy.about.principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{copy.about.stackTitle}</h3>
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
