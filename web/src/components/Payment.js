import React, { Component } from 'react'

import { Table, Row, Form, Col, Button } from 'react-bootstrap'

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: 'card',
            errMsg: 'Please fill all the fields!!!',
            showErr: false,
            cardNo: '',
            cvc: '',
            exp: '',
            phoneNo: '',
            pin: ''
        };
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({ ...this.props.location.state, showErr:false })
        }        
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')             
        }
    }

    handleChange = type => event => {
        var value = event.target.value
        if (type === 'card' || type === 'phone') {
            this.setState({ checked: type })
        } else {
            this.setState({ [type]: value })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ showErr: false })
        const state = this.state;
        if (state.checked === 'card') {
            if (state.cardNo && state.cvc && state.exp) {
                //TODO: gateway
                console.log("card valid")
            } else {
                this.setState({ showErr: true })
            }
        }
        if (state.checked === 'phone') {
            if (state.phoneNo && state.pin) {
                //TODO: gateway
                console.log("phone valid")
            } else {
                this.setState({ showErr: true })
            }
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
                    <Form.Row style={{ width: '75%', paddingBottom: 10 }}>
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
                    {this.state.checked === 'card' &&
                        <Form.Row style={{ width: '75%' }}>
                            <Form.Group as={Col} controlId="cardNo">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control placeholder="card number" onChange={this.handleChange('cardNo')} value={this.state.cardNo} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="cvc">
                                <Form.Label>CVC Number</Form.Label>
                                <Form.Control placeholder="CVC" onChange={this.handleChange('cvc')} value={this.state.cvc} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exp">
                                <Form.Label>Exp date</Form.Label>
                                <Form.Control placeholder="dd/mm" onChange={this.handleChange('exp')} value={this.state.exp} />
                            </Form.Group>
                        </Form.Row>
                    }
                    {this.state.checked === 'phone' &&
                        <Form.Row style={{ width: '75%' }}>
                            <Form.Group as={Col} controlId="phoneNo">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control placeholder="Phone number" onChange={this.handleChange('phoneNo')} value={this.state.phoneNo} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="pin">
                                <Form.Label>PIN</Form.Label>
                                <Form.Control placeholder="PIN" onChange={this.handleChange('pin')} value={this.state.pin} />
                            </Form.Group>
                        </Form.Row>
                    }
                    <Form.Row style={{ width: '75%' }}>
                        {this.state.showErr && <p style={{ color: 'red' }}>{this.state.errMsg}</p>}
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
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