import React, { Component } from 'react'

import { Table, Row, Form, Col, Button } from 'react-bootstrap'

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: 'card'
        };
    }

    componentDidMount() {
        this.setState({ ...this.props.location.state })
    }

    handleChange = type => event => {
        var value = event.target ? event.target.value : event.target
        if (type === 'card' || type === 'phone') {
            this.setState({ checked: type })
        }
    }

    render() {
        console.log(this.props)
        return (
            <Form style={{ padding: 20 }} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%' }}>
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
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Form.Label as="legend">
                            Select a payment method
                        </Form.Label>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Credit Card"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked
                                onChange={this.handleChange('card')}
                            />
                            <Form.Check
                                type="radio"
                                label="Mobile Number"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onChange={this.handleChange('phone')}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        {this.state.checked === 'card' &&
                            <p>card</p>
                        }
                        {this.state.checked === 'phone' &&
                            <p>phone</p>
                        }
                    </Form.Row>
                    <Form.Row style={{ width: '75%'}}>
                        <Button variant="primary" type="submit">
                            Make Payment
                        </Button>
                    </Form.Row>
                </Row>
            </Form>
        )
    }
}

export default Payment