import * as React from 'react';

import "./ImageSelection.scss";

class ImageSelection extends React.Component {
    constructor(props) {
        super(props);
        let options = [];
        for (let i=0; i<12; i++) {
            let num = (i+1) + "";
            if (num < 10) {
                num = "0" + num;
            }
            options.push(`images/wolf0${num}.jpg`);
        }

        this.state = {
            options: options
        }
    }

    render() {
        return (
            <section className="page">
                <h1>Select An Image</h1>
                <section className="image-selection">
                    {this.state.options.map((item) => {
                        return (
                            <figure key={item}>
                                <img src={item}/>
                            </figure>
                        )
                    })}
                </section>
            </section>
        )
    }
}

export default ImageSelection;