import React, {useEffect} from 'react'
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
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {
                        isLoggedIn && <Button color="inherit" onClick={() => dispatch(logoutTC())}>Log out</Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                {/* Каждый Router создает объект history который хранит путь к текущему location[1]
                и перерисовывает интерфейс сайта когда происходят какие то изменения пути.

                Остальные функции предоставляемые в React Router полагаются на доступность объекта
                history через context, поэтому они должны рендериться внутри компонента Router.*/}
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App

/*that takes in a string and replaces all the vowels [a,e,i,o,u] with their respective positions within that string.*/
/*
vowel2index('this is my string') == 'th3s 6s my str15ng'
*/
/*let word = 'this is my string'

function vowel2index(str) {
    let strArray = str.split('')
    let compareArray = ["a", "e", "i", "o", "u"]
    /!*console.log(strArray.indexOf("i"))*!/
    for (let i = 0; i < strArray.length; i++) {
        let result = []

        for (let j = 0; j < compareArray.length; j++) {
            if (strArray[i] === compareArray[j]) {
                result.push(i + 1)
            }
        }
        /!*result.push(strArray[i])*!/
        console.log(result)
    }

}

vowel2index(word)*/
