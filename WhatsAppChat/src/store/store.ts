import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {baseApi} from "../services/apiService.ts";
import {authSlice} from "./reducers/authSlice.ts";
import {chatSlice} from "./reducers/chatSlice.ts";


const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
