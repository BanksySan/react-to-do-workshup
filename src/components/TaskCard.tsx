export interface TaskCardInfo {
  title: string;
  description: string;
}

export default function TaskCard({ title, description }: TaskCardInfo) {
  return (
    <section className="task-card">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
