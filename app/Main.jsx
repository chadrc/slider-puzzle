import * as React from "react";
import SliderPuzzle from "./SliderPuzzle";
import ImageSelection from "./ImageSelection";
import Won from "./Won";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: "",
            solved: false
        }
    }

    imageSelected(image) {
        this.setState({
            selectedImage: image
        });
    }

    puzzleSolved() {
        this.setState({
            solved: true
        });
    }

    replay() {
        this.setState({
            selectedImage: "",
            solved: false
        });
    }

    render() {
        if (this.state.solved) {
            return <Won image={this.state.selectedImage} onReplay={() => this.replay()} />;
        } else if (this.state.selectedImage) {
            return <SliderPuzzle image={this.state.selectedImage} onSolve={() => this.puzzleSolved()} />;
        } else {
            return <ImageSelection onClick={(image) => this.imageSelected(image)} />;
        }
    }
}

export default Main;