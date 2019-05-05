import React, { Component } from 'react';

import { getReservations } from '../Services'

class Reservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations:[]
        };
    }

    componentDidMount() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        } else {
            user = JSON.parse(user)
            getReservations(user._id)
                .then(res => {
                    this.setState({ reservations: res })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        console.log(this.state)
        return (
            <>
                <div>Reservations</div>
            </>
        );
    }
}

export default Reservations;