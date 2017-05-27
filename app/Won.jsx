import * as React from 'react';
import PropTypes from 'prop-types';

import "./Won.scss";

class Won extends React.Component {
    constructor(props) {
        super(props);
    }

    raiseReplay() {
        if (this.props.onReplay) {
            this.props.onReplay();
        }
    }

    render() {
        return (
            <section className="page won">
                <h1>Good Job!</h1>
                <section>
                    <img src={this.props.image} />
                </section>
                <button type="button" onClick={() => this.raiseReplay()}>Replay</button>
            </section>
        );
    }
}

Won.propsTypes = {
    onReplay: PropTypes.func
};

export default Won;