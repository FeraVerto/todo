import {Task} from "./Task";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task  component',
    component: Task
}

const ChangeTaskStatusCallback = action("Status changed")
const ChangeTaskTitleCallback = action("Title changed")
const RemoveTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
    return (
        <>
            <Task task={{id: "1", isDone: true, title: "CSS"}}
                  todolistId={"todolistID1"}
                  removeTask={RemoveTaskCallback}
                  changeTaskStatus={ChangeTaskStatusCallback}
                  changeTaskTitle={ChangeTaskTitleCallback}
            />

            <Task task={{id: "2", isDone: false, title: "JS"}}
                  todolistId={"todolistID2"}
                  removeTask={RemoveTaskCallback}
                  changeTaskStatus={ChangeTaskStatusCallback}
                  changeTaskTitle={ChangeTaskTitleCallback}
            />
        </>
    )
}