import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setInitializedTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Route, Switch, Redirect} from 'react-router-dom'
import {Login} from "../login/Login";
import {logoutTC} from "../login/auth-reducer";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setInitializedTC())
    }, [])

    const logoutChanged = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!initialized) {
        return <div style={{position: "absolute", top: '30%', width: '100%', textAlign: "center"}}><CircularProgress
            color="secondary"/></div>
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoginIn && <Button color="inherit" onClick={logoutChanged}>Logout</Button>}
                </Toolbar>


                {status === 'loading' && <LinearProgress color="secondary"/>}
                <ErrorSnackbar/>

            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>Page non found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>

            </Container>
        </div>
    )
}

export default App
