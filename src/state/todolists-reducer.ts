import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | getTodosActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'GET_TODOLISTS' : {
            return action.todolistId.map((tl) => {
                return {...tl, filter: 'all'}
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const getTodos = (todolistId: TodolistType[]) => ({type: 'GET_TODOLISTS', todolistId} as const)

export type getTodosActionType = ReturnType<typeof getTodos>

export const getTodosTC =()=> (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            const todos = res.data
            dispatch(getTodos(todos))
        })
}
export const changeTodolistTitleTC =(id: string, title: string)=>{
    return (dispatch: Dispatch, getState: () => AppRootStateType)=>{
        todolistsAPI.updateTodolist(id, title)
            .then(()=>{
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}
export const removeTodolistTC=(todolistId: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.deleteTodolist(todolistId)
        .then(()=>{
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC=(title: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
}
