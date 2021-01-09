import axios from "axios";


type todoType= {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type CrateResponseType={
    resultCode: number,
    fieldsErrors: string[]
    messages: string[],
    data: {
        item: todoType
    }
}
type DeleteAndUpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: string[]
    data: {}
}
type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: string[]
    data: T
}






const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7866738e-c5bf-440e-864d-4cc467150876'
    }
})





export const todolistAPI = {
    getTodolists: () => {
        let promise =instance.get<todoType[]>('todo-lists')
        return promise
    },
    createTodolist: (title: string) => {
        let promise = instance.post<ResponseType<{item: todoType}>>('todo-lists', {title})
        return promise
    },
    deliteTodolist: (todolistId: string) => {
        let promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTitleTodolists: (todolistId: string, title: string) => {
        let promise =instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
        return promise

    }}