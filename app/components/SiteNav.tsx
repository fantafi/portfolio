import type { Language, NavLink } from "../content/portfolio";
import Link from "next/link";
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
      <Link className="site-mark" href="/" aria-label={name}>
        {name}
      </Link>
      <nav aria-label={ariaLabel}>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
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
