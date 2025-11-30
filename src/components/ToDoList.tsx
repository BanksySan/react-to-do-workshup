import ToDoCard from "./ToDoCard.tsx";
import hashObject from "../utils/hash-object";

export default function ToDoList({todoCards}) {
    return <section className="todo-list">
        {todoCards.map(card => <ToDoCard {...card} key={hashObject(card)}/>)}
    </section>
}