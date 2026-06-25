import type { Service } from "../content/portfolio";

type ServiceCardProps = {
  item: Service;
  index: number;
  tagListLabel: string;
};

export default function ServiceCard({
  item,
  index,
  tagListLabel,
}: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <ul aria-label={`${tagListLabel} ${item.title}`}>
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
