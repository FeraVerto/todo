import React from "react";
import {TaskType} from "./App2";
import {FilterValuesType} from "../App";

type AlternativeTODOPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: number) => void
}

export function AlternativeTODO(props: AlternativeTODOPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)} }>Delete</button>
                    </li>)
                }
            </ul>
            <div>
                {/* (7) Создаем событие при нажатии на кнопки, оно вызывает функцию changeFilter из App2 и передает
                в нее параметр*/}
                <button onClick = { () => {props.changeFilter("all")} }>All</button>
                <button onClick = { () => {props.changeFilter("active")} }>Active</button>
                <button onClick = { () => {props.changeFilter("completed")} }>Completed</button>
            </div>
        </div>
    )
}

