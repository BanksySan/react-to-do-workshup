import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from "./components/Title.tsx";
import ToDoList from "./components/ToDoList.tsx";

const toDoCards = [
    {
        title: 'Title A', description: 'Description A',
        tasks: [{
            title: 'Task A1',
            description: 'Task Description A1'
        }, {
            title: 'Task A2',
            description: 'Task Description A2'
        }]
    },
    {
        title: 'Title B', description: "Description B",
        tasks: [{
            title: 'Task B1',
            description: 'Task Description B1'
        }, {
            title: 'Task B2',
            description: 'Task Description B2'
        }]
    },
    {
        title: 'Title C', description: "Description C",
        tasks: [{
            title: 'Task C1',
            description: 'Task Description C1'
        }, {
            title: 'Task C2',
            description: 'Task Description C2'
        }]
    },
    {
        title: 'Title D', description: "Description D",
        tasks: [{
            title: 'Task D1',
            description: 'Task DesDription D1'
        }, {
            title: 'Task D2',
            description: 'Task DesDription D2'
        }]
    }
]

export default function App() {
    return <ToDoList todoCards={toDoCards}/>
}
