import React, { Component } from 'react'
import { routes, route, trainsByRoute, classes, schedules } from '../Services'

import { Card, Button, Form, Col, Row, Table } from 'react-bootstrap'
import Select from 'react-select'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromOptions: [],
            toOptions: [],
            trains: []
        };
    }

    componentDidMount() {
        var options = []
        routes()
            .then(res => {
                res.map((item, i) => {
                    item.route.map((station, i) => {
                        options.push({ value: station.name, label: station.name, route: item._id, id: i, fair: station.fair })
                    })
                })
                this.setState({ fromOptions: options })
            })
            .catch(err => {
                console.log(err)
            })
        classes()
            .then(res => {
                var classes = []
                res.map((trainClass, i) => {
                    classes.push({ value: trainClass.name, label: trainClass.name, id: trainClass._id, fairRatio: trainClass.fairRatio })
                })
                this.setState({ classes: classes })
            })
            .catch(err => {
                console.log(err)
            })
        schedules()
            .then(res => {
                var schedules = []
                res.map((schedule, i) => {
                    schedules.push({ value: schedule.time, label: schedule.time, id: schedule._id })
                })
                this.setState({ schedules: schedules })
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleChange = type => selectedOption => {
        this.setState({ [type]: selectedOption }, () => {
            console.log(this.state)
            this.calculateFair()
        });
        if (type === 'from') {
            this.setState({ to: '', train: '' })
            route(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.route.map((station, i) => {
                        options.push({ value: station.name, label: station.name, route: res._id, id: i, fair: station.fair })
                    })
                    this.setState({ toOptions: options })
                })
                .catch(err => {
                    console.log(err)
                })
            trainsByRoute(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.map((train, i) => {
                        options.push({ value: train.name, label: train.name, id: train._id })
                    })
                    this.setState({ trains: options })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleQtyChange = () => event => {
        this.setState({ qty: event.target.value }, () => this.calculateFair())
    }

    calculateFair = () => {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
        }
        if (this.state.to && this.state.from && this.state.trainClass && this.state.qty) {
            var amount = Math.abs(this.state.to.fair - this.state.from.fair) * this.state.trainClass.fairRatio * this.state.qty
            amount = amount.toFixed(2)
            var discount = (user.discount ? 0.1*amount : 0).toFixed(2)
            var total = (amount - discount).toFixed(2)
            this.setState({ amount: amount, discount: discount, total: total })
        }
    }

    handleSubmit = event => {
        //TODO: validate form
        event.preventDefault()
        event.stopPropagation()
        console.log("submit")
        this.props.history.push("/payment",{...this.state})
    }

    render() {
        return (
            <Form style={{ padding: 20 }} onSubmit={(e)=>this.handleSubmit(e)}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>From</Form.Label>
                            <Select options={this.state.fromOptions} onChange={this.handleChange("from")} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>To</Form.Label>
                            <Select options={this.state.toOptions} onChange={this.handleChange("to")} value={this.state.to} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>Train</Form.Label>
                            <Select options={this.state.trains} onChange={this.handleChange("train")} value={this.state.train} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>Class</Form.Label>
                            <Select options={this.state.classes} onChange={this.handleChange("trainClass")} value={this.state.trainClass} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>Time</Form.Label>
                            <Select options={this.state.schedules} onChange={this.handleChange("time")} value={this.state.time} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>No of Tickets</Form.Label>
                            <Form.Control placeholder="qty" onChange={this.handleQtyChange()} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%', paddingLeft: 5, align: 'right' }}>
                        {this.state.amount &&
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amount</td>
                                        <td>{this.state.amount}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        <td>{this.state.discount}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{this.state.total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        }
                    </Form.Row>
                    <Form.Row style={{ width: '75%', padding: 5 }}>
                        <Button variant="primary" type="submit">
                            Make Reservation
                        </Button>
                    </Form.Row>
                </Row>
            </Form>
        );
    }
}

export default Home;