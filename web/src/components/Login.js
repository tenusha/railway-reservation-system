import React, { Component } from 'react'

import { Modal, Button, Form, Image, Row } from 'react-bootstrap'
import { login } from '../Services'
import { getHash } from './commons/Functions'

class Login extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            // validated: false,
            modalShowErr: false,
            modalErrMsg: "Incorrect username or password!!!",
            username: "",
            password: ""
        }
        this.baseState = this.state
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    handleChange = type => event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        this.setState({ modalShowErr: false })
        const form = event.currentTarget

        if (form.checkValidity() === true) {
            login({ username: this.state.username, password: getHash(this.state.password) })
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res))
                    this.props.handleClose()
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ modalShowErr: true })
                })
        }
        event.preventDefault()
        event.stopPropagation()
    }

    joinClick = () => {
        this.props.handleClose()
        this.props.handleRegisterShow()
    }

    render() {
        return (
            <Modal show={this.props.showLogin} onHide={this.props.handleClose}>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image src={require("../images/login.png")} width='30%' />
                        </Row>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="username" placeholder="Enter email" onChange={this.handleChange('username')} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter Password" onChange={this.handleChange('password')} />
                        </Form.Group>
                        {this.state.modalShowErr && <p style={{ color: 'red' }}>{this.state.modalErrMsg}</p>}
                        <Button variant="primary" type="submit" block>
                            Sign in
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" block onClick={this.joinClick}>
                            Join Now
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default Login;