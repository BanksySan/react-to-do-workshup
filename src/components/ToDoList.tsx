import ToDoCard, { type ToDoCardInfo } from './ToDoCard.tsx';

interface ToDoListProps {
  todoCards: ToDoCardInfo[];
  onUpdateCard: (id: string, updates: Partial<Pick<ToDoCardInfo, 'title' | 'description'>>) => void;
  onDeleteCard: (id: string) => void;
  onAddTask: (
    cardId: string,
    task: Omit<ToDoCardInfo['tasks'][number], 'id'>
  ) => void;
  onUpdateTask: (
    cardId: string,
    taskId: string,
    updates: Partial<Pick<ToDoCardInfo['tasks'][number], 'title' | 'description'>>
  ) => void;
  onDeleteTask: (cardId: string, taskId: string) => void;
}

export default function ToDoList({
  todoCards,
  onUpdateCard,
  onDeleteCard,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ToDoListProps) {
  return (
    <section className="todo-list">
      {todoCards.map((card) => (
        <ToDoCard
          key={card.id}
          {...card}
          onUpdateCard={onUpdateCard}
          onDeleteCard={onDeleteCard}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </section>
  );
}
