import TaskCard from "./TaskCard.tsx";
import hashObject from "../utils/hash-object";

export default function TaskList({tasks}) {
    return <section className="task-list">
        {tasks.map(task => <TaskCard {...task} key={hashObject(task)}/>)}
    </section>
}