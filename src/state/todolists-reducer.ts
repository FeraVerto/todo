import {StateType} from "./user-reducer";
import {TodoListPropsType} from "../TodoList";
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todoListId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}

//action:
export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST", id: todoListId
})

export const AddTodoListAC = (title: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST", title: title, todoListId: v1()
})

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE', title: title, id: id
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id
})