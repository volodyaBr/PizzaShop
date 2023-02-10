import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import "./styles/start.scss"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
