import TaskList from './TaskList.tsx';
import type { TaskCardInfo } from './TaskCard.tsx';

export interface ToDoCardInfo {
  title: string;
  description: string;
  tasks: TaskCardInfo[];
}

export default function ToDoCard({ title, description, tasks }: ToDoCardInfo) {
  return (
    <section className="todo-card">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskList tasks={tasks} />
    </section>
  );
}
