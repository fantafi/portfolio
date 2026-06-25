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
