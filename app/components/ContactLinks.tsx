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
