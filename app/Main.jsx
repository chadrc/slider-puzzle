import * as React from "react";
import SliderPuzzle from "./SliderPuzzle";
import ImageSelection from "./ImageSelection";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: ""
        }
    }

    imageSelected(image) {
        this.setState({
            selectedImage: image
        })
    }

    render() {
        if (this.state.selectedImage) {
            return <SliderPuzzle image={this.state.selectedImage} />
        } else {
            return <ImageSelection onClick={(image) => this.imageSelected(image)} />
        }
    }
}

export default Main;