import { FormEvent, useEffect, useState } from 'react';
import TaskList from './TaskList.tsx';
import type { TaskCardInfo } from './TaskCard.tsx';

export interface ToDoCardInfo {
  id: string;
  title: string;
  description: string;
  tasks: TaskCardInfo[];
}

type CardUpdate = Partial<Pick<ToDoCardInfo, 'title' | 'description'>>;
type TaskUpdate = Partial<Pick<TaskCardInfo, 'title' | 'description'>>;

type NewTask = Omit<TaskCardInfo, 'id'>;

interface ToDoCardProps extends ToDoCardInfo {
  onUpdateCard: (id: string, updates: CardUpdate) => void;
  onDeleteCard: (id: string) => void;
  onAddTask: (cardId: string, task: NewTask) => void;
  onUpdateTask: (cardId: string, taskId: string, updates: TaskUpdate) => void;
  onDeleteTask: (cardId: string, taskId: string) => void;
}

export default function ToDoCard({
  id,
  title,
  description,
  tasks,
  onUpdateCard,
  onDeleteCard,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ToDoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);
  const [newTask, setNewTask] = useState<NewTask>({ title: '', description: '' });

  useEffect(() => {
    setDraftTitle(title);
    setDraftDescription(description);
  }, [title, description]);

  const saveCard = () => {
    onUpdateCard(id, {
      title: draftTitle.trim() || title,
      description: draftDescription.trim(),
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setIsEditing(false);
  };

  const submitTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTaskTitle = newTask.title.trim();
    const nextDescription = newTask.description.trim();

    if (!nextTaskTitle) return;

    onAddTask(id, { title: nextTaskTitle, description: nextDescription });
    setNewTask({ title: '', description: '' });
  };

  return (
    <section className="todo-card">
      {isEditing ? (
        <div className="stack">
          <input
            name="title"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            placeholder="Card title"
          />
          <textarea
            name="description"
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            placeholder="Card description"
          />
        </div>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
        </>
      )}

      <div className="actions">
        {isEditing ? (
          <>
            <button type="button" onClick={saveCard}>
              Save
            </button>
            <button type="button" className="ghost" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" className="danger" onClick={() => onDeleteCard(id)}>
              Delete
            </button>
          </>
        )}
      </div>

      <TaskList
        tasks={tasks}
        onUpdateTask={(taskId, updates) => onUpdateTask(id, taskId, updates)}
        onDeleteTask={(taskId) => onDeleteTask(id, taskId)}
      />

      <form className="stack add-task-form" onSubmit={submitTask}>
        <h3>Add task</h3>
        <input
          name="taskTitle"
          value={newTask.title}
          onChange={(event) =>
            setNewTask((previous) => ({ ...previous, title: event.target.value }))
          }
          placeholder="Task title"
          required
        />
        <textarea
          name="taskDescription"
          value={newTask.description}
          onChange={(event) =>
            setNewTask((previous) => ({ ...previous, description: event.target.value }))
          }
          placeholder="Optional description"
        />
        <button type="submit">Add Task</button>
      </form>
    </section>
  );
}
