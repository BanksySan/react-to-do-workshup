import TaskCard, { type TaskCardInfo } from './TaskCard.tsx';
import hashObject from '../utils/hash-object';

export interface TaskListInfo {
  tasks: TaskCardInfo[];
}

export default function TaskList({ tasks }: TaskListInfo) {
  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard key={hashObject(task)} {...task} />
      ))}
    </section>
  );
}
