import ToDoCard, { type ToDoCardInfo } from './ToDoCard.tsx';
import hashObject from '../utils/hash-object';

export default function ToDoList({ todoCards }: { todoCards: ToDoCardInfo[] }) {
  return (
    <section className="todo-list">
      {todoCards.map((card) => (
        <ToDoCard key={hashObject(card)} {...card} />
      ))}
    </section>
  );
}
