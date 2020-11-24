import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (title: string, todoListID: string, taskID: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}

function TodoList(props: TodoListPropsType) {

    const tasks = props.tasks.map(task => {
        const onClickRemoveTask = () => props.removeTask(task.id, props.id)

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }

        const changeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(newValue, props.id, task.id)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox checked={task.isDone}
                          onChange={changeTaskStatus}
                          color={"primary"}
                />


                <EditableSpan title={task.title}
                              onChange={changeTitleHandler}/>

                <IconButton onClick={onClickRemoveTask}>
                    <Delete/>
                </IconButton>
                {/*
                <button className="buttonDelete" onClick={onClickRemoveTask}>X</button>
*/}
            </li>
        )
    })

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id);
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id);
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    return (
        <div className="todoList">
            {/*<h3>{props.title}</h3>*/}
            <EditableSpan title={props.title}
                          onChange={changeTodoListTitle}/>

            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>

            {/*<button onClick={removeTodoList}>X</button>*/}
            <AddItemForm addItem={addTask}/>
            <ul className="tasksList">
                {
                    tasks
                }
            </ul>
            <div>
                <Button size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color={"default"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;