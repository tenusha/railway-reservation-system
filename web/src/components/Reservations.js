import React, { Component } from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap'
import { getReservations, deleteReservation } from '../Services'
import { toast } from 'react-toastify'

class Reservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        };
    }

    componentDidMount() {
        this.uppdateReservations()
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        }
    }

    uppdateReservations = () => {
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

    cancelReservation = id => {
        var c = window.confirm("The reservation " + id + " will be deleted")
        if (c) {
            deleteReservation(id)
                .then(res => {
                    toast.success("Successfully removed reservation " + id)
                    this.uppdateReservations()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                {this.state.reservations.length <= 0 &&
                    <Row style={{ width: '75%', padding: 10 }}>
                        <Col>
                            <Card>
                                <Card.Body>You don't have any reservations yet!!!</Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                {this.state.reservations.length > 0 &&
                    this.state.reservations.map((reservation, i) => {
                        return (
                            <Row style={{ width: '75%' }} key={i}>
                                <Col>
                                    <Card style={{ padding: 10, marginTop: 10 }}>
                                        <Row>
                                            <Col>Reference No : {reservation._id}</Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>From <b>{reservation.from}</b> to <b>{reservation.to}</b></Col>
                                            <Col align='right'>{reservation.date} {reservation.time}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Train : {reservation.train}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Class : {reservation.trainClass}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Quantity : {reservation.qty}</Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>Amount : {reservation.amount.toFixed(2)}</Col>
                                            <Col>Discount : {reservation.discount.toFixed(2)}</Col>
                                            <Col align='right'><b>Total :</b> {reservation.total.toFixed(2)}</Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ paddingTop: 10 }} align='right'>
                                                <Button variant="danger" size="sm" onClick={() => this.cancelReservation(reservation._id)}>Cancel</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Row>
        );
    }
}

export default Reservations;