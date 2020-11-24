import React, {useState} from 'react';
import '../App.css';
import TodoList from "../TodoList";
import {AlternativeTODO} from "./AlternativeTODO";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App2() {

    const [tasks, setState] = useState<Array<TaskType>>([
            {id: 1, title: "React", isDone: false},
            {id: 2, title: "HTML", isDone: false},
            {id: 3, title: "CSS", isDone: true},
            {id: 4, title: "JS", isDone: true},
            {id: 5, title: "SASS", isDone: true}
        ]
    )

    /*ФИЛЬТРУЕМ ТАСКИ*/
    /* (0) Создаем локальный state: переменную filter и функцию setFilter, которая будет ее
    * обновлять*/
    /*Инициализируем стэйт, положив в него начальное значение фильтра*/
    const [filter, setFilter] = useState<FilterValuesType>('all');

    /* (6) Создаем функцию changeFilter, которая будет обновлять фильтр в зависимости от пришедших в нее параметров*/
    /*Параметры будут приходить из компонента AlternativeTODO при нажатии на кнопки button*/
    const changeFilter = (FilterValuesType: FilterValuesType) => {
        setFilter(FilterValuesType);
    }

    /* (1) Говорим по какому принципу будут отфильтровываться таски*/
    /* (2) Засовываем таски в новую переменную newFilter*/
    /* (3) Проходим фильтром по всем таскам и фильтруем их согласно условию isDone === false(true)*/
    /* (4) Записываем в newFilter новый массив*/
    let newFilter = tasks;
    if (filter === "active") {
        newFilter = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        newFilter = tasks.filter(t => t.isDone === true)
    }

    /*УДАЛЯЕМ ТАСКИ*/

    const removeTask = (taskID: number) => {
        let delTask = tasks.filter(t => taskID !== t.id);
        setState(delTask);
    }

    return (
        <div className="App">
            <AlternativeTODO title={"Для экспериментов"}
                             /* (5) Передаем в качестве тасков тот обьект, что получился при фильтрации*/
                             tasks={newFilter}
                             changeFilter={changeFilter}
                             removeTask={removeTask}
            />
        </div>
    );
}

/*data binding привязка интерфейса к слою данных*/

export default App2;
