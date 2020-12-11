import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type addTaskACType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}

export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    taskID: string
    todoListID: string
}

export type ActionType = RemoveTaskActionType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | RemoveTodolistActionType
    | AddTodolistActionType


export const tasksReducer = (state: TaskStateType, action: ActionType) => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            return {...state, ...state[action.todoListId].filter(t => t.id !== action.taskId)}
            /*
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(t => t.id !== action.taskId)
            return copyState*/
        }

        case 'ADD-TASK': {
            /*let copyState = {...state}
            copyState[action.todoListId] = [{id: v1(), title: action.title, isDone: false}, ...copyState[action.todoListId]]
            return copyState*/

            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }
        }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => {
                    if (t.id !== action.taskID) return t
                    else return {...t, isDone: action.isDone}
                })
            }


        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => {
                    if (t.id !== action.taskID) return t
                    else return {...t, title: action.title}
                })
            }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        case "ADD-TODOLIST": {
            return {...state, [action.todoListId]: []}
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK', taskId, todoListId
})

export const addTaskAC = (title: string, todoListId: string): addTaskACType => ({
    type: 'ADD-TASK', title, todoListId
})

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusACType => ({
    type: 'CHANGE-TASK-STATUS', taskID, todoListID, isDone
})

export const changeTaskTitleAC = (title: string, todoListID: string, taskID: string): changeTaskTitleACType => ({
    type: 'CHANGE-TASK-TITLE', title, todoListID, taskID
})

