require("react-hot-loader/patch");

import * as React from "react";
import * as ReactDOM from "react-dom";
import SliderPuzzle from "./SliderPuzzle";

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

render(SliderPuzzle);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./SliderPuzzle', () => {
        render(SliderPuzzle)
    });
}
// window.addEventListener("load", () => {
//     let main = document.getElementById("content");
//     ReactDOM.render(<SliderPuzzle />, main);
// });