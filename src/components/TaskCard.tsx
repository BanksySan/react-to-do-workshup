import { FormEvent, useEffect, useState } from 'react';

export interface TaskCardInfo {
  id: string;
  title: string;
  description: string;
}

type TaskUpdate = Partial<Pick<TaskCardInfo, 'title' | 'description'>>;

interface TaskCardProps extends TaskCardInfo {
  onUpdate: (id: string, updates: TaskUpdate) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  id,
  title,
  description,
  onUpdate,
  onDelete,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);

  useEffect(() => {
    setDraftTitle(title);
    setDraftDescription(description);
  }, [title, description]);

  const saveTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate(id, {
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

  return (
    <section className="task-card">
      {isEditing ? (
        <form className="stack" onSubmit={saveTask}>
          <input
            name="taskTitle"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
          />
          <textarea
            name="taskDescription"
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
          />
          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" className="ghost" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : <p className="muted">No description</p>}
          <div className="actions">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" className="danger" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </section>
  );
}
