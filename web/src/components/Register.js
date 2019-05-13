import React, { Component } from 'react'

import { Modal, Button, Form, Col } from 'react-bootstrap'
import { register } from '../Services'
import { toast } from 'react-toastify'
import { getHash } from './commons/Functions'

class Register extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            // validated: false,
            modalShowErr: false,
            modalErrMsg: "Entered email already exist!!!",
        }
        this.baseState = this.state
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    handleChange = type => event => {
        let value = event
        if (event.target) {
            value = event.target.value
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        this.setState({ modalShowErr: false })
        const form = event.currentTarget

        if (form.checkValidity() === true) {
            var body = { ...this.state, password: getHash(this.state.password) }
            register(body)
                .then(res => {
                    toast.success("Account Created Please Sign In")
                    this.loginClick()
                })
                .catch(err => {
                    if (err.then && typeof err.then === 'function') {
                        err.then(e => {
                            toast.error("Unable to register the new user")
                            if (e.exist) {
                                this.setState({ modalShowErr: true })
                            }
                        })
                    } else {
                        console.log(err)
                    }
                })
        }
        // this.setState({ validated: true }) 
        event.preventDefault()
        event.stopPropagation()
    }

    loginClick = () => {
        this.props.handleClose()
        this.props.handleLoginShow()
    }

    render() {

        return (
            <Modal show={this.props.showRegister} onHide={this.props.handleClose}>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control required type="username" placeholder="Enter first name" onChange={this.handleChange('fname')} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required type="username" placeholder="Enter last name" onChange={this.handleChange('lname')} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="username" placeholder="Enter Phone Number" onChange={this.handleChange('phone')} />
                        </Form.Group>
                        <Form.Group controlId="formGridNIC">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control type="username" placeholder="Enter NIC (Optional)" onChange={this.handleChange('nic')} />
                        </Form.Group>
                        <Form.Group controlId="controlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required as="textarea" rows="3" onChange={this.handleChange('address')} />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={this.handleChange('email')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter Password" onChange={this.handleChange('password')} />
                        </Form.Group>
                        {this.state.modalShowErr && <p style={{ color: 'red' }}>{this.state.modalErrMsg}</p>}
                        <Button variant="primary" type="submit" block>
                            Create account
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" block onClick={this.loginClick}>
                            Sign in
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        )
    }
}

export default Register;