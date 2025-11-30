import { FormEvent, useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList.tsx';
import type { ToDoCardInfo } from './components/ToDoCard.tsx';

type SeedTask = {
  title: string;
  description: string;
};

type SeedToDo = {
  title: string;
  description: string;
  tasks: SeedTask[];
};

type CardUpdate = Partial<Pick<ToDoCardInfo, 'title' | 'description'>>;

type TaskUpdate = Partial<
  Pick<ToDoCardInfo['tasks'][number], 'title' | 'description'>
>;

const createId = (() => {
  let counter = 0;
  return (prefix: string) => `${prefix}-${Date.now()}-${counter++}`;
})();

const seedCards: SeedToDo[] = [
  {
    title: 'Title A',
    description: 'Description A',
    tasks: [
      {
        title: 'Task A1',
        description: 'Task Description A1',
      },
      {
        title: 'Task A2',
        description: 'Task Description A2',
      },
    ],
  },
  {
    title: 'Title B',
    description: 'Description B',
    tasks: [
      {
        title: 'Task B1',
        description: 'Task Description B1',
      },
      {
        title: 'Task B2',
        description: 'Task Description B2',
      },
    ],
  },
  {
    title: 'Title C',
    description: 'Description C',
    tasks: [
      {
        title: 'Task C1',
        description: 'Task Description C1',
      },
      {
        title: 'Task C2',
        description: 'Task Description C2',
      },
    ],
  },
  {
    title: 'Title D',
    description: 'Description D',
    tasks: [
      {
        title: 'Task D1',
        description: 'Task DesDription D1',
      },
      {
        title: 'Task D2',
        description: 'Task DesDription D2',
      },
    ],
  },
];

export default function App() {
  const [todoCards, setTodoCards] = useState<ToDoCardInfo[]>(() =>
    seedCards.map((card) => ({
      id: createId('todo'),
      title: card.title,
      description: card.description,
      tasks: card.tasks.map((task) => ({
        id: createId('task'),
        title: task.title,
        description: task.description,
      })),
    }))
  );

  const [newCard, setNewCard] = useState({ title: '', description: '' });

  const addToDoCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newCard.title.trim();
    const description = newCard.description.trim();

    if (!title) return;

    setTodoCards((current) => [
      ...current,
      {
        id: createId('todo'),
        title,
        description,
        tasks: [],
      },
    ]);

    setNewCard({ title: '', description: '' });
  };

  const updateToDoCard = (id: string, updates: CardUpdate) => {
    setTodoCards((current) =>
      current.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const deleteToDoCard = (id: string) => {
    setTodoCards((current) => current.filter((card) => card.id !== id));
  };

  const addTask = (
    cardId: string,
    task: Omit<ToDoCardInfo['tasks'][number], 'id'>
  ) => {
    setTodoCards((current) =>
      current.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: [
                ...card.tasks,
                { id: createId('task'), title: task.title, description: task.description },
              ],
            }
          : card
      )
    );
  };

  const updateTask = (cardId: string, taskId: string, updates: TaskUpdate) => {
    setTodoCards((current) =>
      current.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }
          : card
      )
    );
  };

  const deleteTask = (cardId: string, taskId: string) => {
    setTodoCards((current) =>
      current.map((card) =>
        card.id === cardId
          ? { ...card, tasks: card.tasks.filter((task) => task.id !== taskId) }
          : card
      )
    );
  };

  return (
    <main className="app">
      <section className="todo-card create-card">
        <h2>Create a to-do</h2>
        <form className="stack" onSubmit={addToDoCard}>
          <label className="field">
            <span>Title</span>
            <input
              name="title"
              value={newCard.title}
              onChange={(event) =>
                setNewCard((previous) => ({ ...previous, title: event.target.value }))
              }
              placeholder="Add a title"
              required
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              name="description"
              value={newCard.description}
              onChange={(event) =>
                setNewCard((previous) => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
              placeholder="What needs to be done?"
            />
          </label>

          <button type="submit">Add To-Do</button>
        </form>
      </section>

      <ToDoList
        todoCards={todoCards}
        onUpdateCard={updateToDoCard}
        onDeleteCard={deleteToDoCard}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </main>
  );
}
