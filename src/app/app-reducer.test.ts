
import {InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        error: 'error message',
        status: "idle"
    }});
test('correct error message should be set', ()=>{

const endState = setAppErrorAC('some error')

    expect(endState.error).toBe('some error')

})


test('correct status should be correct', ()=>{

const endState = setAppStatusAC("failed")

    expect(endState.status).toBe('failed')

})