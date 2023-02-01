import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import "./styles/start.scss"
import {BrowserRouter} from "react-router-dom";

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
