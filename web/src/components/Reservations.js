import React, { Component } from 'react';

class Reservations extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div>Reservations</div>
                {this.props.location.state && <div>{this.props.location.state.amount}</div>}
            </>
        );
    }
}

export default Reservations;