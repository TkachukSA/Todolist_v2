import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: null | string
    initialized: boolean
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-initialized":{
            return {...state, initialized: action.initialized}
        }
        default:
            return state
    }
}

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetInitializedActionType

export const setInitializedTC = ()=>(dispatch: Dispatch)=>{}

export type  SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type  SetInitializedActionType = ReturnType<typeof setInitializedAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (initialized: boolean) => ({type: 'APP/SET-initialized', initialized} as const)

export type  SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)