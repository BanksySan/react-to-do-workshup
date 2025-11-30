import {ReactNode} from 'react';
import TaskCard from "./TaskCard.tsx";
import TaskList from "./TaskList.tsx";

export default function ToDoCard({title, description, tasks}) {
    return (
        <section className="todo-card">
            <h1>{title}</h1>
            <p>{description}</p>
            <TaskList tasks={tasks}/>
        </section>
    );
}