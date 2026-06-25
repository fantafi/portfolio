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
