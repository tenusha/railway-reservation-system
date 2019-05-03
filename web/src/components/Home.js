import React, { Component } from 'react'
import { stations } from '../Services'

import { Modal, Button, Form, Col, Row, Dropdown } from 'react-bootstrap'
import Select from 'react-select'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        var options = []
        stations()
            .then(res => {
                res.map((item, i) => {
                    options.push({ value: item.name, label: item.name, id: item._id })
                })
                this.setState({ options: options })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = type => selectedOption => {
        //this.setState({ selectedOption });
        console.log(type);
        console.log('Option selected:', selectedOption);
    }

    // handleClick = () => {
    //     this.props.history.push('/reservations', { amount: 12000 })
    // }

    render() {
        return (
            <>
                <Row style={{ padding: 20 }}>
                    <Col><Select options={this.state.options} onChange={this.handleChange("from")} /></Col>
                    <Col><Select options={this.state.options} onChange={this.handleChange("to")} /></Col>
                </Row>
            </>
        );
    }
}

export default Home;