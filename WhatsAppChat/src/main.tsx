import React from "react"
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

setupListeners(store.dispatch)

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
