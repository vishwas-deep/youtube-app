import ReactDOM from "react-dom";
import App from "./App";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './_base.scss'
import { Provider } from 'react-redux'
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)