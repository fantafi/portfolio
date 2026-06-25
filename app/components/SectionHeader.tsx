type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  body,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
