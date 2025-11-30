import TaskCard, { type TaskCardInfo } from './TaskCard.tsx';

export interface TaskListInfo {
  tasks: TaskCardInfo[];
  onUpdateTask: (
    taskId: string,
    updates: Partial<Pick<TaskCardInfo, 'title' | 'description'>>
  ) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListInfo) {
  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          {...task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </section>
  );
}
