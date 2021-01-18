import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type tasksForTodolist = {
    id: string
    isDone: boolean
    title: string
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    tasksForTodolist: Array<TaskType>
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = (props: tasksForTodolist) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.id, props.todolistId)
    }, [props.removeTask, props.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.id, newIsDoneValue, props.todolistId);
    }, [props.changeTaskStatus, props.id])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.id])

    return (
        <div key={props.id} className={props.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )


}