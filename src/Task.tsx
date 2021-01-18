import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type tasksForTodolist = {
    id: any,
    tasksForTodolist: Array<TaskType>,
    changeTaskStatus: (taskid: any, newIsDoneValue: any, id: any) => void
    changeTaskTitle: (taskid: any, newValue: any, id: any) => void
    removeTask: (taskid: any, id: any) => void
}

export const Task = (props: tasksForTodolist) => {
    return (
        <div>
            {
                props.tasksForTodolist.map(t => {
                    const onClickHandler = useCallback(() => {
                        props.removeTask(t.id, props.id)
                    }, [props.removeTask, props.id])

                    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }, [props.changeTaskStatus, props.id])

                    const onTitleChangeHandler = useCallback((newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }, [props.changeTaskTitle, props.id])


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
                </div>

                )
                }