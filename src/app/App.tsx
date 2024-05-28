import React, { useEffect } from 'react';
import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { initializeAppTC, RequestStatusType } from './app-reducer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from '../features/Login/Login';
import { logoutTC } from '../features/Login/auth-reducer';

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const logOutHandler = () => {
    dispatch(logoutTC());
    navigate('/todo/login');
  };

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6"></Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logOutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/todo/'} element={<TodolistsList demo={demo} />} />
          <Route path={'/todo/login'} element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
