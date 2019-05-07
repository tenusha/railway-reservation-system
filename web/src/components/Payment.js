import React, { Component } from 'react'

import { Table, Row, Form, Col, Button } from 'react-bootstrap'
import { validateCard, validatePhone, makeReservation } from '../Services'
import { toast } from 'react-toastify'

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: 'card',
            errMsg: 'Please fill all the fields!!!',
            showPaymentErr: false,
            validateErrMsg: 'Entered data not valid!!!',
            showValidateErr: false,
            cardNo: '',
            cvc: '',
            exp: '',
            phoneNo: '',
            pin: ''
        };
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({ ...this.props.location.state })
        }
        var user = localStorage.getItem('user')
        if (user) {
            this.setState({ phoneNo: JSON.parse(user).phone })
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

    handleSubmit = async  event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ showPaymentErr: false, showValidateErr: false })
        const state = this.state;
        if (state.checked === 'card') {
            if (state.cardNo && state.cvc && state.exp) {
                validateCard({ card: state.cardNo, cvc: state.cvc, exp: state.exp, total: state.total })
                    .then(res => {
                        if (res.validated) {
                            this.createReservation({ card: state.cardNo })
                        } else {
                            this.setState({ showValidateErr: true })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            } else {
                this.setState({ showPaymentErr: true })
            }
        }
        if (state.checked === 'phone') {
            if (state.phoneNo && state.pin) {
                validatePhone({ phone: state.phoneNo, pin: state.pin, total: state.total })
                    .then(res => {
                        if (res.validated) {
                            this.createReservation({ phone: state.phoneNo })
                        } else {
                            this.setState({ showValidateErr: true })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.setState({ showPaymentErr: true })
            }
        }
    }

    createReservation = (paymentMethod) => {
        const state = this.state
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            const reservation = {
                ...paymentMethod,
                user: user._id,
                email: user.email,
                from: state.from.value,
                to: state.to.value,
                train: state.train.value,
                trainClass: state.trainClass.value,
                time: state.time.value,
                qty: state.qty,
                date: state.date,
                amount: state.amount,
                discount: state.discount,
                total: state.total
            }
            makeReservation(reservation)
                .then(res => {
                    toast.success("Successfully paid " + reservation.total)
                    this.props.history.push('/reservations')
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <Form style={{ padding: 20 }} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%' }}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td align='right'>Amount</td>
                                    <td align='right'>{this.state.amount} LKR</td>
                                </tr>
                                <tr>
                                    <td align='right'>Discount</td>
                                    <td align='right'>{this.state.discount} LKR</td>
                                </tr>
                                <tr>
                                    <td align='right'>Total</td>
                                    <td align='right'>{this.state.total} LKR</td>
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
                        {this.state.showPaymentErr && <p style={{ color: 'red' }}>{this.state.errMsg}</p>}
                        {this.state.showValidateErr && <p style={{ color: 'red' }}>{this.state.validateErrMsg}</p>}
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