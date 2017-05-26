import * as React from "react";
import * as ReactDOM from "react-dom";
import SliderPuzzle from "./SliderPuzzle";

window.addEventListener("load", () => {
    let main = document.getElementById("content");
    ReactDOM.render(<SliderPuzzle />, main);
});