import {configureStore} from "@reduxjs/toolkit";
import rootReducer from './slices/root';
import registrationReducer from './slices/registration'
import loginReducer from './slices/login';

const initialState = JSON.parse(localStorage.getItem('parser-panel-state'));

const store = configureStore({
  reducer: {
    root: rootReducer,
    registration: registrationReducer,
    login: loginReducer,
  },
  preloadedState: initialState ? initialState : undefined,
})

window.store = store;

store.subscribe(() => {
  localStorage.setItem('parser-panel-state', JSON.stringify(store.getState()));
})

export default store;