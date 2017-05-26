require("react-hot-loader/patch");

import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./Main";

import { AppContainer } from 'react-hot-loader';

import "./index.html";

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('content')
    );
};

render(Main);

if (module.hot) {
    module.hot.accept('./Main', () => {
        render(Main)
    });
}