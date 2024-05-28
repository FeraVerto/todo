import { Dispatch } from 'redux';
import { setAppStatusAC } from '../../app/app-reducer';
import { authAPI, todolistsAPI } from '../../api/todolists-api';
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../../utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;
/*  (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}*/
// actions
/*export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)*/

////============================================================
// thunks
export const loginTC =
  (email: string, password: string, rememberMe: boolean, captcha?: boolean) =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    authAPI
      .login(email, password, rememberMe, captcha)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC({ value: true }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

////============================================================
/*export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/

// types
