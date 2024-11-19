import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";


const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})