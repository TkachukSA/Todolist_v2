import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        todolistAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('hi men ')
            .then((res) => {
                debugger
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '39814be4-93ac-4b2e-985b-7b0a3015ad5c'
        todolistAPI.deliteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolistId = 'f7d559cb-8529-4761-99a9-9f485b2514d4'
        todolistAPI.updateTitleTodolists(todolistId, 'title is reqired!!!!!').then((res) => {

            setState(res.data)
        })


        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
