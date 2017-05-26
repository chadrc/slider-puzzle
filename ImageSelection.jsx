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
            <section className="image-selection">
                <ul>
                    {this.state.options.map((item) => {
                        return <li key={item}><img src={item}/></li>
                    })}
                </ul>
            </section>
        )
    }
}

export default ImageSelection;