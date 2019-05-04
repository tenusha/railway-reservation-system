import React, { Component } from 'react'
import { routes, route } from '../Services'

import { Modal, Button, Form, Col, Row, Dropdown } from 'react-bootstrap'
import Select from 'react-select'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromOptions: [],
            toOptions: []
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
    }

    handleChange = type => selectedOption => {
        this.setState({ [type]: selectedOption }, () => {
            console.log(this.state)

        });
        if (type === 'from') {
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
        }
    }

    // handleClick = () => {
    //     this.props.history.push('/reservations', { amount: 12000 })
    // }

    render() {
        return (
            <Form style={{ padding: 20 }}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>From</Form.Label>
                            <Select options={this.state.fromOptions} onChange={this.handleChange("from")} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>To</Form.Label>
                            <Select options={this.state.toOptions} onChange={this.handleChange("to")} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>Train</Form.Label>
                            <Select options={this.state.fromOptions} onChange={this.handleChange("from")} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>Class</Form.Label>
                            <Select options={this.state.toOptions} onChange={this.handleChange("to")} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>Time</Form.Label>
                            <Select options={this.state.fromOptions} onChange={this.handleChange("from")} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>No of Tickets</Form.Label>
                            <Form.Control placeholder="qty" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{ width: '75%', paddingLeft: 5, align:'right' }}>
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